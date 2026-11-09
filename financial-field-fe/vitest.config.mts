import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/** Unit + component tests (ADR-0009). E2E lives in tests/e2e and runs on Playwright. */
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: { '@': path.resolve(import.meta.dirname, 'src') },
	},
	test: {
		environment: 'node',
		include: ['src/**/*.test.{ts,tsx}'],
		setupFiles: ['./vitest.setup.ts'],
		env: {
			NEXT_PUBLIC_SITE_URL: 'https://example.test',
			// Mapper tests resolve media against a remote CMS host.
			CMS_URL: 'http://cms.example.test',
		},
	},
});
