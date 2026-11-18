type CategoryPath = { slug: string; parentSlug?: string | null };

/**
 * The only place an internal URL is built (ADR-0004: Indonesian segments;
 * ADR-0012: comparison URLs from the CMS slugs, one slug per URL). Changing the
 * URL scheme is one edit here plus the route folder names.
 */
export const routes = {
	home: () => '/',
	article: (slug: string) => `/artikel/${slug}`,
	category: ({ slug, parentSlug }: CategoryPath) =>
		parentSlug ? `/kategori/${parentSlug}/${slug}` : `/kategori/${slug}`,
	tag: (slug: string) => `/tag/${slug}`,
	/** A reviewer's profile (ADR-0022). Writers are a team and have no page. */
	reviewer: (slug: string) => `/peninjau/${slug}`,
	latest: () => '/terbaru',
	interviews: () => '/wawancara',
	videos: () => '/video',
	about: (slug?: string) => (slug ? `/tentang-kami/${slug}` : '/tentang-kami'),
	contact: () => '/hubungi-kami',
	glossary: () => '/kamus-keuangan',
	search: (query?: string) => (query ? `/cari?q=${encodeURIComponent(query)}` : '/cari'),
	searchPage: (query: string, page: number) =>
		page <= 1
			? `/cari?q=${encodeURIComponent(query)}`
			: `/cari?q=${encodeURIComponent(query)}&halaman=${page}`,
	ticker: (symbol: string) => `/saham/${symbol.toLowerCase()}`,
	/** Comparison (ADR-0012): sections are Product Categories, survey answers never enter a URL. */
	comparisonIndex: () => '/bandingkan',
	comparisonSection: (slug: string) => `/bandingkan/${slug}`,
	product: (slug: string) => `/produk/${slug}`,
	providers: () => '/penyedia',
	provider: (slug: string) => `/penyedia/${slug}`,
	calculator: () => '/kalkulator/cicilan-kredit',
	/** Path pagination (REQ-SEO-006): page 1 is the base URL itself. */
	paged: (base: string, page: number) => (page <= 1 ? base : `${base}/halaman/${page}`),
} as const;

/** Trust pages under /tentang-kami, in footer order (REQ-PAGE-001). */
export const TRUST_PAGES = [
	{ slug: 'redaksi', label: 'Redaksi' },
	{ slug: 'metodologi-perbandingan', label: 'Metodologi Perbandingan' },
	{ slug: 'kebijakan-editorial', label: 'Kebijakan Editorial' },
	{ slug: 'pengungkapan-afiliasi', label: 'Pengungkapan Afiliasi' },
	{ slug: 'koreksi-berita', label: 'Kebijakan Koreksi' },
	{ slug: 'kebijakan-privasi', label: 'Kebijakan Privasi' },
	{ slug: 'syarat-penggunaan', label: 'Syarat Penggunaan' },
] as const;

/**
 * The "Tentang Kami" menu (the owner's order, 2026-11-18): the trust pages a
 * reader looks for first, then contact. The footer keeps the full list.
 */
export const ABOUT_MENU = [
	{ label: 'Redaksi', href: routes.about('redaksi') },
	{ label: 'Metodologi Perbandingan', href: routes.about('metodologi-perbandingan') },
	{ label: 'Kebijakan Editorial', href: routes.about('kebijakan-editorial') },
	{ label: 'Pengungkapan Afiliasi', href: routes.about('pengungkapan-afiliasi') },
	{ label: 'Kebijakan Privasi', href: routes.about('kebijakan-privasi') },
	{ label: 'Hubungi Kami', href: routes.contact() },
] as const;

/** Calculators (frontend only, no CMS data), in menu order. */
export const CALCULATORS = [{ label: 'Cicilan Kredit', href: routes.calculator() }] as const;

/**
 * Segments still reserved; they must 404 until built (ADR-0004). Edukasi and
 * Panduan are article categories under /kategori for now (ADR-0022).
 */
export const RESERVED_SEGMENTS = ['edukasi', 'panduan'] as const;
