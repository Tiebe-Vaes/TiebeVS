# Tiebe Vaes · Portfolio

My personal portfolio, live at **[tiebe.vercel.app](https://tiebe.vercel.app)**.

The site presents me and my work as a technical outdoor gear catalogue on a topographic map: a hang tag for the maker, a route profile for the person and numbered catalogue items with spec sheets for the projects. Dutch on `/`, English on `/en`.

## What's on it

- **Hang tag hero**: name, role and stack on an amber tag that swings toward the pointer, with live local time in Hoboken, over a topographic map sheet with live Vanta.js contour lines.
- **About me**: a route profile of my interests (AP, scouts, maker lab, photography, mountains, side projects, Oslo 2027). A hiker follows the pointer along the ridge; a slider does the same for keyboard users.
- **Catalogue**: nine projects with filters, a spec sheet per project (keys 1–9 open them directly) and a screenshot gallery. Projects without screenshots get an isometric drawing of their own stack.
- **Kit**: every tool I use as a draggable patch on a contour map that drifts with the pointer.
- **GitHub activity**: my public contribution calendar, fetched at build time and refreshed daily.
- Light and dark theme, `prefers-reduced-motion` respected throughout, static pages with full metadata, sitemap, Open Graph card and JSON-LD.

## Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router, static generation with daily revalidation), React 19, TypeScript |
| UI | Tailwind CSS 4, shadcn/ui on Base UI, Kokonut UI, bklit UI (heatmap), lucide and Simple Icons |
| Motion | Motion (motion.dev), GSAP (ScrollTrigger, SplitText), Lenis smooth scroll, Vanta.js TOPOLOGY, React Bits (Spotlight Card, Tilted Card) |
| Type | Archivo (variable width) and Martian Mono via `next/font` |
| Hosting | Vercel |

## Project structure

```
main/
├─ src/app/            routes: (nl)/ for Dutch, en/ for English, plus icon, sitemap, robots, OG images
├─ src/components/site the page sections (hang tag, route, catalogue, kit board, GitHub heatmap, ...)
├─ src/components/ui   shadcn/ui components (managed by the shadcn CLI)
├─ src/components/charts  bklit chart components (managed by the shadcn CLI)
├─ src/content/        all copy and data: profile, projects, NL/EN dictionary
├─ src/lib/github.ts   GitHub contribution calendar parser
└─ public/             project screenshots
```

## Run locally

```bash
cd main
npm install
npm run dev
```

`npm run build` makes a production build; `npm run lint` checks the code.

## Adding or updating a project

Projects live in `main/src/content/projects.ts`. Each entry has a catalogue number, NL/EN texts, the stack and optional links. To add screenshots, put the images in `main/public/` and list their paths in the project's `images` array; the first one becomes the catalogue plate.

## Deploying

The Next.js app lives in `main/`, so the Vercel project's **Root Directory** is set to `main`. Pushing to `main` deploys production.
