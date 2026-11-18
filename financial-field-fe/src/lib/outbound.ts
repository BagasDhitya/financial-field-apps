/**
 * Links that leave the site for a provider (PRP-0002.p3 §4.5). Client-safe.
 * A URL from the CMS is used only when it passes the guard (REQ-SEC-009), and
 * gets UTM parameters only when it has none of its own (REQ-INT-003).
 */

const MAX_LENGTH = 2048;

/**
 * The URL when it is absolute https, carries no credentials, is not our own
 * host and is at most 2048 characters; otherwise null (the button is hidden).
 */
export function guardOutboundUrl(url: string | null | undefined, ownOrigin: string): string | null {
	const trimmed = url?.trim();
	if (!trimmed || trimmed.length > MAX_LENGTH) {
		return null;
	}
	let parsed: URL;
	try {
		parsed = new URL(trimmed);
	} catch {
		// Not a URL: the expected "no" for a guard (W2); the mapper logs the drop.
		return null;
	}
	if (parsed.protocol !== 'https:' || parsed.username || parsed.password) {
		return null;
	}
	let ownHost = '';
	try {
		ownHost = new URL(ownOrigin).hostname;
	} catch {
		ownHost = '';
	}
	if (ownHost && parsed.hostname === ownHost) {
		return null;
	}
	return parsed.toString();
}

/**
 * Appends the four UTM values unless the URL already has any `utm_*`
 * parameter. Shared by the provider links and the partner-media links (ADR-0024).
 */
export function addUtm(url: string, campaign: string, content: string): string {
	const parsed = new URL(url);
	for (const key of parsed.searchParams.keys()) {
		if (key.startsWith('utm_')) {
			return url;
		}
	}
	parsed.searchParams.set('utm_source', 'financialfieldindonesia');
	parsed.searchParams.set('utm_medium', 'referral');
	parsed.searchParams.set('utm_campaign', campaign);
	parsed.searchParams.set('utm_content', content);
	return parsed.toString();
}

/** A provider link from a comparison section: campaign `bandingkan-<section>`, content the product. */
export function withUtm(url: string, section: string, productSlug: string): string {
	return addUtm(url, `bandingkan-${section}`, productSlug);
}
