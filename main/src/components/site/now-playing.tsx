"use client"

import { useState, useSyncExternalStore } from "react"
import dynamic from "next/dynamic"
import { ArrowUpRightIcon } from "lucide-react"
import type { Dictionary } from "@/content/dictionary"
import type { PlayingItem } from "@/content/playing"
import type { Locale } from "@/content/types"
import { cn } from "@/lib/utils"

// The hairline engine loads with the first figure, not with the page.
const HairlineFigure = dynamic(() => import("./hairline-figure"), {
  ssr: false,
  loading: () => <div className="aspect-[5/4] w-full" />,
})

function subscribeWide(onChange: () => void) {
  const mq = window.matchMedia("(min-width: 1024px)")
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}
const isWide = () => window.matchMedia("(min-width: 1024px)").matches

/**
 * Ranked list of what Tiebe plays with right now, next to one big hairline figure that
 * follows the row under the pointer or focus. Only one figure is ever mounted: beside the
 * list on wide screens, inside the active row on narrow ones.
 */
export function NowPlaying({
  items,
  locale,
  t,
}: {
  items: PlayingItem[]
  locale: Locale
  t: Dictionary["playing"]
}) {
  const [active, setActive] = useState(0)
  const [reading, setReading] = useState("")
  const wide = useSyncExternalStore(subscribeWide, isWide, () => true)
  const current = items[active]

  const figure = (
    <figure className="flex flex-col gap-3">
      <div className="hairline-plate overflow-hidden rounded-sm border bg-card">
        <HairlineFigure name={current.figure} label={`${current.name}, ${t.figureLabel}`} onRead={setReading} />
      </div>
      <figcaption className="flex items-baseline justify-between gap-4 font-mono text-xs text-muted-foreground uppercase tabular">
        <span>
          Fig. {String(active + 1).padStart(2, "0")} · {current.figure}
        </span>
        <span aria-hidden="true">{reading}</span>
      </figcaption>
    </figure>
  )

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ol className="flex flex-col lg:col-span-7">
        {items.map((item, i) => {
          const on = i === active
          return (
            <li
              key={item.name}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(i)}
              className={cn(
                "-mx-3 grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-3 border-b px-3 py-6 transition-colors duration-200 sm:grid-cols-[4.5rem_1fr]",
                on && "bg-[color-mix(in_oklch,var(--primary)_10%,transparent)]",
              )}
            >
              <span
                className={cn(
                  "self-start justify-self-start rounded-sm px-1.5 py-0.5 font-mono text-sm tabular transition-colors duration-200",
                  on ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-3xl leading-none font-bold">
                    {/* The name picks the figure on touch and keyboard; the links below leave the page. */}
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={on}
                      className="text-left [word-spacing:inherit] outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      {item.name}
                    </button>
                  </h3>
                  <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    {item.kind[locale]}
                  </span>
                </div>
                <p className="max-w-[58ch] text-pretty text-muted-foreground">{item.blurb[locale]}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link trail-link inline-flex items-center gap-1 font-mono text-sm"
                      >
                        {link.label}
                        <ArrowUpRightIcon
                          aria-hidden="true"
                          className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-focus-visible/link:translate-x-0.5 group-focus-visible/link:-translate-y-0.5 motion-reduce:transition-none"
                        />
                        <span className="sr-only">{t.newTab}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                {!wide && on ? <div className="pt-3">{figure}</div> : null}
              </div>
            </li>
          )
        })}
      </ol>
      {wide ? <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">{figure}</div> : null}
    </div>
  )
}
