// ---------------------------------------------------------------------------
// Generic API shapes — adapt these to match your backend contract
// ---------------------------------------------------------------------------

export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}>;

export type PaginationParams = {
  page?: number;
  pageSize?: number;
};

export type SortOrder = "asc" | "desc";

export type SortParams = {
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type SearchParams = {
  search?: string;
};

export type ListQueryParams = PaginationParams & SortParams & SearchParams;
