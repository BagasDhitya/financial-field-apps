import qs from 'qs';

import { log } from '@/lib/log';

import { COLLECTIONS, SINGLES } from './documents';
import { matches, paginate, QueryError, shapeDocument, sortDocs } from './query';
import { CONTENT_TYPES, isContentTypeName } from './schema';

/**
 * The local API: Strapi 5 REST answers for the hardcoded content in src/data
 * (PRP-0002.p1 §S4.8). Paths and parameters are the CMS's own, e.g.
 * `/articles?filters[slug][$eq]=…&populate[author]=true`. The route
 * `src/app/api/[...path]` serves it over HTTP, and `cmsFetch` calls it in
 * process while no `CMS_URL` is set, so both answer the same.
 */

export type LocalCmsResponse = { status: number; body: unknown };

const TOP_LEVEL_KEYS = new Set([
	'fields',
	'populate',
	'filters',
	'sort',
	'pagination',
	'status',
	'locale',
]);

/** The same limits as Strapi's own query parser. */
const PARSE_OPTIONS = { depth: 20, arrayLimit: 100, parameterLimit: 1000 } as const;

function error(status: number, name: string, message: string, details = {}): LocalCmsResponse {
	return { status, body: { data: null, error: { status, name, message, details } } };
}

const NOT_FOUND = () => error(404, 'NotFoundError', 'Not Found');

function checkTopLevel(query: Record<string, unknown>): void {
	for (const key of Object.keys(query)) {
		if (!TOP_LEVEL_KEYS.has(key)) {
			throw new QueryError(400, 'ValidationError', `Invalid key ${key}`, {
				key,
				path: null,
				source: 'query',
				param: key,
			});
		}
	}
	const status = query.status;
	if (status !== undefined && status !== 'published' && status !== 'draft') {
		throw new QueryError(
			400,
			'ValidationError',
			`Invalid parameter at 'status'. Expected 'published' or 'draft', received: ${String(status)}`,
		);
	}
}

function respond(path: string, query: Record<string, unknown>): LocalCmsResponse {
	const [name = '', documentId, ...rest] = path.split('/').filter(Boolean);
	if (!isContentTypeName(name) || rest.length > 0) {
		return NOT_FOUND();
	}
	checkTopLevel(query);
	const type = CONTENT_TYPES[name];
	const spec = { fields: query.fields, populate: query.populate };

	if (type.kind === 'single') {
		const doc = SINGLES[name];
		if (documentId !== undefined || !doc) {
			return NOT_FOUND();
		}
		return { status: 200, body: { data: shapeDocument(name, doc, spec), meta: {} } };
	}

	const docs = COLLECTIONS[name] ?? [];
	if (documentId !== undefined) {
		const doc = docs.find((candidate) => candidate.documentId === documentId);
		return doc
			? { status: 200, body: { data: shapeDocument(name, doc, spec), meta: {} } }
			: NOT_FOUND();
	}

	const found = docs.filter((doc) => matches(type.attributes, doc, query.filters));
	const { items, meta } = paginate(
		sortDocs(type.attributes, found, query.sort),
		query.pagination,
	);
	return {
		status: 200,
		body: {
			data: items.map((doc) => shapeDocument(name, doc, spec)),
			meta: { pagination: meta },
		},
	};
}

/**
 * Answers one REST request. `path` is the part after `/api` (`/articles`,
 * `/articles/<documentId>`, `/site-navigation`); `search` is the raw query
 * string, with or without `?`. Never throws: a bad query is a 400 body, as
 * from the CMS.
 */
export function localCmsResponse(path: string, search: string): LocalCmsResponse {
	const query = qs.parse(search.replace(/^\?/, ''), PARSE_OPTIONS) as Record<string, unknown>;
	try {
		return respond(path, query);
	} catch (thrown) {
		if (thrown instanceof QueryError) {
			// A query the CMS would also refuse. Logged without the query: over HTTP
			// it is reader input (W3).
			log.warn('cms::localCmsResponse', `${thrown.status} on ${path}`);
			return error(thrown.status, thrown.errorName, thrown.message, thrown.details);
		}
		throw thrown;
	}
}
