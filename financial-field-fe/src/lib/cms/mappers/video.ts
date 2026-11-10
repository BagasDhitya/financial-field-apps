import { log } from '@/lib/log';
import { parseYouTubeId } from '@/lib/video';
import type { ArticleVideo, VideoRef } from '@/types';

import type { StrapiVideo } from '../strapi-types';

function nonEmpty(value: string | null | undefined): string | null {
	const trimmed = value?.trim();
	return trimmed ? trimmed : null;
}

/**
 * The video's id, or null. A link that isn't YouTube is dropped and logged,
 * never embedded (REQ-SEC-010): only the parsed id reaches a URL.
 */
export function mapVideoRef(entry: StrapiVideo | null | undefined): VideoRef | null {
	if (!entry?.url) {
		return null;
	}
	const id = parseYouTubeId(entry.url);
	if (!id) {
		log.warn('cms::mapVideoRef', 'video dropped: not a YouTube link', {
			length: entry.url.length,
		});
		return null;
	}
	return { provider: 'youtube', id };
}

/** The article's video with its credit; null when there is none or no title (W2, W14). */
export function mapVideo(entry: StrapiVideo | null | undefined): ArticleVideo | null {
	const ref = mapVideoRef(entry);
	const title = nonEmpty(entry?.title);
	if (!ref || !title) {
		return null;
	}
	const seconds = entry?.duration_seconds;
	return {
		...ref,
		title,
		channelName: nonEmpty(entry?.channel_name),
		uploadedAt: entry?.uploaded_at ?? null,
		durationSeconds: typeof seconds === 'number' && seconds > 0 ? seconds : null,
		caption: nonEmpty(entry?.caption),
	};
}
