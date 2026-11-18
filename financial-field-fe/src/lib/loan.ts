/**
 * Loan arithmetic for the comparison estimates and the calculator
 * (REQ-CMP-012, PRP-0002.p3 AC17). Client-safe and pure. Rates are percent per
 * year; amounts are Rupiah; results are not rounded, display code rounds.
 */

export type RateMethod = 'flat' | 'efektif';

export type ScheduleRow = {
	month: number;
	installment: number;
	principal: number;
	interest: number;
	balance: number;
};

/** The monthly instalment: flat = principal ÷ n + principal × rate ÷ 12; effective = annuity. */
export function monthlyInstallment(
	principal: number,
	ratePerYear: number,
	months: number,
	method: RateMethod,
): number {
	if (!(principal > 0) || !(months > 0) || !(ratePerYear >= 0)) {
		return 0;
	}
	const monthlyRate = ratePerYear / 100 / 12;
	if (method === 'flat') {
		return principal / months + principal * monthlyRate;
	}
	if (monthlyRate === 0) {
		return principal / months;
	}
	return (principal * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
}

/** Month-by-month split of each instalment into principal and interest. */
export function amortizationSchedule(
	principal: number,
	ratePerYear: number,
	months: number,
	method: RateMethod,
): ScheduleRow[] {
	const installment = monthlyInstallment(principal, ratePerYear, months, method);
	if (installment === 0) {
		return [];
	}
	const monthlyRate = ratePerYear / 100 / 12;
	const rows: ScheduleRow[] = [];
	let balance = principal;
	for (let month = 1; month <= months; month += 1) {
		const interest = method === 'flat' ? principal * monthlyRate : balance * monthlyRate;
		const principalPart = month === months ? balance : installment - interest;
		balance = Math.max(0, balance - principalPart);
		rows.push({ month, installment, principal: principalPart, interest, balance });
	}
	return rows;
}

/** The effective yearly rate whose annuity equals the flat-rate instalment (bisection). */
export function effectiveRateOfFlat(flatRatePerYear: number, months: number): number {
	const target = monthlyInstallment(100, flatRatePerYear, months, 'flat');
	let low = 0;
	let high = 200;
	for (let step = 0; step < 80; step += 1) {
		const middle = (low + high) / 2;
		if (monthlyInstallment(100, middle, months, 'efektif') < target) {
			low = middle;
		} else {
			high = middle;
		}
	}
	return (low + high) / 2;
}
