'use client';

import Link from 'next/link';
import { useId, useState, useSyncExternalStore, type FormEvent } from 'react';

import {
	clearAnswers,
	parseAnswers,
	saveAnswers,
	storedAnswers,
	type LoanAnswers,
} from '@/lib/comparison/answers';
import { completeAnswers, evaluateProducts, type ProductResult } from '@/lib/comparison/evaluate';
import {
	formatAmountRange,
	formatPercent,
	formatRateRange,
	formatTenorRange,
	rateTypeLabel,
} from '@/lib/comparison/format';
import {
	CAR_PRICES,
	INCOMES,
	LOAN_AMOUNTS,
	rupiahOption,
	TENORS,
	VEHICLE_VALUES,
} from '@/lib/comparison/options';
import type { SurveyKind } from '@/lib/comparison/surveys';
import { formatRupiah } from '@/lib/format';
import { routes } from '@/lib/routes';
import type { FinancialProduct } from '@/types';

import { OutboundLink } from '../OutboundLink/OutboundLink';
import { ProviderLogo } from '../ProviderLogo/ProviderLogo';

import styles from './ComparisonTool.module.css';

export type ComparisonToolProps = {
	sectionSlug: string;
	sectionName: string;
	kind: SurveyKind;
	/** Every published product of the section, in the default order (REQ-CMP-011). */
	products: FinancialProduct[];
};

type Local = { answers: LoanAnswers; answered: boolean };

// sessionStorage has no change event within the tab; the component updates its
// own state when it writes, so the store never needs to notify.
const subscribe = () => () => {};

function Select({
	label,
	value,
	options,
	onChange,
}: {
	label: string;
	value: number;
	options: { value: number; label: string }[];
	onChange: (value: number) => void;
}) {
	return (
		<label className={styles.field}>
			<span className={styles.label}>{label}</span>
			<select
				className={styles.control}
				value={value}
				onChange={(event) => onChange(Number(event.target.value))}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	);
}

function limitOf(product: FinancialProduct, kind: SurveyKind): string {
	const loan = product.loan;
	if (!loan) {
		return '–';
	}
	if (kind === 'car' && loan.downPaymentMin !== null) {
		return `DP min. ${formatPercent(loan.downPaymentMin)}`;
	}
	if (kind === 'collateral' && loan.maxFinancing !== null) {
		return `Maks. ${formatPercent(loan.maxFinancing)} nilai kendaraan`;
	}
	return '–';
}

function Rows({
	results,
	kind,
	sectionSlug,
	answered,
	caption,
}: {
	results: ProductResult[];
	kind: SurveyKind;
	sectionSlug: string;
	answered: boolean;
	caption: string;
}) {
	const limitHeading = kind === 'car' ? 'Uang muka' : kind === 'collateral' ? 'Pembiayaan' : null;
	return (
		<>
			<div className={styles.tableWrap} role="region" aria-label={caption} tabIndex={0}>
				<table className={styles.table}>
					<caption className="visually-hidden">{caption}</caption>
					<thead>
						<tr>
							<th scope="col">Produk</th>
							<th scope="col">Bunga per tahun</th>
							<th scope="col">Plafon</th>
							<th scope="col">Tenor</th>
							{limitHeading ? <th scope="col">{limitHeading}</th> : null}
							<th scope="col">Penghasilan min.</th>
							{answered ? <th scope="col">Estimasi cicilan</th> : null}
							<th scope="col">
								<span className="visually-hidden">Tautan</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{results.map(({ product, installment, reasons }) => (
							<tr key={product.id}>
								<th scope="row" className={styles.productCell}>
									<ProviderLogo provider={product.provider} />
									<span className={styles.productText}>
										<span className={styles.provider}>
											{product.provider.name}
										</span>
										<Link
											href={routes.product(product.slug)}
											className={styles.productName}
										>
											{product.title}
										</Link>
										{reasons.length > 0 ? (
											<span className={styles.reasons}>
												{reasons.join(' · ')}
											</span>
										) : null}
									</span>
								</th>
								<td>
									{product.loan ? (
										<>
											<span className={styles.strong}>
												{formatRateRange(product.loan)}
											</span>
											<span className={styles.sub}>
												{rateTypeLabel(product.loan)}
											</span>
										</>
									) : (
										'–'
									)}
								</td>
								<td>{product.loan ? formatAmountRange(product.loan) : '–'}</td>
								<td>{product.loan ? formatTenorRange(product.loan) : '–'}</td>
								{limitHeading ? <td>{limitOf(product, kind)}</td> : null}
								<td>{product.minIncome ? formatRupiah(product.minIncome) : '–'}</td>
								{answered ? (
									<td className={styles.estimate}>
										{installment !== null ? (
											<>
												<span className={styles.strong}>
													{formatRupiah(Math.round(installment))}
												</span>
												<span className={styles.sub}>per bulan</span>
											</>
										) : (
											'–'
										)}
									</td>
								) : null}
								<td>
									{product.officialUrl ? (
										<OutboundLink
											href={product.officialUrl}
											section={sectionSlug}
											productSlug={product.slug}
											providerName={product.provider.name}
											variant="text"
										/>
									) : null}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<ul className={styles.cards}>
				{results.map(({ product, installment, reasons }) => (
					<li key={product.id} className={styles.card}>
						<div className={styles.cardHead}>
							<ProviderLogo provider={product.provider} />
							<div className={styles.productText}>
								<span className={styles.provider}>{product.provider.name}</span>
								<Link
									href={routes.product(product.slug)}
									className={styles.productName}
								>
									{product.title}
								</Link>
							</div>
						</div>
						{answered && installment !== null ? (
							<p className={styles.cardEstimate}>
								<span className={styles.sub}>Estimasi cicilan</span>
								<span className={styles.big}>
									{formatRupiah(Math.round(installment))}
								</span>
								<span className={styles.sub}>per bulan</span>
							</p>
						) : null}
						{reasons.length > 0 ? (
							<p className={styles.reasons}>{reasons.join(' · ')}</p>
						) : null}
						{product.loan ? (
							<dl className={styles.facts}>
								<div>
									<dt>Bunga</dt>
									<dd>
										{formatRateRange(product.loan)}{' '}
										{rateTypeLabel(product.loan).toLowerCase()}
									</dd>
								</div>
								<div>
									<dt>Plafon</dt>
									<dd>{formatAmountRange(product.loan)}</dd>
								</div>
								<div>
									<dt>Tenor</dt>
									<dd>{formatTenorRange(product.loan)}</dd>
								</div>
								{limitHeading ? (
									<div>
										<dt>{limitHeading}</dt>
										<dd>{limitOf(product, kind)}</dd>
									</div>
								) : null}
							</dl>
						) : null}
						<div className={styles.cardActions}>
							<Link href={routes.product(product.slug)} className={styles.detail}>
								Lihat detail
							</Link>
							{product.officialUrl ? (
								<OutboundLink
									href={product.officialUrl}
									section={sectionSlug}
									productSlug={product.slug}
									providerName={product.provider.name}
								/>
							) : null}
						</div>
					</li>
				))}
			</ul>
		</>
	);
}

/**
 * The section's survey and results (PRP-0002.p3 T21–T22). The server renders
 * the whole list in the default order, so readers without JavaScript and
 * crawlers see every product; answers only re-sort and label that list in the
 * browser. Answers saved by the home finder are picked up on arrival, so the
 * reader lands on results (ADR-0022). Nothing leaves the browser (AC6).
 */
export function ComparisonTool({ sectionSlug, sectionName, kind, products }: ComparisonToolProps) {
	const id = useId();
	const stored = useSyncExternalStore(
		subscribe,
		() => storedAnswers(sectionSlug),
		() => null,
	);
	const [local, setLocal] = useState<Local | null>(null);
	const current: Local =
		local ??
		(stored
			? { answers: parseAnswers(stored), answered: true }
			: { answers: {}, answered: false });
	const answers = completeAnswers(current.answers);
	const { fitting, others } = evaluateProducts(products, kind, current.answers);
	const shown = current.answered
		? fitting
		: products.map((product) => ({ product, principal: null, installment: null, reasons: [] }));

	function update(patch: LoanAnswers) {
		const next = { ...answers, ...patch };
		setLocal({ answers: next, answered: current.answered });
		if (current.answered) {
			saveAnswers(sectionSlug, next);
		}
	}

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		saveAnswers(sectionSlug, answers);
		setLocal({ answers, answered: true });
		document.getElementById(`${id}-hasil`)?.focus();
	}

	function reset() {
		clearAnswers(sectionSlug);
		setLocal({ answers: {}, answered: false });
	}

	const principal =
		kind === 'car'
			? Math.round(answers.price * (1 - answers.downPayment / 100))
			: answers.amount;

	return (
		<div className={styles.root}>
			<form className={styles.survey} onSubmit={onSubmit} aria-labelledby={`${id}-judul`}>
				<h2 id={`${id}-judul`} className={styles.surveyTitle}>
					Kebutuhan Anda
				</h2>
				<div className={styles.fields}>
					{kind === 'car' ? (
						<>
							<Select
								label="Harga mobil"
								value={answers.price}
								options={CAR_PRICES.map(rupiahOption)}
								onChange={(price) => update({ price })}
							/>
							<label className={styles.field}>
								<span className={styles.label}>Uang muka (%)</span>
								<input
									className={styles.control}
									type="number"
									inputMode="numeric"
									min={0}
									max={90}
									step={5}
									value={answers.downPayment}
									onChange={(event) =>
										update({
											downPayment: Math.min(
												90,
												Math.max(0, Number(event.target.value) || 0),
											),
										})
									}
								/>
							</label>
						</>
					) : null}
					{kind === 'collateral' ? (
						<>
							<Select
								label="Taksiran nilai kendaraan"
								value={answers.vehicleValue}
								options={VEHICLE_VALUES.map(rupiahOption)}
								onChange={(vehicleValue) => update({ vehicleValue })}
							/>
							<Select
								label="Jumlah pinjaman"
								value={answers.amount}
								options={LOAN_AMOUNTS.map(rupiahOption)}
								onChange={(amount) => update({ amount })}
							/>
						</>
					) : null}
					{kind !== 'income' ? (
						<Select
							label="Tenor"
							value={answers.tenor}
							options={TENORS.map((months) => ({
								value: months,
								label: `${months} bulan`,
							}))}
							onChange={(tenor) => update({ tenor })}
						/>
					) : null}
					<Select
						label="Penghasilan bersih per bulan"
						value={answers.income}
						options={INCOMES}
						onChange={(income) => update({ income })}
					/>
				</div>
				{kind !== 'income' ? (
					<p className={styles.principal}>
						Pokok pinjaman: <strong>{formatRupiah(principal)}</strong>
					</p>
				) : null}
				<div className={styles.actions}>
					<button type="submit" className="button">
						{current.answered ? 'Perbarui hasil' : 'Bandingkan'}
					</button>
					{current.answered ? (
						<button type="button" className={styles.reset} onClick={reset}>
							Hapus jawaban
						</button>
					) : null}
				</div>
				<p className={styles.privacy}>
					Jawaban hanya disimpan di peramban Anda selama sesi ini.
				</p>
			</form>

			<section className={styles.results} aria-labelledby={`${id}-hasil`}>
				<h2 id={`${id}-hasil`} className={styles.resultsTitle} tabIndex={-1}>
					{current.answered ? 'Hasil perbandingan' : `Semua produk ${sectionName}`}
				</h2>
				<p className={styles.count} role="status">
					{current.answered
						? `${fitting.length} dari ${products.length} produk sesuai dengan jawaban Anda, diurutkan dari estimasi cicilan terendah.`
						: `${products.length} produk, diurutkan menurut nama penyedia. Isi kebutuhan Anda untuk melihat estimasi cicilan.`}
				</p>
				{shown.length > 0 ? (
					<Rows
						results={shown}
						kind={kind}
						sectionSlug={sectionSlug}
						answered={current.answered}
						caption={`Perbandingan ${sectionName}`}
					/>
				) : (
					<p className={styles.empty}>
						Belum ada produk yang sesuai. Coba ubah uang muka, tenor, atau jumlah
						pinjaman.
					</p>
				)}
				{current.answered && others.length > 0 ? (
					<details className={styles.others}>
						<summary>Produk lain ({others.length})</summary>
						<p className={styles.count}>
							Produk ini tidak sesuai dengan jawaban Anda; alasannya tertulis di bawah
							nama produk.
						</p>
						<Rows
							results={others}
							kind={kind}
							sectionSlug={sectionSlug}
							answered={current.answered}
							caption={`Produk ${sectionName} lainnya`}
						/>
					</details>
				) : null}
			</section>
		</div>
	);
}
