// ---------------------------------------------------------------------------
// Number formatting
// ---------------------------------------------------------------------------

export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat("en-US", options).format(value);
}

export function formatCurrency(value: number, currency = "USD"): string {
  return formatNumber(value, { style: "currency", currency });
}

// ---------------------------------------------------------------------------
// Date / time formatting
// ---------------------------------------------------------------------------

export function formatDate(
  value: Date | string | number,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(date);
}

export function formatTime(value: Date | string | number): string {
  return formatDate(value, { hour: "2-digit", minute: "2-digit" });
}

export function formatRelativeTime(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);
  const diffMs = date.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1_000);

  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });

  if (Math.abs(diffSec) < 60) return rtf.format(diffSec, "seconds");
  if (Math.abs(diffSec) < 3_600) return rtf.format(Math.round(diffSec / 60), "minutes");
  if (Math.abs(diffSec) < 86_400) return rtf.format(Math.round(diffSec / 3_600), "hours");
  return rtf.format(Math.round(diffSec / 86_400), "days");
}

// ---------------------------------------------------------------------------
// String helpers
// ---------------------------------------------------------------------------

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

export function toTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
