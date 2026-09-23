import { cacheTags } from "@/lib/cms/cache-tags";
import { CmsError, cmsFetch, type CmsSingle } from "@/lib/cms/client";
import { endpoints } from "@/lib/cms/endpoints";
import { mapArticleSummary } from "@/lib/cms/mappers/article";
import { mapNavigation } from "@/lib/cms/mappers/navigation";
import {
  ARTICLE_SUMMARY_FIELDS,
  ARTICLE_SUMMARY_POPULATE,
} from "@/lib/cms/queries/articles";
import type { StrapiNavigation } from "@/lib/cms/strapi-types";
import { env } from "@/lib/env";
import { REVALIDATE } from "@/lib/revalidate";
import type { SiteNavigation } from "@/types";

const emptyNavigation: SiteNavigation = {
  menuItems: [],
  featuredArticles: [],
};

export async function getSiteNavigation(): Promise<SiteNavigation> {
  if (env.skipCmsFetch) return emptyNavigation;

  try {
    const result = await cmsFetch<CmsSingle<StrapiNavigation>>({
      path: endpoints.navigation,
      query: {
        populate: {
          menu_item: { populate: { category_ref: true } },
          featured_articles: {
            fields: ARTICLE_SUMMARY_FIELDS,
            populate: ARTICLE_SUMMARY_POPULATE,
          },
        },
      },
      tags: [cacheTags.navigation()],
      revalidate: REVALIDATE.home,
    });

    if (!result.data) return emptyNavigation;

    return mapNavigation(
      result.data,
      (result.data.featured_articles ?? []).map(mapArticleSummary),
    );
  } catch (error) {
    if (error instanceof CmsError && error.status === 404) {
      return emptyNavigation;
    }
    throw error;
  }
}
