import { Icon } from '../Icon/Icon';

import styles from './VerifiedMark.module.css';

/**
 * "Terverifikasi" on a card or river row: a reviewer (peninjau) checked the
 * article (ADR-0022, REQ-ART-014). Visible text, so screen readers hear it.
 */
export function VerifiedMark() {
	return (
		<span className={styles.mark}>
			<Icon name="verified" size={16} />
			Terverifikasi
		</span>
	);
}
