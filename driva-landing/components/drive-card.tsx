import Image from "next/image";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { copy } from "@/content/copy";
import type { DemoDrive } from "@/content/demo-drives";
import { FoundingBadge } from "./founding-badge";
import { RouteThumb } from "./route-thumb";
import { VerifiedBadge } from "./verified-badge";

/**
 * The elevated drive post. `feed` is the full-width row inside the phone;
 * `card` is the standalone, rounded version used on the page.
 */
export function DriveCard({
  drive,
  variant = "card",
  priority = false,
  sizes = "(min-width: 1024px) 380px, 86vw",
  headingLevel = "h3",
}: {
  drive: DemoDrive;
  variant?: "feed" | "card";
  priority?: boolean;
  sizes?: string;
  headingLevel?: "h3" | "p";
}) {
  const Title = headingLevel;
  const shell =
    variant === "card"
      ? "overflow-hidden rounded-card border border-graphite bg-tarmac"
      : "bg-tarmac";
  const stats = [
    { label: copy.ui.stats.distance, value: drive.distance },
    { label: copy.ui.stats.duration, value: drive.duration },
    { label: copy.ui.stats.avgSpeed, value: drive.avgSpeed },
  ];

  return (
    <article className={`relative flex h-full flex-col ${shell}`}>
      <header className="flex items-start gap-3 px-4 pt-4">
        <Image
          src={drive.avatar}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[15px] leading-tight font-semibold text-chalk">{drive.name}</span>
            {drive.foundingMember && <FoundingBadge />}
          </div>
          <span className="text-xs text-fog">{drive.handle}</span>
        </div>
        <span className="shrink-0 pt-0.5 text-xs text-fog">{drive.postedAt}</span>
      </header>

      <div className="px-4 pt-3.5">
        <span className="block text-xs text-fog">{copy.ui.drove}</span>
        <span className="mt-0.5 flex items-center gap-1.5 text-[15px] font-semibold text-chalk">
          {drive.car}
          {drive.verified && <VerifiedBadge />}
        </span>
        <Title className="type-display mt-2.5 text-[21px] leading-[1.12] text-chalk">{drive.title}</Title>
      </div>

      <div className="relative mt-3.5 aspect-[3/2] w-full overflow-hidden bg-graphite">
        <Image
          src={drive.photo}
          alt={drive.photoAlt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-asphalt/95 via-asphalt/55 to-transparent" />
        <RouteThumb
          route={drive.route}
          className="absolute top-2.5 right-2.5 h-14 w-14 rounded-thumb border border-chalk/10 bg-asphalt/85 shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
        />
        <dl className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-2 px-4 pb-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-[12px] leading-tight text-chalk/75">{s.label}</dt>
              <dd className="type-data text-[19px] leading-tight text-chalk">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="px-4 pt-3.5 text-[15px] leading-[1.5] text-chalk/90">{drive.caption}</p>

      <footer className="mt-auto flex items-center gap-6 px-4 pt-3.5 pb-4 text-[14px] text-fog">
        <span className="inline-flex items-center gap-1.5">
          <Heart className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
          <span className="tabular-nums">{drive.likes}</span>
          <span className="sr-only">{copy.ui.likes}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
          {drive.comments > 0 && (
            <>
              <span className="tabular-nums">{drive.comments}</span>
              <span className="sr-only">{copy.ui.comments}</span>
            </>
          )}
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5">
          <Share2 className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
          {copy.ui.share}
        </span>
      </footer>
    </article>
  );
}
