/**
 * ISR windows in seconds, by route type. These are the safety net: the primary
 * freshness mechanism is webhook-driven on-demand revalidation (§14). Windows
 * exist to bound staleness if a webhook is missed, not to be the main path.
 */
export const REVALIDATE = {
  /** Home and top-level listings change whenever anything is published. */
  home: 60,
  /** Section listings: new articles arrive, but less often than on home. */
  categoryListing: 120,
  /** Article bodies change rarely after publish; corrections come by webhook. */
  article: 300,
  /** Author and tag archives track their article lists. */
  archive: 600,
  /** Comparison pages: editorially curated, change on the order of days. */
  comparison: 86_400,
} as const;
