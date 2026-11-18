import { describe, expect, it, vi } from 'vitest';

import type { CategoryNode, MenuItem, ProductSection } from '@/types';

vi.mock('./categories', () => ({ getCategoryTree: vi.fn() }));
vi.mock('./comparison', () => ({
	getComparisonSections: vi.fn(),
	getProviders: vi.fn(),
	isComparisonEnabled: vi.fn(),
}));
vi.mock('./navigation', () => ({ getSiteNavigation: vi.fn() }));

const { buildMainMenu } = await import('./menu');

const pajak: CategoryNode = {
	id: 'cat-1',
	slug: 'pajak',
	name: 'Pajak',
	parentSlug: null,
	parentName: null,
	description: null,
	navOrder: 1,
	children: [{ id: 'cat-2', slug: 'pph', name: 'PPh', parentSlug: 'pajak', parentName: 'Pajak' }],
};
const investasi: CategoryNode = {
	id: 'cat-3',
	slug: 'investasi',
	name: 'Investasi',
	parentSlug: null,
	parentName: null,
	description: null,
	navOrder: 2,
	children: [],
};
const categoriesFixture = [pajak, investasi];

function section(overrides: Partial<ProductSection>): ProductSection {
	return {
		id: overrides.slug ?? 's',
		slug: 's',
		name: 'S',
		parentSlug: null,
		parentName: null,
		description: null,
		navOrder: 1,
		children: [],
		productCount: 1,
		seo: null,
		...overrides,
	};
}

const ITEMS: MenuItem[] = [
	{ label: 'Berita', url: null, categories: [pajak, investasi] },
	{ label: 'Edukasi', url: null, categories: [pajak] },
	{ label: 'Bandingkan', url: '/bandingkan', categories: [] },
	{ label: 'Penyedia', url: '/penyedia', categories: [] },
	{ label: 'Kalkulator', url: '/kalkulator', categories: [] },
	{ label: 'Kamus Keuangan', url: '/kamus-keuangan', categories: [] },
	{ label: 'Tentang Kami', url: '/tentang-kami', categories: [] },
];

const SECTIONS = [
	section({
		slug: 'pinjaman',
		name: 'Pinjaman',
		children: [
			{
				id: 'b',
				slug: 'jaminan-bpkb',
				name: 'Jaminan BPKB',
				parentSlug: 'pinjaman',
				parentName: 'Pinjaman',
			},
		],
	}),
	section({
		slug: 'jaminan-bpkb',
		name: 'Jaminan BPKB',
		parentSlug: 'pinjaman',
		parentName: 'Pinjaman',
	}),
];

describe('buildMainMenu (ADR-0022)', () => {
	it('builds every entry kind in the CMS order', () => {
		const menu = buildMainMenu({
			items: ITEMS,
			tree: categoriesFixture,
			comparison: {
				sections: SECTIONS,
				providers: [{ id: 'p', slug: 'contoh-bank', name: 'Bank Contoh', logo: null }],
			},
		});
		expect(menu.map((entry) => `${entry.kind}:${entry.label}`)).toEqual([
			'topics:Berita',
			'menu:Edukasi',
			'menu:Bandingkan',
			'menu:Penyedia',
			'menu:Kalkulator',
			'link:Kamus Keuangan',
			'menu:Tentang Kami',
		]);
		const bandingkan = menu[2];
		// Only the comparison entry is highlighted (client request; CMS-32 pending).
		expect(menu.filter((entry) => entry.highlighted).map((entry) => entry.label)).toEqual([
			'Bandingkan',
		]);
		expect(bandingkan?.kind === 'menu' && bandingkan.groups).toEqual([
			{
				heading: { label: 'Pinjaman', href: '/bandingkan/pinjaman' },
				links: [{ label: 'Jaminan BPKB', href: '/bandingkan/jaminan-bpkb' }],
			},
		]);
		const edukasi = menu[1];
		expect(edukasi?.kind === 'menu' && edukasi.groups[0]?.links).toEqual([
			{ label: 'PPh', href: '/kategori/pajak/pph' },
		]);
	});

	it('leaves the comparison entries out while comparison is off (p3 AC2)', () => {
		const menu = buildMainMenu({ items: ITEMS, tree: categoriesFixture, comparison: null });
		expect(menu.map((entry) => entry.label)).toEqual([
			'Berita',
			'Edukasi',
			'Kamus Keuangan',
			'Tentang Kami',
		]);
	});

	it('falls back to the topic tree and Tentang Kami without a CMS menu', () => {
		const menu = buildMainMenu({ items: [], tree: categoriesFixture, comparison: null });
		expect(menu.map((entry) => `${entry.kind}:${entry.label}`)).toEqual([
			'topics:Berita',
			'link:Tentang Kami',
		]);
	});

	it('refuses external or protocol-relative URLs', () => {
		const menu = buildMainMenu({
			items: [
				{ label: 'Luar', url: 'https://example.com', categories: [] },
				{ label: 'Relatif', url: '//example.com', categories: [] },
			],
			tree: [],
			comparison: null,
		});
		expect(menu.map((entry) => entry.label)).toEqual(['Tentang Kami']);
	});
});
