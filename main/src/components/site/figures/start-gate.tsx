"use client"

import { useRef } from "react"
import { FigureFrame } from "./figure-frame"
import { box, clamp01, gateReadout, pts } from "./geometry"
import { useFigure } from "./use-figure"

const LANES = 8
const HALF = 60 // half the track width; lanes run along +x
const TOP = -60 // x of the gate line, top of the ramp
const END = 100 // x where the ramp meets the ground
const HILL = 60 // ramp height
const GATE = 22 // gate height when up
const laneY = (i: number) => -HALF + (i * 2 * HALF) / LANES

/** BMX start hill: a gate across eight lanes drops forward as the pointer nears, then the lanes light from the gate down. */
export default function StartGate({ label, onRead }: { label: string; onRead: (text: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const v = useFigure(ref, {
    rest: 0,
    fromPointer: (x, y) => 1 - clamp01(Math.hypot(x - 0.5, y - 0.35) / 0.55),
    readout: gateReadout,
    onRead,
  })

  const a = (v * Math.PI) / 2
  const gx = TOP + GATE * Math.sin(a)
  const gz = HILL + GATE * Math.cos(a)
  const platform = box(-110, -HALF, 0, TOP + 110, 2 * HALF, HILL)
  const post = (y: number) => box(TOP - 4, y, HILL, 3, 3, GATE + 6)
  const backPost = post(-HALF - 4)
  const frontPost = post(HALF + 1)

  return (
    <FigureFrame frameRef={ref} label={label}>
      {/* start platform */}
      <polygon className="sil" points={platform.left} />
      <polygon className="sil" points={platform.top} />
      {/* ramp: side wedge, then the sloped deck */}
      <polygon className="sil" points={pts([TOP, HALF, 0], [END, HALF, 0], [TOP, HALF, HILL])} />
      <polygon className="sil" points={pts([TOP, -HALF, HILL], [TOP, HALF, HILL], [END, HALF, 0], [END, -HALF, 0])} />
      {Array.from({ length: LANES - 1 }, (_, i) => (
        <polyline key={i} className="nf lo" points={pts([TOP, laneY(i + 1), HILL], [END, laneY(i + 1), 0])} />
      ))}
      {Array.from({ length: LANES }, (_, i) => {
        const y = laneY(i) + HALF / LANES
        const lit = v > 0.6 + i * 0.05
        return (
          <polyline
            key={i}
            className={lit ? "nf dash hi" : "nf dash lo"}
            points={pts([TOP + 8, y, HILL - 3], [END - 6, y, 2.25])}
          />
        )
      })}
      {/* posts and the gate between them */}
      <polygon className="sil" points={backPost.right} />
      <polygon className="sil" points={backPost.left} />
      <polygon className="sil" points={backPost.top} />
      <polygon
        className="sil"
        points={pts(
          [TOP, -HALF, HILL],
          [TOP, HALF, HILL],
          [gx, HALF, gz],
          [gx, -HALF, gz],
        )}
      />
      <polyline className="nf hi" points={pts([gx, -HALF, gz], [gx, HALF, gz])} />
      <polygon className="sil" points={frontPost.right} />
      <polygon className="sil" points={frontPost.left} />
      <polygon className="sil" points={frontPost.top} />
    </FigureFrame>
  )
}
