import type { RoutePoints } from "@/content/demo-drives";
import { routeToPath } from "@/lib/route";

/** Orange route on graphite: a small map tile signalling the route slide. */
export function RouteThumb({
  route,
  className = "",
  strokeWidth = 5,
}: {
  route: RoutePoints;
  className?: string;
  strokeWidth?: number;
}) {
  const d = routeToPath(route);
  const [sx, sy] = route[0];
  const [ex, ey] = route[route.length - 1];
  return (
    <svg viewBox="-8 -8 116 116" className={className} aria-hidden="true" focusable="false">
      <path d="M-8 30H108M-8 62H108M-8 90H108M20 -8V108M48 -8V108M78 -8V108" stroke="var(--graphite)" strokeWidth="1.5" opacity="0.9" />
      <path d={d} fill="none" stroke="var(--signal)" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={sx} cy={sy} r={strokeWidth * 0.9} fill="var(--chalk)" />
      <circle cx={ex} cy={ey} r={strokeWidth * 0.9} fill="var(--signal-hot)" stroke="var(--asphalt)" strokeWidth="2" />
    </svg>
  );
}
