"use client";

import { useRef } from "react";
import {
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { copy } from "@/content/copy";
import { getDrive, signatureDriveId } from "@/content/demo-drives";
import { track } from "@/lib/analytics";
import { formatMinutes, parseMinutes, parseNumber } from "@/lib/route";
import { RouteMap } from "../route-map";

type StatSpec = { label: string; final: string; format: (t: number) => string };

function buildStats(): StatSpec[] {
  const drive = getDrive(signatureDriveId);
  const distance = parseNumber(drive.distance);
  const speed = parseNumber(drive.avgSpeed);
  const minutes = parseMinutes(drive.duration);
  return [
    {
      label: copy.ui.stats.distance,
      final: drive.distance,
      format: (t) => `${(distance.value * t).toFixed(distance.decimals)} ${distance.unit}`,
    },
    {
      label: copy.ui.stats.duration,
      final: drive.duration,
      format: (t) => formatMinutes(minutes * t),
    },
    {
      label: copy.ui.stats.avgSpeed,
      final: drive.avgSpeed,
      format: (t) => `${(speed.value * t).toFixed(speed.decimals)} ${speed.unit}`,
    },
  ];
}

function Stat({
  spec,
  progress,
  animate,
}: {
  spec: StatSpec;
  progress: MotionValue<number>;
  animate: boolean;
}) {
  const value = useTransform(progress, (t: number) => spec.format(t));
  return (
    <div>
      <dt className="text-sm text-fog">{spec.label}</dt>
      <dd className="type-data mt-1 grid text-[23px] leading-none whitespace-nowrap text-chalk min-[400px]:text-[26px] md:text-d3">
        {/* The final value reserves the width, so the counter never shifts layout. */}
        <span className="invisible col-start-1 row-start-1" aria-hidden="true">
          {spec.final}
        </span>
        {animate ? (
          <>
            <m.span className="col-start-1 row-start-1" aria-hidden="true">
              {value}
            </m.span>
            <span className="sr-only">{spec.final}</span>
          </>
        ) : (
          <span className="col-start-1 row-start-1">{spec.final}</span>
        )}
      </dd>
    </div>
  );
}

function Intro({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <h2 className="h2 text-chalk">{copy.track.h2}</h2>
      <p className="type-body mt-6 text-chalk/80">{copy.track.body}</p>
    </div>
  );
}

/** The signature moment: the route draws itself as you scroll. */
export function Track() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const drawn = useTransform(scrollYProgress, [0.06, 0.82], [0, 1], { clamp: true });
  const animate = !reduced;
  const stats = buildStats();

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="pt-24 lg:pt-12">
        <Intro className="page-x lg:hidden" />

        <div ref={trackRef} className={animate ? "relative h-[160vh] lg:h-[220vh]" : ""}>
          <div
            className={`${animate ? "sticky top-0 h-svh" : "py-16"} flex items-center pt-16 lg:pt-[72px]`}
          >
            <div className="page-x grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-center">
              <Intro className="hidden lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:block lg:self-end" />

              <figure className="lg:col-span-7 lg:col-start-6 lg:row-span-3 lg:row-start-1">
                <div className="aspect-[4/3] overflow-hidden rounded-card border border-graphite">
                  <RouteMap
                    progress={animate ? drawn : undefined}
                    label={copy.track.mapLabel}
                    onComplete={() => track("route_section_completed")}
                  />
                </div>
                <figcaption className="mt-3 text-sm text-fog">{copy.track.caption}</figcaption>
              </figure>

              <dl className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:mt-6 lg:gap-6">
                {stats.map((s) => (
                  <Stat key={s.label} spec={s} progress={drawn} animate={animate} />
                ))}
              </dl>

              <p className="text-sm text-fog lg:col-span-5 lg:col-start-1 lg:row-start-3 lg:self-start">
                {copy.track.footnote}
              </p>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
