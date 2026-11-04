/**
 * Same capability names as src/lib/cms/capabilities.ts (a unit test keeps the
 * two lists equal). The seed sends a gated field only when the CMS has it,
 * because Strapi's strictParams rejects unknown keys (DSC-0010).
 */
export const CMS_CAPABILITIES = [
  "seo",
  "editorial",
  "sponsor",
  "faq",
  "sources",
  "dates",
  "takeaways",
  "corrections",
  "author-profile",
  "category-nav",
  "static-pages",
  "site-settings",
  "redirects",
  "tag-description",
];

/** @param {string} raw @returns {Set<string>} */
export function parseCapabilities(raw = "") {
  const names = raw
    .split(",")
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);
  if (names.includes("all")) {
    return new Set(CMS_CAPABILITIES);
  }
  return new Set(CMS_CAPABILITIES.filter((name) => names.includes(name)));
}
