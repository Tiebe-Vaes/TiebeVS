"use client"

import dynamic from "next/dynamic"
import { PlayIcon } from "lucide-react"
import type { Dictionary } from "@/content/dictionary"
import type { Locale, Project } from "@/content/types"
import { useCatalogue } from "./catalogue-provider"
import { SplitWords } from "./reveal"

const HairlineFigure = dynamic(() => import("./hairline-figure"), {
  ssr: false,
  loading: () => <div className="aspect-[5/4] w-full" />,
})

/** The still for a project: its first screenshot, else the poster of its clip. */
const stillOf = (project: Project) =>
  project.images?.find((src) => !src.endsWith(".mp4")) ?? project.images?.[0]?.replace(/\.mp4$/, ".webp")

const ignore = () => {}

/** The project's line figure in a hairline plate. */
function Figure({ project, label, className }: { project: Project; label: string; className?: string }) {
  return (
    <span className={`hairline-plate flex flex-col rounded-sm border bg-card ${className ?? ""}`}>
      <HairlineFigure name={project.figure} label={label} onRead={ignore} />
    </span>
  )
}

/** A featured project: figure and text beside its whole screenshot. The card is one button that opens the spec sheet. */
function Featured({ project, locale, label, video }: { project: Project; locale: Locale; label: string; video: string }) {
  const { open } = useCatalogue()
  const still = stillOf(project)
  const hasVideo = project.images?.some((src) => src.endsWith(".mp4"))
  return (
    <li>
      <button
        type="button"
        onClick={() => open(project.slug)}
        className="group grid w-full gap-6 rounded-sm border bg-card/60 p-4 text-left outline-offset-4 transition-colors hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-ring sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-8"
      >
        <span className="flex flex-col gap-4">
          <Figure project={project} label={label} className="w-full max-w-[18rem]" />
          <span className="flex flex-col gap-2">
            <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Art. {project.artNo} · {project.category[locale]}
              {project.years && ` · ${project.years}`}
            </span>
            <span className="font-display text-4xl leading-none font-bold text-balance transition-colors group-hover:text-tag-ink sm:text-5xl">
              {project.name}
            </span>
            <span className="max-w-[56ch] text-pretty text-muted-foreground">{project.summary[locale]}</span>
          </span>
        </span>
        {still && (
          <span className="relative block aspect-[16/10] self-center overflow-hidden rounded-sm border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element -- local WebP stills, whole shot inside a fixed frame */}
            <img src={still} alt="" loading="lazy" decoding="async" className="size-full object-contain" />
            {hasVideo && (
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-sm bg-background/90 px-2.5 py-1 font-mono text-xs uppercase">
                <PlayIcon aria-hidden="true" className="size-3.5" />
                {video}
              </span>
            )}
          </span>
        )}
      </button>
    </li>
  )
}

/** A compact project row: small figure, name and summary, category and years. */
function Row({ project, locale, label }: { project: Project; locale: Locale; label: string }) {
  const { open } = useCatalogue()
  return (
    <li className="border-b">
      <button
        type="button"
        onClick={() => open(project.slug)}
        className="group grid w-full grid-cols-[5rem_1fr] items-center gap-x-4 gap-y-1 py-4 text-left outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring sm:grid-cols-[8rem_1fr_auto] sm:gap-x-6"
      >
        <Figure project={project} label={label} className="row-span-2 sm:row-span-1" />
        <span className="flex min-w-0 flex-col gap-1">
          <span className="font-display text-3xl leading-none font-bold text-balance transition-colors group-hover:text-tag-ink">
            {project.name}
          </span>
          <span className="hidden max-w-[60ch] text-pretty text-muted-foreground sm:block">{project.summary[locale]}</span>
        </span>
        <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase sm:text-right">
          {project.category[locale]}
          {project.years && <span className="block normal-case">{project.years}</span>}
        </span>
      </button>
    </li>
  )
}

/** Two featured projects, then the rest as compact rows; every project keeps its line figure. */
export function Catalogue({ projects, locale, t }: { projects: Project[]; locale: Locale; t: Dictionary["catalogue"] }) {
  const labels: Record<string, string> = t.figures
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="catalogue" aria-labelledby="catalogue-title" className="flex scroll-mt-20 flex-col gap-8">
      <div className="flex flex-col gap-3 border-b-2 border-foreground pb-4">
        <h2 id="catalogue-title" data-split className="font-display text-6xl leading-none font-extrabold sm:text-7xl">
          <SplitWords text={t.title} />
        </h2>
        <p className="text-pretty text-muted-foreground">{t.intro}</p>
      </div>

      <ol className="flex flex-col gap-6">
        {featured.map((p) => (
          <Featured key={p.slug} project={p} locale={locale} label={labels[p.slug] ?? p.name} video={t.video} />
        ))}
      </ol>

      <ol className="flex flex-col border-t" aria-label={t.more}>
        {rest.map((p) => (
          <Row key={p.slug} project={p} locale={locale} label={labels[p.slug] ?? p.name} />
        ))}
      </ol>
    </section>
  )
}
