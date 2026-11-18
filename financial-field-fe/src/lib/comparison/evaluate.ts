import { formatRupiah } from '@/lib/format';
import { monthlyInstallment } from '@/lib/loan';
import type { FinancialProduct } from '@/types';

import type { LoanAnswers } from './answers';
import { DEFAULTS } from './options';
import type { SurveyKind } from './surveys';

export type ProductResult = {
	product: FinancialProduct;
	/** The loan the answers describe; null when the product has no loan terms. */
	principal: number | null;
	/** At the lowest advertised rate; null without loan terms. */
	installment: number | null;
	/** Why it doesn't fit the answers; empty when it does. */
	reasons: string[];
};

export type Evaluation = {
	/** Fits the answers, cheapest estimate first (REQ-CMP-005, metodologi). */
	fitting: ProductResult[];
	/** Everything else, in the default order, under "Produk lain". */
	others: ProductResult[];
};

/** The answers with defaults filled in, so every estimate is computable. */
export function completeAnswers(answers: LoanAnswers): Required<LoanAnswers> {
	return {
		price: answers.price ?? DEFAULTS.price,
		downPayment: answers.downPayment ?? DEFAULTS.downPayment,
		vehicleValue: answers.vehicleValue ?? DEFAULTS.vehicleValue,
		amount: answers.amount ?? DEFAULTS.amount,
		tenor: answers.tenor ?? DEFAULTS.tenor,
		income: answers.income ?? DEFAULTS.income,
	};
}

/** The loan amount the answers describe for a section's survey. */
export function principalOf(kind: SurveyKind, answers: Required<LoanAnswers>): number | null {
	if (kind === 'car') {
		return Math.round(answers.price * (1 - answers.downPayment / 100));
	}
	if (kind === 'collateral') {
		return answers.amount;
	}
	return null;
}

function evaluateOne(
	product: FinancialProduct,
	kind: SurveyKind,
	answers: Required<LoanAnswers>,
): ProductResult {
	const reasons: string[] = [];
	if (answers.income > 0 && product.minIncome !== null && product.minIncome > answers.income) {
		reasons.push(`Penghasilan minimum ${formatRupiah(product.minIncome)}`);
	}
	const loan = product.loan;
	const principal = principalOf(kind, answers);
	if (!loan || principal === null) {
		return { product, principal: null, installment: null, reasons };
	}
	if (
		kind === 'car' &&
		loan.downPaymentMin !== null &&
		answers.downPayment < loan.downPaymentMin
	) {
		reasons.push(`Uang muka minimum ${loan.downPaymentMin}%`);
	}
	if (
		kind === 'collateral' &&
		loan.maxFinancing !== null &&
		principal > (answers.vehicleValue * loan.maxFinancing) / 100
	) {
		reasons.push(`Pinjaman maksimal ${loan.maxFinancing}% dari nilai kendaraan`);
	}
	if (principal < loan.amountMin) {
		reasons.push(`Pinjaman minimum ${formatRupiah(loan.amountMin)}`);
	}
	if (principal > loan.amountMax) {
		reasons.push(`Pinjaman maksimum ${formatRupiah(loan.amountMax)}`);
	}
	if (answers.tenor < loan.tenorMin || answers.tenor > loan.tenorMax) {
		reasons.push(`Tenor ${loan.tenorMin}–${loan.tenorMax} bulan`);
	}
	return {
		product,
		principal,
		installment: monthlyInstallment(principal, loan.rateMin, answers.tenor, loan.rateType),
		reasons,
	};
}

/**
 * Sorts a section's products against the reader's answers (PRP-0002.p3 T22).
 * `products` arrive in the default order (provider, then title), which the
 * stable sort keeps for equal estimates and for "Produk lain".
 */
export function evaluateProducts(
	products: FinancialProduct[],
	kind: SurveyKind,
	answers: LoanAnswers,
): Evaluation {
	const complete = completeAnswers(answers);
	const results = products.map((product) => evaluateOne(product, kind, complete));
	const fitting = results
		.filter((result) => result.reasons.length === 0)
		.sort(
			(a, b) =>
				(a.installment ?? Number.POSITIVE_INFINITY) -
				(b.installment ?? Number.POSITIVE_INFINITY),
		);
	const others = results.filter((result) => result.reasons.length > 0);
	return { fitting, others };
}
