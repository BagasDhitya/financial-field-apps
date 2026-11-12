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

/**
 * "Wawancara" with a speech-bubble icon, in a pink outline (ADR-0020): an
 * interview article. Hidden from screen readers: the title says it (or the
 * title link adds "(wawancara)").
 */
export function InterviewLabel() {
	return (
		<span className={`type-label ${styles.interview}`} aria-hidden="true">
			<Icon name="chat" size={16} />
			Wawancara
		</span>
	);
}

/** True when an interview's title doesn't already say so (screen readers need "(wawancara)"). */
export function needsInterviewHint(title: string): boolean {
	return !/^\s*wawancara\b/i.test(title);
}

export type KickerProps = {
	category: CategorySummary | null;
	isPr?: boolean;
	/** Show the Video label (cards without a still). */
	isVideo?: boolean;
	/** Show the Wawancara label (article header, cards without an image). */
	isInterview?: boolean;
	/** Plain text instead of a link (inside a card whose title is the link). */
	asLink?: boolean;
};

/** Category kicker above a headline, with the PR, Video and Wawancara labels when they apply. */
export function Kicker({
	category,
	isPr = false,
	isVideo = false,
	isInterview = false,
	asLink = true,
}: KickerProps) {
	if (!category && !isPr && !isVideo && !isInterview) {
		return null;
	}
	return (
		<p className={styles.root}>
			{isPr ? <PrLabel /> : null}
			{isVideo ? <VideoLabel /> : null}
			{isInterview ? <InterviewLabel /> : null}
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
