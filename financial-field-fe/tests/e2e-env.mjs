/** One environment for e2e, Lighthouse CI and the SEO check (the local API over src/data). */
export const E2E_PORT = 3100;

export const e2eEnv = {
	// Empty on purpose: the local API, even when a developer's .env.local points at a CMS.
	CMS_URL: '',
	NEXT_PUBLIC_SITE_URL: `http://localhost:${E2E_PORT}`,
	SITE_ENV: 'production',
	NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-E2ETEST000',
};

/** Second server on the same build, run as staging with basic auth (REQ-INFRA-006). */
export const E2E_STAGING_PORT = 3101;

/** Test-only credentials for the staging e2e server; never used outside tests. */
export const E2E_STAGING_AUTH = { user: 'e2e-staging', password: 'e2e-staging-password' };

export const e2eStagingEnv = {
	...e2eEnv,
	SITE_ENV: 'staging',
	STAGING_BASIC_AUTH_USER: E2E_STAGING_AUTH.user,
	STAGING_BASIC_AUTH_PASSWORD: E2E_STAGING_AUTH.password,
};
