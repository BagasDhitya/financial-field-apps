'use client';

import { useId, useState } from 'react';

import { formatPercent } from '@/lib/comparison/format';
import { formatNumber, formatRupiah } from '@/lib/format';
import {
	amortizationSchedule,
	effectiveRateOfFlat,
	monthlyInstallment,
	type RateMethod,
} from '@/lib/loan';

import styles from './InstallmentCalculator.module.css';

const PREVIEW_MONTHS = 12;

function digitsOnly(value: string): number {
	return Number(value.replace(/\D/g, '')) || 0;
}

/**
 * The instalment calculator (PRP-0002.p3 T26, REQ-CMP-012): flat or effective
 * (annuity) interest, the totals and the month-by-month schedule. Everything
 * is computed in the browser; nothing is sent or stored.
 */
export function InstallmentCalculator() {
	const id = useId();
	const [amount, setAmount] = useState(100_000_000);
	const [rate, setRate] = useState('10');
	const [tenor, setTenor] = useState('36');
	const [method, setMethod] = useState<RateMethod>('efektif');
	const [showAll, setShowAll] = useState(false);

	const ratePerYear = Math.min(100, Math.max(0, Number(rate.replace(',', '.')) || 0));
	const months = Math.min(360, Math.max(0, Math.round(Number(tenor) || 0)));
	const installment = monthlyInstallment(amount, ratePerYear, months, method);
	const schedule = amortizationSchedule(amount, ratePerYear, months, method);
	const total = installment * months;
	const interest = Math.max(0, total - amount);
	const rows = showAll ? schedule : schedule.slice(0, PREVIEW_MONTHS);

	return (
		<div className={styles.root}>
			<form className={styles.form} onSubmit={(event) => event.preventDefault()}>
				<label className={styles.field}>
					<span className={styles.label}>Jumlah pinjaman (Rp)</span>
					<input
						className={styles.control}
						inputMode="numeric"
						value={formatNumber(amount)}
						onChange={(event) =>
							setAmount(Math.min(100_000_000_000, digitsOnly(event.target.value)))
						}
					/>
				</label>
				<label className={styles.field}>
					<span className={styles.label}>Bunga per tahun (%)</span>
					<input
						className={styles.control}
						inputMode="decimal"
						value={rate}
						onChange={(event) => setRate(event.target.value)}
					/>
				</label>
				<label className={styles.field}>
					<span className={styles.label}>Tenor (bulan)</span>
					<input
						className={styles.control}
						type="number"
						inputMode="numeric"
						min={1}
						max={360}
						value={tenor}
						onChange={(event) => setTenor(event.target.value)}
					/>
				</label>
				<fieldset className={styles.methods}>
					<legend className={styles.label}>Metode bunga</legend>
					<label className={styles.choice}>
						<input
							type="radio"
							name={`${id}-metode`}
							checked={method === 'efektif'}
							onChange={() => setMethod('efektif')}
						/>
						Efektif (anuitas)
					</label>
					<label className={styles.choice}>
						<input
							type="radio"
							name={`${id}-metode`}
							checked={method === 'flat'}
							onChange={() => setMethod('flat')}
						/>
						Flat
					</label>
				</fieldset>
			</form>

			<section className={styles.result} aria-labelledby={`${id}-hasil`} aria-live="polite">
				<h2 id={`${id}-hasil`} className={styles.resultTitle}>
					Cicilan per bulan
				</h2>
				<p className={styles.big}>
					{installment > 0 ? formatRupiah(Math.round(installment)) : '–'}
				</p>
				<dl className={styles.totals}>
					<div>
						<dt>Total bunga</dt>
						<dd>{formatRupiah(Math.round(interest))}</dd>
					</div>
					<div>
						<dt>Total pembayaran</dt>
						<dd>{formatRupiah(Math.round(total))}</dd>
					</div>
					{method === 'flat' && months > 0 && ratePerYear > 0 ? (
						<div>
							<dt>Setara bunga efektif</dt>
							<dd>
								±{' '}
								{formatPercent(
									Math.round(effectiveRateOfFlat(ratePerYear, months) * 10) / 10,
								)}{' '}
								per tahun
							</dd>
						</div>
					) : null}
				</dl>
			</section>

			{rows.length > 0 ? (
				<section className={styles.schedule} aria-labelledby={`${id}-jadwal`}>
					<h2 id={`${id}-jadwal`} className={styles.resultTitle}>
						Jadwal angsuran
					</h2>
					<div
						className={styles.tableWrap}
						role="region"
						aria-labelledby={`${id}-jadwal`}
						tabIndex={0}
					>
						<table className={styles.table}>
							<thead>
								<tr>
									<th scope="col">Bulan</th>
									<th scope="col">Cicilan</th>
									<th scope="col">Pokok</th>
									<th scope="col">Bunga</th>
									<th scope="col">Sisa pokok</th>
								</tr>
							</thead>
							<tbody>
								{rows.map((row) => (
									<tr key={row.month}>
										<th scope="row">{row.month}</th>
										<td>{formatNumber(Math.round(row.installment))}</td>
										<td>{formatNumber(Math.round(row.principal))}</td>
										<td>{formatNumber(Math.round(row.interest))}</td>
										<td>{formatNumber(Math.round(row.balance))}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{schedule.length > PREVIEW_MONTHS ? (
						<button
							type="button"
							className={styles.more}
							onClick={() => setShowAll(!showAll)}
						>
							{showAll
								? `Tampilkan ${PREVIEW_MONTHS} bulan pertama`
								: `Tampilkan semua ${schedule.length} bulan`}
						</button>
					) : null}
				</section>
			) : null}
		</div>
	);
}
