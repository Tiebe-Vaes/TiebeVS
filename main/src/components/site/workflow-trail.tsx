"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll } from "motion/react"
import { ArrowUpRightIcon } from "lucide-react"
import type { Dictionary } from "@/content/dictionary"
import type { WorkflowStep } from "@/content/playing"
import type { Locale } from "@/content/types"

/** The workflow as a trail: numbered stops on a fjord line that draws itself down as you scroll. */
export function WorkflowTrail({ steps, locale, t }: { steps: WorkflowStep[]; locale: Locale; t: Dictionary["playing"] }) {
  const list = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 55%"] })

  return (
    <ol ref={list} className="relative flex flex-col">
      {/* Dashed track, with the drawn line on top of it. Both run through the centre of the markers. */}
      <span aria-hidden="true" className="absolute top-3 bottom-3 left-[0.6875rem] border-l border-dashed border-line/50" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduced ? 1 : scrollYProgress }}
        className="absolute top-3 bottom-3 left-[0.6875rem] w-px origin-top bg-line"
      />

      {steps.map((step, i) => (
        <li key={step.title.en} className="group relative grid grid-cols-[1.5rem_1fr] gap-x-5 pb-10 last:pb-0 sm:gap-x-8">
          <span aria-hidden="true" className="mt-1.5 size-[1.375rem] rounded-full border-2 border-line bg-background" />
          <div className="grid gap-x-10 gap-y-2 border-b pb-10 group-last:border-0 group-last:pb-0 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-muted-foreground tabular">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-3xl leading-none font-bold sm:text-4xl">{step.title[locale]}</h3>
            </div>
            <div className="flex flex-col gap-3 lg:pt-5">
              <p className="max-w-[60ch] text-pretty text-muted-foreground">{step.blurb[locale]}</p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-sm">
                {step.tools.map((tool) =>
                  tool.href ? (
                    <li key={tool.name}>
                      <a
                        href={tool.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link trail-link inline-flex items-center gap-1"
                      >
                        {tool.name}
                        <ArrowUpRightIcon
                          aria-hidden="true"
                          className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
                        />
                        <span className="sr-only">{t.newTab}</span>
                      </a>
                    </li>
                  ) : (
                    <li key={tool.name} className="text-muted-foreground">
                      {tool.name}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
