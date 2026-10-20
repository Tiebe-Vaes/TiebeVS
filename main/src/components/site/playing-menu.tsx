"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { ArrowUpRightIcon, GemIcon, ScissorsIcon, ZapIcon, type LucideIcon } from "lucide-react"
import { siClaudecode, siNextdotjs, siObsidian } from "simple-icons"
import type { InfiniteMenuItem } from "@/components/reactbits/InfiniteMenu"
import type { Dictionary } from "@/content/dictionary"
import type { PlayingItem } from "@/content/playing"
import type { Locale } from "@/content/types"

// WebGL globe loads with the section, not with the page.
const InfiniteMenu = dynamic(() => import("@/components/reactbits/InfiniteMenu"), { ssr: false })

// Brand mark where one exists; otherwise a plain glyph for what the tool does.
const MARKS: Record<string, string | LucideIcon> = {
  "Claude Code": siClaudecode.path,
  Obsidian: siObsidian.path,
  "Next.js + React": siNextdotjs.path,
  Superpowers: ZapIcon,
  Impeccable: GemIcon,
  "Caveman + Ponytail": ScissorsIcon,
}

/** One square tile for the globe: the mark centred on an accent plate, in the theme's tag ink. */
function tile(inner: string, filled: boolean, card: string, ink: string) {
  const paint = filled
    ? `fill="${ink}"`
    : `fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="${card}"/><g transform="translate(160 160) scale(8)" ${paint}>${inner}</g></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/** What Tiebe works with as tiles on a globe you can spin; the panel beside it describes the tile in front. */
export function PlayingMenu({ items, locale, t }: { items: PlayingItem[]; locale: Locale; t: Dictionary["playing"] }) {
  const { resolvedTheme } = useTheme()
  const glyphs = useRef<HTMLDivElement>(null)
  const [tiles, setTiles] = useState<InfiniteMenuItem[]>([])
  const [active, setActive] = useState(0)

  // Tiles need concrete colours and plain SVG, so they are drawn from the live theme tokens.
  useEffect(() => {
    if (!resolvedTheme || !glyphs.current) return
    const css = getComputedStyle(document.documentElement)
    const card = css.getPropertyValue("--accent").trim()
    const ink = css.getPropertyValue("--tag-ink").trim()
    const drawn = glyphs.current.children
    let g = 0
    setTiles(
      items.map((item) => {
        const mark = MARKS[item.name]
        const image =
          typeof mark === "string"
            ? tile(`<path d="${mark}"/>`, true, card, ink)
            : tile(drawn[g++]?.innerHTML ?? "", false, card, ink)
        return { image, title: item.name }
      }),
    )
  }, [items, resolvedTheme])

  const item = items[active] ?? items[0]

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.3fr)_1fr]">
      <div aria-hidden="true" ref={glyphs} className="hidden">
        {items.map((entry) => {
          const Glyph = MARKS[entry.name]
          return typeof Glyph === "string" || !Glyph ? null : <Glyph key={entry.name} />
        })}
      </div>

      <div className="relative h-[22rem] sm:h-[28rem] lg:h-[34rem]">
        {tiles.length > 0 && (
          <InfiniteMenu
            items={tiles}
            theme={resolvedTheme === "light" ? "light" : "dark"}
            grayscale={false}
            count={60}
            dim={0.25}
            zoom={1}
            autoplay={4}
            showInfo={false}
            onActiveChange={(_, index) => setActive(index)}
          />
        )}
      </div>

      {/* The tool in front of the globe; announced politely when it changes. */}
      <div aria-live="polite" className="flex flex-col justify-end gap-2 pt-5 lg:p-8 lg:pr-0">
        <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{item.kind[locale]}</span>
        <h3 className="font-display text-4xl leading-none font-bold lg:text-5xl">{item.name}</h3>
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
                  className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
                />
                <span className="sr-only">{t.newTab}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="pt-4 font-mono text-xs text-muted-foreground">{t.hint}</p>
      </div>
    </div>
  )
}
