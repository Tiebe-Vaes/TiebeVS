"use client"

import { Exploded, Format, Hub, Rebuild, Settle, Stack, Terminal } from "@lucasmarkes/hairline/react"
import type { FigureName } from "@/content/playing"

const FIGURES = { Exploded, Format, Hub, Rebuild, Settle, Stack, Terminal }

/** One hairline figure by name. Loaded on demand by the specimen cards, so the engine stays out of the main bundle. */
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
  return <Figure label={label} onRead={onRead} intensity={0.6} className="w-full" />
}
