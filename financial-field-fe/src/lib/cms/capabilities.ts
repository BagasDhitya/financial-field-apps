import { env } from "@/lib/env";

/**
 * CMS fields the frontend may request. Strapi runs with `strictParams`, so a
 * populate or field key the schema does not have yet returns HTTP 400. Each
 * capability maps to a CMS-nn change in SPC-content-model and is switched on
 * (CMS_CAPABILITIES env) once that change is merged and deployed.
 */
export const CMS_CAPABILITIES = [
  "seo", // CMS-01
  "editorial", // CMS-05
  "sponsor", // CMS-06
  "faq", // CMS-07
  "sources", // CMS-08
  "dates", // CMS-09
  "takeaways", // CMS-10
  "corrections", // CMS-10
  "author-profile", // CMS-11
  "category-nav", // CMS-12
  "static-pages", // CMS-13
  "site-settings", // CMS-14
  "redirects", // CMS-15
  "tag-description", // CMS-19
] as const;

export type CmsCapability = (typeof CMS_CAPABILITIES)[number];

export type CapabilitySet = ReadonlySet<CmsCapability>;

/** Comma-separated list; `all` enables everything; unknown names are ignored. */
export function parseCapabilities(raw: string): CapabilitySet {
  const names = raw
    .split(",")
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);
  if (names.includes("all")) {
    return new Set(CMS_CAPABILITIES);
  }
  return new Set(
    CMS_CAPABILITIES.filter((capability) => names.includes(capability)),
  );
}

export const cmsCapabilities: CapabilitySet = parseCapabilities(
  env.cmsCapabilities,
);

export function hasCapability(
  capability: CmsCapability,
  set: CapabilitySet = cmsCapabilities,
): boolean {
  return set.has(capability);
}
