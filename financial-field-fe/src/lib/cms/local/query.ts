import { isDoc, type Doc } from './documents';
import {
	COMPONENTS,
	CONTENT_TYPES,
	SYSTEM_FIELDS,
	type Attribute,
	type ContentTypeName,
} from './schema';

/**
 * Strapi 5 REST query semantics over the local documents: `filters`, `sort`,
 * `pagination`, `fields`, `populate` and `status`, with `strictParams` on as
 * in `financial-field-cms/config/api.ts`. A key the schema doesn't have is a
 * 400 ValidationError "Invalid key …", the same answer the CMS gives, so a
 * query that works here works there once the CMS has the field.
 */

/** A REST error in Strapi's shape; the handler turns it into the response. */
export class QueryError extends Error {
	readonly status: number;
	readonly errorName: string;
	readonly details: Record<string, unknown>;

	constructor(status: number, errorName: string, message: string, details = {}) {
		super(message);
		this.name = 'QueryError';
		this.status = status;
		this.errorName = errorName;
		this.details = details;
	}
}

type Param = 'fields' | 'filters' | 'sort' | 'populate';

function invalidKey(key: string, param: Param, path: string | null = null): QueryError {
	return new QueryError(400, 'ValidationError', `Invalid key ${key}`, {
		key,
		path,
		source: 'query',
		param,
	});
}

/** Attributes of a content type or a component, by name. */
type Attributes = Record<string, Attribute>;

const MEDIA_FIELDS = [
	'id',
	'documentId',
	'name',
	'alternativeText',
	'caption',
	'width',
	'height',
	'formats',
	'hash',
	'ext',
	'mime',
	'size',
	'url',
	'previewUrl',
	'provider',
	'provider_metadata',
	'createdAt',
	'updatedAt',
	'publishedAt',
];

const DEFAULT_PAGE_SIZE = 25;
const MAX_PAGE_SIZE = 100;

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** qs gives arrays as arrays, or as `{0: …, 1: …}` past its array limit. */
function asList(value: unknown): unknown[] {
	if (Array.isArray(value)) {
		return value;
	}
	if (isRecord(value)) {
		return Object.values(value);
	}
	return value === undefined ? [] : [value];
}

/** `a,b`, `['a','b']` or `{0:'a'}` → names. */
function names(value: unknown): string[] {
	return asList(value).flatMap((item) =>
		String(item)
			.split(',')
			.map((name) => name.trim())
			.filter(Boolean),
	);
}

function isScalarKey(attributes: Attributes, key: string, system: boolean): boolean {
	const attribute = Object.hasOwn(attributes, key) ? attributes[key] : undefined;
	return attribute?.kind === 'scalar' || (system && SYSTEM_FIELDS.includes(key));
}

function valueOf(doc: Doc | Record<string, unknown>, key: string): unknown {
	if (isDoc(doc)) {
		if (key === 'id' || key === 'documentId') {
			return doc[key];
		}
		return doc.values[key];
	}
	return doc[key];
}

// ---- Filters ---------------------------------------------------------------

function toComparable(actual: unknown, expected: unknown): [unknown, unknown] {
	if (typeof actual === 'number') {
		return [actual, Number(expected)];
	}
	if (typeof actual === 'boolean') {
		return [actual, expected === true || expected === 'true'];
	}
	return [actual == null ? null : String(actual), expected == null ? null : String(expected)];
}

function text(value: unknown): string {
	return value == null ? '' : String(value);
}

function compare(actual: unknown, operator: string, expected: unknown): boolean {
	const [a, b] = toComparable(actual, expected);
	switch (operator) {
		case '$eq':
			return a === b;
		case '$ne':
			return a !== b;
		case '$eqi':
			return text(a).toLowerCase() === text(b).toLowerCase();
		case '$nei':
			return text(a).toLowerCase() !== text(b).toLowerCase();
		case '$in':
			return asList(expected).some((item) => toComparable(actual, item)[1] === a);
		case '$notIn':
			return !asList(expected).some((item) => toComparable(actual, item)[1] === a);
		case '$lt':
			return a !== null && b !== null && (a as number | string) < (b as number | string);
		case '$lte':
			return a !== null && b !== null && (a as number | string) <= (b as number | string);
		case '$gt':
			return a !== null && b !== null && (a as number | string) > (b as number | string);
		case '$gte':
			return a !== null && b !== null && (a as number | string) >= (b as number | string);
		case '$contains':
			return text(a).includes(text(b));
		case '$notContains':
			return !text(a).includes(text(b));
		case '$containsi':
			return text(a).toLowerCase().includes(text(b).toLowerCase());
		case '$notContainsi':
			return !text(a).toLowerCase().includes(text(b).toLowerCase());
		case '$startsWith':
			return text(a).startsWith(text(b));
		case '$endsWith':
			return text(a).endsWith(text(b));
		case '$null':
			return (actual == null) === (expected === true || expected === 'true');
		case '$notNull':
			return (actual != null) === (expected === true || expected === 'true');
		default:
			throw invalidKey(operator, 'filters');
	}
}

function matchScalar(actual: unknown, condition: unknown): boolean {
	if (!isRecord(condition)) {
		return compare(actual, '$eq', condition);
	}
	return Object.entries(condition).every(([operator, expected]) => {
		if (operator === '$not') {
			return !matchScalar(actual, expected);
		}
		return compare(actual, operator, expected);
	});
}

function attributesOf(attribute: Attribute): Attributes {
	if (attribute.kind === 'relation') {
		return CONTENT_TYPES[attribute.target].attributes;
	}
	if (attribute.kind === 'component') {
		return COMPONENTS[attribute.component];
	}
	return {};
}

/** True when the document (or component item) matches Strapi `filters`. */
export function matches(
	attributes: Attributes,
	item: Doc | Record<string, unknown>,
	filters: unknown,
	system = true,
): boolean {
	if (filters === undefined || filters === '') {
		return true;
	}
	if (!isRecord(filters)) {
		throw invalidKey(String(filters), 'filters');
	}
	return Object.entries(filters).every(([key, condition]) => {
		if (key === '$and') {
			return asList(condition).every((sub) => matches(attributes, item, sub, system));
		}
		if (key === '$or') {
			return asList(condition).some((sub) => matches(attributes, item, sub, system));
		}
		if (key === '$not') {
			return !matches(attributes, item, condition, system);
		}
		if (isScalarKey(attributes, key, system)) {
			return matchScalar(valueOf(item, key), condition);
		}
		const attribute = Object.hasOwn(attributes, key) ? attributes[key] : undefined;
		if (!attribute || attribute.kind === 'media') {
			throw invalidKey(key, 'filters');
		}
		const nested = attributesOf(attribute);
		const value = valueOf(item, key);
		const targetSystem = attribute.kind === 'relation';
		if (Array.isArray(value)) {
			return value.some((target) => matches(nested, target, condition, targetSystem));
		}
		return value != null && matches(nested, value as Doc, condition, targetSystem);
	});
}

// ---- Sort ------------------------------------------------------------------

/** Strapi `sort` (`a:desc`, `a,b`, or a list). Nulls sort as Postgres does: last ascending. */
export function sortDocs<T extends Doc | Record<string, unknown>>(
	attributes: Attributes,
	list: readonly T[],
	sort: unknown,
): T[] {
	const keys = names(sort).map((entry) => {
		const [field = '', direction = 'asc'] = entry.split(':');
		if (!isScalarKey(attributes, field, true)) {
			throw invalidKey(field, 'sort');
		}
		if (direction !== 'asc' && direction !== 'desc') {
			throw invalidKey(direction, 'sort');
		}
		return { field, sign: direction === 'desc' ? -1 : 1 };
	});
	if (keys.length === 0) {
		return [...list];
	}
	return [...list].sort((left, right) => {
		for (const { field, sign } of keys) {
			const a = valueOf(left, field);
			const b = valueOf(right, field);
			if (a === b) {
				continue;
			}
			if (a == null) {
				return sign;
			}
			if (b == null) {
				return -sign;
			}
			return (a < b ? -1 : 1) * sign;
		}
		return 0;
	});
}

// ---- Pagination --------------------------------------------------------------

export type PageMeta =
	| { page: number; pageSize: number; pageCount: number; total: number }
	| { start: number; limit: number; total: number };

function positiveInt(value: unknown, fallback: number): number {
	const parsed = Number.parseInt(String(value ?? ''), 10);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/** `page`/`pageSize` or `start`/`limit`, capped at 100 like the CMS (`maxLimit`). */
export function paginate<T>(
	list: readonly T[],
	pagination: unknown,
): { items: T[]; meta: PageMeta } {
	const options = isRecord(pagination) ? pagination : {};
	if (options.start !== undefined || options.limit !== undefined) {
		const start = Math.max(0, Number.parseInt(String(options.start ?? '0'), 10) || 0);
		const limit = Math.min(positiveInt(options.limit, DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE);
		return {
			items: list.slice(start, start + limit),
			meta: { start, limit, total: list.length },
		};
	}
	const page = positiveInt(options.page, 1);
	const pageSize = Math.min(positiveInt(options.pageSize, DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE);
	return {
		items: list.slice((page - 1) * pageSize, page * pageSize),
		meta: { page, pageSize, pageCount: Math.ceil(list.length / pageSize), total: list.length },
	};
}

// ---- Fields and populate -----------------------------------------------------------

type PopulateSpec = {
	fields?: unknown;
	populate?: unknown;
	filters?: unknown;
	sort?: unknown;
};

const POPULATE_KEYS = new Set(['fields', 'populate', 'filters', 'sort']);

/** `populate` as {attribute: spec}; `*` and `true` mean "this level, all fields". */
function populateEntries(attributes: Attributes, populate: unknown): [string, PopulateSpec][] {
	if (populate === undefined || populate === '' || populate === false || populate === 'false') {
		return [];
	}
	if (populate === '*' || (Array.isArray(populate) && populate.includes('*'))) {
		return Object.entries(attributes)
			.filter(([, attribute]) => attribute.kind !== 'scalar')
			.map(([key]) => [key, {}]);
	}
	const entries: [string, unknown][] = isRecord(populate)
		? Object.entries(populate)
		: names(populate).map((key) => [key, true]);
	return entries.flatMap(([key, spec]) => {
		const attribute = Object.hasOwn(attributes, key) ? attributes[key] : undefined;
		if (!attribute || attribute.kind === 'scalar') {
			throw invalidKey(key, 'populate');
		}
		if (spec === false || spec === 'false') {
			return [];
		}
		if (spec === true || spec === 'true' || spec === '*') {
			return [[key, {}] as [string, PopulateSpec]];
		}
		if (!isRecord(spec)) {
			throw invalidKey(String(spec), 'populate');
		}
		for (const option of Object.keys(spec)) {
			if (!POPULATE_KEYS.has(option)) {
				throw invalidKey(option, 'populate');
			}
		}
		return [[key, spec as PopulateSpec] as [string, PopulateSpec]];
	});
}

function selectedFields(attributes: Attributes, fields: unknown, system: boolean): string[] | null {
	if (fields === undefined || fields === '') {
		return null;
	}
	return names(fields).map((field) => {
		if (!isScalarKey(attributes, field, system)) {
			throw invalidKey(field, 'fields', Object.hasOwn(attributes, field) ? field : null);
		}
		return field;
	});
}

function shapeMedia(file: unknown, spec: PopulateSpec): unknown {
	if (!isRecord(file)) {
		return null;
	}
	for (const option of Object.keys(spec)) {
		if (option !== 'fields') {
			throw invalidKey(option, 'populate');
		}
	}
	const fields = spec.fields === undefined ? null : names(spec.fields);
	if (!fields) {
		return { ...file };
	}
	const picked: Record<string, unknown> = { id: file.id, documentId: file.documentId };
	for (const field of fields) {
		if (!MEDIA_FIELDS.includes(field)) {
			throw invalidKey(field, 'fields');
		}
		picked[field] = file[field];
	}
	return picked;
}

function shapeComponent(
	attributes: Attributes,
	item: Record<string, unknown>,
	spec: PopulateSpec,
): Record<string, unknown> {
	const fields = selectedFields(attributes, spec.fields, false);
	const out: Record<string, unknown> = { id: item.id };
	for (const [key, attribute] of Object.entries(attributes)) {
		if (attribute.kind === 'scalar' && (!fields || fields.includes(key))) {
			out[key] = item[key] ?? null;
		}
	}
	for (const [key, nested] of populateEntries(attributes, spec.populate)) {
		out[key] = shapeValue(attributes[key] as Attribute, item[key], nested);
	}
	return out;
}

function shapeValue(attribute: Attribute, value: unknown, spec: PopulateSpec): unknown {
	switch (attribute.kind) {
		case 'media':
			return shapeMedia(value, spec);
		case 'component': {
			const attributes = COMPONENTS[attribute.component];
			if (spec.filters !== undefined || spec.sort !== undefined) {
				throw invalidKey(spec.filters !== undefined ? 'filters' : 'sort', 'populate');
			}
			if (attribute.repeatable) {
				return asList(value).map((item) =>
					shapeComponent(attributes, item as Record<string, unknown>, spec),
				);
			}
			return isRecord(value) ? shapeComponent(attributes, value, spec) : null;
		}
		case 'relation': {
			const target = attribute.target;
			const attributes = CONTENT_TYPES[target].attributes;
			if (attribute.many) {
				const list = asList(value)
					.filter(isDoc)
					.filter((doc) => matches(attributes, doc, spec.filters));
				return sortDocs(attributes, list, spec.sort).map((doc) =>
					shapeDocument(target, doc, spec),
				);
			}
			return isDoc(value) && matches(attributes, value, spec.filters)
				? shapeDocument(target, value, spec)
				: null;
		}
		default:
			return value ?? null;
	}
}

/** A document as REST returns it: id, documentId, the selected fields, then populated keys. */
export function shapeDocument(
	type: ContentTypeName,
	doc: Doc,
	spec: PopulateSpec,
): Record<string, unknown> {
	const attributes = CONTENT_TYPES[type].attributes;
	const fields = selectedFields(attributes, spec.fields, true);
	const out: Record<string, unknown> = { id: doc.id, documentId: doc.documentId };
	if (fields) {
		for (const field of fields) {
			if (field !== 'id' && field !== 'documentId') {
				out[field] = doc.values[field] ?? null;
			}
		}
	} else {
		for (const [key, attribute] of Object.entries(attributes)) {
			if (attribute.kind === 'scalar') {
				out[key] = doc.values[key] ?? null;
			}
		}
		for (const key of ['createdAt', 'updatedAt', 'publishedAt']) {
			out[key] = doc.values[key] ?? null;
		}
	}
	for (const [key, nested] of populateEntries(attributes, spec.populate)) {
		out[key] = shapeValue(attributes[key] as Attribute, doc.values[key], nested);
	}
	return out;
}
