import type { ReactNode } from 'react';

import styles from './GoldenSplit.module.css';

export type GoldenSplitProps = {
	main: ReactNode;
	rail: ReactNode;
	railLabel?: string;
};

/** Main column and rail in a 1.618 : 1 split from 1024 px (I6). */
export function GoldenSplit({ main, rail, railLabel }: GoldenSplitProps) {
	return (
		<div className={styles.root}>
			<div className={styles.main}>{main}</div>
			<aside className={styles.rail} aria-label={railLabel}>
				{rail}
			</aside>
		</div>
	);
}
