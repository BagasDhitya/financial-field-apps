import type { ArticleSummary, SiteNavigation } from '@/types';

import type { StrapiNavigation } from '../strapi-types';

import { mapCategorySummary } from './category';

/**
 * Header navigation. Featured articles are fetched separately and passed in.
 */
export function mapNavigation(
	entry: StrapiNavigation,
	featuredArticles: ArticleSummary[],
): SiteNavigation {
	return {
		menuItems: (entry.menu_item ?? []).map((item) => ({
			label: item.label ?? '',
			url: item.url ?? null,
			categories: (item.category_ref ?? [])
				.filter((category) => category.slug)
				.map(mapCategorySummary),
		})),
		featuredArticles,
	};
}
