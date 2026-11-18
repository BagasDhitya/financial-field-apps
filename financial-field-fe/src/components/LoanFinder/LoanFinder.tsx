'use client';

import { useRouter } from 'next/navigation';
import { useId, useState, type FormEvent } from 'react';

import { saveAnswers } from '@/lib/comparison/answers';
import { CAR_PRICES, DEFAULTS, rupiahOption, TENORS } from '@/lib/comparison/options';

import { Icon } from '../Icon/Icon';

import styles from './LoanFinder.module.css';

export type LoanFinderProps = {
	/** The comparison section it opens, e.g. `kredit-mobil`. */
	sectionSlug: string;
	/** Its URL, from routes.comparisonSection. */
	href: string;
};

/**
 * The home page's main widget (ADR-0022): car price, down payment and tenor,
 * then "Mulai Bandingkan" opens the section's comparison with those answers
 * already filled in. The answers go to sessionStorage, never the URL
 * (REQ-PRIV-005): the fields have no `name`, so even without JavaScript the
 * form only navigates to the section page.
 */
export function LoanFinder({ sectionSlug, href }: LoanFinderProps) {
	const router = useRouter();
	const id = useId();
	const [price, setPrice] = useState(DEFAULTS.price);
	const [downPayment, setDownPayment] = useState(String(DEFAULTS.downPayment));
	const [tenor, setTenor] = useState(DEFAULTS.tenor);

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const percent = Math.min(90, Math.max(0, Number(downPayment) || 0));
		saveAnswers(sectionSlug, { price, downPayment: percent, tenor });
		router.push(href);
	}

	return (
		<section className={styles.root} aria-labelledby={`${id}-judul`}>
			<h2 id={`${id}-judul`} className={styles.title}>
				Cari Kredit Mobil Cocok
			</h2>
			<p className={styles.lead}>Bandingkan penawaran yang sesuai dengan kebutuhan Anda.</p>
			<form className={styles.form} action={href} onSubmit={onSubmit}>
				<label className={styles.field}>
					<span className={styles.label}>Harga Mobil</span>
					<select
						className={styles.control}
						value={price}
						onChange={(event) => setPrice(Number(event.target.value))}
					>
						{CAR_PRICES.map(rupiahOption).map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</label>
				<label className={styles.field}>
					<span className={styles.label}>Uang Muka (DP)</span>
					<span className={styles.suffixed}>
						<input
							className={styles.control}
							type="number"
							inputMode="numeric"
							min={0}
							max={90}
							step={5}
							value={downPayment}
							onChange={(event) => setDownPayment(event.target.value)}
						/>
						<span className={styles.suffix} aria-hidden="true">
							%
						</span>
					</span>
				</label>
				<label className={styles.field}>
					<span className={styles.label}>Tenor Kredit</span>
					<select
						className={styles.control}
						value={tenor}
						onChange={(event) => setTenor(Number(event.target.value))}
					>
						{TENORS.map((months) => (
							<option key={months} value={months}>
								{months} Bulan
							</option>
						))}
					</select>
				</label>
				<button
					type="submit"
					className={`button ${styles.submit}`}
					data-track="select_content"
					data-content-type="home_finder"
					data-item-id={sectionSlug}
				>
					Mulai Bandingkan
					<Icon name="arrow-right" size={20} />
				</button>
			</form>
		</section>
	);
}
