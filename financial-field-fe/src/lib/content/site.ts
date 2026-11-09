import { SITE_SETTINGS } from '@/data/site';
import type { SiteSettings } from '@/types';

/** Brand and organisation data (src/data/site.ts). */
export async function getSiteSettings(): Promise<SiteSettings> {
	return SITE_SETTINGS;
}
