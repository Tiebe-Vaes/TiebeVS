"use client"

import { useRef } from "react"
import { FigureFrame } from "./figure-frame"
import { clamp01, iso, prism, pts, steerAngle, steerReadout, turn, type Point3 } from "./geometry"
import { useFigure } from "./use-figure"

// A bend of track around a centre behind the kart; the kart sits mid-bend, driving towards +y.
const INNER = 95
const OUTER = 205
const CX = -20 - (INNER + OUTER) / 2 // puts the kart in the middle of the stage
const CY = -20
const ARC = 44 // degrees either side of the kart
const KERB = 10
const K: [number, number] = [CX + (INNER + OUTER) / 2, CY] // kart centre
const S = 1.7 // kart scale

const onArc = (r: number, deg: number): Point3 => {
  const a = (deg * Math.PI) / 180
  return [CX + r * Math.cos(a), CY + r * Math.sin(a), 0]
}
const arc = (r: number, from: number, to: number, steps = 24) =>
  Array.from({ length: steps + 1 }, (_, i) => onArc(r, from + ((to - from) * i) / steps))

const rect = (x: number, y: number, w: number, d: number): [number, number][] => [
  [x, y],
  [x + w, y],
  [x + w, y + d],
  [x, y + d],
]

function Solid({ outline, z, h, className = "sil" }: { outline: [number, number][]; z: number; h: number; className?: string }) {
  const { top, sides } = prism(outline, z, h)
  return (
    <>
      {sides.map((side) => (
        <polygon key={side} className={className} points={side} />
      ))}
      <polygon className={className} points={top} />
    </>
  )
}

/** Kart Race App: a kart on a bend; the pointer steers the front wheels and the driver's seat leans out. */
export default function Kart({ label, onRead }: { label: string; onRead: (text: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const v = useFigure(ref, { rest: 0.5, fromPointer: (x) => clamp01(x), readout: steerReadout, onRead })
  const steer = steerAngle(v)
  const lean = (v - 0.5) * -14
  const [kx, ky] = K

  const wheel = (x: number, y: number, deg = 0) => turn(rect(x - 4 * S, y - 8 * S, 8 * S, 16 * S), deg, x, y)
  const [wx, wy] = iso(kx + lean * 0.5, ky + 8 * S, 24 * S)
  const spoke = (steer * Math.PI) / 180

  return (
    <FigureFrame frameRef={ref} label={label}>
      {/* the bend, its racing line and the striped kerb on the outside */}
      <polygon className="sil" points={pts(...arc(OUTER, -ARC, ARC), ...arc(INNER, ARC, -ARC))} />
      <polyline className="nf dash lo" points={pts(...arc((INNER + OUTER) / 2, -ARC, ARC))} />
      {Array.from({ length: 12 }, (_, i) => {
        const step = (2 * ARC) / 12
        const from = -ARC + i * step
        return (
          <polygon
            key={i}
            className={i % 2 ? "lo" : "sil"}
            points={pts(...arc(OUTER, from, from + step, 3), ...arc(OUTER + KERB, from + step, from, 3))}
          />
        )
      })}

      {/* rear axle, chassis, seat, steering, front wheels: back to front */}
      <Solid outline={wheel(kx - 22 * S, ky - 20 * S)} z={0} h={8 * S} />
      <Solid outline={rect(kx - 15 * S, ky - 28 * S, 30 * S, 58 * S)} z={4 * S} h={3 * S} />
      <Solid outline={wheel(kx + 22 * S, ky - 20 * S)} z={0} h={8 * S} />
      {/* seat: backrest behind the cushion, both leaning out of the bend */}
      <Solid outline={rect(kx - 9 * S + lean, ky - 22 * S, 18 * S, 4 * S)} z={7 * S} h={16 * S} />
      <Solid outline={rect(kx - 9 * S + lean * 0.6, ky - 18 * S, 18 * S, 14 * S)} z={7 * S} h={4 * S} />
      {/* nose */}
      <Solid
        outline={[
          [kx - 12 * S, ky + 24 * S],
          [kx + 12 * S, ky + 24 * S],
          [kx + 8 * S, ky + 34 * S],
          [kx - 8 * S, ky + 34 * S],
        ]}
        z={4 * S}
        h={5 * S}
      />
      <polyline className="nf sil" points={pts([kx, ky + 18 * S, 7 * S], [kx + lean * 0.5, ky + 8 * S, 24 * S])} />
      <ellipse className="nf hi" cx={wx} cy={wy} rx={9 * S} ry={5 * S} />
      <line
        className="hi"
        x1={wx - 8 * S * Math.cos(spoke)}
        y1={wy - 4 * S * Math.sin(spoke)}
        x2={wx + 8 * S * Math.cos(spoke)}
        y2={wy + 4 * S * Math.sin(spoke)}
      />
      <Solid outline={wheel(kx - 22 * S, ky + 22 * S, steer)} z={0} h={8 * S} className={steer ? "hi" : "sil"} />
      <Solid outline={wheel(kx + 22 * S, ky + 22 * S, steer)} z={0} h={8 * S} className={steer ? "hi" : "sil"} />
    </FigureFrame>
  )
}
