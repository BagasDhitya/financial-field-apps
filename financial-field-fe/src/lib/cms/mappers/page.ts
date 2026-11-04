import type { StaticPage } from "@/types";

import type { StrapiStaticPage } from "../strapi-types";

import { resolveBodyMedia } from "./media";
import { mapSeo } from "./seo";

export function mapStaticPage(entry: StrapiStaticPage): StaticPage {
  return {
    id: entry.documentId,
    slug: entry.slug ?? "",
    title: entry.title ?? "",
    group:
      entry.group === "tentang-kami" || entry.group === "legal"
        ? entry.group
        : null,
    body: resolveBodyMedia(entry.body ?? []),
    seo: mapSeo(entry.seo),
    updatedAt: entry.updatedAt ?? null,
  };
}
