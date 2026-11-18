import Link from 'next/link';

import { routes } from '@/lib/routes';
import type { AuthorSummary } from '@/types';

import { PersonMark } from '../PersonMark/PersonMark';

import styles from './ReviewerList.module.css';

export type ReviewerListProps = { reviewers: AuthorSummary[] };

/** The reviewers on the Redaksi page, each linking to their profile (ADR-0022). */
export function ReviewerList({ reviewers }: ReviewerListProps) {
	return (
		<ul className={styles.list}>
			{reviewers.map((reviewer) => (
				<li key={reviewer.id} className={styles.item}>
					<PersonMark person={reviewer} size={72} />
					<div className={styles.text}>
						<Link href={routes.reviewer(reviewer.slug)} className={styles.name}>
							{reviewer.fullName}
							{reviewer.credentials ? `, ${reviewer.credentials}` : ''}
						</Link>
						{reviewer.roleTitle ? (
							<span className="type-meta">{reviewer.roleTitle}</span>
						) : null}
					</div>
				</li>
			))}
		</ul>
	);
}
