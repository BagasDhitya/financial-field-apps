#!/usr/bin/env node
/**
 * Coverage and safety checks for seed content (PRP-0002.p1 T74, T86;
 * REQ-SEED-001…011).
 *   pnpm seed:cms:verify                 after a seed: full coverage checks
 *   pnpm seed:cms:verify -- --after-reset   after a reset: nothing seeded remains
 * Checks the profile the last run recorded, or SEED_PROFILE when it is set
 * (ADR-0014). Reads with CMS_SEED_TOKEN (drafts are needed). Never writes.
 */
import { parseCapabilities } from './capabilities.mjs';
import { assertSeedAllowed, createClient, SeedGuardError } from './client.mjs';
import { ARTICLES, DRAFTS } from './data/articles.mjs';
import { AUTHORS } from './data/people.mjs';
import { MARKER_TAG, TAGS, allCategories } from './data/taxonomy.mjs';
import { DISCLAIMER, blocksText } from './generate.mjs';
import { demoMarkerHits, parseSeedProfile, resolveVerifyProfile, textFor } from './profile.mjs';
import { realDataHits } from './safety.mjs';

const afterReset = process.argv.includes('--after-reset');
const caps = parseCapabilities(process.env.CMS_CAPABILITIES ?? '');
const env = {
	cmsUrl: process.env.CMS_URL || 'http://localhost:1337',
	token: process.env.CMS_SEED_TOKEN,
	siteEnv: process.env.SITE_ENV,
	allowedHosts: process.env.SEED_ALLOWED_HOSTS,
};

/** Tag thresholds designed in §S4.2 (published articles only). */
const INDEXABLE_TAGS = [
	'pajak-karyawan',
	'dana-darurat',
	'anggaran-bulanan',
	'investasi-pemula',
	'pensiun',
];
const THIN_TAGS = ['kartu-kredit', 'karier-awal', 'lansia'];

const results = [];
function check(id, ok, detail) {
	results.push({ id, ok, detail });
}

async function listAll(client, path) {
	const out = [];
	for (let page = 1; page <= 50; page++) {
		const glue = path.includes('?') ? '&' : '?';
		const result = await client.request(
			'GET',
			`${path}${glue}pagination[page]=${page}&pagination[pageSize]=100`,
		);
		out.push(...(result?.data ?? []));
		if (page >= (result?.meta?.pagination?.pageCount ?? 0)) {
			break;
		}
	}
	return out;
}

const ARTICLE_QUERY =
	`filters[tags][slug][$eq]=${MARKER_TAG}` +
	'&fields[0]=slug&fields[1]=title&fields[2]=lead_text&fields[3]=content&fields[4]=article_type' +
	'&populate[primary_category][fields][0]=slug' +
	'&populate[primary_category][populate][parent_category][fields][0]=slug' +
	'&populate[tags][fields][0]=slug' +
	'&populate[reviewer][fields][0]=slug' +
	'&populate[author][fields][0]=slug';

async function verifySeeded(client, { profile, allArticles }) {
	const published = await listAll(client, `/articles?status=published&${ARTICLE_QUERY}`);
	const drafts = await listAll(client, `/articles?status=draft&${ARTICLE_QUERY}`);
	const publishedSlugs = new Set(published.map((article) => article.slug));
	const draftOnly = drafts.filter((article) => !publishedSlugs.has(article.slug));

	// AC-S1 / REQ-SEED-004: exact set, no duplicates.
	const expected = new Set(ARTICLES.map((row) => row.slug));
	const missing = [...expected].filter((slug) => !publishedSlugs.has(slug));
	const extra = [...publishedSlugs].filter((slug) => !expected.has(slug));
	check(
		'articles.published',
		published.length === 60 && missing.length === 0 && extra.length === 0,
		`${published.length} published${missing.length ? `; missing ${missing.join(', ')}` : ''}${extra.length ? `; unexpected ${extra.join(', ')}` : ''}`,
	);
	const duplicateSlugs = published.length - publishedSlugs.size;
	check('articles.no-duplicates', duplicateSlugs === 0, `${duplicateSlugs} duplicate slug(s)`);

	const draftSlugs = new Set(draftOnly.map((article) => article.slug));
	const expectedDrafts = DRAFTS.map((row) => row.slug);
	check(
		'articles.drafts',
		draftOnly.length === 4 && expectedDrafts.every((slug) => draftSlugs.has(slug)),
		`${draftOnly.length} draft-only (expected D1–D4)`,
	);
	check(
		'articles.drafts-not-public',
		expectedDrafts.every((slug) => !publishedSlugs.has(slug)),
		'D1–D4 not in published',
	);

	// AC-S5: data changes reach the CMS (titles match the catalog, as the profile writes them).
	const titleDrift = published.filter((article) => {
		const row = ARTICLES.find((r) => r.slug === article.slug);
		return textFor(row?.title, profile) !== article.title;
	});
	check(
		'articles.titles-current',
		titleDrift.length === 0,
		titleDrift.map((article) => article.slug).join(', ') || 'all match',
	);

	// REQ-SEED-001: every category has ≥ 1 published article (directly or through a sub).
	const categories = await listAll(client, '/categories?status=published&fields[0]=slug');
	const categorySlugs = new Set(categories.map((category) => category.slug));
	const missingCategories = allCategories().filter(
		(category) => !categorySlugs.has(category.slug),
	);
	check(
		'categories.exist',
		missingCategories.length === 0,
		`${allCategories().length - missingCategories.length}/59${missingCategories.length ? `; missing ${missingCategories.map((c) => c.slug).join(', ')}` : ''}`,
	);
	const perCategory = new Map();
	for (const article of published) {
		const own = article.primary_category?.slug;
		const parent = article.primary_category?.parent_category?.slug;
		for (const slug of [own, parent].filter(Boolean)) {
			perCategory.set(slug, (perCategory.get(slug) ?? 0) + 1);
		}
	}
	const empty = allCategories().filter((category) => !perCategory.get(category.slug));
	check(
		'categories.coverage',
		empty.length === 0,
		empty.length
			? `empty: ${empty.map((c) => c.slug).join(', ')}`
			: '13 top-level + 46 sub all ≥ 1',
	);
	check(
		'categories.pajak-14',
		perCategory.get('pajak') === 14,
		`pajak has ${perCategory.get('pajak') ?? 0} (pagination needs > 12)`,
	);

	// §S4.4 type counts.
	const types = {};
	for (const article of published) {
		types[article.article_type] = (types[article.article_type] ?? 0) + 1;
	}
	const expectedTypes = {
		standard: 52,
		pr_article: 3,
		interview: 3,
		column: 2,
	};
	check(
		'types',
		Object.entries(expectedTypes).every(([type, n]) => types[type] === n),
		JSON.stringify(types),
	);

	// §S4.2 tag thresholds.
	const tagCount = {};
	for (const article of published) {
		for (const tag of article.tags ?? []) {
			tagCount[tag.slug] = (tagCount[tag.slug] ?? 0) + 1;
		}
	}
	const lowIndexable = INDEXABLE_TAGS.filter((slug) => (tagCount[slug] ?? 0) < 3);
	const highThin = THIN_TAGS.filter(
		(slug) => !((tagCount[slug] ?? 0) >= 1 && tagCount[slug] <= 2),
	);
	check(
		'tags.thresholds',
		lowIndexable.length === 0 && highThin.length === 0,
		INDEXABLE_TAGS.concat(THIN_TAGS)
			.map((slug) => `${slug}=${tagCount[slug] ?? 0}`)
			.join(' '),
	);
	const seededTags = await listAll(client, '/tags?status=published&fields[0]=slug');
	const tagSlugs = new Set(seededTags.map((tag) => tag.slug));
	check(
		'tags.exist',
		TAGS.every((tag) => tagSlugs.has(tag.slug)),
		`${TAGS.filter((tag) => tagSlugs.has(tag.slug)).length}/21`,
	);

	// §S4.3 authors, reviewers only on reviewed rows (AC-S10), columns without reviewer (AC-S3).
	const authors = await listAll(client, '/writer-profiles?status=published&fields[0]=slug');
	const authorSlugs = new Set(authors.map((author) => author.slug));
	check(
		'authors.exist',
		AUTHORS.every((author) => authorSlugs.has(author.slug)),
		`${AUTHORS.filter((a) => authorSlugs.has(a.slug)).length}/6`,
	);
	const reviewerDrift = published.filter((article) => {
		const row = ARTICLES.find((r) => r.slug === article.slug);
		return row && Boolean(row.reviewer) !== Boolean(article.reviewer);
	});
	check(
		'authors.reviewers',
		reviewerDrift.length === 0,
		reviewerDrift.map((a) => a.slug).join(', ') || 'reviewer only on reviewed rows',
	);

	// REQ-SEED-002: the marker on every seed article, whatever the profile.
	const expectedSlugs = [...ARTICLES, ...DRAFTS].map((row) => row.slug);
	const unmarked = expectedSlugs.filter((slug) => {
		const versions = allArticles.filter((article) => article.slug === slug);
		return (
			versions.length > 0 &&
			versions.some((article) => !(article.tags ?? []).some((tag) => tag.slug === MARKER_TAG))
		);
	});
	check(
		'safety.marker',
		unmarked.length === 0,
		unmarked.join(', ') || `every seed article carries ${MARKER_TAG}`,
	);

	const people = await listAll(
		client,
		`/writer-profiles?status=draft&fields[0]=slug&fields[1]=bio&fields[2]=full_name${caps.has('author-profile') ? '&fields[3]=credentials' : ''}`,
	);
	const seedPeople = people.filter((p) => AUTHORS.some((a) => a.slug === p.slug));

	if (profile === 'demo') {
		// REQ-SEED-010: no visible demo marker anywhere the reader can see.
		const dirty = [];
		for (const article of [...published, ...draftOnly]) {
			const blocks = Array.isArray(article.content) ? article.content : [];
			const hits = demoMarkerHits(
				[article.title, article.lead_text, blocksText(blocks)].join('\n'),
			);
			if (hits.length > 0) {
				dirty.push(`${article.slug}: ${hits[0]}`);
			}
		}
		for (const person of seedPeople) {
			const hits = demoMarkerHits(
				[person.full_name, person.bio, person.credentials].join('\n'),
			);
			if (hits.length > 0) {
				dirty.push(`${person.slug}: ${hits[0]}`);
			}
		}
		check(
			'safety.demo-clean',
			dirty.length === 0,
			dirty.slice(0, 5).join('; ') || '64 articles and 6 people without demo markers',
		);
	} else {
		// REQ-SEED-002 (default): disclaimer at both ends.
		const badDisclaimer = [...published, ...draftOnly].filter((article) => {
			const blocks = Array.isArray(article.content) ? article.content : [];
			const first = blocksText(blocks.slice(0, 1)).trim();
			const last = blocksText(blocks.slice(-1)).trim();
			return first !== DISCLAIMER || last !== DISCLAIMER;
		});
		check(
			'safety.disclaimer',
			badDisclaimer.length === 0,
			badDisclaimer.map((a) => a.slug).join(', ') ||
				'64/64 open and close with the disclaimer',
		);
	}

	// REQ-SEED-007: no real contact data in any seed text.
	const hits = [];
	for (const article of [...published, ...draftOnly]) {
		const text = [article.title, article.lead_text, JSON.stringify(article.content ?? [])].join(
			'\n',
		);
		for (const hit of realDataHits(text)) {
			hits.push(`${article.slug}: ${hit}`);
		}
	}
	for (const person of seedPeople) {
		for (const hit of realDataHits(`${person.full_name}\n${person.bio ?? ''}`)) {
			hits.push(`${person.slug}: ${hit}`);
		}
	}
	check(
		'safety.no-real-data',
		hits.length === 0,
		hits.slice(0, 5).join('; ') || 'no non-example emails or phone numbers',
	);
}

async function verifyReset(client) {
	const marked = await listAll(
		client,
		`/articles?status=draft&filters[tags][slug][$eq]=${MARKER_TAG}&fields[0]=slug`,
	);
	check(
		'reset.articles',
		marked.length === 0,
		`${marked.length} article(s) still tagged ${MARKER_TAG}`,
	);
	const tags = await listAll(client, '/tags?status=draft&fields[0]=slug');
	const leftTags = tags.filter((tag) => TAGS.some((t) => t.slug === tag.slug));
	check('reset.tags', leftTags.length === 0, `${leftTags.length} seed tag(s) left`);
	const people = await listAll(client, '/writer-profiles?status=draft&fields[0]=slug');
	const leftPeople = people.filter((p) => AUTHORS.some((a) => a.slug === p.slug));
	check('reset.authors', leftPeople.length === 0, `${leftPeople.length} seed author(s) left`);
	const categories = await listAll(client, '/categories?status=draft&fields[0]=slug');
	const leftCategories = categories.filter((c) => allCategories().some((s) => s.slug === c.slug));
	check(
		'reset.categories',
		leftCategories.length === 0,
		leftCategories.length
			? `kept (in use by non-seed content): ${leftCategories.map((c) => c.slug).join(', ')}`
			: '0 seed categories left',
	);
	const files = await client.request(
		'GET',
		'/upload/files?filters[name][$startsWith]=ffid-seed-',
	);
	check(
		'reset.media',
		Array.isArray(files) && files.length === 0,
		`${Array.isArray(files) ? files.length : '?'} seed file(s) left`,
	);
}

async function main() {
	assertSeedAllowed(env);
	// Validated before any request (REQ-SEED-009).
	parseSeedProfile(process.env.SEED_PROFILE);
	const client = createClient({ cmsUrl: env.cmsUrl, token: env.token });
	const all = await listAll(
		client,
		'/articles?status=draft&fields[0]=slug&populate[tags][fields][0]=slug',
	);
	if (afterReset) {
		await verifyReset(client);
	} else {
		const marker = await client.findBySlug('tags', MARKER_TAG);
		const resolved = resolveVerifyProfile(process.env.SEED_PROFILE, marker?.name ?? null);
		console.log(`profile: ${resolved.profile} (recorded: ${resolved.recorded ?? 'none'})`);
		check('profile.recorded', resolved.ok, resolved.detail);
		await verifySeeded(client, { profile: resolved.profile, allArticles: all });
	}
	// Non-seed content is reported, never touched (REQ-SEED-005).
	const unmarked = all.filter(
		(article) => !(article.tags ?? []).some((tag) => tag.slug === MARKER_TAG),
	);
	const nonSeed = [...new Set(unmarked.map((article) => article.slug))];
	console.log(`non-seed articles (untouched): ${nonSeed.length ? nonSeed.join(', ') : 'none'}`);

	let failed = 0;
	for (const result of results) {
		console.log(`${result.ok ? 'PASS' : 'FAIL'}  ${result.id.padEnd(26)} ${result.detail}`);
		failed += result.ok ? 0 : 1;
	}
	console.log(failed ? `${failed} check(s) failed` : `all ${results.length} checks passed`);
	process.exit(failed ? 1 : 0);
}

main().catch((error) => {
	console.error(
		error instanceof SeedGuardError
			? error.message
			: `seed-cms verify failed: ${error.message}`,
	);
	process.exit(error instanceof SeedGuardError ? 2 : 1);
});
