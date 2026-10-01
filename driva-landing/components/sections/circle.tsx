import { copy } from "@/content/copy";
import { demoDrives } from "@/content/demo-drives";
import { DriveCard } from "../drive-card";

export function Circle() {
  return (
    <section aria-labelledby="circle-title" className="section-y">
      <div className="page-x">
        <h2 id="circle-title" className="h2 text-chalk">
          {copy.circle.h2}
        </h2>
        <p className="type-body mt-5 text-chalk/80">{copy.circle.subhead}</p>
      </div>

      {/* Mobile: scroll-snap with the next card peeking. Desktop: three columns. */}
      <ul
        tabIndex={0}
        aria-label={copy.circle.h2}
        className="no-scrollbar mx-auto mt-12 flex max-w-page snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 md:scroll-px-8 md:px-8 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible">
        {demoDrives.map((drive) => (
          <li key={drive.id} className="w-[84%] max-w-[380px] shrink-0 snap-start sm:w-[60%] lg:w-auto lg:max-w-none">
            <DriveCard drive={drive} sizes="(min-width: 1024px) 380px, (min-width: 640px) 60vw, 84vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
