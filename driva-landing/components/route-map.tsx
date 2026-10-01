"use client";

import { useEffect, useRef } from "react";
import { m, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";

// A stylized, Miami-inspired street grid. Abstract: no map tiles, no API keys.
// viewBox is 800 x 600. Downtown grid on the left, Biscayne Bay in the middle,
// a barrier island and the ocean on the right, two causeways across the bay.

const GRID_X = Array.from({ length: 10 }, (_, i) => 32 + i * 32); // downtown avenues
const GRID_Y = Array.from({ length: 16 }, (_, i) => 20 + i * 36); // streets, shared with the island
const ISLAND_X = [704, 736];
const MAJOR_X = new Set([96, 192, 288]);
const MAJOR_Y = new Set([236, 344, 416, 488]);

const BAY =
  "M338 -10C300 60 352 120 336 190C322 250 300 300 318 360C336 420 296 470 312 530C320 570 330 590 326 610H666C690 540 640 480 660 410C680 340 640 300 664 220C684 150 650 80 672 -10Z";
const OCEAN = "M772 -10C752 100 790 180 770 280C752 380 790 460 768 560L766 610H810V-10Z";
const CAUSEWAY_NORTH = "M322 236C430 236 540 200 668 200";
const CAUSEWAY_SOUTH = "M668 380C540 380 430 416 326 416";
const ISLETS = [
  { cx: 452, cy: 222, rx: 30, ry: 11 },
  { cx: 548, cy: 206, rx: 22, ry: 9 },
  { cx: 500, cy: 300, rx: 16, ry: 26 },
];

// City grid, out across the north causeway, up the island, and back over the
// south causeway toward the downtown grid.
const ROUTE = [
  "M96 524V452H192V344H288V236H322",
  CAUSEWAY_NORTH.replace(/^M322 236/, ""),
  "H704V128H736V380H668",
  CAUSEWAY_SOUTH.replace(/^M668 380/, ""),
  "H256V488H160",
].join("");
const ROUTE_START = { x: 96, y: 524 };
const ROUTE_END = { x: 160, y: 488 };

export function RouteMap({
  progress,
  label,
  onComplete,
}: {
  /** 0 to 1. Omit to render the finished route statically. */
  progress?: MotionValue<number>;
  label: string;
  onComplete?: () => void;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const completed = useRef(false);
  const finished = useMotionValue(1);
  const animated = Boolean(progress);
  const source = progress ?? finished;
  const opacity = useTransform(source, [0, 0.02], [0, 1]);
  const endOpacity = useTransform(source, [0.97, 1], [0, 1]);

  const placeDot = (v: number) => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;
    const p = path.getPointAtLength(path.getTotalLength() * Math.min(Math.max(v, 0), 1));
    dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
  };

  useMotionValueEvent(source, "change", (v) => {
    placeDot(v);
    if (v >= 1 && !completed.current) {
      completed.current = true;
      onComplete?.();
    }
  });

  useEffect(() => {
    placeDot(source.get());
  });

  return (
    <svg viewBox="0 0 800 600" className="block h-full w-full" role="img" aria-label={label}>
      <defs>
        <filter id="route-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <radialGradient id="dot-glow">
          <stop offset="0" stopColor="var(--signal-hot)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--signal-hot)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="600" fill="var(--asphalt)" />

      {/* Streets */}
      <g stroke="var(--graphite)" strokeLinecap="square">
        {GRID_X.map((x) => (
          <line key={`x${x}`} x1={x} y1={0} x2={x} y2={600} strokeWidth={MAJOR_X.has(x) ? 3 : 1.5} strokeOpacity={MAJOR_X.has(x) ? 1 : 0.6} />
        ))}
        {GRID_Y.map((y) => (
          <line key={`y${y}`} x1={0} y1={y} x2={800} y2={y} strokeWidth={MAJOR_Y.has(y) ? 3 : 1.5} strokeOpacity={MAJOR_Y.has(y) ? 1 : 0.6} />
        ))}
        {ISLAND_X.map((x) => (
          <line key={`i${x}`} x1={x} y1={0} x2={x} y2={600} strokeWidth={3} />
        ))}
        <path d="M0 600L250 300L320 60" fill="none" strokeWidth={3} />
      </g>

      {/* Water: slightly lighter than land */}
      <path d={BAY} fill="var(--tarmac)" />
      <path d={OCEAN} fill="var(--tarmac)" />
      <g fill="var(--asphalt)" stroke="var(--graphite)" strokeWidth="1.5">
        {ISLETS.map((e) => (
          <ellipse key={`${e.cx}-${e.cy}`} {...e} />
        ))}
      </g>

      {/* Causeways */}
      <g fill="none" stroke="var(--graphite)" strokeWidth="6" strokeLinecap="round">
        <path d={CAUSEWAY_NORTH} />
        <path d={CAUSEWAY_SOUTH} />
      </g>

      {/* Route */}
      <m.path
        d={ROUTE}
        fill="none"
        stroke="var(--signal-hot)"
        strokeOpacity="0.5"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#route-glow)"
        style={animated ? { pathLength: source, opacity } : undefined}
      />
      <m.path
        ref={pathRef}
        d={ROUTE}
        fill="none"
        stroke="var(--signal)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={animated ? { pathLength: source, opacity } : undefined}
      />

      <circle cx={ROUTE_START.x} cy={ROUTE_START.y} r="7" fill="var(--chalk)" stroke="var(--asphalt)" strokeWidth="3" />
      <m.circle
        cx={ROUTE_END.x}
        cy={ROUTE_END.y}
        r="7"
        fill="var(--signal-hot)"
        stroke="var(--asphalt)"
        strokeWidth="3"
        style={animated ? { opacity: endOpacity } : undefined}
      />

      {/* Leading dot */}
      {animated && (
        <m.g ref={dotRef} style={{ opacity }}>
          <circle r="22" fill="url(#dot-glow)" />
          <circle r="6.5" fill="var(--chalk)" stroke="var(--signal)" strokeWidth="3" />
        </m.g>
      )}
    </svg>
  );
}
