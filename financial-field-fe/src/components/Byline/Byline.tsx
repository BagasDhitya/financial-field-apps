import Link from 'next/link';

import { isLaterDayWib } from '@/lib/format';
import { routes } from '@/lib/routes';
import type { AuthorSummary } from '@/types';

import { DateTime } from '../DateTime/DateTime';
import { PersonMark } from '../PersonMark/PersonMark';

import styles from './Byline.module.css';

export type BylineProps = {
	author: AuthorSummary | null;
	reviewer: AuthorSummary | null;
	lastReviewedAt: string | null;
	publishedAt: string | null;
	contentUpdatedAt: string | null;
	readingMinutes: number;
};

/**
 * Writer team + reviewer + dates (REQ-ART-002, ADR-0022). The writer is the
 * team: its name is plain text, with no link and no photo. The reviewer links
 * to their profile. "Diperbarui" appears only a day or more after publication;
 * "Ditinjau" only when the CMS records the check's date.
 */
export function Byline({
	author,
	reviewer,
	lastReviewedAt,
	publishedAt,
	contentUpdatedAt,
	readingMinutes,
}: BylineProps) {
	const showUpdated = isLaterDayWib(publishedAt, contentUpdatedAt);
	return (
		<div className={styles.root}>
			<div className={styles.people}>
				{author ? (
					<p className={styles.line}>
						<span className={styles.role}>Ditulis oleh </span>
						<span className={styles.team}>{author.fullName}</span>
					</p>
				) : null}
				{reviewer ? (
					<div className={styles.person}>
						<PersonMark person={reviewer} size={40} />
						<p className={styles.line}>
							<span className={styles.role}>Ditinjau oleh </span>
							<Link href={routes.reviewer(reviewer.slug)} className={styles.name}>
								{reviewer.fullName}
							</Link>
							{reviewer.credentials ? <span>, {reviewer.credentials}</span> : null}
							{reviewer.roleTitle ? (
								<span className={styles.title}> · {reviewer.roleTitle}</span>
							) : null}
						</p>
					</div>
				) : null}
			</div>
			<p className={`type-meta ${styles.dates}`}>
				{publishedAt ? (
					<span>
						Terbit <DateTime iso={publishedAt} />
					</span>
				) : null}
				{showUpdated ? (
					<span>
						Diperbarui <DateTime iso={contentUpdatedAt} />
					</span>
				) : null}
				{reviewer && lastReviewedAt ? (
					<span>
						Ditinjau <DateTime iso={lastReviewedAt} />
					</span>
				) : null}
				<span>{readingMinutes} menit baca</span>
			</p>
		</div>
	);
}
