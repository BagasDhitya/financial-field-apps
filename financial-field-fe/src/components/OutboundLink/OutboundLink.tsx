import { withUtm } from '@/lib/outbound';

import { Icon } from '../Icon/Icon';

import styles from './OutboundLink.module.css';

export type OutboundLinkProps = {
	/** Already through the outbound guard (FinancialProduct.officialUrl). */
	href: string;
	section: string;
	productSlug: string;
	providerName: string;
	variant?: 'button' | 'text';
};

/**
 * "Kunjungi situs resmi" (PRP-0002.p3 §4.5, REQ-CMP-007): a new tab,
 * `rel="sponsored noopener"`, UTM values unless the CMS link has its own, and
 * a visible hint that it leaves for the provider. No "Ajukan" wording (OQ-30).
 */
export function OutboundLink({
	href,
	section,
	productSlug,
	providerName,
	variant = 'button',
}: OutboundLinkProps) {
	return (
		<a
			href={withUtm(href, section, productSlug)}
			target="_blank"
			rel="sponsored noopener"
			className={variant === 'button' ? `button ${styles.button}` : styles.text}
			data-outbound=""
		>
			Kunjungi situs resmi
			<Icon name="external" size={16} />
			<span className="visually-hidden"> {providerName} (situs penyedia, tab baru)</span>
		</a>
	);
}
