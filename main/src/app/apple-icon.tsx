import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

// Same mountain mark as icon.svg, drawn full-bleed for iOS home screens.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f4b942" }}>
        <svg viewBox="0 0 32 32" width="180" height="180">
          <path d="M3 26 8.5 19.5 11.5 21.5 18 10 22 16.5 24.5 14.5 29 26Z" fill="#0f1e2e" />
          <path d="M18 10V3.5" stroke="#0f1e2e" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 3.5 23.5 5.4 18 7.3Z" fill="#e8f0f2" />
        </svg>
      </div>
    ),
    size,
  )
}
