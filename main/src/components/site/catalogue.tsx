"use client"

import { useState } from "react"
import DriftWall from "@/components/reactbits/DriftWall"
import { Kbd } from "@/components/ui/kbd"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Dictionary } from "@/content/dictionary"
import type { Locale, Project, ProjectKind } from "@/content/types"
import { useCatalogue } from "./catalogue-provider"
import { SplitWords } from "./reveal"
import { StatusLabel } from "./status-label"

type Filter = "all" | ProjectKind
const FILTERS: Filter[] = ["all", "web", "mobile", "other"]

/**
 * The whole catalogue in one screen: a compact index of every project next to a React Bits
 * Drift Wall of their screenshots. The index is the accessible way in; the wall is decorative,
 * a click on a tile opens the same spec sheet.
 */
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
  const { open } = useCatalogue()
  const visible = filter === "all" ? projects : projects.filter((p) => p.kind === filter)
  // Every screenshot of every visible project; projects without screenshots live in the index only.
  const tiles = visible.flatMap((p) => (p.images ?? []).map((image) => ({ image, title: p.name, slug: p.slug })))

  return (
    <section
      id="catalogue"
      aria-labelledby="catalogue-title"
      className="grid scroll-mt-20 gap-8 lg:h-[calc(100svh-3.5rem)] lg:grid-cols-12 lg:gap-10 lg:py-6"
    >
      <div className="flex min-h-0 flex-col gap-5 lg:col-span-5">
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

        <ol className="flex min-h-0 flex-col">
          {visible.map((project) => (
            <li key={project.slug} className="border-b">
              <button
                type="button"
                onClick={() => open(project.slug)}
                className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 py-2 text-left outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring"
              >
                <span className="font-mono text-xs text-muted-foreground tabular">{project.artNo}</span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-display text-xl leading-tight font-bold sm:text-2xl [word-spacing:inherit] group-hover:text-tag-ink">
                    {project.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">{project.category[locale]}</span>
                </span>
                <StatusLabel status={project.status} labels={t} className="px-1.5 py-1 text-[10px]" />
              </button>
            </li>
          ))}
        </ol>

        <p className="hidden items-center gap-1.5 text-sm text-muted-foreground md:flex">
          {t.keysHint} <Kbd>1</Kbd>–<Kbd>9</Kbd>
        </p>
      </div>

      {/* content-visibility keeps the wall's 3D tiles out of every frame while it is off screen. */}
      <div className="relative h-[60svh] min-h-0 overflow-hidden rounded-sm border bg-card/40 [content-visibility:auto] lg:col-span-7 lg:h-full">
        <DriftWall
          items={tiles}
          columns={4}
          tileWidth={220}
          tileHeight={138}
          gap={16}
          radius={4}
          speed={28}
          overlayColor="var(--background)"
          dim={0.2}
          fade={0.5}
          onSelect={(item) => open(item.slug)}
        />
      </div>
    </section>
  )
}
