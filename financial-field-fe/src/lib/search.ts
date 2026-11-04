export const SEARCH_MIN = 2;
export const SEARCH_MAX = 100;

/** REQ-SRCH-001: trimmed and collapsed, cut to 100 characters. */
export function normalizeQuery(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw ?? "").replace(/\s+/g, " ").trim().slice(0, SEARCH_MAX);
}

export function isSearchable(query: string): boolean {
  return query.length >= SEARCH_MIN;
}
