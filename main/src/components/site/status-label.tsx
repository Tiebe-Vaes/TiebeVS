import { cn } from "@/lib/utils"
import type { ProjectStatus } from "@/content/types"

/** Sewn label for shipped work, basted label for work in development. */
export function StatusLabel({
  status,
  labels,
  className,
}: {
  status: ProjectStatus
  labels: { shipped: string; inDevelopment: string }
  className?: string
}) {
  const shipped = status === "shipped"
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1.5 font-mono text-xs leading-none tracking-wider uppercase",
        shipped ? "stitch-sewn text-shipped" : "stitch-basted text-tag-ink",
        className,
      )}
    >
      {shipped ? labels.shipped : labels.inDevelopment}
    </span>
  )
}
