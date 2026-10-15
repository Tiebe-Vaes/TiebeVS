"use client"

import { ReactLenis } from "lenis/react"
import { useReducedMotion } from "motion/react"
import "lenis/dist/lenis.css"

/** Wheel over an open dialog stays native: the popup scrolls and Base UI's scroll lock holds the page. */
const inDialog = (node: HTMLElement) =>
  node.dataset.slot === "dialog-content" || node.dataset.slot === "dialog-overlay"

/** Light Lenis smooth scroll on its own rAF; touch keeps native scrolling (Lenis default). */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return null
  return <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -64 }, prevent: inDialog }} />
}
