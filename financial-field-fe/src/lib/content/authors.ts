import type { Author } from '@/types';

import { authors, findAuthor } from './store';

/** Author by slug, or null. */
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
	return findAuthor(slug) ?? null;
}

/** Every author slug, for the sitemap. */
export async function getAllAuthorSlugs(): Promise<string[]> {
	return authors.map((author) => author.slug);
}
