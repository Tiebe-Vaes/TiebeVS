# Plan: redesign portfolio tiebe.vercel.app

Status: voorstel, nog niets aan de site gewijzigd. Datum: 2026-10-06.
Product-record: [main/PRODUCT.md](main/PRODUCT.md).

## Beslist (interview 2026-10-06)

| Vraag | Keuze |
| --- | --- |
| Scope | Volledige redesign: inhoud en functies blijven, huidige look (vliegtuig, aurora, bergen) alleen referentie |
| Stack | Next.js App Router + TypeScript, statisch op Vercel |
| Publiek | Recruiters, job na afstuderen 2027, geen stagevraag |
| Persoonsgegevens | Mail, gsm, adres, GitHub, LinkedIn. GitLab weg (link werkt niet) |
| Projecten | Gecureerde vaste lijst, geen GitHub/GitLab-API meer |
| 21st.dev | Geen MCP; componenten via hun shadcn-registry-URL's |
| Vercel-regels | `vercel-labs/agent-skills` installeren |
| CV | Huidige `public/CV Tiebe Vaes.pdf` blijft |
| Build path | Code-led (geen image generation op deze machine) |

## Skills en tools, in volgorde

| Fase | Skill / tool | Waarvoor |
| --- | --- | --- |
| 0 | `superpowers:using-superpowers` | Bepaalt per stap welke skill eerst moet (de "skill-kiezer") |
| 0 | `find-skills` | Vercel-skills zoeken en installeren |
| 0 | TVerse `AIOS/skill-map.md` | Nieuwe skills naar `AIOS/skills` + junction, skill-map bijwerken |
| 1 | `impeccable` (init, done) | PRODUCT.md |
| 1 | `superpowers:brainstorming` + `impeccable` new-work | Richting kiezen: concept-seed, beslispagina, direction contract |
| 2 | `vercel-react-best-practices`, `web-design-guidelines` (Vercel) | Regels voor Next.js-code en UI-review |
| 2 | `shadcn` | `components.json`, componenten, registries (@kokonutui, @bklit, 21st.dev-URL's) |
| 2 | `migrate-radix-to-base` | Alleen als de gekozen shadcn-basis Base UI is en een registry Radix levert |
| 3 | `motion-framer` + `modern-web-design` | motion.dev (`motion/react`): signature interaction, scroll reveals, layout transitions |
| 3 | `impeccable` animate / typeset / layout / colorize | Per onderdeel na de richting |
| 3 | `frontend-design:frontend-design` | Tweede blik op esthetiek, geen template-look |
| 4 | `impeccable` audit + harden, `design:accessibility-review` | WCAG AA, reduced motion, NL/EN, edge cases |
| 4 | `impeccable` detect, finish-reviewer, documenter | Verplichte afsluiting: review, DESIGN.md + `.impeccable/design.json` |
| 4 | `superpowers:verification-before-completion` | Build, lint, Lighthouse vóór "klaar" |
| 5 | `caveman-commit`, `superpowers:finishing-a-development-branch` | Commits op een branch, PR/merge-keuze |
| 5 | TVerse `context` | Contextnotitie bijwerken (alleen op vraag) |

Niet gebruikt: GSAP-skills (motion.dev gekozen), 3D-skills (three/R3F/Spline: zwaar, alleen als de gekozen richting het vraagt), `ponytail`-regels gelden wel: geen code die niets doet.

## Bibliotheken

- `next`, `react`, `typescript`, `tailwindcss` v4
- shadcn/ui: `button`, `dialog` of `drawer` (projectdetail), `tabs`/`toggle-group` (filters), `tooltip`, `badge`, `carousel` (galerij), `sheet` (mobiel menu)
- Kokonut UI (`@kokonutui`): kandidaten voor hero-tekst, project cards, theme toggle, na de richting gekozen
- bklit UI (`@bklit`): grafiekcomponent voor een eerlijke stack/projecten-visualisatie (bv. tech per project), alleen echte data
- 21st.dev: losse componenten via `npx shadcn add "https://21st.dev/r/..."` als ze de richting dienen
- `motion` (motion.dev) vervangt `framer-motion`
- `next-themes` (light/dark), `next/font` (zelf gehoste fonts), `next/image` (screenshots)
- Eruit: `tsparticles` (3 pakketten), `framer-motion`, CDN-iconen van simpleicons → lokale SVG via `simple-icons` pakket of `lucide-react`

## Inhoud die verandert

**Blijft (feiten):** naam, opleiding (3 items), contactgegevens, cv, screenshots, beschrijvingen van GoSmartLib, RedLine/Kart Race App, LocalLend, Mono, Travel planning, PetalPurrs.

**Wijzigt:**
- Tagline "Building smart digital solutions" → rolregel gelijk aan LinkedIn: "Full-stack developer · TypeScript, React, Next.js, Java, Spring Boot".
- About: leeftijd/"19 jaar" nakijken (zie vragen), fitness/scouts-zin herschrijven zonder stagevraag, Erasmus OsloMet 2027 en afstuderen 2027 erbij.
- "GoSmartLib" → "GO!SmartLib" (zoals op LinkedIn/GitHub).
- RedLine / "intro-mobile-react" → naam afstemmen met GitHub-repo `kart-race-app`.
- Projectlinks naar hernoemde repo's (`travel-planning-architecture`, `kart-race-app`).
- Skills: uitbreiden met wat LinkedIn/GitHub tonen en onderbouwd is (shadcn/ui, Expo, PostgreSQL, Jest/Vitest, Docker), gegroepeerd.
- Contact: LinkedIn toevoegen, JSON-LD `sameAs` met LinkedIn en GitHub.
- Projects-subtitel "Automatisch ingeladen vanuit GitHub/GitLab" weg.

**Nieuw (projecten, feiten uit de vault-contextnotities):**
- Antwerp BMX Raceday (AP-klantproject J3) — tekst uit `Context - Antwerp BMX Raceday`.
- Ripple (Tectonic Hackathon 2026, SD Worx-case, team) — tekst uit `Context - Ripple`.
- Study Countdown (Angular 20 + Electron).
- Uitgelicht bovenaan: GO!SmartLib, Antwerp BMX Raceday, Ripple (echte klanten/case).

**SEO:** `metadata` per taal in Next (`title` "Tiebe Vaes — Full-stack developer"), canonical `https://tiebe.vercel.app`, OG-image gegenereerd met `next/og`, `sitemap.ts`, `robots.ts`, JSON-LD statisch in de HTML. Daarna Search Console (doe jij zelf).

## Uitvoering in fases

**Fase 0 — Voorbereiding**
1. Branch `redesign/next` in `C:\Users\tiebe\dev\TiebeVs\TiebeVS`.
2. `npx skills add vercel-labs/agent-skills` → skills naar `C:\TVerse\AIOS\skills`, junction terug, skill-map aanvullen.

**Fase 1 — Richting (impeccable new-work, mode Experience/Persuade)**
3. Brainstorm: mechanisme, publiek, cultuurwereld, zeven kandidaten.
4. `impeccable concept-seed --scope direction`, beslispagina in de browser: jij kiest de richting.
5. Direction contract in de surface brief (`impeccable surface-brief write`).

**Fase 2 — Fundament**
6. Next.js-app in `main/` (zelfde map, Vercel-config blijft werken; `vercel.json` aanpassen of Root Directory = `main` in het Vercel-dashboard, dat doe jij).
7. shadcn init, registries `@kokonutui` en `@bklit` in `components.json`.
8. Content naar `content/projects.ts`, `content/profile.ts`, i18n NL/EN (routes `/` en `/en` voor SEO, of één route met toggle: zie vragen).

**Fase 3 — Bouwen**
9. Hero (first viewport volgens contract), projecten met detail (dialog/drawer + carousel), over mij + opleiding, skills, contact.
10. Signature interaction en motion met `motion`, `prefers-reduced-motion` gerespecteerd.
11. Thema light/dark met `next-themes`.

**Fase 4 — Kwaliteit**
12. Lint, `next build`, screenshots desktop 1440 + mobiel 390 in de in-app browser.
13. `impeccable detect`, finish-reviewer, fixronde (max 2), documenter → DESIGN.md.
14. Lighthouse ≥ 95 op performance, a11y, SEO.

**Fase 5 — Oplevering**
15. Commits per fase, PR op GitHub `Tiebe-Vaes/TiebeVS`; mergen en deployen beslis jij.

## Bijsturing na eerste build (2026-10-06)

- Geen project uitgelicht; de hero-tekening gaat over Tiebe: route Hoboken – Oslo met interesses als waypoints.
- Projecten zonder screenshot tonen een technische tekening van hun eigen lagen.
- Meer witruimte overal; vaardigheden als versleepbare badges op een topo-bord.
- Materiaalgrafiek vervangen door GitHub-activiteit (bklit heatmap, echte data, dagelijks ververst).
- GitLab-link weg; footer-credit weg.
- Het schoonmaakproject wordt nergens vermeld (regel in TVerse `AIOS/me.md`).

## Open vragen (beantwoord 2026-10-06)

- Leeftijd: weg.
- tieboard: niet op de site.
- Talen: aparte routes `/` (NL) en `/en` (EN).
- Ripple: team van 4 op de Tectonic Hackathon 2026 klopt.
- Screenshots nieuwe projecten: voorlopig geen, kaarten zonder beeld.
