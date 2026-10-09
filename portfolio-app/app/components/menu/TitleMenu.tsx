"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import clsx from "clsx";
import { sections } from "@/constants";
import { sectionHref } from "@/lib/sections";
import { useMenuKeys } from "@/lib/useMenuKeys";

const ITEM_HEIGHT = 52;

export default function TitleMenu() {
  const router = useRouter();
  const [focused, setFocused] = useState(0);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const move = (offset: number) => {
    const next = (focused + offset + sections.length) % sections.length;
    setFocused(next);
    itemRefs.current[next]?.focus();
  };

  useMenuKeys({
    up: (e) => {
      e.preventDefault();
      move(-1);
    },
    down: (e) => {
      e.preventDefault();
      move(1);
    },
    // A focused link already opens on Enter; this covers Enter before anything has focus.
    enter: (e) => {
      if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) return;
      router.push(sectionHref(sections[focused].id));
    },
  });

  return (
    <nav aria-label="Main menu">
      <ul className="relative flex flex-col items-center">
        {/* Selection bar follows hover and keyboard focus */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto w-[240px] border-y bg-[linear-gradient(90deg,transparent,rgb(154_118_56/0.85)_18%,rgb(154_118_56/0.85)_82%,transparent)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [border-image:linear-gradient(90deg,transparent,rgb(243_226_181/0.7),transparent)_1]"
          style={{ height: ITEM_HEIGHT, transform: `translateY(${focused * ITEM_HEIGHT}px)` }}
        />
        {sections.map((section, i) => (
          <li key={section.id} className="relative">
            <Link
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              href={sectionHref(section.id)}
              onMouseEnter={() => setFocused(i)}
              onFocus={() => setFocused(i)}
              className={clsx(
                "flex w-[240px] items-center justify-center font-display text-[15px] uppercase tracking-[0.35em] transition-colors duration-200 focus-visible:outline-offset-0",
                i === focused ? "text-gold-100 text-glow" : "text-parchment-200/85",
              )}
              style={{ height: ITEM_HEIGHT }}
            >
              <span className="-mr-[0.35em]">{section.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
