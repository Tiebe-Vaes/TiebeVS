"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useSpring } from "motion/react"
import { MailIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Dictionary } from "@/content/dictionary"
import { profile } from "@/content/profile"
import type { Locale } from "@/content/types"

const timeFormat = new Intl.DateTimeFormat("nl-BE", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: profile.timeZone,
})

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const tick = () => setTime(timeFormat.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

export function HangTag({ locale, t }: { locale: Locale; t: Dictionary["tag"] }) {
  const reduceMotion = useReducedMotion()
  const time = useLocalTime()
  const tagRef = useRef<HTMLDivElement>(null)
  // The tag hangs from its punch hole and swings toward the pointer.
  const rotate = useSpring(-2.5, { stiffness: 60, damping: 14, mass: 1.2 })

  useEffect(() => {
    if (reduceMotion) return
    // Mouse only: on touch the tag would stay tilted wherever the last finger left it.
    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return
      const rect = tagRef.current?.getBoundingClientRect()
      if (!rect) return
      const dx = event.clientX - (rect.left + rect.width / 2)
      rotate.set(Math.max(-7, Math.min(7, dx / 60)))
    }
    const settle = () => rotate.set(-2.5)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.documentElement.addEventListener("mouseleave", settle)
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      document.documentElement.removeEventListener("mouseleave", settle)
    }
  }, [reduceMotion, rotate])

  return (
    <div className="relative flex flex-col items-center pt-2">
      <Carabiner />
      {/* Cord from carabiner to the punch hole. */}
      <div aria-hidden="true" className="h-8 w-px bg-foreground/70" />
      <motion.div
        ref={tagRef}
        style={{ rotate, transformOrigin: "50% 0%" }}
        className="relative w-full max-w-md rounded-sm bg-primary px-6 pt-9 pb-6 text-primary-foreground shadow-[0_18px_40px_-18px_oklch(0.25_0.05_60/0.55)] sm:px-8 dark:shadow-[0_24px_60px_-20px_oklch(0_0_0/0.85)] [&_:focus-visible]:outline-primary-foreground [&_:focus-visible]:ring-primary-foreground"
      >
        <span
          aria-hidden="true"
          className="absolute top-3 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-background ring-[3px] ring-primary-foreground/80"
        />
        <div className="flex items-baseline justify-between font-mono text-xs tracking-wider uppercase tabular">
          <span>{t.artNo} TV-2027</span>
          <span>
            {t.localTime} <time suppressHydrationWarning>{time ?? "--:--"}</time>
          </span>
        </div>

        <h1 className="mt-6 font-display text-[clamp(3.4rem,9vw,6rem)] leading-[0.86] font-extrabold text-balance">
          {profile.name}
        </h1>
        <p className="mt-4 text-xl font-semibold">{profile.role[locale]}</p>
        {/* A wrapping row instead of dot separators: no line can start or end on a stray dot. */}
        <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-xs">
          {profile.stack.map((item) => (
            <li key={item} className="whitespace-nowrap">
              {item}
            </li>
          ))}
        </ul>

        <Separator className="my-5 bg-primary-foreground/30" />

        <p className="font-mono text-xs tracking-wider uppercase">{t.graduates}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <a href="#catalogue" className={buttonVariants({ variant: "tag", size: "lg" })}>
            {t.viewCatalogue}
          </a>
          <a href="#contact" className={buttonVariants({ variant: "tagOutline", size: "lg" })}>
            <MailIcon data-icon="inline-start" />
            {t.contact}
          </a>
        </div>
      </motion.div>
    </div>
  )
}

function Carabiner() {
  return (
    <svg viewBox="0 0 40 64" aria-hidden="true" className="h-14 w-9 text-foreground">
      <path
        d="M20 4c8.3 0 13 5.2 13 12.5V45c0 8.6-5.9 15-13 15S7 53.6 7 45V16.5C7 9.2 11.7 4 20 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <path d="M7 22 18 15" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <rect x="27.5" y="22" width="9" height="16" rx="2" fill="currentColor" />
    </svg>
  )
}
