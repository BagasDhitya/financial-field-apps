import type { Tag, TagSummary } from "@/types";

import type { StrapiTag } from "../strapi-types";

import { mapSeo } from "./seo";

/**
 * Internal marker tags that are never shown, listed or given a page. The seed
 * marks demo articles with `data-contoh` (PRP-0002.p1b §4.2, T63).
 */
export const HIDDEN_TAG_SLUGS: ReadonlySet<string> = new Set(["data-contoh"]);

/** Slugs of tags a reader may see: non-empty and not internal markers. */
export function visibleTagSlugs(
  tags: readonly { slug?: string | null }[] | null | undefined,
): string[] {
  return (tags ?? []).flatMap((tag) =>
    tag.slug && !HIDDEN_TAG_SLUGS.has(tag.slug) ? [tag.slug] : [],
  );
}

export function mapTagSummary(entry: StrapiTag): TagSummary {
  return {
    id: entry.documentId,
    slug: entry.slug ?? "",
    name: entry.name ?? "",
  };
}

export function mapTag(entry: StrapiTag): Tag {
  return {
    ...mapTagSummary(entry),
    description: entry.description ?? null,
    seo: mapSeo(entry.seo),
  };
}
