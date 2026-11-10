import { expect, test } from '@playwright/test';

/**
 * The local API answers like the CMS (PRP-0002.p1 §S4.8): Strapi 5 REST
 * paths, query parameters, response shape and strictParams errors, so the
 * frontend can switch to `CMS_URL` without code changes.
 */
test.describe('local API (Strapi REST shape)', () => {
	test('lists with filters, fields, populate and page meta', async ({ request }) => {
		const response = await request.get(
			'/api/articles?filters[primary_category][slug][$in][0]=pajak-pph21&fields[0]=slug&fields[1]=first_published_at&populate[author][fields][0]=full_name&sort[0]=first_published_at:desc&pagination[page]=1&pagination[pageSize]=2',
		);
		expect(response.status()).toBe(200);
		expect(response.headers()['x-robots-tag']).toBe('noindex, nofollow');
		const body = await response.json();
		expect(body.meta.pagination).toEqual({ page: 1, pageSize: 2, pageCount: 2, total: 3 });
		expect(Object.keys(body.data[0])).toEqual([
			'id',
			'documentId',
			'slug',
			'first_published_at',
			'author',
		]);
		expect(body.data[0].documentId).toMatch(/^[a-z0-9]{24}$/);
		expect(Object.keys(body.data[0].author)).toEqual(['id', 'documentId', 'full_name']);
		expect(body.data[0].first_published_at >= body.data[1].first_published_at).toBe(true);
	});

	test('limit pagination, single types and documentId reads', async ({ request }) => {
		const limited = await (
			await request.get('/api/tags?pagination[limit]=1&fields[0]=slug')
		).json();
		expect(limited.meta.pagination).toEqual({ start: 0, limit: 1, total: 20 });

		const navigation = await (
			await request.get('/api/site-navigation?populate[featured_articles][fields][0]=slug')
		).json();
		expect(navigation.meta).toEqual({});
		expect(navigation.data.featured_articles[0].slug).toBe('cara-membaca-slip-gaji-pph-21');

		const id = limited.data[0].documentId;
		const one = await (await request.get(`/api/tags/${id}?fields[0]=name`)).json();
		expect(one.data).toEqual({ id: 1, documentId: id, name: 'Pajak karyawan' });
	});

	test('filters and populates a component (the article video, CMS-30)', async ({ request }) => {
		const response = await request.get(
			'/api/articles?filters[featured_video][url][$notNull]=true&fields[0]=slug&populate[featured_video][fields][0]=url&pagination[pageSize]=1',
		);
		const body = await response.json();
		expect(body.meta.pagination.total).toBe(25);
		expect(Object.keys(body.data[0].featured_video)).toEqual(['id', 'url']);
		expect(body.data[0].featured_video.url).toMatch(
			/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/,
		);
		const invalid = await request.get('/api/articles?filters[featured_video][bogus]=1');
		expect(invalid.status()).toBe(400);
	});

	test('refuses unknown keys like strictParams, and unknown paths', async ({ request }) => {
		const invalid = await request.get('/api/articles?fields[0]=bogus');
		expect(invalid.status()).toBe(400);
		expect(await invalid.json()).toEqual({
			data: null,
			error: {
				status: 400,
				name: 'ValidationError',
				message: 'Invalid key bogus',
				details: { key: 'bogus', path: null, source: 'query', param: 'fields' },
			},
		});
		expect((await request.get('/api/articles?foo=1')).status()).toBe(400);
		expect((await request.get('/api/nope')).status()).toBe(404);
		expect((await request.get('/api/tags/not-a-document')).status()).toBe(404);
	});
});
