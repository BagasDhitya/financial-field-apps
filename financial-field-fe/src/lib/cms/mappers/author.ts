import type { Author, AuthorSummary } from '@/types';

import type { StrapiAuthor } from '../strapi-types';

import { mapMedia } from './media';
import { mapSeo } from './seo';

function toStringList(value: unknown): string[] {
	if (Array.isArray(value)) {
		return value.filter(
			(item): item is string => typeof item === 'string' && item.trim() !== '',
		);
	}
	if (typeof value === 'string') {
		return value
			.split(',')
			.map((item) => item.trim())
			.filter(Boolean);
	}
	return [];
}

/**
 * Byline-sized author. Blank credentials become null, so the byline leaves them
 * out.
 */
export function mapAuthorSummary(entry: StrapiAuthor): AuthorSummary {
	return {
		id: entry.documentId,
		slug: entry.slug ?? '',
		fullName: entry.full_name ?? '',
		roleTitle: entry.role_title ?? null,
		credentials: entry.credentials?.trim() || null,
		avatar: mapMedia(entry.avatar),
	};
}

/**
 * Profile-page author. `sameAs` keeps only http(s) links; `expertise` accepts a
 * list or a comma-separated string.
 */
export function mapAuthor(entry: StrapiAuthor): Author {
	return {
		...mapAuthorSummary(entry),
		bio: entry.bio ?? null,
		sameAs: (entry.same_as ?? [])
			.map((link) => link.url?.trim() ?? '')
			.filter((url) => url.startsWith('https://') || url.startsWith('http://')),
		expertise: toStringList(entry.expertise),
		seo: mapSeo(entry.seo),
	};
}
