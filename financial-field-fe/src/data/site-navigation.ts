import type { SiteNavigationEntry } from './types';

/** The 13 news topics: the "Berita" panel (everything but Edukasi and Panduan). */
const NEWS_TOPICS = [
	'penghasilan',
	'warisan',
	'pajak',
	'pensiun',
	'asuransi',
	'pinjaman',
	'investasi',
	'gaya-hidup',
	'hari-tua',
	'keuangan-keluarga',
	'karier',
	'kartu-kredit',
	'bisnis',
];

/**
 * The Site Navigation single type (ADR-0022). `menu_item` is the header menu
 * in the owner's order (2026-11-18), in the CMS developer's
 * `navigation.menu-item` shape: an entry with categories opens them; an entry
 * with a URL opens what lives there (comparison sections, providers,
 * calculators, the Tentang Kami pages) or is a plain link. `featured_articles`
 * are the home page's lead story candidates, lead first (PRP-0002.p1 §S4.4).
 */
export const SITE_NAVIGATION: SiteNavigationEntry = {
	menu_item: [
		{ label: 'Berita', category_ref: NEWS_TOPICS },
		{ label: 'Edukasi', category_ref: ['edukasi'] },
		{ label: 'Panduan', category_ref: ['panduan'] },
		{ label: 'Bandingkan', url: '/bandingkan' },
		{ label: 'Penyedia', url: '/penyedia' },
		{ label: 'Kalkulator', url: '/kalkulator' },
		{ label: 'Kamus Keuangan', url: '/kamus-keuangan' },
		{ label: 'Tentang Kami', url: '/tentang-kami' },
	],
	featured_articles: [
		'cara-membaca-slip-gaji-pph-21',
		'asuransi-jiwa-berjangka-atau-seumur-hidup',
		'investasi-rutin-reksa-dana-pemula',
		'berapa-besar-dana-darurat',
	],
};
