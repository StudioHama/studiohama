"use client";

import dynamic from "next/dynamic";

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => ({ default: m.SpeedInsights })),
  { ssr: false }
);

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
  { ssr: false }
);

export function AnalyticsSpeedInsights() {
  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
