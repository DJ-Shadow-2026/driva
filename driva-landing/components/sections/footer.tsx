import Link from "next/link";
import { copy } from "@/content/copy";
import { DrivaLockup } from "../logo";

export function Footer() {
  const { links } = copy.footer;
  const linkClass = "rounded-sm text-sm text-fog transition-colors hover:text-chalk";
  return (
    <footer className="border-t border-graphite">
      <div className="page-x flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <DrivaLockup size="md" />
          <p className="mt-4 text-sm text-fog">{copy.footer.line}</p>
        </div>
        <div className="flex flex-col gap-6 md:items-end">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            <li>
              <Link href="/privacy" className={linkClass}>
                {links.privacy}
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                {links.terms}
              </Link>
            </li>
            <li>
              <a href={links.instagramUrl} className={linkClass} rel="noopener noreferrer" target="_blank">
                {links.instagram}
              </a>
            </li>
            <li>
              <a href={`mailto:${copy.brand.email}`} className={linkClass}>
                {copy.brand.email}
              </a>
            </li>
          </ul>
          <p className="text-xs text-fog">{copy.footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}
