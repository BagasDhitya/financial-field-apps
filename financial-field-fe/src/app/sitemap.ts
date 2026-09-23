import type { MetadataRoute } from "next";

import { getPublishedArticleSlugs } from "@/lib/content/articles";
import { env } from "@/lib/env";
import { routes } from "@/lib/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPublishedArticleSlugs({ limit: 100 });

  return [
    { url: env.siteUrl },
    ...slugs.map((slug) => ({ url: `${env.siteUrl}${routes.article(slug)}` })),
  ];
}
