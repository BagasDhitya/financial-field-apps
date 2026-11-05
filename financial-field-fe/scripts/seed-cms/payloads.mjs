/**
 * Pure payload builders (PRP-0002.p1 §S4.5–§S4.6). Gated fields are added only
 * when their capability is on (REQ-SEED-006), mirroring src/lib/cms/queries.
 * Every builder takes the seed profile last (§D4.2); `default` is the
 * original output.
 */
import { PLACEHOLDER_TEXT, SITE_SETTINGS } from './data/pages.mjs';
import { AUTHORS } from './data/people.mjs';
import { MARKER_TAG, categoryName, topLevelOf } from './data/taxonomy.mjs';
import {
	DISCLAIMER,
	buildBody,
	buildCorrection,
	buildFaq,
	buildLead,
	buildSources,
	buildTakeaways,
} from './generate.mjs';
import { DEMO_LEAD_PADS, blocksFor, demoText, markerTagName, textFor } from './profile.mjs';

const HOUR = 3_600_000;

/** Published date for row n, relative to the run (§S4.6). */
export function publishedAtFor(n, now) {
	return new Date(now.getTime() - (n - 1) * 34 * HOUR - 2 * HOUR).toISOString();
}

/**
 * Category body. Nav fields are sent only with the `category-nav` capability,
 * because strictParams rejects unknown keys.
 */
export function categoryPayload(category, parentDocumentId, caps, order, profile = 'default') {
	return {
		name: category.name,
		parent_category: { set: parentDocumentId ? [parentDocumentId] : [] },
		...(caps.has('category-nav')
			? {
					description: textFor(category.description, profile),
					nav_order: order,
					show_in_nav: true,
				}
			: {}),
	};
}

/**
 * Tag body. The description is sent only with the `tag-description` capability.
 * The hidden marker tag's name records the profile of the run (REQ-SEED-011).
 */
export function tagPayload(tag, caps, profile = 'default') {
	return {
		name: tag.slug === MARKER_TAG ? markerTagName(profile) : tag.name,
		...(caps.has('tag-description') ? { description: textFor(tag.description, profile) } : {}),
	};
}

/**
 * Author body. Profile fields are sent only with the `author-profile`
 * capability.
 */
export function authorPayload(author, avatarId, caps, profile = 'default') {
	const demo = profile === 'demo';
	return {
		full_name: author.full_name,
		role_title: author.role_title,
		bio: demo ? demoBio(author) : author.bio,
		avatar: avatarId ?? null,
		...(caps.has('author-profile')
			? {
					credentials: demo
						? (author.credentials?.replace(' (contoh)', '') ?? null)
						: author.credentials,
					same_as: demo
						? author.same_as.map((link) => ({ ...link, label: 'Profil' }))
						: author.same_as,
					expertise: author.expertise,
					is_reviewer: author.reviewer,
				}
			: {}),
	};
}

/** A two-sentence bio without demo markers: role, then focus (demo profile). */
function demoBio(author) {
	return `${author.full_name} adalah ${author.role_title.toLowerCase()} untuk Financial Field Indonesia. Fokusnya adalah ${author.expertise.join(' dan ').toLowerCase()}.`;
}

/** Category path for links: /kategori/<parent>/<sub> or /kategori/<top>. */
export function categoryPath(slug) {
	const top = topLevelOf(slug);
	return top && top !== slug ? `${top}/${slug}` : slug;
}

/**
 * @param {import("./data/articles.mjs").SeedArticle} row
 * @param {{
 *   ids: { category: string, author: string, reviewer: string | null, tags: string[], image: number | null },
 *   related: { slug: string, title: string } | null,
 *   featured: boolean, isNew: boolean, refreshDates: boolean, now: Date,
 *   profile?: 'default' | 'demo'
 * }} ctx
 * @param {Set<string>} caps
 */
export function articlePayload(row, ctx, caps) {
	const profile = ctx.profile ?? 'default';
	const demo = profile === 'demo';
	const has = (variant) => row.variants.includes(variant);
	const title = textFor(row.title, profile);
	const lead = demo
		? buildLead(row, { answer: demoText(row.answer), pad: DEMO_LEAD_PADS[row.type] })
		: buildLead(row);
	const published = publishedAtFor(Math.min(row.n, 60), ctx.now);
	const data = {
		title,
		lead_text: lead,
		content: blocksFor(
			buildBody(row, {
				categoryName: categoryName(row.category),
				categoryPath: categoryPath(row.category),
				related: ctx.related,
			}),
			profile,
		),
		article_type: {
			S: 'standard',
			PR: 'pr_article',
			I: 'interview',
			C: 'column',
		}[row.type],
		featured_image: has('NoImg') ? null : ctx.ids.image,
		primary_category: { set: [ctx.ids.category] },
		categories: { set: [ctx.ids.category] },
		author: { set: [ctx.ids.author] },
		reviewer: { set: ctx.ids.reviewer ? [ctx.ids.reviewer] : [] },
		tags: { set: ctx.ids.tags },
	};

	if (caps.has('seo')) {
		data.seo = {
			// Second safety net besides staging noindex (§S4.5).
			no_index: true,
			...(ctx.featured
				? {
						meta_title: title.slice(0, 70),
						meta_description: lead.slice(0, 160),
					}
				: {}),
		};
	}
	if (caps.has('sponsor') && row.type === 'PR') {
		data.sponsor_name = 'Sponsor Contoh';
		data.sponsor_url = 'https://example.com';
		data.sponsor_disclosure = demo
			? 'Artikel ini dibuat atas kerja sama dengan Sponsor Contoh.'
			: 'Artikel ini dibuat atas kerja sama dengan Sponsor Contoh (fiktif). Konten bersponsor untuk pengujian.';
	}
	if (caps.has('faq') && has('F')) {
		data.faq = buildFaq(row).map((item) => ({
			question: textFor(item.question, profile),
			answer: textFor(item.answer, profile),
		}));
	}
	if (caps.has('sources') && has('Src')) {
		data.sources = buildSources(row).map((source) => ({
			...source,
			title: textFor(source.title, profile),
		}));
	}
	if (caps.has('takeaways') && has('K')) {
		data.key_takeaways = buildTakeaways(row).map((item) => ({
			text: textFor(item.text, profile),
		}));
	}
	if (caps.has('corrections') && has('Cor')) {
		data.corrections = buildCorrection().map((item) => ({
			...item,
			note: textFor(item.note, profile),
		}));
	}
	if (caps.has('dates')) {
		if (ctx.isNew || ctx.refreshDates) {
			data.first_published_at = published;
		}
		data.content_updated_at = has('U')
			? new Date(Date.parse(published) + 72 * HOUR).toISOString()
			: null;
		data.last_reviewed_at = ctx.ids.reviewer
			? new Date(Date.parse(published) + 24 * HOUR).toISOString()
			: null;
	}
	if (caps.has('editorial')) {
		data.editorial_status = row.draft ?? 'approved';
	}
	return data;
}

/**
 * Trust-page placeholder body (`static-pages` capability). The demo profile
 * shows a neutral "being prepared" line instead of the placeholder notice and
 * disclaimer.
 */
export function staticPageBody(profile = 'default') {
	if (profile === 'demo') {
		return [
			{
				type: 'paragraph',
				children: [
					{
						type: 'text',
						text: 'Informasi lengkap untuk halaman ini sedang disiapkan oleh redaksi.',
					},
				],
			},
		];
	}
	return [
		{
			type: 'paragraph',
			children: [{ type: 'text', text: PLACEHOLDER_TEXT, italic: true }],
		},
		{ type: 'paragraph', children: [{ type: 'text', text: DISCLAIMER }] },
	];
}

/** Site Settings body (`site-settings` capability), without demo markers in `demo`. */
export function siteSettingsPayload(profile = 'default') {
	if (profile !== 'demo') {
		return SITE_SETTINGS;
	}
	return {
		...SITE_SETTINGS,
		description:
			'Financial Field Indonesia menyajikan artikel dan panduan keuangan pribadi untuk pembaca di Indonesia.',
		default_pr_disclosure: 'Artikel ini adalah konten bersponsor.',
		social_links: SITE_SETTINGS.social_links.map((link) => ({
			...link,
			platform: link.platform.replace(' (contoh)', ''),
		})),
	};
}

/** Tag slugs for a row: the marker always first (REQ-SEED-002). */
export function tagSlugsFor(row) {
	return [MARKER_TAG, ...row.tags];
}

/** Slugs of the six fictional seed people in data/people.mjs. */
export const AUTHOR_SLUGS = AUTHORS.map((author) => author.slug);
