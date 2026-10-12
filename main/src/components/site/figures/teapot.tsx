"use client"

import { useId, useRef } from "react"
import { FigureFrame } from "./figure-frame"
import { box, clamp01, iso, pourReadout } from "./geometry"
import { useFigure } from "./use-figure"

// The pot and cup are drawn in screen space on top of an isometric plinth.
const [POT_X, POT_Y] = iso(-40, 0, 8) // where the pot stands
const [CUP_X, CUP_Y] = iso(55, 0, 8) // where the cup stands
const CUP_RX = 24
const CUP_RY = 10
const CUP_H = 30
const PIVOT_X = POT_X + 34 // the pot tips over the front of its foot, towards the cup
const SPOUT: [number, number] = [POT_X + 70, POT_Y - 62]

const fillOf = (v: number) => clamp01((v - 0.5) / 0.5)

function rotate([x, y]: [number, number], deg: number, cx: number, cy: number): [number, number] {
  const r = (deg * Math.PI) / 180
  const dx = x - cx
  const dy = y - cy
  return [cx + dx * Math.cos(r) - dy * Math.sin(r), cy + dx * Math.sin(r) + dy * Math.cos(r)]
}

/** PetalPurrs: a teapot that tips towards the pointer and fills the cup beside it. */
export default function Teapot({ label, onRead }: { label: string; onRead: (text: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const clip = useId()
  const v = useFigure(ref, {
    rest: 0,
    fromPointer: (x) => clamp01((x - 0.3) / 0.5),
    readout: (n) => pourReadout(fillOf(n)),
    onRead,
  })

  const tilt = v * 40
  const fill = fillOf(v)
  const [sx, sy] = rotate(SPOUT, tilt, PIVOT_X, POT_Y)
  const plinth = box(-95, -45, 0, 190, 90, 8)
  const rimY = CUP_Y - CUP_H
  // Tea surface: hidden below the rim when empty, level with it when full.
  const liquidY = rimY + (1 - fill) * CUP_H * 0.6

  return (
    <FigureFrame frameRef={ref} label={label}>
      <defs>
        <clipPath id={clip}>
          <ellipse cx={CUP_X} cy={rimY} rx={CUP_RX - 2} ry={CUP_RY - 1} />
        </clipPath>
      </defs>
      <polygon className="sil" points={plinth.left} />
      <polygon className="sil" points={plinth.right} />
      <polygon className="sil" points={plinth.top} />

      {/* cup: body, opening, tea seen through the opening, handle */}
      <path
        className="sil"
        d={`M${CUP_X - CUP_RX} ${rimY} L${CUP_X - CUP_RX + 4} ${CUP_Y} A${CUP_RX - 4} ${CUP_RY - 2} 0 0 0 ${CUP_X + CUP_RX - 4} ${CUP_Y} L${CUP_X + CUP_RX} ${rimY} Z`}
      />
      <ellipse className="sil" cx={CUP_X} cy={rimY} rx={CUP_RX} ry={CUP_RY} />
      {fill > 0 ? (
        <ellipse
          className="fill-hi"
          clipPath={`url(#${clip})`}
          cx={CUP_X}
          cy={liquidY}
          rx={CUP_RX - 3}
          ry={CUP_RY - 2}
          opacity={0.35}
        />
      ) : null}
      <path className="nf sil" d={`M${CUP_X + CUP_RX - 1} ${rimY + 6} q14 2 10 12 q-3 6 -12 4`} />

      {fill > 0 ? (
        <path
          className="nf dash hi"
          d={`M${sx} ${sy} Q${sx + 14} ${sy + 8} ${CUP_X} ${rimY}`}
        />
      ) : null}

      {/* the pot, tipped about the front of its foot */}
      <g transform={`rotate(${tilt} ${PIVOT_X} ${POT_Y})`}>
        <path
          className="sil"
          d={`M${POT_X + 34} ${POT_Y - 40} C${POT_X + 52} ${POT_Y - 46} ${POT_X + 58} ${POT_Y - 56} ${SPOUT[0]} ${SPOUT[1]} L${SPOUT[0] + 4} ${SPOUT[1] + 5} C${POT_X + 62} ${POT_Y - 46} ${POT_X + 54} ${POT_Y - 30} ${POT_X + 36} ${POT_Y - 22} Z`}
        />
        <path className="nf sil" d={`M${POT_X - 38} ${POT_Y - 52} c-22 -2 -26 30 -2 32`} />
        <ellipse className="sil" cx={POT_X} cy={POT_Y - 4} rx={30} ry={9} />
        <ellipse className="sil" cx={POT_X} cy={POT_Y - 38} rx={42} ry={34} />
        <ellipse className="nf lo" cx={POT_X} cy={POT_Y - 38} rx={42} ry={10} />
        <ellipse className="sil" cx={POT_X} cy={POT_Y - 70} rx={20} ry={6} />
        <ellipse className="hi" cx={POT_X} cy={POT_Y - 78} rx={5} ry={4} />
      </g>
    </FigureFrame>
  )
}
