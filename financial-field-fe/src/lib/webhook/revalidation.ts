import { cacheTags } from "@/lib/cms/cache-tags";

export type StrapiWebhookBody = {
  event?: string;
  model?: string;
  entry?: {
    documentId?: string;
    slug?: string;
    ticker_symbol?: string;
    publishedAt?: string | null;
  } | null;
};

type Entry = NonNullable<StrapiWebhookBody["entry"]>;

/**
 * Maps a Strapi model to the tags that must be invalidated. Each entry
 * invalidates its own tag plus its collection tag, because a publish changes
 * both the entity page and every listing the entity appears in.
 */
const TAGS_BY_MODEL: Record<string, (entry: Entry) => string[]> = {
  article: (entry) => [
    cacheTags.articles(),
    // A featured article can change without a Site Navigation event.
    cacheTags.navigation(),
    ...(entry.slug ? [cacheTags.article(entry.slug)] : []),
  ],
  category: (entry) => [
    cacheTags.categories(),
    cacheTags.navigation(),
    ...(entry.slug ? [cacheTags.category(entry.slug)] : []),
  ],
  tag: (entry) => [
    cacheTags.tags(),
    ...(entry.slug ? [cacheTags.tag(entry.slug)] : []),
  ],
  "writer-profile": (entry) => [
    cacheTags.authors(),
    ...(entry.slug ? [cacheTags.author(entry.slug)] : []),
  ],
  "stock-ticker": (entry) => [
    cacheTags.tickers(),
    ...(entry.ticker_symbol ? [cacheTags.ticker(entry.ticker_symbol)] : []),
  ],
  "site-navigation": () => [cacheTags.navigation()],
  "static-page": (entry) => [
    cacheTags.pages(),
    ...(entry.slug ? [cacheTags.page(entry.slug)] : []),
  ],
  "site-setting": () => [cacheTags.siteSettings()],
  redirect: () => [cacheTags.redirects()],
};

/** Draft-only saves change nothing public (REQ-CMS-004, ADR-0003). */
const DRAFT_EVENTS = new Set(["entry.create", "entry.update"]);

export type RevalidationPlan =
  | { kind: "revalidate"; tags: string[] }
  | { kind: "ignore"; reason: "draft" | "unknown-model" };

export function planRevalidation(body: StrapiWebhookBody): RevalidationPlan {
  const model = body.model ?? "";
  const build = TAGS_BY_MODEL[model];
  if (!build) {
    return { kind: "ignore", reason: "unknown-model" };
  }
  const entry = body.entry ?? {};
  // Models without Draft & Publish (redirect) have no publishedAt key at all.
  const isDraftOnly =
    DRAFT_EVENTS.has(body.event ?? "") &&
    "publishedAt" in entry &&
    entry.publishedAt == null;
  if (isDraftOnly) {
    return { kind: "ignore", reason: "draft" };
  }
  return { kind: "revalidate", tags: build(entry) };
}
