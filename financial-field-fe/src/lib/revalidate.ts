/**
 * ISR windows in seconds, by route type. The content ships with each deploy
 * (src/data), so a window only refreshes time-relative output such as "2 jam
 * lalu" and the "Baru" badge. Route files must declare `revalidate` as a
 * literal (Next requires static analysis), so src/lib/revalidate.test.ts
 * checks each literal against this table.
 */
export const REVALIDATE = {
	/** Home and top-level listings change whenever anything is published. */
	home: 60,
	/** Section listings: new articles arrive, but less often than on home. */
	categoryListing: 120,
	/** Article bodies change rarely after publish. */
	article: 300,
	/** Author, tag, latest and interview archives track their article lists. */
	archive: 600,
	/** Trust and legal pages change on the order of days. */
	staticPage: 86_400,
	/** Sitemaps and robots. */
	sitemap: 3_600,
	/** Comparison pages: editorially curated, change on the order of days. */
	comparison: 86_400,
} as const;
