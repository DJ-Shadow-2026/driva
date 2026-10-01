import Link from "next/link";
import { legalBack, legalBanner, type LegalDoc } from "@/content/legal";
import { Footer } from "./sections/footer";
import { DrivaLockup } from "./logo";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <div role="note" className="border-b border-founding/40 bg-tarmac">
        <p className="page-x py-3 text-sm font-medium text-founding">{legalBanner}</p>
      </div>
      <header className="page-x flex h-16 items-center justify-between md:h-[72px]">
        <Link href="/" aria-label={legalBack} className="-m-2 rounded-lg p-2">
          <DrivaLockup size="sm" />
        </Link>
        <Link href="/" className="rounded-sm text-sm text-fog hover:text-chalk">
          {legalBack}
        </Link>
      </header>
      <main className="page-x pt-12 pb-24 lg:pt-20 lg:pb-32">
        <h1 className="h2 text-chalk">{doc.title}</h1>
        <p className="mt-4 text-sm text-fog">{doc.updated}</p>
        <div className="mt-12 grid max-w-[68ch] gap-10">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="type-point text-[20px] text-chalk">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 text-chalk/80">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
