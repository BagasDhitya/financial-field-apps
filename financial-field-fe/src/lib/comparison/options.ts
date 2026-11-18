import { formatRupiah } from '@/lib/format';

/**
 * The choices offered by the home finder and the section surveys. Plain data so
 * both use the same steps (W5).
 */
export const CAR_PRICES = [
	150_000_000, 200_000_000, 250_000_000, 300_000_000, 400_000_000, 500_000_000, 750_000_000,
	1_000_000_000,
];

export const VEHICLE_VALUES = [
	50_000_000, 75_000_000, 100_000_000, 150_000_000, 200_000_000, 300_000_000, 500_000_000,
];

export const LOAN_AMOUNTS = [
	10_000_000, 25_000_000, 50_000_000, 75_000_000, 100_000_000, 150_000_000, 200_000_000,
	300_000_000, 500_000_000,
];

export const TENORS = [12, 24, 36, 48, 60];

/** Monthly net income bands; the value is the band's lower bound. */
export const INCOMES = [
	{ value: 0, label: 'Tidak diisi' },
	{ value: 3_000_000, label: 'Rp 3–5 juta' },
	{ value: 5_000_000, label: 'Rp 5–10 juta' },
	{ value: 10_000_000, label: 'Rp 10–20 juta' },
	{ value: 20_000_000, label: 'Di atas Rp 20 juta' },
];

export const DEFAULTS = {
	price: 300_000_000,
	downPayment: 20,
	vehicleValue: 150_000_000,
	amount: 50_000_000,
	tenor: 48,
	income: 0,
};

export function rupiahOption(value: number): { value: number; label: string } {
	return { value, label: formatRupiah(value) };
}
