---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/en/page.tsx"]
---

# Surface brief: portfolio home (`/` NL, `/en` EN)

Scope: the single-page portfolio, both locales. Visitor mode: Experience (the work leads, with interactive signatures in the first viewport).
Audience and job: recruiters from LinkedIn, GitHub or Google decide in under a minute whether to contact Tiebe for a full-stack job after graduation in 2027.
Proof: curated projects with real descriptions and Tiebe's own part; screenshots where they exist, a technical drawing of the project's own stack where they do not. Real public GitHub activity.
Constraints: see PRODUCT.md. No invented metrics, clients or quotes. No age. No tieboard. No cleaning-company website. No GitLab link. No phone number, no CV. No project is featured above the others. Reduced motion respected (no smooth scroll, no reveals, no Vanta, no tilt).
Memorable moment: the topographic contours flowing behind the amber hang tag; walking the hiker along the ridge of interests; name letters that widen toward the pointer.
Unresolved: screenshots for Antwerp BMX Raceday, Ripple and Study Countdown (Tiebe will provide). A new "favourite tech right now" showcase section is proposed, not built.

## Direction contract

THESIS: Tiebe and his work presented as a technical outdoor gear catalogue read on a topographic map: an amber hang tag for the maker, a route profile for the person, numbered catalogue items with spec sheets and technical drawings for the work. Refuses the dark neon dev portfolio with a bento grid and glowing cards.

OWN-WORLD: Fjord and topo map (revised 2026-10-08 at Tiebe's request). Light: topographic map paper (oklch 0.967 0.005 160) with fjord ink, fjord-blue technical lines and contours, amber hang tag and accents, map-green for shipped. Dark: fjord night (oklch 0.235 0.04 245) with mist lines, the same amber, aurora green for shipped. Vanta.js TOPOLOGY draws live contour lines behind the hero; static contour lines on the route and kit board; ripstop grid only on technical-drawing plates. Archivo (wdth axis) condensed for display, Martian Mono for labels, numbers and readouts. Labels sewn (dashed) when shipped, basted (dotted) when in development; kit patches are sewn patches. Motion: Lenis smooth scroll with GSAP ScrollTrigger reveals (headings word by word via SplitText, blocks rise), React Bits Variable Proximity on the name, Spotlight on catalogue rows, Tilted Card on plates.

STORY: The visitor sees who Tiebe is on the hang tag and the pitch beside it, scans the catalogue (art. 01-09), opens an item's spec sheet, reads "Over mij" and walks his route (Hoboken, AP, scouts, maker lab, photography, mountains, experiments, Oslo 2027), sees education and language levels, plays with his kit, sees his GitHub activity, and contacts him by e-mail.

FIRST VIEWPORT: Full-height hero over the live topology contours. Left 5/12: amber hang tag on a carabiner, tilted, swinging toward a mouse; "Tiebe Vaes" in condensed display with letters that widen toward the pointer, role, stack row, art. no. TV-2027, live Hoboken time, "Studeert af in 2027", actions: view catalogue (fjord ink on amber) and contact (outlined). Right 6/12: a one-sentence pitch in display type and three facts (education AP → OsloMet, degree June 2027, based in Hoboken) under a 2px rule. Top strip: header with nav (Catalogus, Over mij, Contact), NL/EN, theme toggle.

FORM: Field Gear Catalogue, candidate 4 of 7 on the ordered list (1 topo map, 2 elevation profile, 3 trail waymarks, 4 gear catalogue, 5 cabin logbook, 6 avalanche bulletin, 7 layered landscape). Seed key 31028e19. Raises: technical-drawing plates for missing screenshots; one CSS custom property (--explode) drives every drawing's explode state; status as stitch material; article numbers reachable with keys 1-9 inside the catalogue; one live readout, local Hoboken time. User revisions: the route is about Tiebe (candidate 2, elevation profile, folded in) and now lives in "Over mij"; candidate 1 (topo map) folded in as the palette and the Vanta background.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
