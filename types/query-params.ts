// ---------------------------------------------------------------------------
// Base query param shapes — features extend these for their own API calls.
//
// Usage:
//   export type UsersListParams = BaseListParams & {
//     role?: string;
//     status?: 'active' | 'inactive';
//   };
// ---------------------------------------------------------------------------

export type SortOrder = "asc" | "desc";

export type BaseListParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  q?: string; // free-text search
};

// Raw value types accepted by buildQueryParams
export type QueryParamValue = string | number | boolean | null | undefined;
export type QueryParamInput = QueryParamValue | QueryParamValue[];
