import type { CSSProperties, JSX } from "react"

/** Types for the vendored DriftWall.jsx; extra item fields come back in onSelect. */
export type DriftWallItem = { image: string; title?: string; [key: string]: unknown }

export type DriftWallProps<T extends DriftWallItem = DriftWallItem> = {
  items?: T[]
  columns?: number
  tileWidth?: number
  tileHeight?: number
  gap?: number
  radius?: number
  tilt?: number
  turn?: number
  roll?: number
  perspective?: number
  depth?: number
  speed?: number
  direction?: "up" | "down"
  variance?: number
  parallax?: number
  pauseOnHover?: boolean
  lift?: number
  fade?: number
  dim?: number
  grayscale?: boolean
  overlayColor?: string
  className?: string
  style?: CSSProperties
  onSelect?: (item: T) => void
}

declare function DriftWall<T extends DriftWallItem>(props: DriftWallProps<T>): JSX.Element
export default DriftWall
