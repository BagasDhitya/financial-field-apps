import { cacheTags } from "@/lib/cms/cache-tags";
import { cmsFetch, type CmsCollection } from "@/lib/cms/client";
import { endpoints } from "@/lib/cms/endpoints";
import { mapArticleSummary } from "@/lib/cms/mappers/article";
import { mapAuthor } from "@/lib/cms/mappers/author";
import {
  ARTICLE_SUMMARY_FIELDS,
  ARTICLE_SUMMARY_POPULATE,
} from "@/lib/cms/queries/articles";
import type { StrapiArticle, StrapiAuthor } from "@/lib/cms/strapi-types";
import { REVALIDATE } from "@/lib/revalidate";
import type { Author } from "@/types";

type StrapiAuthorEntry = StrapiAuthor & {
  articles?: StrapiArticle[] | null;
  article?: StrapiArticle[] | null;
};

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const result = await cmsFetch<CmsCollection<StrapiAuthorEntry>>({
    path: endpoints.authors,
    query: {
      filters: { slug: { $eq: slug } },
      populate: {
        avatar: true,
        articles: {
          fields: ARTICLE_SUMMARY_FIELDS,
          populate: ARTICLE_SUMMARY_POPULATE,
        },
        article: {
          fields: ARTICLE_SUMMARY_FIELDS,
          populate: ARTICLE_SUMMARY_POPULATE,
        },
      },
      pagination: { limit: 1 },
    },
    tags: [cacheTags.author(slug)],
    revalidate: REVALIDATE.archive,
  });

  const entry = result.data[0];
  if (!entry) return null;

  return mapAuthor(
    entry,
    (entry.articles ?? []).map(mapArticleSummary),
    (entry.article ?? []).map(mapArticleSummary),
  );
}
