"use client"

import { useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react"
import Image from "next/image"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { Iphone } from "@/components/ui/iphone"
import type { Project } from "@/content/types"
import { cn } from "@/lib/utils"

type Frame = NonNullable<Project["frame"]>

const TILT = 6 // degrees at the stage edge

/**
 * The project's screenshots shown on the device they were made for: a laptop
 * for web work and games, a phone for the mobile apps, a drawing sheet for
 * diagrams. The device leans toward the pointer; thumbnails and the arrow keys
 * switch the screen, which crossfades.
 */
export function DeviceGallery({
  project,
  labels,
}: {
  project: Project
  labels: { title: string; image: string }
}) {
  const images = project.images ?? []
  const frame: Frame = project.frame ?? (project.kind === "mobile" ? "phone" : "laptop")
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 170, damping: 22 }
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-TILT, TILT]), spring)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [TILT, -TILT]), spring)

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onPointerLeave() {
    px.set(0)
    py.set(0)
  }
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length)
    else if (e.key === "ArrowLeft") setActive((i) => (i - 1 + images.length) % images.length)
    else return
    e.preventDefault()
  }

  const screen = (
    <Screens images={images} active={active} alt={(i) => `${project.name} ${i + 1}/${images.length}`} frame={frame} />
  )

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={labels.title}
      tabIndex={images.length > 1 ? 0 : undefined}
      onKeyDown={images.length > 1 ? onKeyDown : undefined}
      className="flex flex-col items-center gap-5 rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
    >
      <div
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="flex w-full justify-center py-2 [perspective:1400px]"
      >
        <motion.div
          style={reduced ? undefined : { rotateX, rotateY }}
          className={cn(
            "w-full will-change-transform",
            frame === "phone" ? "max-w-[15rem]" : frame === "sheet" ? "max-w-xl" : "max-w-2xl"
          )}
        >
          {frame === "phone" ? (
            <Iphone screen={screen} />
          ) : frame === "sheet" ? (
            <Sheet label={`Art. ${project.artNo} · ${active + 1}/${images.length}`}>{screen}</Sheet>
          ) : (
            <Laptop>{screen}</Laptop>
          )}
        </motion.div>
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={labels.image.replace("{n}", String(i + 1)).replace("{total}", String(images.length))}
              aria-pressed={i === active}
              className={cn(
                "relative overflow-hidden rounded-[3px] border bg-muted outline-offset-2 transition-[opacity,border-color] focus-visible:outline-2 focus-visible:outline-ring",
                frame === "phone" ? "h-14 w-7" : "h-9 w-14",
                i === active ? "border-foreground opacity-100" : "border-border opacity-55 hover:opacity-90"
              )}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/** Every image stacked in the screen; the active one fades in over the rest. */
function Screens({
  images,
  active,
  alt,
  frame,
}: {
  images: string[]
  active: number
  alt: (i: number) => string
  frame: Frame
}) {
  return (
    <div className="relative size-full">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt(i)}
          fill
          sizes={frame === "phone" ? "240px" : "(min-width: 896px) 672px, 90vw"}
          aria-hidden={i !== active}
          className={cn(
            "transition-opacity duration-300 ease-out motion-reduce:transition-none",
            // Laptop and sheet show the whole shot; a phone screen is filled from the top.
            frame === "sheet" ? "object-contain" : frame === "phone" ? "object-cover object-top" : "object-contain",
            i === active ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
    </div>
  )
}

/** A laptop drawn in CSS: dark bezel with a camera, a 16:10 screen, a thin hinge and base. */
function Laptop({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[88%] rounded-t-[14px] rounded-b-[4px] border border-black/40 bg-[#0d1117] p-[2.2%] pt-[3%] shadow-[0_24px_48px_-24px_rgb(0_0_0/0.55)]">
        <span aria-hidden="true" className="absolute top-[1.1%] left-1/2 size-[5px] -translate-x-1/2 rounded-full bg-[#2b333d]" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-black">{children}</div>
      </div>
      <div aria-hidden="true" className="relative h-[10px] w-full rounded-b-[10px] border border-black/25 bg-[#c7ccd3] dark:bg-[#59626e]">
        <span className="absolute top-0 left-1/2 h-[4px] w-[14%] -translate-x-1/2 rounded-b-[6px] bg-black/15" />
      </div>
    </div>
  )
}

/** A drafting plate for diagrams: a dark board (the diagrams are dark), registration corners, plate label. */
function Sheet({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="relative bg-[#0f141a] p-[3%] shadow-[0_18px_40px_-24px_rgb(0_0_0/0.5)] ring-1 ring-white/10">
      {(["top-1.5 left-1.5 border-t border-l", "top-1.5 right-1.5 border-t border-r", "bottom-1.5 left-1.5 border-b border-l", "bottom-1.5 right-1.5 border-b border-r"] as const).map((c) => (
        <span key={c} aria-hidden="true" className={cn("absolute size-3 border-white/35", c)} />
      ))}
      <div className="relative aspect-[3/2]">{children}</div>
      <p className="mt-2 text-right font-mono text-[10px] tracking-wider text-white/55 uppercase">{label}</p>
    </div>
  )
}
