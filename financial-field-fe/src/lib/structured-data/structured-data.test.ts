import { describe, expect, it } from 'vitest';

import type { Article, SiteSettings } from '@/types';

import { buildBreadcrumbList } from './breadcrumb';
import { buildFaqPage } from './faq';
import { buildOrganization } from './organization';
import { buildPageGraph } from './registry';
import { serializeJsonLd } from './serialize';

const ORIGIN = 'https://example.test';

const SETTINGS: SiteSettings = {
	siteName: 'Financial Field Indonesia',
	tagline: 'Artikel dan panduan keuangan pribadi',
	description: 'Artikel dan panduan keuangan pribadi untuk pembaca di Indonesia.',
	logo: null,
	defaultOgImage: null,
	socialLinks: [],
	contactEmail: null,
	defaultPrDisclosure: 'Artikel ini adalah konten bersponsor.',
};
const URL = `${ORIGIN}/artikel/judul`;

const article: Article = {
	id: 'a',
	slug: 'judul',
	title: 'Judul artikel',
	leadText: 'Lead',
	articleType: 'standard',
	featuredImage: {
		url: 'https://cms.test/a.jpg',
		alternativeText: null,
		width: 1600,
		height: 900,
		mime: 'image/jpeg',
	},
	primaryCategory: {
		id: 'c',
		slug: 'pajak',
		name: 'Pajak',
		parentSlug: null,
		parentName: null,
	},
	author: {
		id: 'w',
		slug: 'penulis',
		fullName: 'Penulis Satu',
		roleTitle: 'Jurnalis',
		credentials: null,
		avatar: null,
	},
	publishedAt: '2026-10-01T03:00:00Z',
	body: [],
	reviewer: {
		id: 'r',
		slug: 'peninjau',
		fullName: 'Peninjau Dua',
		roleTitle: null,
		credentials: 'CFP®',
		avatar: null,
	},
	lastReviewedAt: '2026-10-02T03:00:00Z',
	categories: [],
	tags: [{ id: 't', slug: 'pph', name: 'PPh' }],
	stocksMentioned: [],
	contentUpdatedAt: '2026-10-05T03:00:00Z',
	seo: null,
	sponsor: null,
	keyTakeaways: [],
	faq: [
		{ question: 'Q1?', answer: 'A1' },
		{ question: 'Q2?', answer: 'A2' },
	],
	sources: [
		{
			title: 'Sumber',
			publisher: 'OJK',
			url: 'https://ojk.go.id',
			accessedOn: null,
		},
	],
	corrections: [],
};

const crumbs = [
	{ name: 'Beranda', url: `${ORIGIN}/` },
	{ name: 'Pajak', url: `${ORIGIN}/kategori/pajak` },
	{ name: 'Judul artikel', url: URL },
];

function nodes(graph: ReturnType<typeof buildPageGraph>) {
	return graph?.['@graph'] ?? [];
}

describe('structured data (SPC-seo §6)', () => {
	it('builds Article + WebPage + Breadcrumb + FAQ for a full article', () => {
		const types = nodes(
			buildPageGraph({
				kind: 'article',
				origin: ORIGIN,
				url: URL,
				crumbs,
				article,
				faqSchema: true,
			}),
		).map((n) => n['@type']);
		expect(types).toEqual(['WebPage', 'Article', 'FAQPage', 'BreadcrumbList']);
	});

	it('uses +07:00 dates, Person authors and citations (REQ-SEO-030/031)', () => {
		const articleNode = nodes(
			buildPageGraph({
				kind: 'article',
				origin: ORIGIN,
				url: URL,
				crumbs,
				article,
				faqSchema: false,
			}),
		).find((n) => n['@type'] === 'Article');
		expect(articleNode).toMatchObject({
			datePublished: '2026-10-01T10:00:00+07:00',
			dateModified: '2026-10-05T10:00:00+07:00',
			author: {
				'@type': 'Person',
				name: 'Penulis Satu',
				url: `${ORIGIN}/penulis/penulis`,
			},
			publisher: { '@id': `${ORIGIN}/#organization` },
			inLanguage: 'id-ID',
		});
		expect(articleNode?.citation).toHaveLength(1);
	});

	it('adds reviewedBy only with a recorded fact-check (REQ-SEO-035)', () => {
		const withReview = nodes(
			buildPageGraph({
				kind: 'article',
				origin: ORIGIN,
				url: URL,
				crumbs,
				article,
				faqSchema: false,
			}),
		)[0];
		expect(withReview).toMatchObject({
			reviewedBy: { name: 'Peninjau Dua' },
			lastReviewed: '2026-10-02',
		});
		const without = nodes(
			buildPageGraph({
				kind: 'article',
				origin: ORIGIN,
				url: URL,
				crumbs,
				article: { ...article, lastReviewedAt: null },
				faqSchema: false,
			}),
		)[0];
		expect(without).not.toHaveProperty('reviewedBy');
	});

	it('falls back to the organisation as author and emits nothing without a title (W2)', () => {
		const anonymous = nodes(
			buildPageGraph({
				kind: 'article',
				origin: ORIGIN,
				url: URL,
				crumbs,
				article: { ...article, author: null },
				faqSchema: false,
			}),
		).find((n) => n['@type'] === 'Article');
		expect(anonymous?.author).toEqual({ '@id': `${ORIGIN}/#organization` });
		const empty = nodes(
			buildPageGraph({
				kind: 'article',
				origin: ORIGIN,
				url: URL,
				crumbs: [],
				article: { ...article, title: '' },
				faqSchema: true,
			}),
		);
		expect(empty.map((n) => n['@type'])).toEqual(['FAQPage']);
	});

	it('emits FAQPage only for two or more pairs (ADR-0006)', () => {
		expect(buildFaqPage(URL, article.faq.slice(0, 1))).toBeNull();
		expect(buildFaqPage(URL, article.faq)?.mainEntity).toHaveLength(2);
	});

	it('mirrors the visible breadcrumb and needs at least two items', () => {
		expect(buildBreadcrumbList(URL, crumbs.slice(0, 1))).toBeNull();
		expect(buildBreadcrumbList(URL, crumbs)?.itemListElement).toHaveLength(3);
	});

	it('links trust pages from the organisation only when they exist (REQ-GEO-009)', () => {
		const off = buildOrganization({
			origin: ORIGIN,
			settings: SETTINGS,
			trustPagesAvailable: false,
		});
		expect(off).not.toHaveProperty('publishingPrinciples');
		const on = buildOrganization({
			origin: ORIGIN,
			settings: SETTINGS,
			trustPagesAvailable: true,
		});
		expect(on).toMatchObject({
			'@type': 'NewsMediaOrganization',
			name: 'Financial Field Indonesia',
			publishingPrinciples: `${ORIGIN}/tentang-kami/kebijakan-editorial`,
			correctionsPolicy: `${ORIGIN}/tentang-kami/koreksi-berita`,
		});
	});

	it('serializes safely for a <script> tag', () => {
		expect(serializeJsonLd({ name: '</script><script>alert(1)</script>' })).not.toContain(
			'</script>',
		);
	});
});
