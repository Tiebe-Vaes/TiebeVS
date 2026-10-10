# Portfolio fase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the effects Tiebe picked (React Bits Micro Slats, Circular Carousel, Logo Loop, 21st.dev Topo Field, light Lenis), a ranked "Waar ik nu mee speel" section with one big hairline figure, then re-add effects 1–9 only where they still add something, all inside a performance budget.

**Architecture:** Next.js 16 App Router site in `main/`. Each visual effect is a client component that pauses off screen. New content lives in `src/content/`, so the ranked list is data, not markup.

**Tech Stack:** Next.js 16.3.8, React 19, Tailwind v4, ogl (Micro Slats), lenis, @lucasmarkes/hairline 0.5, motion 14 (already used by the heatmap).

**Spec:** Tiebe's chat requests of 2026-10-10 plus `HANDOFF.md` (binding decisions) and `main/PRODUCT.md`, `main/DESIGN.md`.

## Global Constraints

- Never mention TVerse, the vault, or SR Schoonmaak anywhere on the site. Obsidian is allowed.
- `motion` stays on 14.x. Re-check `package.json` after every registry install.
- No phone number, no CV, no age, no internship asks.
- Copy goes in both `nl` and `en` (`src/content/dictionary.ts` or the content files).
- Every effect respects `prefers-reduced-motion` and stops its rAF when it is off screen.
- Perf budget: run `scratchpad/perf/fps.mjs` on a prod build (1440×900, CPU 4×, 10 s settle). Hero idle must be ≥ 55 fps, scroll ≥ 45 fps, and the JS heap must stay < 30 MB. Measure after every task, and drop or tone down the effect when it misses the budget.
- One commit per task on `redesign/next`, ending with the attribution line.

## Skills used

- `impeccable`: design direction and the final review (detector plus finish reviewer).
- `make-interfaces-feel-better`: hover, link animation, details.
- `vercel-react-best-practices` and `performance-optimization`: client boundaries, lazy loading, rAF.
- `frontend-ui-engineering` and `web-design-guidelines`: accessibility and responsive layout.
- `source-driven-development`: hairline and lenis API from their READMEs, not from memory.
- `unsloppify`: all new copy, NL and EN.
- `verification-before-completion`: build, lint, fps and a screenshot before every "done".

## Review Focus

- Touch and phone (375 px): the carousel must not block vertical scroll, hairline must not need hover to make sense, Lenis must stay off on touch.
- Keyboard: the ranked list must be operable by Tab, and focus must change the figure just like hover does. The carousel takes arrow keys, and Enter on a slide opens the spec sheet.
- Reduced motion: no autoplay, no intro, no Lenis. Hairline still answers the pointer, which its README defines as allowed.
- Dark/light switch at runtime: Micro Slats and hairline colours must follow the theme without a reload.
- Projects without screenshots (BMX, Ripple, Study Countdown) must not leave a gap in the carousel.

---

### Task 1: Lenis, light

**Files:** Create `main/src/components/site/smooth-scroll.tsx`, modify `main/src/components/site/root-shell.tsx`.

- [ ] Create `SmoothScroll()`: `<ReactLenis root options={{ lerp: 0.1, anchors: { offset: -64 } }} />` with the default autoRaf and no GSAP ticker. Return null under reduced motion. Import `lenis/dist/lenis.css`.
- [ ] Mount it in `RootShell` after `TooltipProvider`.
- [ ] Verify: build, run fps.mjs, then confirm that clicking the header anchors lands under the sticky header.
- [ ] Commit `feat: light Lenis smooth scroll`.

### Task 2: Logo Loop in Uitrusting

**Files:** `main/src/components/reactbits/LogoLoop.tsx` (vendored), modify `main/src/components/site/portfolio.tsx` (gear section).

- [ ] Patch LogoLoop so its rAF only runs while the track is intersecting (IntersectionObserver). Note the change in the file's header comment, as with the earlier vendored fixes.
- [ ] Render the logos from all `skillGroups` items as `{ node: <TechIcon name/>, title }`, with `fadeOut`, `fadeOutColor="var(--background)"`, `pauseOnHover`, `scaleOnHover` and `ariaLabel` from the dictionary (`gear.loopLabel`).
- [ ] Place it between the section heading and the gear board.
- [ ] Verify the fps budget, and confirm that the loop is static under reduced motion.
- [ ] Commit `feat: tech logo loop`.

### Task 3: Circular Carousel for projects

**Files:** `main/src/components/reactbits/CircularCarousel.tsx` (vendored), create `main/src/components/site/project-carousel.tsx`, modify `catalogue.tsx`.

- [ ] Create `ProjectCarousel({ projects, locale, label })`. Items are the projects that have `images[0]` (`src`, `title: name`, `subtitle: category[locale]`). Settings: `preset="cylinder"`, `captions`, `autoplay="drift"`, `fadeColor="var(--background)"`. `onItemClick` calls `useCatalogue().open(slug)`. Set the aria-label from the dictionary (`catalogue.carouselLabel`).
- [ ] Projects without screenshots are left out, and appear automatically as soon as Tiebe adds images. Write a `ponytail:` comment about this.
- [ ] Place the carousel above the list. Remove the plate column from the list rows: the carousel and the spec sheet carry the visuals.
- [ ] Verify at 375 px that vertical scroll still works over the carousel. Then check the fps budget and that a click opens the spec sheet.
- [ ] Commit `feat: circular project carousel`.

### Task 4: Micro Slats as the fjord in Contact

**Files:** `main/src/components/reactbits/MicroSlats.tsx` (vendored), modify the `Contact` component in `portfolio.tsx`.

- [ ] Put Micro Slats absolutely positioned behind the contact content, as a low strip at the bottom: "the fjord at Oslo, the end of the route". Use `preset="swell"`, `backgroundColor="transparent"`, slat colour from `--primary-foreground` at low opacity, and `intro`.
- [ ] Colours come from the theme (`next-themes` `resolvedTheme`), so a theme switch updates them.
- [ ] Verify contrast: the contact text must stay at AA. Then check the fps budget at the bottom of the page.
- [ ] Commit `feat: micro slats fjord behind contact`.

### Task 5: Topo Field in the hero (BLOCKED: code needs a 21st.dev login)

**Files:** create `main/src/components/topo-field.tsx`, modify the hero in `portfolio.tsx`.

- [ ] Tiebe copies the code from 21st.dev (Copy prompt / code) into `main/src/components/topo-field.tsx`. Claude does not log in.
- [ ] Put it full-bleed behind `HeroMap` with the fjord colours. Pause it off screen and under reduced motion.
- [ ] Verify the fps budget in the hero (≥ 55 fps idle). If it misses, lower the resolution or drop it.
- [ ] Commit `feat: topo field hero background`.

### Task 6: "Waar ik nu mee speel": ranked list with hairline

**Files:** create `main/src/content/playing.ts` and `main/src/components/site/now-playing.tsx`, modify `portfolio.tsx`, `dictionary.ts` and `globals.css` (hairline tokens).

**Interfaces:** `type PlayingItem = { rank: number; name: string; kind: Localized; blurb: Localized; href: string; figure: FigureName }`. `FigureName` is a union of the 12 hairline component names below.

- [ ] Data, ranked:

  | # | Item | Figure | Link |
  |---|---|---|---|
  | 01 | Claude Code | Terminal | Claude Code docs |
  | 02 | Obsidian | Hub | obsidian.md |
  | 03 | Next.js + React | Stack | nextjs.org |
  | 04 | Superpowers (brainstorm, plan, TDD) | Rebuild | github.com/obra/superpowers |
  | 05 | Impeccable (design review) | Exploded | impeccable repo |
  | 06 | Subagents in parallel | Branches | Claude Code subagents docs |
  | 07 | Agent Skills (Addy Osmani) | Relay | github.com/addyosmani/agent-skills |
  | 08 | Matt Pocock skills | Settle | github.com/mattpocock/skills |
  | 09 | Caveman + Ponytail (fewer tokens, less code) | Format | JuliusBrussee/caveman, DietrichGebert/ponytail |
  | 10 | Make Interfaces Feel Better | Keyboard | jakubkrehel/make-interfaces-feel-better |
  | 11 | React Bits + hairline | Laptop | reactbits.dev |
  | 12 | GSAP skills | Terrain | github.com/greensock/gsap-skills |

  Check every URL with `curl -I` (expect 200). Write the blurbs in NL and EN, 1–2 sentences each, then run them through unsloppify.
- [ ] Layout: the ranked list on the left (large mono rank numbers, name, kind, blurb), one big hairline figure on the right, sticky on desktop. Hover or focus on a row changes the figure; the default is #01. `onRead` shows the figure's caption under the figure. On phones the figure sits above the list and changes on tap.
- [ ] Link animation: an underline drawn from left to right plus an arrow that nudges, in CSS only (`make-interfaces-feel-better`). External links open in a new tab and announce it to screen readers.
- [ ] Map the hairline tokens in `globals.css` to the fjord palette (`--hairline-plate: var(--card)` etc.), for light and dark.
- [ ] Load the figure with `next/dynamic`, so only the active figure is in the DOM.
- [ ] Verify keyboard operation, the 375 px layout, the fps budget, and that the text never mentions TVerse or the vault (grep).
- [ ] Commit `feat: now-playing ranking with hairline figure`.

### Task 7: Fonts (proposal, no switch without Tiebe)

- [ ] Draft 3 font pairs that fit "field gear / topo map" against the current Archivo + Martian Mono, and show them to Tiebe as a sample. Switch only once he has chosen.

### Task 8: Re-add effects 1–9, only where they still add something

Re-add rule: an effect only comes back if it adds something new on top of tasks 1–6 and stays within the fps budget.

- [ ] 1 SplitText titles: re-add if the titles feel static. Use the IntersectionObserver plus CSS variant (no GSAP).
- [ ] 2 Rise-on-scroll blocks: use the same IntersectionObserver mechanism as 1. Combine them into one `Reveal` component.
- [ ] 3 Scramble text on the hang tag's art. no.: small and cheap, re-add.
- [ ] 4 Stamp edge on the plates: only re-add if plates are still shown somewhere other than the carousel (the spec sheet). Otherwise skip.
- [ ] 5 Signature in contact: skip if Micro Slats already gives the contact block enough life.
- [ ] 6 Ticket perforation on the hang tag: CSS mask, re-add.
- [ ] 7 Hang tag swings on hover over the tag only: re-add.
- [ ] 8 Hiker on a MotionPath while scrolling: skip if the Topo Field and the ranked list already carry the "route". Otherwise build it as a scroll-linked transform without GSAP.
- [ ] 9 Hold to confirm on the mail button (copies the e-mail address): re-add.
- [ ] Commit each effect, and measure the fps budget after each one.

### Task 9: Review and handoff

- [ ] Run the impeccable detector on the changed files and fix what it finds. Then run a finish-reviewer round on prod captures (desktop and 375 px, light and dark).
- [ ] Prod build, lint, fps report before and after for the whole phase.
- [ ] Update `HANDOFF.md`. The Vercel push (handoff item 6) only happens after Tiebe's OK.

---

## Phase 2b (Tiebe's feedback, 2026-10-10 evening)

Task 5 (21st.dev Topo Field) is cancelled because it is paid. The global constraints and the perf budget above still apply.

### Task 10: Topography as the site background, Micro Slats out
- [ ] Add React Bits Topography (ogl) from the registry. Place it as `fixed inset-0 -z-10` behind the whole page, with fjord colours per theme instead of purple. Use a low opacity and a reduced resolution (`pixelSize`), and pause it under reduced motion.
- [ ] Remove `contact-sea.tsx` and `MicroSlats.tsx`, and restore the original contact padding. Check whether the static `HeroMap` and the gear-board rings now draw contours twice; tone them down or remove them if so.
- [ ] Verify the fps budget in every section (a full-screen shader is the biggest risk). Check AA contrast on the text and check dark mode.

### Task 11: Projects at one viewport height with DriftWall
- [ ] `npx shadcn@latest add @react-bits/DriftWall-JS-CSS` (pipe `yes n`, then check `motion` and `globals.css`).
- [ ] The catalogue section becomes `min-h-[calc(100svh-3.5rem)]`. On the left, a compact index of all 9 projects (art. no., name, status, kind; a click or keys 1–9 opens the spec sheet). On the right, a DriftWall of all screenshots, where a click opens the matching spec sheet. The circular carousel and the long project rows are removed. Projects without screenshots appear only in the index.
- [ ] Verify that the section fits in 1440×900 and 375×812, check the fps budget (watch out for 3D layers and Layerize), and check keyboard operation.

### Task 12: Specimen cards with hairline
- [ ] Reduce `playing.ts` to 7 items: Claude Code (Terminal), Obsidian (Hub), Next.js + React (Stack), Superpowers (Rebuild), Matt Pocock skills (Settle), Impeccable (Exploded), Caveman + Ponytail (Format).
- [ ] Replace the ranking with a grid of specimen cards. Each card shows "Fig. 0n", the kind, the hairline figure as its image, the name, one sentence and the links (trail-link). Three columns on lg, with cards 1 and 7 spanning two columns; one column on phones. The figures load through `next/dynamic`.
- [ ] Verify the fps budget with 7 figures mounted, then check keyboard use, both themes and 375 px.
