import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

// Static Archivo instances (SIL OFL), vendored so the build needs no font download.
const FONTS = join(process.cwd(), "src/assets/fonts")

/** Share card: the amber hang tag on map paper, with the route ridge behind it. */
export async function renderOgCard() {
  const [display, body] = await Promise.all([
    readFile(join(FONTS, "archivo-extracondensed-800.ttf")),
    readFile(join(FONTS, "archivo-500.ttf")),
  ])
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f3f6f3", position: "relative" }}>
        <svg viewBox="0 0 760 420" width="1200" height="663" style={{ position: "absolute", left: 0, bottom: -40 }}>
          <path
            d="M0 330 L70 318 L120 300 L170 270 L215 286 L265 236 L320 250 L375 190 L420 150 L455 96 L490 70 L525 112 L570 150 L615 196 L660 220 L710 248 L760 262 L760 420 L0 420 Z"
            fill="#e2eaee"
            stroke="#2f7fc1"
            strokeWidth="2"
          />
        </svg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
            margin: "96px 0 0 96px",
            padding: "44px 56px 52px",
            width: 690,
            background: "#f4b942",
            color: "#10202f",
            transform: "rotate(-2.5deg)",
            borderRadius: 6,
            boxShadow: "0 24px 48px -24px rgba(15, 30, 46, 0.45)",
            fontFamily: "Archivo",
          }}
        >
          <div style={{ fontFamily: "Archivo Display", fontSize: 128, lineHeight: 0.9, letterSpacing: -2 }}>
            Tiebe Vaes
          </div>
          <div style={{ fontSize: 40, marginTop: 24 }}>Full-stack developer</div>
          <div style={{ fontSize: 24, marginTop: 10 }}>TypeScript · React · Next.js · Java · Spring Boot</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Archivo Display", data: display, weight: 800, style: "normal" },
        { name: "Archivo", data: body, weight: 500, style: "normal" },
      ],
    },
  )
}
