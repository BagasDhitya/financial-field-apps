import type { ArticleSummary, SiteNavigation } from "@/types";

import type { StrapiNavigation } from "../strapi-types";

import { mapCategorySummary } from "./category";

export function mapNavigation(
  entry: StrapiNavigation,
  featuredArticles: ArticleSummary[],
): SiteNavigation {
  return {
    menuItems: (entry.menu_item ?? []).map((item) => {
      const category = item.category_ref?.[0];
      return {
        label: item.label ?? "",
        url: item.url ?? null,
        category: category ? mapCategorySummary(category) : null,
      };
    }),
    featuredArticles,
  };
}
