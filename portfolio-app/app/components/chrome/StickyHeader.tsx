"use client";

import { useSyncExternalStore, type ReactNode } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const isScrolled = () => window.scrollY > 4;

// Sticky at every size. Below lg it always has its dark band; from lg it stays transparent over the
// backdrop until the page scrolls, then gains the same band so content doesn't show through.
export default function StickyHeader({ children }: { children: ReactNode }) {
  const scrolled = useSyncExternalStore(subscribe, isScrolled, () => false);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-20 bg-ink/75 px-4 pb-3 pt-4 backdrop-blur-md transition-[background-color,backdrop-filter] duration-300 sm:px-8 lg:bg-transparent lg:px-[4.5rem] lg:pb-4 lg:pt-[2.125rem] lg:backdrop-blur-none lg:data-scrolled:bg-ink/75 lg:data-scrolled:backdrop-blur-md"
    >
      {children}
    </header>
  );
}
