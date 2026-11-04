import type { MediaAsset } from "./media";

/** Editor-tunable metadata (CMS-01 `shared.seo`). Null fields fall back. */
export type SeoFields = {
  metaTitle: string | null;
  metaDescription: string | null;
  focusKeyword: string | null;
  ogImage: MediaAsset | null;
  canonicalUrl: string | null;
  noIndex: boolean;
};
