"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import { clamp01, isSettled, springStep } from "./geometry"

type FigureOptions = {
  /** Value at rest, 0..1. */
  rest: number
  /** Target value for a pointer at (x, y), both 0..1 within the figure box. */
  fromPointer: (x: number, y: number) => number
  readout: (v: number) => string
  onRead: (text: string) => void
}

/**
 * The pointer as one sprung value from 0 to 1. The animation loop only runs between pointer input
 * and settling, so a figure off screen is already idle. Under reduced motion the figure stays at rest.
 */
export function useFigure(ref: RefObject<HTMLDivElement | null>, { rest, fromPointer, readout, onRead }: FigureOptions) {
  const [value, setValue] = useState(rest)
  const latest = useRef({ fromPointer, readout, onRead })
  useEffect(() => {
    latest.current = { fromPointer, readout, onRead }
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = matchMedia("(prefers-reduced-motion: reduce)")
    let v = rest
    let velocity = 0
    let target = rest
    let raf = 0
    let last = 0
    let lastRead: string | null = null
    let leaveTimer = 0

    const read = (x: number) => {
      const text = latest.current.readout(x)
      if (text === lastRead) return
      lastRead = text
      latest.current.onRead(text)
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      ;[v, velocity] = springStep(v, velocity, target, dt)
      if (isSettled(v, velocity, target)) {
        v = target
        velocity = 0
        raf = 0
      } else {
        raf = requestAnimationFrame(tick)
      }
      setValue(v)
      read(v)
    }

    const aim = (next: number) => {
      target = next
      if (raf) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const move = (e: PointerEvent) => {
      window.clearTimeout(leaveTimer)
      if (reduced.matches) return
      const r = el.getBoundingClientRect()
      aim(clamp01(latest.current.fromPointer((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height)))
    }
    // A finger lifts before the eye has read the figure, so touch lingers like the hairline figures do.
    const leave = (e: PointerEvent) => {
      window.clearTimeout(leaveTimer)
      leaveTimer = window.setTimeout(() => aim(rest), e.pointerType === "mouse" ? 0 : 1400)
    }

    read(rest)
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerdown", move)
    el.addEventListener("pointerleave", leave)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(leaveTimer)
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerdown", move)
      el.removeEventListener("pointerleave", leave)
    }
  }, [ref, rest])

  return value
}
