function requireServerEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. See .env.example.`,
    );
  }
  return value;
}

const SITE_ENVS = ["local", "staging", "production"] as const;

export type SiteEnv = (typeof SITE_ENVS)[number];

function readSiteEnv(value: string | undefined): SiteEnv {
  return SITE_ENVS.find((siteEnv) => siteEnv === value) ?? "local";
}

/**
 * The only module that reads process.env (lint-enforced). Values stay raw
 * strings where another module owns the parsing rules (features, capabilities).
 */
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  cmsUrl: process.env.CMS_URL ?? "http://localhost:1337",
  cmsPublicUrl: process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:1337",
  cmsApiToken: process.env.CMS_API_TOKEN ?? "",
  cmsPreviewToken: process.env.CMS_PREVIEW_TOKEN ?? "",
  revalidateSecret: requireServerEnv(
    "REVALIDATE_SECRET",
    process.env.REVALIDATE_SECRET,
  ),
  previewSecret: requireServerEnv("PREVIEW_SECRET", process.env.PREVIEW_SECRET),
  skipCmsFetch: process.env.SKIP_CMS_FETCH === "1",
  siteEnv: readSiteEnv(process.env.SITE_ENV),
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  cmsCapabilities: process.env.CMS_CAPABILITIES ?? "",
  featureFlags: {
    comparison: process.env.FEATURE_COMPARISON,
    ads: process.env.FEATURE_ADS,
    newsletter: process.env.FEATURE_NEWSLETTER,
    harness: process.env.FEATURE_HARNESS,
    faqSchema: process.env.FEATURE_FAQ_SCHEMA,
  },
} as const;
