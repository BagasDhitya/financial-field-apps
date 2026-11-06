import qs from 'qs';

import { env } from '@/lib/env';
import { log } from '@/lib/log';

type CmsRequest = {
	path: string;
	query?: Record<string, unknown>;
	tags: string[];
	revalidate: number | false;
	draft?: boolean;
	/**
	 * Shape returned when SKIP_CMS_FETCH is on (CI builds without Strapi), or
	 * when the CMS can't be reached during `next build` (REQ-INFRA-009).
	 */
	kind?: 'collection' | 'single';
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

const EMPTY_COLLECTION: CmsCollection<never> = {
	data: [],
	meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
};

function emptyResult<T>(kind: 'collection' | 'single'): T {
	return (kind === 'single' ? { data: null } : EMPTY_COLLECTION) as T;
}

/** The error name plus the system code (`ECONNREFUSED`, `ENOTFOUND`) when fetch has one. */
function describeFetchError(error: unknown): string {
	if (!(error instanceof Error)) {
		return 'unknown error';
	}
	const code = (error.cause as { code?: unknown } | undefined)?.code;
	return typeof code === 'string' ? `${error.name} (${code})` : error.name;
}

function authorization(draft: boolean): Record<string, string> {
	const token = draft ? env.cmsPreviewToken || env.cmsApiToken : env.cmsApiToken;
	return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * The only place the app talks to Strapi. Owns auth, cache tags, revalidation,
 * and error shape so no caller has to think about any of them.
 */
export async function cmsFetch<T>({
	path,
	query,
	tags,
	revalidate,
	draft = false,
	kind = 'collection',
}: CmsRequest): Promise<T> {
	if (env.skipCmsFetch) {
		return emptyResult<T>(kind);
	}

	const search = qs.stringify(
		{ ...query, ...(draft ? { status: 'draft' } : {}) },
		{ encodeValuesOnly: true, addQueryPrefix: true },
	);

	let response: Response;
	try {
		response = await fetch(`${env.cmsUrl}/api${path}${search}`, {
			headers: authorization(draft),
			...(draft ? { cache: 'no-store' as const } : { next: { tags, revalidate } }),
		});
	} catch (error) {
		// REQ-INFRA-009: no HTTP answer at all (CMS cold, down or unreachable).
		// During `next build` the page is prebuilt empty instead of failing the
		// deploy; ISR and the webhook refill it. At runtime the route decides.
		if (!env.isBuildPhase) {
			throw error;
		}
		log.warn(
			'cms::cmsFetch',
			`CMS unreachable during build, ${path} prebuilt empty: ${describeFetchError(error)}`,
		);
		return emptyResult<T>(kind);
	}

	if (!response.ok) {
		throw new CmsError(response.status, path, await response.text());
	}

	return (await response.json()) as T;
}
