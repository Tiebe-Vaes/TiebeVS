import { cn } from "@/lib/utils"
import { techIconPath } from "./tech-icon"

export type DrawingLayer = { key: string; title: string; detail?: string; icon?: string }

type Geometry = {
  width: number
  height: number
  cx: number
  w: number
  slab: number
  baseY: number
  collapsedStep: number
  explodedStep: number
  labelX: number
  titleSize: number
  detailSize: number
  stroke: number
}

// Fully exploded, the top face of a 5-layer stack still sits inside each viewBox.
const GEOMETRY: Record<"hero" | "plate", Geometry> = {
  hero: {
    width: 760, height: 500, cx: 200, w: 300, slab: 12, baseY: 470,
    collapsedStep: 16, explodedStep: 56, labelX: 400, titleSize: 17, detailSize: 13, stroke: 1.2,
  },
  plate: {
    width: 480, height: 330, cx: 130, w: 190, slab: 9, baseY: 300,
    collapsedStep: 11, explodedStep: 38, labelX: 250, titleSize: 22, detailSize: 0, stroke: 1.5,
  },
}

/**
 * Isometric exploded drawing of a stack. Every layer, leader line and label reads one
 * CSS custom property, --explode (0..1), set on an ancestor.
 */
export function StackDrawing({
  layers,
  variant,
  label,
  activeKey,
  onLayerHover,
  className,
}: {
  layers: DrawingLayer[]
  variant: "hero" | "plate"
  label: string
  activeKey?: string | null
  onLayerHover?: (key: string | null) => void
  className?: string
}) {
  const g = GEOMETRY[variant]
  const h = g.w * 0.58
  // Drawn bottom to top; layers[0] is the top of the stack.
  const ordered = [...layers].slice(0, 5).reverse()
  const n = ordered.length

  return (
    <svg viewBox={`0 0 ${g.width} ${g.height}`} role="img" aria-label={label} className={cn("h-auto w-full text-line", className)}>
      {ordered.map((layer, i) => {
        const y = g.baseY - i * g.collapsedStep - h / 2
        const active = activeKey === layer.key
        const iconPath = layer.icon ? techIconPath(layer.icon) : undefined
        const isTop = i === n - 1
        return (
          <g
            key={layer.key}
            style={{ transform: `translateY(calc(var(--explode) * ${-i * g.explodedStep}px))` }}
            onPointerEnter={onLayerHover ? () => onLayerHover(layer.key) : undefined}
            onPointerLeave={onLayerHover ? () => onLayerHover(null) : undefined}
          >
            <path
              d={`M${g.cx - g.w / 2} ${y} L${g.cx} ${y + h / 2} L${g.cx} ${y + h / 2 + g.slab} L${g.cx - g.w / 2} ${y + g.slab} Z`}
              className="fill-[color-mix(in_oklch,var(--line)_22%,var(--card))]"
              stroke="currentColor"
              strokeWidth={g.stroke}
            />
            <path
              d={`M${g.cx} ${y + h / 2} L${g.cx + g.w / 2} ${y} L${g.cx + g.w / 2} ${y + g.slab} L${g.cx} ${y + h / 2 + g.slab} Z`}
              className="fill-[color-mix(in_oklch,var(--line)_38%,var(--card))]"
              stroke="currentColor"
              strokeWidth={g.stroke}
            />
            <path
              d={`M${g.cx - g.w / 2} ${y} L${g.cx} ${y - h / 2} L${g.cx + g.w / 2} ${y} L${g.cx} ${y + h / 2} Z`}
              className={active ? "fill-primary" : "fill-card"}
              stroke="currentColor"
              strokeWidth={g.stroke}
              style={{ transition: "fill 160ms ease-out" }}
            />
            {isTop && iconPath ? (
              <path
                d={iconPath}
                className="fill-foreground"
                opacity={0.85}
                transform={`matrix(${(g.w / 300) * 1.05} ${(g.w / 300) * 0.61} ${-(g.w / 300) * 1.05} ${(g.w / 300) * 0.61} ${g.cx} ${y - (g.w / 300) * 0.61 * 24})`}
              />
            ) : null}

            {/* Callout: number, leader line, label. Fades in as the layers separate. */}
            <g
              className={cn(
                "[&_text]:[paint-order:stroke] [&_text]:stroke-card [&_text]:[stroke-linejoin:round] [&_text]:[stroke-width:5px]",
                variant === "hero" && "max-md:hidden",
              )}
              style={{ opacity: "clamp(0, calc((var(--explode) - 0.12) * 4), 1)" }}
            >
              <circle cx={g.cx + g.w / 2} cy={y} r={g.titleSize * 0.65} className="fill-background" stroke="currentColor" strokeWidth={g.stroke} />
              <text
                x={g.cx + g.w / 2}
                y={y + g.titleSize * 0.25}
                textAnchor="middle"
                className="fill-foreground font-mono"
                style={{ fontSize: g.titleSize * 0.65 }}
              >
                {n - i}
              </text>
              <line
                x1={g.cx + g.w / 2 + g.titleSize * 0.65}
                y1={y}
                x2={g.labelX - 6}
                y2={y}
                stroke="currentColor"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              {iconPath ? (
                <path
                  d={iconPath}
                  className="fill-foreground"
                  transform={`translate(${g.labelX} ${y - g.titleSize * 0.55}) scale(${(g.titleSize * 1.1) / 24})`}
                />
              ) : null}
              <text
                x={g.labelX + (iconPath ? g.titleSize * 1.5 : 0)}
                y={y + g.titleSize * 0.3}
                className="fill-foreground font-semibold"
                style={{ fontSize: g.titleSize }}
              >
                {layer.title}
              </text>
              {g.detailSize && layer.detail ? (
                <text
                  x={g.labelX + (iconPath ? g.titleSize * 1.5 : 0)}
                  y={y + g.titleSize * 0.3 + g.detailSize * 1.6}
                  className="fill-muted-foreground"
                  style={{ fontSize: g.detailSize, opacity: "clamp(0, calc((var(--explode) - 0.45) * 3), 1)" }}
                >
                  {layer.detail}
                </text>
              ) : null}
            </g>
          </g>
        )
      })}
    </svg>
  )
}
