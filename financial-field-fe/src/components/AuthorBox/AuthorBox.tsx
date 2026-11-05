import Link from 'next/link';

import { routes } from '@/lib/routes';
import type { AuthorSummary } from '@/types';

import { CmsImage } from '../CmsImage/CmsImage';

import styles from './AuthorBox.module.css';

export type AuthorBoxProps = {
	person: AuthorSummary;
	role: 'Penulis' | 'Peninjau';
};

/** End-of-article box linking to the author page (REQ-GEO-003). */
export function AuthorBox({ person, role }: AuthorBoxProps) {
	return (
		<div className={styles.root}>
			{person.avatar ? (
				<span className={styles.avatar}>
					<CmsImage image={person.avatar} sizes="72px" ratio="1/1" decorative />
				</span>
			) : null}
			<div className={styles.text}>
				<p className={`type-label ${styles.role}`}>{role}</p>
				<p className={styles.name}>
					<Link href={routes.author(person.slug)}>{person.fullName}</Link>
					{person.credentials ? <span>, {person.credentials}</span> : null}
				</p>
				{person.roleTitle ? <p className="type-meta">{person.roleTitle}</p> : null}
			</div>
		</div>
	);
}
