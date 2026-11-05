/** First-party consent state (ADR-0008). Client-safe: no env, no secrets. */
export const CONSENT_COOKIE = 'ffid_consent';

/** About six months (SPC-security-and-privacy §4, pending legal OQ-14). */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 182;

/** Fired on window when the reader makes or changes a choice. */
export const CONSENT_CHANGE_EVENT = 'ffid:consent-change';

/** Fired on window to reopen the banner (footer "Pengaturan cookie"). */
export const CONSENT_OPEN_EVENT = 'ffid:consent-open';

export type ConsentChoice = 'granted' | 'denied';

/** Attribute set on <html> before first paint when a choice exists. */
export const CONSENT_ATTRIBUTE = 'data-ffid-consent';

/**
 * Inline <head> script: marks <html> before first paint so CSS can hide the
 * server-rendered banner for returning readers without a flash, while first
 * visits paint the banner with the page instead of after hydration (the late
 * banner was the LCP element, DSC-0011).
 */
export const CONSENT_BOOT_SCRIPT = `try{var m=document.cookie.match(/(?:^|; )${'ffid_consent'}=(granted|denied)/);if(m){document.documentElement.setAttribute("${'data-ffid-consent'}",m[1])}}catch(e){}`;

/**
 * The consent choice in a Cookie header. Any value other than granted or denied
 * counts as no choice.
 */
export function parseConsent(cookieHeader: string): ConsentChoice | null {
	for (const part of cookieHeader.split(';')) {
		const [name, value] = part.trim().split('=');
		if (name === CONSENT_COOKIE && (value === 'granted' || value === 'denied')) {
			return value;
		}
	}
	return null;
}

/**
 * Cookie string for the consent choice. `Secure` only on HTTPS, so local http
 * runs can still store it.
 */
export function serializeConsent(choice: ConsentChoice, secure: boolean): string {
	return [
		`${CONSENT_COOKIE}=${choice}`,
		`Max-Age=${CONSENT_MAX_AGE_SECONDS}`,
		'Path=/',
		'SameSite=Lax',
		...(secure ? ['Secure'] : []),
	].join('; ');
}
