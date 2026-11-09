import { NextResponse, type NextRequest } from 'next/server';

import { env } from '@/lib/env';
import {
	hasValidBasicAuth,
	isStagingAuthEnabled,
	isStagingAuthExempt,
	stagingAuthChallengeHeaders,
} from '@/lib/staging-auth';

const STAGING_AUTH_ON = isStagingAuthEnabled({
	siteEnv: env.siteEnv,
	user: env.stagingBasicAuth.user,
	password: env.stagingBasicAuth.password,
});

/**
 * Runs before routes render:
 * 0. staging basic auth, first, so a 401 reveals nothing, not even a redirect
 *    target (REQ-INFRA-006; off unless SITE_ENV=staging with both credentials);
 * 1. `/…/halaman/1` → its base URL (REQ-SEO-006);
 * 2. `X-Robots-Tag: noindex, nofollow` outside production (REQ-SEO-012).
 *
 * Slug-change redirects (REQ-SEO-015) came from the CMS; with the content in
 * src/data, a renamed slug gets a `redirects()` entry in next.config.ts.
 */
export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (
		STAGING_AUTH_ON &&
		!isStagingAuthExempt(pathname) &&
		!hasValidBasicAuth(
			request.headers.get('authorization'),
			env.stagingBasicAuth.user,
			env.stagingBasicAuth.password,
		)
	) {
		return new NextResponse('Autentikasi diperlukan.', {
			status: 401,
			headers: stagingAuthChallengeHeaders(),
		});
	}

	const firstPage = pathname.match(/^(.*)\/halaman\/1\/?$/);
	if (firstPage) {
		return NextResponse.redirect(new URL(firstPage[1] || '/', request.url), 301);
	}

	const response = NextResponse.next();
	if (env.siteEnv !== 'production') {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	}
	return response;
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
