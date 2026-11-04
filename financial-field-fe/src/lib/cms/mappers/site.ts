import type { SiteSettings } from "@/types";

import type { StrapiSiteSettings } from "../strapi-types";

import { mapMedia } from "./media";

/**
 * Used until Site Settings (CMS-14) exists, and for any field it leaves empty.
 * The brand name is fixed by REQ-CMS-005 / REQ-GEO-004.
 */
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "Financial Field Indonesia",
  tagline: "Artikel dan panduan keuangan pribadi",
  description:
    "Financial Field Indonesia menyajikan artikel dan panduan keuangan pribadi untuk pembaca di Indonesia.",
  logo: null,
  defaultOgImage: null,
  socialLinks: [],
  contactEmail: null,
  defaultPrDisclosure:
    "Artikel ini adalah konten bersponsor yang dibuat atas kerja sama dengan pihak sponsor.",
};

function pick(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

export function mapSiteSettings(
  entry: StrapiSiteSettings | null | undefined,
): SiteSettings {
  if (!entry) {
    return DEFAULT_SITE_SETTINGS;
  }
  return {
    siteName: DEFAULT_SITE_SETTINGS.siteName,
    tagline: pick(entry.tagline, DEFAULT_SITE_SETTINGS.tagline),
    description: pick(entry.description, DEFAULT_SITE_SETTINGS.description),
    logo: mapMedia(entry.logo),
    defaultOgImage: mapMedia(entry.default_og_image),
    socialLinks: (entry.social_links ?? []).flatMap((link) => {
      const url = link.url?.trim();
      const platform = link.platform?.trim();
      return url?.startsWith("https://") && platform ? [{ platform, url }] : [];
    }),
    contactEmail: entry.contact_email?.trim() || null,
    defaultPrDisclosure: pick(
      entry.default_pr_disclosure,
      DEFAULT_SITE_SETTINGS.defaultPrDisclosure,
    ),
  };
}
