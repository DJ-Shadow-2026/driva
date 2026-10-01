"use client";

import { useEffect, useState } from "react";
import { copy } from "@/content/copy";
import { CtaLink } from "../cta-link";
import { DrivaLockup } from "../logo";

/** Sticky nav: transparent at the top, asphalt with a graphite hairline after 24px. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "border-graphite bg-asphalt/95 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="page-x flex h-16 items-center justify-between md:h-[72px]">
        <a href="#top" aria-label={copy.nav.homeLabel} className="-m-2 rounded-lg p-2">
          <DrivaLockup size="sm" />
        </a>
        <CtaLink location="nav" className="btn-primary h-10 px-4 text-[15px] md:h-11 md:px-5">
          {copy.nav.button}
        </CtaLink>
      </nav>
    </header>
  );
}
