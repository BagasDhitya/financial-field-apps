import type { DialogueTurn } from '@/types';

import { CmsImage } from '../CmsImage/CmsImage';

import styles from './InterviewDialogue.module.css';

export type InterviewDialogueProps = {
	turns: DialogueTurn[];
};

/** Up to two letters: the first and last word of the name ("Narasumber Contoh Satu" → "NS"). */
function initials(name: string): string {
	const words = name.split(/\s+/).filter(Boolean);
	const first = words[0];
	if (!first) {
		return '?';
	}
	const last = words.length > 1 ? (words[words.length - 1] ?? '') : '';
	return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

/**
 * An interview's turns as speech bubbles (CMS-31 `interview_dialogues`,
 * REQ-ART-013): `left` in soft pink, `right` in soft orange, square bubbles
 * with a pointer toward a square avatar. Each bubble names its speaker (and
 * role) in text, so the side and colour are never the only cue. Renders
 * nothing without turns.
 */
export function InterviewDialogue({ turns }: InterviewDialogueProps) {
	if (turns.length === 0) {
		return null;
	}
	return (
		<div className={styles.dialogue}>
			{turns.map((turn, index) => (
				<div
					key={index}
					className={`${styles.turn} ${styles[turn.position]}`}
					data-position={turn.position}
				>
					<span className={styles.avatar} aria-hidden="true">
						{turn.avatar ? (
							<CmsImage image={turn.avatar} sizes="48px" ratio="1/1" decorative />
						) : (
							<span className={styles.initials}>{initials(turn.speakerName)}</span>
						)}
					</span>
					<div className={styles.bubble}>
						<p className={styles.speaker}>
							<strong>{turn.speakerName}</strong>
							{turn.speakerRole ? (
								<>
									<span className="visually-hidden">, </span>
									<span className={`type-label ${styles.role}`}>
										{turn.speakerRole}
									</span>
								</>
							) : null}
						</p>
						{turn.paragraphs.map((paragraph, part) => (
							<p key={part}>{paragraph}</p>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
