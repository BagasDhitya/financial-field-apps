import { routes } from '@/lib/routes';
import type { SiteSettings } from '@/types';

import { schemaIds } from './ids';
import type { JsonLdNode } from './types';

type OrganizationInput = {
	origin: string;
	settings: SiteSettings;
	/** Trust pages exist (CMS-13); policy links are only emitted when they resolve. */
	trustPagesAvailable: boolean;
};

/** NewsMediaOrganization + WebSite, emitted on every page (SPC-seo §6). */
export function buildOrganization({
	origin,
	settings,
	trustPagesAvailable,
}: OrganizationInput): JsonLdNode {
	const base = origin.replace(/\/+$/, '');
	const policy = (slug: string) => `${base}${routes.about(slug)}`;

	return {
		'@type': 'NewsMediaOrganization',
		'@id': schemaIds.organization(origin),
		name: settings.siteName,
		url: `${base}/`,
		description: settings.description,
		...(settings.logo
			? {
					logo: {
						'@type': 'ImageObject',
						url: settings.logo.url,
						width: settings.logo.width ?? undefined,
						height: settings.logo.height ?? undefined,
					},
				}
			: {}),
		...(settings.socialLinks.length > 0
			? { sameAs: settings.socialLinks.map((link) => link.url) }
			: {}),
		...(trustPagesAvailable
			? {
					publishingPrinciples: policy('kebijakan-editorial'),
					correctionsPolicy: policy('koreksi-berita'),
					masthead: policy('redaksi'),
					ethicsPolicy: policy('kebijakan-editorial'),
				}
			: {}),
		...(settings.contactEmail
			? {
					contactPoint: {
						'@type': 'ContactPoint',
						contactType: 'editorial',
						email: settings.contactEmail,
						availableLanguage: 'id',
					},
				}
			: {}),
	};
}

/** WebSite node, published by the organisation (linked by @id). */
export function buildWebSite(origin: string, settings: SiteSettings): JsonLdNode {
	return {
		'@type': 'WebSite',
		'@id': schemaIds.website(origin),
		name: settings.siteName,
		url: `${origin.replace(/\/+$/, '')}/`,
		inLanguage: 'id-ID',
		publisher: { '@id': schemaIds.organization(origin) },
	};
}
