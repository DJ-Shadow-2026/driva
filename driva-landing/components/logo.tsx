import { copy } from "@/content/copy";

// The Driva mark: a D whose counter holds a steering wheel. Traced from
// public/brand/driva-mark.png so it sits on any background without a box.
const MARK_COUNTERS = [
  // Upper counter, closed at the bottom by the wheel rim.
  "M92 88H252C338 88 404 146 411 220C352 222 304 198 252 198C200 198 150 222 92 222Z",
  // Lower left counter, between the rim, the left spoke, and the stem.
  "M92 266C168 268 226 326 228 410H92Z",
  // Lower right counter.
  "M270 410C272 326 330 270 411 266C405 345 345 405 270 410Z",
];

export function DrivaMark({
  className,
  title,
  tone = "signal",
}: {
  className?: string;
  title?: string;
  tone?: "signal" | "asphalt";
}) {
  const fill = tone === "signal" ? "var(--signal)" : "var(--asphalt)";
  return (
    <svg
      viewBox="0 0 505 493"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d={[
          "M10 32Q10 12 30 12H252A243 234 0 0 1 252 480H30Q10 480 10 460Z",
          ...MARK_COUNTERS,
          // Hub.
          "M248 262m-36 0a36 36 0 1 0 72 0a36 36 0 1 0 -72 0Z",
        ].join("")}
      />
    </svg>
  );
}

/** Mark plus DRIVA wordmark. */
export function DrivaLockup({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const mark = { sm: "h-6 w-6", md: "h-7 w-7", lg: "h-10 w-10" }[size];
  const text = { sm: "text-[17px]", md: "text-[19px]", lg: "text-[28px]" }[size];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <DrivaMark className={`${mark} shrink-0`} />
      <span
        className={`${text} leading-none font-bold tracking-[0.14em] text-chalk`}
        style={{ fontVariationSettings: '"wdth" 125' }}
      >
        {copy.brand.wordmark}
      </span>
    </span>
  );
}
