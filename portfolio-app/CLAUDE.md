@AGENTS.md

# Portfolio — project notes

Souls-style portfolio: a title menu over a sharp landscape; every section screen blurs and dims that same
background and lays a dark, gold-trimmed panel over it. Full spec: `docs/PLAN.md` (this repo deviates from
its file layout — follow the structure below). The Projects page is a carousel, not the inventory grid —
see `docs/Projects Carousel — Implementation Plan.md`.

## Stack
- Next.js 16 App Router with `cacheComponents` + `partialPrefetching` (visited routes stay mounted in
  React `<Activity>`; prefer CSS keyframes over JS entrance animations so they replay when a route is shown again).
- TypeScript strict, Tailwind v4 configured in `app/globals.css` via `@theme` (no tailwind.config).
- `clsx` for conditional classes, `zod` for the contact Server Action. Fonts: Cinzel (display), Cormorant Garamond (body).

## Rules
- All copy lives in `constants/index.ts` (types in `constants/types.ts`). Never hardcode content in pages.
- `sections` in `constants/index.ts` is the single source of menu order, tab order, chapter numerals and ←/→ cycling.
- Server Components by default. Client only: Backdrop, TitleMenu, SectionNav, StickyHeader, ProjectCarousel, ContactForm.
- Size in rem, never px (hairlines ≤2px excepted): `html` is `font-size: 75%` from lg, which scales the whole
  desktop UI. JS geometry multiplies its px by root font-size / 16 (see ProjectCarousel `scale`).
- Body text never below 18px (1.125rem; renders 13.5px on desktop). Panel alpha never below 0.6. Touch targets ≥ 44px. Decorative SVGs `aria-hidden`.
- Animations must switch off under `prefers-reduced-motion` (handled globally in globals.css).

## Tokens (Tailwind classes)
`ink` #0c0a08 · `panel` rgb(12 10 8/.64) · `gold-100`…`gold-700` (#f6e7c0 → #6f5326) · `parchment` #efe6d2 ·
`parchment-200` #e4d9c0 · `muted` #d3c39f · `dim` #bfae86 · `font-display` · `font-body` · `shadow-glow` ·
`shadow-panel` · utilities `text-glow`, `bg-gold-active` · animations `animate-rise`, `animate-drift`, `animate-ember`.

## Structure
```
app/
  layout.tsx            fonts, <Backdrop/>, metadata defaults
  page.tsx              title screen (/)
  (sections)/           layout.tsx = header nav + footer; template.tsx = per-route remount
    about-me/ skills/ projects/ experience/ contact/ (+ contact/actions.ts server action)
  components/
    backdrop/ menu/ chrome/ ui/ icons/ sections/
    projects/           ProjectCarousel (client) + card/arrow/dots; carousel-math.ts (+ .test.ts, `npm test`)
constants/              index.ts (content), types.ts
lib/                    sections.ts (href helpers), useMenuKeys.ts (arrow/Enter/Esc)
public/bg/landscape.png the background
```

## Env (contact form)
`RESEND_API_KEY`, `CONTACT_TO`, optional `CONTACT_FROM` in `.env.local`. Without them the form shows a friendly error.
