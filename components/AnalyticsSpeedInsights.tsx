"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => ({ default: m.SpeedInsights })),
  { ssr: false }
);

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
  { ssr: false }
);

export function AnalyticsSpeedInsights() {
  const pathname = usePathname();

  // Do not track admin visits
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
