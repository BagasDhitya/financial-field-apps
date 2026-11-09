import type { StaticPage } from '@/types';

import { findPage, pages } from './store';

/** True when the trust pages exist; gates trust-page links in JSON-LD. */
export function trustPagesEnabled(): boolean {
	return pages.length > 0;
}

/** Trust or legal page by slug, or null. */
export async function getStaticPage(slug: string): Promise<StaticPage | null> {
	return findPage(slug) ?? null;
}

/** Slug and update date of every static page, for the sitemap. */
export async function getStaticPageEntries(): Promise<
	{ slug: string; updatedAt: string | null }[]
> {
	return pages.map((page) => ({ slug: page.slug, updatedAt: page.updatedAt }));
}
