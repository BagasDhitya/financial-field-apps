import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

import { env } from '@/lib/env';
import { routes } from '@/lib/routes';
import { isValidSlug, safeEqual } from '@/lib/security';

/**
 * Strapi preview entry: constant-time secret check, then draft mode and a
 * redirect to an internal article path only (REQ-SEC-003).
 */
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	if (!safeEqual(searchParams.get('secret'), env.previewSecret)) {
		return new Response('Invalid token', { status: 401 });
	}

	const slug = searchParams.get('slug');
	if (!isValidSlug(slug)) {
		return new Response('Invalid slug', { status: 400 });
	}

	const draft = await draftMode();
	draft.enable();
	redirect(routes.article(slug));
}
