import { describe, expect, it } from 'vitest';

import { parsePageParam, parsePageSegments } from './pagination';

describe('parsePageSegments (REQ-SEO-006)', () => {
	it('treats no segments as page 1', () => {
		expect(parsePageSegments([])).toEqual({ kind: 'page', page: 1 });
	});

	it('parses /halaman/<n>', () => {
		expect(parsePageSegments(['halaman', '3'])).toEqual({
			kind: 'page',
			page: 3,
		});
	});

	it('asks for a redirect on /halaman/1', () => {
		expect(parsePageSegments(['halaman', '1'])).toEqual({
			kind: 'redirect-first',
		});
	});

	it.each([
		[['halaman']],
		[['halaman', '0']],
		[['halaman', '02']],
		[['page', '2']],
		[['halaman', '2', 'x']],
	])('rejects %j', (segments) => {
		expect(parsePageSegments(segments)).toEqual({ kind: 'invalid' });
	});

	it('parses ?halaman= defensively', () => {
		expect(parsePageParam('4')).toBe(4);
		expect(parsePageParam(['2', '9'])).toBe(2);
		expect(parsePageParam('-1')).toBe(1);
		expect(parsePageParam(undefined)).toBe(1);
	});
});
