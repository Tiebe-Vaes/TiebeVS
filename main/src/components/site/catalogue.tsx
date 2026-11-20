"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import type { Dictionary } from "@/content/dictionary"
import type { Locale, Project } from "@/content/types"
import { useCatalogue } from "./catalogue-provider"
import { SplitWords } from "./reveal"

// The line figures load only when a project without a screenshot is previewed.
const HairlineFigure = dynamic(() => import("./hairline-figure"), { ssr: false })

/** The still for a project: its first screenshot, or the poster of its clip. */
const stillOf = (project: Project) => project.images?.[0]?.replace(/\.mp4$/, ".webp")

/**
 * Every project as one row of an index, with a shared preview on wide screens.
 * Pointer or focus on a row swaps the preview; a click (or tap, or Enter) opens the spec sheet.
 */
export function Catalogue({ projects, locale, t }: { projects: Project[]; locale: Locale; t: Dictionary["catalogue"] }) {
  const { open } = useCatalogue()
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug)
  const active = projects.find((p) => p.slug === activeSlug) ?? projects[0]
  const figureLabels: Record<string, string> = t.figures
  const still = active && stillOf(active)

  return (
    <section id="catalogue" aria-labelledby="catalogue-title" className="flex scroll-mt-20 flex-col gap-8">
      <div className="flex flex-col gap-3 border-b-2 border-foreground pb-4">
        <h2 id="catalogue-title" data-split className="font-display text-6xl leading-none font-extrabold sm:text-7xl">
          <SplitWords text={t.title} />
        </h2>
        <p className="text-pretty text-muted-foreground">{t.intro}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,32rem)]">
        <ol className="flex flex-col">
          {projects.map((project) => {
            const isActive = project.slug === active?.slug
            return (
              <li key={project.slug} className="border-b">
                <button
                  type="button"
                  onClick={() => open(project.slug)}
                  onFocus={() => setActiveSlug(project.slug)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActiveSlug(project.slug)}
                  className="group grid w-full grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 py-5 text-left outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring sm:grid-cols-[3rem_1fr_auto] sm:py-6"
                >
                  <span className="pt-1.5 font-mono text-xs text-muted-foreground tabular">
                    <span aria-hidden="true" className={isActive ? "invisible text-tag-ink lg:visible" : "invisible"}>
                      ▸{" "}
                    </span>
                    {project.artNo}
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span
                      className={`font-display text-3xl leading-none font-bold text-balance transition-colors sm:text-4xl ${isActive ? "lg:text-tag-ink" : ""} group-hover:text-tag-ink`}
                    >
                      {project.name}
                    </span>
                    <span className="max-w-[60ch] text-pretty text-muted-foreground">{project.summary[locale]}</span>
                  </span>
                  <span className="col-start-2 font-mono text-xs tracking-wider text-muted-foreground uppercase sm:col-start-3 sm:pt-2 sm:text-right">
                    {project.category[locale]}
                    {project.years && <span className="block normal-case">{project.years}</span>}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        {/* Decorative: the rows already carry every word, so the preview stays out of the reading order. */}
        <div aria-hidden="true" className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border bg-card">
              {active &&
                (still ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local WebP stills, sized by the frame
                  <img
                    key={still}
                    src={still}
                    alt=""
                    decoding="async"
                    className="size-full animate-in object-cover object-top fade-in duration-200 motion-reduce:animate-none"
                  />
                ) : (
                  <div key={active.slug} className="flex size-full items-center justify-center p-8 animate-in fade-in duration-200 motion-reduce:animate-none">
                    <div className="w-full max-w-sm">
                      <HairlineFigure name={active.figure} label={figureLabels[active.slug] ?? active.name} onRead={() => {}} />
                    </div>
                  </div>
                ))}
            </div>
            {active && (
              <p className="flex justify-between font-mono text-xs text-muted-foreground uppercase tabular">
                <span>Art. {active.artNo}</span>
                <span>{active.years}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
