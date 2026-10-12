// Pure maths for the hand-drawn figures: no React, so `node --test` runs it directly.

export type Point3 = [number, number, number]

const COS30 = Math.cos(Math.PI / 6)

/** Isometric projection into the 400×320 viewBox shared with the hairline figures; 1 world unit = 1 viewBox unit. */
export function iso(x: number, y: number, z: number): [number, number] {
  return [200 + (x - y) * COS30, 190 + (x + y) * 0.5 - z]
}

/** SVG `points` string for a polygon or polyline through these world points. */
export function pts(...points: Point3[]): string {
  return points
    .map((p) => iso(...p).map((n) => Math.round(n * 100) / 100).join(","))
    .join(" ")
}

/** The three faces of a cuboid that face the viewer (top, left = +y side, right = +x side). */
export function box(x: number, y: number, z: number, w: number, d: number, h: number) {
  const z1 = z + h
  return {
    top: pts([x, y, z1], [x + w, y, z1], [x + w, y + d, z1], [x, y + d, z1]),
    left: pts([x, y + d, z], [x + w, y + d, z], [x + w, y + d, z1], [x, y + d, z1]),
    right: pts([x + w, y, z], [x + w, y + d, z], [x + w, y + d, z1], [x + w, y, z1]),
  }
}

/**
 * An upright prism over a floor outline (counter-clockwise in x/y, seen from above): its top and
 * the side faces that turn towards the viewer (+x/+y), painted after anything behind them.
 */
export function prism(outline: [number, number][], z: number, h: number) {
  const sides: string[] = []
  outline.forEach(([x1, y1], i) => {
    const [x2, y2] = outline[(i + 1) % outline.length]
    // Outward normal of a counter-clockwise edge is (dy, −dx); the viewer looks along −(1, 1).
    if (y2 - y1 - (x2 - x1) > 1e-9) sides.push(pts([x1, y1, z], [x2, y2, z], [x2, y2, z + h], [x1, y1, z + h]))
  })
  return { top: pts(...outline.map(([x, y]): Point3 => [x, y, z + h])), sides }
}

/** Rotate floor points about (cx, cy) by `deg`, counter-clockwise seen from above. */
export function turn(points: [number, number][], deg: number, cx: number, cy: number): [number, number][] {
  const r = (deg * Math.PI) / 180
  return points.map(([x, y]) => [
    cx + (x - cx) * Math.cos(r) - (y - cy) * Math.sin(r),
    cy + (x - cx) * Math.sin(r) + (y - cy) * Math.cos(r),
  ])
}

const DIGITS = ["abcdef", "bc", "abdeg", "abcdg", "bcfg", "acdfg", "acdefg", "abc", "abcdefg", "abcdfg"]

/** Lit segments of a seven-segment digit (a top, b top right, c bottom right, d bottom, e bottom left, f top left, g middle). */
export function digitSegments(digit: number): string {
  return DIGITS[digit]
}

export function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n))
}

const STIFFNESS = 170
const DAMPING = 26

/** One semi-implicit Euler step of a near-critically damped spring. */
export function springStep(value: number, velocity: number, target: number, dt: number): [number, number] {
  const v = velocity + (STIFFNESS * (target - value) - DAMPING * velocity) * dt
  return [value + v * dt, v]
}

export function isSettled(value: number, velocity: number, target: number): boolean {
  return Math.abs(value - target) < 0.001 && Math.abs(velocity) < 0.001
}

const MINUS = "−"

export function gateReadout(v: number): string {
  if (v <= 0.02) return "gate up"
  if (v >= 0.98) return "gate down · 8 lanes"
  return `gate ${Math.round(v * 90)}°`
}

export function pourReadout(v: number): string {
  return `pour ${Math.round(clamp01(v) * 100)}%`
}

export const COUNTDOWN_DAYS = 42

export function countdownDays(v: number): number {
  return Math.round(COUNTDOWN_DAYS * (1 - clamp01(v)))
}

export function countdownReadout(v: number): string {
  return `T${MINUS}${countdownDays(v)}d`
}

/** Steering angle in degrees, −30 to +30, for a pointer value 0..1. */
export function steerAngle(v: number): number {
  return Math.round((clamp01(v) - 0.5) * 60)
}

export function steerReadout(v: number): string {
  const deg = steerAngle(v)
  if (deg === 0) return "steer 0°"
  return `steer ${deg > 0 ? "+" : MINUS}${Math.abs(deg)}°`
}

export function lendReadout(v: number): string {
  return v < 0.5 ? "at home" : "lent out"
}
