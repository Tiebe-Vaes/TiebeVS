# Projects as Figures Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the screenshot-led catalogue with a grid of interactive line figures (5 drawn by hand), show the figure first in the spec-sheet dialog, and remove the project status everywhere.

**Architecture:** Every project gets a `figure` name. `hairline-figure.tsx` (already dynamically imported) is the single switch that renders either a `@lucasmarkes/hairline` figure or one of our own SVG figures. Own figures share a pure geometry module (isometric projection, spring step, readout formatters, tested with `node --test`) and one `useFigure` hook that turns the pointer into a single sprung value from 0 to 1.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, `@lucasmarkes/hairline` 0.5.0, Node 22 built-in test runner (type stripping, no new dependencies).

**Spec:** `docs/superpowers/specs/2026-10-12-project-figures-design.md`

## Global Constraints

- All code lives in `main/`; run every command from `C:\Users\tiebe\dev\TiebeVs\TiebeVS\main`.
- Read `main/node_modules/next/dist/docs/` before using a Next API that is not already used in the file (AGENTS.md).
- No new npm dependencies. `motion` stays on 14.
- Figure SVG: `viewBox="0 0 400 320"`, box `aspect-ratio: 5/4`, strokes `vector-effect: non-scaling-stroke`, colours only through `--hairline-plate/hi/edge/mid/lo` and `--hairline-stroke` (set on `.hairline-plate`).
- Readouts: short, English, technical. Exact strings: `gate up`, `gate down · 8 lanes`, `pour N%`, `T−Nd` (U+2212 minus), `steer 0°` / `steer +N°` / `steer −N°`, `at home`, `lent out`.
- `aria-label` of every figure is NL/EN from `dictionary.ts`.
- Never mention the cleaning-company website, tieboard, TVerse or the vault on the site.
- `.stitch-sewn` stays (used by `gear-board.tsx`).
- Edit files with Edit/Write tools, not bash heredocs or PowerShell `Set-Content` (both have corrupted files in this repo before).
- Commit after each task on `main`, message via caveman-commit style, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

- A card is a `<button>` that contains a figure: its accessible name must be the project name only, not the figure label plus the summary. Pinned in Task 2 (`aria-labelledby`, `aria-describedby`).
- Tapping a card on touch: the figure must not swallow the click, and vertical scrolling over a figure must keep working (`touch-action: pan-y`, no `stopPropagation`). Checked in Tasks 2 and 8.
- `prefers-reduced-motion`: own figures stand still at rest. Pinned in Task 4 (hook) and checked in Task 8.
- A project with zero images opens a dialog without an empty "Images" row. Checked in Task 3 (Study Countdown, BMX, Ripple have no images).
- A filter that leaves fewer than 3 cards (Mobile: 2 cards) must not stretch the cards across the row. Checked in Task 2.

---

### Task 1: Remove project status

**Files:**
- Modify: `src/content/types.ts`, `src/content/projects.ts`, `src/content/dictionary.ts`, `src/components/site/catalogue.tsx`, `src/components/site/spec-sheet.tsx`, `src/app/globals.css`
- Delete: `src/components/site/status-label.tsx`

**Interfaces:**
- Produces: `Project` without `status`; `ProjectStatus` no longer exists.

- [ ] **Step 1:** Remove `ProjectStatus` and `Project.status` from `types.ts`; remove all 9 `status:` lines from `projects.ts`.
- [ ] **Step 2:** Remove `catalogue.shipped`, `catalogue.inDevelopment`, `sheet.status` from both locales in `dictionary.ts`.
- [ ] **Step 3:** Remove the `StatusLabel` usage and import in `catalogue.tsx` (index row: grid becomes `grid-cols-[2.5rem_1fr]`) and the status `dt`/`dd` pair in `spec-sheet.tsx`. Delete `status-label.tsx`.
- [ ] **Step 4:** In `globals.css` remove `--color-shipped`, both `--shipped` values, `.stitch-basted`, and change the comments that mention shipped work (line ~67 palette comment, line ~228 label comment) to describe only what remains.
- [ ] **Step 5:** Verify nothing refers to it any more.
  Run: `grep -rn -i "shipped\|inDevelopment\|StatusLabel\|stitch-basted\|ProjectStatus" src`
  Expected: no output.
- [ ] **Step 6:** Run `npm run lint` and `npm run build`. Expected: both exit 0.
- [ ] **Step 7:** Commit: `refactor: drop project status`.

### Task 2: Catalogue as a grid of figure cards

**Files:**
- Modify: `src/content/types.ts`, `src/content/playing.ts`, `src/content/projects.ts`, `src/content/dictionary.ts`, `src/components/site/hairline-figure.tsx`, `src/components/site/catalogue.tsx`
- Create: `src/components/site/project-card.tsx`
- Delete: `src/components/reactbits/DriftWall.jsx`, `DriftWall.css`, `DriftWall.d.ts`

**Interfaces:**
- Produces:
  - `types.ts`: `export type LibraryFigure = "Terminal" | "Hub" | "Stack" | "Rebuild" | "Settle" | "Loupe" | "Format" | "Drawer" | "Sieve" | "Exploded" | "Phosphor" | "Plot" | "Basket" | "Laptop" | "Phone" | "Lockers"` and `export type FigureName = LibraryFigure` (Tasks 5–7 widen it with own names). `Project.figure: FigureName`.
  - `HairlineFigure` default export, props unchanged: `{ name: FigureName; label: string; onRead: (text: string) => void }`.
  - `ProjectCard({ project, locale, figureLabel }: { project: Project; locale: Locale; figureLabel: string })`.
  - `dictionary.catalogue.figures: Record<string, string>`: figure `aria-label` per project slug, NL and EN.

- [ ] **Step 1:** Move `FigureName` from `playing.ts` to `types.ts` as above; `playing.ts` imports it. Impeccable's `figure` becomes `"Loupe"`.
- [ ] **Step 2:** Add `figure` to each project in `projects.ts`. Final names: GO!SmartLib `Drawer`, Ripple `Sieve`, Travel Planning Platform `Exploded`, Mono `Phosphor`. Interim library stand-ins until Tasks 5–7 replace them: Antwerp BMX Raceday `Plot`, PetalPurrs `Basket`, Study Countdown `Laptop`, Kart Race App `Phone`, LocalLend `Lockers`.
- [ ] **Step 3:** Add `catalogue.figures` to the dictionary: one short NL and EN description per slug that describes the final figure (for example, BMX: "Starthek dat neerklapt boven acht baanlijnen" / "Start gate dropping over eight lanes").
- [ ] **Step 4:** Extend the `FIGURES` map in `hairline-figure.tsx` with every `LibraryFigure` name.
- [ ] **Step 5:** Build `ProjectCard` in `project-card.tsx`, styled like the specimen card (`hairline-plate rounded-sm border bg-card`). It is a single `<button type="button">` with `aria-labelledby` = the name element id and `aria-describedby` = the summary id. Inside, from top to bottom: a row with `Art. {artNo}` and the readout (`aria-hidden`), the dynamically loaded `HairlineFigure` (same `dynamic(..., { ssr: false })` + `aspect-[5/4]` placeholder pattern as `specimen-cards.tsx`), category, name (display font, `group-hover:text-tag-ink`), summary (`line-clamp-2`). It calls `useCatalogue().open(slug)` on click. Focus ring: `outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring`.
- [ ] **Step 6:** Rewrite the `Catalogue` body: keep the header (title, intro, filters), drop the `lg:h-[...]` one-screen height, the index list and `DriftWall`. Render `<ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">` with one `<li>` + `ProjectCard` per visible project. Delete the three DriftWall files.
- [ ] **Step 7:** Run `npm run lint` and `npm run build`. Expected: both exit 0.
- [ ] **Step 8:** Visual check in the browser pane (`preview_start` name `portfolio`): 9 cards in 3×3 at desktop; the Mobile filter shows 2 cards that keep their column width; hovering a figure animates it; a click on a card (also on the figure) opens the dialog; Tab reaches each card and Enter opens it; keys 1–9 work inside the catalogue; the screen reader name of a card (via `read_page`) is the project name.
- [ ] **Step 9:** Commit: `feat(catalogue): figure cards replace drift wall`.

### Task 3: Spec-sheet leads with the figure

**Files:**
- Modify: `src/components/site/spec-sheet.tsx`, `src/content/dictionary.ts`
- Delete: `src/components/site/plate.tsx`, `src/components/site/stack-drawing.tsx`

**Interfaces:**
- Consumes: `HairlineFigure`, `catalogue.figures` (Task 2).
- Produces: `dictionary.sheet.images` ("Beelden" / "Images"); `catalogue.drawingLabel` removed.

- [ ] **Step 1:** Replace `Gallery` in the top-left cell with a `hairline-plate` panel holding the dynamically loaded `HairlineFigure` (with its readout above, same pattern as the card) for `project.figure`.
- [ ] **Step 2:** Below the two-column grid, only when `project.images?.length`, render a full-width section with a mono uppercase heading `sheet.images` and the existing embla carousel (slides `aspect-[16/10]`, `object-contain`; arrows only when there are 2 or more images).
- [ ] **Step 3:** Remove `drawingLabel` from both locales; delete `plate.tsx` and `stack-drawing.tsx`. Confirm with `grep -rn "Plate\|StackDrawing\|drawingLabel" src`: no output.
- [ ] **Step 4:** Run `npm run lint` and `npm run build`. Expected: both exit 0.
- [ ] **Step 5:** Visual check: GO!SmartLib dialog shows the figure first and the images row below with working arrows; Study Countdown dialog has no images row; dialog scrolls on a 375px viewport.
- [ ] **Step 6:** Commit: `feat(sheet): figure first, screenshots below`.

### Task 4: Figure foundation (geometry, hook, CSS)

**Files:**
- Create: `src/components/site/figures/geometry.ts`, `src/components/site/figures/geometry.test.ts`, `src/components/site/figures/use-figure.ts`, `src/components/site/figures/figure-frame.tsx`
- Modify: `package.json` (script `"test": "node --test \"src/**/*.test.ts\""`), `tsconfig.json` (add `"**/*.test.ts"` to `exclude`), `src/app/globals.css`

**Interfaces:**
- Produces (`geometry.ts`, no React imports, so Node can run it):
  - `iso(x: number, y: number, z: number): [number, number]`: isometric projection into the 400×320 viewBox, origin `(200, 190)`, 1 world unit = 1 viewBox unit: `[200 + (x - y) * cos30°, 190 + (x + y) * 0.5 - z]`.
  - `pts(...points: [number, number, number][]): string`: SVG `points` string of projected points, each coordinate rounded to 2 decimals.
  - `box(x, y, z, w, d, h): { top: string; left: string; right: string }`: the three visible faces of a cuboid, as `pts` strings.
  - `clamp01(n: number): number`.
  - `springStep(value: number, velocity: number, target: number, dt: number): [number, number]`: semi-implicit Euler, stiffness 170, damping 26.
  - `isSettled(value: number, velocity: number, target: number): boolean`: `|value − target| < 0.001 && |velocity| < 0.001`.
  - Readouts: `gateReadout(v)`, `pourReadout(v)`, `countdownReadout(v)`, `steerReadout(v)`, `lendReadout(v)`, all `(v: number) => string` with `v` in 0..1.
- Produces (`use-figure.ts`): `useFigure(ref: RefObject<HTMLDivElement | null>, opts: { rest: number; fromPointer: (x: number, y: number) => number; readout: (v: number) => string; onRead: (text: string) => void }): number`. It listens for `pointermove`/`pointerdown`/`pointerleave` on `ref` (x, y normalized 0..1 within the box), springs towards the target in one `requestAnimationFrame` loop that stops once `isSettled`, returns to `rest` on leave, calls `onRead` only when the readout string changes (once at mount with the rest readout), and under `prefers-reduced-motion: reduce` ignores the pointer and stays at `rest`. No IntersectionObserver: the loop only runs between pointer input and settling, so off-screen figures are already idle. This meets the "pauses off screen" requirement of spec §4.
- Produces (`figure-frame.tsx`): `FigureFrame({ frameRef, label, children }: { frameRef: RefObject<HTMLDivElement | null>; label: string; children: ReactNode })` renders `<div ref data-figure role="img" aria-label={label}><svg viewBox="0 0 400 320" aria-hidden="true">{children}</svg></div>`.

- [ ] **Step 1: Write the failing tests** in `geometry.test.ts` (`node:test` + `node:assert/strict`, importing `./geometry.ts`):
  - `iso(0,0,0)` deep-equals `[200, 190]`; `iso(10,0,0)` ≈ `[208.66, 195]` (2 decimals); `iso(0,0,10)` deep-equals `[200, 180]`.
  - `box(0,0,0,10,10,10)` returns three non-empty strings with 4 points each.
  - From `(0, 0)` towards target 1 with `dt = 1/60`, `springStep` reaches `isSettled(…, 1) === true` within 120 steps and never exceeds 1.05.
  - `gateReadout(0) === "gate up"`, `gateReadout(1) === "gate down · 8 lanes"`, `gateReadout(0.5) === "gate 45°"`.
  - `pourReadout(0) === "pour 0%"`, `pourReadout(0.374) === "pour 37%"`.
  - `countdownReadout(0) === "T−42d"`, `countdownReadout(1) === "T−0d"`, `countdownReadout(0.5) === "T−21d"`.
  - `steerReadout(0.5) === "steer 0°"`, `steerReadout(1) === "steer +30°"`, `steerReadout(0) === "steer −30°"`.
  - `lendReadout(0.49) === "at home"`, `lendReadout(0.5) === "lent out"`.
- [ ] **Step 2:** Add the `test` script and the tsconfig exclude. Run `npm test`. Expected: FAIL, cannot find module `./geometry.ts`.
- [ ] **Step 3:** Implement `geometry.ts` per the interfaces. Readout rules: gate, `v ≤ 0.02` → up, `v ≥ 0.98` → down, otherwise `gate ${round(v·90)}°`; countdown `round(42·(1−v))`; steer `round((v−0.5)·60)`, sign `+` / `−` (U+2212), none at 0.
- [ ] **Step 4:** Run `npm test`. Expected: all pass.
- [ ] **Step 5:** Implement `use-figure.ts` and `figure-frame.tsx`. Add to `globals.css`, next to `.hairline-plate`: `[data-figure]` (block, relative, `aspect-ratio: 5/4`, `touch-action: pan-y`, `user-select: none`), its `svg` (absolute inset 0, 100%), and the drawing rules copied from hairline: `path, polygon, ellipse, line, polyline` filled with `var(--hairline-plate)`, stroked with `var(--hairline-mid)`, width `var(--hairline-stroke)`, non-scaling, round joins/caps, `transition: stroke 260ms cubic-bezier(0.5,0,0.1,1)`; classes `.nf` (no fill), `.sil` (edge), `.hi`, `.lo`, `.dash` (`stroke-dasharray: 1 3`).
- [ ] **Step 6:** Run `npm run lint` and `npm run build`. Expected: both exit 0.
- [ ] **Step 7:** Commit: `feat(figures): geometry, spring hook and frame`.

### Task 5: StartGate and Teapot

**Files:**
- Create: `src/components/site/figures/start-gate.tsx`, `src/components/site/figures/teapot.tsx`
- Modify: `src/content/types.ts`, `src/content/projects.ts`, `src/components/site/hairline-figure.tsx`

**Interfaces:**
- Consumes: `iso`, `pts`, `box`, `clamp01`, `gateReadout`, `pourReadout`, `useFigure`, `FigureFrame` (Task 4).
- Produces: `OwnFigure = "StartGate" | "Teapot"` (Tasks 6–7 extend it); `FigureName = LibraryFigure | OwnFigure`. Each component: `default export function X({ label, onRead }: { label: string; onRead: (t: string) => void })`.

- [ ] **Step 1: StartGate.** A start hill: a sloped ramp plate with 8 lane lines (`.lo`) running down it, and a gate bar across the top on two posts. `fromPointer`: `1 − clamp01(distance((x, y), (0.5, 0.35)) / 0.55)`, rest 0. The gate rotates forward about its base by `v·90°` (recompute its corner points with `iso`; no CSS transforms). Lane `i` (0–7) gets class `hi` when `v > 0.6 + i·0.05`. Readout `gateReadout`.
- [ ] **Step 2: Teapot.** A teapot (body from stacked `box`/ellipse, spout, handle, lid knob) on a small plinth, with a cup to its right. `fromPointer`: `clamp01((x − 0.3) / 0.5)`, rest 0. The pot tilts towards the cup by `v·40°` about its base edge nearest the cup. When `v > 0.5`, a dashed `.dash .hi` stream runs from spout to cup and the cup's liquid ellipse rises from the bottom to 80% of the cup height, linear in `(v − 0.5) / 0.5`. Readout `pourReadout` of that fill.
- [ ] **Step 3:** Add both to `OwnFigure`, register them in `hairline-figure.tsx` (the switch picks the own component when the name is an `OwnFigure`), set BMX `figure: "StartGate"` and PetalPurrs `figure: "Teapot"`.
- [ ] **Step 4:** Run `npm test`, `npm run lint`, `npm run build`. Expected: all exit 0.
- [ ] **Step 5:** Visual check in light and dark: both figures sit visually next to the library figures (same line weight, plate fill, no foreign colours), react on hover, return to rest on leave, and the readout changes as specified.
- [ ] **Step 6:** Commit: `feat(figures): start gate and teapot`.

### Task 6: FlipClock and Kart

**Files:**
- Create: `src/components/site/figures/flip-clock.tsx`, `src/components/site/figures/kart.tsx`
- Modify: `src/content/types.ts`, `src/content/projects.ts`, `src/components/site/hairline-figure.tsx`

**Interfaces:**
- Consumes: as Task 5, plus `countdownReadout`, `steerReadout`.
- Produces: `OwnFigure` gains `"FlipClock" | "Kart"`.

- [ ] **Step 1: FlipClock.** A desk flip clock: a housing `box`, two digit tiles and a small "d" plate, digits drawn as 7-segment polylines (a segment is `.hi` when on, `.lo` when off). `fromPointer`: `clamp01((y − 0.15) / 0.7)`, rest 0. The days value is the number from `countdownReadout`. When a digit changes, its top flap folds down (flap height eased over ~180 ms by a local timer, not the spring).
- [ ] **Step 2: Kart.** A low kart (chassis plate, seat, 4 wheels as `box`es, steering wheel) on a curved track segment with striped kerbs (`.lo` / `.sil` alternating). `fromPointer`: `clamp01(x)`, rest 0.5. Front wheels rotate about their vertical axis by `(v − 0.5)·60°`; the body leans `(v − 0.5)·6°` the opposite way. Readout `steerReadout`.
- [ ] **Step 3:** Register both, set Study Countdown `figure: "FlipClock"` and Kart Race App `figure: "Kart"`.
- [ ] **Step 4:** Run `npm test`, `npm run lint`, `npm run build`. Expected: all exit 0.
- [ ] **Step 5:** Visual check as in Task 5, Step 5.
- [ ] **Step 6:** Commit: `feat(figures): flip clock and kart`.

### Task 7: Lend

**Files:**
- Create: `src/components/site/figures/lend.tsx`
- Modify: `src/content/types.ts`, `src/content/projects.ts`, `src/components/site/hairline-figure.tsx`

**Interfaces:**
- Consumes: as Task 5, plus `lendReadout`.
- Produces: `OwnFigure` gains `"Lend"`.

- [ ] **Step 1: Lend.** Two small houses (`box` body + pitched roof polygons) side by side, a shelf in front of each, a drill (body, handle, chuck) on the left shelf at rest. `fromPointer`: `clamp01((x − 0.2) / 0.6)`, rest 0. The drill follows a dashed `.lo` arc from the left shelf to the right shelf, at position `v` along the arc, lifting at most 30 units at the middle. The house it is closer to gets a `.hi` door.
- [ ] **Step 2:** Register it and set LocalLend `figure: "Lend"`. Remove the now unused stand-ins (`Plot`, `Basket`, `Laptop`, `Phone`, `Lockers`) from `LibraryFigure` and the `FIGURES` map.
- [ ] **Step 3:** Run `npm test`, `npm run lint`, `npm run build`. Expected: all exit 0.
- [ ] **Step 4:** Visual check as in Task 5, Step 5.
- [ ] **Step 5:** Commit: `feat(figures): lend`.

### Task 8: Docs, full check and performance

**Files:**
- Modify: `main/PRODUCT.md`, `main/DESIGN.md`, `main/.impeccable/surfaces/src-app-page-tsx.md` (wherever they mention status, the shipped colour, screenshots as the plate, the technical drawing or the Drift Wall)

- [ ] **Step 1:** Update the docs to describe figure cards, the figure-first dialog and the absence of status. Confirm: `grep -rn -i "shipped\|drift wall\|in development\|stack drawing\|technical drawing" PRODUCT.md DESIGN.md .impeccable/surfaces`: no hits left that describe the old behaviour.
- [ ] **Step 2:** Full check in the browser pane at `/` and `/en`, light and dark, desktop and 375px (`resize_window` preset mobile, reset to desktop afterwards): cards, filters, dialog with and without images, keyboard (Tab, Enter, 1–9, Escape), vertical scrolling with a finger over a figure, `prefers-reduced-motion` (own figures stay at rest).
- [ ] **Step 3:** Production build and fps: `npm run build`, start `next start -p 3100` (`preview_start` name `portfolio-prod`), scroll through the catalogue and the "Werkwijze" cards at CPU 4× (puppeteer script as in the 2026-10-10 session, or Chrome DevTools performance trace). Expected: scroll stays at or above ~60 fps. If not, find the cause before changing anything.
- [ ] **Step 4:** Commit: `docs: figures replace screenshots and status`.
