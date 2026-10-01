import { copy } from "@/content/copy";
import { getDrive, heroDriveId, demoDrives } from "@/content/demo-drives";
import { CtaLink } from "../cta-link";
import { DriveCard } from "../drive-card";
import { PhoneFrame } from "../phone-frame";

// A GPS-like route that sweeps up behind the phone. The phone sits on top,
// so the line reads as passing behind the device.
const HERO_ROUTE =
  "M-60 760L70 690L118 712L236 588L300 604L352 520L330 470L420 380L486 396L560 300L540 248L640 150L700 168L820 40";

function RouteGlow() {
  return (
    <svg
      viewBox="0 0 760 800"
      preserveAspectRatio="xMidYMid slice"
      className="load-glow pointer-events-none absolute overflow-visible top-1/2 left-1/2 h-[118%] w-[200%] max-w-none -translate-x-1/2 -translate-y-1/2 lg:w-[180%]"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-route" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="var(--signal)" stopOpacity="0" />
          <stop offset="0.25" stopColor="var(--signal)" />
          <stop offset="0.75" stopColor="var(--signal-hot)" />
          <stop offset="1" stopColor="var(--signal-hot)" stopOpacity="0" />
        </linearGradient>
        <filter id="hero-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <path
        d={HERO_ROUTE}
        pathLength={1}
        className="load-glow-path"
        fill="none"
        stroke="var(--signal-hot)"
        strokeOpacity="0.55"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#hero-glow)"
      />
      <path
        d={HERO_ROUTE}
        pathLength={1}
        className="load-glow-path"
        fill="none"
        stroke="url(#hero-route)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  const drive = getDrive(heroDriveId);
  const next = demoDrives.find((d) => d.id !== heroDriveId);
  const sentences = copy.hero.h1.split(/(?<=\.)\s+/);

  return (
    <section id="top" className="relative overflow-x-clip pt-28 pb-20 md:pt-36 lg:pt-40 lg:pb-32">
      <div className="page-x grid items-center gap-y-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="load-headline lg:col-span-7">
          <p className="text-sm font-medium text-fog">{copy.hero.kicker}</p>
          <h1 className="h1 mt-5 text-chalk">
            {sentences.map((s) => (
              <span key={s} className="block">
                {s}
              </span>
            ))}
          </h1>
          <p className="type-body mt-7 max-w-[34rem] text-[17px] text-chalk/80 md:text-[19px]">
            {copy.hero.subhead}
          </p>
          <div className="mt-9 flex flex-col items-start gap-4">
            <CtaLink location="hero" className="btn-primary h-14 px-8 text-[17px]">
              {copy.hero.button}
            </CtaLink>
            <p className="text-sm text-balance text-fog">{copy.hero.microcopy}</p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:col-span-5 lg:max-w-[340px] lg:justify-self-end">
          <RouteGlow />
          <div className="load-phone relative" aria-hidden="true">
            <PhoneFrame>
              <DriveCard drive={drive} variant="feed" priority headingLevel="p" sizes="320px" />
              {next && (
                <div className="mt-2 border-t border-graphite">
                  <DriveCard drive={next} variant="feed" headingLevel="p" sizes="320px" />
                </div>
              )}
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
