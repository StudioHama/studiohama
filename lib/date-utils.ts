const KST = "Asia/Seoul" as const;

/**
 * Get today's date in YYYY-MM-DD format using Korea Standard Time (KST).
 * Use this for database writes to avoid UTC timezone issues.
 */
export function getTodayKST(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: KST });
}

/**
 * Format an ISO date string for display in KST.
 * @param dateStr - ISO 8601 date string (e.g. from Supabase)
 * @param format - "short" = YY.MM.DD, "long" = YYYY.MM.DD
 */
export function formatDateKST(dateStr: string, format: "short" | "long" = "short"): string {
  const d = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: KST,
    year: format === "short" ? "2-digit" : "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(d).replace(/\s/g, "").slice(0, -1);
}

/**
 * Convert an ISO date string to datetime-local input value (YYYY-MM-DDTHH:mm) in KST.
 */
export function toDatetimeLocalKST(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: KST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(d);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

/**
 * Parse a datetime-local value (YYYY-MM-DDTHH:mm or HH:mm:ss) as KST and return ISO string for Supabase.
 */
export function parseDatetimeLocalAsKST(value: string): string {
  if (!value.trim()) return new Date().toISOString();
  const v = value.trim();
  const withSeconds = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v) ? v + ":00" : v;
  return new Date(withSeconds + "+09:00").toISOString();
}
