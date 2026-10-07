import { renderOgCard } from "@/components/site/og-card"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Tiebe Vaes · Full-stack developer"

export default function Image() {
  return renderOgCard()
}
