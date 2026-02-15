/**
 * Get today's date in YYYY-MM-DD format using Korea Standard Time (KST).
 * Use this for database writes to avoid UTC timezone issues.
 */
export function getTodayKST(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
}
