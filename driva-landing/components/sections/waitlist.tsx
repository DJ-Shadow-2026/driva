import { copy } from "@/content/copy";
import { WaitlistForm } from "../waitlist-form";

export function Waitlist() {
  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="page-x py-12 lg:py-20">
      <div className="grid gap-10 rounded-card border border-graphite bg-tarmac px-5 py-10 md:px-10 md:py-14 lg:grid-cols-12 lg:gap-8 lg:px-14 lg:py-20">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <h2 id="waitlist-title" className="h2 text-chalk">
            {copy.waitlist.h2}
          </h2>
          <p className="mt-5 text-[19px] text-chalk/80">{copy.waitlist.subhead}</p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
