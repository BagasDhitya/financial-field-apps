/**
 * Seed profiles (PRP-0002.p1 §D4.2, ADR-0014). `default` writes the content
 * exactly as the generators make it. `demo` writes the same entries without
 * the visible demo markers, for the staging demo. The generators stay
 * profile-blind and this layer changes their output, so `default` cannot
 * drift. Fictional people and institutions, example.* links and the hidden
 * marker tag stay in both profiles.
 */
import { SeedGuardError } from './client.mjs';
import { DISCLAIMER } from './generate.mjs';

/** The only accepted `SEED_PROFILE` values (ADR-0014). */
export const SEED_PROFILES = ['default', 'demo'];

const PROFILE_PREVIEW_MAX = 20;

/**
 * `SEED_PROFILE`: unset or blank is `default`. Any other unknown value stops
 * the run before a request is sent (REQ-SEED-009), never guessed (W13).
 */
export function parseSeedProfile(raw) {
	const value = String(raw ?? '')
		.trim()
		.toLowerCase();
	if (value === '') {
		return 'default';
	}
	if (!SEED_PROFILES.includes(value)) {
		throw new SeedGuardError(
			`Refusing to seed: SEED_PROFILE "${value.slice(0, PROFILE_PREVIEW_MAX)}" is not default or demo.`,
		);
	}
	return value;
}

/**
 * Exact phrases, longest first, so a sentence is replaced before a phrase
 * inside it. Every entry matches text the generators or data really produce;
 * profile.test.mjs sweeps all 64 rows for leftovers (DEMO_MARKERS).
 */
const DEMO_PHRASES = [
	// Body sentences that say the content is fictional or exists to test the site.
	[
		' Seluruh produk, angka, dan lembaga dalam artikel ini fiktif. Artikel ini merupakan konten bersponsor contoh yang disusun untuk menguji label PR, pengungkapan sponsor, dan atribut tautan bersponsor di situs Financial Field Indonesia.',
		' Informasi produk disusun bersama Sponsor Contoh untuk pembaca Financial Field Indonesia.',
	],
	[
		' Narasumber Contoh adalah tokoh fiktif; wawancara ini disusun untuk menguji tampilan rubrik wawancara.',
		'',
	],
	[
		' Nama, tempat, dan angka dalam wawancara ini tidak merujuk pada orang atau lembaga nyata.',
		'',
	],
	[
		'Terakhir, ingatlah bahwa semua cerita dalam wawancara contoh ini fiktif, jadi sesuaikan setiap saran dengan kondisi Anda sendiri.',
		'Terakhir, sesuaikan setiap saran dengan kondisi Anda sendiri.',
	],
	[' Semua langkah ini hanya ilustrasi dan tidak menggambarkan produk nyata mana pun.', ''],
	[
		'Tidak. Semua angka dalam artikel contoh ini fiktif dan hanya untuk menguji tampilan situs.',
		'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
	],
	[
		'contoh perhitungan dengan angka fiktif, dan daftar',
		'contoh perhitungan sederhana, dan daftar',
	],
	[
		': penjelasan dasar, langkah praktis, dan contoh angka fiktif untuk menguji situs Financial Field Indonesia.',
		': penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
	],
	[
		'. Bagian dari data contoh untuk pengujian situs.',
		' dari redaksi Financial Field Indonesia.',
	],
	['Contoh koreksi: ', ''],
	[' Jawaban ini contoh fiktif.', ''],
	['sebagai catatan pribadi yang fiktif,', 'sebagai catatan pribadi,'],
	['Sebagai gambaran dengan angka fiktif, misalkan', 'Sebagai gambaran, misalkan'],
	['Contoh perhitungan (angka fiktif)', 'Contoh perhitungan'],
	['Penghasilan bulanan (fiktif): ', 'Penghasilan bulanan: '],
	['sebuah keluarga contoh memiliki', 'sebuah keluarga memiliki'],
	['Simulasi angka fiktif', 'Simulasi sederhana'],
	['berbagi pengalaman fiktif tentang', 'berbagi pengalaman tentang'],
	// Self-references ("this sample article …").
	['Artikel contoh ini menyusun', 'Artikel ini menyusun'],
	['Dalam artikel contoh ini,', 'Dalam artikel ini,'],
	['Artikel contoh tentang ', 'Kumpulan artikel tentang '],
	['Kolom contoh ini ', 'Kolom ini '],
	['Draf contoh tentang ', 'Draf tentang '],
	['Topik contoh: ', 'Artikel tentang '],
	['Sumber contoh tentang ', 'Panduan tentang '],
	['Panduan umum contoh keuangan keluarga', 'Panduan umum keuangan keluarga'],
	// "fiktif" on product words in answers and leads.
	[' fiktif dari ', ' dari '],
	[' fiktif dengan ', ' dengan '],
	// Lower-case "contoh" after an institution word reads as "an example bank";
	// the capitalised form is the fictional institution's name and stays.
	['sponsor contoh', 'Sponsor Contoh'],
	['bank contoh', 'Bank Contoh'],
	['penerbit contoh', 'Penerbit Contoh'],
	['Narasumber contoh', 'Narasumber Contoh'],
];

/**
 * Text that must never reach the CMS with the demo profile (REQ-SEED-010).
 * verify.mjs runs the same list against the CMS.
 */
export const DEMO_MARKERS = [
	/fiktif/i,
	/\(contoh\)/i,
	/menguji/i,
	/pengujian/i,
	/dibuat otomatis/i,
	/tidak (?:merujuk|menggambarkan|mewakili) [^.]*(?:nyata|sungguhan)/i,
	/\b(?:artikel|wawancara|kolom|draf|konten|data|profil|sumber|gambar|topik|keluarga) contoh\b/i,
	/\bcontoh koreksi\b/i,
	/\b(?:[Bb]ank|[Ss]ponsor|[Pp]enerbit|[Nn]arasumber) contoh\b/,
];

/** Applies the demo phrase table to one string. */
export function demoText(value) {
	let out = String(value);
	for (const [from, to] of DEMO_PHRASES) {
		out = out.split(from).join(to);
	}
	return out;
}

/** `value` as the profile writes it. */
export function textFor(value, profile) {
	return profile === 'demo' && typeof value === 'string' ? demoText(value) : value;
}

function isDisclaimer(block) {
	const children = block?.children ?? [];
	return (
		block?.type === 'paragraph' &&
		children.length === 1 &&
		children[0].type === 'text' &&
		children[0].text === DISCLAIMER
	);
}

function mapNode(node) {
	if (node.type === 'text') {
		return { ...node, text: demoText(node.text) };
	}
	return node.children ? { ...node, children: node.children.map(mapNode) } : node;
}

/**
 * Strapi Blocks as the profile writes them. `demo` drops the disclaimer
 * paragraphs and rewrites every text node; link URLs are never touched.
 */
export function blocksFor(blocks, profile) {
	if (profile !== 'demo') {
		return blocks;
	}
	return blocks.filter((block) => !isDisclaimer(block)).map(mapNode);
}

/** @returns {string[]} the demo markers found in `text`; empty when it is clean. */
export function demoMarkerHits(text) {
	const value = String(text ?? '');
	const hits = [];
	if (value.includes(DISCLAIMER)) {
		hits.push('disclaimer');
	}
	for (const pattern of DEMO_MARKERS) {
		const match = value.match(pattern);
		if (match) {
			hits.push(match[0]);
		}
	}
	return hits;
}

/** Name of the hidden marker tag; it records which profile the last run used (REQ-SEED-011). */
export function markerTagName(profile) {
	return profile === 'demo' ? 'Data contoh · demo' : 'Data contoh';
}

/** The profile a marker tag name records; a missing or foreign name reads as `default`. */
export function profileFromMarkerName(name) {
	return name === markerTagName('demo') ? 'demo' : 'default';
}

/** Neutral sentence per article type that pads a short demo lead to 120 characters. */
export const DEMO_LEAD_PADS = {
	S: 'Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
	I: 'Simak pengalaman, kesalahan yang sering terjadi, dan sarannya dalam wawancara berikut.',
	C: 'Simak catatan dan ajakan sederhana untuk mulai merencanakan dalam kolom berikut.',
	PR: 'Simak cara kerja, biaya, dan hal yang perlu diperhatikan dalam artikel berikut.',
};

/** Alt text for a category placeholder image. */
export function categoryImageAlt(categoryName, profile) {
	return profile === 'demo'
		? `Ilustrasi kategori ${categoryName}`
		: `Gambar contoh untuk kategori ${categoryName}`;
}

/** Alt text for an author placeholder avatar. */
export function avatarAlt(fullName, profile) {
	return profile === 'demo' ? `Foto profil ${fullName}` : `Foto profil contoh ${fullName}`;
}

/**
 * The profile to check: SEED_PROFILE when set, else the one the marker tag
 * records. A set value that disagrees with the record is a failed check, not a
 * guess (REQ-SEED-011).
 * @param {string | undefined} rawEnv
 * @param {string | null} markerName  null when there is no marker tag
 */
export function resolveVerifyProfile(rawEnv, markerName) {
	const explicit = String(rawEnv ?? '').trim() === '' ? null : parseSeedProfile(rawEnv);
	const recorded = markerName === null ? null : profileFromMarkerName(markerName);
	return {
		profile: explicit ?? recorded ?? 'default',
		recorded,
		ok: recorded !== null && (explicit === null || explicit === recorded),
		detail:
			recorded === null
				? 'no marker tag: nothing seeded'
				: `recorded ${recorded}${explicit && explicit !== recorded ? `, but SEED_PROFILE=${explicit}` : ''}`,
	};
}
