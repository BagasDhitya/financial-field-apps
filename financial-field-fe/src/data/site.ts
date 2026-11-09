import type { SiteSettings } from '@/types';

/**
 * Brand and organisation data. The site name is fixed (REQ-CMS-005,
 * REQ-GEO-004); the contact address and social link are placeholders.
 */
export const SITE_SETTINGS: SiteSettings = {
	siteName: 'Financial Field Indonesia',
	tagline: 'Artikel dan panduan keuangan pribadi',
	description:
		'Financial Field Indonesia menyajikan artikel dan panduan keuangan pribadi untuk pembaca di Indonesia.',
	logo: null,
	defaultOgImage: null,
	socialLinks: [{ platform: 'Instagram', url: 'https://example.org/sosial/instagram' }],
	contactEmail: 'redaksi@example.org',
	defaultPrDisclosure: 'Artikel ini adalah konten bersponsor.',
};
