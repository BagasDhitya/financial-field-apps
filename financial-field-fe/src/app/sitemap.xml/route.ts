import { getSitemapFiles } from '@/lib/content/sitemap';
import { env } from '@/lib/env';
import { buildSitemapIndex, latestDate } from '@/lib/sitemap';

/** Safety-net window. Keep in sync with REVALIDATE.sitemap (revalidate.test.ts). */
export const revalidate = 3600;

/** Sitemap index listing one file per content type (REQ-SEO-013). */
export async function GET() {
	const origin = env.siteUrl.replace(/\/+$/, '');
	const files = await getSitemapFiles(origin);
	const xml = buildSitemapIndex(
		files.map((file) => ({
			loc: `${origin}/sitemaps/${file.name}.xml`,
			lastmod: latestDate(file.urls.map((url) => url.lastmod)),
		})),
	);
	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
}
