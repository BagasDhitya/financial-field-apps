import type { MediaAsset } from '@/types';

/**
 * Every image the demo content uses, by key (PRP-0002.p1 §S4.7). The files are
 * flat placeholders in the FFID palette under public/images: one per top-level
 * category for featured images, one per author with an avatar.
 */
export const MEDIA = {
	'kategori-penghasilan': {
		url: '/images/kategori/penghasilan.png',
		alternativeText: 'Ilustrasi kategori Penghasilan & Gaji',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-warisan': {
		url: '/images/kategori/warisan.png',
		alternativeText: 'Ilustrasi kategori Warisan',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-pajak': {
		url: '/images/kategori/pajak.png',
		alternativeText: 'Ilustrasi kategori Pajak',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-pensiun': {
		url: '/images/kategori/pensiun.png',
		alternativeText: 'Ilustrasi kategori Pensiun',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-asuransi': {
		url: '/images/kategori/asuransi.png',
		alternativeText: 'Ilustrasi kategori Asuransi',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-pinjaman': {
		url: '/images/kategori/pinjaman.png',
		alternativeText: 'Ilustrasi kategori Pinjaman',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-investasi': {
		url: '/images/kategori/investasi.png',
		alternativeText: 'Ilustrasi kategori Investasi',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-gaya-hidup': {
		url: '/images/kategori/gaya-hidup.png',
		alternativeText: 'Ilustrasi kategori Gaya Hidup',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-hari-tua': {
		url: '/images/kategori/hari-tua.png',
		alternativeText: 'Ilustrasi kategori Hari Tua',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-keuangan-keluarga': {
		url: '/images/kategori/keuangan-keluarga.png',
		alternativeText: 'Ilustrasi kategori Keuangan Keluarga',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-karier': {
		url: '/images/kategori/karier.png',
		alternativeText: 'Ilustrasi kategori Karier',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-kartu-kredit': {
		url: '/images/kategori/kartu-kredit.png',
		alternativeText: 'Ilustrasi kategori Kartu Kredit',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-bisnis': {
		url: '/images/kategori/bisnis.png',
		alternativeText: 'Ilustrasi kategori Bisnis',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'avatar-penulis-contoh-satu': {
		url: '/images/penulis/penulis-contoh-satu.png',
		alternativeText: 'Foto profil Penulis Contoh Satu',
		width: 400,
		height: 400,
		mime: 'image/png',
	},
	'avatar-penulis-contoh-dua': {
		url: '/images/penulis/penulis-contoh-dua.png',
		alternativeText: 'Foto profil Penulis Contoh Dua',
		width: 400,
		height: 400,
		mime: 'image/png',
	},
	'avatar-redaksi-contoh': {
		url: '/images/penulis/redaksi-contoh.png',
		alternativeText: 'Foto profil Redaksi Contoh',
		width: 400,
		height: 400,
		mime: 'image/png',
	},
	'avatar-peninjau-contoh-satu': {
		url: '/images/penulis/peninjau-contoh-satu.png',
		alternativeText: 'Foto profil Peninjau Contoh Satu',
		width: 400,
		height: 400,
		mime: 'image/png',
	},
	'avatar-peninjau-contoh-dua': {
		url: '/images/penulis/peninjau-contoh-dua.png',
		alternativeText: 'Foto profil Peninjau Contoh Dua',
		width: 400,
		height: 400,
		mime: 'image/png',
	},
} satisfies Record<string, MediaAsset>;

/** A key of MEDIA. */
export type MediaKey = keyof typeof MEDIA;
