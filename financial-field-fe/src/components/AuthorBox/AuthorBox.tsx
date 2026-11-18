import Link from 'next/link';

import { routes } from '@/lib/routes';
import type { AuthorSummary } from '@/types';

import { PersonMark } from '../PersonMark/PersonMark';

import styles from './AuthorBox.module.css';

export type AuthorBoxProps = {
	person: AuthorSummary;
	role: 'Penulis' | 'Peninjau';
};

/**
 * End-of-article box (REQ-GEO-003, ADR-0022). The reviewer's box links to
 * their profile; the writer is the team, so its box has no link.
 */
export function AuthorBox({ person, role }: AuthorBoxProps) {
	const href = role === 'Peninjau' ? routes.reviewer(person.slug) : null;
	return (
		<div className={styles.root}>
			<PersonMark person={person} size={72} />
			<div className={styles.text}>
				<p className={`type-label ${styles.role}`}>{role}</p>
				<p className={styles.name}>
					{href ? <Link href={href}>{person.fullName}</Link> : person.fullName}
					{person.credentials ? <span>, {person.credentials}</span> : null}
				</p>
				{person.roleTitle ? <p className="type-meta">{person.roleTitle}</p> : null}
				{href ? (
					<p className={styles.more}>
						<Link href={href}>Lihat profil peninjau</Link>
					</p>
				) : null}
			</div>
		</div>
	);
}
