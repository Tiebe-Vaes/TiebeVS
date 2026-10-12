"use client"

import { useId, useState } from "react"
import dynamic from "next/dynamic"
import type { Locale, Project } from "@/content/types"
import { useCatalogue } from "./catalogue-provider"

// Same lazy figure as the specimen cards: the engines load with the first card, not with the page.
const HairlineFigure = dynamic(() => import("./hairline-figure"), {
  ssr: false,
  loading: () => <div className="aspect-[5/4] w-full" />,
})

/**
 * One project as a catalogue specimen: its line figure first, then category, name and summary.
 * The whole card is one button that opens the spec sheet; its accessible name is the project name.
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
      className="hairline-plate group flex h-full w-full flex-col overflow-hidden rounded-sm border bg-card text-left outline-offset-2 transition-colors hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none"
    >
      <span className="flex items-baseline justify-between gap-4 px-4 pt-3 font-mono text-xs text-muted-foreground uppercase tabular">
        <span>Art. {project.artNo}</span>
        <span aria-hidden="true">{reading}</span>
      </span>
      <span className="block border-b">
        <HairlineFigure name={project.figure} label={figureLabel} onRead={setReading} />
      </span>
      <span className="flex flex-1 flex-col gap-1.5 p-5">
        <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{project.category[locale]}</span>
        <span id={`${id}-name`} className="font-display text-3xl leading-none font-bold group-hover:text-tag-ink">
          {project.name}
        </span>
        <span id={`${id}-summary`} className="line-clamp-2 text-pretty text-muted-foreground">
          {project.summary[locale]}
        </span>
      </span>
    </button>
  )
}
