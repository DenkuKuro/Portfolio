Portfolio Implementation Plan — Next.js + Tailwind
Oct 8, 2026 · @everyone
Overview
Build a six-screen portfolio in Next.js (App Router), TypeScript and Tailwind CSS. It has the title menu plus the About, Experience, Projects, Skills and Contact screens from the design canvas. One persistent landscape background stays in place behind all of them.
The core idea: the title screen shows the landscape sharp. Every section screen dims and blurs that same background and lays a dark gold-trimmed panel over it, like opening a menu in a Souls game. The background never reloads between routes.
How to use this with Claude Code
1. Export this doc as Markdown and save it in the repo as docs/PLAN.md.
2. Put your original landscape image (the clean one, no text on it) at public/bg/landscape.jpg.
3. Run the phases in the "Build phases" section one at a time, pasting each prompt into Claude Code. Review and commit after each phase before starting the next.
4. Keep the design canvas open as the visual reference. You can also screenshot an artboard and paste it into Claude Code with the matching phase prompt.
Stack and project setup
Use the current create-next-app defaults: App Router, TypeScript, Tailwind CSS (v4, configured in CSS rather than tailwind.config.ts), ESLint and the src/ directory.
npx create-next-app@latest portfolio --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd portfolio
npm i motion clsx zod
Concern
Choice
Why
Fonts
next/font/google: Cinzel (400, 500, 600) and Cormorant Garamond (400, 500, 600, italic)
Self-hosted, no layout shift, exposed as CSS variables
Background image
next/image with fill and priority, file in public/bg/
Optimized sizes and formats, loads first
Animation
motion (Framer Motion) for panel and page entrances
Small API, respects reduced motion
Class merging
clsx
Conditional active and selected styles
Contact form
Server Action, validated with zod, sent through an email service (Resend or Formspree)
No separate API route needed
Icons
Inline SVG components, gold strokes
Match the design exactly; no icon font
Hosting
Vercel
Zero-config for Next.js
One rule to give Claude Code up front: content lives in typed data files, never hardcoded inside page components. Changing a project or skill should mean editing one data file.
Design tokens
These are the exact values used in the canvas. Define them once in globals.css with Tailwind's @theme, so classes like text-gold-300, bg-ink and font-display exist everywhere.
Token
Value
Used for
ink
#0c0a08
Page base behind the image
panel
rgba(12, 10, 8, 0.64)
Content panels
gold-100
#f6e7c0
Big titles (ABOUT, EXPERIENCE…)
gold-200
#f3e2b5
Wordmark, card headings
gold-300
#e8cf94
Links, icon strokes, focus ring
gold-400
#d8b56d
Small caps labels, divider lines, panel border (38% alpha)
gold-500
#b8934f
Bullet diamonds
gold-600 → gold-700
#9a7638 → #6f5326
Active tab and primary button gradient
parchment
#efe6d2
Default text
parchment-200
#e4d9c0
Body paragraphs
muted
#d3c39f
Italic kickers and subtitles
dim
#bfae86
Secondary labels
Typography
• Display and labels: Cinzel. Titles 50px, weight 500, letter-spacing 0.35em. Nav and labels 11–13px, uppercase, letter-spacing 0.28–0.35em.
• Body: Cormorant Garamond at 19–22px with line-height 1.5. It runs small, so never go below 18px.
• Kickers ("Chapter II — The Journey So Far"): Cormorant italic, 19px, muted.
• Glow on titles: text-shadow: 0 0 26px rgba(255, 205, 120, 0.5).
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-ink: #0c0a08;
  --color-panel: rgb(12 10 8 / 0.64);
  --color-gold-100: #f6e7c0;
  --color-gold-200: #f3e2b5;
  --color-gold-300: #e8cf94;
  --color-gold-400: #d8b56d;
  --color-gold-500: #b8934f;
  --color-gold-600: #9a7638;
  --color-gold-700: #6f5326;
  --color-parchment: #efe6d2;
  --color-parchment-200: #e4d9c0;
  --color-muted: #d3c39f;
  --color-dim: #bfae86;

  --font-display: var(--font-cinzel), serif;
  --font-body: var(--font-cormorant), Georgia, serif;

  --shadow-glow: 0 0 22px rgb(214 170 90 / 0.35);
  --shadow-panel: 0 24px 70px rgb(0 0 0 / 0.45);
}

@utility text-glow {
  text-shadow: 0 0 26px rgb(255 205 120 / 0.5);
}
@utility bg-gold-active {
  background-image: linear-gradient(180deg, var(--color-gold-600), var(--color-gold-700));
}
File structure and routing
Each screen is its own route, so it has a real URL, its own metadata and works with the browser back button. The background sits in the root layout so it never unmounts. The five sections share a route group (sections) whose layout adds the header nav, title block and footer.
src/
  app/
    layout.tsx              # fonts, <Backdrop/>, metadata defaults
    globals.css             # @theme tokens
    page.tsx                # Title screen (/)
    (sections)/
      layout.tsx            # <SectionShell/>: header nav + footer, dims backdrop
      template.tsx          # re-mounts per route -> entrance animation
      about/page.tsx
      experience/page.tsx
      projects/page.tsx
      skills/page.tsx
      contact/page.tsx
      contact/actions.ts    # "use server" sendMessage()
  components/
    backdrop/Backdrop.tsx   # image + shade + optional clouds (client)
    menu/TitleMenu.tsx      # keyboard-driven title menu (client)
    chrome/SectionNav.tsx   # tabs with active state (client: usePathname)
    chrome/SectionTitle.tsx # kicker + title + star divider
    chrome/Footer.tsx       # ESC back hint + copyright
    ui/Panel.tsx
    ui/Button.tsx           # variant: "gold" | "ghost"; renders Link or button
    ui/Label.tsx
    ui/Divider.tsx          # line - 4-point star - line
    ui/Gem.tsx              # rotated-square ornament
    icons/*.tsx             # inline SVG icons
    sections/ExperienceLog.tsx
    sections/Inventory.tsx  # projects grid + detail (client)
    sections/SkillSchool.tsx
    sections/ContactForm.tsx (client)
  content/
    profile.ts  experience.ts  projects.ts  skills.ts  contact.ts
  lib/
    sections.ts             # ordered list: { href, label, kicker, chapter }
    useMenuKeys.ts          # arrow / Enter / Esc handling
public/
  bg/landscape.jpg
  resume.pdf
lib/sections.ts is the single source of the menu order. The title menu, the nav tabs, the chapter numbers (I–V) and left/right keyboard cycling all read from it.
Shared components
Build these before any page. Every section screen is just these pieces plus its own content.
Component
What it renders
Key details
Backdrop
Fixed full-screen landscape, then a shade layer
Reads usePathname(): on / blur 0 and light shade; on sections blur ~9px, brightness 0.78 and a radial vignette (center 0.3 alpha → edges 0.92). Animate both with a 600ms CSS transition. Scale the image to 1.05 so the blur has no soft edges.
SectionShell
Header row + {children} + Footer
Header: wordmark JAVIER (links to /), centered SectionNav, right tag "ENGINEER · DEVELOPER". Padding 34px 72px 30px.
SectionNav
Five tab links
Cinzel 13px, tracking 0.3em, padding 13px 22px. Active tab: bg-gold-active, border gold at 60% alpha, glow shadow, aria-current="page". Hover: thin gold border.
SectionTitle
Kicker, big title, Divider
Props: chapter, kicker, title. Title Cinzel 50px, tracking 0.35em, text-glow.
Divider
200px line, 4-point star, 200px line
Lines fade from transparent to gold-400. Star is a 14px SVG filled #f3d998.
Panel
Dark translucent box
bg-panel, 1px border gold-400 at 38%, shadow-panel. Small diamond on the top-center edge (rotated 10px square via ::before).
Button
Link or button
gold variant uses the active gradient; ghost is a gold outline. Cinzel 12px, tracking 0.3em, padding 15px 28px, min height 44px.
Label
Small caps line
Cinzel 12px, tracking 0.28em, gold-400 (or dim tone).
Gem
9px rotated square
Portrait frame corners, timeline nodes (with a lit glow variant).
Footer
"ESC  BACK" link and "© 2026 JAVIER"
The ESC part is a bordered key cap. Links to /.
Write the components as Server Components by default. Only Backdrop, SectionNav, TitleMenu, Inventory and ContactForm need "use client".
Section pages
Each page uses SectionTitle with its chapter and kicker, then one centered content block. Targets are for a 1440×900 viewport; the content block flexes to fill the space between the title and the footer.
Title screen (/)
• Huge JAVIER DENG XU wordmark (Cinzel, about 120px, tracking 0.35em, glow), a fine gold line through its baseline with the star at center.
• Vertical menu: ABOUT, EXPERIENCE, PROJECTS, SKILLS, CONTACT. The focused item gets the gold bar (about 240px wide, gold gradient, thin light border). It follows the mouse on hover and arrow keys on keyboard.
• Under the menu: divider, "Welcome to my journey." in italic, and "© 2026 JAVIER" pinned at the bottom.
About (Chapter I)
• Two columns, 56px gap. Left: a 330×410 portrait frame (outer gold border, inner thin border, Gem at each corner) with your photo via next/image, and an italic quote under it.
• Right: a 780px Panel with three blocks. Status is a two-column grid (190px label, value) with rows for Class, Origin, Covenant, Current Quest and Party, separated by faint gold rules. Lore is the bio paragraph. Last come the buttons "Download Résumé" (gold, links to /resume.pdf) and "View Experience →" (ghost).
Experience (Chapter II — The Journey So Far)
• One 1080px Panel holding a vertical timeline: a gold rail on the left fading downward, and one entry per role.
• Entry grid: 44px node column, 170px dates column, then role (Cinzel 19px gold-200), organization (italic), and diamond-bulleted points.
• The current role's node is lit (filled and glowing) and shows "Now" under its dates.
Projects (Chapter III — Relics Forged)
• A 1180px Panel split in two. Left: "Inventory · N items" label and a 3-column grid of 158px-tall slots (Roman numeral, diamond emblem, short name). Right: detail for the selected item: type label, name, status in italic, description, "Forged with" tech chips, and Details and Source buttons.
• Slots are real <button>s with aria-pressed. The selected slot gets the gold gradient fill and glow. Arrow keys move the selection inside the grid.
• Sync the selection to ?item=<slug> with useSearchParams so a project can be linked directly. Wrap the client component in <Suspense> as Next.js requires.
Skills (Chapter IV — Attunements)
• Three equal columns (Front-End, Back-End, Dev Tools) with 32px gaps and about 90px side inset.
• Each column is a Panel with a centered diamond-framed icon, a Cinzel heading, an italic subtitle and a list with diamond bullets and faint dividers.
• Front-End: React, Next.js, MUI, HTML · CSS · JavaScript, WordPress Gutenberg, Faust.js. Back-End: NestJS, Spring Boot, Prisma · PostgreSQL, GraphQL, WebSockets, Python. Dev Tools: Git, CMake, Azure plus the tools you add.
Contact (Chapter V — Leave a Sign)
• A 1060px Panel. Left (380px): "Summon Me" label, one-line availability note, then icon rows for Email, LinkedIn, GitHub and Location. Right: the form with Name and Email side by side, Message, a reply-time note and the Send Message button.
• Submit through a Server Action using useActionState. Validate with zod on the server, and show field errors under each input in muted gold.
• On success, swap the form for the "Message Sent" state (big star, title, "Your sign has been left. Safe travels.", and a Write Another button). Add a hidden honeypot field against spam.
Background, motion and keyboard
Motion should feel slow and ceremonial, never bouncy. Everything here switches off under prefers-reduced-motion: reduce.
Backdrop
• Moving clouds: one or two wide transparent PNG cloud layers above the landscape, drifting horizontally with a 120–180s linear CSS keyframe loop at low opacity. A slow 40s scale "breathing" on the landscape (1.05 → 1.08) is optional.
• Optional embers: 15–20 small gold dots rising slowly. Use CSS only, no canvas, so it stays cheap.
• The title → section switch is the signature moment. The blur and shade ease in over 600ms while the section panel fades and rises 12px.
Page entrances
• In (sections)/template.tsx, wrap children in a motion.div: opacity 0 → 1 and y 12 → 0 over 0.5s with ease [0.22, 1, 0.36, 1]. Stagger the title block and panel by 80ms.
• Skip exit animations. They are unreliable in the App Router and not worth the complexity here.
Keyboard map (useMenuKeys)
Key
Title screen
Section screens
↑ / ↓
Move menu focus
Move focus in lists and grids where it applies
Enter
Open focused section
Activate focused element
← / →
—
Previous / next section tab
Esc
—
Back to title (router.push("/"))
Ignore key handling while focus is in an input or textarea, so typing in the contact form never navigates. Also prefetch all section routes from the title screen with <Link prefetch> so the transition is instant.
Optional extras (do last): a soft menu-select sound with a mute toggle saved in localStorage, and a one-time "Press any key" splash on the very first visit.
Content data layer
All copy lives in constants/index.ts as typed objects. Pages import them and map over them. Use the text from the design canvas as the first version of each file and leave the bracketed placeholders until you have the real values.
// src/content/types.ts
export type StatRow = { label: string; value: string };

export type Experience = {
  role: string;
  org: string;
  dates: string;          // "May 2026 – Present"
  current?: boolean;      // lights the timeline node + "Now"
  points: string[];
};

export type Project = {
  slug: string;           // used in ?item=
  short: string;          // slot label
  name: string;
  type: string;           // "Internal tool · WSP"
  status: string;
  description: string;
  tech: string[];
  links?: { details?: string; source?: string };
};

export type SkillSchool = {
  id: "frontend" | "backend" | "devtools";
  title: string;
  subtitle: string;      // "The visible arts"
  items: string[];
};

export type ContactLink = {
  kind: "email" | "linkedin" | "github" | "location";
  label: string;
  value: string;
  href?: string;
};
// src/lib/sections.ts
export const sections = [
  { href: "/about",      label: "About",      chapter: "I",   kicker: "Chapter I" },
  { href: "/experience", label: "Experience", chapter: "II",  kicker: "Chapter II — The Journey So Far" },
  { href: "/projects",   label: "Projects",   chapter: "III", kicker: "Chapter III — Relics Forged" },
  { href: "/skills",     label: "Skills",     chapter: "IV",  kicker: "Chapter IV — Attunements" },
  { href: "/contact",    label: "Contact",    chapter: "V",   kicker: "Chapter V — Leave a Sign" },
] as const;
Put secrets (email service API key, the destination inbox) in .env.local and never in content/.
Responsiveness and accessibility
The designs are desktop (1440×900). Below lg (1024px) the layout reflows rather than shrinks.
Element
Desktop (lg+)
Tablet and phone
Screen height
Fills the viewport; content centered vertically
Normal page scroll; sticky header
Section nav
Centered tabs in the header
Horizontal scroll strip under the wordmark, active tab scrolled into view
Title size
50px
32px, tracking 0.2em
About
Portrait and panel side by side
Stacked; portrait 240px wide
Experience
Node / dates / content grid
Dates move above the role
Projects
Grid + detail side by side
2-column grid on top; detail panel below and scrolled into view on select
Skills
3 columns
1 column (2 columns on md)
Contact
Links + form side by side
Stacked; Name and Email fields stacked
Footer ESC hint
Shown
Hidden on touch; becomes a "Back" link
Accessibility
• Real elements only: <nav>, <a> for navigation, <button> for selection, <label> on every input.
• Visible focus: a 2px gold-300 ring with a 2px offset on every interactive element via focus-visible.
• Contrast: body text on the panel stays at the listed parchment tones. Do not lighten the panel below 0.6 alpha, since a bright patch of sky behind it can drop contrast under 4.5:1.
• Decorative SVGs get aria-hidden. The portrait gets real alt text.
• Touch targets at least 44px tall.
• Each route sets metadata.title ("About — Javier") and a description. Add an Open Graph image built from the title screen.
Build phases
Run these in order. Each phase ends in a working, committable state. Paste the prompt into Claude Code as written, and attach the matching artboard screenshot from the canvas where noted.
Phase 0 — Project context
Create CLAUDE.md once so every later prompt inherits the rules.
Create CLAUDE.md at the repo root summarizing docs/PLAN.md for future sessions:
stack (Next.js App Router, TypeScript strict, Tailwind v4 with @theme tokens),
the rule that all copy lives in src/content/*.ts, Server Components by default,
the design tokens table, and the folder structure. Keep it under 80 lines.
Do not write app code yet.
Phase 1 — Setup, tokens, backdrop
Read docs/PLAN.md sections "Stack and project setup", "Design tokens" and
"Background, motion and keyboard". Then:
1. Install motion, clsx, zod.
2. Replace globals.css with the @theme tokens and utilities from the plan.
3. Load Cinzel and Cormorant Garamond with next/font/google as CSS variables
   --font-cinzel and --font-cormorant in app/layout.tsx.
4. Build components/backdrop/Backdrop.tsx: fixed full-screen next/image of
   /bg/landscape.jpg (fill, priority, object-cover, scale 1.05) plus a shade layer.
   It reads usePathname(): sharp on "/", blurred (~9px), darker and vignetted
   everywhere else, transitioning over 600ms. Respect prefers-reduced-motion.
5. Render <Backdrop/> in the root layout behind {children}.
Run the dev server and confirm both states by visiting / and /about (a stub page).
Phase 2 — Shared UI and the section shell
Read docs/PLAN.md "File structure and routing" and "Shared components".
Create lib/sections.ts, the ui/ components (Panel, Button, Label, Divider, Gem),
the chrome/ components (SectionNav, SectionTitle, Footer), and
app/(sections)/layout.tsx + template.tsx (entrance animation with motion).
Add stub pages for all five sections that render only <SectionTitle/>.
Match the attached screenshot for header, tab, title and footer styling exactly.
Phase 3 — Title screen
Build app/page.tsx and components/menu/TitleMenu.tsx per the "Title screen"
spec in docs/PLAN.md, matching the attached home screen image: giant JAVIER
wordmark with the gold baseline line and star, subtitle, vertical menu with the
moving gold selection bar, divider, "Welcome to my journey.", copyright.
Implement lib/useMenuKeys.ts (up/down/enter here; left/right/esc on sections),
ignoring keys while an input or textarea has focus. Prefetch all section links.
Phase 4 — Content files, About and Experience
Create src/content/types.ts and the content files from docs/PLAN.md
"Content data layer", filled with the copy in the attached About and Experience
screenshots (keep bracketed placeholders as-is). Build the About page (portrait
frame with Gem corners, Status grid, Lore, buttons) and the Experience page
(timeline with rail, lit current node, entries) reading only from content files.
Phase 5 — Projects inventory
Build components/sections/Inventory.tsx (client) and the Projects page per the
plan: 3-column slot grid of <button aria-pressed>, detail panel, tech chips,
selection synced to ?item=<slug> via useSearchParams (wrap in <Suspense>),
arrow-key movement within the grid. Match the attached Projects screenshot.
Phase 6 — Skills and Contact
Build the Skills page (three SkillSchool panels: Front-End, Back-End, Dev Tools)
and the Contact page. Contact: links column plus ContactForm (client) using
useActionState with a server action in contact/actions.ts that validates with
zod, includes a honeypot field, and sends via Resend using RESEND_API_KEY and
CONTACT_TO from .env.local. Show per-field errors and the "Message Sent" state.
Match the attached screenshots.
Phase 7 — Responsive and accessibility pass
Apply docs/PLAN.md "Responsiveness and accessibility" to every screen.
Test at 390px, 768px, 1024px and 1440px widths. Add focus-visible gold rings,
per-route metadata, alt text, and confirm keyboard-only navigation works end to end.
List anything you could not match.
Phase 8 — Polish and deploy
Add the drifting cloud layers (and optional embers) to Backdrop, both disabled
under reduced motion. Add an Open Graph image and favicon. Run `next build`
and fix all type and lint errors, then prepare for Vercel deployment
(list the env vars I need to set).
Acceptance checklist
The build is done when every box is ticked.
[ ] At 1440×900, each screen matches its canvas artboard side by side (spacing, sizes, colors).
[ ] Background stays mounted across all routes; title → section blurs and dims smoothly with no flash.
[ ] Active tab highlights correctly on every section, including after browser back/forward.
[ ] Keyboard only: navigate the title menu, open a section, cycle tabs with ← →, return with Esc.
[ ] Projects: clicking a slot updates the detail panel and the URL; a pasted ?item= link opens that project.
[ ] Contact form validates, rejects the honeypot, sends a real email and shows the sent state.
[ ] No copy is hardcoded in page components; editing src/content/*.ts updates the site.
[ ] Layout works at 390px, 768px and 1024px with no horizontal scroll.
[ ] With reduced motion on, clouds, blur transition and entrances are off.
[ ] Lighthouse: Accessibility 95+, Performance 90+ on desktop.
[ ] next build passes with no type or lint errors; deployed on Vercel with env vars set.
[ ] Placeholders replaced: portrait, dates, email, LinkedIn, GitHub, résumé PDF, project links.