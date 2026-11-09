import qs from 'qs';

import { env } from '@/lib/env';

import { localCmsResponse } from './local/handler';

type CmsRequest = {
	path: string;
	query?: Record<string, unknown>;
	tags: string[];
	revalidate: number | false;
};

export type CmsPagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
};

export type CmsCollection<T> = {
	data: T[];
	meta: { pagination: CmsPagination };
};

export type CmsSingle<T> = { data: T | null };

/**
 * A non-2xx Strapi response: the only error src/lib/cms throws. Routes decide
 * between notFound() and the error boundary (CTX-conventions §6).
 */
export class CmsError extends Error {
	readonly status: number;
	readonly path: string;

	constructor(status: number, path: string, body: string) {
		super(`Strapi ${status} on ${path}: ${body.slice(0, 300)}`);
		this.name = 'CmsError';
		this.status = status;
		this.path = path;
	}
}

/**
 * True while no `CMS_URL` is set: requests go to the local API over the
 * hardcoded content (src/lib/cms/local) instead of a Strapi server.
 */
export const usesLocalCms = env.cmsUrl === '';

function authorization(): Record<string, string> {
	return env.cmsApiToken ? { Authorization: `Bearer ${env.cmsApiToken}` } : {};
}

/**
 * The only place the app talks to the CMS. Owns auth, cache tags,
 * revalidation and the error shape, so no caller has to think about any of
 * them. Both sources get the same query string: the local API parses it
 * exactly as its HTTP route does, so switching to Strapi changes the
 * transport, not the answers.
 */
export async function cmsFetch<T>({ path, query, tags, revalidate }: CmsRequest): Promise<T> {
	const search = qs.stringify(query ?? {}, { encodeValuesOnly: true, addQueryPrefix: true });

	if (usesLocalCms) {
		const { status, body } = localCmsResponse(path, search);
		if (status !== 200) {
			throw new CmsError(status, path, JSON.stringify(body));
		}
		// A private copy, as a fetch would give: callers can't change the store.
		return structuredClone(body) as T;
	}

	const response = await fetch(`${env.cmsUrl}/api${path}${search}`, {
		headers: authorization(),
		next: { tags, revalidate },
	});
	if (!response.ok) {
		throw new CmsError(response.status, path, await response.text());
	}
	return (await response.json()) as T;
}
