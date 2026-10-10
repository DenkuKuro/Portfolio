"use client";

import { useSearchParams } from "next/navigation";
import { useLayoutEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import type { Project } from "@/constants";
import CarouselArrow from "./CarouselArrow";
import CarouselDots from "./CarouselDots";
import ProjectCard from "./ProjectCard";
import { mod, slotFor, wrapOffset } from "./carousel-math";

// `scale` is the root font size over 16px (0.75 on desktop), so px geometry tracks the rem-based styles.
type Layout = { cardWidth: number; spread: number; reach: number; compact: boolean; scale: number };

const DESKTOP: Layout = { cardWidth: 520, spread: 400, reach: 2, compact: false, scale: 1 };
const SWIPE_DISTANCE = 50; // px
const SWIPE_VELOCITY = 500; // px/s
// Unscaled px; multiplied by Layout.scale where used.
const ARROW_SIZE = 80; // CarouselArrow hit area (size-20)
const STAGE_PAD_TOP = 8; // stage pt-2
const MIN_IMAGE_HEIGHT = 88; // below this the page scrolls rather than squash the screenshot further

// Image height that makes the whole page fit the viewport: the page's natural height minus the current
// image height is everything else, and the image gets whatever the viewport has left.
function fitImageHeight(stage: HTMLElement, scale: number): number | null {
  const main = stage.closest("main");
  const image = stage.querySelector<HTMLElement>("[data-active] [data-card-image]");
  if (!main || !image || !main.firstElementChild || !main.lastElementChild) return null;
  // main is flex-1 and centres its content, so discount any space it is stretched by.
  const style = getComputedStyle(main);
  const used =
    main.lastElementChild.getBoundingClientRect().bottom - main.firstElementChild.getBoundingClientRect().top;
  const stretch = main.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - used;
  const pageHeight = document.documentElement.scrollHeight - Math.max(stretch, 0);
  const rest = pageHeight - image.offsetHeight;
  return Math.max(MIN_IMAGE_HEIGHT * scale, Math.floor(window.innerHeight - rest));
}

// Breakpoints follow the viewport; the phone layout is sized from the (full-bleed) stage width.
function layoutFor(viewport: number, stage: number, scale: number): Layout {
  if (viewport >= 1280) return { cardWidth: 520 * scale, spread: 400 * scale, reach: 2, compact: false, scale };
  if (viewport >= 1024) return { cardWidth: 460 * scale, spread: 340 * scale, reach: 2, compact: false, scale };
  if (viewport >= 768) return { cardWidth: 440 * scale, spread: 300 * scale, reach: 1, compact: false, scale };
  const cardWidth = Math.min(stage * 0.86, 400);
  // Neighbours (scale 0.8) peek 6% of the stage in from each edge.
  const spread = stage * 0.44 + (cardWidth * 0.8) / 2;
  return { cardWidth, spread, reach: 1, compact: true, scale };
}

type Drag = { id: number; x: number; y: number; t: number; dragging: boolean };

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const n = projects.length;
  const searchParams = useSearchParams();
  const [active, setActive] = useState(() => Math.max(projects.findIndex((p) => p.slug === searchParams.get("item")), 0));
  const [layout, setLayout] = useState<Layout | null>(null);
  const [dragX, setDragX] = useState(0);
  const [cardHeight, setCardHeight] = useState<number | null>(null);
  const [fitHeight, setFitHeight] = useState<number | null>(null);
  const regionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const update = () => {
      const scale = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16;
      setLayout(layoutFor(window.innerWidth, stage.clientWidth, scale));
      // Phones scroll anyway; keep their screenshots at full 16:9.
      setFitHeight(window.innerWidth >= 768 ? fitImageHeight(stage, scale) : null);
    };
    // The stage resizes with the viewport width, font loading and the fitted image; height-only
    // viewport changes only reach the window resize event.
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // Arrows centre on the active card's full height, which varies with wrapped chips.
  useLayoutEffect(() => {
    const card = stageRef.current?.querySelector<HTMLElement>("[data-active]");
    if (!card) return;
    const observer = new ResizeObserver(() => setCardHeight(card.offsetHeight));
    observer.observe(card);
    return () => observer.disconnect();
  }, [active]);

  const { cardWidth, spread, reach, compact, scale } = layout ?? DESKTOP;
  const imageHeight = Math.min(fitHeight ?? Infinity, (cardWidth * 9) / 16);
  const current = projects[active];

  function go(index: number) {
    const next = mod(index, n);
    setActive(next);
    // Native replaceState syncs with useSearchParams without a server round trip or a history entry.
    window.history.replaceState(null, "", `?item=${projects[next].slug}`);
  }
  const prev = () => go(active - 1);
  const next = () => go(active + 1);

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    const moves: Record<string, () => void> = {
      ArrowLeft: prev,
      ArrowRight: next,
      Home: () => go(0),
      End: () => go(n - 1),
    };
    const move = moves[event.key];
    if (!move || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    // Handled here, so the section-level ←/→ tab cycling ignores it.
    event.preventDefault();
    event.stopPropagation();
    move();
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, t: event.timeStamp, dragging: false };
    suppressClick.current = false;
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    const dx = event.clientX - d.x;
    const dy = event.clientY - d.y;
    if (!d.dragging) {
      // Mostly vertical: leave it to page scroll.
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) drag.current = null;
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy)) return;
      d.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setDragX(dx);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    drag.current = null;
    if (!d?.dragging) return;
    suppressClick.current = true;
    setDragX(0);
    const dx = event.clientX - d.x;
    const velocity = (Math.abs(dx) / Math.max(event.timeStamp - d.t, 1)) * 1000;
    if (Math.abs(dx) > SWIPE_DISTANCE || velocity > SWIPE_VELOCITY) go(active + (dx < 0 ? 1 : -1));
  }

  function onPointerCancel() {
    drag.current = null;
    setDragX(0);
  }

  // A drag that ends on a button or link must not also click it.
  function onClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    event.preventDefault();
    event.stopPropagation();
  }

  // Each arrow sits over the middle of its neighbour card, level with the active card's centre.
  const arrowSize = ARROW_SIZE * scale;
  const arrowInset = `calc(50% - ${spread + arrowSize / 2}px)`;
  const arrowTop = STAGE_PAD_TOP * scale + (cardHeight ?? cardWidth * 1.09) / 2 - arrowSize / 2;
  const dots = (
    <CarouselDots count={n} active={active} onSelect={go} labels={projects.map((p) => p.name)} />
  );

  return (
    <section
      ref={regionRef}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="Projects"
      onKeyDown={onKeyDown}
      className="-mt-4 flex w-full [@media(max-height:820px)]:-mt-6 animate-rise flex-col items-center outline-none [animation-delay:80ms]"
    >
      <p aria-live="polite" className="sr-only">
        Project {active + 1} of {n}: {current.name}
      </p>

      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onClickCapture={onClickCapture}
        className="relative -mx-4 grid w-[calc(100%+2rem)] touch-pan-y select-none overflow-x-clip pb-3 pt-2 sm:-mx-8 sm:w-[calc(100%+4rem)] lg:-mx-[4.5rem] lg:w-[calc(100%+9rem)]"
      >
        {projects.map((project, i) => {
          const offset = wrapOffset(i, active, n);
          return (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              total={n}
              slot={slotFor(offset, spread, reach)}
              isActive={offset === 0}
              width={cardWidth}
              imageHeight={imageHeight}
              dragX={dragX}
              animate={layout !== null && dragX === 0}
              onSelect={() => {
                go(i);
                regionRef.current?.focus({ preventScroll: true });
              }}
            />
          );
        })}

        {!compact && n > 1 && (
          <>
            <CarouselArrow
              direction="prev"
              onClick={prev}
              className="absolute z-30 transition-[top] duration-300"
              style={{ left: arrowInset, top: arrowTop }}
            />
            <CarouselArrow
              direction="next"
              onClick={next}
              className="absolute z-30 transition-[top] duration-300"
              style={{ right: arrowInset, top: arrowTop }}
            />
          </>
        )}
      </div>

      {n > 1 && (
        <div className="mt-1 flex items-center gap-2">
          {compact && <CarouselArrow direction="prev" onClick={prev} small />}
          {dots}
          {compact && <CarouselArrow direction="next" onClick={next} small />}
        </div>
      )}
    </section>
  );
}
