"use client";

import dynamic from "next/dynamic";

const Analytics = dynamic(() => import("./Analytics"), { ssr: false });
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => ({ default: m.SpeedInsights })),
  { ssr: false }
);

export function AnalyticsSpeedInsights() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
