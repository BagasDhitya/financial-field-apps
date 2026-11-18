import type { AuthorSummary } from '@/types';

import { CmsImage } from '../CmsImage/CmsImage';

import styles from './PersonMark.module.css';

export type PersonMarkProps = {
	person: AuthorSummary;
	/** Rendered width in px; the box is square (I1). */
	size: 40 | 72 | 144;
	preload?: boolean;
};

/** The first letters of the first two words: "Tim Redaksi Financial Field" → "TR". */
export function initialsOf(name: string): string {
	const words = name.split(/\s+/).filter(Boolean);
	return `${words[0]?.[0] ?? ''}${words[1]?.[0] ?? ''}`.toUpperCase();
}

/** A person's square photo, or their initials when the profile has none. Decorative. */
export function PersonMark({ person, size, preload = false }: PersonMarkProps) {
	return (
		<span className={styles.root} style={{ width: `${size / 16}rem` }} aria-hidden="true">
			{person.avatar ? (
				<CmsImage
					image={person.avatar}
					sizes={`${size}px`}
					ratio="1/1"
					preload={preload}
					decorative
				/>
			) : (
				<span className={styles.initials} data-size={size}>
					{initialsOf(person.fullName)}
				</span>
			)}
		</span>
	);
}
