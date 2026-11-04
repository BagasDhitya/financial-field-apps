import { cacheTags } from "@/lib/cms/cache-tags";
import { cmsFetch, type CmsCollection } from "@/lib/cms/client";
import { endpoints } from "@/lib/cms/endpoints";
import { HIDDEN_TAG_SLUGS, mapTag } from "@/lib/cms/mappers/tag";
import { seoPopulate } from "@/lib/cms/queries/articles";
import type { StrapiTag } from "@/lib/cms/strapi-types";
import { REVALIDATE } from "@/lib/revalidate";
import type { Tag } from "@/types";

/** REQ-SEO-008: a tag page is indexable only with at least this many articles. */
export const TAG_INDEX_THRESHOLD = 3;

export function isIndexableTag(articleCount: number): boolean {
  return articleCount >= TAG_INDEX_THRESHOLD;
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  // Internal markers have no public page (T63).
  if (HIDDEN_TAG_SLUGS.has(slug)) {
    return null;
  }
  const result = await cmsFetch<CmsCollection<StrapiTag>>({
    path: endpoints.tags,
    query: {
      filters: { slug: { $eq: slug } },
      ...(Object.keys(seoPopulate()).length > 0
        ? { populate: seoPopulate() }
        : {}),
      pagination: { limit: 1 },
    },
    tags: [cacheTags.tag(slug)],
    revalidate: REVALIDATE.archive,
  });

  const entry = result.data[0];
  return entry ? mapTag(entry) : null;
}
