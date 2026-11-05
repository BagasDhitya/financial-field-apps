import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

import { routes } from '@/lib/routes';
import { isValidSlug } from '@/lib/security';

/** Leaves preview and returns to the published article (or home). */
export async function GET(request: Request) {
	const slug = new URL(request.url).searchParams.get('slug');
	const draft = await draftMode();
	draft.disable();
	redirect(isValidSlug(slug) ? routes.article(slug) : routes.home());
}
