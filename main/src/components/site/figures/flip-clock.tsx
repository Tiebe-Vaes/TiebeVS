"use client"

import { useEffect, useRef, useState } from "react"
import { FigureFrame } from "./figure-frame"
import { box, clamp01, countdownDays, countdownReadout, digitSegments, pts } from "./geometry"
import { useFigure } from "./use-figure"

// The clock face is the housing's +y side (facing down-left); digits are drawn in that plane.
const FACE_Y = 30
const TILE_Y = FACE_Y + 4
const TILE_W = 40
const TILE_H = 56
const TILE_Z = 12
const FLIP_MS = 180

// Seven segments in tile units: u along x (0..1), w up (0..1).
const SEGMENTS: Record<string, [[number, number], [number, number]]> = {
  a: [[0, 1], [1, 1]],
  b: [[1, 1], [1, 0.5]],
  c: [[1, 0.5], [1, 0]],
  d: [[0, 0], [1, 0]],
  e: [[0, 0.5], [0, 0]],
  f: [[0, 1], [0, 0.5]],
  g: [[0, 0.5], [1, 0.5]],
}

function Segments({ x, z, w, h, lit }: { x: number; z: number; w: number; h: number; lit: string }) {
  const m = 9
  const at = ([u, v]: [number, number]): [number, number, number] => [x + m + u * (w - 2 * m), TILE_Y, z + m + v * (h - 2 * m)]
  return Object.entries(SEGMENTS).map(([key, [p, q]]) => (
    <polyline key={key} className={lit.includes(key) ? "nf hi" : "nf lo"} points={pts(at(p), at(q))} />
  ))
}

/** One flip tile: a change folds its top flap down over the new digit. */
function Tile({ x, digit }: { x: number; digit: number }) {
  const [flip, setFlip] = useState(1)
  const shown = useRef(digit)

  useEffect(() => {
    if (shown.current === digit) return
    shown.current = digit
    let raf = 0
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / FLIP_MS)
      setFlip(p)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [digit])

  const tile = box(x, FACE_Y, TILE_Z, TILE_W, TILE_Y - FACE_Y, TILE_H)
  const mid = TILE_Z + TILE_H / 2
  // The flap hinges on the middle line; at 0 it stands up, at 1 it lies down over the lower half.
  const a = flip * Math.PI
  const fy = TILE_Y + (TILE_H / 2) * Math.sin(a)
  const fz = mid + (TILE_H / 2) * Math.cos(a)

  return (
    <g>
      <polygon className="sil" points={tile.top} />
      <polygon className="sil" points={tile.right} />
      <polygon className="sil" points={tile.left} />
      <polyline className="nf lo" points={pts([x, TILE_Y, mid], [x + TILE_W, TILE_Y, mid])} />
      <Segments x={x} z={TILE_Z} w={TILE_W} h={TILE_H} lit={digitSegments(digit)} />
      {flip < 1 ? (
        <polygon className="hi" points={pts([x, TILE_Y, mid], [x + TILE_W, TILE_Y, mid], [x + TILE_W, fy, fz], [x, fy, fz])} />
      ) : null}
    </g>
  )
}

/** Study Countdown: a desk flip clock; the pointer's height counts the days down from 42 to 0. */
export default function FlipClock({ label, onRead }: { label: string; onRead: (text: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const v = useFigure(ref, {
    rest: 0,
    fromPointer: (_x, y) => clamp01((y - 0.15) / 0.7),
    readout: countdownReadout,
    onRead,
  })
  const days = countdownDays(v)
  const housing = box(-84, -30, 0, 168, 60, 80)
  const foot = box(-90, -36, -6, 180, 72, 6)
  const unit = box(30, FACE_Y, TILE_Z + 8, 28, TILE_Y - FACE_Y, 30)

  return (
    <FigureFrame frameRef={ref} label={label}>
      <polygon className="sil" points={foot.top} />
      <polygon className="sil" points={foot.right} />
      <polygon className="sil" points={foot.left} />
      <polygon className="sil" points={housing.top} />
      <polygon className="sil" points={housing.right} />
      <polygon className="sil" points={housing.left} />
      <Tile x={-74} digit={Math.floor(days / 10)} />
      <Tile x={-28} digit={days % 10} />
      <polygon className="sil" points={unit.top} />
      <polygon className="sil" points={unit.right} />
      <polygon className="sil" points={unit.left} />
      {/* "d" for days */}
      <Segments x={30} z={TILE_Z + 8} w={28} h={30} lit="bcdeg" />
    </FigureFrame>
  )
}
