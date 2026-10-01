import { copy } from "@/content/copy";

/** Future features. Quieter than the live sections above, and tagged as such. */
export function Coming() {
  return (
    <section aria-labelledby="coming-title" className="page-x section-y">
      <h2 id="coming-title" className="h2 text-chalk">
        {copy.coming.h2}
      </h2>
      <p className="type-body mt-5 text-fog">{copy.coming.subhead}</p>

      <ul className="mt-12 grid border-t border-graphite md:grid-cols-2 lg:mt-16">
        {copy.coming.items.map((item, i) => (
          <li
            key={item.title}
            className={`border-b border-graphite py-8 md:py-10 ${
              i % 2 === 0 ? "md:border-r md:pr-10" : "md:pl-10"
            }`}
          >
            <span className="inline-block rounded-tag border border-graphite px-2 py-1 text-xs leading-none text-fog">
              {copy.coming.tag}
            </span>
            <h3 className="type-point mt-4 text-[19px] text-chalk/90 lg:text-[20px]">{item.title}</h3>
            <p className="mt-2.5 max-w-[44ch] text-[16px] text-fog">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
