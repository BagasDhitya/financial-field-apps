import type { AuthorEntry } from './types';

/**
 * Six fictional people (PRP-0002.p1 §S4.3, REQ-SEED-007): four writers and two
 * reviewers. Names say "Contoh" and links point to example.org, so nobody is
 * mistaken for a real person.
 */
export const AUTHORS: AuthorEntry[] = [
	{
		slug: 'penulis-contoh-satu',
		fullName: 'Penulis Contoh Satu',
		roleTitle: 'Penulis keuangan',
		avatar: 'avatar-penulis-contoh-satu',
		bio: 'Penulis Contoh Satu adalah penulis keuangan untuk Financial Field Indonesia. Fokusnya adalah keuangan pribadi.',
		sameAs: ['https://example.org/profil/penulis-contoh-satu'],
		expertise: ['Keuangan pribadi'],
	},
	{
		slug: 'penulis-contoh-dua',
		fullName: 'Penulis Contoh Dua',
		roleTitle: 'Jurnalis ekonomi',
		avatar: 'avatar-penulis-contoh-dua',
		bio: 'Penulis Contoh Dua adalah jurnalis ekonomi untuk Financial Field Indonesia. Fokusnya adalah keuangan pribadi.',
		sameAs: ['https://example.org/profil/penulis-contoh-dua'],
		expertise: ['Keuangan pribadi'],
	},
	{
		slug: 'penulis-contoh-tiga',
		fullName: 'Penulis Contoh Tiga',
		roleTitle: 'Penulis lepas',
		bio: 'Penulis Contoh Tiga adalah penulis lepas untuk Financial Field Indonesia. Fokusnya adalah keuangan pribadi.',
		sameAs: ['https://example.org/profil/penulis-contoh-tiga'],
		expertise: ['Keuangan pribadi'],
	},
	{
		slug: 'redaksi-contoh',
		fullName: 'Redaksi Contoh',
		roleTitle: 'Tim redaksi',
		avatar: 'avatar-redaksi-contoh',
		bio: 'Redaksi Contoh adalah tim redaksi untuk Financial Field Indonesia. Fokusnya adalah keuangan pribadi.',
		sameAs: ['https://example.org/profil/redaksi-contoh'],
		expertise: ['Keuangan pribadi'],
	},
	{
		slug: 'peninjau-contoh-satu',
		fullName: 'Peninjau Contoh Satu',
		roleTitle: 'Perencana keuangan',
		credentials: 'CFP®',
		avatar: 'avatar-peninjau-contoh-satu',
		bio: 'Peninjau Contoh Satu adalah perencana keuangan untuk Financial Field Indonesia. Fokusnya adalah perencanaan keuangan dan pajak pribadi.',
		sameAs: ['https://example.org/profil/peninjau-contoh-satu'],
		expertise: ['Perencanaan keuangan', 'Pajak pribadi'],
	},
	{
		slug: 'peninjau-contoh-dua',
		fullName: 'Peninjau Contoh Dua',
		roleTitle: 'Perencana keuangan',
		credentials: 'CFP®',
		avatar: 'avatar-peninjau-contoh-dua',
		bio: 'Peninjau Contoh Dua adalah perencana keuangan untuk Financial Field Indonesia. Fokusnya adalah perencanaan keuangan dan pajak pribadi.',
		sameAs: ['https://example.org/profil/peninjau-contoh-dua'],
		expertise: ['Perencanaan keuangan', 'Pajak pribadi'],
	},
];
