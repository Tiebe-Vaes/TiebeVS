"use client"

import { useId, useRef, useState } from "react"
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
// The hiker starts on the summit.
const START = STOPS.indexOf(490)

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

function nearestStop(x: number) {
  return STOPS.reduce((best, sx, i) => (Math.abs(sx - x) < Math.abs(STOPS[best] - x) ? i : best), 0)
}

const ridgePath = `M${RIDGE.map(([x, y]) => `${x} ${y}`).join(" L")}`
const fillPath = `${ridgePath} L${W} ${BASE} L0 ${BASE} Z`

// Contour lines: the ridge repeated lower and flatter, like a map's relief.
const contours = [0.82, 0.66, 0.5, 0.34].map(
  (k) => `M${RIDGE.map(([x, y]) => `${x} ${(BASE - (BASE - y) * k).toFixed(1)}`).join(" L")}`,
)

export function RouteProfile({
  label,
  hint,
  sliderLabel,
  waypoints,
}: {
  label: string
  hint: string
  sliderLabel: string
  waypoints: Waypoint[]
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const hikerRef = useRef<SVGGElement>(null)
  const clipId = useId()
  // React state changes only when the nearest stop changes; the hiker itself is moved directly.
  const [active, setActive] = useState(START)

  function moveTo(x: number) {
    const clamped = Math.max(0, Math.min(W, x))
    hikerRef.current?.setAttribute("transform", `translate(${clamped} ${ridgeY(clamped)})`)
    const stop = nearestStop(clamped)
    if (stop !== active) setActive(stop)
  }

  function fromPointer(clientX: number) {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    moveTo(((clientX - rect.left) / rect.width) * W)
  }

  const current = waypoints[active]

  return (
    <figure className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">{hint}</span>
        <span className="font-mono text-xs text-muted-foreground tabular">
          {String(active + 1).padStart(2, "0")} / {String(waypoints.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative rounded-sm border bg-card">
        {/* Readout: above the drawing on small screens, over its quiet top-left corner from md up. */}
        <div aria-live="polite" className="border-b px-4 py-3 md:pointer-events-none md:absolute md:top-3 md:left-4 md:max-w-[58%] md:border-0 md:p-0">
          <p className="font-display text-3xl leading-none font-bold">{current.title}</p>
          <p className="mt-1.5 text-sm text-pretty text-muted-foreground">{current.detail}</p>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`${label}: ${waypoints.map((w) => w.title).join(", ")}`}
          className="h-auto w-full touch-pan-y text-line select-none"
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
            const anchor = i === 0 ? "start" : i === STOPS.length - 1 ? "end" : "middle"
            return (
              <g key={waypoints[i].key}>
                <line x1={sx} y1={sy} x2={sx} y2={BASE} stroke="currentColor" strokeDasharray="3 4" opacity={on ? 0.9 : 0.4} />
                {/* Larger markers on phones, where the drawing scales to under half size. */}
                <circle
                  cx={sx}
                  cy={sy}
                  r={on ? 8 : 5}
                  className={cn(
                    on ? "fill-primary [r:16] md:[r:8]" : "fill-card [r:11] md:[r:5]",
                  )}
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <text
                  x={sx}
                  y={BASE + 26}
                  textAnchor={anchor}
                  className={cn("max-md:hidden", on ? "fill-foreground font-semibold" : "fill-muted-foreground")}
                  style={{ fontSize: 15 }}
                >
                  {waypoints[i].title}
                </text>
                {/* On small screens only the numbers show; the readout names the stop. */}
                <text
                  x={sx}
                  y={BASE}
                  textAnchor={anchor}
                  className={cn(
                    "font-mono [font-size:34px] [translate:0_44px] md:[font-size:11px] md:[translate:0_48px]",
                    on ? "fill-foreground" : "fill-muted-foreground",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            )
          })}

          {/* The hiker follows the pointer along the ridge. */}
          <g ref={hikerRef} transform={`translate(${STOPS[START]} ${ridgeY(STOPS[START])})`}>
            <line x1="0" y1="0" x2="0" y2="-34" className="stroke-foreground" strokeWidth="2" />
            <path d="M0 -34 L22 -27 L0 -20 Z" className="fill-primary stroke-foreground" strokeWidth="1.5" strokeLinejoin="round" />
            <circle r="4" className="fill-foreground" />
          </g>
        </svg>
      </div>

      {/* Keyboard and touch: one step per waypoint. */}
      <label className="flex items-center gap-3 text-sm">
        <span className="shrink-0 text-muted-foreground">{sliderLabel}</span>
        <Slider
          value={[active]}
          onValueChange={(v) => {
            const i = Array.isArray(v) ? v[0] : v
            moveTo(STOPS[i])
            setActive(i)
          }}
          min={0}
          max={STOPS.length - 1}
          step={1}
          aria-label={sliderLabel}
        />
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
