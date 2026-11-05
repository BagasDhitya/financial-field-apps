import { describe, expect, it } from 'vitest';

import { truncateAtWord } from './text';

describe('truncateAtWord', () => {
	it('leaves short text alone and collapses whitespace', () => {
		expect(truncateAtWord('  a   b  ', 10)).toBe('a b');
	});

	it('cuts at a word boundary with an ellipsis', () => {
		const result = truncateAtWord('Cara menghitung pajak penghasilan karyawan', 25);
		expect(result).toBe('Cara menghitung pajak…');
		expect(result.length).toBeLessThanOrEqual(25);
	});
});
