"use client"

import { useId, useRef, useState } from "react"
import { motion, useReducedMotion, useSpring } from "motion/react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export type Waypoint = { key: string; title: string; detail: string }

// Ridge of the route profile in viewBox units, west (Hoboken) to north (Oslo).
const W = 760
const H = 420
const BASE = 360
const RIDGE: [number, number][] = [
  [0, 330], [70, 318], [120, 300], [170, 270], [215, 286], [265, 236], [320, 250],
  [375, 190], [420, 150], [455, 96], [490, 70], [525, 112], [570, 150], [615, 196],
  [660, 220], [710, 248], [760, 262],
]
// Where each waypoint sits along x; order matches the waypoints passed in.
const STOPS = [40, 130, 215, 300, 390, 490, 600, 710]

function ridgeY(x: number) {
  for (let i = 1; i < RIDGE.length; i++) {
    const [x1, y1] = RIDGE[i]
    if (x <= x1) {
      const [x0, y0] = RIDGE[i - 1]
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
    }
  }
  return RIDGE[RIDGE.length - 1][1]
}

const ridgePath = `M${RIDGE.map(([x, y]) => `${x} ${y}`).join(" L")}`
const fillPath = `${ridgePath} L${W} ${BASE} L0 ${BASE} Z`

// Contour lines: the ridge repeated lower and flatter, like a map's relief.
const contours = [0.82, 0.66, 0.5, 0.34].map((k) =>
  `M${RIDGE.map(([x, y]) => `${x} ${(BASE - (BASE - y) * k).toFixed(1)}`).join(" L")}`,
)

export function RouteProfile({
  title,
  hint,
  sliderLabel,
  waypoints,
}: {
  title: string
  hint: string
  sliderLabel: string
  waypoints: Waypoint[]
}) {
  const reduceMotion = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const clipId = useId()
  const [x, setX] = useState(STOPS[STOPS.length - 2])
  const springX = useSpring(x, { stiffness: 220, damping: 28 })
  const springY = useSpring(ridgeY(x), { stiffness: 220, damping: 28 })

  function moveTo(next: number) {
    const clamped = Math.max(0, Math.min(W, next))
    setX(clamped)
    if (reduceMotion) {
      springX.jump(clamped)
      springY.jump(ridgeY(clamped))
    } else {
      springX.set(clamped)
      springY.set(ridgeY(clamped))
    }
  }

  function fromPointer(clientX: number) {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    moveTo(((clientX - rect.left) / rect.width) * W)
  }

  // Nearest waypoint to the hiker.
  const active = STOPS.reduce((best, sx, i) => (Math.abs(sx - x) < Math.abs(STOPS[best] - x) ? i : best), 0)
  const current = waypoints[active]

  return (
    <figure className="flex flex-col gap-4">
      <figcaption className="flex items-baseline justify-between gap-4">
        <span className="font-display text-2xl font-bold">{title}</span>
        <span className="font-mono text-xs text-muted-foreground tabular">
          {String(active + 1).padStart(2, "0")} / {String(waypoints.length).padStart(2, "0")}
        </span>
      </figcaption>

      <div className="relative rounded-sm border bg-card">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`${title}: ${waypoints.map((w) => w.title).join(", ")}`}
          className="h-auto w-full touch-none text-line select-none"
          onPointerMove={(e) => fromPointer(e.clientX)}
          onPointerDown={(e) => fromPointer(e.clientX)}
        >
          <defs>
            <clipPath id={clipId}>
              <path d={fillPath} />
            </clipPath>
          </defs>

          {/* Terrain: contour lines inside the mountain, a hairline ridge on top. */}
          <path d={fillPath} className="fill-[color-mix(in_oklch,var(--line)_8%,var(--card))]" />
          <g clipPath={`url(#${clipId})`} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35">
            {contours.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <path d={ridgePath} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <line x1="0" y1={BASE} x2={W} y2={BASE} stroke="currentColor" strokeWidth="1" />

          {/* Waypoints. */}
          {STOPS.map((sx, i) => {
            const sy = ridgeY(sx)
            const on = i === active
            return (
              <g key={waypoints[i].key}>
                <line x1={sx} y1={sy} x2={sx} y2={BASE} stroke="currentColor" strokeDasharray="3 4" opacity={on ? 0.9 : 0.4} />
                <circle cx={sx} cy={sy} r={on ? 8 : 5} className={on ? "fill-primary" : "fill-card"} stroke="currentColor" strokeWidth="1.5" />
                <text
                  x={sx}
                  y={BASE + 26}
                  textAnchor={i === 0 ? "start" : i === STOPS.length - 1 ? "end" : "middle"}
                  className={cn("max-md:hidden", on ? "fill-foreground font-semibold" : "fill-muted-foreground")}
                  style={{ fontSize: 15 }}
                >
                  {waypoints[i].title}
                </text>
                {/* On small screens only the numbers show; the readout names the stop. */}
                <text
                  x={sx}
                  textAnchor={i === 0 ? "start" : i === STOPS.length - 1 ? "end" : "middle"}
                  className={cn(
                    "font-mono [font-size:24px] [translate:0_34px] md:[font-size:11px] md:[translate:0_48px]",
                    on ? "fill-foreground" : "fill-muted-foreground",
                  )}
                  y={BASE}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            )
          })}

          {/* The hiker follows the pointer along the ridge. */}
          <motion.g style={{ x: springX, y: springY }}>
            <line x1="0" y1="0" x2="0" y2="-34" className="stroke-foreground" strokeWidth="2" />
            <path d="M0 -34 L22 -27 L0 -20 Z" className="fill-primary stroke-foreground" strokeWidth="1.5" strokeLinejoin="round" />
            <circle r="4" className="fill-foreground" />
          </motion.g>
        </svg>

        <div className="pointer-events-none absolute top-3 left-4 max-w-[60%]">
          <p className="font-display text-3xl leading-none font-bold">{current.title}</p>
          <p className="mt-1.5 text-sm text-muted-foreground text-pretty">{current.detail}</p>
        </div>
        <p className="pointer-events-none absolute top-3 right-4 hidden font-mono text-[0.65rem] text-muted-foreground uppercase sm:block">
          {hint}
        </p>
      </div>

      <label className="flex items-center gap-3 text-sm">
        <span className="shrink-0 text-muted-foreground">{sliderLabel}</span>
        <Slider value={[x]} onValueChange={(v) => moveTo(Array.isArray(v) ? v[0] : v)} min={0} max={W} aria-label={sliderLabel} />
      </label>

      {/* Same waypoints as text for screen readers. */}
      <ol className="sr-only">
        {waypoints.map((w) => (
          <li key={w.key}>
            {w.title}: {w.detail}
          </li>
        ))}
      </ol>
    </figure>
  )
}
