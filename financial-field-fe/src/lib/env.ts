const SITE_ENVS = ['local', 'staging', 'production'] as const;

export type SiteEnv = (typeof SITE_ENVS)[number];

function readSiteEnv(value: string | undefined): SiteEnv {
	return SITE_ENVS.find((siteEnv) => siteEnv === value) ?? 'local';
}

/**
 * The only module that reads process.env (lint-enforced). Values stay raw
 * strings where another module owns the parsing rules (features,
 * capabilities). Without `CMS_URL` the content comes from the local API over
 * src/data (PRP-0002.p1 §S4.8), so no setting is required.
 */
export const env = {
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
	/** Strapi origin, no trailing slash. Empty = the local API. */
	cmsUrl: (process.env.CMS_URL ?? '').trim().replace(/\/+$/, ''),
	cmsApiToken: process.env.CMS_API_TOKEN ?? '',
	cmsCapabilities: process.env.CMS_CAPABILITIES ?? '',
	siteEnv: readSiteEnv(process.env.SITE_ENV),
	gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
	// Staging-only HTTP basic auth (REQ-INFRA-006); empty leaves the site open.
	stagingBasicAuth: {
		user: process.env.STAGING_BASIC_AUTH_USER ?? '',
		password: process.env.STAGING_BASIC_AUTH_PASSWORD ?? '',
	},
	featureFlags: {
		comparison: process.env.FEATURE_COMPARISON,
		ads: process.env.FEATURE_ADS,
		newsletter: process.env.FEATURE_NEWSLETTER,
		harness: process.env.FEATURE_HARNESS,
		faqSchema: process.env.FEATURE_FAQ_SCHEMA,
	},
} as const;
