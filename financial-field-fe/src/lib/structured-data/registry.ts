import type { Article, Author } from "@/types";

import { buildArticleNodes } from "./article";
import { buildBreadcrumbList, type Crumb } from "./breadcrumb";
import { buildFaqPage } from "./faq";
import { buildCollectionPage, buildInfoPage, buildProfilePage } from "./pages";
import { buildGraph } from "./serialize";
import type { JsonLdGraph, JsonLdNode } from "./types";

type Common = {
  origin: string;
  url: string;
  crumbs: Crumb[];
};

export type PageSchema =
  | (Common & { kind: "article"; article: Article; faqSchema: boolean })
  | (Common & { kind: "collection"; name: string; description?: string | null })
  | (Common & { kind: "profile"; name: string; author: Author })
  | (Common & {
      kind: "info";
      type: "AboutPage" | "ContactPage" | "WebPage";
      name: string;
      description?: string | null;
    });

type BuilderMap = {
  [K in PageSchema["kind"]]: (
    page: Extract<PageSchema, { kind: K }>,
    hasBreadcrumb: boolean,
  ) => (JsonLdNode | null)[];
};

/**
 * Strategy registry (conventions W5): one builder per page type. A builder
 * that lacks required data returns null nodes, which `buildGraph` drops.
 */
const BUILDERS: BuilderMap = {
  article: (page, hasBreadcrumb) => [
    ...buildArticleNodes({
      origin: page.origin,
      url: page.url,
      article: page.article,
      hasBreadcrumb,
    }),
    page.faqSchema ? buildFaqPage(page.url, page.article.faq) : null,
  ],
  collection: (page, hasBreadcrumb) => [
    buildCollectionPage({ ...page, hasBreadcrumb }),
  ],
  profile: (page, hasBreadcrumb) => [
    buildProfilePage({ ...page, hasBreadcrumb }),
  ],
  info: (page, hasBreadcrumb) => [
    buildInfoPage(page.type, { ...page, hasBreadcrumb }),
  ],
};

export function buildPageGraph(page: PageSchema): JsonLdGraph | null {
  const breadcrumb = buildBreadcrumbList(page.url, page.crumbs);
  const build = BUILDERS[page.kind] as (
    page: PageSchema,
    hasBreadcrumb: boolean,
  ) => (JsonLdNode | null)[];
  return buildGraph([...build(page, breadcrumb !== null), breadcrumb]);
}
