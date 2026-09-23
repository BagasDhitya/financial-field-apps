import { cacheTags } from "@/lib/cms/cache-tags";
import { cmsFetch, type CmsCollection } from "@/lib/cms/client";
import { endpoints } from "@/lib/cms/endpoints";
import { mapArticleSummary } from "@/lib/cms/mappers/article";
import { mapCategory } from "@/lib/cms/mappers/category";
import {
  ARTICLE_SUMMARY_FIELDS,
  ARTICLE_SUMMARY_POPULATE,
} from "@/lib/cms/queries/articles";
import type { StrapiArticle, StrapiCategory } from "@/lib/cms/strapi-types";
import { REVALIDATE } from "@/lib/revalidate";
import type { Category } from "@/types";

type StrapiCategoryEntry = StrapiCategory & {
  parent_category?: StrapiCategory | null;
  categories?: StrapiCategory[] | null;
  category?: StrapiArticle[] | null;
  articles?: StrapiArticle[] | null;
};

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const result = await cmsFetch<CmsCollection<StrapiCategoryEntry>>({
    path: endpoints.categories,
    query: {
      filters: { slug: { $eq: slug } },
      populate: {
        icon: true,
        parent_category: true,
        categories: true,
        category: {
          fields: ARTICLE_SUMMARY_FIELDS,
          populate: ARTICLE_SUMMARY_POPULATE,
        },
        articles: {
          fields: ARTICLE_SUMMARY_FIELDS,
          populate: ARTICLE_SUMMARY_POPULATE,
        },
      },
      pagination: { limit: 1 },
    },
    tags: [cacheTags.category(slug)],
    revalidate: REVALIDATE.categoryListing,
  });

  const entry = result.data[0];
  if (!entry) return null;

  return mapCategory(
    entry,
    (entry.category ?? []).map(mapArticleSummary),
    (entry.articles ?? []).map(mapArticleSummary),
  );
}
