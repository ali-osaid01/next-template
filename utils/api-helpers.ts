import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export function getErrorMessage(error: unknown): string {
  if (isFetchBaseQueryError(error)) {
    const data = error.data as { message?: string } | undefined;
    return data?.message ?? "An unexpected error occurred";
  }
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
}
