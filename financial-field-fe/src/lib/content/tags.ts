import { cacheTags } from "@/lib/cms/cache-tags";
import { cmsFetch, type CmsCollection } from "@/lib/cms/client";
import { endpoints } from "@/lib/cms/endpoints";
import { mapArticleSummary } from "@/lib/cms/mappers/article";
import { mapTag } from "@/lib/cms/mappers/tag";
import {
  ARTICLE_SUMMARY_FIELDS,
  ARTICLE_SUMMARY_POPULATE,
} from "@/lib/cms/queries/articles";
import type { StrapiArticle, StrapiTag } from "@/lib/cms/strapi-types";
import { REVALIDATE } from "@/lib/revalidate";
import type { Tag } from "@/types";

type StrapiTagEntry = StrapiTag & {
  articles?: StrapiArticle[] | null;
};

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const result = await cmsFetch<CmsCollection<StrapiTagEntry>>({
    path: endpoints.tags,
    query: {
      filters: { slug: { $eq: slug } },
      populate: {
        articles: {
          fields: ARTICLE_SUMMARY_FIELDS,
          populate: ARTICLE_SUMMARY_POPULATE,
        },
      },
      pagination: { limit: 1 },
    },
    tags: [cacheTags.tag(slug)],
    revalidate: REVALIDATE.archive,
  });

  const entry = result.data[0];
  if (!entry) return null;

  return mapTag(entry, (entry.articles ?? []).map(mapArticleSummary));
}
