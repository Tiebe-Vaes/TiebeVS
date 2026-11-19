"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"
import { ArrowUpRightIcon } from "lucide-react"
import type { Dictionary } from "@/content/dictionary"
import type { TerminalLine, TerminalSession } from "@/content/playing"
import type { Locale } from "@/content/types"
import { cn } from "@/lib/utils"

// Claude Code's own dark terminal palette: the terminal stays dark in both site themes.
const INK = { bg: "#1f1e1d", bar: "#2a2927", text: "#e8e6dc", dim: "#9a9893", clay: "#d97757", green: "#7bc47f" }

const lineText = (line: TerminalLine, locale: Locale) => (typeof line.text === "string" ? line.text : line.text[locale])

/** One line drawn the way Claude Code draws it; `text` may be cut short while it is being typed. */
function Line({ line, text }: { line: TerminalLine; text: string }) {
  switch (line.kind) {
    case "prompt":
      return (
        <p className="mt-2 first:mt-0" style={{ color: INK.text }}>
          <span style={{ color: INK.dim }}>&gt; </span>
          {text}
        </p>
      )
    case "tool":
      return (
        <p className="mt-2" style={{ color: INK.text }}>
          <span style={{ color: INK.green }}>⏺ </span>
          {text}
          {line.model && text.length === line.text.length && <span style={{ color: INK.clay }}> · {line.model}</span>}
        </p>
      )
    case "result":
      return (
        <p className="pl-4" style={{ color: INK.dim }}>
          ⎿ {text}
        </p>
      )
    case "done":
      return (
        <p className="mt-2" style={{ color: INK.green }}>
          ✓ {text}
        </p>
      )
  }
}

/** The active session, typed line by line once the terminal is in view. Keyed by tab, so a new tab starts over. */
function Transcript({
  session,
  locale,
  play,
  reduced,
  working,
}: {
  session: TerminalSession
  locale: Locale
  play: boolean
  reduced: boolean
  working: string
}) {
  const [at, setAt] = useState({ line: 0, char: 0 })
  const lines = session.lines
  const finished = reduced || at.line >= lines.length

  useEffect(() => {
    if (!play || finished) return
    const full = lineText(lines[at.line], locale)
    const lineDone = at.char >= full.length
    const id = setTimeout(
      () => setAt(lineDone ? { line: at.line + 1, char: 0 } : { line: at.line, char: at.char + 2 }),
      lineDone ? 260 : 16,
    )
    return () => clearTimeout(id)
  }, [at, play, finished, lines, locale])

  const shown = finished ? lines.length : at.line + 1

  return (
    <>
      {lines.slice(0, shown).map((line, i) => {
        const full = lineText(line, locale)
        return <Line key={i} line={line} text={finished || i < at.line ? full : full.slice(0, at.char)} />
      })}
      {!finished && (
        <p className="mt-3 animate-pulse" style={{ color: INK.clay }}>
          ✻ {working}
        </p>
      )}
    </>
  )
}

/** Werkwijze as a Claude Code terminal: each tab replays one kind of session, subagents and skills included. */
export function WorkflowTerminal({
  sessions,
  links,
  locale,
  t,
}: {
  sessions: TerminalSession[]
  links: { label: string; href: string }[]
  locale: Locale
  t: Dictionary["playing"]
}) {
  const [tab, setTab] = useState(0)
  const frame = useRef<HTMLDivElement>(null)
  const inView = useInView(frame, { once: true, margin: "0px 0px -25% 0px" })
  const reduced = useReducedMotion() ?? false
  const session = sessions[tab]

  return (
    <div className="flex flex-col gap-5">
      <div ref={frame} className="overflow-hidden rounded-lg border" style={{ background: INK.bg, borderColor: INK.bar }}>
        <div className="flex items-center gap-3 overflow-x-auto px-3 pt-2.5" style={{ background: INK.bar }}>
          <span aria-hidden="true" className="flex shrink-0 gap-1.5 pb-2.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2.5 rounded-full" style={{ background: "#4a4844" }} />
            ))}
          </span>
          <div role="tablist" aria-label={t.tabsLabel} className="flex">
            {sessions.map((s, i) => (
              <button
                key={s.label.en}
                role="tab"
                type="button"
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className={cn(
                  "shrink-0 rounded-t-md px-3 pt-1.5 pb-2 font-mono text-xs whitespace-nowrap transition-colors pointer-coarse:py-3",
                  i !== tab && "hover:text-[#e8e6dc]",
                )}
                style={i === tab ? { background: INK.bg, color: INK.text } : { color: INK.dim }}
              >
                {s.label[locale]}
              </button>
            ))}
          </div>
        </div>

        <div role="tabpanel" className="flex h-[36rem] flex-col p-4 font-mono text-[13px] leading-relaxed sm:h-[30rem] sm:p-5 sm:text-sm">
          <div className="mb-4 self-start rounded-md border px-3 py-2" style={{ borderColor: INK.clay }}>
            <p style={{ color: INK.text }}>
              <span style={{ color: INK.clay }}>✻</span> {t.welcome}
            </p>
            <p style={{ color: INK.dim }}>cwd: {session.cwd}</p>
          </div>

          {/* Typed for the eye; the full transcript is in the list below for screen readers. */}
          <div aria-hidden="true" className="min-h-0 flex-1 overflow-hidden">
            <Transcript key={tab} session={session} locale={locale} play={inView} reduced={reduced} working={t.working} />
          </div>
          <ol className="sr-only">
            {session.lines.map((line, i) => (
              <li key={i}>{lineText(line, locale)}</li>
            ))}
          </ol>

          <div aria-hidden="true" className="mt-3 rounded-md border px-3 py-2" style={{ borderColor: "#4a4844", color: INK.dim }}>
            &gt; <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse" style={{ background: INK.dim }} />
          </div>
        </div>
      </div>

      <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noreferrer" className="group/link trail-link inline-flex items-center gap-1">
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
    </div>
  )
}
