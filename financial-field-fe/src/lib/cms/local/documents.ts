import { ARTICLES } from '@/data/articles';
import { CATEGORIES } from '@/data/categories';
import { MEDIA, type MediaKey } from '@/data/media';
import { SITE_NAVIGATION } from '@/data/site-navigation';
import { SITE_SETTING } from '@/data/site-setting';
import { STATIC_PAGES } from '@/data/static-pages';
import { STOCK_TICKERS } from '@/data/stock-tickers';
import { TAGS } from '@/data/tags';
import type { BlocksEntry, SeoEntry } from '@/data/types';
import { WRITER_PROFILES } from '@/data/writer-profiles';

import type { ContentTypeName } from './schema';

/**
 * src/data turned into Strapi documents once, at module load (PRP-0002.p1
 * §S4.8). Relations become references in both directions, as the CMS stores
 * them: an article's `primary_category` also appears in that category's
 * `category` list. A duplicate slug, an unknown relation, a missing featured
 * article or an internal body link to a page that doesn't exist throws, so
 * `next build` stops and names the entry.
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
