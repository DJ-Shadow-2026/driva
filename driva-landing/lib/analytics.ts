"use client";

import type { PostHog } from "posthog-js";
import { metaEnabled, posthogEnabled } from "./analytics-config";

export type AnalyticsEvents = {
  cta_clicked: { location: "nav" | "hero" | "founding" };
  waitlist_form_started: undefined;
  waitlist_submitted: {
    between_cars: boolean;
    has_instagram: boolean;
    referred: boolean;
    utm_source: string | null;
  };
  waitlist_failed: { reason: "validation" | "duplicate" | "server" };
  invite_link_copied: undefined;
  faq_opened: { question: string };
  route_section_completed: undefined;
};

type EventName = keyof AnalyticsEvents;

/** Events that also go to the Meta Pixel, with their Meta event name. */
const META_EVENTS: Partial<Record<EventName, string>> = {
  waitlist_submitted: "Lead",
};

let posthog: PostHog | null = null;
const pending: Array<[string, Record<string, unknown> | undefined]> = [];

/** Called by the provider once PostHog has loaded. Flushes events fired before that. */
export function setPosthog(instance: PostHog) {
  posthog = instance;
  for (const [event, props] of pending.splice(0)) instance.capture(event, props);
}

type Fbq = (command: "track" | "trackCustom", event: string, props?: Record<string, unknown>) => void;

/** Send an event to PostHog and, where mapped, the Meta Pixel. No-ops outside production or without keys. */
export function track<E extends EventName>(
  event: E,
  ...[props]: AnalyticsEvents[E] extends undefined ? [] : [AnalyticsEvents[E]]
): void {
  if (typeof window === "undefined") return;
  try {
    if (posthogEnabled) {
      const p = props as Record<string, unknown> | undefined;
      if (posthog) posthog.capture(event, p);
      else pending.push([event, p]);
    }
    const metaEvent = META_EVENTS[event];
    const fbq = (window as unknown as { fbq?: Fbq }).fbq;
    if (metaEnabled && metaEvent && fbq) fbq("track", metaEvent);
  } catch {
    // Analytics must never break the page.
  }
}
