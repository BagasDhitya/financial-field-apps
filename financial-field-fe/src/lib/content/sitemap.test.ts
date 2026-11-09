import { describe, expect, it } from 'vitest';

import type { ArticleIndexEntry } from './articles';
import { buildSitemapFiles } from './sitemap';

function entry(slug: string, overrides: Partial<ArticleIndexEntry> = {}): ArticleIndexEntry {
	return {
		slug,
		articleType: 'standard',
		publishedAt: '2026-10-01T00:00:00Z',
		modifiedAt: '2026-10-02T00:00:00Z',
		noIndex: false,
		tagSlugs: [],
		primaryCategorySlug: 'pph',
		authorSlugs: ['penulis'],
		...overrides,
	};
}

const ORIGIN = 'https://example.test';

describe('buildSitemapFiles (REQ-SEO-013)', () => {
	const files = buildSitemapFiles(
		{
			articles: [
				entry('a', { tagSlugs: ['kecil', 'besar'] }),
				entry('b', {
					tagSlugs: ['besar'],
					modifiedAt: '2026-10-05T00:00:00Z',
				}),
				entry('c', {
					tagSlugs: ['besar'],
					articleType: 'interview',
				}),
				entry('hidden', { noIndex: true, tagSlugs: ['besar'] }),
			],
			categories: [
				{ slug: 'pajak', parentSlug: null },
				{ slug: 'pph', parentSlug: 'pajak' },
				{ slug: 'kosong', parentSlug: null },
			],
			pages: [
				{ slug: 'tentang-kami', updatedAt: null },
				{ slug: 'redaksi', updatedAt: '2026-09-01T00:00:00Z' },
				{ slug: 'hubungi-kami', updatedAt: null },
			],
		},
		ORIGIN,
	);
	const byName = (name: string) =>
		files.find((file) => file.name === name)?.urls.map((url) => url.loc) ?? [];

	it('lists indexable articles only', () => {
		expect(byName('articles-1')).toEqual([
			`${ORIGIN}/artikel/a`,
			`${ORIGIN}/artikel/b`,
			`${ORIGIN}/artikel/c`,
		]);
	});

	it('includes categories with articles in them or in a child, with nested URLs', () => {
		expect(byName('categories')).toEqual([
			`${ORIGIN}/kategori/pajak`,
			`${ORIGIN}/kategori/pajak/pph`,
		]);
	});

	it('includes only tags with at least three indexable articles (REQ-SEO-008)', () => {
		expect(byName('tags')).toEqual([`${ORIGIN}/tag/besar`]);
	});

	it('maps static pages to their routes and adds Wawancara only when interviews exist', () => {
		expect(byName('pages')).toEqual([
			`${ORIGIN}/`,
			`${ORIGIN}/terbaru`,
			`${ORIGIN}/wawancara`,
			`${ORIGIN}/tentang-kami`,
			`${ORIGIN}/tentang-kami/redaksi`,
			`${ORIGIN}/hubungi-kami`,
		]);
	});

	it('uses content dates for lastmod, never the build time', () => {
		const home = files.find((file) => file.name === 'pages')?.urls[0];
		expect(home?.lastmod).toBe('2026-10-05T00:00:00Z');
	});

	it('still produces an (empty) article file when there are no articles', () => {
		const empty = buildSitemapFiles({ articles: [], categories: [], pages: [] }, ORIGIN);
		expect(empty.find((file) => file.name === 'articles-1')?.urls).toEqual([]);
	});
});
