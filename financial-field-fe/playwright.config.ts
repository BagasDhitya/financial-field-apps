import { defineConfig, devices } from "@playwright/test";

import { E2E_PORT, e2eEnv, MOCK_CMS_PORT } from "./tests/e2e-env.mjs";

/**
 * E2E + axe against a production build on the mock CMS (ADR-0009). The build
 * runs inside webServer because Next prerenders pages against the CMS.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${E2E_PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
      },
      testIgnore: /mobile\.spec\.ts/,
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
      testMatch: /mobile\.spec\.ts/,
    },
  ],
  webServer: [
    {
      command: "node tests/mock-cms/server.mjs",
      url: `http://localhost:${MOCK_CMS_PORT}/api/tags`,
      env: e2eEnv,
      reuseExistingServer: !process.env.CI,
    },
    {
      // Start from an empty data cache: Next keeps fetch results across builds,
      // which would leak a previous run's fixtures into this one.
      command: `node -e "require('fs').rmSync('.next/cache/fetch-cache',{recursive:true,force:true})" && pnpm build && pnpm start -p ${E2E_PORT}`,
      url: `http://localhost:${E2E_PORT}/robots.txt`,
      env: e2eEnv,
      timeout: 300_000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
