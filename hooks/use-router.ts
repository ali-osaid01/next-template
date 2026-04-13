"use client";

import { useMemo } from "react";
import { useRouter as useNextRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Typed wrapper around Next.js useRouter — use this instead of importing
// useRouter directly so navigation calls are consistent across the app.
// ---------------------------------------------------------------------------

export function useRouter() {
  const router = useNextRouter();

  return useMemo(
    () => ({
      back: () => router.back(),
      forward: () => router.forward(),
      reload: () => window.location.reload(),
      push: (href: string) => router.push(href),
      replace: (href: string) => router.replace(href),
      prefetch: (href: string) => router.prefetch(href),
    }),
    [router]
  );
}
