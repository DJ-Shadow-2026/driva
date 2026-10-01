import { copy } from "@/content/copy";

export function Road() {
  return (
    <section aria-labelledby="road-title" className="page-x section-y">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <h2 id="road-title" className="h2 text-chalk lg:col-span-5">
          {copy.road.h2}
        </h2>
        <ul className="grid gap-10 lg:col-span-6 lg:col-start-7 lg:pt-2">
          {copy.road.points.map((p) => (
            <li key={p.title} className="border-l border-graphite pl-6">
              <h3 className="type-point text-[19px] text-chalk lg:text-[20px]">{p.title}</h3>
              <p className="type-body mt-2 text-chalk/75">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
