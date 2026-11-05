import { env } from '@/lib/env';

const FLAG_ON = new Set(['1', 'true', 'on']);
const FLAG_OFF = new Set(['0', 'false', 'off']);

/** "1"/"true"/"on" enable, "0"/"false"/"off" disable, anything else falls back. */
export function parseFlag(value: string | undefined, fallback: boolean): boolean {
	const normalized = value?.trim().toLowerCase() ?? '';
	if (FLAG_ON.has(normalized)) {
		return true;
	}
	if (FLAG_OFF.has(normalized)) {
		return false;
	}
	return fallback;
}

/**
 * True when a flag value is unset, blank or an on/off word. Anything else makes
 * parseFlag fall back without a sound, so it is reported at startup (W13).
 */
export function isFlagValue(value: string | undefined): boolean {
	const normalized = value?.trim().toLowerCase() ?? '';
	return normalized === '' || FLAG_ON.has(normalized) || FLAG_OFF.has(normalized);
}

/**
 * One gate per behaviour, default off (conventions W4). Later-phase hooks
 * (comparison, ads, newsletter) render nothing until their flag is on.
 */
export const features = {
	comparison: parseFlag(env.featureFlags.comparison, false),
	ads: parseFlag(env.featureFlags.ads, false),
	newsletter: parseFlag(env.featureFlags.newsletter, false),
	harness: parseFlag(env.featureFlags.harness, false),
	faqSchema: parseFlag(env.featureFlags.faqSchema, true),
} as const;
