"use client"

import dynamic from "next/dynamic"

// WebGL (ogl) loads only on the client and only with this block; MicroSlats pauses itself off screen.
const MicroSlats = dynamic(() => import("@/components/reactbits/MicroSlats"), { ssr: false })

/**
 * The fjord at the end of the route: React Bits Micro Slats rolling along the bottom of the
 * amber contact block. The block is amber in both themes, so the colours are fixed.
 */
export function ContactSea({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <MicroSlats
        preset="swell"
        color="#1c2a3b"
        glintColor="#fff4d9"
        backgroundColor="transparent"
        slatWidth={8}
        slatHeight={20}
        gap={3}
        speed={0.45}
        fog={0.7}
        cursorSize={36}
      />
    </div>
  )
}
