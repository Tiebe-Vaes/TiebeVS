"use client"

import { useState } from "react"
import { Kbd } from "@/components/ui/kbd"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Dictionary } from "@/content/dictionary"
import type { Locale, Project, ProjectKind } from "@/content/types"
import { useCatalogue } from "./catalogue-provider"
import { Plate } from "./plate"
import { StatusLabel } from "./status-label"
import { TechIcon } from "./tech-icon"

type Filter = "all" | ProjectKind
const FILTERS: Filter[] = ["all", "web", "mobile", "other"]

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

  return (
    <section id="catalogue" aria-labelledby="catalogue-title" className="scroll-mt-20">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-foreground pb-5">
        <div className="flex max-w-xl flex-col gap-3">
          <h2 id="catalogue-title" className="font-display text-6xl leading-none font-extrabold sm:text-7xl">
            {t.title}
          </h2>
          <p className="text-pretty text-muted-foreground">{t.intro}</p>
          <p className="hidden items-center gap-1.5 text-sm text-muted-foreground md:flex">
            {t.keysHint} <Kbd>1</Kbd>–<Kbd>9</Kbd>
          </p>
        </div>
        <ToggleGroup
          aria-label={t.filterLabel}
          value={[filter]}
          onValueChange={(value) => setFilter((value[0] as Filter | undefined) ?? "all")}
          variant="outline"
          spacing={0}
        >
          {FILTERS.map((f) => (
            <ToggleGroupItem key={f} value={f} className="pointer-coarse:h-11">
              {t.filters[f]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <ol className="flex flex-col">
        {visible.map((project) => (
          <li key={project.slug} className="border-b">
            <CatalogueItem project={project} locale={locale} t={t} />
          </li>
        ))}
      </ol>
    </section>
  )
}

function CatalogueItem({ project, locale, t }: { project: Project; locale: Locale; t: Dictionary["catalogue"] }) {
  const { open } = useCatalogue()

  return (
    <div className="group relative grid gap-x-10 gap-y-5 py-10 lg:grid-cols-[4rem_1fr_minmax(0,18rem)]">
      <span className="font-mono text-sm text-muted-foreground tabular lg:pt-2">{project.artNo}</span>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="font-display text-4xl leading-none font-bold">
            <button
              type="button"
              onClick={() => open(project.slug)}
              // Buttons reset word-spacing in the UA stylesheet; inherit the display face's gaps.
              className="text-left [word-spacing:inherit] outline-offset-4 after:absolute after:inset-0 group-hover:text-tag-ink focus-visible:outline-2 focus-visible:outline-ring"
            >
              {project.name}
            </button>
          </h3>
          <StatusLabel status={project.status} labels={t} />
        </div>
        <p className="text-sm text-muted-foreground">
          {project.category[locale]}
          {project.years ? <span className="tabular"> · {project.years}</span> : null}
        </p>
        <p className="max-w-[62ch] text-pretty">{project.summary[locale]}</p>
        {project.tech.length ? (
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-sm text-muted-foreground" aria-label={t.stackLabel}>
            {project.tech.map((tech) => (
              <li key={tech} className="flex items-center gap-1.5">
                <TechIcon name={tech} />
                {tech}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* A click on the plate opens the spec sheet too; keyboard users reach it through the title button. */}
      <div className="relative aspect-[16/11] w-full cursor-pointer" onClick={() => open(project.slug)}>
        <Plate
          project={project}
          drawingLabel={t.drawingLabel}
          sizes="(min-width: 1024px) 288px, 100vw"
          className="size-full"
        />
      </div>
    </div>
  )
}
