import type { ProviderSummary } from '@/types';

import { CmsImage } from '../CmsImage/CmsImage';
import { initialsOf } from '../PersonMark/PersonMark';

import styles from './ProviderLogo.module.css';

export type ProviderLogoProps = {
	provider: ProviderSummary;
	size?: 'small' | 'large';
};

/** The provider's logo from the CMS, or its initials in a square (I1). Decorative. */
export function ProviderLogo({ provider, size = 'small' }: ProviderLogoProps) {
	return (
		<span className={`${styles.root} ${styles[size]}`} aria-hidden="true">
			{provider.logo ? (
				<CmsImage
					image={provider.logo}
					sizes={size === 'large' ? '96px' : '40px'}
					ratio="1/1"
					decorative
				/>
			) : (
				<span className={styles.initials}>{initialsOf(provider.name)}</span>
			)}
		</span>
	);
}
