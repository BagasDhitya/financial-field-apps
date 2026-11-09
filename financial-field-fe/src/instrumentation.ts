import { reportConfig } from '@/lib/config-check';

/**
 * Runs once when a Next.js server starts, the role webReader's Bootstrap.js
 * plays. It reports settings the app will ignore, so a typo in a FEATURE_*
 * flag or a half-set staging password shows in the logs instead of silently
 * changing behaviour (W13).
 */
export function register() {
	reportConfig();
}
