import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import axiosInstance from "./axios";

// ---------------------------------------------------------------------------
// Axios-based base query (mirrors VMS pattern)
// ---------------------------------------------------------------------------

type AxiosBaseQueryArgs = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: unknown;
  params?: Record<string, unknown>;
};

const axiosBaseQuery: BaseQueryFn<AxiosBaseQueryArgs, unknown, FetchBaseQueryError> = async ({
  url,
  method = "GET",
  data,
  params,
}) => {
  try {
    const result = await axiosInstance({ url, method, data, params });
    return { data: result.data };
  } catch (error: unknown) {
    const err = error as { status?: number; data?: unknown };
    return {
      error: {
        status: err.status ?? "CUSTOM_ERROR",
        data: err.data ?? error,
      } as FetchBaseQueryError,
    };
  }
};

// ---------------------------------------------------------------------------
// Cache tag registry — single source of truth, prevents magic strings
// ---------------------------------------------------------------------------

export const QUERY_TAGS = {
  // Add tags here as features grow, e.g.:
  // users: "Users",
} as const;

export type QueryTag = (typeof QUERY_TAGS)[keyof typeof QUERY_TAGS];

// ---------------------------------------------------------------------------
// Root API slice — features inject endpoints via injectEndpoints()
// ---------------------------------------------------------------------------

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  tagTypes: Object.values(QUERY_TAGS) as string[],
  endpoints: () => ({}),
});
