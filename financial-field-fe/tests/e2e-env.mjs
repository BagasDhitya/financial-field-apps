/** One environment for e2e, Lighthouse CI and the SEO check (mock CMS). */
export const E2E_PORT = 3100;
export const MOCK_CMS_PORT = 1338;

export const e2eEnv = {
  CMS_URL: `http://localhost:${MOCK_CMS_PORT}`,
  NEXT_PUBLIC_CMS_URL: `http://localhost:${MOCK_CMS_PORT}`,
  NEXT_PUBLIC_SITE_URL: `http://localhost:${E2E_PORT}`,
  REVALIDATE_SECRET: "e2e-revalidate-secret",
  PREVIEW_SECRET: "e2e-preview-secret",
  CMS_PREVIEW_TOKEN: "test-preview-token",
  CMS_CAPABILITIES: "all",
  SITE_ENV: "production",
  NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-E2ETEST000",
  MOCK_CMS_PORT: String(MOCK_CMS_PORT),
};
