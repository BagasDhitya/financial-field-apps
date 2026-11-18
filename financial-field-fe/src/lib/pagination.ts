/**
 * Articles per listing page. Changing it moves the article on every
 * /halaman/<n> URL.
 */
export const LISTING_PAGE_SIZE = 12;

export type PageSegments =
	{ kind: 'page'; page: number } | { kind: 'redirect-first' } | { kind: 'invalid' };

/**
 * Parses the optional `halaman/<n>` tail of a listing URL. Page 1 has no
 * `/halaman/1` URL (it 301s to the base), so that case is reported separately.
 */
export function parsePageSegments(segments: readonly string[] = []): PageSegments {
	if (segments.length === 0) {
		return { kind: 'page', page: 1 };
	}
	if (segments.length !== 2 || segments[0] !== 'halaman') {
		return { kind: 'invalid' };
	}
	const raw = segments[1] ?? '';
	if (!/^[1-9]\d{0,4}$/.test(raw)) {
		return { kind: 'invalid' };
	}
	const page = Number(raw);
	return page === 1 ? { kind: 'redirect-first' } : { kind: 'page', page };
}
