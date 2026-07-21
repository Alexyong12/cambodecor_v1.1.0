/** Generic paginated envelope returned by the backend. */
export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
