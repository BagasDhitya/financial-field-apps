import type { Sponsor } from '@/types';

import styles from './SponsorDisclosure.module.css';

export type SponsorDisclosureProps = {
	sponsor: Sponsor | null;
	/** Site Settings default text, used when the article has none. */
	defaultText: string;
};

/** Shown above the body of every PR article (REQ-ART-003). */
export function SponsorDisclosure({ sponsor, defaultText }: SponsorDisclosureProps) {
	return (
		<aside className={styles.root} aria-label="Pengungkapan sponsor">
			<p className={`type-label ${styles.label}`}>Konten bersponsor</p>
			<p className={styles.text}>{sponsor?.disclosure ?? defaultText}</p>
			{sponsor ? (
				<p className={styles.sponsor}>
					Sponsor:{' '}
					{sponsor.url ? (
						<a href={sponsor.url} rel="sponsored noopener" target="_blank">
							{sponsor.name}
							<span className="visually-hidden"> (tab baru)</span>
						</a>
					) : (
						<strong>{sponsor.name}</strong>
					)}
				</p>
			) : null}
		</aside>
	);
}
