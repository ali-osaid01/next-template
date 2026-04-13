"use client";

import { usePathname } from "next/navigation";

// ---------------------------------------------------------------------------
// Returns whether `path` is the active route.
// deep=true (default): matches /dashboard and /dashboard/users
// deep=false: exact match only
// ---------------------------------------------------------------------------

export function useActiveLink(path: string, deep = true): boolean {
  const pathname = usePathname();

  if (!path) return false;
  if (deep) return pathname === path || pathname.startsWith(`${path}/`);
  return pathname === path;
}
