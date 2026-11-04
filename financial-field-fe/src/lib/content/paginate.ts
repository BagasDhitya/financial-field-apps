import type { CmsCollection } from "@/lib/cms/client";
import type { Paginated } from "@/types";

/** Converts a Strapi collection response into the domain pagination shape. */
export function toPaginated<TEntry, TItem>(
  result: CmsCollection<TEntry>,
  map: (entry: TEntry) => TItem,
): Paginated<TItem> {
  const meta = result.meta?.pagination;
  return {
    items: result.data.map(map),
    page: meta?.page ?? 1,
    pageSize: meta?.pageSize ?? result.data.length,
    pageCount: meta?.pageCount ?? (result.data.length > 0 ? 1 : 0),
    total: meta?.total ?? result.data.length,
  };
}

export function emptyPage<T>(page = 1): Paginated<T> {
  return { items: [], page, pageSize: 0, pageCount: 0, total: 0 };
}
