export type BodyTable<T> = Record<keyof T, string> & { id: string };

export type Header<T> = {
  label: string;
  key: keyof T;
};

export type PaginationTable = {
  totaliItems: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsNumber: number) => void;
};
