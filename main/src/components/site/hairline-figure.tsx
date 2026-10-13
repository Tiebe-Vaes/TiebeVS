"use client"

import {
  Drawer,
  Exploded,
  Format,
  Hub,
  Loupe,
  Phosphor,
  Rebuild,
  Settle,
  Sieve,
  Stack,
  Terminal,
} from "@lucasmarkes/hairline/react"
import type { FigureName, OwnFigure } from "@/content/types"
import Kart from "./figures/kart"
import Lend from "./figures/lend"
import StartGate from "./figures/start-gate"
import Teapot from "./figures/teapot"

const FIGURES = {
  Drawer,
  Exploded,
  Format,
  Hub,
  Loupe,
  Phosphor,
  Rebuild,
  Settle,
  Sieve,
  Stack,
  Terminal,
}

const OWN: Record<OwnFigure, typeof StartGate> = { StartGate, Teapot, Kart, Lend }

const isOwn = (name: FigureName): name is OwnFigure => name in OWN

/** One line figure by name, from hairline or drawn for this site. Loaded on demand by the cards, so the figure code stays out of the main bundle. */
export default function HairlineFigure({
  name,
  label,
  onRead,
}: {
  name: FigureName
  label: string
  onRead: (text: string) => void
}) {
  if (isOwn(name)) {
    const Own = OWN[name]
    return <Own label={label} onRead={onRead} />
  }
  const Figure = FIGURES[name]
  return <Figure label={label} onRead={onRead} intensity={0.6} className="w-full" />
}
