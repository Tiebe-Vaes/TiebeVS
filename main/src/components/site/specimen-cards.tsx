"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { ArrowUpRightIcon } from "lucide-react"
import type { Dictionary } from "@/content/dictionary"
import type { PlayingItem } from "@/content/playing"
import type { Locale } from "@/content/types"
import { cn } from "@/lib/utils"

// The hairline engine loads with the first card, not with the page; each figure idles at rest.
const HairlineFigure = dynamic(() => import("./hairline-figure"), {
  ssr: false,
  loading: () => <div className="aspect-[5/4] w-full" />,
})

/**
 * What Tiebe plays with right now as catalogue specimens: every card's image is a hairline
 * figure that answers the pointer. Three columns on wide screens; the first and last card
 * run two columns wide with the figure beside the text.
 */
export function SpecimenCards({ items, locale, t }: { items: PlayingItem[]; locale: Locale; t: Dictionary["playing"] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <SpecimenCard
          key={item.name}
          item={item}
          index={i}
          wide={i === 0 || i === items.length - 1}
          locale={locale}
          t={t}
        />
      ))}
    </ol>
  )
}

function SpecimenCard({
  item,
  index,
  wide,
  locale,
  t,
}: {
  item: PlayingItem
  index: number
  wide: boolean
  locale: Locale
  t: Dictionary["playing"]
}) {
  const [reading, setReading] = useState("")

  return (
    <li
      className={cn(
        "hairline-plate grid overflow-hidden rounded-sm border bg-card",
        wide && "sm:col-span-2 lg:grid-cols-2",
      )}
    >
      <div className={cn("flex flex-col border-b", wide && "lg:border-r lg:border-b-0")}>
        <div className="flex items-baseline justify-between gap-4 px-4 pt-3 font-mono text-xs text-muted-foreground uppercase tabular">
          <span>Fig. {String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden="true">{reading}</span>
        </div>
        <HairlineFigure name={item.figure} label={`${item.name}, ${t.figureLabel}`} onRead={setReading} />
      </div>

      <div className={cn("flex flex-col gap-2 p-5", wide && "lg:justify-end lg:p-8")}>
        <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{item.kind[locale]}</span>
        <h3 className={cn("font-display leading-none font-bold", wide ? "text-4xl lg:text-5xl" : "text-3xl")}>
          {item.name}
        </h3>
        <p className="max-w-[52ch] text-pretty text-muted-foreground">{item.blurb[locale]}</p>
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
      </div>
    </li>
  )
}
