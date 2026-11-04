import type { MediaAsset } from "./media";

export type SocialLink = { platform: string; url: string };

/** Brand and organisation data (CMS-14), with code fallbacks. */
export type SiteSettings = {
  siteName: string;
  tagline: string;
  description: string;
  logo: MediaAsset | null;
  defaultOgImage: MediaAsset | null;
  socialLinks: SocialLink[];
  contactEmail: string | null;
  defaultPrDisclosure: string;
};
