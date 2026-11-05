/**
 * Mock Strapi for e2e, Lighthouse CI and the SEO check (ADR-0009). Speaks the
 * subset of Strapi 5 REST the frontend uses. Not a Strapi emulator: unknown
 * filters are ignored rather than rejected.
 */
import { createServer } from 'node:http';

import qs from 'qs';

import { solidPng } from '../../scripts/lib/png.mjs';

import * as data from './fixtures.mjs';

const PORT = Number(process.env.MOCK_CMS_PORT ?? 1338);
const PREVIEW_TOKEN = process.env.CMS_PREVIEW_TOKEN ?? 'test-preview-token';

const COLLECTIONS = {
	articles: () => data.articles,
	categories: () => data.categories,
	tags: () => data.tags,
	'writer-profiles': () => data.authors,
	'static-pages': () => data.staticPages,
	redirects: () => data.redirects,
	'stock-tickers': () => data.stockTickers,
};

const SINGLES = {
	'site-navigation': () => data.siteNavigation,
	'site-setting': () => data.siteSetting,
};

function isOperators(condition) {
	return (
		condition &&
		typeof condition === 'object' &&
		Object.keys(condition).some((key) => key.startsWith('$'))
	);
}

function compare(value, operators) {
	return Object.entries(operators).every(([op, expected]) => {
		const text = value == null ? '' : String(value);
		switch (op) {
			case '$eq':
				return text === String(expected);
			case '$eqi':
				return text.toLowerCase() === String(expected).toLowerCase();
			case '$ne':
				return text !== String(expected);
			case '$in':
				return [].concat(expected).map(String).includes(text);
			case '$containsi':
				return text.toLowerCase().includes(String(expected).toLowerCase());
			case '$null':
				return (value == null) === (expected === true || expected === 'true');
			default:
				return true;
		}
	});
}

function matches(entry, filters) {
	return Object.entries(filters ?? {}).every(([key, condition]) => {
		if (key === '$or') {
			return [].concat(condition).some((sub) => matches(entry, sub));
		}
		if (key === '$and') {
			return [].concat(condition).every((sub) => matches(entry, sub));
		}
		const value = entry?.[key];
		if (isOperators(condition)) {
			return compare(value, condition);
		}
		if (Array.isArray(value)) {
			return value.some((item) => item && matches(item, condition));
		}
		return value != null && matches(value, condition);
	});
}

function sortEntries(entries, sort) {
	const first = [].concat(sort ?? [])[0];
	if (!first) {
		return entries;
	}
	const [field, direction] = String(first).split(':');
	return [...entries].sort((a, b) => {
		const result = String(a[field] ?? '').localeCompare(String(b[field] ?? ''));
		return direction === 'desc' ? -result : result;
	});
}

function paginate(entries, pagination = {}) {
	if (pagination.limit) {
		const limit = Number(pagination.limit);
		return {
			items: entries.slice(0, limit),
			meta: {
				page: 1,
				pageSize: limit,
				pageCount: entries.length > 0 ? 1 : 0,
				total: entries.length,
			},
		};
	}
	const page = Number(pagination.page ?? 1);
	const pageSize = Math.min(Number(pagination.pageSize ?? 25), 100);
	const pageCount = Math.ceil(entries.length / pageSize);
	return {
		items: entries.slice((page - 1) * pageSize, page * pageSize),
		meta: { page, pageSize, pageCount, total: entries.length },
	};
}

const IMAGE = solidPng(160, 90, [0x00, 0x3a, 0xa0]);

function send(response, status, body) {
	response.writeHead(status, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify(body));
}

const server = createServer((request, response) => {
	const url = new URL(request.url ?? '/', `http://localhost:${PORT}`);

	if (url.pathname.startsWith('/uploads/')) {
		response.writeHead(200, {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=3600',
		});
		response.end(IMAGE);
		return;
	}

	const match = url.pathname.match(/^\/api\/([\w-]+)$/);
	if (!match) {
		send(response, 404, { error: { status: 404, message: 'Not Found' } });
		return;
	}
	const name = match[1];
	const query = qs.parse(url.search.slice(1), { depth: 20, arrayLimit: 100 });

	if (SINGLES[name]) {
		send(response, 200, { data: SINGLES[name](), meta: {} });
		return;
	}
	if (!COLLECTIONS[name]) {
		send(response, 404, { error: { status: 404, message: 'Not Found' } });
		return;
	}

	let entries = COLLECTIONS[name]();
	if (query.status === 'draft') {
		if (request.headers.authorization !== `Bearer ${PREVIEW_TOKEN}`) {
			send(response, 401, {
				error: { status: 401, message: 'Drafts need a token' },
			});
			return;
		}
		entries =
			name === 'articles'
				? [
						...entries.map((entry) => ({
							...entry,
							editorial_status: 'fact_checked',
						})),
						data.draftOnly,
					]
				: entries;
	}

	const filtered = sortEntries(
		entries.filter((entry) => matches(entry, query.filters)),
		query.sort,
	);
	const { items, meta } = paginate(filtered, query.pagination);
	send(response, 200, { data: items, meta: { pagination: meta } });
});

server.listen(PORT, () => {
	console.log(`mock-cms listening on http://localhost:${PORT}`);
});
