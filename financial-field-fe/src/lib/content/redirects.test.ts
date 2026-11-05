import { describe, expect, it } from 'vitest';

import { normalizePath, resolveRedirect, type RedirectRule } from './redirects';

const rules: RedirectRule[] = [
	{ from: '/artikel/a', to: '/artikel/b', status: 301 },
	{ from: '/artikel/b', to: '/artikel/c', status: 301 },
	{ from: '/artikel/loop-1', to: '/artikel/loop-2', status: 301 },
	{ from: '/artikel/loop-2', to: '/artikel/loop-1', status: 301 },
];

describe('redirects (REQ-SEO-015)', () => {
	it('normalizes case and trailing slashes', () => {
		expect(normalizePath('/Artikel/A/')).toBe('/artikel/a');
		expect(normalizePath('artikel/a')).toBe('/artikel/a');
		expect(normalizePath('/')).toBe('/');
	});

	it('collapses chains into a single hop', () => {
		expect(resolveRedirect(rules, '/artikel/a')).toEqual({
			from: '/artikel/a',
			to: '/artikel/c',
			status: 301,
		});
	});

	it('returns null for unknown paths and refuses loops', () => {
		expect(resolveRedirect(rules, '/artikel/x')).toBeNull();
		expect(resolveRedirect(rules, '/artikel/loop-1')).toBeNull();
	});
});
