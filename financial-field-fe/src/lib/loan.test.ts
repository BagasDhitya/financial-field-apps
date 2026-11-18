import { describe, expect, it } from 'vitest';

import { amortizationSchedule, effectiveRateOfFlat, monthlyInstallment } from './loan';

describe('monthlyInstallment (PRP-0002.p3 AC17)', () => {
	it('matches the worked examples to the rupiah', () => {
		expect(Math.round(monthlyInstallment(100_000_000, 10, 36, 'efektif'))).toBe(3_226_719);
		expect(Math.round(monthlyInstallment(100_000_000, 10, 36, 'flat'))).toBe(3_611_111);
	});

	it('handles a zero rate and refuses nonsense', () => {
		expect(monthlyInstallment(1_200_000, 0, 12, 'efektif')).toBe(100_000);
		expect(monthlyInstallment(0, 10, 12, 'flat')).toBe(0);
		expect(monthlyInstallment(1_000_000, 10, 0, 'flat')).toBe(0);
	});
});

describe('amortizationSchedule', () => {
	it('pays the principal off exactly', () => {
		for (const method of ['flat', 'efektif'] as const) {
			const rows = amortizationSchedule(50_000_000, 12, 24, method);
			expect(rows).toHaveLength(24);
			expect(rows.at(-1)?.balance).toBe(0);
			const paid = rows.reduce((sum, row) => sum + row.principal, 0);
			expect(Math.round(paid)).toBe(50_000_000);
		}
	});

	it('front-loads interest only for the effective method', () => {
		const effective = amortizationSchedule(50_000_000, 12, 24, 'efektif');
		expect(effective[0]!.interest).toBeGreaterThan(effective[23]!.interest);
		const flat = amortizationSchedule(50_000_000, 12, 24, 'flat');
		expect(flat[0]!.interest).toBe(flat[23]!.interest);
	});
});

describe('effectiveRateOfFlat', () => {
	it('finds the effective equivalent of a flat rate', () => {
		expect(effectiveRateOfFlat(10, 36)).toBeCloseTo(17.92, 1);
	});
});
