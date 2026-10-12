import type { ReactNode, RefObject } from "react"

/** Box and svg for a hand-drawn figure, matching the hairline figures' 400×320 stage. Styles: `[data-figure]` in globals.css. */
export function FigureFrame({
  frameRef,
  label,
  children,
}: {
  frameRef: RefObject<HTMLDivElement | null>
  label: string
  children: ReactNode
}) {
  return (
    <div ref={frameRef} data-figure role="img" aria-label={label} className="w-full">
      <svg viewBox="0 0 400 320" aria-hidden="true">
        {children}
      </svg>
    </div>
  )
}
