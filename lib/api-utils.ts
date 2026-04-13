import { buildQueryParams } from "@/utils/query-params";
import type { QueryParamInput } from "@/types/query-params";

type ApiQueryArgs = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: unknown;
  params?: Record<string, unknown>;
};

// ---------------------------------------------------------------------------
// createApiQuery — builds the RTK Query endpoint arg object.
// Serializes params into the URL so axiosBaseQuery receives a clean url.
//
// Usage (inside injectEndpoints):
//   getUsers: builder.query<UserList, UsersListParams>({
//     query: (params) => createApiQuery('/api/users', params),
//   })
// ---------------------------------------------------------------------------

export function createApiQuery(
  url: string,
  params?: Record<string, QueryParamInput>
): ApiQueryArgs {
  if (!params) return { url, method: "GET" };

  const searchParams = buildQueryParams(params);
  const query = searchParams.toString();

  return { url: query ? `${url}?${query}` : url, method: "GET" };
}

export function createMutationArg(
  url: string,
  method: Exclude<ApiQueryArgs["method"], "GET">,
  data?: unknown
): ApiQueryArgs {
  return { url, method, data };
}
