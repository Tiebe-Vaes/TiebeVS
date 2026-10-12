"use client"

import {
  Basket,
  Drawer,
  Exploded,
  Format,
  Hub,
  Laptop,
  Lockers,
  Loupe,
  Phone,
  Phosphor,
  Plot,
  Rebuild,
  Settle,
  Sieve,
  Stack,
  Terminal,
} from "@lucasmarkes/hairline/react"
import type { FigureName } from "@/content/types"

const FIGURES = {
  Basket,
  Drawer,
  Exploded,
  Format,
  Hub,
  Laptop,
  Lockers,
  Loupe,
  Phone,
  Phosphor,
  Plot,
  Rebuild,
  Settle,
  Sieve,
  Stack,
  Terminal,
}

/** One line figure by name. Loaded on demand by the cards, so the figure code stays out of the main bundle. */
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
