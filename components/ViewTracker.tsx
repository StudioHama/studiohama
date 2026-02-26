"use client";

import { useEffect } from "react";

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export default function ViewTracker({ postId }: { postId: string }) {
  useEffect(() => {
    if (localStorage.getItem("is_admin_device") === "true") return;

    const key = `blog_view_${postId}`;
    const stored = localStorage.getItem(key);
    const now = Date.now();

    if (stored) {
      const lastViewed = parseInt(stored, 10);
      if (!isNaN(lastViewed) && now - lastViewed < TWENTY_FOUR_HOURS) return;
    }

    async function track() {
      try {
        const res = await fetch("/api/track-view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId }),
        });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          console.error(
            "[ViewTracker] API returned error status=%d postId=%s body=%o",
            res.status,
            postId,
            errBody
          );
          return;
        }

        localStorage.setItem(key, String(now));
      } catch (err) {
        console.error("[ViewTracker] Fetch to /api/track-view failed:", err);
      }
    }

    track();
  }, [postId]);

  return null;
}
