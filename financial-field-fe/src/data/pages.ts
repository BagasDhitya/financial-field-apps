import { p } from './blocks';
import type { StaticPageEntry } from './types';

/** One line until the client sends the real text (OQ-13). */
const PLACEHOLDER = [p('Informasi lengkap untuk halaman ini sedang disiapkan oleh redaksi.')];

/**
 * Trust and legal pages (PRP-0002.p1 §S1): /tentang-kami, its sub-pages and
 * /hubungi-kami.
 */
export const STATIC_PAGES: StaticPageEntry[] = [
	{
		slug: 'tentang-kami',
		title: 'Tentang Financial Field Indonesia',
		group: 'tentang-kami',
		updatedAt: '2026-11-09T02:00:00.000Z',
		body: PLACEHOLDER,
	},
	{
		slug: 'redaksi',
		title: 'Redaksi',
		group: 'tentang-kami',
		updatedAt: '2026-11-09T02:00:00.000Z',
		body: PLACEHOLDER,
	},
	{
		slug: 'kebijakan-editorial',
		title: 'Kebijakan Editorial',
		group: 'tentang-kami',
		updatedAt: '2026-11-09T02:00:00.000Z',
		body: PLACEHOLDER,
	},
	{
		slug: 'pengungkapan-afiliasi',
		title: 'Pengungkapan Afiliasi',
		group: 'tentang-kami',
		updatedAt: '2026-11-09T02:00:00.000Z',
		body: PLACEHOLDER,
	},
	{
		slug: 'koreksi-berita',
		title: 'Kebijakan Koreksi',
		group: 'tentang-kami',
		updatedAt: '2026-11-09T02:00:00.000Z',
		body: PLACEHOLDER,
	},
	{
		slug: 'kebijakan-privasi',
		title: 'Kebijakan Privasi',
		group: 'legal',
		updatedAt: '2026-11-09T02:00:00.000Z',
		body: PLACEHOLDER,
	},
	{
		slug: 'syarat-penggunaan',
		title: 'Syarat Penggunaan',
		group: 'legal',
		updatedAt: '2026-11-09T02:00:00.000Z',
		body: PLACEHOLDER,
	},
	{
		slug: 'hubungi-kami',
		title: 'Hubungi Kami',
		group: 'tentang-kami',
		updatedAt: '2026-11-09T02:00:00.000Z',
		body: PLACEHOLDER,
	},
];
