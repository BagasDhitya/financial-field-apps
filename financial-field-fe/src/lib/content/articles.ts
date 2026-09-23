import { cacheTags } from "@/lib/cms/cache-tags";
import { cmsFetch, type CmsCollection } from "@/lib/cms/client";
import { endpoints } from "@/lib/cms/endpoints";
import { mapArticle, mapArticleSummary } from "@/lib/cms/mappers/article";
import {
  ARTICLE_DETAIL_POPULATE,
  ARTICLE_SUMMARY_FIELDS,
  ARTICLE_SUMMARY_POPULATE,
} from "@/lib/cms/queries/articles";
import type { StrapiArticle } from "@/lib/cms/strapi-types";
import { env } from "@/lib/env";
import { REVALIDATE } from "@/lib/revalidate";
import type { Article, ArticleSummary } from "@/types";

export async function getArticleBySlug(
  slug: string,
  options: { draft?: boolean } = {},
): Promise<Article | null> {
  const result = await cmsFetch<CmsCollection<StrapiArticle>>({
    path: endpoints.articles,
    query: {
      filters: { slug: { $eq: slug } },
      populate: ARTICLE_DETAIL_POPULATE,
      pagination: { limit: 1 },
    },
    tags: [cacheTags.article(slug)],
    revalidate: options.draft ? 0 : REVALIDATE.article,
    draft: options.draft,
  });

  const entry = result.data[0];
  return entry ? mapArticle(entry) : null;
}

export async function getLatestArticles(limit = 12): Promise<ArticleSummary[]> {
  if (env.skipCmsFetch) return [];

  const result = await cmsFetch<CmsCollection<StrapiArticle>>({
    path: endpoints.articles,
    query: {
      fields: ARTICLE_SUMMARY_FIELDS,
      populate: ARTICLE_SUMMARY_POPULATE,
      sort: ["publishedAt:desc"],
      pagination: { limit },
    },
    tags: [cacheTags.articles()],
    revalidate: REVALIDATE.home,
  });

  return result.data.map(mapArticleSummary);
}

export async function getPublishedArticleSlugs(
  options: { limit?: number } = {},
): Promise<string[]> {
  if (env.skipCmsFetch) return [];

  const result = await cmsFetch<CmsCollection<StrapiArticle>>({
    path: endpoints.articles,
    query: {
      fields: ["slug"],
      sort: ["publishedAt:desc"],
      pagination: { limit: options.limit ?? 100 },
    },
    tags: [cacheTags.articles()],
    revalidate: REVALIDATE.home,
  });

  return result.data.flatMap((entry) => (entry.slug ? [entry.slug] : []));
}
