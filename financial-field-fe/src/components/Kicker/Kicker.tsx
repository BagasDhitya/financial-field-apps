import Link from 'next/link';

import { routes } from '@/lib/routes';
import type { CategorySummary } from '@/types';

import { Icon } from '../Icon/Icon';

import styles from './Kicker.module.css';

export type PrLabelProps = { size?: 'small' | 'large' };

/** "PR" in an ink box; the hidden text explains it (REQ-ART-003). */
export function PrLabel({ size = 'small' }: PrLabelProps) {
	return (
		<span className={`type-label ${styles.pr} ${styles[size]}`}>
			PR<span className="visually-hidden"> (konten bersponsor)</span>
		</span>
	);
}

/**
 * "Video" in an ink outline, where no still shows that an article has a video
 * (text-only cards, the river). Hidden from screen readers: the title link
 * says "(video)" itself.
 */
export function VideoLabel() {
	return (
		<span className={`type-label ${styles.video}`} aria-hidden="true">
			<Icon name="play" size={16} />
			Video
		</span>
	);
}

export type KickerProps = {
	category: CategorySummary | null;
	isPr?: boolean;
	/** Show the Video label (cards without a still). */
	isVideo?: boolean;
	/** Plain text instead of a link (inside a card whose title is the link). */
	asLink?: boolean;
};

/** Category kicker above a headline, with the PR and Video labels when they apply. */
export function Kicker({ category, isPr = false, isVideo = false, asLink = true }: KickerProps) {
	if (!category && !isPr && !isVideo) {
		return null;
	}
	return (
		<p className={styles.root}>
			{isPr ? <PrLabel /> : null}
			{isVideo ? <VideoLabel /> : null}
			{category ? (
				asLink ? (
					<Link href={routes.category(category)} className={`type-kicker ${styles.link}`}>
						{category.name}
					</Link>
				) : (
					<span className={`type-kicker ${styles.text}`}>{category.name}</span>
				)
			) : null}
		</p>
	);
}
