export type Pagination<T> = {
  records: T[];
  pageSize: number;
  page: number;
  totalItems: number;
};
