import type { MetadataRoute } from 'next';

import type { SiteEnv } from '@/lib/env';

import { AI_RETRIEVAL_AGENTS, AI_TRAINING_AGENTS, ALLOW_AI_TRAINING } from './crawlers';

/**
 * REQ-SEO-011/012: production allows everything except /api/; every other
 * environment disallows the whole site.
 */
export function buildRobots(
	siteEnv: SiteEnv,
	siteUrl: string,
	allowTraining: boolean = ALLOW_AI_TRAINING,
): MetadataRoute.Robots {
	if (siteEnv !== 'production') {
		return { rules: [{ userAgent: '*', disallow: '/' }] };
	}

	const open = { allow: '/', disallow: '/api/' };
	return {
		rules: [
			{ userAgent: '*', ...open },
			{ userAgent: [...AI_RETRIEVAL_AGENTS], ...open },
			allowTraining
				? { userAgent: [...AI_TRAINING_AGENTS], ...open }
				: { userAgent: [...AI_TRAINING_AGENTS], disallow: '/' },
		],
		sitemap: `${siteUrl.replace(/\/+$/, '')}/sitemap.xml`,
	};
}
