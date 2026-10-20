"use client"

import { useId, useState } from "react"
import dynamic from "next/dynamic"
import type { Locale, Project } from "@/content/types"
import { useCatalogue } from "./catalogue-provider"
import { TechIcon } from "./tech-icon"

// Same lazy figure as the specimen cards: the engines load with the first card, not with the page.
const HairlineFigure = dynamic(() => import("./hairline-figure"), {
  ssr: false,
  loading: () => <div className="aspect-[5/4] w-full" />,
})

/**
 * One project as a catalogue specimen, wide: its line figure on the left (on top on phones),
 * then category, name, summary and stack. The whole card is one button that opens the spec sheet.
 * The dim layer reads --scroll-stack-dim, which the scroll stack sets once a card is covered.
 */
export function ProjectCard({ project, locale, figureLabel }: { project: Project; locale: Locale; figureLabel: string }) {
  const { open } = useCatalogue()
  const [reading, setReading] = useState("")
  const id = useId()

  return (
    <button
      type="button"
      onClick={() => open(project.slug)}
      aria-labelledby={`${id}-name`}
      aria-describedby={`${id}-summary`}
      className="hairline-plate group relative grid w-full origin-top overflow-hidden rounded-sm border bg-card text-left shadow-[0_-12px_32px_-18px_rgb(0_0_0/0.45)] outline-offset-2 transition-colors hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none sm:grid-cols-[minmax(0,20rem)_1fr] lg:grid-cols-[minmax(0,24rem)_1fr]"
    >
      <span className="flex flex-col border-b sm:border-r sm:border-b-0">
        <span className="flex items-baseline justify-between gap-4 px-4 pt-3 font-mono text-xs text-muted-foreground uppercase tabular">
          <span>Art. {project.artNo}</span>
          <span aria-hidden="true">{reading}</span>
        </span>
        {/* Smaller on phones so a pinned card still fits under the header with its text in view. */}
        <span className="mx-auto block w-full max-w-[13rem] sm:max-w-none">
          <HairlineFigure name={project.figure} label={figureLabel} onRead={setReading} />
        </span>
      </span>
      <span className="flex flex-col justify-end gap-2 p-5 sm:p-8">
        <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{project.category[locale]}</span>
        <span id={`${id}-name`} className="font-display text-4xl leading-none font-bold text-balance group-hover:text-tag-ink lg:text-5xl">
          {project.name}
        </span>
        <span id={`${id}-summary`} className="max-w-[56ch] text-pretty text-muted-foreground">
          {project.summary[locale]}
        </span>
        <span className="flex flex-wrap gap-1.5 pt-2">
          {project.tech.map((tech) => (
            <span key={tech} className="inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs">
              <TechIcon name={tech} />
              {tech}
            </span>
          ))}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-background opacity-[var(--scroll-stack-dim,0)]"
      />
    </button>
  )
}
