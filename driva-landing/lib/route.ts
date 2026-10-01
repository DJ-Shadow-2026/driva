import type { RoutePoints } from "@/content/demo-drives";

/** Turn 0 to 100 box points into an SVG path, scaled to the given size. */
export function routeToPath(points: RoutePoints, size = 100): string {
  const k = size / 100;
  return points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${(x * k).toFixed(1)} ${(y * k).toFixed(1)}`)
    .join("");
}

/** Pull the number out of a stat string like "46.1 mi" or "40 mph". */
export function parseNumber(value: string): { value: number; decimals: number; unit: string } {
  const match = value.match(/([\d.]+)\s*(.*)/);
  if (!match) return { value: 0, decimals: 0, unit: value };
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { value: parseFloat(match[1]), decimals, unit: match[2] };
}

/** Parse a duration like "1h 09m" or "58m" into minutes. */
export function parseMinutes(value: string): number {
  const h = value.match(/(\d+)\s*h/);
  const m = value.match(/(\d+)\s*m/);
  return (h ? parseInt(h[1], 10) * 60 : 0) + (m ? parseInt(m[1], 10) : 0);
}

/** Format minutes the way the app does: "58m", "1h 09m". */
export function formatMinutes(total: number): string {
  const mins = Math.round(total);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
}
