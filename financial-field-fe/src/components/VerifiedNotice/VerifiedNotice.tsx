import Link from 'next/link';

import { routes } from '@/lib/routes';
import type { AuthorSummary } from '@/types';

import { DateTime } from '../DateTime/DateTime';
import { Icon } from '../Icon/Icon';

import styles from './VerifiedNotice.module.css';

export type VerifiedNoticeProps = {
	reviewer: AuthorSummary;
	/** When the check was recorded (CMS-09); left out when the CMS has no date. */
	reviewedAt: string | null;
};

/**
 * The notice at the top of a verified article (ADR-0022, REQ-ART-014): who
 * checked it, when, and where the editorial policy explains the check. Only
 * articles with a reviewer get it; the rest carry no claim at all.
 */
export function VerifiedNotice({ reviewer, reviewedAt }: VerifiedNoticeProps) {
	return (
		<aside className={styles.root} aria-labelledby="terverifikasi">
			<p id="terverifikasi" className={styles.title}>
				<Icon name="verified" size={20} />
				Artikel terverifikasi
			</p>
			<p className={styles.text}>
				Isi artikel ini telah diperiksa oleh{' '}
				<Link href={routes.reviewer(reviewer.slug)} className={styles.name}>
					{reviewer.fullName}
				</Link>
				{reviewer.credentials ? `, ${reviewer.credentials}` : ''}
				{reviewer.roleTitle ? ` (${reviewer.roleTitle.toLowerCase()})` : ''}
				{reviewedAt ? (
					<>
						{' '}
						pada <DateTime iso={reviewedAt} />
					</>
				) : null}
				. Cara kami memeriksa artikel dijelaskan dalam{' '}
				<Link href={routes.about('kebijakan-editorial')}>Kebijakan Editorial</Link>.
			</p>
		</aside>
	);
}
