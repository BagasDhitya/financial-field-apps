import { ARTICLES } from '@/data/articles';
import { CATEGORIES } from '@/data/categories';
import { FINANCIAL_PRODUCTS, PRODUCT_CATEGORIES, PROVIDERS } from '@/data/comparison';
import { MEDIA, type MediaKey } from '@/data/media';
import { SITE_NAVIGATION } from '@/data/site-navigation';
import { SITE_SETTING } from '@/data/site-setting';
import { STATIC_PAGES } from '@/data/static-pages';
import { STOCK_TICKERS } from '@/data/stock-tickers';
import { TAGS } from '@/data/tags';
import type { ArticleEntry, BlocksEntry, LoanSpecsEntry, SeoEntry } from '@/data/types';
import { WRITER_PROFILES } from '@/data/writer-profiles';
import { isYouTubeEmbedUrl, parseIsoDuration, parseYouTubeId } from '@/lib/video';

import type { ContentTypeName } from './schema';

/**
 * src/data turned into Strapi documents once, at module load (PRP-0002.p1
 * §S4.8). Relations become references in both directions, as the CMS stores
 * them: an article's `primary_category` also appears in that category's
 * `category` list. A duplicate slug, an unknown relation, a missing featured
 * article, an internal body link to a page that doesn't exist, a broken
 * featured video or an interview without proper turns throws, so `next build`
 * stops and names the entry.
 */

/** A stored document: its system fields plus attribute values. */
export type Doc = {
	id: number;
	documentId: string;
	values: Record<string, unknown>;
};

/** A Strapi upload file as the REST API returns it. */
export type MediaFile = Record<string, unknown> & { id: number; documentId: string };

/** When the hardcoded content was written: the timestamps of undated entries. */
const CONTENT_DATE = '2026-11-09T02:00:00.000Z';

function fail(message: string): never {
	throw new Error(`src/data: ${message}`);
}

/** FNV-1a; turns a stable name into a Strapi-like 24-character document id. */
function documentIdFor(name: string): string {
	let id = '';
	let seed = 0x811c9dc5;
	while (id.length < 24) {
		for (const char of `${id.length}:${name}`) {
			seed ^= char.codePointAt(0) ?? 0;
			seed = Math.imul(seed, 0x01000193) >>> 0;
		}
		id += seed.toString(36);
	}
	return id.slice(0, 24);
}

function stamps(created: string, updated = created): Record<string, string> {
	return { createdAt: created, updatedAt: updated, publishedAt: created };
}

function collection<T extends { slug: string }>(
	type: ContentTypeName,
	entries: readonly T[],
	values: (entry: T) => Record<string, unknown>,
): Map<string, Doc> {
	const docs = new Map<string, Doc>();
	for (const entry of entries) {
		if (docs.has(entry.slug)) {
			fail(`duplicate ${type} slug "${entry.slug}"`);
		}
		docs.set(entry.slug, {
			id: docs.size + 1,
			documentId: documentIdFor(`${type}:${entry.slug}`),
			values: values(entry),
		});
	}
	return docs;
}

function need(docs: ReadonlyMap<string, Doc>, slug: string, kind: string, owner: string): Doc {
	return docs.get(slug) ?? fail(`${owner} refers to unknown ${kind} "${slug}"`);
}

function push(doc: Doc, attribute: string, item: Doc): void {
	const list = (doc.values[attribute] ??= []) as Doc[];
	list.push(item);
}

// ---- Media -------------------------------------------------------------------

const mediaFiles = new Map<string, MediaFile>(
	Object.entries(MEDIA).map(([key, file], index) => [
		key,
		{
			id: index + 1,
			documentId: documentIdFor(`media:${key}`),
			name: file.name,
			alternativeText: file.alternativeText,
			caption: null,
			width: file.width,
			height: file.height,
			formats: null,
			hash: file.name.slice(0, file.name.lastIndexOf('.')),
			ext: file.name.slice(file.name.lastIndexOf('.')),
			mime: file.mime,
			size: null,
			url: file.url,
			previewUrl: null,
			provider: 'local',
			provider_metadata: null,
			...stamps(CONTENT_DATE),
		},
	]),
);

function mediaOf(key: MediaKey | undefined): MediaFile | null {
	return key ? (mediaFiles.get(key) ?? null) : null;
}

function seoOf(seo: SeoEntry | undefined): Record<string, unknown> | null {
	return seo
		? {
				id: 1,
				meta_title: seo.meta_title ?? null,
				meta_description: seo.meta_description ?? null,
				focus_keyword: seo.focus_keyword ?? null,
				og_image: mediaOf(seo.og_image),
				canonical_url: seo.canonical_url ?? null,
				no_index: seo.no_index ?? false,
			}
		: null;
}

/** Repeatable component items get the ids Strapi gives them: 1, 2, 3… */
function items<T>(list: readonly T[] | undefined): (T & { id: number })[] {
	return (list ?? []).map((item, index) => ({ id: index + 1, ...item }));
}

/** Which article each video is on: the same video twice is a copy-paste slip. */
const videoOwners = new Map<string, string>();

/**
 * The `article.video` component (CMS-30), checked: an `/embed/` YouTube link
 * as the CMS developer specified, the credit and caption filled in, an ISO
 * 8601 duration, and not uploaded after the article's last date (a video
 * can't be in an article before it exists).
 */
function videoOf(entry: ArticleEntry): Record<string, unknown> | null {
	const video = entry.video;
	if (!video) {
		return null;
	}
	const owner = `article "${entry.slug}"`;
	if (!isYouTubeEmbedUrl(video.embedUrl)) {
		fail(`${owner} has a video embedUrl that isn't a YouTube /embed/ link`);
	}
	const id = parseYouTubeId(video.embedUrl) ?? fail(`${owner} has an unreadable video embedUrl`);
	const other = videoOwners.get(id);
	if (other) {
		fail(`${owner} has the same video as article "${other}"`);
	}
	videoOwners.set(id, entry.slug);
	for (const field of ['title', 'channel', 'caption'] as const) {
		if (!video[field].trim()) {
			fail(`${owner} has an empty video ${field}`);
		}
	}
	const uploaded = Date.parse(video.uploadedAt);
	if (Number.isNaN(uploaded) || !video.uploadedAt.endsWith('Z')) {
		fail(`${owner} has a video uploadedAt that isn't an ISO 8601 UTC time`);
	}
	if (uploaded > Date.parse(entry.content_updated_at ?? entry.first_published_at)) {
		fail(`${owner} has a video uploaded after the article's last date`);
	}
	if (parseIsoDuration(video.duration) === null) {
		fail(`${owner} has a video duration that isn't ISO 8601 (e.g. PT1M30S)`);
	}
	return {
		id: 1,
		title: video.title,
		channel: video.channel,
		uploadedAt: video.uploadedAt,
		duration: video.duration,
		caption: video.caption,
		embedUrl: video.embedUrl,
	};
}

/**
 * The `article.chat-bubble` turns (CMS-31), checked: only on interviews, and
 * every interview has at least one turn on each side, each with a speaker
 * name, a message and a position.
 */
function dialoguesOf(entry: ArticleEntry): Record<string, unknown>[] {
	const owner = `article "${entry.slug}"`;
	const turns = entry.interview_dialogues ?? [];
	if (entry.article_type !== 'interview') {
		if (turns.length > 0) {
			fail(`${owner} has interview_dialogues but is not an interview`);
		}
		return [];
	}
	for (const [index, turn] of turns.entries()) {
		if (!turn.speaker_name.trim() || !turn.message.trim()) {
			fail(`${owner} has an empty speaker_name or message in turn ${index + 1}`);
		}
		if (turn.position !== 'left' && turn.position !== 'right') {
			fail(`${owner} has an invalid position in turn ${index + 1}`);
		}
	}
	const sides = new Set(turns.map((turn) => turn.position));
	if (!sides.has('left') || !sides.has('right')) {
		fail(`${owner} is an interview without turns on both sides (interview_dialogues)`);
	}
	return turns.map((turn, index) => ({
		id: index + 1,
		speaker_name: turn.speaker_name,
		speaker_role: turn.speaker_role ?? null,
		speaker_avatar: mediaOf(turn.speaker_avatar),
		message: turn.message,
		position: turn.position,
	}));
}

// ---- Collections -------------------------------------------------------------

const categories = collection('categories', CATEGORIES, (entry) => ({
	name: entry.name,
	slug: entry.slug,
	description: entry.description,
	nav_order: CATEGORIES.indexOf(entry) + 1,
	show_in_nav: entry.show_in_nav ?? true,
	icon: mediaOf(entry.icon),
	seo: seoOf(entry.seo),
	...stamps(CONTENT_DATE),
	categories: [],
	category: [],
	articles: [],
}));
for (const entry of CATEGORIES) {
	const doc = need(categories, entry.slug, 'category', 'categories');
	const parent = entry.parent_category
		? need(categories, entry.parent_category, 'category', `category "${entry.slug}"`)
		: null;
	doc.values.parent_category = parent;
	if (parent) {
		push(parent, 'categories', doc);
	}
}

const tags = collection('tags', TAGS, (entry) => ({
	name: entry.name,
	slug: entry.slug,
	description: entry.description,
	seo: seoOf(entry.seo),
	...stamps(CONTENT_DATE),
	articles: [],
}));

const writerProfiles = collection('writer-profiles', WRITER_PROFILES, (entry) => ({
	full_name: entry.full_name,
	slug: entry.slug,
	role_title: entry.role_title,
	bio: entry.bio,
	credentials: entry.credentials ?? null,
	expertise: entry.expertise,
	background: entry.background ?? null,
	financial_view: entry.financial_view ?? null,
	avatar: mediaOf(entry.avatar),
	same_as: items(entry.same_as),
	seo: seoOf(entry.seo),
	...stamps(CONTENT_DATE),
	articles: [],
	article: [],
}));

const stockTickers = new Map<string, Doc>();
for (const entry of STOCK_TICKERS) {
	const key = entry.ticker_symbol.toLowerCase();
	if (stockTickers.has(key)) {
		fail(`duplicate stock ticker "${entry.ticker_symbol}"`);
	}
	stockTickers.set(key, {
		id: stockTickers.size + 1,
		documentId: documentIdFor(`stock-tickers:${key}`),
		values: {
			ticker_symbol: entry.ticker_symbol,
			company_name: entry.company_name,
			...stamps(CONTENT_DATE),
			articles: [],
		},
	});
}

const articles = collection('articles', ARTICLES, (entry) => {
	if (Number.isNaN(Date.parse(entry.first_published_at))) {
		fail(`article "${entry.slug}" has an invalid first_published_at`);
	}
	return {
		title: entry.title,
		slug: entry.slug,
		lead_text: entry.lead_text,
		content: entry.content,
		article_type: entry.article_type,
		first_published_at: entry.first_published_at,
		content_updated_at: entry.content_updated_at ?? null,
		last_reviewed_at: entry.last_reviewed_at ?? null,
		sponsor_name: entry.sponsor_name ?? null,
		sponsor_url: entry.sponsor_url ?? null,
		sponsor_disclosure: entry.sponsor_disclosure ?? null,
		featured_image: mediaOf(entry.featured_image),
		seo: seoOf(entry.seo),
		faq: items(entry.faq),
		sources: items(entry.sources),
		key_takeaways: items(entry.key_takeaways),
		corrections: items(entry.corrections),
		interview_dialogues: dialoguesOf(entry),
		video: videoOf(entry),
	};
});
for (const entry of ARTICLES) {
	const owner = `article "${entry.slug}"`;
	const doc = need(articles, entry.slug, 'article', 'articles');
	const primary = need(categories, entry.primary_category, 'category', owner);
	const author = need(writerProfiles, entry.author, 'writer profile', owner);
	const reviewer = entry.reviewer
		? need(writerProfiles, entry.reviewer, 'writer profile', owner)
		: null;
	Object.assign(doc.values, {
		...stamps(entry.first_published_at, entry.content_updated_at ?? entry.first_published_at),
		primary_category: primary,
		categories: (entry.categories ?? [entry.primary_category]).map((slug) =>
			need(categories, slug, 'category', owner),
		),
		author,
		reviewer,
		tags: entry.tags.map((slug) => need(tags, slug, 'tag', owner)),
		stocks_mentioned: (entry.stocks_mentioned ?? []).map(
			(symbol) =>
				stockTickers.get(symbol.toLowerCase()) ??
				fail(`${owner} refers to unknown stock ticker "${symbol}"`),
		),
	});
	push(primary, 'category', doc);
	push(author, 'articles', doc);
	if (reviewer) {
		push(reviewer, 'article', doc);
	}
	for (const category of doc.values.categories as Doc[]) {
		push(category, 'articles', doc);
	}
	for (const tag of doc.values.tags as Doc[]) {
		push(tag, 'articles', doc);
	}
	for (const ticker of doc.values.stocks_mentioned as Doc[]) {
		push(ticker, 'articles', doc);
	}
}

const staticPages = collection('static-pages', STATIC_PAGES, (entry) => ({
	title: entry.title,
	slug: entry.slug,
	group: entry.group,
	body: entry.body,
	seo: seoOf(entry.seo),
	...stamps(entry.updatedAt),
}));

// ---- Comparison catalogue (ADR-0011, ADR-0022) ---------------------------------------

/** The loan terms (planned CMS-26), checked: each minimum at or below its maximum. */
function loanSpecsOf(
	owner: string,
	specs: LoanSpecsEntry | undefined,
): Record<string, unknown> | null {
	if (!specs) {
		return null;
	}
	if (specs.rate_type !== 'flat' && specs.rate_type !== 'efektif') {
		fail(`${owner} has an invalid loan_specs rate_type`);
	}
	for (const [low, high] of [
		['rate_min', 'rate_max'],
		['amount_min', 'amount_max'],
		['tenor_min', 'tenor_max'],
	] as const) {
		if (!(specs[low] > 0) || specs[low] > specs[high]) {
			fail(`${owner} has loan_specs ${low} above ${high}, or not positive`);
		}
	}
	return {
		id: 1,
		rate_type: specs.rate_type,
		rate_min: specs.rate_min,
		rate_max: specs.rate_max,
		amount_min: specs.amount_min,
		amount_max: specs.amount_max,
		tenor_min: specs.tenor_min,
		tenor_max: specs.tenor_max,
		down_payment_min: specs.down_payment_min ?? null,
		max_financing: specs.max_financing ?? null,
		fees: specs.fees ?? null,
	};
}

/** Demo links must stay on example.com (REQ-SEED-014): nothing can pass for a real offer. */
function demoUrl(owner: string, field: string, url: string): string {
	if (!url.startsWith('https://example.com/')) {
		fail(`${owner} has a ${field} outside https://example.com/`);
	}
	return url;
}

const productCategories = collection('product-categories', PRODUCT_CATEGORIES, (entry) => ({
	name: entry.name,
	slug: entry.slug,
	description: entry.description,
	nav_order: PRODUCT_CATEGORIES.indexOf(entry) + 1,
	show_in_nav: entry.show_in_nav ?? true,
	seo: seoOf(entry.seo),
	...stamps(CONTENT_DATE),
	financial_products: [],
	children: [],
}));
for (const entry of PRODUCT_CATEGORIES) {
	const doc = need(productCategories, entry.slug, 'product category', 'product categories');
	const parent = entry.parent
		? need(
				productCategories,
				entry.parent,
				'product category',
				`product category "${entry.slug}"`,
			)
		: null;
	if (parent?.values.parent) {
		fail(`product category "${entry.slug}" is nested more than two levels (CMS-28)`);
	}
	doc.values.parent = parent;
	if (parent) {
		push(parent, 'children', doc);
	}
}

const providers = collection('providers', PROVIDERS, (entry) => ({
	name: entry.name,
	slug: entry.slug,
	logo: mediaOf(entry.logo),
	legal_name: entry.legal_name,
	regulator: entry.regulator,
	license_number: entry.license_number,
	website_url: demoUrl(`provider "${entry.slug}"`, 'website_url', entry.website_url),
	description: entry.description,
	seo: null,
	...stamps(CONTENT_DATE),
	financial_products: [],
}));

const financialProducts = collection('financial-products', FINANCIAL_PRODUCTS, (entry) => {
	const owner = `financial product "${entry.slug}"`;
	if (Number.isNaN(Date.parse(entry.data_checked_at))) {
		fail(`${owner} has an invalid data_checked_at`);
	}
	return {
		title: entry.title,
		slug: entry.slug,
		min_income: entry.min_income ?? null,
		annual_fee: entry.annual_fee ?? null,
		features: entry.features,
		apply_url: demoUrl(owner, 'apply_url', entry.apply_url),
		image: mediaOf(entry.image),
		summary: entry.summary,
		seo: seoOf(entry.seo),
		data_checked_at: entry.data_checked_at,
		source_url: demoUrl(owner, 'source_url', entry.source_url),
		is_partner: entry.is_partner ?? false,
		loan_specs: loanSpecsOf(owner, entry.loan_specs),
		...stamps(CONTENT_DATE),
	};
});
for (const entry of FINANCIAL_PRODUCTS) {
	const owner = `financial product "${entry.slug}"`;
	const doc = need(financialProducts, entry.slug, 'financial product', 'financial products');
	const section = need(productCategories, entry.product_category, 'product category', owner);
	if ((section.values.children as Doc[]).length > 0) {
		fail(`${owner} sits in the group "${entry.product_category}"; use one of its sections`);
	}
	const owningProvider = need(providers, entry.provider, 'provider', owner);
	doc.values.product_category = section;
	doc.values.provider = owningProvider;
	push(section, 'financial_products', doc);
	push(owningProvider, 'financial_products', doc);
}

// ---- Single types --------------------------------------------------------------

const siteNavigation: Doc = {
	id: 1,
	documentId: documentIdFor('site-navigation'),
	values: {
		...stamps(CONTENT_DATE),
		menu_item: items(SITE_NAVIGATION.menu_item).map((item) => ({
			id: item.id,
			label: item.label,
			url: item.url ?? null,
			category_ref: (item.category_ref ?? []).map((slug) =>
				need(categories, slug, 'category', 'site navigation menu'),
			),
		})),
		featured_articles: SITE_NAVIGATION.featured_articles.map((slug) =>
			need(articles, slug, 'article', 'site navigation featured_articles'),
		),
	},
};

const siteSetting: Doc = {
	id: 1,
	documentId: documentIdFor('site-setting'),
	values: {
		...stamps(CONTENT_DATE),
		tagline: SITE_SETTING.tagline,
		description: SITE_SETTING.description,
		contact_email: SITE_SETTING.contact_email,
		default_pr_disclosure: SITE_SETTING.default_pr_disclosure,
		logo: mediaOf(SITE_SETTING.logo),
		default_og_image: mediaOf(SITE_SETTING.default_og_image),
		social_links: items(SITE_SETTING.social_links),
	},
};

// ---- Internal links ----------------------------------------------------------------

const categoryPaths = new Set(
	CATEGORIES.map((entry) =>
		entry.parent_category ? `${entry.parent_category}/${entry.slug}` : entry.slug,
	),
);

/** Internal links must point at a real article or category path. */
function checkLinks(owner: string, body: BlocksEntry): void {
	const walk = (nodes: readonly unknown[]): void => {
		for (const node of nodes) {
			if (typeof node !== 'object' || node === null) {
				continue;
			}
			const { type, url, children } = node as {
				type?: unknown;
				url?: unknown;
				children?: unknown;
			};
			if (type === 'link' && typeof url === 'string') {
				const articleSlug = url.match(/^\/artikel\/([^/?#]+)$/)?.[1];
				const categoryPath = url.match(/^\/kategori\/([^?#]+)$/)?.[1];
				if (articleSlug !== undefined && !articles.has(articleSlug)) {
					fail(`${owner} links to unknown article "${url}"`);
				}
				if (categoryPath !== undefined && !categoryPaths.has(categoryPath)) {
					fail(`${owner} links to unknown category "${url}"`);
				}
			}
			if (Array.isArray(children)) {
				walk(children);
			}
		}
	};
	walk(body);
}

for (const entry of ARTICLES) {
	checkLinks(`article "${entry.slug}"`, entry.content);
}
for (const entry of STATIC_PAGES) {
	checkLinks(`static page "${entry.slug}"`, entry.body);
}

// ---- Exports -------------------------------------------------------------------------

/** Documents per collection type, in file order (Strapi's default order is by id). */
export const COLLECTIONS: Record<string, readonly Doc[]> = {
	articles: [...articles.values()],
	categories: [...categories.values()],
	tags: [...tags.values()],
	'writer-profiles': [...writerProfiles.values()],
	'stock-tickers': [...stockTickers.values()],
	'static-pages': [...staticPages.values()],
	'financial-products': [...financialProducts.values()],
	'product-categories': [...productCategories.values()],
	providers: [...providers.values()],
};

/** The document of each single type. */
export const SINGLES: Record<string, Doc> = {
	'site-navigation': siteNavigation,
	'site-setting': siteSetting,
};

/** True for a value that is a stored document (a resolved relation). */
export function isDoc(value: unknown): value is Doc {
	return (
		typeof value === 'object' &&
		value !== null &&
		'documentId' in value &&
		'values' in value &&
		typeof (value as Doc).id === 'number'
	);
}
