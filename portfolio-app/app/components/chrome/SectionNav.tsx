"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { sections } from "@/constants";
import { sectionHref, sectionIndexFromPath } from "@/lib/sections";
import { useMenuKeys } from "@/lib/useMenuKeys";

export default function SectionNav() {
  const pathname = usePathname();
  const router = useRouter();
  const activeIndex = sectionIndexFromPath(pathname);
  const activeRef = useRef<HTMLAnchorElement>(null);

  const go = (offset: number) => {
    const next = (Math.max(activeIndex, 0) + offset + sections.length) % sections.length;
    router.push(sectionHref(sections[next].id));
  };

  useMenuKeys({
    left: () => go(-1),
    right: () => go(1),
    escape: () => router.push("/"),
  });

  // On narrow screens the tabs are a scroll strip; keep the active one visible.
  useEffect(() => {
    const tab = activeRef.current;
    const strip = tab?.parentElement?.parentElement;
    if (!tab || !strip || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [pathname]);

  return (
    <nav aria-label="Sections" className="min-w-0">
      <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 py-1 [scrollbar-width:none] lg:mx-0 lg:justify-center lg:overflow-visible lg:px-0">
        {sections.map((section, i) => {
          const active = i === activeIndex;
          return (
            <li key={section.id} className="shrink-0">
              <Link
                ref={active ? activeRef : undefined}
                href={sectionHref(section.id)}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "flex min-h-11 items-center border px-[1.375rem] py-[0.8125rem] font-display text-[0.8125rem] uppercase leading-none tracking-[0.3em] transition-[color,border-color,box-shadow] duration-200",
                  active
                    ? "bg-gold-active border-gold-400/60 text-gold-100 shadow-glow"
                    : "border-transparent text-parchment-200 hover:border-gold-400/40 hover:text-gold-200",
                )}
              >
                {section.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
