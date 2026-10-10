"use client"

import dynamic from "next/dynamic"
import { useTheme } from "next-themes"

// WebGL (ogl) loads after the page; until then the plain ground of the page shows.
const Topography = dynamic(() => import("@/components/reactbits/Topography"), { ssr: false })

// Contour colours per theme, from low ground to the peaks (see the fjord tokens in globals.css).
const COLORS = {
  light: { lowColor: "#b4c5d2", midColor: "#7d9cb6", highColor: "#3d6d93", opacity: 0.5 },
  dark: { lowColor: "#1e3449", midColor: "#36536e", highColor: "#7096b6", opacity: 0.55 },
}

/** React Bits Topography as a fixed background behind the whole site. */
export function SiteBackground() {
  const { resolvedTheme } = useTheme()
  if (!resolvedTheme) return null
  const colors = COLORS[resolvedTheme === "dark" ? "dark" : "light"]

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <Topography
        {...colors}
        speed={0.35}
        morphAmount={3}
        morphSpeed={0.05}
        bands={2}
        thickness={0.01}
        scale={2}
        glow={0.5}
        colorMode="elevation"
        contrast={3}
        grain
        grainIntensity={0.05}
        mouseRadius={0.3}
        mouseStrength={0.4}
      />
    </div>
  )
}
