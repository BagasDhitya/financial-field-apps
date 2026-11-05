import Link from 'next/link';

import { routes } from '@/lib/routes';
import type { TagSummary } from '@/types';

import styles from './TagList.module.css';

export type TagListProps = { tags: TagSummary[]; label?: string };

/** Sharp bordered chips linking to tag pages. */
export function TagList({ tags, label = 'Topik' }: TagListProps) {
	if (tags.length === 0) {
		return null;
	}
	return (
		<div className={styles.root}>
			<p className={`type-label ${styles.label}`}>{label}</p>
			<ul className={styles.list}>
				{tags.map((tag) => (
					<li key={tag.id}>
						<Link href={routes.tag(tag.slug)} className={styles.chip}>
							{tag.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
