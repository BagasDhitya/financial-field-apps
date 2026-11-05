/** PRP-0002.p1 §S4.3: fictional people only (REQ-SEED-007). */
export const AUTHORS = [
	{
		code: 'W1',
		slug: 'penulis-contoh-satu',
		full_name: 'Penulis Contoh Satu',
		role_title: 'Penulis keuangan',
		credentials: null,
		avatar: true,
		reviewer: false,
	},
	{
		code: 'W2',
		slug: 'penulis-contoh-dua',
		full_name: 'Penulis Contoh Dua',
		role_title: 'Jurnalis ekonomi',
		credentials: null,
		avatar: true,
		reviewer: false,
	},
	{
		code: 'W3',
		slug: 'penulis-contoh-tiga',
		full_name: 'Penulis Contoh Tiga',
		role_title: 'Penulis lepas',
		credentials: null,
		avatar: false,
		reviewer: false,
	},
	{
		code: 'W4',
		slug: 'redaksi-contoh',
		full_name: 'Redaksi Contoh',
		role_title: 'Tim redaksi',
		credentials: null,
		avatar: true,
		reviewer: false,
	},
	{
		code: 'R1',
		slug: 'peninjau-contoh-satu',
		full_name: 'Peninjau Contoh Satu',
		role_title: 'Perencana keuangan',
		credentials: 'CFP® (contoh)',
		avatar: true,
		reviewer: true,
	},
	{
		code: 'R2',
		slug: 'peninjau-contoh-dua',
		full_name: 'Peninjau Contoh Dua',
		role_title: 'Perencana keuangan',
		credentials: 'CFP® (contoh)',
		avatar: true,
		reviewer: true,
	},
].map((author) => ({
	...author,
	bio: `${author.full_name} adalah profil contoh untuk pengujian situs Financial Field Indonesia. Nama, peran, dan latar belakang ini fiktif dan tidak mewakili orang sungguhan.`,
	same_as: [
		{
			url: `https://example.org/profil/${author.slug}`,
			label: 'Profil contoh',
		},
	],
	expertise: author.reviewer ? ['Perencanaan keuangan', 'Pajak pribadi'] : ['Keuangan pribadi'],
}));

/**
 * The seed person for a writer or reviewer code (W1…W4, R1, R2). Throws on an
 * unknown code: a data error stops the run instead of seeding partial content.
 */
export function authorByCode(code) {
	const author = AUTHORS.find((candidate) => candidate.code === code);
	if (!author) {
		throw new Error(`Unknown author code ${code}`);
	}
	return author;
}
