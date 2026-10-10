"use client"

import CircularCarousel from "@/components/reactbits/CircularCarousel"
import type { Locale, Project } from "@/content/types"
import { useCatalogue } from "./catalogue-provider"

/**
 * React Bits Circular Carousel over the project screenshots; a click opens the spec sheet.
 * ponytail: projects without screenshots are left out and join as soon as `images` is filled in.
 */
export function ProjectCarousel({ projects, locale, label }: { projects: Project[]; locale: Locale; label: string }) {
  const { open } = useCatalogue()
  const withImages = projects.filter((p) => p.images?.length)
  if (!withImages.length) return null

  return (
    // content-visibility keeps the 3D layers out of every frame while the catalogue is off screen.
    <div role="group" aria-label={label} className="relative h-[clamp(20rem,46vw,30rem)] w-full [content-visibility:auto]">
      <CircularCarousel
        items={withImages.map((p) => ({ src: p.images![0], alt: p.name, title: p.name, subtitle: p.category[locale] }))}
        preset="cylinder"
        // Flat cards instead of 8 curved slices each: 12 layers instead of 96, same ring.
        curve={0}
        cardWidth={300}
        aspectRatio={16 / 10}
        captions
        fadeColor="var(--background)"
        cornerRadius={4}
        onItemClick={(item) => {
          const project = withImages.find((p) => p.name === item.title)
          if (project) open(project.slug)
        }}
      />
    </div>
  )
}
