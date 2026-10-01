import Image from "next/image";
import { copy } from "@/content/copy";
import { demoGarage, getDrive } from "@/content/demo-drives";
import { VerifiedBadge } from "../verified-badge";

function GarageCard() {
  const drive = getDrive(demoGarage.driveId);
  return (
    <figure className="overflow-hidden rounded-card border border-graphite bg-tarmac">
      <div className="relative aspect-[3/2]">
        <Image
          src={drive.photo}
          alt={drive.photoAlt}
          fill
          sizes="(min-width: 1024px) 460px, 92vw"
          className="object-cover"
        />
        <VerifiedBadge variant="pill" className="absolute top-3 left-3" />
      </div>
      <figcaption className="px-5 pt-5 pb-5">
        <p className="flex gap-4 text-xs text-fog">
          <span>{demoGarage.year}</span>
          <span>{demoGarage.color}</span>
        </p>
        <p className="mt-1.5 flex items-center gap-2">
          <span className="type-display text-[24px] leading-tight text-chalk">{demoGarage.model}</span>
          <VerifiedBadge />
        </p>
        <dl className="mt-5 grid grid-cols-2 border-t border-graphite pt-4">
          <div>
            <dt className="text-xs text-fog">{copy.ui.garage.drivaMiles}</dt>
            <dd className="type-data mt-0.5 text-[22px] text-chalk">{demoGarage.drivaMiles}</dd>
          </div>
          <div className="border-l border-graphite pl-5">
            <dt className="text-xs text-fog">{copy.ui.garage.drives}</dt>
            <dd className="type-data mt-0.5 text-[22px] text-chalk">{demoGarage.drives}</dd>
          </div>
        </dl>
      </figcaption>
    </figure>
  );
}

export function Garage() {
  return (
    <section aria-labelledby="garage-title" className="page-x section-y">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:gap-y-12">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end">
          <h2 id="garage-title" className="h2 text-chalk">
            {copy.garage.h2}
          </h2>
          <p className="type-body mt-6 text-chalk/80">{copy.garage.body}</p>
        </div>
        <div className="lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <GarageCard />
        </div>
        <ul className="grid gap-8 sm:grid-cols-2 sm:gap-x-8 lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:gap-y-10 lg:self-start">
          {copy.garage.points.map((p) => (
            <li key={p.title}>
              <h3 className="type-point flex items-start gap-2 text-[17px] text-chalk lg:text-[18px]">
                {p.title}
              </h3>
              <p className="mt-1.5 text-[16px] text-fog">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
