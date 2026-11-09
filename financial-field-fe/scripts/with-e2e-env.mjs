/**
 * Runs a command with the shared e2e environment (tests/e2e-env.mjs), e.g.
 *   node scripts/with-e2e-env.mjs pnpm build
 * Used by CI for the e2e build, Lighthouse CI and the SEO check.
 * Variables already set by the caller win, e.g. SITE_ENV=staging node … .
 */
import { spawn } from 'node:child_process';

import { e2eEnv } from '../tests/e2e-env.mjs';

const [command, ...args] = process.argv.slice(2);
if (!command) {
	console.error('usage: node scripts/with-e2e-env.mjs <command> [...args]');
	process.exit(2);
}

const child = spawn(command, args, {
	stdio: 'inherit',
	env: { ...e2eEnv, ...process.env },
	shell: process.platform === 'win32',
});
child.on('exit', (code) => process.exit(code ?? 1));
