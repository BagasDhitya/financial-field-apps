import Link from 'next/link';

import styles from './Wordmark.module.css';

export type WordmarkProps = {
	variant?: 'stacked' | 'inline';
	tone?: 'ink' | 'paper';
};

/**
 * Text wordmark: "Financial Field" over "INDONESIA" (never "FFID" in public).
 * Replaced by the official logo once supplied (OQ-11).
 */
export function Wordmark({ variant = 'stacked', tone = 'ink' }: WordmarkProps) {
	return (
		<Link
			href="/"
			className={`${styles.root} ${styles[variant]} ${styles[tone]}`}
			aria-label="Financial Field Indonesia — Beranda"
		>
			<span className={styles.primary}>Financial Field</span>
			<span className={styles.secondary}>Indonesia</span>
		</Link>
	);
}
