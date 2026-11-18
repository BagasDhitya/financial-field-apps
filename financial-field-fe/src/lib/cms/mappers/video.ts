import { log } from '@/lib/log';
import { parseIsoDuration, parseYouTubeId } from '@/lib/video';
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
	if (!entry?.embedUrl) {
		return null;
	}
	const id = parseYouTubeId(entry.embedUrl);
	if (!id) {
		log.warn('cms::mapVideoRef', 'video dropped: not a YouTube link', {
			length: entry.embedUrl.length,
		});
		return null;
	}
	return { provider: 'youtube', id };
}

/**
 * The article's video with its credit, or null when there is none (W2). An
 * empty title falls back to the article's title, as the CMS developer asked;
 * the duration arrives as ISO 8601 and is kept in seconds.
 */
export function mapVideo(
	entry: StrapiVideo | null | undefined,
	articleTitle: string,
): ArticleVideo | null {
	const ref = mapVideoRef(entry);
	const title = nonEmpty(entry?.title) ?? nonEmpty(articleTitle);
	if (!ref || !title) {
		return null;
	}
	return {
		...ref,
		title,
		channelName: nonEmpty(entry?.channel),
		uploadedAt: nonEmpty(entry?.uploadedAt),
		durationSeconds: parseIsoDuration(entry?.duration),
		caption: nonEmpty(entry?.caption),
	};
}
