import type { Paginated } from '@/types';

/**
 * One page of a list in the domain pagination shape. A page past the end has
 * no items; `pageCount` is 0 for an empty list.
 */
export function paginate<T>(items: readonly T[], page: number, pageSize: number): Paginated<T> {
	const size = Math.max(1, Math.floor(pageSize));
	const start = (Math.max(1, page) - 1) * size;
	return {
		items: items.slice(start, start + size),
		page,
		pageSize: size,
		pageCount: Math.ceil(items.length / size),
		total: items.length,
	};
}
