"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function GoogleAnalyticsWrapper() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    const isAdminDevice = localStorage.getItem("is_admin_device") === "true";
    setShow(!isAdminDevice);
  }, []);

  if (!show) return null;

  return <GoogleAnalytics gaId="G-DJ97Y83J9Y" />;
}
