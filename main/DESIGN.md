---
name: Tiebe Vaes
description: Portfolio of a full-stack developer, presented as a technical outdoor gear catalogue printed on a fjord topo map.
colors:
  hang-tag-amber: "oklch(0.82 0.15 80)"
  on-amber: "oklch(0.22 0.04 245)"
  tag-ink: "oklch(0.5 0.11 70)"
  fjord-ink: "oklch(0.235 0.035 245)"
  map-paper: "oklch(0.967 0.005 160)"
  card: "oklch(0.988 0.003 160)"
  fjord-line: "oklch(0.56 0.13 245)"
  contour: "oklch(0.8 0.035 230)"
  scree: "oklch(0.47 0.03 240)"
  hairline: "oklch(0.87 0.014 220)"
  muted: "oklch(0.935 0.008 220)"
  focus-ring: "oklch(0.5 0.13 245)"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3.4rem, 9vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 62"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 62"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 62"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    fontVariation: "'wdth' 100"
  body-lead:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Martian Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.05em"
    fontFeature: "'tnum' 1"
rounded:
  sm: "2.4px"
  lg: "4px"
  full: "9999px"
spacing:
  gutter: "1rem"
  gutter-wide: "2rem"
  panel: "1.25rem"
  panel-wide: "2rem"
  row: "2.5rem"
  section: "9rem"
  section-wide: "11rem"
components:
  button-tag:
    backgroundColor: "{colors.on-amber}"
    textColor: "{colors.hang-tag-amber}"
    rounded: "{rounded.lg}"
    height: "36px"
    padding: "0 10px"
  button-ink:
    backgroundColor: "{colors.fjord-ink}"
    textColor: "{colors.map-paper}"
    rounded: "{rounded.lg}"
    height: "36px"
    padding: "0 10px"
  button-outline:
    backgroundColor: "{colors.map-paper}"
    textColor: "{colors.fjord-ink}"
    rounded: "{rounded.lg}"
    height: "36px"
    padding: "0 10px"
  hang-tag:
    backgroundColor: "{colors.hang-tag-amber}"
    textColor: "{colors.on-amber}"
    rounded: "{rounded.sm}"
    padding: "36px 24px 24px"
    width: "28rem"
  kit-patch:
    backgroundColor: "{colors.map-paper}"
    textColor: "{colors.fjord-ink}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  panel:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.sm}"
    padding: "{spacing.panel-wide}"
  contact-panel:
    backgroundColor: "{colors.hang-tag-amber}"
    textColor: "{colors.on-amber}"
    rounded: "{rounded.sm}"
    padding: "40px 24px"
---

# Design System: Tiebe Vaes

## Overview

**Creative North Star: "The Topo Sheet Catalogue"**

The site is a technical outdoor gear catalogue printed on a topographic map. The maker is a product with an amber hang tag; his interests are a route drawn as an elevation profile in About; his work is a grid of catalogue articles (art. 01 to 09), each a line figure that answers the pointer and opens a spec sheet. The ground is topographic map paper in light mode and fjord night in dark mode. Everything is printed matter or sewn material. The one warm colour, amber, is kept for what a visitor should see first: the tag, the active waypoint, the contact panel.

Density is catalogue density: ruled lists separated by hairlines, large condensed headings closed by a 2px rule, and small mono readouts for article numbers, times and field names. Depth comes from borders and tone. Only objects that physically leave the surface cast a shadow: the swaying tag and a patch in the hand. Technical lines are fjord-blue hairlines: the route ridge, the project figures, the rings on the kit board, and the static contour sheet behind the hero. On tablet and desktop a live Vanta topology also draws contours behind the hero. Motion is physical and sparse: the tag swings toward the pointer on a spring, the hiker follows the ridge, project figures answer the pointer, headings rise word by word on scroll. All of it is switched off under reduced motion.

Night mode keeps the same world: the ground turns fjord, the amber stays the same amber, the lines lighten to mist, and the focus ring turns aurora green. The confirmed anti-reference is the dark neon developer portfolio with a bento grid and glowing cards.

**Key Characteristics:**
- Map-paper ground with fjord ink; one amber accent used as material, not as text.
- Condensed Archivo (width 62, extrabold) for display; Archivo at normal width for reading; Martian Mono for data.
- Fjord-blue hairline drawings: route profile, static contour sheet, isometric project figures, kit board rings.
- Flat bordered panels with 2.4px corners; shadows only on the hang tag and a dragged kit patch.
- Ruled catalogue rows with fixed article numbers 01 to 09, each reachable with the keys 1 to 9.

## Colors

A pale map-paper ground and fjord ink, one amber accent, and two technical line colours (fjord and contour).

### Primary
- **Hang-Tag Amber** (`hang-tag-amber`, oklch(0.82 0.15 80), identical in both themes): the hang tag, the contact panel, the active waypoint and the active part of a project figure, the text selection, and the warm end of the GitHub activity ramp. Always a surface or a mark, never body text on the light ground.
- **Tag Ink** (`tag-ink`, oklch(0.5 0.11 70) in light): the text-safe amber for the light ground. Used for catalogue titles on card hover. In dark mode it lightens to oklch(0.84 0.14 80).

### Secondary
- **Fjord Line** (`fjord-line`, oklch(0.56 0.13 245) in light): every technical line. Route ridge and terrain fill (8% mixed into the card), the project figures, leader lines, and the kit board rings. In dark mode it becomes oklch(0.7 0.06 235).
- **Contour** (`contour`, oklch(0.8 0.035 230) in light): the static contour sheet behind the hero. It is pale on purpose; the elevation labels on it are set in Scree, not in this colour. In dark mode it becomes oklch(0.38 0.05 240).

### Tertiary

### Neutral
- **Map Paper** (`map-paper`, oklch(0.967 0.005 160) in light): page ground, kit patch fabric, and the sticky header at 90% with blur. In dark mode it is fjord night, oklch(0.235 0.04 245).
- **Card** (`card`, oklch(0.988 0.003 160) in light): panels, the route profile, the kit board, the heatmap, project cards, and dialogs. In dark mode it becomes oklch(0.27 0.045 245).
- **Fjord Ink** (`fjord-ink`, oklch(0.235 0.035 245) in light): all text and headings, section rules, the ink button fill, the carabiner. In dark mode it becomes mist, oklch(0.95 0.01 210).
- **On Amber** (`on-amber`, oklch(0.22 0.04 245) in both themes): text, rules and button fills placed on amber.
- **Scree** (`scree`, oklch(0.47 0.03 240) in light): secondary text, section intros, article numbers, mono field labels, and the elevation labels on the hero sheet. In dark mode it becomes oklch(0.76 0.03 230).
- **Hairline** (`hairline`, oklch(0.87 0.014 220) in light): 1px borders around panels, card borders in the catalogue, the header bottom border. In dark mode it is white at 12%.
- **Muted** (`muted`, oklch(0.935 0.008 220) in light): hover fill for nav links and ghost buttons, and the ground behind screenshots. In dark mode it becomes oklch(0.3 0.045 245).
- **Focus Ring** (`focus-ring`, oklch(0.5 0.13 245) in light): the 2px focus outline. In dark mode it is aurora green, oklch(0.86 0.16 160), not fjord.

### Named Rules
**The Amber Material Rule.** Amber is a material: the tag, the contact panel, the active waypoint, the active stack layer. Amber text on the light ground uses Tag Ink, because the amber itself is too light to read there.

**The Fjord-on-Amber Rule.** Anything placed on amber is On Amber in both themes. The amber never changes between day and night.

**The No Status Rule.** Projects carry no shipped or in-development status anywhere on the site.

## Typography

**Display Font:** Archivo variable, width axis set to 62 (condensed) for headings, via next/font.
**Body Font:** Archivo variable at width 100.
**Label/Mono Font:** Martian Mono, via next/font, with tabular figures.

**Character:** A condensed technical grotesk that reads like a gear catalogue spec page, paired with a squarish mono that reads like stamped article numbers and instrument readouts.

### Hierarchy
- **Display** (800, clamp(3.4rem, 9vw, 6rem), line-height 0.86): the name on the hang tag only.
- **Headline** (800, 3.75rem rising to 4.5rem from 640px, line-height 1): section headings (Catalogue, About, GitHub, Kit). The contact heading runs one step larger, 4.5rem rising to 6rem.
- **Pitch** (700, 2.25rem rising to 3rem from 640px, line-height 1.02): the one-sentence pitch beside the hang tag in the hero.
- **Title** (700, 2.25rem, line-height 1): catalogue item names and spec sheet titles. Sub-headings (Education, Languages) are 1.875rem with a 2px fjord-ink rule under them. The route readout is 1.875rem. GitHub totals are set at 3rem, tabular.
- **Body** (400, 1rem, line-height 1.5): project summaries, capped at 62ch.
- **Body lead** (400, 1.125rem, line-height 1.625): About paragraphs (capped at 60ch) and section intros (capped at 42rem).
- **Label** (Martian Mono, 0.75rem, uppercase, 0.05em tracking, line-height 1, tabular figures): field names in the spec sheet, figure readouts and contact list, the hang tag's readout rows, the language code in the header. Article numbers in catalogue rows are 0.875rem.

### Named Rules
**The Condensed Display Rule.** Every heading uses the condensed face: Archivo at width 62 with -0.02em tracking and 0.14em word spacing added back, because the condensed width swallows word gaps. Buttons inside headings inherit that word spacing.

**The Mono Is Data Rule.** Martian Mono is for things a catalogue would stamp or measure: article numbers, times, dates, counts, field names, levels. Numbers in it are tabular. It never sets prose or headings. The GitHub totals are the one count set in the display face instead.

## Layout

One centred column, max 80rem wide, with 1rem side gutters rising to 2rem from 640px. Sections stack with very large gaps: 9rem, and 11rem from 1024px, so each reads as its own catalogue spread. From 1024px the two-column spreads use a 12-column grid: the hero splits 5/7 (hang tag on the left, pitch and facts on the right, starting at column 7); About splits 5/7; Contact splits 6/6; Education and Languages sit side by side.

The catalogue is a grid of figure cards (see Catalogue Card). The route profile sits in About and drops its waypoint names below 768px, showing only enlarged numbers with the readout above the drawing.

The header is a sticky 3.5rem strip with a 1px hairline bottom border and a translucent, blurred ground. Anchored sections clear it with a 5rem scroll margin. The hero fills the viewport height minus the header.

## Elevation & Depth

Flat by default. Panels, plates, the heatmap, the kit board and the route profile sit on the ground as Card fills with a 1px Hairline border. Catalogue cards are Card fills with a Hairline border. Depth inside drawings is drawn, not shaded: figures are isometric plates in the card colour, and the route uses contour lines.

### Shadow Vocabulary
- **Hanging tag** (`box-shadow: 0 18px 40px -18px oklch(0.25 0.05 60 / 0.55)`; dark mode `0 24px 60px -20px oklch(0 0 0 / 0.85)`): a soft drop under the hang tag, as if it hangs a little away from the wall.
- **Lifted patch** (`box-shadow: 0 14px 28px -12px oklch(0.25 0.02 255 / 0.45)`): only while a kit patch is being dragged.

### Named Rules
**The Hanging Object Rule.** Only objects that physically leave the surface cast a shadow: the swaying tag and a patch in the hand. Panels and rows never do.

## Shapes

Corners are cut sharp: 2.4px on the tag, panels, plates, kit patches, the contact panel, and nav links. The vendored controls (buttons, toggles) keep 4px. Full circles are reserved for the tag's punch hole and the waypoint dots.

Lines carry the texture: 1px hairline borders, 2px fjord-ink rules under section and sub-section headings, dashed drop lines (3 4) on the route and dashed paths (1 3) inside project figures. One textile finish is an outline inset 5px into the shape: the dashed sewn stitch (1.5px) on kit patches.

## Components

Tactile and plain: filled blocks of fjord ink or amber, with no glow on the buttons.

### Buttons
- **Shape:** 4px corners; 36px tall with 10px side padding and 14px medium Archivo. On coarse pointers the large size grows to 44px.
- **Tag (on amber):** On Amber fill with amber text. Used on the hang tag. Hover: fill at 85%.
- **Tag outline (on amber):** 1px On Amber border at 70% with On Amber text; hover adds a 10% On Amber fill. Used for Contact on the hang tag.
- **Ink (on the ground):** fjord-ink fill with map-paper text. Used for the repository link in the spec sheet. Hover: fill at 85%.
- **Outline (on the ground):** 1px hairline border, map-paper fill, fjord-ink text; hover uses Muted. Used for the spec sheet's secondary action.
- **Ghost:** no fill, Muted on hover; used for the kit board reset and the theme toggle.
- **Focus:** 2px focus-ring outline offset 3px site-wide; on the amber tag the outline is On Amber. Press nudges the button 1px down.

### Chips (kit patches)
- **Kit patch:** Map Paper fabric with an inset dashed stitch, semibold 14px, 10px by 14px padding, 2.4px corners. Patches settle at fixed tilts between -2 and 2 degrees by position; hover lifts 3px and straightens; a drag scales to 1.1 and tilts 4 degrees with the lifted-patch shadow. A ghost reset button re-sews them.

### Cards / Containers
- **Corner Style:** 2.4px.
- **Background:** Card (night card in dark mode).
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px Hairline.
- **Internal Padding:** 1.25rem, 2rem from 640px.

### Navigation
A sticky 3.5rem header with a hairline bottom border. The name sits on the left in condensed bold 1.25rem. Text links are 14px with a Muted hover fill and 2.4px corners. The language switch is a mono uppercase code (NL / EN). The theme toggle is a ghost icon control. The About link hides below 640px; Catalogue, Contact, the language code and the theme toggle always show. The skip link appears as a fjord-ink block on focus.

### Hang Tag (signature)
An amber tag, 28rem maximum width, hung from a drawn fjord-ink carabiner by a short cord. It tilts -2.5 degrees and sways toward the pointer on a spring, clamped to ±7 degrees, pivot at the punch hole; touch devices do not sway it. A map-paper punch hole sits at the top with an On Amber ring. Contents, top to bottom: a mono row with the article number TV-2027 and the live Hoboken time (refreshed every 15 seconds); the display name; the role at 1.25rem semibold; the stack as a wrapping mono row; an On Amber 30% hairline; the graduation line in mono uppercase; then the Tag and Tag-outline buttons.

### Route Profile (signature)
A card-panel figure in About with a condensed readout and a mono counter (06 / 08). The ridge is a 2px fjord line over a terrain fill, with four contour lines clipped inside the terrain at 35% opacity. Eight waypoints sit on dashed drop lines. The active waypoint grows and fills amber. The hiker follows the pointer along the ridge on a spring. Waypoint names are also available as text to screen readers. Below 768px only enlarged numbers show, and the readout names the active stop.

### Catalogue Card and Spec Sheet
The catalogue is a grid of figure cards: three columns from 1024px, two from 640px, one below. A card shows the article number and the figure's readout in mono, the figure at 5:4 over a hairline, then the muted category, the title in condensed bold 1.875rem (Tag Ink on hover) and a two-line summary. The whole card is one button named after the project and opens the spec sheet. Keys 1 to 9 open art. 01 to 09 while focus is in the catalogue. The spec sheet is a dialog: the figure first on the left, a definition list with mono uppercase field names on the right, then the Ink and Outline actions; when the project has screenshots, an "Images" carousel follows below.

### Project Figure (signature)
Every project is a line figure that answers the pointer, drawn on the 400×320 stage of the hairline figures: isometric plates filled with the card colour, 1px non-scaling strokes in fjord line, the active part in amber, and a short English mono readout (`gate down · 8 lanes`, `pour 37%`, `T−14d`). Four come from `@lucasmarkes/hairline` (Drawer, Sieve, Exploded, Phosphor); five are drawn for the site in the same rules (start gate, teapot, flip clock, kart, lend). The pointer drives one sprung value; under reduced motion the figure stays at rest. Screenshots never come first: they sit below the figure in the spec sheet.

### Kit Board (signature)
A card panel with fjord rings behind the patches (40% opacity, 60% in dark mode). Groups are labelled in mono uppercase; each item is a sewn kit patch. On pointer devices patches can be dragged, and the board has a ghost reset.

### Contact Panel
A full-width amber panel with 2.4px corners and the largest headline in the site, a ruled definition list with mono uppercase field names (a 7rem label column) with On Amber rules at 25%, and outlined profile links (1px On Amber border at 40%) that invert to On Amber on hover.

### Language Levels
A 0.5rem track with a 2.4px radius. The fill runs for 1.4s on an expo-out curve once the meter is 60% in view. Under reduced motion it does not animate.

### GitHub Activity
A card panel with the totals in condensed display at 3rem, tabular, and a bklit heatmap. The heatmap uses the chart scale tokens: pale grey-blue for no activity, rising to amber in light mode, and navy to bright amber in dark mode.

### Motion
- **Smooth scroll:** Lenis (lerp 0.12) on GSAP's ticker, so both share one clock. It is not mounted under reduced motion.
- **Reveals:** `[data-split]` headings rise word by word (0.9s, expo-out, 0.06s stagger). `[data-reveal]` blocks rise 48px and fade in over 1s expo-out. Each runs once, when its element reaches 88–90% of the viewport.
- **Hang tag sway:** spring stiffness 60, damping 14, mass 1.2; pointer offset divided by 60px, clamped to ±7 degrees; rests at -2.5 degrees.
- **Hiker and kit patches:** hiker spring stiffness 220, damping 28; patch spring stiffness 260, damping 20.
- **Catalogue:** list layout animates; filter changes fade over 0.25s expo-out.
- **Topo sheet:** Vanta TOPOLOGY draws live contours behind the hero from 768px up, mouse-controlled, off under reduced motion. It sits at 70% opacity with a mask that fades out at the bottom.
- **Static hero map:** contours with every fourth line heavier, elevation labels on the index contours, a summit spot height, edge ticks, a scale bar, and the coordinates in the corner. It is present on every viewport.
- **Reduced motion:** no smooth scroll, no reveals, no Vanta, no tag sway, springs jump to their end state, drawing transitions are removed, and the language meter does not animate.

## Do's and Don'ts

### Do:
- **Do** keep amber identical in both themes and put On Amber on it.
- **Do** use Tag Ink, not amber, for any amber text on the light ground.
- **Do** give every project its own line figure; screenshots go below it in the spec sheet, never first.
- **Do** draw technical content (profiles, contours, stacks, leader lines) as fjord hairlines, and drive any exploded drawing through the single `--explode` property.
- **Do** set every heading in condensed Archivo (width 62) with the restored 0.14em word spacing, and every number, date and article code in tabular Martian Mono.
- **Do** separate list items with hairlines and keep panels flat with a 1px border and 2.4px corners.
- **Do** give every pointer interaction a keyboard path (keys 1 to 9 for catalogue items, focusable title buttons in rows) and stop springs, sways and transitions under reduced motion.
- **Do** lay out wrapping lists (the tag's stack line, tech lists) as gapped rows, so no line starts or ends on a separator.

### Don't:
- **Don't** build a dark neon developer portfolio: no bento grids, no glowing cards, no neon.
- **Don't** put shadows on panels, rows or cards; shadows belong only to the hanging tag and a dragged patch.
- **Don't** set prose or headings in Martian Mono, and don't put mono labels above section headings; mono labels belong to data.
- **Don't** add a shipped or in-development status to projects.
- **Don't** feature one catalogue item above the others; every article gets the same row.
- **Don't** add decorative gradients to panels or chrome. The pointer spotlight on catalogue rows and the edge fades on the hero sheet are the only gradients.
