import { log } from '@/lib/log';
import { paragraphsOf } from '@/lib/text';
import type { DialogueTurn } from '@/types';

import type { StrapiChatBubble } from '../strapi-types';

import { mapMedia } from './media';

/**
 * Interview turns from `interview_dialogues` (CMS-31). A turn without a
 * speaker name or a message is dropped. A turn without a valid `position`
 * takes its speaker's earlier side, else the left for the first speaker and
 * the right for anyone else. Both are logged once per article, as counts (W3).
 */
export function mapDialogue(entries: StrapiChatBubble[] | null | undefined): DialogueTurn[] {
	const turns: DialogueTurn[] = [];
	const sides = new Map<string, DialogueTurn['position']>();
	let dropped = 0;
	let guessed = 0;
	for (const entry of entries ?? []) {
		const speakerName = entry.speaker_name?.trim() ?? '';
		const paragraphs = paragraphsOf(entry.message ?? '');
		if (!speakerName || paragraphs.length === 0) {
			dropped += 1;
			continue;
		}
		let position: DialogueTurn['position'] | null =
			entry.position === 'left' || entry.position === 'right' ? entry.position : null;
		if (!position) {
			guessed += 1;
			position = sides.get(speakerName) ?? (sides.size === 0 ? 'left' : 'right');
		}
		if (!sides.has(speakerName)) {
			sides.set(speakerName, position);
		}
		turns.push({
			speakerName,
			speakerRole: entry.speaker_role?.trim() || null,
			avatar: mapMedia(entry.speaker_avatar),
			paragraphs,
			position,
		});
	}
	if (dropped > 0 || guessed > 0) {
		log.warn('cms::mapDialogue', `turns dropped: ${dropped}, sides inferred: ${guessed}`);
	}
	return turns;
}
