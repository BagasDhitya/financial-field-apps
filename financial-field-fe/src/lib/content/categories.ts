import { cacheTags } from "@/lib/cms/cache-tags";
import { hasCapability } from "@/lib/cms/capabilities";
import { CmsError, cmsFetch, type CmsCollection } from "@/lib/cms/client";
import { endpoints } from "@/lib/cms/endpoints";
import {
  buildCategoryTree,
  mapCategory,
  mapCategorySummary,
} from "@/lib/cms/mappers/category";
import { seoPopulate } from "@/lib/cms/queries/articles";
import type { StrapiCategory } from "@/lib/cms/strapi-types";
import { log } from "@/lib/log";
import { REVALIDATE } from "@/lib/revalidate";
import type { Category, CategoryNode } from "@/types";

import { getSiteNavigation } from "./navigation";

/**
 * The topic tree for the "Artikel" panel and the footer (REQ-NAV-002).
 * Falls back to Site Navigation menu items when the tree is unavailable.
 */
export async function getCategoryTree(): Promise<CategoryNode[]> {
  try {
    const result = await cmsFetch<CmsCollection<StrapiCategory>>({
      path: endpoints.categories,
      query: {
        fields: [
          "name",
          "slug",
          ...(hasCapability("category-nav")
            ? ["description", "nav_order", "show_in_nav"]
            : []),
        ],
        populate: { parent_category: { fields: ["slug", "name"] } },
        pagination: { limit: 100 },
      },
      tags: [cacheTags.categories(), cacheTags.navigation()],
      // Rendered by the root layout on every page: a short window here would
      // shorten every route's ISR window. The webhook purges on change.
      revalidate: REVALIDATE.archive,
    });
    const tree = buildCategoryTree(result.data);
    if (tree.length > 0) {
      return tree;
    }
  } catch (error) {
    log.warn(
      "content::getCategoryTree",
      "category tree unavailable",
      String(error),
    );
  }

  const navigation = await getSiteNavigation();
  return navigation.menuItems.flatMap((item, index) =>
    item.category
      ? [
          {
            ...item.category,
            name: item.label || item.category.name,
            parentSlug: null,
            parentName: null,
            description: null,
            navOrder: index,
            children: [],
          },
        ]
      : [],
  );
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const result = await cmsFetch<CmsCollection<StrapiCategory>>({
    path: endpoints.categories,
    query: {
      filters: { slug: { $eq: slug } },
      populate: {
        icon: true,
        parent_category: { fields: ["slug", "name"] },
        categories: { fields: ["slug", "name"] },
        ...seoPopulate(),
      },
      pagination: { limit: 1 },
    },
    tags: [cacheTags.category(slug), cacheTags.categories()],
    revalidate: REVALIDATE.categoryListing,
  });

  const entry = result.data[0];
  return entry ? mapCategory(entry) : null;
}

/** Every category slug with its parent, for the sitemap. */
export async function getAllCategoryPaths(): Promise<
  { slug: string; parentSlug: string | null }[]
> {
  try {
    const result = await cmsFetch<CmsCollection<StrapiCategory>>({
      path: endpoints.categories,
      query: {
        fields: ["slug", "name"],
        populate: { parent_category: { fields: ["slug", "name"] } },
        pagination: { limit: 100 },
      },
      tags: [cacheTags.categories()],
      revalidate: REVALIDATE.sitemap,
    });
    return result.data
      .filter((entry) => entry.slug)
      .map((entry) => {
        const summary = mapCategorySummary(entry);
        return { slug: summary.slug, parentSlug: summary.parentSlug };
      });
  } catch (error) {
    if (error instanceof CmsError) {
      log.warn("content::getAllCategoryPaths", `CMS ${error.status}`);
      return [];
    }
    throw error;
  }
}
