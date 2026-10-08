"use client"

import { useEffect, useRef } from "react"
import { ReactLenis, useLenis, type LenisRef } from "lenis/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "motion/react"

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

/** Lenis smooth scroll driven by GSAP's ticker, so ScrollTrigger and Lenis share one clock. */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion()
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    if (reduceMotion) return
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => gsap.ticker.remove(update)
  }, [reduceMotion])

  useLenis(() => ScrollTrigger.update())

  if (reduceMotion) return null
  return <ReactLenis root ref={lenisRef} options={{ autoRaf: false, anchors: { offset: -64 }, lerp: 0.12 }} />
}

/**
 * Scroll reveals for everything inside: `[data-split]` headings come in word by word,
 * `[data-reveal]` blocks rise into place. Content is visible without JavaScript and
 * under reduced motion; GSAP only hides it right before animating it in.
 */
export function Reveals({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create("[data-split]", {
          type: "words",
          mask: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 110,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.06,
              scrollTrigger: { trigger: self.elements[0], start: "top 88%", once: true },
            }),
        })

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 48,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope },
  )

  return <div ref={scope}>{children}</div>
}
