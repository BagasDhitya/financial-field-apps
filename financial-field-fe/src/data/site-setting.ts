import type { SiteSettingEntry } from './types';

/**
 * Brand and organisation data (planned CMS-14). The site name stays in code
 * (REQ-CMS-005, REQ-GEO-004); the contact address and social link are
 * placeholders.
 */
export const SITE_SETTING: SiteSettingEntry = {
	tagline: 'Artikel dan panduan keuangan pribadi',
	description:
		'Financial Field Indonesia menyajikan artikel dan panduan keuangan pribadi untuk pembaca di Indonesia.',
	contact_email: 'redaksi@example.org',
	default_pr_disclosure: 'Artikel ini adalah konten bersponsor.',
	social_links: [{ platform: 'Instagram', url: 'https://example.org/sosial/instagram' }],
};
