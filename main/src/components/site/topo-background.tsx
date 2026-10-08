"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { useReducedMotion } from "motion/react"

// Vanta takes numeric colors: contour line and ground per theme (see globals.css).
const COLORS = {
  light: { color: 0x98adbd, backgroundColor: 0xf3f6f3 },
  dark: { color: 0x34506a, backgroundColor: 0x0f1e2e },
}

type VantaEffect = { destroy: () => void }

/**
 * Vanta.js TOPOLOGY (p5-based flowing contour lines) behind the hero.
 * Loaded on demand, only on screens from tablet up and without reduced motion;
 * otherwise the hero keeps its plain ground.
 */
export function TopoBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (reduceMotion || !resolvedTheme || !ref.current) return
    if (!window.matchMedia("(min-width: 768px)").matches) return

    let effect: VantaEffect | undefined
    let cancelled = false
    ;(async () => {
      const [{ default: p5 }, { default: TOPOLOGY }] = await Promise.all([
        import("p5"),
        import("vanta/src/vanta.topology"),
      ])
      if (cancelled || !ref.current) return
      effect = TOPOLOGY({
        el: ref.current,
        p5,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        scale: 1,
        scaleMobile: 1,
        ...COLORS[resolvedTheme === "dark" ? "dark" : "light"],
      })
    })()

    return () => {
      cancelled = true
      effect?.destroy()
    }
  }, [reduceMotion, resolvedTheme])

  return <div ref={ref} aria-hidden="true" className={className} />
}
