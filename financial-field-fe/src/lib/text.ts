/** Cuts at a word boundary and appends "…" when the text is longer than max. */
export function truncateAtWord(text: string, max: number): string {
	const clean = text.replace(/\s+/g, ' ').trim();
	if (clean.length <= max) {
		return clean;
	}
	const slice = clean.slice(0, max - 1);
	const lastSpace = slice.lastIndexOf(' ');
	const cut = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice;
	return `${cut.replace(/[\s,.;:–-]+$/, '')}…`;
}
