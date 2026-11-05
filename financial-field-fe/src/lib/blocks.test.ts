import { describe, expect, it } from 'vitest';

import { blocksToPlainText, safeHref, shiftHeadingLevel, toBlocks } from './blocks';

describe('blocks', () => {
	it('drops unknown or malformed nodes instead of throwing (W2)', () => {
		expect(
			toBlocks([{ type: 'paragraph', children: [] }, { type: 'table' }, { nope: 1 }]),
		).toHaveLength(1);
	});

	it('extracts plain text across inline links and lists', () => {
		const text = blocksToPlainText([
			{
				type: 'paragraph',
				children: [
					{ type: 'text', text: 'Halo ' },
					{
						type: 'link',
						url: '/x',
						children: [{ type: 'text', text: 'dunia' }],
					},
				],
			},
			{ type: 'image', image: { url: '/a.jpg' } },
		]);
		expect(text).toBe('Halo dunia');
	});

	it('shifts body headings so the page keeps one H1 (REQ-SEO-021)', () => {
		expect(shiftHeadingLevel(1)).toBe(2);
		expect(shiftHeadingLevel(3)).toBe(4);
		expect(shiftHeadingLevel(6)).toBe(6);
	});

	it('allows only http, https, mailto and site-relative links (REQ-SEC-004)', () => {
		expect(safeHref('https://ojk.go.id/x')).toBe('https://ojk.go.id/x');
		expect(safeHref('mailto:redaksi@example.org')).toBe('mailto:redaksi@example.org');
		expect(safeHref('/artikel/a')).toBe('/artikel/a');
		expect(safeHref('javascript:alert(1)')).toBeNull();
		expect(safeHref('data:text/html,x')).toBeNull();
		expect(safeHref('//evil.example')).toBeNull();
	});
});
