import type { ArticleSummary, Category, CategorySummary } from "@/types";

import type { StrapiCategory } from "../strapi-types";

import { mapMedia } from "./media";

export function mapCategorySummary(entry: StrapiCategory): CategorySummary {
  return {
    id: entry.documentId,
    slug: entry.slug ?? "",
    name: entry.name ?? "",
  };
}

export function mapCategory(
  entry: StrapiCategory & {
    parent_category?: StrapiCategory | null;
    categories?: StrapiCategory[] | null;
  },
  articlesInSection: ArticleSummary[],
  articlesMentioning: ArticleSummary[],
): Category {
  return {
    ...mapCategorySummary(entry),
    icon: mapMedia(entry.icon),
    parent: entry.parent_category
      ? mapCategorySummary(entry.parent_category)
      : null,
    children: (entry.categories ?? []).map(mapCategorySummary),
    articlesInSection,
    articlesMentioning,
  };
}
