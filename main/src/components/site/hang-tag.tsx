"use client"

import { useEffect, useRef, useState } from "react"
import { MailIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
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

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789-"

/** Scrambles into `text` once on mount, like a label printer finding its line. */
function useScramble(text: string, duration = 700) {
  const [shown, setShown] = useState(text)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const done = Math.min(1, (now - start) / duration)
      const fixed = Math.floor(done * text.length)
      setShown(
        text.slice(0, fixed) +
          [...text.slice(fixed)].map((c) => (c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""),
      )
      if (done < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, duration])
  return shown
}

const REST = -2.5

export function HangTag({ locale, t }: { locale: Locale; t: Dictionary["tag"] }) {
  const time = useLocalTime()
  const artNo = useScramble("TV-2027")
  const swingRef = useRef<HTMLDivElement>(null)

  // The tag swings toward the pointer, only while the pointer is on the tag itself; the
  // overshooting transition in the class list does the swinging.
  function swing(e: React.PointerEvent<HTMLDivElement>) {
    const el = swingRef.current
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    el.style.rotate = `${Math.max(-6, Math.min(6, REST + dx / 40))}deg`
  }

  return (
    <div className="relative flex flex-col items-center pt-2">
      <Carabiner />
      {/* Cord from carabiner to the punch hole. */}
      <div aria-hidden="true" className="h-8 w-px bg-foreground/70" />
      {/* The tag hangs slightly crooked from its punch hole. The shadow sits on this wrapper
          because the ticket mask below would clip a box-shadow. */}
      <div
        ref={swingRef}
        onPointerMove={swing}
        onPointerLeave={() => swingRef.current?.style.setProperty("rotate", `${REST}deg`)}
        style={{ rotate: `${REST}deg` }}
        className="w-full max-w-md origin-top drop-shadow-[0_18px_20px_oklch(0.25_0.05_60/0.35)] transition-[rotate] duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:drop-shadow-[0_24px_28px_oklch(0_0_0/0.6)]"
      >
        <div className="ticket-edge relative rounded-t-sm bg-primary px-6 pt-9 pb-8 text-primary-foreground sm:px-8 [&_:focus-visible]:outline-primary-foreground [&_:focus-visible]:ring-primary-foreground">
          <span
            aria-hidden="true"
            className="absolute top-3 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-background ring-[3px] ring-primary-foreground/80"
          />
          <div className="flex items-baseline justify-between font-mono text-xs tracking-wider uppercase tabular">
            <span>
              {t.artNo} <span aria-label="TV-2027">{artNo}</span>
            </span>
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

          {/* Perforation: where the stub would tear off. */}
          <div aria-hidden="true" className="my-5 border-t-2 border-dashed border-primary-foreground/35" />

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
        </div>
      </div>
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
