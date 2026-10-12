# Projects as figures: design

Date: 2026-10-12. Approved in chat by Tiebe.

## Goal

The catalogue no longer leads with screenshots. Every project is shown as an interactive line figure, in the same style as the hairline figures on the "Waar ik nu mee speel" cards. A click opens the existing spec-sheet dialog for the real view of the project. The shipped / in-development status disappears from the whole site.

## Decisions (from Tiebe)

- Keep the spec-sheet dialog. No per-project pages.
- The first image of a project is never a screenshot, not on the card and not at the top of the dialog.
- Figures must truly fit the project. Library figures only where they really fit; the rest are drawn by hand in the same style (option 1).
- Remove "Opgeleverd / In ontwikkeling" everywhere.

## 1. Catalogue

- Remove the Drift Wall and the numbered index list in `catalogue.tsx`.
- Show a grid of 9 project cards: 3 columns from `lg`, 2 from `sm`, 1 on phones. All cards are the same size; no wide cards.
- The section no longer has to fit one screen (drop `lg:h-[calc(100svh-3.5rem)]`).
- The card follows the specimen-card style (`hairline-plate`, `rounded-sm border bg-card`):
  - Top row: `Art. 0N` on the left, the figure's live readout on the right (`aria-hidden`).
  - The figure.
  - Category (mono, uppercase, muted), name (display font), summary (muted, max ~2 lines).
- The whole card is one `<button>` that calls `open(slug)`. Keys 1 to 9 keep working (`catalogue-provider.tsx` is unchanged).
- Filters (All / Web / Mobile / Other) stay.

## 2. Spec-sheet dialog

- Top left: the project's figure, large, in place of the `Plate`.
- On the right: text, years, team, own part, stack and links, as now, without the status row.
- Below, full width and only when the project has `images`: a row titled "Beelden" / "Images" with the existing screenshot carousel.
- The figure inside the dialog is a second instance, which is fine. Figures rest when they are off screen.

## 3. Figures per project

| Art. | Project | Figure | Source |
| --- | --- | --- | --- |
| 01 | GO!SmartLib | `Drawer` | hairline |
| 02 | Antwerp BMX Raceday | `StartGate` | own |
| 03 | Ripple | `Sieve` | hairline |
| 04 | Travel Planning Platform | `Exploded` | hairline |
| 05 | LocalLend | `Lend` | own |
| 06 | Kart Race App | `Kart` | own |
| 07 | PetalPurrs | `Teapot` | own |
| 08 | Mono | `Phosphor` | hairline |
| 09 | Study Countdown | `FlipClock` | own |

"Waar ik nu mee speel": Impeccable switches from `Exploded` to `Loupe` (design review), so no figure appears twice on the page.

### Own figures

| Figure | Drawing | Pointer | Readout (rest → active) |
| --- | --- | --- | --- |
| `StartGate` | BMX start hill: a gate across 8 lanes, the lanes running down the ramp | The closer the pointer, the further the gate falls forward; once it is down, the lanes light up one by one from the gate | `gate up` → `gate down · 8 lanes` |
| `Teapot` | Teapot on a plinth with a cup next to it | Pointer x tilts the pot; past a threshold the cup fills, with a dashed stream | `pour 0%` → `pour 100%` |
| `FlipClock` | Desk flip clock with 3 digit tiles and a "d" plate | Pointer y counts days from 42 down to 0; each change flips the tile | `T−42d` → `T−0d` |
| `Kart` | Kart on a curved piece of track with kerbs | Pointer x sets the steering angle; front wheels turn, body leans a little, on a spring | `steer 0°` → `steer ±30°` |
| `Lend` | Two small houses next to each other with a drill between them on a shelf | Pointer x carries the drill from one house to the other along a dashed arc | `at home` → `lent out` |

Readouts stay short, English and technical, like the library's (`rate 1.00×`, `az 045°`). The accessible name (`aria-label`) is NL/EN and comes from the dictionary.

## 4. Building the own figures

The hairline package has no API for custom figures, so the own figures re-create its conventions:

- `viewBox="0 0 400 320"`, box `aspect-ratio: 5/4`, the SVG absolutely filling the box.
- Isometric plates filled with the plate colour, painted back to front; strokes ~1px with `vector-effect: non-scaling-stroke`, round joins and caps.
- Colours only through the existing tokens on `.hairline-plate` (`--hairline-plate/hi/edge/mid/lo`, `--hairline-stroke`). Classes: `sil` (edge), `hi` (active), `lo` (faint), `dash`.
- The figure CSS is our own, scoped to `[data-figure]` in `globals.css`. It does not rely on the library's injected styles, which only appear once a library figure mounts.

Files:

- `src/components/site/figures/engine.ts`: `iso(x, y, z)` projection to the 400×320 viewBox, plus a `useFigure` hook. The hook maps pointer to 0..1 coordinates, runs a spring towards the target in `requestAnimationFrame`, stops the loop once at rest, pauses off screen (IntersectionObserver) and keeps the figure static at rest under `prefers-reduced-motion`. It reports the readout through `onRead`.
- One component per figure: `start-gate.tsx`, `teapot.tsx`, `flip-clock.tsx`, `kart.tsx`, `lend.tsx`. Each takes the same props as `HairlineFigure` (`label`, `onRead`) and renders `<div data-figure role="img" aria-label>` + `<svg aria-hidden>`.
- `hairline-figure.tsx` becomes the single switch for both sources: library names plus own names. It stays dynamically imported, so the figure code stays out of the main bundle.
- Pointer events are on the figure box. The card stays clickable: the figure does not stop propagation and has no tabindex.

## 5. Data and removals

- `types.ts`: remove `ProjectStatus` and `status`, add `figure: FigureName` (union of library and own names). Move `FigureName` from `playing.ts` to `types.ts` so both `playing.ts` and `projects.ts` use it.
- `projects.ts`: remove `status`, add `figure` per project (table above). `images` stays, for the dialog.
- `dictionary.ts`: remove `catalogue.shipped`, `catalogue.inDevelopment`, `sheet.status`, `catalogue.drawingLabel` (only `Plate` uses it). Add the "Images" row title and the figure labels for the 9 projects (NL/EN).
- Delete: `status-label.tsx`, `plate.tsx`, `stack-drawing.tsx` (once unused), `components/reactbits/DriftWall.{jsx,css,d.ts}`.
- `globals.css`: remove `--shipped` / `--color-shipped` (light and dark) and `.stitch-basted`. **Keep `.stitch-sewn`**: `gear-board.tsx` uses it.
- Update `PRODUCT.md` / `DESIGN.md` where they mention status, the shipped colour, screenshots as the plate, or the Drift Wall.

## 6. Verification

- `npm run lint` and `npm run build` without errors.
- Visual check in the browser pane: `/` and `/en`, light and dark, 375px mobile, every own figure responding to the pointer, the dialog with and without screenshots.
- Keyboard: tab to a card, Enter opens the dialog, keys 1–9 inside the catalogue.
- Reduced motion: figures stand still.
- Performance: production build, fps scroll measurement as in the previous session (target: no drop under ~60 fps at CPU 4×, up to 16 figures on the page).

## Out of scope

- Per-project pages, routes, sitemap.
- New screenshots (Tiebe adds them himself).
- Content changes to project texts.
