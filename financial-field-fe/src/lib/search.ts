/** Shortest query that is searched (REQ-SRCH-001). */
export const SEARCH_MIN = 2;
/** Longer queries are cut to this length (REQ-SRCH-001). */
export const SEARCH_MAX = 100;

/** REQ-SRCH-001: trimmed and collapsed, cut to 100 characters. */
export function normalizeQuery(value: string | string[] | undefined): string {
	const raw = Array.isArray(value) ? value[0] : value;
	return (raw ?? '').replace(/\s+/g, ' ').trim().slice(0, SEARCH_MAX);
}

/** True when the normalized query is long enough to search. */
export function isSearchable(query: string): boolean {
	return query.length >= SEARCH_MIN;
}
