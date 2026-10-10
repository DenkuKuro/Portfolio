# Projects Carousel — Implementation Plan

Oct 10, 2026 · @everyone

## Overview

The Projects page becomes a 3D-style carousel of image cards. It replaces the inventory grid in the main plan's Projects spec and Phase 5. Everything else on the page stays: header nav, "Chapter III — Relics Forged" title block, divider, footer and the dimmed landscape behind it.

One project is in focus at the centre as a full card with a screenshot. Its neighbours sit to the left and right, smaller and faded, and the carousel loops. Users move with the diamond arrows, the diamond dots, clicking a side card, arrow keys or swiping on touch.

**How to use this with Claude Code**

1. Export this doc as Markdown and save it as `docs/PROJECTS_CAROUSEL.md`, next to `docs/PLAN.md`.
2. Screenshot the "Projects — Carousel" artboard from the design canvas and keep it handy to attach.
3. Run the prompts in "Claude Code prompts" one at a time, checking the result in the browser after each.

No new dependencies are needed. It uses `motion` (already in the main plan) for the slide animation, with a plain CSS fallback.

## Behaviour spec

Every card is absolutely positioned at the stage centre. Its slot depends on its **offset** from the active card, wrapped so the carousel loops (with 6 projects, offsets run from −3 to +2).

| Offset | Slot | translateX | scale | opacity | z-index | Clickable |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | Active | 0 | 1 | 1 | 20 | Buttons inside the card |
| ±1 | Neighbour | ±400px (`spread`) | 0.8 | 0.5 | 19 | Whole card → becomes active |
| ±2 | Far | ±648px (`spread` × 1.62) | 0.64 | 0.18 | 18 | Whole card → becomes active |
| ±3+ | Hidden | ±648px | 0.64 | 0 | 17 | No (`visibility: hidden`) |

**Card anatomy (520px wide, about 566px tall)**

- Image: full width, 16:9 (292px tall), `object-cover`, gold-tinted bottom border. A Roman-numeral badge (I, II…) sits top-left on a dark chip.
- Body (padding 20px 28px 24px, gap 10px): type label (Cinzel 12px, dim), name (Cinzel 24px, gold-100, soft glow), status (italic 18px, muted), description clamped to 2 lines (19px), tech chips, then the "View Details" (gold) and "Source" (ghost) buttons.
- Frame: `bg` ink at 82% alpha, 1px gold-400 border at 38%, the small diamond on the top edge. The active card's border goes to gold-300 at 85% with an outer glow.

**Controls**

- Arrows: 56px diamond buttons (rotated squares with an upright chevron), vertically centred on the image area, 238px in from each stage edge.
- Under the stage: counter "01", a row of diamond dots (active one filled and glowing), total "06".

**Motion:** transform and opacity animate over 550ms with ease `cubic-bezier(0.22, 1, 0.36, 1)`. Border and glow fade over 400ms.

## Files and components

The page stays a Server Component that loads the project data. Only the carousel itself is a client component.

```text
src/
  app/(sections)/projects/page.tsx        # server: <SectionTitle/> + <Suspense><ProjectCarousel projects={projects}/></Suspense>
  components/projects/
    ProjectCarousel.tsx                    # client: state, keyboard, swipe, URL sync, renders stage + controls
    ProjectCard.tsx                        # presentational card (image, body, buttons)
    CarouselArrow.tsx                      # diamond arrow button, direction prop
    CarouselDots.tsx                       # counter + dots row
    carousel-math.ts                       # pure functions: wrapOffset(), slotFor()
  components/icons/ImagePlaceholder.tsx    # shown when a project has no image yet
  content/projects.ts                      # gains slug + image fields
public/projects/
  resource-manager.webp  ai-interviewer.webp  ...   # 1600x900 screenshots
```

| Component | Props | Responsibility |
| --- | --- | --- |
| `ProjectCarousel` | `projects: Project[]` | Holds `active` index, maps each project to a slot, renders arrows/dots, handles keys, swipe and `?item=` |
| `ProjectCard` | `project`, `index`, `slot`, `isActive`, `onSelect` | Draws one card; applies the slot transform; for non-active cards renders a full-size transparent `<button>` overlay that calls `onSelect` |
| `CarouselArrow` | `direction: "prev" \| "next"`, `onClick` | Rotated-square button with `aria-label` |
| `CarouselDots` | `count`, `active`, `onSelect`, `labels` | Counter text and dot buttons with `aria-pressed` |

If you already built the inventory version, delete `components/sections/Inventory.tsx` once the carousel works. Do not leave both in the bundle.

## Data model

Add an optional `image` to each project. Drop the `short` field, since the carousel always shows the full name.

```ts
// src/content/types.ts
export type Project = {
  slug: string;                 // "resource-manager" -> ?item=resource-manager
  name: string;
  type: string;                 // "Internal tool · WSP"
  status: string;
  description: string;          // keep to ~120 characters; clamped to 2 lines
  tech: string[];
  image?: { src: string; alt: string };   // "/projects/resource-manager.webp"
  links?: { details?: string; source?: string };
};
```

**Image guidelines**

- 16:9, exported at 1600×900 as WebP, under 250 KB each. Put them in `public/projects/`.
- Render with `next/image` using `fill` and `sizes="520px"` (or `"90vw"` on phones). Set `priority` on the first card only; the rest lazy-load.
- Write `alt` text that says what the screenshot shows ("Resource planner grid with weekly allocations"), not just the project name.
- No image yet: render `ImagePlaceholder` (the framed picture icon over the faint diagonal hatch from the design). Never show a broken image.
- Internal tools like the WSP app: use a cropped or blurred screenshot, or a styled mock, so no company data is shown. Check what you are allowed to share.

## Core logic

All the positioning comes from two pure functions. Keep them in their own file so they are easy to unit test.

```ts
// src/components/projects/carousel-math.ts
export type Slot = { x: number; scale: number; opacity: number; z: number; visible: boolean };

/** Shortest signed distance from active to i, so the carousel loops. */
export function wrapOffset(i: number, active: number, n: number): number {
  let off = i - active;
  if (off > n / 2) off -= n;
  if (off < -n / 2) off += n;
  return off;
}

export function slotFor(offset: number, spread = 400): Slot {
  const d = Math.abs(offset);
  const dir = Math.sign(offset);
  if (d === 0) return { x: 0, scale: 1, opacity: 1, z: 20, visible: true };
  if (d === 1) return { x: dir * spread, scale: 0.8, opacity: 0.5, z: 19, visible: true };
  if (d === 2) return { x: dir * spread * 1.62, scale: 0.64, opacity: 0.18, z: 18, visible: true };
  return { x: dir * spread * 1.62, scale: 0.64, opacity: 0, z: 17, visible: false };
}

export const mod = (i: number, n: number) => ((i % n) + n) % n;
```

```tsx
// src/components/projects/ProjectCard.tsx (core of the render)
<motion.div
  className="absolute left-1/2 top-0 w-[520px] -ml-[260px]"
  initial={false}
  animate={{ x: slot.x, scale: slot.scale, opacity: slot.opacity }}
  transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  style={{ zIndex: slot.z, visibility: slot.visible ? "visible" : "hidden" }}
>
  <article
    className={clsx(
      "relative border bg-ink/80 shadow-panel transition-[border-color,box-shadow] duration-400",
      isActive ? "border-gold-300/85 shadow-glow" : "border-gold-400/40",
    )}
    aria-hidden={!isActive}
    inert={!isActive}
  >
    {/* image, body, buttons */}
  </article>

  {/* sibling of the inert article, so it stays clickable */}
  {!isActive && slot.visible && (
    <button
      type="button"
      className="absolute inset-0 cursor-pointer hover:bg-gold-300/5 focus-visible:outline-2 focus-visible:outline-gold-300"
      onClick={onSelect}
      aria-label={`Show ${project.name}`}
    />
  )}
</motion.div>
```

`inert` takes the non-active card's own links out of tab order and screen readers. The overlay button is a sibling of the article, outside it, so clicking a side card still works.

In `ProjectCarousel`, `active` lives in state, and `go(i)` sets it to `mod(i, n)`. `prev` and `next` call `go(active ± 1)`.

## Interactions and accessibility

| Input | Result |
| --- | --- |
| Click left / right arrow | Previous / next project (loops) |
| Click a side card | That card becomes active |
| Click a dot | Jump to that project |
| ← / → keys | Previous / next while focus is inside the carousel region |
| Home / End keys | First / last project |
| Swipe (touch) | Horizontal drag over 50px or a fast flick changes project; vertical scroll is left alone |
| Esc | Unchanged: back to the title screen (handled by the shared `useMenuKeys`) |

**Key conflict:** the main plan uses ← / → to switch section tabs. On the Projects page, handle arrows inside the carousel's `onKeyDown` and call `e.stopPropagation()`, so they move cards when the carousel has focus and switch tabs otherwise.

**URL sync**

- Read `?item=<slug>` with `useSearchParams` on mount to pick the starting card. Fall back to index 0 for an unknown slug.
- On change, call `router.replace("?item=" + slug, { scroll: false })` so cards do not fill the history stack.
- Wrap the carousel in `<Suspense>` in `page.tsx`, as Next.js requires for `useSearchParams`.

**Accessibility**

- The stage is a `<section aria-roledescription="carousel" aria-label="Projects">`. Each card wrapper has `role="group"`, `aria-roledescription="slide"` and `aria-label="3 of 6: SFU Course Compass"`.
- A visually hidden `aria-live="polite"` line announces "Project 3 of 6: SFU Course Compass" on each change.
- Arrow and dot buttons have `aria-label`s, the dots have `aria-pressed`, and every button is at least 44px.
- Under `prefers-reduced-motion`, cards switch instantly (duration 0) and swipe still works.
- No autoplay. Visitors control the pace.

## Responsive behaviour

The card width and `spread` scale with the viewport. The layout keeps the same structure down to phones, where the far cards drop out.

| Breakpoint | Card width | spread | Visible cards | Arrows |
| --- | --- | --- | --- | --- |
| ≥ 1280px | 520px | 400px | 5 (active, ±1, ±2) | Beside the active card |
| 1024–1279px | 460px | 340px | 5 | Beside the active card |
| 768–1023px | 440px | 300px | 3 (±2 hidden) | Over the neighbour cards |
| < 768px | min(86vw, 400px) | 92vw | 1, with neighbours peeking 6vw at the edges | Below the card, next to the dots |

- Measure the stage with a `ResizeObserver` (or a `useMediaQuery` hook) and pass `cardWidth` and `spread` into `slotFor`. Do not hardcode 400.
- On phones the description stays at 2 lines and the chips wrap. The stage height follows the active card's height so the dots never overlap.
- Turn on swipe at every size, not just on touch devices, since many laptops have touchscreens.

## Claude Code prompts

Run these in order and check the page in the browser between steps. Attach the carousel artboard screenshot to steps 2 and 5.

### Step 1 — Data and math

```text
Read docs/PROJECTS_CAROUSEL.md ("Data model" and "Core logic").
Update the Project type and src/content/projects.ts: add slug and optional image,
remove short. Create src/components/projects/carousel-math.ts with wrapOffset,
slotFor and mod exactly as specified, plus a small test file covering looping
(n=6: active 0 -> index 5 has offset -1; active 5 -> index 0 has offset +1).
Also update CLAUDE.md: the Projects page is now a carousel per this doc.
```

### Step 2 — Card and static stage

```text
Build ProjectCard.tsx and ImagePlaceholder.tsx per "Behaviour spec" and
"Core logic", matching the attached screenshot: 520px card, 16:9 next/image
(fill, sizes="520px", priority only on the first), numeral badge, type, name,
status, 2-line clamped description, tech chips, View Details + Source buttons,
active vs side styling. Render all cards in ProjectCarousel at their slots for
a fixed active index (no interaction yet). Replace the old Projects page content.
```

### Step 3 — Navigation and motion

```text
Add active state to ProjectCarousel with go/prev/next. Build CarouselArrow
(diamond buttons) and CarouselDots (counter, dots with aria-pressed, total).
Make side cards selectable through the sibling overlay button. Animate slots
with motion (0.55s, ease [0.22,1,0.36,1]) and use duration 0 under
useReducedMotion(). Add the aria-live announcement and slide roles/labels.
```

### Step 4 — Keyboard, swipe, URL

```text
Implement "Interactions and accessibility": arrow/Home/End keys on the carousel
region with stopPropagation so they don't trigger section-tab switching; swipe
via motion drag="x" on the stage (threshold 50px or velocity > 500, snap back
otherwise); sync ?item=<slug> with useSearchParams + router.replace(scroll:false),
with <Suspense> in page.tsx. Unknown slug -> first project.
```

### Step 5 — Responsive and cleanup

```text
Apply "Responsive behaviour": derive cardWidth and spread from the stage width
(ResizeObserver), hide far cards below 1024px, peeking single-card layout below
768px with arrows next to the dots. Test at 390, 768, 1024 and 1440px against
the screenshot. Delete the old Inventory component and any unused styles.
Run next build and fix all type and lint errors.
```

## Acceptance checklist

- [ ] At 1440×900 the page matches the "Projects — Carousel" artboard side by side.
- [ ] Arrows, dots, side-card clicks, ← / →, Home / End and swipe all change the project, and the carousel loops at both ends.
- [ ] ← / → move cards only while the carousel has focus; elsewhere on the page they still switch section tabs.
- [ ] Pasting `/projects?item=ai-interviewer` opens on that card; changing cards does not add browser history entries.
- [ ] Tab order reaches only the active card's buttons, the arrows and the dots, with a visible gold focus ring.
- [ ] A screen reader announces "Project N of 6: name" on each change.
- [ ] Projects without an image show the placeholder, never a broken image.
- [ ] Reduced motion makes changes instant; nothing autoplays.
- [ ] Works at 390, 768, 1024 and 1440px with no horizontal page scroll.
- [ ] Old inventory code removed; `next build` passes.
