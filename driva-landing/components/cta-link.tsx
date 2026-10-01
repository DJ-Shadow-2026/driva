"use client";

import { track, type AnalyticsEvents } from "@/lib/analytics";

/** The one conversion action: a link to #waitlist that reports where it was clicked. */
export function CtaLink({
  location,
  children,
  className = "btn-primary",
}: {
  location: AnalyticsEvents["cta_clicked"]["location"];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href="#waitlist" className={className} onClick={() => track("cta_clicked", { location })}>
      {children}
    </a>
  );
}
