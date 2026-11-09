import { safeEqual } from '@/lib/security';

/** Realm shown in the browser's login prompt on staging. */
export const STAGING_AUTH_REALM = 'Financial Field Indonesia staging';

/** Framework assets (`/_next/*`) never ask for the password (REQ-INFRA-006). */
const EXEMPT_PREFIXES = ['/_next/'];

export type StagingAuthConfig = {
	siteEnv: string;
	user: string;
	password: string;
};

/** On only for staging with both credentials set; anything else leaves the site open. */
export function isStagingAuthEnabled({ siteEnv, user, password }: StagingAuthConfig): boolean {
	return siteEnv === 'staging' && user !== '' && password !== '';
}

/** True for paths that never ask for the staging password. */
export function isStagingAuthExempt(pathname: string): boolean {
	return EXEMPT_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function decodeBase64Utf8(value: string): string | null {
	try {
		const binary = atob(value);
		return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
	} catch {
		// Not base64: the header is simply not valid credentials, an expected answer.
		return null;
	}
}

/**
 * Checks an `Authorization: Basic …` header against the staging credentials in
 * constant time. Missing or malformed headers are `false`, never an error.
 */
export function hasValidBasicAuth(header: string | null, user: string, password: string): boolean {
	if (!header || !header.startsWith('Basic ')) {
		return false;
	}
	const decoded = decodeBase64Utf8(header.slice('Basic '.length).trim());
	if (decoded === null) {
		return false;
	}
	return safeEqual(decoded, `${user}:${password}`);
}

/** Headers of the 401 challenge: the login prompt, no indexing and no caching. */
export function stagingAuthChallengeHeaders(): Record<string, string> {
	return {
		'WWW-Authenticate': `Basic realm="${STAGING_AUTH_REALM}", charset="UTF-8"`,
		'X-Robots-Tag': 'noindex, nofollow',
		'Cache-Control': 'no-store',
	};
}
