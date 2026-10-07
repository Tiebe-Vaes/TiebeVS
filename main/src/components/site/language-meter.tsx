"use client"

import { useRef } from "react"
import { useInView } from "motion/react"
import { Progress, ProgressLabel } from "@/components/ui/progress"

/** Language level as a loading bar that fills once it scrolls into view. */
export function LanguageMeter({ name, level, share, hint }: { name: string; level: string; share: number; hint: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  return (
    <div ref={ref}>
      <Progress
        value={inView ? share : 0}
        aria-valuetext={`${name}: ${level}`}
        className="gap-x-3 gap-y-2.5 [&_[data-slot=progress-indicator]]:duration-[1400ms] [&_[data-slot=progress-indicator]]:ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:[&_[data-slot=progress-indicator]]:duration-0 [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:rounded-sm"
      >
        <ProgressLabel className="text-lg font-normal">{name}</ProgressLabel>
        <abbr title={hint} className="ml-auto font-mono text-sm no-underline tabular">
          {level}
        </abbr>
      </Progress>
    </div>
  )
}
