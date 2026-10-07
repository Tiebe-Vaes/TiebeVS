"use client"

import Image from "next/image"
import { ArrowUpRightIcon, LockIcon } from "lucide-react"
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
import { Plate } from "./plate"
import { StatusLabel } from "./status-label"
import { TechIcon } from "./tech-icon"

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
        <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto p-0 sm:max-w-4xl">
          <div className="grid md:grid-cols-[1.15fr_1fr]">
            <Gallery project={project} drawingLabel={catalogue.drawingLabel} sheet={sheet} />

            <div className="flex flex-col gap-5 p-5 md:p-7">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-muted-foreground tabular">Art. {project.artNo}</span>
                <DialogTitle className="font-display text-4xl leading-none font-bold">{project.name}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {project.category[locale]}
                </DialogDescription>
              </div>

              <p className="text-[0.95rem] leading-relaxed text-pretty">{project.details[locale]}</p>

              <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 border-t pt-4 text-sm">
                <dt className="font-mono text-xs text-muted-foreground uppercase">{sheet.status}</dt>
                <dd>
                  <StatusLabel
                    status={project.status}
                    labels={{ shipped: catalogue.shipped, inDevelopment: catalogue.inDevelopment }}
                  />
                </dd>
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
        </DialogContent>
      ) : null}
    </Dialog>
  )
}

function Gallery({
  project,
  drawingLabel,
  sheet,
}: {
  project: Project
  drawingLabel: string
  sheet: Dictionary["sheet"]
}) {
  const images = project.images ?? []
  if (images.length <= 1) {
    return (
      <Plate
        project={project}
        drawingLabel={drawingLabel}
        sizes="(min-width: 768px) 480px, 100vw"
        className="aspect-[4/3] rounded-none border-0 border-b md:aspect-auto md:min-h-full md:border-r md:border-b-0"
      />
    )
  }
  return (
    <div className="relative border-b bg-muted md:border-r md:border-b-0">
      <Carousel opts={{ loop: true }} className="h-full">
        <CarouselContent className="ml-0">
          {images.map((src, index) => (
            <CarouselItem key={src} className="relative aspect-[4/3] pl-0 md:aspect-[4/5]">
              <Image
                src={src}
                alt={`${project.name} ${index + 1}/${images.length}`}
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious aria-label={sheet.prev} className="left-3" />
        <CarouselNext aria-label={sheet.next} className="right-3" />
      </Carousel>
    </div>
  )
}
