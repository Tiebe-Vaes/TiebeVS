"use client"

import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Dictionary } from "@/content/dictionary"
import type { Locale, Project, ProjectKind } from "@/content/types"
import { ProjectCard } from "./project-card"
import { SplitWords } from "./reveal"

type Filter = "all" | ProjectKind
const FILTERS: Filter[] = ["all", "web", "mobile", "other"]

/** Every project as a figure card, three across on wide screens; filters narrow the grid. */
export function Catalogue({
  projects,
  locale,
  t,
}: {
  projects: Project[]
  locale: Locale
  t: Dictionary["catalogue"]
}) {
  const [filter, setFilter] = useState<Filter>("all")
  const visible = filter === "all" ? projects : projects.filter((p) => p.kind === filter)
  const figureLabels: Record<string, string> = t.figures

  return (
    <section
      id="catalogue"
      aria-labelledby="catalogue-title"
      className="flex scroll-mt-20 flex-col gap-8"
    >
      <div className="flex flex-col gap-3 border-b-2 border-foreground pb-4">
        <h2 id="catalogue-title" data-split className="font-display text-6xl leading-none font-extrabold sm:text-7xl">
          <SplitWords text={t.title} />
        </h2>
        <p className="text-pretty text-muted-foreground">{t.intro}</p>
        <ToggleGroup
          aria-label={t.filterLabel}
          value={[filter]}
          onValueChange={(value) => setFilter((value[0] as Filter | undefined) ?? "all")}
          variant="outline"
          spacing={0}
          className="self-start"
        >
          {FILTERS.map((f) => (
            <ToggleGroupItem key={f} value={f} className="pointer-coarse:h-11">
              {t.filters[f]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} locale={locale} figureLabel={figureLabels[project.slug]} />
          </li>
        ))}
      </ol>
    </section>
  )
}
