import { copy } from "@/content/copy";
import { CtaLink } from "../cta-link";
import { FoundingBadge } from "../founding-badge";

export function Founding() {
  return (
    <section aria-labelledby="founding-title" className="page-x section-y">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="w-full max-w-[300px] justify-self-center lg:col-span-5 lg:max-w-[380px]">
          <FoundingBadge size="lg" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 id="founding-title" className="h2 text-chalk">
            {copy.founding.h2}
          </h2>
          <p className="type-body mt-6 text-chalk/80">{copy.founding.body}</p>
          <CtaLink location="founding" className="btn-primary mt-9 h-14 px-8 text-[17px]">
            {copy.founding.button}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
