"use client"

import { Fragment, useEffect } from "react"

/** Wraps each word in a mask so `[data-split]` headings can rise in word by word (see globals.css). */
export function SplitWords({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 ? " " : null}
      <span className="split-word">
        <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
      </span>
    </Fragment>
  ))
}

/**
 * One IntersectionObserver for the whole page: `[data-reveal]` blocks and `[data-split]`
 * headings get `is-in` once they enter the viewport, and CSS does the motion. Nothing runs
 * per frame. Elements are hidden only when `html.reveal-on` is set by the inline script in
 * the root layout, and never under reduced motion.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add("is-in")
          io.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    )
    document.querySelectorAll("[data-reveal], [data-split]").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}
