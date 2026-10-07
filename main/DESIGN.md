---
name: Tiebe Vaes
description: Portfolio of a full-stack developer, presented as a technical outdoor gear catalogue.
colors:
  signal-orange: "oklch(0.68 0.21 38)"
  tag-ink: "oklch(0.52 0.18 38)"
  fjord-line: "oklch(0.42 0.09 250)"
  moss-shipped: "oklch(0.43 0.06 140)"
  glacier-white: "oklch(0.954 0.007 135)"
  glacier-card: "oklch(0.977 0.005 135)"
  granite-ink: "oklch(0.255 0.008 255)"
  granite-deep: "oklch(0.2 0.008 255)"
  scree-muted: "oklch(0.46 0.012 250)"
  frost-border: "oklch(0.84 0.01 135)"
  night-card: "oklch(0.245 0.009 255)"
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
    fontSize: "4.5rem"
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
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.05em"
    fontFeature: "'tnum' 1"
rounded:
  cut: "2.4px"
  control: "4px"
  round: "9999px"
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
    backgroundColor: "{colors.granite-deep}"
    textColor: "{colors.signal-orange}"
    rounded: "{rounded.control}"
    height: "36px"
    padding: "0 10px"
  button-ink:
    backgroundColor: "{colors.granite-ink}"
    textColor: "{colors.glacier-white}"
    rounded: "{rounded.control}"
    height: "36px"
    padding: "0 10px"
  button-outline:
    backgroundColor: "{colors.glacier-white}"
    textColor: "{colors.granite-ink}"
    rounded: "{rounded.control}"
    height: "36px"
    padding: "0 10px"
  hang-tag:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.granite-deep}"
    rounded: "{rounded.cut}"
    padding: "36px 32px 24px"
    width: "28rem"
  status-sewn:
    textColor: "{colors.moss-shipped}"
    typography: "{typography.label}"
    padding: "6px 10px"
  status-basted:
    textColor: "{colors.tag-ink}"
    typography: "{typography.label}"
    padding: "6px 10px"
  kit-patch:
    backgroundColor: "{colors.glacier-white}"
    textColor: "{colors.granite-ink}"
    rounded: "{rounded.cut}"
    padding: "10px 14px"
  panel:
    backgroundColor: "{colors.glacier-card}"
    rounded: "{rounded.cut}"
    padding: "{spacing.panel-wide}"
  contact-panel:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.granite-deep}"
    rounded: "{rounded.cut}"
    padding: "56px 40px"
---

# Design System: Tiebe Vaes

## Overview

**Creative North Star: "The Field Gear Catalogue"**

The site reads as a technical outdoor gear catalogue: the maker is a product with a hang tag, his interests are a route drawn as an elevation profile, and his work is a numbered list of catalogue articles, each with a spec sheet and a plate. Everything is printed matter or sewn material, never glowing screen material. The ground is cold and pale like glacier ice, the ink is granite, and one loud signal orange is reserved for what you would see first on a shelf: the tag, the active waypoint, the main action.

Density is catalogue density: long ruled lists separated by hairlines, large condensed headings, small mono readouts for article numbers and dates. Depth comes from borders and tone; only physical objects that are lifted (the hanging tag, a dragged patch) cast a shadow. Technical lines (contours, leader lines, isometric stack drawings) are fjord-blue hairlines. Motion is physical: the tag sways on a spring from its punch hole, the hiker follows the pointer along the ridge, drawings explode on hover. All of it stops under reduced motion.

Night mode keeps the world: the ground turns granite, the orange stays the same orange, and lines lighten to a pale fjord blue. The confirmed anti-reference is the dark neon developer portfolio with a bento grid and glowing cards.

**Key Characteristics:**
- Glacier-white ground, granite ink, one signal orange used as material, not as text.
- Condensed Archivo (wdth 62, extrabold) for display; Archivo at normal width for reading; Martian Mono for data.
- Status is stitching: dashed "sewn" for shipped, dotted "basted" for in development.
- Fjord-blue hairline drawings: route profile, topographic rings, isometric stack plates.
- Flat bordered panels with sharp 2.4px corners; shadows only on lifted objects.
- Ruled catalogue rows with fixed article numbers (01-09), reachable by keys 1-9.

## Colors

A cold, nearly neutral alpine palette (glacier and granite) carrying one hot signal color and two quiet technical colors.

### Primary
- **Signal Orange** (`signal-orange`): the hang tag, the contact panel, the active waypoint dot and hiker flag, the active layer in a stack drawing, slider track, text selection, and the GitHub activity scale. Identical in light and dark mode. Always a surface or a mark, never body text on the light ground.
- **Tag Ink** (`tag-ink`): the text-safe orange for the light ground: hovered catalogue titles and the basted (in development) status label. In dark mode it lightens to oklch(0.76 0.17 45) so it stays legible on granite.

### Secondary
- **Fjord Line** (`fjord-line`): every technical line: route ridge, contour lines, waypoint drop lines, topographic rings on the kit board, isometric stack outlines and leader lines. Also the focus ring color. In dark mode it becomes oklch(0.74 0.09 245). Drawing fills are this color mixed into the card (8% for terrain, 22% and 38% for slab sides).

### Tertiary
- **Moss** (`moss-shipped`): shipped status only (the sewn label). Dark mode: oklch(0.74 0.1 140).

### Neutral
- **Glacier White** (`glacier-white`): page ground; also the kit patch fabric and the carabiner punch hole.
- **Glacier Card** (`glacier-card`): panels (route profile, kit board, heatmap, drawing plates), dialogs, and the hovered catalogue row.
- **Granite Ink** (`granite-ink`): all text and headings; the `ink` button fill; the carabiner, cord and hiker.
- **Granite Deep** (`granite-deep`): text on orange in both themes, and the night-mode ground.
- **Night Card** (`night-card`): panels and dialogs in night mode.
- **Scree** (`scree-muted`): secondary text, intros, article numbers in lists, mono field labels. Night mode: oklch(0.76 0.01 135).
- **Frost Border** (`frost-border`): 1px hairlines between catalogue rows and around panels; also the ripstop grid lines. Night mode: white at 13%.

### Named Rules
**The Signal Orange Rule.** Signal orange is a material: tags, the active waypoint, the primary action, the activity scale. Small orange text on the light ground uses Tag Ink instead, because signal orange is too light to read there.

**The Granite-on-Orange Rule.** Anything placed on orange is granite (Granite Deep) in both themes; the orange never changes between day and night.

**The Stitch Status Rule.** Shipped is moss with a dashed sewn stitch; in development is Tag Ink with a dotted basted stitch. Status is never a filled pill or a colored dot.

## Typography

**Display Font:** Archivo variable, width axis set to 62 (condensed), via next/font
**Body Font:** Archivo variable at width 100
**Label/Mono Font:** Martian Mono, via next/font

**Character:** A condensed technical grotesk that sounds like a gear catalogue spec page, paired with a squarish mono that reads like stamped article numbers and instrument readouts.

### Hierarchy
- **Display** (800, clamp(3.4rem, 9vw, 6rem), line-height 0.86): the name on the hang tag only.
- **Headline** (800, 3.75rem rising to 4.5rem from 640px, line-height 1): section headings (Catalogue, Kit, GitHub, About). The contact heading runs one step larger (4.5rem to 6rem).
- **Title** (700, 2.25rem, line-height 1): catalogue item names and spec sheet titles; 1.875rem for sub-headings ruled with a 2px granite underline (Education, Languages); 1.5rem to 1.875rem for figure captions and the route readout.
- **Body** (400, 1rem, line-height 1.5): project summaries, capped at 62ch. **Body lead** (1.125rem, line-height 1.625) for About paragraphs and section intros, capped at 60ch. The role line on the tag is 1.25rem semibold.
- **Label** (Martian Mono, 0.65rem to 0.75rem, uppercase, 0.05em tracking, tabular figures): article numbers, local time, status labels, field names in the spec sheet and contact list, waypoint numbers, the stack line on the tag (lowercase there).

### Named Rules
**The Condensed Display Rule.** Every heading uses the condensed face: Archivo at wdth 62, -0.02em tracking, with word spacing added back (0.14em) because the condensed width swallows word gaps. Buttons inside headings inherit that word spacing.

**The Mono Is Data Rule.** Martian Mono is for things a catalogue would stamp or measure: article numbers, dates, times, counts, field names, levels. Numbers in it are always tabular. It never sets prose or headings.

## Layout

One centered column, max 80rem wide, with 1rem side gutters rising to 2rem from 640px. Sections stack with very large gaps (9rem, 11rem from 1024px) so each reads as a separate catalogue spread. Two-column spreads use a 12-column grid from 1024px: the hero splits 5/7 (hang tag / route profile); About splits 5 and 6 with a one-column gutter; Contact splits 6/6.

Catalogue rows are ruled lists, not cards: each row is a 3-track grid from 768px (4rem article number, flexible text, plate up to 18rem) with 2.5rem vertical padding and a hairline below. The section header closes with a 2px granite rule. Below 768px every grid collapses to a single column; the route profile drops waypoint names and shows only enlarged numbers, with the readout naming the active stop.

The header is a sticky 3.5rem strip with a hairline bottom border and a translucent, blurred ground. Anchored sections offset by 5rem so they clear it.

## Elevation & Depth

Flat by default. Panels, plates, the heatmap and the kit board sit on the ground as Glacier Card fills with a 1px Frost Border; catalogue rows are separated only by hairlines and lift to Glacier Card on hover. Depth inside drawings is drawn, not shaded: isometric slabs use stepped fjord-tinted fills, and the route uses contour lines.

### Shadow Vocabulary
- **Hanging tag** (`box-shadow: 0 18px 40px -18px oklch(0.25 0.05 40 / 0.55)`): a warm, soft drop below the hang tag, as if it hangs a little away from the wall.
- **Lifted patch** (`box-shadow: 0 14px 28px -12px oklch(0.25 0.02 255 / 0.45)`): only while a kit patch is being dragged.

### Named Rules
**The Hanging Object Rule.** Only objects that physically leave the surface cast a shadow: the swaying tag and a patch in the hand. Panels and rows never do.

## Shapes

Corners are cut sharp: 2.4px on tags, panels, plates, patches and nav links; the vendored controls (buttons, toggles) keep 4px. Full circles are reserved for the tag's punch hole and the waypoint dots. Lines carry the world's texture: 1px hairline borders, 2px granite rules under section and sub-section headings, dashed (3/4) drop lines and leader lines in drawings. Two textile finishes exist as outlines inset 5px into the shape: the dashed sewn stitch (1.5px) and the dotted basted stitch (2px). The ripstop grid (1px Frost Border lines on a 14px square) appears only on technical-drawing plates.

## Components

### Buttons
Tactile and plain; filled blocks of granite or orange, no gradients.
- **Shape:** 4px corners; large size 36px tall with 10px side padding, 14px medium Archivo.
- **Tag (primary on orange):** granite fill with signal-orange text. Used on the hang tag. Hover: fill at 85%.
- **Ink (primary on the ground):** granite fill with glacier text. Used for the repository link in the spec sheet. Hover: fill at 85%.
- **Outline:** bordered, ground fill, granite text; external links (GitHub profile, live site), with an up-right arrow icon.
- **Ghost:** no fill; secondary actions such as Contact on the tag, kit reset, theme toggle.
- **Focus:** 2px fjord outline offset 3px site-wide; vendored controls add a 3px fjord ring at 50%. Press nudges the button 1px down.

### Chips (status labels and kit patches)
- **Status label:** Martian Mono 0.65rem uppercase, 6px by 10px padding, colored text with an inset stitch outline in the same color; sewn (dashed, moss) or basted (dotted, Tag Ink). No fill.
- **Kit patch:** Glacier White fabric with a sewn stitch, semibold 14px with a 16px tech logo, 2.4px corners. Patches settle at small fixed tilts (-2 to 2 degrees), lift 3px and straighten on hover, scale 1.1 and tilt 4 degrees while dragged. A ghost reset button re-sews them.
- **Tech badge** (spec sheet stack): vendored outline badge with the tech logo, normal weight.

### Cards / Containers
- **Corner Style:** 2.4px.
- **Background:** Glacier Card (Night Card at night); drawing plates add the ripstop grid.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px Frost Border.
- **Internal Padding:** 1.25rem, 2rem from 640px.

### Navigation
Sticky header: the name in condensed bold 1.25rem on the left; 14px text links with 2.4px-cornered hover fill (Muted) on the right; the language switch as a mono uppercase code (NL / EN); the theme toggle as a ghost icon button whose sun or moon turns on hover. Catalogue and About links hide below 640px; Contact, language and theme always stay. A skip link appears as a granite block on focus.

### Hang Tag (signature)
A signal-orange tag hanging from a drawn carabiner by a granite cord, tilted -2.5 degrees and swaying toward the pointer on a soft spring (±7 degrees, pivot at the punch hole). Contents top to bottom: mono row with article number and live Hoboken time, the display name, the role, the stack as a wrapping mono row, a 30% granite hairline, a mono line, then Tag and Ghost buttons. Max 28rem wide.

### Route Profile (signature)
A card-panel figure with a condensed caption and a mono counter (06 / 08). The ridge is a 2px fjord line over a terrain fill and four clipped contour lines at 35%; eight waypoints sit on dashed drop lines. The active waypoint grows and fills orange; the hiker (granite pole, orange flag) follows the pointer on a spring; a slider below gives keyboard access. The readout in the top-left names the active stop in condensed bold with a muted detail line.

### Catalogue Row and Spec Sheet
Each row: mono article number, condensed title (turns Tag Ink on row hover; the whole row is the click target), status label, muted category and years, summary, a muted list of tech names with logos, and a plate (first screenshot cropped from the top left, or an isometric stack drawing). The spec sheet is a dialog split into gallery and data: a definition list with mono uppercase field names over a hairline, then Ink and Outline actions.

### Stack Drawing (signature)
An isometric exploded drawing of up to five layers in fjord hairlines, the top layer carrying the tech logo. One registered custom property, `--explode` (0 to 1), drives every layer offset and the callout fade; plates rest at 0.45 and open to 0.95 when their row is hovered or focused, over 700ms on an expo-out curve. Callouts are a numbered circle, a dashed leader line, a logo and a label haloed in the card color.

### Contact Panel
A full-width signal-orange panel (2.4px corners) with the largest headline, a granite slide-text button for the e-mail (the label slides up to reveal the hover text), a ruled definition list with mono uppercase field names, and outlined profile links that invert to granite on hover.

## Do's and Don'ts

### Do:
- **Do** keep signal orange identical in both themes and put Granite Deep on it.
- **Do** use Tag Ink, not signal orange, for any orange text on the light ground.
- **Do** mark project status with the sewn (shipped, moss) or basted (in development, Tag Ink) stitch label.
- **Do** draw technical content (profiles, contours, stacks, leader lines) as fjord hairlines, and drive any exploded drawing through the single `--explode` property.
- **Do** set every heading in condensed Archivo (wdth 62) with the restored 0.14em word spacing, and every number, date and article code in tabular Martian Mono.
- **Do** separate list items with hairlines and keep panels flat with a 1px border and 2.4px corners.
- **Do** give every pointer interaction a keyboard path (slider, keys 1-9, focusable rows) and stop springs, sways and transitions under reduced motion.
- **Do** lay out wrapping lists (the tag's stack line, tech lists) as gapped rows, so no line starts or ends on a separator.

### Don't:
- **Don't** build a dark neon developer portfolio: no bento grids, no glowing cards, no gradients.
- **Don't** put shadows on panels, rows or cards; shadows belong only to the hanging tag and a dragged patch.
- **Don't** use the ripstop grid outside technical-drawing plates.
- **Don't** set prose or headings in Martian Mono, and don't put mono labels above section headings; mono labels belong to data.
- **Don't** show status as a colored dot or filled pill.
- **Don't** feature one catalogue item above the others; every article gets the same row.
