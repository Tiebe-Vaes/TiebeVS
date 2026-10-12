"use client"

import { useRef } from "react"
import { FigureFrame } from "./figure-frame"
import { box, clamp01, iso, lendReadout, pts, type Point3 } from "./geometry"
import { useFigure } from "./use-figure"

// Two neighbours side by side on screen; each has a shelf in front of its door (+x side).
const HOUSES: [number, number][] = [
  [-64, 64],
  [64, -64],
]
const HALF = 28
const WALL = 44
const RIDGE = 26
const SHELF = 14
const LIFT = 30

const shelfTop = ([cx, cy]: [number, number]): Point3 => [cx + HALF + 14, cy, SHELF]

function House({ at: [cx, cy], open }: { at: [number, number]; open: boolean }) {
  const walls = box(cx - HALF, cy - HALF, 0, 2 * HALF, 2 * HALF, WALL)
  const shelf = box(cx + HALF + 6, cy - 14, 0, 16, 28, SHELF)
  const x0 = cx - HALF
  const x1 = cx + HALF
  return (
    <g>
      <polygon className="sil" points={pts([x0, cy - HALF, WALL], [x1, cy - HALF, WALL], [x1, cy, WALL + RIDGE], [x0, cy, WALL + RIDGE])} />
      <polygon className="sil" points={walls.left} />
      <polygon className="sil" points={walls.right} />
      <polygon className="sil" points={pts([x0, cy + HALF, WALL], [x1, cy + HALF, WALL], [x1, cy, WALL + RIDGE], [x0, cy, WALL + RIDGE])} />
      <polygon className="sil" points={pts([x1, cy - HALF, WALL], [x1, cy + HALF, WALL], [x1, cy, WALL + RIDGE])} />
      <polygon className={open ? "hi" : "lo"} points={pts([x1, cy - 8, 0], [x1, cy + 8, 0], [x1, cy + 8, 26], [x1, cy - 8, 26])} />
      <polygon className="sil" points={shelf.left} />
      <polygon className="sil" points={shelf.right} />
      <polygon className="sil" points={shelf.top} />
    </g>
  )
}

/** LocalLend: a drill travels from one neighbour's shelf to the other's as the pointer moves across. */
export default function Lend({ label, onRead }: { label: string; onRead: (text: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const v = useFigure(ref, { rest: 0, fromPointer: (x) => clamp01((x - 0.2) / 0.6), readout: lendReadout, onRead })

  const [a, b] = HOUSES.map(shelfTop)
  const along = (t: number): Point3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, SHELF + 4 * LIFT * t * (1 - t)]
  const path = Array.from({ length: 21 }, (_, i) => along(i / 20))
  const [dx, dy] = iso(...along(v))

  return (
    <FigureFrame frameRef={ref} label={label}>
      {/* nudged left: the drill's bit reaches past the right-hand shelf */}
      <g transform="translate(-12 0)">
        <House at={HOUSES[0]} open={v < 0.5} />
        <House at={HOUSES[1]} open={v >= 0.5} />
        <polyline className="nf dash lo" points={pts(...path)} />
        {/* the drill, drawn in screen space and standing on its battery */}
        <g transform={`translate(${dx} ${dy}) scale(1.6)`}>
          <polygon className="sil" points="-6,-6 1,-6 3,0 -8,0" />
          <polygon className="sil" points="-4,-6 -1,-6 1,-16 -5,-16" />
          <rect className="sil" x={-12} y={-26} width={22} height={10} rx={4} />
          <rect className="sil" x={10} y={-24} width={5} height={6} />
          <line className="hi" x1={15} y1={-21} x2={25} y2={-21} />
        </g>
      </g>
    </FigureFrame>
  )
}
