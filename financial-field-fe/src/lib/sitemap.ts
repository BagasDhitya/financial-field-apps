export type SitemapUrl = { loc: string; lastmod?: string | null };

/** Articles per sitemap file (Google's limit is 50 000; SPC-seo uses 5 000). */
export const ARTICLES_PER_SITEMAP = 5_000;

/** Escapes the five XML entities. */
export function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function lastmodTag(lastmod: string | null | undefined): string {
	if (!lastmod) {
		return '';
	}
	const date = new Date(lastmod);
	return Number.isNaN(date.getTime()) ? '' : `<lastmod>${date.toISOString()}</lastmod>`;
}

/** A sitemap urlset document. An invalid lastmod is left out, not emitted. */
export function buildUrlset(urls: SitemapUrl[]): string {
	const body = urls
		.map((url) => `<url><loc>${escapeXml(url.loc)}</loc>${lastmodTag(url.lastmod)}</url>`)
		.join('');
	return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

/** The sitemap index that lists every sitemap file. */
export function buildSitemapIndex(sitemaps: SitemapUrl[]): string {
	const body = sitemaps
		.map(
			(item) =>
				`<sitemap><loc>${escapeXml(item.loc)}</loc>${lastmodTag(item.lastmod)}</sitemap>`,
		)
		.join('');
	return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
}

/** Latest of a list of ISO dates, or null. */
export function latestDate(dates: (string | null | undefined)[]): string | null {
	return dates.reduce<string | null>((latest, date) => {
		if (!date) {
			return latest;
		}
		return !latest || date > latest ? date : latest;
	}, null);
}
