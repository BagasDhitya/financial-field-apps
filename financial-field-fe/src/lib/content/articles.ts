import { LISTING_PAGE_SIZE } from '@/lib/pagination';
import type { Article, ArticleSummary, Paginated } from '@/types';

import { paginate } from './paginate';
import { rankRelated } from './related';
import { articles, findArticle, toSummary } from './store';

/**
 * Article reads over the hardcoded content (PRP-0002.p1 §S4.8). They stay
 * async, so routes don't change when a CMS source comes back.
 */

function listing(
	matches: (article: Article) => boolean,
	page: number,
	pageSize: number,
): Paginated<ArticleSummary> {
	return paginate(articles.filter(matches).map(toSummary), page, pageSize);
}

/** Published article by slug, or null; the route turns null into notFound(). */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
	return findArticle(slug) ?? null;
}

/** Newest articles across all categories. */
export async function getLatestArticles(
	page = 1,
	pageSize = LISTING_PAGE_SIZE,
): Promise<Paginated<ArticleSummary>> {
	return listing(() => true, page, pageSize);
}

/**
 * Articles whose primary category is in the list. A parent category page passes
 * its children too.
 */
export async function getArticlesInCategories(
	categorySlugs: string[],
	page = 1,
	pageSize = LISTING_PAGE_SIZE,
): Promise<Paginated<ArticleSummary>> {
	const wanted = new Set(categorySlugs);
	return listing((article) => wanted.has(article.primaryCategory?.slug ?? ''), page, pageSize);
}

/** Articles carrying the tag, newest first. */
export async function getArticlesByTag(
	tagSlug: string,
	page = 1,
): Promise<Paginated<ArticleSummary>> {
	return listing(
		(article) => article.tags.some((tag) => tag.slug === tagSlug),
		page,
		LISTING_PAGE_SIZE,
	);
}

/**
 * Articles the person wrote or reviewed, depending on `role` (REQ-LIST-003).
 */
export async function getArticlesByAuthor(
	authorSlug: string,
	role: 'author' | 'reviewer',
	page = 1,
): Promise<Paginated<ArticleSummary>> {
	return listing((article) => article[role]?.slug === authorSlug, page, LISTING_PAGE_SIZE);
}

/** Articles of type `interview`, for /wawancara. */
export async function getInterviewArticles(page = 1): Promise<Paginated<ArticleSummary>> {
	return listing((article) => article.articleType === 'interview', page, LISTING_PAGE_SIZE);
}

/** REQ-SRCH-001: title or lead, case-insensitive. */
export async function searchArticles(query: string, page = 1): Promise<Paginated<ArticleSummary>> {
	const needle = query.toLocaleLowerCase('id');
	return listing(
		(article) =>
			article.title.toLocaleLowerCase('id').includes(needle) ||
			(article.leadText ?? '').toLocaleLowerCase('id').includes(needle),
		page,
		LISTING_PAGE_SIZE,
	);
}

/** REQ-ART-006: shared tags first, then the same primary category, then recency. */
export async function getRelatedArticles(article: Article): Promise<ArticleSummary[]> {
	const tagSlugs = article.tags.map((tag) => tag.slug);
	return rankRelated(
		{
			id: article.id,
			tagSlugs,
			primaryCategorySlug: article.primaryCategory?.slug ?? null,
		},
		articles.map((candidate) => ({
			article: toSummary(candidate),
			tagSlugs: candidate.tags.map((tag) => tag.slug),
		})),
	);
}

export type ArticleIndexEntry = {
	slug: string;
	articleType: string;
	publishedAt: string | null;
	modifiedAt: string | null;
	noIndex: boolean;
	tagSlugs: string[];
	primaryCategorySlug: string | null;
	authorSlugs: string[];
};

/**
 * Every published article in index form. Feeds the sitemaps, tag
 * indexability and author/category inclusion.
 */
export async function getArticleIndex(): Promise<ArticleIndexEntry[]> {
	return articles.map((article) => ({
		slug: article.slug,
		articleType: article.articleType,
		publishedAt: article.publishedAt,
		modifiedAt: article.contentUpdatedAt ?? article.publishedAt,
		noIndex: article.seo?.noIndex === true,
		tagSlugs: article.tags.map((tag) => tag.slug),
		primaryCategorySlug: article.primaryCategory?.slug ?? null,
		authorSlugs: [article.author?.slug, article.reviewer?.slug].filter((slug): slug is string =>
			Boolean(slug),
		),
	}));
}

/** Slugs to prebuild at deploy time (the rest render on first request). */
export async function getRecentArticleSlugs(limit = 100): Promise<string[]> {
	return articles.slice(0, limit).map((article) => article.slug);
}
