import { cacheTags } from "@/lib/cms/cache-tags";
import { hasCapability } from "@/lib/cms/capabilities";
import { cmsFetch, type CmsCollection } from "@/lib/cms/client";
import { endpoints } from "@/lib/cms/endpoints";
import { mapStaticPage } from "@/lib/cms/mappers/page";
import { seoPopulate } from "@/lib/cms/queries/articles";
import type { StrapiStaticPage } from "@/lib/cms/strapi-types";
import { REVALIDATE } from "@/lib/revalidate";
import type { StaticPage } from "@/types";

/** True once Static Pages (CMS-13) are live; gates trust-page links in JSON-LD. */
export function trustPagesEnabled(): boolean {
  return hasCapability("static-pages");
}

/** Trust pages (CMS-13). Without the capability every page is a 404. */
export async function getStaticPage(slug: string): Promise<StaticPage | null> {
  if (!hasCapability("static-pages")) {
    return null;
  }
  const result = await cmsFetch<CmsCollection<StrapiStaticPage>>({
    path: endpoints.staticPages,
    query: {
      filters: { slug: { $eq: slug } },
      ...(Object.keys(seoPopulate()).length > 0
        ? { populate: seoPopulate() }
        : {}),
      pagination: { limit: 1 },
    },
    tags: [cacheTags.page(slug), cacheTags.pages()],
    revalidate: REVALIDATE.staticPage,
  });
  const entry = result.data[0];
  return entry ? mapStaticPage(entry) : null;
}

export async function getStaticPageEntries(): Promise<
  { slug: string; updatedAt: string | null }[]
> {
  if (!hasCapability("static-pages")) {
    return [];
  }
  const result = await cmsFetch<CmsCollection<StrapiStaticPage>>({
    path: endpoints.staticPages,
    query: { fields: ["slug", "updatedAt"], pagination: { limit: 100 } },
    tags: [cacheTags.pages()],
    revalidate: REVALIDATE.sitemap,
  });
  return result.data.flatMap((entry) =>
    entry.slug
      ? [{ slug: entry.slug, updatedAt: entry.updatedAt ?? null }]
      : [],
  );
}
