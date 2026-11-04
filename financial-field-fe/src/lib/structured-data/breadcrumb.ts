import { schemaIds } from "./ids";
import type { JsonLdNode } from "./types";

export type Crumb = { name: string; url: string };

/** Mirrors the visible breadcrumb exactly (REQ-SEO-032). */
export function buildBreadcrumbList(
  pageUrl: string,
  crumbs: Crumb[],
): JsonLdNode | null {
  const valid = crumbs.filter((crumb) => crumb.name && crumb.url);
  if (valid.length < 2) {
    return null;
  }
  return {
    "@type": "BreadcrumbList",
    "@id": schemaIds.breadcrumb(pageUrl),
    itemListElement: valid.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
