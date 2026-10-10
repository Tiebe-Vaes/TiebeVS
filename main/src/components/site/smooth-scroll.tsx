"use client"

import { ReactLenis } from "lenis/react"
import { useReducedMotion } from "motion/react"
import "lenis/dist/lenis.css"

/** Light Lenis smooth scroll on its own rAF; touch keeps native scrolling (Lenis default). */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return null
  return <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -64 } }} />
}
