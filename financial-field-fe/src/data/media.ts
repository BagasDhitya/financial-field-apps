import type { MediaEntry } from './types';

/**
 * Every image the content uses, keyed for entries to refer to (PRP-0002.p1
 * §S4.7). The fields are those of a Strapi upload file. The files are flat
 * placeholders in public/images: one per top-level category for featured
 * images, one per author with an avatar.
 */
export const MEDIA = {
	'kategori-penghasilan': {
		name: 'penghasilan.png',
		url: '/images/kategori/penghasilan.png',
		alternativeText: 'Ilustrasi kategori Penghasilan & Gaji',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-warisan': {
		name: 'warisan.png',
		url: '/images/kategori/warisan.png',
		alternativeText: 'Ilustrasi kategori Warisan',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-pajak': {
		name: 'pajak.png',
		url: '/images/kategori/pajak.png',
		alternativeText: 'Ilustrasi kategori Pajak',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-pensiun': {
		name: 'pensiun.png',
		url: '/images/kategori/pensiun.png',
		alternativeText: 'Ilustrasi kategori Pensiun',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-asuransi': {
		name: 'asuransi.png',
		url: '/images/kategori/asuransi.png',
		alternativeText: 'Ilustrasi kategori Asuransi',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-pinjaman': {
		name: 'pinjaman.png',
		url: '/images/kategori/pinjaman.png',
		alternativeText: 'Ilustrasi kategori Pinjaman',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-investasi': {
		name: 'investasi.png',
		url: '/images/kategori/investasi.png',
		alternativeText: 'Ilustrasi kategori Investasi',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-gaya-hidup': {
		name: 'gaya-hidup.png',
		url: '/images/kategori/gaya-hidup.png',
		alternativeText: 'Ilustrasi kategori Gaya Hidup',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-hari-tua': {
		name: 'hari-tua.png',
		url: '/images/kategori/hari-tua.png',
		alternativeText: 'Ilustrasi kategori Hari Tua',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-keuangan-keluarga': {
		name: 'keuangan-keluarga.png',
		url: '/images/kategori/keuangan-keluarga.png',
		alternativeText: 'Ilustrasi kategori Keuangan Keluarga',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-karier': {
		name: 'karier.png',
		url: '/images/kategori/karier.png',
		alternativeText: 'Ilustrasi kategori Karier',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-kartu-kredit': {
		name: 'kartu-kredit.png',
		url: '/images/kategori/kartu-kredit.png',
		alternativeText: 'Ilustrasi kategori Kartu Kredit',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'kategori-bisnis': {
		name: 'bisnis.png',
		url: '/images/kategori/bisnis.png',
		alternativeText: 'Ilustrasi kategori Bisnis',
		width: 1600,
		height: 900,
		mime: 'image/png',
	},
	'avatar-penulis-contoh-satu': {
		name: 'penulis-contoh-satu.png',
		url: '/images/penulis/penulis-contoh-satu.png',
		alternativeText: 'Foto profil Penulis Contoh Satu',
		width: 400,
		height: 400,
		mime: 'image/png',
	},
	'avatar-penulis-contoh-dua': {
		name: 'penulis-contoh-dua.png',
		url: '/images/penulis/penulis-contoh-dua.png',
		alternativeText: 'Foto profil Penulis Contoh Dua',
		width: 400,
		height: 400,
		mime: 'image/png',
	},
	'avatar-redaksi-contoh': {
		name: 'redaksi-contoh.png',
		url: '/images/penulis/redaksi-contoh.png',
		alternativeText: 'Foto profil Redaksi Contoh',
		width: 400,
		height: 400,
		mime: 'image/png',
	},
	'avatar-peninjau-contoh-satu': {
		name: 'peninjau-contoh-satu.png',
		url: '/images/penulis/peninjau-contoh-satu.png',
		alternativeText: 'Foto profil Peninjau Contoh Satu',
		width: 400,
		height: 400,
		mime: 'image/png',
	},
	'avatar-peninjau-contoh-dua': {
		name: 'peninjau-contoh-dua.png',
		url: '/images/penulis/peninjau-contoh-dua.png',
		alternativeText: 'Foto profil Peninjau Contoh Dua',
		width: 400,
		height: 400,
		mime: 'image/png',
	},
} satisfies Record<string, MediaEntry>;

/** A key of MEDIA. */
export type MediaKey = keyof typeof MEDIA;
