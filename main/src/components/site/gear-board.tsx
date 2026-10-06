"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { RotateCcwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TechIcon } from "./tech-icon"

type Group = { label: string; items: string[] }

// Topographic relief behind the patches: nested, slightly irregular rings.
const RINGS = [1, 0.82, 0.64, 0.47, 0.31, 0.16].map((k) => {
  const pts = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2
    const wobble = 1 + 0.08 * Math.sin(i * 2.3) + 0.05 * Math.cos(i * 3.7)
    return [500 + Math.cos(a) * 470 * k * wobble, 260 + Math.sin(a) * 240 * k * wobble]
  })
  return `M${pts.map(([x, y]) => `${x.toFixed(0)} ${y.toFixed(0)}`).join(" L")} Z`
})

export function GearBoard({ groups, resetLabel }: { groups: Group[]; resetLabel: string }) {
  const boardRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [round, setRound] = useState(0)

  // The relief drifts gently against the pointer.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 20 })
  const sy = useSpring(py, { stiffness: 60, damping: 20 })
  const tx = useTransform(sx, (v) => v * -24)
  const ty = useTransform(sy, (v) => v * -16)

  return (
    <div
      ref={boardRef}
      className="relative overflow-hidden rounded-sm border bg-card px-5 pt-8 pb-16 sm:px-8 sm:pt-10"
      onPointerMove={(e) => {
        if (reduceMotion) return
        const r = e.currentTarget.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width - 0.5)
        py.set((e.clientY - r.top) / r.height - 0.5)
      }}
    >
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1000 520"
        preserveAspectRatio="xMidYMid slice"
        style={{ x: tx, y: ty }}
        className="pointer-events-none absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] text-line opacity-25"
      >
        {RINGS.map((d) => (
          <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="1.2" />
        ))}
      </motion.svg>

      <div key={round} className="relative flex flex-col gap-7">
        {groups.map((group, gi) => (
          <div key={group.label} className="grid gap-3 sm:grid-cols-[9rem_1fr] sm:items-center">
            <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{group.label}</span>
            <ul className="flex flex-wrap gap-2.5">
              {group.items.map((item, ii) => (
                <motion.li
                  key={item}
                  drag={!reduceMotion}
                  dragConstraints={boardRef}
                  dragElastic={0.18}
                  dragMomentum
                  initial={reduceMotion ? false : { opacity: 0, y: 14, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: ((gi * 7 + ii * 3) % 5) - 2 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: reduceMotion ? 0 : gi * 0.06 + ii * 0.03, type: "spring", stiffness: 260, damping: 20 }}
                  whileHover={reduceMotion ? undefined : { y: -3, rotate: 0, scale: 1.04 }}
                  whileDrag={{ scale: 1.1, rotate: 4, zIndex: 10, boxShadow: "0 14px 28px -12px oklch(0.25 0.02 255 / 0.45)" }}
                  className="stitch-sewn flex cursor-grab touch-none items-center gap-2 rounded-sm bg-background px-3.5 py-2.5 text-sm font-semibold text-foreground select-none active:cursor-grabbing"
                >
                  <TechIcon name={item} className="size-4" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setRound((r) => r + 1)}
        className="absolute right-3 bottom-3"
      >
        <RotateCcwIcon data-icon="inline-start" />
        {resetLabel}
      </Button>
    </div>
  )
}
