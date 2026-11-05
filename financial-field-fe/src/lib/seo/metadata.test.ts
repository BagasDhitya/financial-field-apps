import { describe, expect, it } from 'vitest';

import {
	absoluteUrl,
	buildDescription,
	buildMetadata,
	buildTitle,
	composeDescription,
} from './metadata';

describe('metadata builders (SPC-seo §5, REQ-SEO-016/020/040)', () => {
	it('appends the brand when it fits in 70 characters', () => {
		expect(buildTitle('Pajak')).toBe('Pajak | Financial Field Indonesia');
	});

	it('drops the brand and truncates long titles', () => {
		const title = buildTitle(
			'Cara menghitung pajak penghasilan karyawan tetap dengan contoh lengkap',
		);
		expect(title).not.toContain('Financial Field Indonesia');
		expect(title.length).toBeLessThanOrEqual(70);
	});

	it('uses the first non-empty description, cut to 160', () => {
		expect(buildDescription(null, '  ', 'Lead')).toBe('Lead');
		expect(buildDescription('x '.repeat(200))?.length).toBeLessThanOrEqual(160);
		expect(buildDescription(null)).toBeUndefined();
	});

	it('extends thin descriptions and never returns empty', () => {
		const long =
			'Deskripsi kategori yang sudah cukup panjang untuk dipakai apa adanya oleh mesin pencari.';
		expect(composeDescription(long, 'Cadangan.')).toBe(long);
		expect(composeDescription('Pajak', 'Kumpulan artikel pajak.')).toBe(
			'Pajak. Kumpulan artikel pajak.',
		);
		expect(composeDescription('  ', 'Cadangan.')).toBe('Cadangan.');
		expect(composeDescription(null, 'Cadangan.')).toBe('Cadangan.');
	});

	it('builds absolute self-canonicals', () => {
		expect(absoluteUrl('/artikel/a')).toBe('https://example.test/artikel/a');
		const meta = buildMetadata({ title: 'A', path: '/artikel/a' });
		expect(meta.alternates?.canonical).toBe('https://example.test/artikel/a');
	});

	it('honours editor overrides and noindex', () => {
		const meta = buildMetadata({
			title: 'A',
			path: '/artikel/a',
			seo: {
				metaTitle: 'Judul SEO',
				metaDescription: 'Deskripsi SEO',
				focusKeyword: null,
				ogImage: null,
				canonicalUrl: 'https://example.test/artikel/b',
				noIndex: true,
			},
		});
		expect(meta.title).toEqual({
			absolute: 'Judul SEO | Financial Field Indonesia',
		});
		expect(meta.description).toBe('Deskripsi SEO');
		expect(meta.alternates?.canonical).toBe('https://example.test/artikel/b');
		expect(meta.robots).toEqual({ index: false, follow: true });
	});

	it('uses a generated per-article card when there is no image (T44)', () => {
		const meta = buildMetadata({
			title: 'Judul',
			path: '/artikel/judul',
			fallbackImagePath: '/og/artikel/judul',
		});
		expect(JSON.stringify(meta.openGraph)).toContain('https://example.test/og/artikel/judul');
	});

	it('always provides OG and Twitter cards, falling back to the brand image', () => {
		const meta = buildMetadata({ title: 'A', path: '/' });
		expect(meta.openGraph).toMatchObject({
			locale: 'id_ID',
			siteName: 'Financial Field Indonesia',
		});
		expect(JSON.stringify(meta.openGraph)).toContain('https://example.test/og');
		expect(meta.twitter).toMatchObject({ card: 'summary_large_image' });
	});
});
