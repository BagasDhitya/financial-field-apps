import { FEATURED_ARTICLES } from '@/data/navigation';
import type { SiteNavigation } from '@/types';

import { findArticle, toSummary } from './store';

const featuredArticles = FEATURED_ARTICLES.map((slug) => {
	const article = findArticle(slug);
	if (!article) {
		throw new Error(`src/data: featured article "${slug}" does not exist`);
	}
	return toSummary(article);
});

/** Featured home stories in order, lead first. The menu is the topic tree. */
export async function getSiteNavigation(): Promise<SiteNavigation> {
	return { menuItems: [], featuredArticles };
}
