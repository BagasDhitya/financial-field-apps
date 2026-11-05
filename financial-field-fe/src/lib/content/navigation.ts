import { cacheTags } from '@/lib/cms/cache-tags';
import { CmsError, cmsFetch, type CmsSingle } from '@/lib/cms/client';
import { endpoints } from '@/lib/cms/endpoints';
import { mapArticleSummary } from '@/lib/cms/mappers/article';
import { mapNavigation } from '@/lib/cms/mappers/navigation';
import { articleSummaryQuery } from '@/lib/cms/queries/articles';
import type { StrapiNavigation } from '@/lib/cms/strapi-types';
import { log } from '@/lib/log';
import { REVALIDATE } from '@/lib/revalidate';
import type { SiteNavigation } from '@/types';

const emptyNavigation: SiteNavigation = {
	menuItems: [],
	featuredArticles: [],
};

/** Optional data: any CMS failure degrades to an empty navigation (W2). */
export async function getSiteNavigation(): Promise<SiteNavigation> {
	try {
		const result = await cmsFetch<CmsSingle<StrapiNavigation>>({
			path: endpoints.navigation,
			query: {
				populate: {
					menu_item: { populate: { category_ref: true } },
					featured_articles: articleSummaryQuery(),
				},
			},
			tags: [cacheTags.navigation()],
			revalidate: REVALIDATE.home,
			kind: 'single',
		});

		if (!result.data) {
			return emptyNavigation;
		}

		return mapNavigation(
			result.data,
			(result.data.featured_articles ?? []).map(mapArticleSummary),
		);
	} catch (error) {
		if (error instanceof CmsError) {
			log.warn('content::getSiteNavigation', `CMS ${error.status}`);
			return emptyNavigation;
		}
		throw error;
	}
}
