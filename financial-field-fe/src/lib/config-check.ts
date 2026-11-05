import { cmsCapabilities, unknownCapabilityNames } from '@/lib/cms/capabilities';
import { env } from '@/lib/env';
import { isFlagValue } from '@/lib/features';
import { log } from '@/lib/log';

/** The env values this check reads; tests pass their own. */
export type ConfigSource = {
	cmsCapabilities: string;
	featureFlags: Readonly<Record<string, string | undefined>>;
	siteEnv?: string;
	stagingBasicAuth?: { readonly user: string; readonly password: string };
};

const VALUE_PREVIEW_MAX = 20;

/** `faqSchema` → `FEATURE_FAQ_SCHEMA`, the name in .env.example. */
function flagEnvName(key: string): string {
	return `FEATURE_${key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()}`;
}

/**
 * Settings the app will ignore (W13: an unknown key is reported, never
 * guessed). Names and values are operator configuration, not reader input,
 * so they may be logged; values are still cut short.
 */
export function findConfigProblems(source: ConfigSource = env): string[] {
	const problems = unknownCapabilityNames(source.cmsCapabilities).map(
		(name) => `CMS_CAPABILITIES: unknown "${name}" ignored`,
	);
	for (const [key, value] of Object.entries(source.featureFlags)) {
		if (!isFlagValue(value)) {
			const preview = String(value).slice(0, VALUE_PREVIEW_MAX);
			problems.push(`${flagEnvName(key)}: "${preview}" is not on/off, default used`);
		}
	}
	problems.push(...stagingAuthProblems(source));
	return problems;
}

/**
 * REQ-INFRA-006: staging without both credentials is open; credentials outside
 * staging are ignored. Only the names are reported, never the values.
 */
function stagingAuthProblems({ siteEnv, stagingBasicAuth }: ConfigSource): string[] {
	if (siteEnv === undefined || stagingBasicAuth === undefined) {
		return [];
	}
	const missing = [
		stagingBasicAuth.user === '' ? 'STAGING_BASIC_AUTH_USER' : null,
		stagingBasicAuth.password === '' ? 'STAGING_BASIC_AUTH_PASSWORD' : null,
	].filter((name): name is string => name !== null);
	if (siteEnv === 'staging' && missing.length > 0) {
		return [`${missing.join(' and ')} not set: staging is not password-protected`];
	}
	if (siteEnv !== 'staging' && missing.length < 2) {
		return [`STAGING_BASIC_AUTH_* set but ignored: SITE_ENV is ${siteEnv}`];
	}
	return [];
}

/**
 * Logs the active CMS capabilities once at info and each problem once at warn.
 * Called by src/instrumentation.ts when a server starts.
 */
export function reportConfig(
	source: ConfigSource = env,
	active: ReadonlySet<string> = cmsCapabilities,
): void {
	const names = [...active].sort();
	log.info(
		'config::reportConfig',
		`CMS capabilities: ${names.length > 0 ? names.join(', ') : 'none'}`,
	);
	for (const problem of findConfigProblems(source)) {
		log.warn('config::reportConfig', problem);
	}
}
