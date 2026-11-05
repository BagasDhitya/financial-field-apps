import { cacheTags } from '@/lib/cms/cache-tags';
import { hasCapability } from '@/lib/cms/capabilities';
import { cmsFetch, type CmsSingle } from '@/lib/cms/client';
import { endpoints } from '@/lib/cms/endpoints';
import { DEFAULT_SITE_SETTINGS, mapSiteSettings } from '@/lib/cms/mappers/site';
import type { StrapiSiteSettings } from '@/lib/cms/strapi-types';
import { log } from '@/lib/log';
import { REVALIDATE } from '@/lib/revalidate';
import type { SiteSettings } from '@/types';

/** Brand data (CMS-14) with code fallbacks; never throws (W2). */
export async function getSiteSettings(): Promise<SiteSettings> {
	if (!hasCapability('site-settings')) {
		return DEFAULT_SITE_SETTINGS;
	}
	try {
		const result = await cmsFetch<CmsSingle<StrapiSiteSettings>>({
			path: endpoints.siteSettings,
			query: {
				populate: { logo: true, default_og_image: true, social_links: true },
			},
			tags: [cacheTags.siteSettings()],
			revalidate: REVALIDATE.staticPage,
			kind: 'single',
		});
		return mapSiteSettings(result.data);
	} catch (error) {
		log.warn('content::getSiteSettings', 'using defaults', String(error));
		return DEFAULT_SITE_SETTINGS;
	}
}
