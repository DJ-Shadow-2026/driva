"use client";

import { Plus } from "lucide-react";
import { copy } from "@/content/copy";
import { track } from "@/lib/analytics";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="page-x section-y">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <h2 id="faq-title" className="h2 text-chalk lg:col-span-4">
          {copy.faq.h2}
        </h2>
        <div className="border-t border-graphite lg:col-span-8">
          {copy.faq.items.map((item) => (
            <details
              key={item.q}
              className="group border-b border-graphite"
              onToggle={(e) => {
                if (e.currentTarget.open) track("faq_opened", { question: item.q });
              }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-6 text-[18px] font-semibold text-chalk [&::-webkit-details-marker]:hidden lg:text-[20px]">
                <span style={{ fontVariationSettings: '"wdth" 112' }}>{item.q}</span>
                <Plus
                  className="h-5 w-5 shrink-0 text-fog transition-transform duration-200 group-open:rotate-45"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </summary>
              <p className="type-body -mt-1 pb-7 pr-10 text-chalk/75">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
