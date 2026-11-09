import type { WriterProfileEntry } from './types';

/**
 * Six fictional people (PRP-0002.p1 §S4.3, REQ-SEED-007): four writers and two
 * reviewers. Names say "Contoh" and links point to example.org, so nobody is
 * mistaken for a real person.
 */
export const WRITER_PROFILES: WriterProfileEntry[] = [
	{
		slug: 'penulis-contoh-satu',
		full_name: 'Penulis Contoh Satu',
		role_title: 'Penulis keuangan',
		avatar: 'avatar-penulis-contoh-satu',
		bio: 'Penulis Contoh Satu adalah penulis keuangan untuk Financial Field Indonesia. Fokusnya adalah keuangan pribadi.',
		same_as: [{ url: 'https://example.org/profil/penulis-contoh-satu', label: 'Profil' }],
		expertise: ['Keuangan pribadi'],
	},
	{
		slug: 'penulis-contoh-dua',
		full_name: 'Penulis Contoh Dua',
		role_title: 'Jurnalis ekonomi',
		avatar: 'avatar-penulis-contoh-dua',
		bio: 'Penulis Contoh Dua adalah jurnalis ekonomi untuk Financial Field Indonesia. Fokusnya adalah keuangan pribadi.',
		same_as: [{ url: 'https://example.org/profil/penulis-contoh-dua', label: 'Profil' }],
		expertise: ['Keuangan pribadi'],
	},
	{
		slug: 'penulis-contoh-tiga',
		full_name: 'Penulis Contoh Tiga',
		role_title: 'Penulis lepas',
		bio: 'Penulis Contoh Tiga adalah penulis lepas untuk Financial Field Indonesia. Fokusnya adalah keuangan pribadi.',
		same_as: [{ url: 'https://example.org/profil/penulis-contoh-tiga', label: 'Profil' }],
		expertise: ['Keuangan pribadi'],
	},
	{
		slug: 'redaksi-contoh',
		full_name: 'Redaksi Contoh',
		role_title: 'Tim redaksi',
		avatar: 'avatar-redaksi-contoh',
		bio: 'Redaksi Contoh adalah tim redaksi untuk Financial Field Indonesia. Fokusnya adalah keuangan pribadi.',
		same_as: [{ url: 'https://example.org/profil/redaksi-contoh', label: 'Profil' }],
		expertise: ['Keuangan pribadi'],
	},
	{
		slug: 'peninjau-contoh-satu',
		full_name: 'Peninjau Contoh Satu',
		role_title: 'Perencana keuangan',
		avatar: 'avatar-peninjau-contoh-satu',
		bio: 'Peninjau Contoh Satu adalah perencana keuangan untuk Financial Field Indonesia. Fokusnya adalah perencanaan keuangan dan pajak pribadi.',
		credentials: 'CFP®',
		same_as: [{ url: 'https://example.org/profil/peninjau-contoh-satu', label: 'Profil' }],
		expertise: ['Perencanaan keuangan', 'Pajak pribadi'],
	},
	{
		slug: 'peninjau-contoh-dua',
		full_name: 'Peninjau Contoh Dua',
		role_title: 'Perencana keuangan',
		avatar: 'avatar-peninjau-contoh-dua',
		bio: 'Peninjau Contoh Dua adalah perencana keuangan untuk Financial Field Indonesia. Fokusnya adalah perencanaan keuangan dan pajak pribadi.',
		credentials: 'CFP®',
		same_as: [{ url: 'https://example.org/profil/peninjau-contoh-dua', label: 'Profil' }],
		expertise: ['Perencanaan keuangan', 'Pajak pribadi'],
	},
];
