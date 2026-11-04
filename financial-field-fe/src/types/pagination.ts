export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};
