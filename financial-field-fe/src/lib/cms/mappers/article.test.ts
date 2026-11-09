import { describe, expect, it } from 'vitest';

import type { StrapiArticle } from '../strapi-types';

import { mapArticle, mapArticleSummary } from './article';

const image = {
	url: '/uploads/a.jpg',
	mime: 'image/jpeg',
	width: 1600,
	height: 900,
	alternativeText: 'Alt',
};

const full: StrapiArticle = {
	documentId: 'doc-1',
	title: 'Judul',
	slug: 'judul',
	lead_text: 'Lead',
	article_type: 'pr_article',
	publishedAt: '2026-11-02T00:00:00Z',
	first_published_at: '2026-10-01T00:00:00Z',
	content_updated_at: '2026-11-01T00:00:00Z',
	last_reviewed_at: '2026-10-02T00:00:00Z',
	editorial_status: 'approved',
	featured_image: image,
	primary_category: {
		documentId: 'c',
		slug: 'pajak',
		name: 'Pajak',
		parent_category: { documentId: 'p', slug: 'keuangan', name: 'Keuangan' },
	},
	author: { documentId: 'a', slug: 'penulis', full_name: 'Penulis' },
	reviewer: {
		documentId: 'r',
		slug: 'peninjau',
		full_name: 'Peninjau',
		credentials: 'CFP®',
	},
	sponsor_name: 'Sponsor',
	sponsor_url: 'https://example.com',
	sponsor_disclosure: 'Bersponsor.',
	faq: [
		{ question: 'Q?', answer: 'A.' },
		{ question: '', answer: 'dropped' },
	],
	sources: [{ title: 'Sumber', url: 'https://ojk.go.id' }, { title: null }],
	key_takeaways: [
		{ text: '1' },
		{ text: '2' },
		{ text: '3' },
		{ text: '4' },
		{ text: '5' },
		{ text: '6' },
	],
	corrections: [
		{ date: '2026-10-05', note: 'lama' },
		{ date: '2026-10-09', note: 'baru' },
	],
	content: [{ type: 'image', image: { url: '/uploads/b.jpg', mime: 'image/jpeg' } }],
};

describe('mapArticleSummary / mapArticle (W2: never throw)', () => {
	it('maps an empty entry without throwing', () => {
		const article = mapArticle({ documentId: 'x' });
		expect(article.title).toBe('');
		expect(article.articleType).toBe('standard');
		expect(article.author).toBeNull();
		expect(article.primaryCategory).toBeNull();
		expect(article.sponsor).toBeNull();
		expect(article.faq).toEqual([]);
	});

	it('prefers first_published_at over publishedAt (CMS-09)', () => {
		expect(mapArticleSummary(full).publishedAt).toBe('2026-10-01T00:00:00Z');
		expect(mapArticleSummary({ ...full, first_published_at: null }).publishedAt).toBe(
			'2026-11-02T00:00:00Z',
		);
	});

	it('keeps the parent of a sub-category for URLs and breadcrumbs', () => {
		expect(mapArticleSummary(full).primaryCategory).toMatchObject({
			slug: 'pajak',
			parentSlug: 'keuangan',
			parentName: 'Keuangan',
		});
	});

	it('falls back to standard for unknown article types', () => {
		expect(mapArticleSummary({ ...full, article_type: 'advertorial' }).articleType).toBe(
			'standard',
		);
	});

	it('maps sponsor only for PR articles with a sponsor name', () => {
		expect(mapArticle(full).sponsor).toEqual({
			name: 'Sponsor',
			url: 'https://example.com',
			disclosure: 'Bersponsor.',
		});
		expect(mapArticle({ ...full, article_type: 'standard' }).sponsor).toBeNull();
	});

	it('hides the review date when there is no reviewer (REQ-ART-002)', () => {
		expect(mapArticle(full).lastReviewedAt).toBe('2026-10-02T00:00:00Z');
		expect(mapArticle({ ...full, reviewer: null }).lastReviewedAt).toBeNull();
	});

	it('drops incomplete FAQ and source items, caps takeaways at 5, sorts corrections newest first', () => {
		const article = mapArticle(full);
		expect(article.faq).toHaveLength(1);
		expect(article.sources).toHaveLength(1);
		expect(article.keyTakeaways).toHaveLength(5);
		expect(article.corrections.map((c) => c.note)).toEqual(['baru', 'lama']);
	});

	it('resolves body image URLs to the CMS origin', () => {
		const node = mapArticle(full).body[0] as { image: { url: string } };
		expect(node.image.url).toBe('http://cms.example.test/uploads/b.jpg');
	});

	it('drops tags without a slug', () => {
		const article = mapArticle({
			...full,
			tags: [
				{ documentId: 't2', slug: 'pajak-karyawan', name: 'Pajak karyawan' },
				{ documentId: 't3', slug: null, name: 'Tanpa slug' },
			],
		});
		expect(article.tags.map((tag) => tag.slug)).toEqual(['pajak-karyawan']);
	});

	it('never carries the editorial status on the public Article (REQ-CMS-001)', () => {
		expect(mapArticle(full)).not.toHaveProperty('editorialStatus');
		expect(JSON.stringify(mapArticle(full))).not.toContain('approved');
	});
});
