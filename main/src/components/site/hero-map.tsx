import { cn } from "@/lib/utils"

// Map sheet behind the hero: contour lines around a summit, index contours with
// elevation labels, edge ticks, a scale bar and the sheet's coordinates (Hoboken).
// Static SVG, so it also carries the topographic layer on phones where Vanta is off.

const W = 1440
const H = 900
const CX = 1120
const CY = 330
const RINGS = 16
const POINTS = 48

// Smooth irregular ring: radius varies with low-frequency waves that drift per ring.
function ring(i: number) {
  const base = 46 + i * 58
  const pts = Array.from({ length: POINTS }, (_, p) => {
    const a = (p / POINTS) * Math.PI * 2
    const wobble =
      1 +
      0.16 * Math.sin(a * 2 + i * 0.35) +
      0.09 * Math.cos(a * 3 - i * 0.5) +
      0.05 * Math.sin(a * 5 + i * 0.9)
    const r = base * wobble
    // Stretch toward the lower left so the contours sweep under the hang tag.
    return [CX + Math.cos(a) * r * 1.35, CY + Math.sin(a) * r * 0.95] as const
  })
  // Closed Catmull-Rom spline as cubic Béziers.
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let p = 0; p < POINTS; p++) {
    const p0 = pts[(p - 1 + POINTS) % POINTS]
    const p1 = pts[p]
    const p2 = pts[(p + 1) % POINTS]
    const p3 = pts[(p + 2) % POINTS]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  // Label position on the ring's left flank.
  const label = pts[Math.round(POINTS * 0.56)]
  return { d, label }
}

const CONTOURS = Array.from({ length: RINGS }, (_, i) => ({ i, ...ring(i) }))
const TICKS = Array.from({ length: 13 }, (_, i) => (i + 1) * 110)

export function HeroMap({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none text-contour", className)}
    >
      <g fill="none" stroke="currentColor">
        {CONTOURS.map(({ i, d }) => (
          // Every fourth line is an index contour, drawn heavier as on a real map.
          <path key={i} d={d} strokeWidth={i % 4 === 3 ? 1.8 : 0.9} />
        ))}
      </g>

      {/* Elevation labels on the index contours. */}
      {/* Text carries data, so it uses the readable muted ink, not the pale contour colour. */}
      <g className="fill-muted-foreground font-mono" style={{ fontSize: 13 }}>
        {CONTOURS.filter(({ i }) => i % 4 === 3).map(({ i, label }) => (
          <text key={i} x={label[0]} y={label[1]} dy="-4" textAnchor="middle" className="[paint-order:stroke] stroke-background [stroke-width:5px]">
            {1600 - i * 100}
          </text>
        ))}
        {/* Summit spot height. */}
        <circle cx={CX} cy={CY} r="3.5" />
        <text x={CX + 10} y={CY - 8}>1612</text>
      </g>

      {/* Sheet edge ticks. */}
      <g stroke="currentColor" strokeWidth="1.2">
        {TICKS.map((x) => (
          <line key={`t${x}`} x1={x} y1={H - 1} x2={x} y2={H - 12} />
        ))}
        {TICKS.filter((y) => y < H).map((y) => (
          <line key={`r${y}`} x1={W - 1} y1={y} x2={W - 12} y2={y} />
        ))}
      </g>

      {/* Scale bar and coordinates, bottom right. */}
      <g transform={`translate(${W - 330} ${H - 70})`} className="fill-muted-foreground font-mono" style={{ fontSize: 13 }}>
        <rect x="0" y="0" width="100" height="6" />
        <rect x="100" y="0" width="100" height="6" fill="none" className="stroke-muted-foreground" />
        <text x="0" y="24">0</text>
        <text x="100" y="24" textAnchor="middle">250</text>
        <text x="200" y="24" textAnchor="middle">500 m</text>
        <text x="0" y="-12">51°10′ N · 4°21′ E</text>
      </g>
    </svg>
  )
}
