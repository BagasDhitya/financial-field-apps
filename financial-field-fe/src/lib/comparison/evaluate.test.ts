import { describe, expect, it } from 'vitest';

import type { FinancialProduct, LoanSpecs } from '@/types';

import { evaluateProducts } from './evaluate';

function product(slug: string, loan: Partial<LoanSpecs> | null, minIncome: number | null = null) {
	return {
		id: slug,
		slug,
		title: slug,
		summary: null,
		section: null,
		provider: { id: 'p', slug: 'p', name: 'Penyedia', logo: null },
		minIncome,
		annualFeeText: null,
		features: [],
		featureHighlights: [],
		officialUrl: null,
		image: null,
		dataCheckedAt: null,
		sourceUrl: null,
		isPartner: false,
		loan: loan
			? {
					rateType: 'flat',
					rateMin: 5,
					rateMax: 7,
					amountMin: 50_000_000,
					amountMax: 1_000_000_000,
					tenorMin: 12,
					tenorMax: 60,
					downPaymentMin: 20,
					maxFinancing: null,
					fees: null,
					...loan,
				}
			: null,
		seo: null,
	} satisfies FinancialProduct;
}

describe('evaluateProducts: kredit mobil', () => {
	const answers = { price: 300_000_000, downPayment: 20, tenor: 48 };

	it('estimates the instalment from price, down payment and tenor', () => {
		const { fitting } = evaluateProducts([product('a', {})], 'car', answers);
		// Rp 240 jt, flat 5%, 48 months: 5.000.000 + 1.000.000.
		expect(fitting[0]?.principal).toBe(240_000_000);
		expect(Math.round(fitting[0]!.installment!)).toBe(6_000_000);
	});

	it('puts the cheapest estimate first and explains the rest', () => {
		const { fitting, others } = evaluateProducts(
			[
				product('mahal', { rateMin: 7 }),
				product('murah', { rateMin: 4.5 }),
				product('dp-tinggi', { downPaymentMin: 25 }),
				product('tenor-pendek', { tenorMax: 36 }),
			],
			'car',
			answers,
		);
		expect(fitting.map((result) => result.product.slug)).toEqual(['murah', 'mahal']);
		expect(others.map((result) => result.reasons)).toEqual([
			['Uang muka minimum 25%'],
			['Tenor 12–36 bulan'],
		]);
	});

	it('checks income only when the reader gives it', () => {
		const rich = product('a', {}, 8_000_000);
		expect(evaluateProducts([rich], 'car', answers).fitting).toHaveLength(1);
		const { others } = evaluateProducts([rich], 'car', { ...answers, income: 5_000_000 });
		expect(others[0]?.reasons[0]).toMatch(/^Penghasilan minimum Rp/);
	});
});

describe('evaluateProducts: jaminan BPKB', () => {
	it('caps the loan at the share of the vehicle value', () => {
		const { fitting, others } = evaluateProducts(
			[
				product('a', { maxFinancing: 80, amountMin: 10_000_000 }),
				product('b', { maxFinancing: 50, amountMin: 10_000_000 }),
			],
			'collateral',
			{ vehicleValue: 150_000_000, amount: 100_000_000, tenor: 24 },
		);
		expect(fitting.map((result) => result.product.slug)).toEqual(['a']);
		expect(others[0]?.reasons).toEqual(['Pinjaman maksimal 50% dari nilai kendaraan']);
	});
});

describe('evaluateProducts: without loan terms (Stage A)', () => {
	it('keeps the product with no estimate', () => {
		const { fitting } = evaluateProducts([product('a', null)], 'income', {});
		expect(fitting[0]?.installment).toBeNull();
	});
});
