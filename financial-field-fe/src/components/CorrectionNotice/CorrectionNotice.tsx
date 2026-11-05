import type { Correction } from '@/types';

import { DateTime } from '../DateTime/DateTime';

import styles from './CorrectionNotice.module.css';

export type CorrectionNoticeProps = { corrections: Correction[] };

/** Dated "Koreksi" notices, newest first (REQ-ART-007). */
export function CorrectionNotice({ corrections }: CorrectionNoticeProps) {
	if (corrections.length === 0) {
		return null;
	}
	return (
		<section className={styles.root} aria-labelledby="koreksi">
			<h2 id="koreksi" className={`type-label ${styles.label}`}>
				Koreksi
			</h2>
			<ul className={styles.list}>
				{corrections.map((correction) => (
					<li key={`${correction.date ?? ''}-${correction.note}`}>
						{correction.date ? (
							<strong>
								<DateTime iso={correction.date} />:{' '}
							</strong>
						) : null}
						{correction.note}
					</li>
				))}
			</ul>
		</section>
	);
}
