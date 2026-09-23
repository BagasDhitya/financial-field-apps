import type { ArticleSummary, Tag, TagSummary } from "@/types";

import type { StrapiTag } from "../strapi-types";

export function mapTagSummary(entry: StrapiTag): TagSummary {
  return {
    id: entry.documentId,
    slug: entry.slug ?? "",
    name: entry.name ?? "",
  };
}

export function mapTag(entry: StrapiTag, articles: ArticleSummary[]): Tag {
  return {
    ...mapTagSummary(entry),
    articles,
  };
}
