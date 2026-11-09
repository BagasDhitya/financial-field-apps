import { ARTICLES } from '@/data/articles';
import { AUTHORS } from '@/data/authors';
import { CATEGORIES } from '@/data/categories';
import { MEDIA, type MediaKey } from '@/data/media';
import { STATIC_PAGES } from '@/data/pages';
import { TAGS } from '@/data/tags';
import { TICKERS } from '@/data/tickers';
import type { ArticleEntry } from '@/data/types';
import type {
	Article,
	ArticleSummary,
	Author,
	AuthorSummary,
	Category,
	CategoryNode,
	CategorySummary,
	MediaAsset,
	SeoFields,
	StaticPage,
	StockMention,
	Tag,
	TagSummary,
} from '@/types';

/**
 * The hardcoded content in src/data, resolved once into domain types
 * (PRP-0002.p1 §S4.8). Every relation is a slug, checked here: a typo or a
 * duplicate throws, so `next build` stops instead of shipping a broken link.
 * Nothing outside src/lib/content reads src/data.
 */

function fail(message: string): never {
	throw new Error(`src/data: ${message}`);
}

function indexBySlug<T extends { slug: string }>(
	kind: string,
	items: readonly T[],
): Map<string, T> {
	const map = new Map<string, T>();
	for (const item of items) {
		if (map.has(item.slug)) {
			fail(`duplicate ${kind} slug "${item.slug}"`);
		}
		map.set(item.slug, item);
	}
	return map;
}

function need<T>(map: ReadonlyMap<string, T>, slug: string, kind: string, owner: string): T {
	return map.get(slug) ?? fail(`${owner} refers to unknown ${kind} "${slug}"`);
}

function mediaOf(key: MediaKey | undefined): MediaAsset | null {
	return key ? MEDIA[key] : null;
}

function seoOf(seo: Partial<SeoFields> | undefined): SeoFields | null {
	return seo
		? {
				metaTitle: seo.metaTitle ?? null,
				metaDescription: seo.metaDescription ?? null,
				focusKeyword: seo.focusKeyword ?? null,
				ogImage: seo.ogImage ?? null,
				canonicalUrl: seo.canonicalUrl ?? null,
				noIndex: seo.noIndex ?? false,
			}
		: null;
}

// ---- Categories ---------------------------------------------------------------

const categoryList: Category[] = CATEGORIES.flatMap((top) => {
	const parent: CategorySummary = {
		id: top.slug,
		slug: top.slug,
		name: top.name,
		parentSlug: null,
		parentName: null,
	};
	const children: CategorySummary[] = top.children.map((child) => ({
		id: child.slug,
		slug: child.slug,
		name: child.name,
		parentSlug: top.slug,
		parentName: top.name,
	}));
	return [
		{ ...parent, description: top.description, icon: null, parent: null, children, seo: null },
		...top.children.map((child, index) => ({
			...(children[index] as CategorySummary),
			description: child.description,
			icon: null,
			parent,
			children: [],
			seo: null,
		})),
	];
});

const categoriesBySlug = indexBySlug('category', categoryList);

/** The two-level topic tree, in menu order (REQ-NAV-002). */
export const categoryTree: CategoryNode[] = CATEGORIES.map((top, index) => {
	const category = need(categoriesBySlug, top.slug, 'category', 'the topic tree');
	return {
		id: category.id,
		slug: category.slug,
		name: category.name,
		parentSlug: null,
		parentName: null,
		description: category.description,
		navOrder: index + 1,
		children: category.children,
	};
});

/** Every category, top-level first in menu order, each followed by its children. */
export const categories: readonly Category[] = categoryList;

/** Category by slug, or undefined. */
export function findCategory(slug: string): Category | undefined {
	return categoriesBySlug.get(slug);
}

function categorySummary(category: Category): CategorySummary {
	return {
		id: category.id,
		slug: category.slug,
		name: category.name,
		parentSlug: category.parentSlug,
		parentName: category.parentName,
	};
}

// ---- Tags, authors, tickers -----------------------------------------------------

const tagList: Tag[] = TAGS.map((tag) => ({
	id: tag.slug,
	slug: tag.slug,
	name: tag.name,
	description: tag.description,
	seo: null,
}));

const tagsBySlug = indexBySlug('tag', tagList);

/** Tag by slug, or undefined. */
export function findTag(slug: string): Tag | undefined {
	return tagsBySlug.get(slug);
}

const authorList: Author[] = AUTHORS.map((author) => ({
	id: author.slug,
	slug: author.slug,
	fullName: author.fullName,
	roleTitle: author.roleTitle,
	credentials: author.credentials ?? null,
	avatar: mediaOf(author.avatar),
	bio: author.bio,
	sameAs: author.sameAs.filter((url) => url.startsWith('https://') || url.startsWith('http://')),
	expertise: author.expertise,
	seo: null,
}));

const authorsBySlug = indexBySlug('author', authorList);

/** Every author, in the order of src/data/authors.ts. */
export const authors: readonly Author[] = authorList;

/** Author by slug, or undefined. */
export function findAuthor(slug: string): Author | undefined {
	return authorsBySlug.get(slug);
}

function authorSummary(author: Author): AuthorSummary {
	return {
		id: author.id,
		slug: author.slug,
		fullName: author.fullName,
		roleTitle: author.roleTitle,
		credentials: author.credentials,
		avatar: author.avatar,
	};
}

const tickerList: StockMention[] = TICKERS.map((ticker) => ({
	id: ticker.symbol,
	symbol: ticker.symbol,
	companyName: ticker.companyName,
}));

const tickersBySymbol = new Map(tickerList.map((ticker) => [ticker.symbol.toLowerCase(), ticker]));

/** Ticker by symbol (case-insensitive), or undefined. */
export function findTicker(symbol: string): StockMention | undefined {
	return tickersBySymbol.get(symbol.toLowerCase());
}

// ---- Articles -------------------------------------------------------------------

function toArticle(entry: ArticleEntry): Article {
	const owner = `article "${entry.slug}"`;
	if (Number.isNaN(Date.parse(entry.publishedAt))) {
		fail(`${owner} has an invalid publishedAt`);
	}
	const reviewer = entry.reviewer
		? authorSummary(need(authorsBySlug, entry.reviewer, 'author', owner))
		: null;
	const primary = categorySummary(need(categoriesBySlug, entry.category, 'category', owner));
	return {
		id: entry.slug,
		slug: entry.slug,
		title: entry.title,
		leadText: entry.leadText,
		articleType: entry.articleType,
		featuredImage: mediaOf(entry.image),
		primaryCategory: primary,
		author: authorSummary(need(authorsBySlug, entry.author, 'author', owner)),
		publishedAt: entry.publishedAt,
		body: entry.body,
		reviewer,
		// A reviewer without a recorded fact-check is not shown publicly
		// (REQ-ART-002, REQ-SEO-035), so the date gates the reviewer.
		lastReviewedAt: reviewer ? (entry.lastReviewedAt ?? null) : null,
		categories: [primary],
		tags: entry.tags.map((slug) => {
			const tag = need(tagsBySlug, slug, 'tag', owner);
			return { id: tag.id, slug: tag.slug, name: tag.name } satisfies TagSummary;
		}),
		stocksMentioned: (entry.stocks ?? []).map(
			(symbol) => findTicker(symbol) ?? fail(`${owner} refers to unknown ticker "${symbol}"`),
		),
		contentUpdatedAt: entry.contentUpdatedAt ?? null,
		seo: seoOf(entry.seo),
		sponsor: entry.articleType === 'pr_article' ? (entry.sponsor ?? null) : null,
		keyTakeaways: (entry.keyTakeaways ?? []).slice(0, 5),
		faq: entry.faq ?? [],
		sources: entry.sources ?? [],
		corrections: [...(entry.corrections ?? [])].sort((a, b) =>
			(b.date ?? '').localeCompare(a.date ?? ''),
		),
	};
}

/** Newest first, by first publication. */
function byNewest(a: Article, b: Article): number {
	return (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '');
}

const articleList: Article[] = ARTICLES.map(toArticle).sort(byNewest);

const articlesBySlug = indexBySlug('article', articleList);

const categoryPaths = new Set(
	categoryList.map((category) =>
		category.parentSlug ? `${category.parentSlug}/${category.slug}` : category.slug,
	),
);

/** Internal body links must point at a real article or category path. */
function checkBodyLinks(article: Article): void {
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
				if (articleSlug !== undefined && !articlesBySlug.has(articleSlug)) {
					fail(`article "${article.slug}" links to unknown article "${url}"`);
				}
				if (categoryPath !== undefined && !categoryPaths.has(categoryPath)) {
					fail(`article "${article.slug}" links to unknown category "${url}"`);
				}
			}
			if (Array.isArray(children)) {
				walk(children);
			}
		}
	};
	walk(article.body);
}

articleList.forEach(checkBodyLinks);

/** Every published article, newest first. */
export const articles: readonly Article[] = articleList;

/** Article by slug, or undefined. */
export function findArticle(slug: string): Article | undefined {
	return articlesBySlug.get(slug);
}

/**
 * The card-sized part of an article. Listings get only this, so bodies never
 * travel with a list.
 */
export function toSummary(article: Article): ArticleSummary {
	return {
		id: article.id,
		slug: article.slug,
		title: article.title,
		leadText: article.leadText,
		articleType: article.articleType,
		featuredImage: article.featuredImage,
		primaryCategory: article.primaryCategory,
		author: article.author,
		publishedAt: article.publishedAt,
	};
}

// ---- Static pages -----------------------------------------------------------------

const pageList: StaticPage[] = STATIC_PAGES.map((page) => ({
	id: page.slug,
	slug: page.slug,
	title: page.title,
	group: page.group,
	body: page.body,
	seo: null,
	updatedAt: page.updatedAt,
}));

const pagesBySlug = indexBySlug('page', pageList);

/** Every trust and legal page. */
export const pages: readonly StaticPage[] = pageList;

/** Static page by slug, or undefined. */
export function findPage(slug: string): StaticPage | undefined {
	return pagesBySlug.get(slug);
}
