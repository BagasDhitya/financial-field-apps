/**
 * REQ-SEED-007: patterns that would indicate real contact data in seed text.
 * Shared by verify.mjs (against the CMS) and the unit tests (against the data).
 */
const EMAIL = /[\w.+-]+@(?:[\w-]+\.)+[a-z]{2,}/gi;
const ALLOWED_EMAIL = /@example\.(org|com)$/i;
// Indonesian phone shapes: +62…, 62…, 08…, (021) …
const PHONE = /(?:\+62|\b62|\b0)[\s-]?\(?\d{2,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,5}\b/;
const URL = /https?:\/\/([\w.-]+)/gi;
const ALLOWED_HOST = /^(?:[\w-]+\.)*example\.(org|com)$/i;

/** @returns {string[]} the offending fragments; empty when the text is clean. */
export function realDataHits(text) {
	const hits = [];
	for (const email of text.match(EMAIL) ?? []) {
		if (!ALLOWED_EMAIL.test(email)) {
			hits.push(email);
		}
	}
	const phone = text.match(PHONE);
	if (phone) {
		hits.push(`phone-like: ${phone[0]}`);
	}
	for (const [, host] of text.matchAll(URL)) {
		if (!ALLOWED_HOST.test(host)) {
			hits.push(`url: ${host}`);
		}
	}
	return hits;
}
