import Image from "next/image"
import type { Project } from "@/content/types"
import { cn } from "@/lib/utils"
import { StackDrawing } from "./stack-drawing"

/**
 * Product plate: the first screenshot, or, without one, a technical drawing of the
 * project's own stack.
 */
export function Plate({
  project,
  drawingLabel,
  sizes,
  className,
}: {
  project: Project
  drawingLabel: string
  sizes: string
  className?: string
}) {
  const src = project.images?.[0]
  if (src) {
    // Crop from the top-left so headlines and app bars stay in view; the spec sheet shows the full screens.
    return (
      <div className={cn("relative overflow-hidden rounded-sm border bg-muted", className)}>
        <Image src={src} alt="" fill sizes={sizes} className="object-cover object-left-top" />
      </div>
    )
  }

  const layers = project.tech.slice(0, 5).map((title) => ({ key: title, title, icon: title }))

  return (
    <div className={cn("ripstop plate-drawing relative flex items-center overflow-hidden rounded-sm border bg-card", className)}>
      <span className="absolute top-2.5 left-3 font-mono text-[0.65rem] text-muted-foreground tabular">
        Art. {project.artNo}
      </span>
      <StackDrawing
        variant="plate"
        layers={layers}
        label={drawingLabel.replace("{name}", project.name)}
        className="px-2"
      />
    </div>
  )
}
