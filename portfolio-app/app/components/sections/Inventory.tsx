"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, type KeyboardEvent } from "react";
import clsx from "clsx";
import Button from "@/app/components/ui/Button";
import Label from "@/app/components/ui/Label";
import type { Project } from "@/constants";

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const MIN_SLOTS = 6;

export default function Inventory({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const slotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);

  const requested = projects.findIndex((p) => p.slug === searchParams.get("item"));
  const selectedIndex = requested === -1 ? 0 : requested;
  const selected = projects[selectedIndex];
  const emptySlots = Math.max(MIN_SLOTS - projects.length, 0);

  function select(index: number, { reveal = false } = {}) {
    router.replace(`${pathname}?item=${projects[index].slug}`, { scroll: false });
    // Below lg the detail sits under the grid; bring it into view on tap.
    if (reveal && window.matchMedia("(max-width: 1023px)").matches) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function onGridKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const columns = window.matchMedia("(min-width: 1024px)").matches ? 3 : 2;
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -columns, ArrowDown: columns };
    const move = moves[event.key];
    if (move === undefined) return;
    // Mark as handled so the section-level ←/→ tab cycling ignores it.
    event.preventDefault();
    const next = selectedIndex + move;
    if (next < 0 || next >= projects.length) return;
    select(next);
    slotRefs.current[next]?.focus();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,500px)_1fr] lg:gap-12">
      <div>
        <Label>Inventory · {projects.length} items</Label>
        <div
          role="group"
          aria-label="Projects"
          onKeyDown={onGridKeyDown}
          className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3"
        >
          {projects.map((project, i) => {
            const active = i === selectedIndex;
            return (
              <button
                key={project.slug}
                ref={(el) => {
                  slotRefs.current[i] = el;
                }}
                type="button"
                aria-pressed={active}
                tabIndex={active ? 0 : -1}
                onClick={() => select(i, { reveal: true })}
                className={clsx(
                  "flex h-[158px] flex-col items-center justify-between border px-3 py-4 text-center transition-[border-color,box-shadow,background-color] duration-200",
                  active
                    ? "bg-gold-active border-gold-300/70 shadow-glow"
                    : "border-gold-400/30 bg-ink/40 hover:border-gold-400/70 hover:bg-gold-400/5",
                )}
              >
                <span className={clsx("font-display text-[11px] tracking-[0.25em]", active ? "text-gold-100" : "text-dim")}>
                  {numerals[i] ?? i + 1}
                </span>
                <span
                  aria-hidden
                  className={clsx(
                    "flex size-9 rotate-45 items-center justify-center border",
                    active ? "border-gold-100/80" : "border-gold-400/60",
                  )}
                >
                  <span className={clsx("size-3 border", active ? "border-gold-100 bg-gold-200/40" : "border-gold-400/70")} />
                </span>
                <span
                  className={clsx(
                    "font-display text-[12px] uppercase leading-snug tracking-[0.12em]",
                    active ? "text-gold-100" : "text-parchment-200",
                  )}
                >
                  {project.short}
                </span>
              </button>
            );
          })}
          {Array.from({ length: emptySlots }, (_, i) => (
            <div key={`empty-${i}`} aria-hidden className="h-[158px] border border-dashed border-gold-400/15 bg-ink/20" />
          ))}
        </div>
      </div>

      <div ref={detailRef} aria-live="polite" className="scroll-mt-32 border-gold-400/20 lg:border-l lg:pl-12">
        <Label tone="dim">{selected.type}</Label>
        <h2 className="mt-3 font-display text-[26px] font-medium uppercase tracking-[0.18em] text-gold-200 text-glow">
          {selected.title}
        </h2>
        <p className="mt-1 font-body text-[19px] italic text-muted">{selected.status}</p>
        <p className="mt-5 font-body text-[20px] leading-normal text-parchment-200">{selected.description}</p>

        <Label as="h3" className="mt-7">
          Forged with
        </Label>
        <ul className="mt-3 flex flex-wrap gap-2">
          {selected.tech.map((tech) => (
            <li
              key={tech}
              className="border border-gold-400/40 bg-ink/40 px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.18em] text-gold-300"
            >
              {tech}
            </li>
          ))}
        </ul>

        {(selected.details || selected.link) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {selected.details && (
              <Button href={selected.details} external>
                Details
              </Button>
            )}
            {selected.link && (
              <Button href={selected.link} external variant={selected.details ? "ghost" : "gold"}>
                Source
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
