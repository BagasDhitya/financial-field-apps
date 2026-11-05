import { describe, expect, it } from 'vitest';

import { parseCapabilities } from './capabilities.mjs';
import { SeedGuardError } from './client.mjs';
import { ARTICLES, DRAFTS, FEATURED } from './data/articles.mjs';
import { SITE_SETTINGS } from './data/pages.mjs';
import { AUTHORS } from './data/people.mjs';
import { MARKER_TAG, TAGS, allCategories } from './data/taxonomy.mjs';
import { DISCLAIMER, blocksText } from './generate.mjs';
import {
	articlePayload,
	authorPayload,
	categoryPayload,
	siteSettingsPayload,
	staticPageBody,
	tagPayload,
	tagSlugsFor,
} from './payloads.mjs';
import {
	avatarAlt,
	blocksFor,
	categoryImageAlt,
	demoMarkerHits,
	demoText,
	markerTagName,
	parseSeedProfile,
	profileFromMarkerName,
	resolveVerifyProfile,
} from './profile.mjs';

const ALL = parseCapabilities('all');
const NONE = parseCapabilities('');
const ROWS = [...ARTICLES, ...DRAFTS];
const now = new Date('2026-11-05T00:00:00Z');

function ctxFor(row, profile) {
	return {
		ids: {
			category: 'c1',
			author: 'a1',
			reviewer: row.reviewer ? 'r1' : null,
			tags: ['t0'],
			image: 7,
		},
		related: { slug: 'judul-terkait', title: 'Simulasi KPR rumah pertama bersama bank contoh' },
		featured: FEATURED.includes(row.slug),
		isNew: true,
		refreshDates: false,
		now,
		...(profile ? { profile } : {}),
	};
}

/** Every reader-visible string of an article payload, joined. */
function visibleText(data) {
	return [
		data.title,
		data.lead_text,
		blocksText(data.content),
		...(data.faq ?? []).flatMap((item) => [item.question, item.answer]),
		...(data.sources ?? []).flatMap((source) => [source.title, source.publisher]),
		...(data.key_takeaways ?? []).map((item) => item.text),
		...(data.corrections ?? []).map((item) => item.note),
		data.seo?.meta_title,
		data.seo?.meta_description,
		data.sponsor_name,
		data.sponsor_disclosure,
	]
		.filter(Boolean)
		.join('\n');
}

function linkUrls(blocks) {
	const urls = [];
	const walk = (nodes) => {
		for (const node of nodes) {
			if (node.type === 'link') {
				urls.push(node.url);
			}
			walk(node.children ?? []);
		}
	};
	walk(blocks);
	return urls;
}

describe('SEED_PROFILE (REQ-SEED-009)', () => {
	it('reads unset or blank as default and accepts default or demo', () => {
		expect(parseSeedProfile(undefined)).toBe('default');
		expect(parseSeedProfile('  ')).toBe('default');
		expect(parseSeedProfile('default')).toBe('default');
		expect(parseSeedProfile(' Demo ')).toBe('demo');
	});

	it('refuses any other value before a request is sent', () => {
		expect(() => parseSeedProfile('staging')).toThrow(SeedGuardError);
		expect(() => parseSeedProfile('staging')).toThrow(
			'Refusing to seed: SEED_PROFILE "staging" is not default or demo.',
		);
	});
});

describe('default profile is the original output', () => {
	it('gives the same article payload with or without the profile set', () => {
		for (const caps of [NONE, ALL]) {
			for (const row of ROWS) {
				expect(articlePayload(row, ctxFor(row, 'default'), caps)).toEqual(
					articlePayload(row, ctxFor(row), caps),
				);
			}
		}
	});

	it('keeps the disclaimers, the "(contoh)" credentials and the original names', () => {
		const data = articlePayload(ARTICLES[0], ctxFor(ARTICLES[0]), ALL);
		expect(blocksText(data.content.slice(0, 1))).toBe(DISCLAIMER);
		expect(authorPayload(AUTHORS[4], 1, ALL).credentials).toBe('CFP® (contoh)');
		expect(tagPayload({ slug: MARKER_TAG, name: 'Data contoh' }, ALL).name).toBe('Data contoh');
		expect(siteSettingsPayload()).toBe(SITE_SETTINGS);
		expect(blocksText(staticPageBody())).toContain(DISCLAIMER);
	});

	it('is flagged by the demo-marker check (the detector works)', () => {
		const hits = ROWS.flatMap((row) =>
			demoMarkerHits(visibleText(articlePayload(row, ctxFor(row), ALL))),
		);
		expect(hits).toContain('disclaimer');
		expect(hits.length).toBeGreaterThan(ROWS.length);
	});
});

describe('demo profile (REQ-SEED-010)', () => {
	it('leaves no demo marker in any article, for every row and every capability', () => {
		for (const caps of [NONE, ALL]) {
			for (const row of ROWS) {
				const data = articlePayload(row, ctxFor(row, 'demo'), caps);
				expect(demoMarkerHits(visibleText(data)), row.slug).toEqual([]);
			}
		}
	});

	it('drops only the disclaimer paragraphs and keeps every link URL', () => {
		for (const row of ROWS) {
			const original = articlePayload(row, ctxFor(row), ALL).content;
			const demo = articlePayload(row, ctxFor(row, 'demo'), ALL).content;
			expect(demo.length, row.slug).toBe(original.length - 2);
			expect(linkUrls(demo), row.slug).toEqual(linkUrls(original));
		}
	});

	it('keeps leads at 120–220 characters', () => {
		for (const row of ROWS) {
			const { lead_text: lead } = articlePayload(row, ctxFor(row, 'demo'), ALL);
			expect(lead.length, row.slug).toBeGreaterThanOrEqual(120);
			expect(lead.length, row.slug).toBeLessThanOrEqual(220);
		}
	});

	it('keeps the marker tag, slugs, fictional institutions and example links', () => {
		const pr = ARTICLES.find((row) => row.type === 'PR');
		const data = articlePayload(pr, ctxFor(pr, 'demo'), ALL);
		expect(tagSlugsFor(pr)[0]).toBe(MARKER_TAG);
		expect(data.sponsor_name).toBe('Sponsor Contoh');
		expect(data.sponsor_url).toBe('https://example.com');
		expect(blocksText(data.content)).toContain('Sponsor Contoh');
		expect(data.seo.no_index).toBe(true);
	});

	it('cleans people, taxonomy, media alt text, pages and Site Settings', () => {
		for (const author of AUTHORS) {
			const data = authorPayload(author, 1, ALL, 'demo');
			expect(data.full_name).toBe(author.full_name);
			expect(
				demoMarkerHits(
					[data.bio, data.credentials, ...data.same_as.map((link) => link.label)].join(
						'\n',
					),
				),
				author.slug,
			).toEqual([]);
			expect(demoMarkerHits(avatarAlt(author.full_name, 'demo'))).toEqual([]);
		}
		expect(authorPayload(AUTHORS[4], 1, ALL, 'demo').credentials).toBe('CFP®');
		for (const [order, category] of allCategories().entries()) {
			const { description } = categoryPayload(category, null, ALL, order + 1, 'demo');
			expect(demoMarkerHits(description), category.slug).toEqual([]);
			expect(description.length, category.slug).toBeGreaterThanOrEqual(120);
			expect(description.length, category.slug).toBeLessThanOrEqual(200);
			expect(demoMarkerHits(categoryImageAlt(category.name, 'demo'))).toEqual([]);
		}
		for (const tag of TAGS.filter((t) => t.slug !== MARKER_TAG)) {
			expect(demoMarkerHits(tagPayload(tag, ALL, 'demo').description), tag.slug).toEqual([]);
		}
		expect(demoMarkerHits(blocksText(staticPageBody('demo')))).toEqual([]);
		expect(demoMarkerHits(JSON.stringify(siteSettingsPayload('demo')))).toEqual([]);
	});

	it('never rewrites URLs', () => {
		expect(demoText('https://example.com/produk-contoh')).toBe(
			'https://example.com/produk-contoh',
		);
		expect(blocksFor([{ type: 'link', url: '/artikel/a', children: [] }], 'demo')).toEqual([
			{ type: 'link', url: '/artikel/a', children: [] },
		]);
	});
});

describe('recorded profile (REQ-SEED-011)', () => {
	it('names the marker tag per profile and reads it back', () => {
		expect(tagPayload({ slug: MARKER_TAG, name: 'Data contoh' }, NONE, 'demo').name).toBe(
			markerTagName('demo'),
		);
		expect(profileFromMarkerName(markerTagName('demo'))).toBe('demo');
		expect(profileFromMarkerName(markerTagName('default'))).toBe('default');
	});

	it('verifies the recorded profile and fails on a mismatch, without guessing', () => {
		expect(resolveVerifyProfile(undefined, 'Data contoh · demo')).toMatchObject({
			profile: 'demo',
			recorded: 'demo',
			ok: true,
		});
		expect(resolveVerifyProfile('demo', 'Data contoh · demo').ok).toBe(true);
		expect(resolveVerifyProfile('default', 'Data contoh · demo')).toMatchObject({
			profile: 'default',
			ok: false,
		});
		expect(resolveVerifyProfile(undefined, null)).toMatchObject({
			profile: 'default',
			recorded: null,
			ok: false,
		});
		expect(() => resolveVerifyProfile('bogus', 'Data contoh')).toThrow(SeedGuardError);
	});
});
