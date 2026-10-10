"use client"

import {
  Branches,
  Exploded,
  Format,
  Hub,
  Keyboard,
  Laptop,
  Rebuild,
  Relay,
  Settle,
  Stack,
  Terminal,
  Terrain,
} from "@lucasmarkes/hairline/react"
import type { FigureName } from "@/content/playing"

const FIGURES = { Branches, Exploded, Format, Hub, Keyboard, Laptop, Rebuild, Relay, Settle, Stack, Terminal, Terrain }

/** One hairline figure by name. Loaded on demand by the ranking, so the engine stays out of the main bundle. */
export default function HairlineFigure({
  name,
  label,
  onRead,
}: {
  name: FigureName
  label: string
  onRead: (text: string) => void
}) {
  const Figure = FIGURES[name]
  // key remounts on a new figure; options of the same figure update in place.
  return <Figure key={name} label={label} onRead={onRead} intensity={0.6} className="w-full" />
}
