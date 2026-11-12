import { expect, test } from '@playwright/test';

test('robots.txt follows ADR-0005 in production (AC10)', async ({ request }) => {
	const body = await (await request.get('/robots.txt')).text();
	expect(body).toContain('Disallow: /api/');
	expect(body).toContain('User-Agent: OAI-SearchBot');
	expect(body).toContain('Sitemap: http://localhost:3100/sitemap.xml');
});

test('sitemap index and files list only indexable URLs (AC9)', async ({ request }) => {
	const index = await (await request.get('/sitemap.xml')).text();
	for (const name of ['articles-1', 'categories', 'tags', 'authors', 'pages']) {
		expect(index).toContain(`/sitemaps/${name}.xml`);
	}
	const tags = await (await request.get('/sitemaps/tags.xml')).text();
	expect(tags).toContain('/tag/pajak-karyawan');
	expect(tags).not.toContain('/tag/kartu-kredit');
	const categories = await (await request.get('/sitemaps/categories.xml')).text();
	expect(categories).toContain('/kategori/pajak/pajak-pph21');
	expect(categories.match(/<loc>/g)).toHaveLength(59);
	const articles = await (await request.get('/sitemaps/articles-1.xml')).text();
	expect(articles).toContain('<lastmod>');
	expect(articles.match(/<loc>/g)).toHaveLength(65);
});

test('security headers are present (AC19, REQ-SEC-001)', async ({ request }) => {
	const headers = (await request.get('/')).headers();
	expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
	// The one frame the site shows: the YouTube player (REQ-SEC-010).
	expect(headers['content-security-policy']).toContain(
		'frame-src https://www.youtube-nocookie.com;',
	);
	expect(headers['x-content-type-options']).toBe('nosniff');
	expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
	expect(headers['x-powered-by']).toBeUndefined();
});
