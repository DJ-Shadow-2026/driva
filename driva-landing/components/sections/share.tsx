import Image from "next/image";
import { copy } from "@/content/copy";
import { getDrive, shareDriveId } from "@/content/demo-drives";
import { DrivaLockup } from "../logo";
import { RouteThumb } from "../route-thumb";
import { VerifiedBadge } from "../verified-badge";

/** A static 9:16 share card in a tilted, Instagram-Story-style frame. */
function ShareCard() {
  const drive = getDrive(shareDriveId);
  const stats = [
    { label: copy.ui.stats.distance, value: drive.distance },
    { label: copy.ui.stats.duration, value: drive.duration },
    { label: copy.ui.stats.avgSpeed, value: drive.avgSpeed },
  ];

  return (
    <div className="relative mx-auto w-[min(78vw,300px)] lg:w-[320px]">
      <div className="relative aspect-[9/16] -rotate-[4deg] overflow-hidden rounded-story border border-graphite bg-asphalt shadow-[0_50px_100px_-30px_rgba(0,0,0,0.95)]">
        {/* Story chrome */}
        <div className="absolute inset-x-3 top-3 z-10 grid grid-cols-3 gap-1" aria-hidden="true">
          <span className="h-[3px] rounded-full bg-chalk" />
          <span className="h-[3px] rounded-full bg-chalk/30" />
          <span className="h-[3px] rounded-full bg-chalk/30" />
        </div>

        <div className="relative h-[42%]">
          <Image src={drive.photo} alt={drive.photoAlt} fill sizes="320px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-asphalt/50 via-transparent to-asphalt" />
          <p className="type-display absolute inset-x-5 bottom-1 text-[24px] leading-[1.05] text-chalk">
            {drive.title}
          </p>
        </div>

        <div className="flex h-[58%] flex-col px-5 pt-3 pb-5">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-chalk">
            {drive.car}
            <VerifiedBadge />
          </p>
          <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-[14px] border border-graphite bg-tarmac">
            <RouteThumb route={drive.route} className="h-full w-full" strokeWidth={3.5} />
          </div>
          <dl className="mt-3.5 grid grid-cols-3 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="text-[11px] text-fog">{s.label}</dt>
                <dd className="type-data text-[17px] leading-tight text-chalk">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex items-center justify-between border-t border-graphite pt-3.5">
            <span className="text-[13px] font-medium text-chalk">{drive.handle}</span>
            <DrivaLockup size="sm" className="scale-[0.85] origin-right" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Share() {
  return (
    <section aria-labelledby="share-title" className="page-x section-y">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <h2 id="share-title" className="h2 text-chalk">
            {copy.share.h2}
          </h2>
          <p className="type-body mt-6 text-chalk/80 lg:max-w-[46ch]">{copy.share.body}</p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <ShareCard />
        </div>
      </div>
    </section>
  );
}
