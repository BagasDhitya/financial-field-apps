import { reportConfig } from '@/lib/config-check';

/**
 * Runs once when a Next.js server starts, the role webReader's Bootstrap.js
 * plays. It reports settings the app will ignore, so a typo in
 * CMS_CAPABILITIES or a FEATURE_* flag shows in the logs instead of silently
 * leaving a feature off (W13).
 */
export function register() {
	reportConfig();
}
