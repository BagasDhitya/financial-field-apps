import { formatRupiah } from '@/lib/format';
import type { LoanSpecs } from '@/types';

const PERCENT = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 });

/** 4.5 → "4,5%". */
export function formatPercent(value: number): string {
	return `${PERCENT.format(value)}%`;
}

/** "4,5–6,5%" or "8%" when both ends match. */
export function formatRateRange(loan: LoanSpecs): string {
	return loan.rateMin === loan.rateMax
		? formatPercent(loan.rateMin)
		: `${PERCENT.format(loan.rateMin)}–${formatPercent(loan.rateMax)}`;
}

/** "flat" → "Flat", "efektif" → "Efektif". */
export function rateTypeLabel(loan: LoanSpecs): string {
	return loan.rateType === 'flat' ? 'Flat' : 'Efektif';
}

/** "12–60 bulan". */
export function formatTenorRange(loan: LoanSpecs): string {
	return loan.tenorMin === loan.tenorMax
		? `${loan.tenorMin} bulan`
		: `${loan.tenorMin}–${loan.tenorMax} bulan`;
}

/** 500_000_000 → "Rp 500 jt", 1_500_000_000 → "Rp 1,5 M": compact amounts for tables. */
export function formatCompactRupiah(value: number): string {
	if (value >= 1_000_000_000) {
		return `Rp ${PERCENT.format(value / 1_000_000_000)} M`;
	}
	if (value >= 1_000_000) {
		return `Rp ${PERCENT.format(value / 1_000_000)} jt`;
	}
	return formatRupiah(value);
}

/** "Rp 10 jt – Rp 500 jt". */
export function formatAmountRange(loan: LoanSpecs): string {
	return `${formatCompactRupiah(loan.amountMin)} – ${formatCompactRupiah(loan.amountMax)}`;
}
