import { copy } from "@/content/copy";

/** Three linked steps, joined by one thin orange line. No numbers. */
export function Thesis() {
  const steps = copy.thesis.chain;
  return (
    <section aria-labelledby="thesis-title" className="page-x section-y">
      <h2 id="thesis-title" className="h2 max-w-[17ch] text-chalk lg:max-w-[20ch]">
        {copy.thesis.h2}
      </h2>
      <p className="type-body mt-6 text-chalk/80 lg:max-w-[58ch]">{copy.thesis.body}</p>

      <ol className="relative mt-16 grid gap-12 lg:mt-24 lg:grid-cols-3 lg:gap-8">
        {steps.map((step, i) => (
          <li key={step.title} className="relative pl-10 lg:pt-12 lg:pl-0">
            {i < steps.length - 1 && (
              // One continuous line: each step draws the segment to the next node.
              <span
                aria-hidden="true"
                className="absolute top-[8px] -bottom-12 left-[7px] w-px bg-signal lg:top-[7px] lg:bottom-auto lg:left-[8px] lg:h-px lg:w-[calc(100%+2rem)]"
              />
            )}
            <span
              aria-hidden="true"
              className="absolute top-1 left-0 h-[15px] w-[15px] rounded-full border-2 border-signal bg-asphalt lg:top-0"
            />
            <h3 className="h3 text-chalk">{step.title}</h3>
            <p className="mt-2.5 max-w-[30ch] text-fog">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
