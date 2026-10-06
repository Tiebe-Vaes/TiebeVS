---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/en/page.tsx"]
---

# Surface brief: portfolio home (`/` NL, `/en` EN)

Scope: the single-page portfolio, both locales. Visitor mode: Experience (the work leads, with one interactive signature in the first viewport).
Audience and job: recruiters from LinkedIn, GitHub or Google decide in under a minute whether to contact Tiebe for a full-stack job after graduation in 2027.
Proof: curated projects with real descriptions and Tiebe's own part; screenshots where they exist, a technical drawing of the project's own layers where they do not. Real public GitHub activity.
Constraints: see PRODUCT.md. No invented metrics, clients or quotes. No age. No tieboard. No cleaning-company website. No GitLab link. No project is featured above the others. Reduced motion respected.
Memorable moment: walking a hiker along the Hoboken–Oslo ridge that maps Tiebe's interests; dragging the kit patches around.
Unresolved: screenshots for projects without images (Tiebe will provide).

## Direction contract

THESIS: Tiebe and his work presented as a technical outdoor gear catalogue: a hang tag for the maker, a route profile for the person, numbered catalogue items with spec sheets and technical drawings for the work. Refuses the dark neon dev portfolio with a bento grid and glowing cards.

OWN-WORLD: Glacier-white ground (#eef1ec) with granite ink (#23262a); signal orange (#ff5b1f) is committed to every hang tag, the active waypoint, the primary action and the activity scale; moss (#3e5b3a) marks shipped, fjord blue (#1f4e79) draws technical lines, contours and callouts. Ripstop grid only on technical-drawing plates; topographic contour lines on the route and the kit board. Condensed technical grotesk (Archivo, wdth axis) for headings, Martian Mono for article numbers, readouts and dates. Labels sewn (dashed stitch) when shipped, basted (dotted stitch) when in development; kit patches are sewn patches. Night mode: granite ground, same orange.

STORY: The visitor sees who Tiebe is and his role on a hang tag, walks his route (Hoboken, AP, scouts, gym, mountains, Oslo 2027), scans the catalogue (art. 01-09), opens an item's spec sheet, plays with his kit, sees his GitHub activity, and contacts him or downloads the CV.

FIRST VIEWPORT: Left 5/12: a large orange hang tag hanging from a carabiner, tilted a few degrees, swaying toward the pointer; on it "Tiebe Vaes", "Full-stack developer", stack line, art. no. "TV-2027", live Hoboken time in mono, and two actions: view catalogue (primary, granite on orange) and download CV. Right 7/12: route profile "Route Hoboken – Oslo": a mountain ridge drawn as a technical elevation profile with contour lines and six waypoints for his interests; a hiker flag follows the pointer along the ridge (slider for keyboard), the nearest waypoint lights orange and its name and line show as a readout. Top strip: header with nav, NL/EN, theme toggle.

FORM: Field Gear Catalogue, candidate 4 of 7 on the ordered list (1 topo map, 2 elevation profile, 3 trail waymarks, 4 gear catalogue, 5 cabin logbook, 6 avalanche bulletin, 7 layered landscape). Seed key 31028e19. Raises: technical-drawing plates for missing screenshots (sticker album); one CSS custom property (--explode) drives every drawing's explode state (type specimen); status as stitch material (kiln glaze); fixed article numbers reachable with keys 1-9 (teletext); one live readout, local Hoboken time (signal). User revision 2026-10-06: the hero drawing is about Tiebe, not a project; candidate 2 (elevation profile) folded in as the route.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
