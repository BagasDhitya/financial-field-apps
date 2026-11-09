import type { Tag } from '@/types';

import { findTag } from './store';

/** REQ-SEO-008: a tag page is indexable only with at least this many articles. */
export const TAG_INDEX_THRESHOLD = 3;

/**
 * Thin tag pages stay noindex until they reach TAG_INDEX_THRESHOLD articles
 * (REQ-SEO-008).
 */
export function isIndexableTag(articleCount: number): boolean {
	return articleCount >= TAG_INDEX_THRESHOLD;
}

/** Tag by slug, or null. */
export async function getTagBySlug(slug: string): Promise<Tag | null> {
	return findTag(slug) ?? null;
}
