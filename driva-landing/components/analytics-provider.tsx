"use client";

import { useEffect } from "react";
import { posthogEnabled, posthogHost, posthogKey } from "@/lib/analytics-config";
import { setPosthog } from "@/lib/analytics";

/** PostHog in production only: autocapture off, page views on, no session recording. */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!posthogEnabled) return;
    // Loaded lazily so analytics never weighs on first paint.
    import("posthog-js").then(({ default: posthog }) => {
      if (!posthog.__loaded) {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          autocapture: false,
          capture_pageview: true,
          capture_pageleave: true,
          disable_session_recording: true,
          persistence: "localStorage+cookie",
        });
      }
      setPosthog(posthog);
    });
  }, []);

  return <>{children}</>;
}
