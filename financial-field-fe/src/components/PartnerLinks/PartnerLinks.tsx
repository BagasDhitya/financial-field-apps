import { addUtm } from '@/lib/outbound';
import type { PartnerLink } from '@/types';

import { AdLabel } from '../Kicker/Kicker';

import styles from './PartnerLinks.module.css';

export type PartnerLinksProps = {
	links: readonly PartnerLink[];
	/** The article it sits under; becomes `utm_content`. */
	articleSlug: string;
};

/**
 * "Dari mitra media" (ADR-0024, placement `article-partner-links`): paid links
 * to partner news sites, labelled "Iklan", each `rel="sponsored noopener"` in
 * a new tab with UTM values. Rendered only with FEATURE_ADS.
 */
export function PartnerLinks({ links, articleSlug }: PartnerLinksProps) {
	if (links.length === 0) {
		return null;
	}
	return (
		<section
			className={styles.root}
			aria-labelledby="mitra-media"
			data-ad-placement="article-partner-links"
		>
			<div className={styles.head}>
				<h2 id="mitra-media" className={`type-label ${styles.title}`}>
					Dari mitra media
				</h2>
				<AdLabel />
			</div>
			<ul className={styles.list}>
				{links.map((link) => (
					<li key={link.url}>
						<a
							href={addUtm(link.url, 'mitra-media', articleSlug)}
							target="_blank"
							rel="sponsored noopener"
							className={styles.link}
						>
							<span className={`type-meta ${styles.outlet}`}>{link.outlet}</span>
							<span className={styles.headline}>{link.title}</span>
							<span className="visually-hidden"> (situs mitra, tab baru)</span>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
