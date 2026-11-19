"use client"

import { useRef, type ComponentProps } from "react"
import dynamic from "next/dynamic"
import { useInView } from "motion/react"

// The chart kit is the heaviest client code on the page; it loads only when the heatmap nears the viewport.
const GithubHeatmap = dynamic(() => import("./github-heatmap"), { ssr: false })

/** GitHub heatmap that loads as you scroll toward it; the fixed cell size gives it a known height, so nothing shifts. */
export function LazyHeatmap(props: ComponentProps<typeof GithubHeatmap>) {
  const box = useRef<HTMLDivElement>(null)
  const near = useInView(box, { once: true, margin: "600px 0px" })
  return (
    <div ref={box} className="min-h-[204px]">
      {near && <GithubHeatmap {...props} />}
    </div>
  )
}
