import { describe, expect, it } from 'vitest';

import { addUtm, guardOutboundUrl, withUtm } from './outbound';

const ORIGIN = 'https://ffid.example';

describe('guardOutboundUrl (REQ-SEC-009)', () => {
	it('keeps an absolute https link', () => {
		expect(guardOutboundUrl('https://example.com/produk', ORIGIN)).toBe(
			'https://example.com/produk',
		);
	});

	it.each([
		['javascript:alert(1)'],
		['http://example.com/produk'],
		['https://user:pass@example.com/produk'],
		['https://ffid.example/bandingkan'],
		['/produk/relatif'],
		['bukan url'],
		[`https://example.com/${'a'.repeat(2050)}`],
		[''],
		[null],
	])('refuses %s', (url) => {
		expect(guardOutboundUrl(url, ORIGIN)).toBeNull();
	});
});

describe('withUtm (REQ-INT-003)', () => {
	it('adds the four values', () => {
		const url = new URL(withUtm('https://example.com/p?x=1', 'jaminan-bpkb', 'produk-a'));
		expect(url.searchParams.get('x')).toBe('1');
		expect(url.searchParams.get('utm_source')).toBe('financialfieldindonesia');
		expect(url.searchParams.get('utm_medium')).toBe('referral');
		expect(url.searchParams.get('utm_campaign')).toBe('bandingkan-jaminan-bpkb');
		expect(url.searchParams.get('utm_content')).toBe('produk-a');
	});

	it('leaves a URL with its own utm_* alone', () => {
		const url = 'https://example.com/p?utm_source=mitra';
		expect(withUtm(url, 'jaminan-bpkb', 'produk-a')).toBe(url);
	});
});

describe('addUtm (ADR-0024, the partner-media links)', () => {
	it('takes the campaign and content it is given', () => {
		const url = new URL(addUtm('https://mitra.example.com/a', 'mitra-media', 'artikel-x'));
		expect(url.searchParams.get('utm_campaign')).toBe('mitra-media');
		expect(url.searchParams.get('utm_content')).toBe('artikel-x');
		expect(url.searchParams.get('utm_source')).toBe('financialfieldindonesia');
	});
});
