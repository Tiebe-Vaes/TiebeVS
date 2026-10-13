"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { ArrowUpRightIcon, Gamepad2Icon, LockIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import type { Dictionary } from "@/content/dictionary"
import type { Locale, Project } from "@/content/types"
import { TechIcon } from "./tech-icon"

const HairlineFigure = dynamic(() => import("./hairline-figure"), {
  ssr: false,
  loading: () => <div className="aspect-[5/4] w-full" />,
})

export function SpecSheet({
  project,
  locale,
  labels,
  onOpenChange,
}: {
  project: Project | null
  locale: Locale
  labels: { sheet: Dictionary["sheet"]; catalogue: Dictionary["catalogue"] }
  onOpenChange: (open: boolean) => void
}) {
  const { sheet, catalogue } = labels
  return (
    <Dialog open={project !== null} onOpenChange={onOpenChange}>
      {project ? (
        <DialogContent closeLabel={sheet.close} className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto p-0 sm:max-w-4xl">
          <div className="grid md:grid-cols-[1.15fr_1fr]">
            <FigurePanel project={project} label={(catalogue.figures as Record<string, string>)[project.slug]} />

            <div className="flex flex-col gap-5 p-5 md:p-7">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-muted-foreground tabular">Art. {project.artNo}</span>
                <DialogTitle className="font-display text-4xl leading-none font-bold">{project.name}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {project.category[locale]}
                </DialogDescription>
              </div>

              <p className="text-base leading-relaxed text-pretty">{project.details[locale]}</p>

              <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 border-t pt-4 text-sm">
                {project.years ? (
                  <>
                    <dt className="font-mono text-xs text-muted-foreground uppercase">{sheet.years}</dt>
                    <dd className="tabular">{project.years}</dd>
                  </>
                ) : null}
                {project.team ? (
                  <>
                    <dt className="font-mono text-xs text-muted-foreground uppercase">{sheet.team}</dt>
                    <dd>{project.team[locale]}</dd>
                  </>
                ) : null}
                {project.role ? (
                  <>
                    <dt className="font-mono text-xs text-muted-foreground uppercase">{sheet.myPart}</dt>
                    <dd>{project.role[locale]}</dd>
                  </>
                ) : null}
                <dt className="font-mono text-xs text-muted-foreground uppercase">{sheet.stack}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <li key={tech}>
                        <Badge variant="outline" className="gap-1.5 font-normal">
                          <TechIcon name={tech} />
                          {tech}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>

              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "tag", size: "lg" })}
                  >
                    <Gamepad2Icon data-icon="inline-start" aria-hidden="true" />
                    {sheet.demo}
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "ink", size: "lg" })}
                  >
                    <TechIcon name="GitHub" />
                    {sheet.repo}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <LockIcon className="size-3.5" aria-hidden="true" />
                    {sheet.noRepo}
                  </span>
                )}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "outline", size: "lg" })}
                  >
                    {sheet.live}
                    <ArrowUpRightIcon data-icon="inline-end" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          {project.images?.length ? <Gallery project={project} images={project.images} sheet={sheet} /> : null}
        </DialogContent>
      ) : null}
    </Dialog>
  )
}

/** The project's figure, first thing in the sheet; screenshots come below. */
function FigurePanel({ project, label }: { project: Project; label: string }) {
  const [reading, setReading] = useState("")
  return (
    <div className="hairline-plate flex flex-col justify-center border-b bg-card md:border-r md:border-b-0">
      <div className="flex items-baseline justify-between gap-4 px-5 pt-4 font-mono text-xs text-muted-foreground uppercase tabular">
        <span>Fig. {project.artNo}</span>
        <span aria-hidden="true">{reading}</span>
      </div>
      <HairlineFigure name={project.figure} label={label} onRead={setReading} />
    </div>
  )
}

function Gallery({ project, images, sheet }: { project: Project; images: string[]; sheet: Dictionary["sheet"] }) {
  return (
    <section aria-label={sheet.images} className="flex flex-col gap-3 border-t p-5 md:p-7">
      <h3 className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{sheet.images}</h3>
      <Carousel opts={{ loop: images.length > 1 }} className="rounded-sm border bg-muted">
        <CarouselContent className="ml-0">
          {images.map((src, index) => (
            <CarouselItem key={src} className="relative aspect-[16/10] pl-0">
              <Image
                src={src}
                alt={`${project.name} ${index + 1}/${images.length}`}
                fill
                sizes="(min-width: 896px) 832px, 100vw"
                className="object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 ? (
          <>
            <CarouselPrevious aria-label={sheet.prev} className="left-3" />
            <CarouselNext aria-label={sheet.next} className="right-3" />
          </>
        ) : null}
      </Carousel>
    </section>
  )
}
