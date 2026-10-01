import { ShieldCheck } from "lucide-react";
import { copy } from "@/content/copy";

/** Founding Member badge: muted gold outline on tarmac, matching the MVP. */
export function FoundingBadge({ size = "sm" }: { size?: "sm" | "lg" }) {
  if (size === "sm") {
    return (
      <span
        className="inline-flex items-center gap-1 rounded-full border border-founding/70 bg-tarmac py-[3px] pr-2 pl-1.5 text-xs leading-none font-semibold whitespace-nowrap text-founding"
        style={{ fontVariationSettings: '"wdth" 100' }}
      >
        <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        {copy.ui.foundingMember}
      </span>
    );
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]" aria-hidden="true">
      {/* One hairline ring gives the emblem weight without a glow. */}
      <div className="absolute inset-[6%] rounded-full border border-founding/25" />
      <div className="absolute inset-[16%] flex flex-col items-center justify-center gap-5 rounded-full border-2 border-founding bg-tarmac">
        <svg viewBox="0 0 64 72" className="h-[34%] w-auto" focusable="false">
          <path
            d="M32 3L58 12V34C58 51 46.5 63.5 32 69C17.5 63.5 6 51 6 34V12Z"
            fill="none"
            stroke="var(--founding-gold)"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path
            d="M21 36L29 44L44 28"
            fill="none"
            stroke="var(--founding-gold)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="text-[15px] font-semibold text-founding sm:text-[17px]"
          style={{ fontVariationSettings: '"wdth" 112' }}
        >
          {copy.ui.foundingMember}
        </span>
      </div>
    </div>
  );
}
