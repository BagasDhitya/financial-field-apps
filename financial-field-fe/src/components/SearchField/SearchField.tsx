import { Icon } from '../Icon/Icon';

import styles from './SearchField.module.css';

export type SearchFieldProps = {
	variant?: 'compact' | 'full';
	defaultValue?: string;
	id?: string;
};

/**
 * A plain GET form to /cari: works without JavaScript (REQ-SRCH-001).
 * Length limits mirror the server-side validation.
 */
export function SearchField({
	variant = 'compact',
	defaultValue = '',
	id = 'cari-kata',
}: SearchFieldProps) {
	return (
		<form
			action="/cari"
			method="get"
			role="search"
			className={`${styles.root} ${styles[variant]}`}
		>
			<label htmlFor={id} className={variant === 'full' ? styles.label : 'visually-hidden'}>
				Cari artikel
			</label>
			<div className={styles.row}>
				<input
					id={id}
					name="q"
					type="search"
					defaultValue={defaultValue}
					minLength={2}
					maxLength={100}
					required
					placeholder="Cari topik atau artikel"
					className={styles.input}
					autoComplete="off"
				/>
				<button type="submit" className={styles.submit}>
					<Icon name="search" />
					<span className="visually-hidden">Cari</span>
				</button>
			</div>
		</form>
	);
}
