# HANDOFF: portfolio redesign tiebe.vercel.app

Written 2026-10-10, updated the same day after the second session. Read this whole file first. Talk to Tiebe in Dutch (he writes Dutch; TVerse `me.md` asks for English answers in vault context, but this project chat has been Dutch throughout). Keep answers short.

## Where things are

| What | Path |
| --- | --- |
| Repo (git) | `C:\Users\tiebe\dev\TiebeVs\TiebeVS` |
| Next.js app | `C:\Users\tiebe\dev\TiebeVs\TiebeVS\main` (all code lives here) |
| Branch | `redesign/next` (NOT pushed yet). `main` = old Vite site, still live. |
| Remotes | `origin` = github.com/Tiebe-Vaes/TiebeVS (public), `upstream` = github.com/TiebeVS/TiebeVS |
| Last commits | `4779efb` fjord/topo palette + motion libs, `5e85164` finish after review, `ae0b025` Next rebuild |
| Product / design docs | `main/PRODUCT.md`, `main/DESIGN.md`, `main/.impeccable/design.json`, surface brief `main/.impeccable/surfaces/src-app-page-tsx.md` |
| Plan (older) | `PLAN-redesign.md` (repo root) |
| Dev server | Claude browser pane: `preview_start` name `portfolio` (config in `C:\Users\tiebe\OneDrive\Documenten\.claude\launch.json`, runs `npm --prefix ...\main run dev`, port 3000) |
| Review captures | `main/.impeccable/review/*.png` (gitignored). Capture script (puppeteer-core + local Chrome): `C:\Users\tiebe\AppData\Local\Temp\claude\C--Users-tiebe-OneDrive-Documenten\a190b2ed-1264-4ecd-9975-feb06185c91a\scratchpad\cap\capture.mjs` (needs `npx next start -p 3100` on a production build). Temp folder may be gone; recreate if needed. |
| Vault (Obsidian, "TVerse") | `C:\TVerse`. Read `CLAUDE.md` → `AIOS/me.md` → `AIOS/vault-map.md`, `AIOS/skill-map.md`. Only open when Tiebe mentions TVerse/vault. |

## Stack (installed)

Next.js 16.3.8 (App Router, Turbopack, two root layouts: `src/app/(nl)` for `/` and `src/app/en` for `/en`; static + ISR 1 day for the GitHub fetch), React 19, TypeScript, Tailwind v4, shadcn/ui **base-nova on Base UI** (`components.json`, registries `@kokonutui`, `@bklit`), `cn` npm package (official shadcn, do not remove), motion **14** (must stay 14: a registry install once downgraded it to 12.43 and broke `useSpring` exports in Turbopack), gsap + @gsap/react (ScrollTrigger, SplitText), lenis, vanta + p5@1.x (Vanta TOPOLOGY), simple-icons, lucide-react, next-themes, bklit heatmap (`src/components/charts/heatmap`, locally patched for locale props), React Bits SpotlightCard + TiltedCard (`src/components/`, locally adapted). Fonts: Archivo (wdth axis) + Martian Mono via next/font; static Archivo TTFs in `src/assets/fonts` for the OG image.

Next 16 note: read `main/node_modules/next/dist/docs/` before using Next APIs (AGENTS.md rule).

## Page structure (current)

Header (Catalogus, Over mij, Contact, NL/EN, theme) → Hero (amber hang tag + pitch/facts, over Vanta TOPOLOGY canvas + static `hero-map.tsx` contour sheet) → Catalogus (9 projects, filters, spec-sheet dialog, keys 1–9 scoped to catalogue, plates = screenshot or isometric stack drawing) → Over mij (bio + route profile of interests + education + language bars) → Uitrusting (draggable skill patches, gear-board) → Op GitHub (stats row + heatmap, `src/lib/github.ts` scrapes github.com/users/Tiebe-Vaes/contributions) → Contact (amber block). Content: `src/content/{profile,projects,dictionary,types}.ts`.

## ALL user decisions and inputs (binding)

Identity/content
- Audience: recruiters, job as full-stack developer after graduating 2027. NO internship asks.
- Education order: AP Hogeschool (Toegepaste Informatica, software) Sep 2024 – Dec 2026, then final semester + degree at OsloMet Jan–Jun 2027. Keep high-school rows (Pius X, 2018–2024).
- Tag text: "Studeert af in 2027" / "Graduates in 2027". No age anywhere.
- Languages: Dutch C2, English C1, shown as loading bars.
- Interests (route waypoints): Hoboken, AP, Scouts (leader 2024–2026), Makerlab (3D printers, laser cutters), Fotografie (replaced fitness), Bergen/hiking, Experimenten (side projects, new tech), Oslo 2027.
- Contact: e-mail tiebevaes@gmail.com, location 2660 Hoboken, GitHub, LinkedIn (linkedin.com/in/tiebevaes). **No phone number, no CV, no GitLab link.**
- **Never mention the cleaning-company website (SR Schoonmaak), not even anonymously** — anywhere public. Rule is also in TVerse `AIOS/me.md` and in Claude memory. It is still listed on his LinkedIn (he removes it himself).
- tieboard is never listed.
- No project is featured/highlighted above others.
- Projects (9): GO!SmartLib, Antwerp BMX Raceday (stack: React+TS+MUI, Spring Boot Java 21, PostgreSQL, WebSocket/STOMP, PWA, JUnit 5 + Testcontainers, Docker + GitLab CI), Ripple (team of 4, Tectonic Hackathon 2026, SD Worx case; repo github.com/dylanhavelaerts/Tectonic-Hackaton — never commit there), Travel Planning Platform, LocalLend, Kart Race App, PetalPurrs, Mono, Study Countdown.
- Screenshots: Tiebe adds them himself (do NOT spawn agents to take them). Missing: BMX, Ripple, Study Countdown. Put in `main/public/`, list in `images` in `projects.ts`.

Design/tech choices
- Full redesign, Next.js + TS; routes `/` NL and `/en` EN; light/dark.
- Concept "Field Gear Catalogue" (impeccable direction, seed 31028e19), now on a topographic map.
- Palette (2026-10-08): "fjord colours with topo-map vibe": light = map paper + fjord ink + fjord-blue lines + amber tag; dark = fjord night + mist lines + same amber + aurora green for shipped. Tokens in `src/app/globals.css`.
- Wanted libraries: Lenis, GSAP, Vanta (TOPOLOGY behind hero), React Bits (chosen: Spotlight + Tilted Card; Variable Proximity on the name was REMOVED at his request). Also earlier: shadcn, Kokonut UI, bklit UI, motion.dev, impeccable, Vercel React rules. 21st.dev MCP skipped (use registry URLs if needed).
- Removed at his request: "Route Hoboken – Oslo" title (route merged into "Over mij"), materials bar chart (replaced by GitHub heatmap), footer "Gebouwd met..." credit, Next dev indicator badge (`devIndicators: false`), name hover effect.
- Use impeccable for reviews.

## Status 2026-10-10 (second session)

Plan: `docs/superpowers/plans/2026-10-10-portfolio-fase2.md`. Commits on `redesign/next` (not pushed): `c588a3f` lag fix, `125f81b` Lenis + logo loop + carousel + slats, `ba2dd4a` ranking, `b478daf` effects, `315de83` detector fixes.

- **Lag fixed.** Vanta/p5, GSAP, Spotlight, Tilt, gear-board drag/springs, heatmap animation removed. Prod, CPU 4x: hero 3.3 → 120 fps, scroll 8.9 → 74+ fps, heap 50 → 13 MB. Measuring: `scratchpad/perf/fps-late.mjs` (puppeteer-core + local Chrome against `preview_start portfolio-prod`, port 3100, after `npm run build`). Watch out: anything with many 3D layers makes every frame on the page pay for Layerize (the curved carousel did: kit section 11 fps), hence `curve={0}` + `content-visibility:auto` on the carousel.
- **Added:** light Lenis (`smooth-scroll.tsx`); React Bits in `src/components/reactbits/` (vendored, lint-ignored): Logo Loop (full-bleed band under the hero, patched to pause off screen), Circular Carousel (catalogue, projects with screenshots only; rows no longer show plates), Micro Slats (fjord at the bottom of the contact block, ogl, lazy). "Waar ik nu mee speel" ranking (`content/playing.ts`, `now-playing.tsx`, one hairline figure via `hairline-figure.tsx`). Effects 1,2,3,6,7,8,9 back (`reveal.tsx`, hang tag, route hiker walk, `hold-to-copy.tsx`); 4 and 5 skipped as redundant.
- **Rule:** never mention TVerse/the vault on the site (Obsidian is fine).

## Open, in this order

1. **Topo Field** (21st.dev/@mengto/components/topo-field) needs a 21st.dev login for its code. Tiebe pastes the code into `main/src/components/topo-field.tsx`; then put it behind `HeroMap` in the hero, paused off screen, and measure (hero ≥ 55 fps).
2. **Fonts:** proposal given in chat (Archivo + Martian Mono now); switch only after Tiebe picks.
3. **apple-design skill** install (handoff item 4 of the first session) still to do.
4. **Push / deploy:** Vercel is connected with Root Directory = `main`. Push `redesign/next` to origin for a preview; merge to `main` only after Tiebe's OK.
5. impeccable finish-reviewer round on prod captures was not run this session (detector is clean).

## Still-open items (lower priority)

- Phone number and CV are still in the public git history of `main` (old commits). Removing needs a history rewrite + force push — only if Tiebe explicitly asks.
- PetalPurrs `liveUrl` points to a WordPress blog — fine as is.
- Tiebe's own part ("Mijn deel") is missing for BMX, Ripple and others; ask him for facts, never invent.
- Study Countdown has no concrete detail; ask him.
- LinkedIn still lists the cleaning-company project (he removes it).

## What worked

- impeccable flow: `impeccable context`, direction via concept-seed + decision page, surface brief contract, finish reviewer agent (`impeccable-finish-reviewer`) with production-build captures, documenter (`impeccable-documenter`) for DESIGN.md. Detector: `C:\Users\tiebe\.claude\skills\impeccable\scripts\impeccable.cmd detect --json <files>`.
- Captures: production build + puppeteer-core with local Chrome; walk the page once with scrolling so reveals play, then full-page capture; real 375px viewport for mobile (headless Chrome CLI cannot go below ~500px).
- Text edits: use the Edit/Write tools or node scripts reading from files. Bash heredoc/`node -e` with backticks or `${}` corrupts files (happened to `github.ts`); PowerShell 5.1 `Get-Content`/`Set-Content` mangles UTF-8.
- shadcn registry adds: pipe `yes n |` to avoid overwriting `utils.ts`/`button.tsx`; afterwards check `globals.css` for the bklit `var(----chart-…)` bug and re-check `motion` version.
- Heatmap width: fixed cell size computed from data (not JS-measured) so captures are deterministic.
- Vendored fixes recorded in code comments (button variants `ink`/`tag`/`tagOutline` with `!` border colour, slider focus via `has-[:focus-visible]`, dialog `closeLabel`, heatmap locale props, chart-loading-label import path).

## What didn't work

- Haiku screenshot agents for project screenshots: stopped, Tiebe does screenshots himself.
- Variable Proximity on the name: removed by request.
- Full-page capture with a viewport as tall as the document: hid chart reveals / mis-sized the heatmap. Scroll-walk then capture instead.
- Vanta alone did not read as a topo map (looked like fibre); the static `hero-map.tsx` sheet fixed that. Vanta is now likely redundant and a lag source.
- `npx skills` / `vercel` via PowerShell: use Bash. Vercel CLI not authenticated.

## Session protocol for the next agent

1. Read this file, `main/PRODUCT.md`, `main/DESIGN.md`, the surface brief.
2. Start the dev server (`preview_start` name `portfolio`).
3. Do the LATEST requests in order; measure lag before removing; ask Tiebe to choose effects and the favourite-tech section; commit per step on `redesign/next` (attribution line from the system prompt).
4. Finish with an impeccable review round and a production build; then the Vercel push flow (item 6).
