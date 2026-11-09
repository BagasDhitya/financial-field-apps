import { cacheTags } from '@/lib/cms/cache-tags';
import { hasCapability } from '@/lib/cms/capabilities';
import { cmsFetch, type CmsCollection } from '@/lib/cms/client';
import { endpoints } from '@/lib/cms/endpoints';
import { mapArticle, mapArticleSummary } from '@/lib/cms/mappers/article';
import { mapTagSlugs } from '@/lib/cms/mappers/tag';
import {
	articleDetailPopulate,
	articleSort,
	articleSummaryQuery,
} from '@/lib/cms/queries/articles';
import type { StrapiArticle } from '@/lib/cms/strapi-types';
import { log } from '@/lib/log';
import { LISTING_PAGE_SIZE } from '@/lib/pagination';
import { REVALIDATE } from '@/lib/revalidate';
import type { Article, ArticleSummary, Paginated } from '@/types';

import { toPaginated } from './paginate';
import { rankRelated } from './related';

type ListingRequest = {
	filters?: Record<string, unknown>;
	page?: number;
	pageSize?: number;
	tags: string[];
	revalidate: number;
};

async function fetchArticleListing({
	filters,
	page = 1,
	pageSize = LISTING_PAGE_SIZE,
	tags,
	revalidate,
}: ListingRequest): Promise<Paginated<ArticleSummary>> {
	const result = await cmsFetch<CmsCollection<StrapiArticle>>({
		path: endpoints.articles,
		query: {
			...articleSummaryQuery(),
			...(filters ? { filters } : {}),
			sort: articleSort(),
			pagination: { page, pageSize },
		},
		tags: [cacheTags.articles(), ...tags],
		revalidate,
	});
	return toPaginated(result, mapArticleSummary);
}

/** Published article by slug, or null; the route turns null into notFound(). */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
	const result = await cmsFetch<CmsCollection<StrapiArticle>>({
		path: endpoints.articles,
		query: {
			filters: { slug: { $eq: slug } },
			populate: articleDetailPopulate(),
			pagination: { limit: 1 },
		},
		tags: [cacheTags.article(slug)],
		revalidate: REVALIDATE.article,
	});

	const entry = result.data[0];
	return entry ? mapArticle(entry) : null;
}

/** Newest articles across all categories, on the home revalidation window. */
export async function getLatestArticles(
	page = 1,
	pageSize = LISTING_PAGE_SIZE,
): Promise<Paginated<ArticleSummary>> {
	return fetchArticleListing({
		page,
		pageSize,
		tags: [],
		revalidate: REVALIDATE.home,
	});
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
	return fetchArticleListing({
		filters: { primary_category: { slug: { $in: categorySlugs } } },
		page,
		pageSize,
		tags: [cacheTags.categories()],
		revalidate: REVALIDATE.categoryListing,
	});
}

/** Articles carrying the tag, newest first. */
export async function getArticlesByTag(
	tagSlug: string,
	page = 1,
): Promise<Paginated<ArticleSummary>> {
	return fetchArticleListing({
		filters: { tags: { slug: { $eq: tagSlug } } },
		page,
		tags: [cacheTags.tag(tagSlug)],
		revalidate: REVALIDATE.archive,
	});
}

/**
 * Articles the person wrote or reviewed, depending on `role` (REQ-LIST-003).
 */
export async function getArticlesByAuthor(
	authorSlug: string,
	role: 'author' | 'reviewer',
	page = 1,
): Promise<Paginated<ArticleSummary>> {
	return fetchArticleListing({
		filters: { [role]: { slug: { $eq: authorSlug } } },
		page,
		tags: [cacheTags.author(authorSlug)],
		revalidate: REVALIDATE.archive,
	});
}

/** Articles of type `interview`, for /wawancara. */
export async function getInterviewArticles(page = 1): Promise<Paginated<ArticleSummary>> {
	return fetchArticleListing({
		filters: { article_type: { $eq: 'interview' } },
		page,
		tags: [],
		revalidate: REVALIDATE.archive,
	});
}

/** REQ-SRCH-001: title or lead, case-insensitive. Uncached. */
export async function searchArticles(query: string, page = 1): Promise<Paginated<ArticleSummary>> {
	const result = await cmsFetch<CmsCollection<StrapiArticle>>({
		path: endpoints.articles,
		query: {
			...articleSummaryQuery(),
			filters: {
				$or: [{ title: { $containsi: query } }, { lead_text: { $containsi: query } }],
			},
			sort: articleSort(),
			pagination: { page, pageSize: LISTING_PAGE_SIZE },
		},
		tags: [],
		revalidate: 0,
	});
	return toPaginated(result, mapArticleSummary);
}

/** REQ-ART-006. Failure is non-fatal: the block is simply not rendered. */
export async function getRelatedArticles(article: Article): Promise<ArticleSummary[]> {
	const tagSlugs = article.tags.map((tag) => tag.slug);
	const categorySlug = article.primaryCategory?.slug ?? null;
	const candidateFilters = [
		...(tagSlugs.length > 0 ? [{ tags: { slug: { $in: tagSlugs } } }] : []),
		...(categorySlug ? [{ primary_category: { slug: { $eq: categorySlug } } }] : []),
	];
	if (candidateFilters.length === 0) {
		return [];
	}

	try {
		const summary = articleSummaryQuery();
		const result = await cmsFetch<CmsCollection<StrapiArticle>>({
			path: endpoints.articles,
			query: {
				fields: summary.fields,
				populate: { ...summary.populate, tags: { fields: ['slug'] } },
				filters: {
					$and: [{ slug: { $ne: article.slug } }, { $or: candidateFilters }],
				},
				sort: articleSort(),
				pagination: { limit: 30 },
			},
			tags: [cacheTags.articles()],
			revalidate: REVALIDATE.article,
		});

		return rankRelated(
			{ id: article.id, tagSlugs, primaryCategorySlug: categorySlug },
			result.data.map((entry) => ({
				article: mapArticleSummary(entry),
				tagSlugs: mapTagSlugs(entry.tags),
			})),
		);
	} catch (error) {
		log.warn('content::getRelatedArticles', 'related articles unavailable', {
			slug: article.slug,
			error: String(error),
		});
		return [];
	}
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
 * Every published article, paged 100 at a time (Strapi maxLimit). Feeds the
 * sitemaps, tag indexability and author/category inclusion.
 */
export async function getArticleIndex(): Promise<ArticleIndexEntry[]> {
	const entries: ArticleIndexEntry[] = [];
	const dateFields = hasCapability('dates') ? ['first_published_at', 'content_updated_at'] : [];

	for (let page = 1; page <= 200; page++) {
		const result = await cmsFetch<CmsCollection<StrapiArticle>>({
			path: endpoints.articles,
			query: {
				fields: ['slug', 'article_type', 'publishedAt', ...dateFields],
				populate: {
					tags: { fields: ['slug'] },
					primary_category: { fields: ['slug'] },
					author: { fields: ['slug'] },
					reviewer: { fields: ['slug'] },
					...(hasCapability('seo') ? { seo: { fields: ['no_index'] } } : {}),
				},
				sort: articleSort(),
				pagination: { page, pageSize: 100 },
			},
			tags: [cacheTags.articles()],
			revalidate: REVALIDATE.sitemap,
		});

		for (const entry of result.data) {
			if (!entry.slug) {
				continue;
			}
			const publishedAt = entry.first_published_at ?? entry.publishedAt ?? null;
			entries.push({
				slug: entry.slug,
				articleType: entry.article_type ?? 'standard',
				publishedAt,
				modifiedAt: entry.content_updated_at ?? publishedAt,
				noIndex: entry.seo?.no_index === true,
				tagSlugs: mapTagSlugs(entry.tags),
				primaryCategorySlug: entry.primary_category?.slug ?? null,
				authorSlugs: [entry.author?.slug, entry.reviewer?.slug].filter(
					(slug): slug is string => Boolean(slug),
				),
			});
		}

		if (page >= (result.meta?.pagination?.pageCount ?? 0)) {
			break;
		}
	}

	return entries;
}

/** Slugs to prebuild at deploy time (the rest render on first request). */
export async function getRecentArticleSlugs(limit = 100): Promise<string[]> {
	const result = await fetchArticleListing({
		pageSize: limit,
		tags: [],
		revalidate: REVALIDATE.home,
	});
	return result.items.flatMap((article) => (article.slug ? [article.slug] : []));
}
