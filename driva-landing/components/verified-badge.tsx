import { BadgeCheck } from "lucide-react";
import { copy } from "@/content/copy";

/** Orange verified mark: the app's seal with a check. */
export function VerifiedMark({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return <BadgeCheck className={`shrink-0 text-signal ${className}`} strokeWidth={2.1} aria-hidden="true" />;
}

/**
 * Every verified indicator on the page goes through this component.
 * `mark` is the inline icon after a car name; `pill` adds the "Verified" text.
 */
export function VerifiedBadge({
  variant = "mark",
  className = "",
}: {
  variant?: "mark" | "pill";
  className?: string;
}) {
  if (variant === "mark") {
    return (
      <span className={`relative inline-flex ${className}`}>
        <VerifiedMark />
        <span className="sr-only">{copy.ui.verified}</span>
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-asphalt/70 py-1 pr-2.5 pl-1.5 text-xs font-semibold tracking-[0.06em] text-chalk uppercase ${className}`}
      style={{ fontVariationSettings: '"wdth" 112' }}
    >
      <VerifiedMark className="h-4 w-4" />
      {copy.ui.verified}
    </span>
  );
}
