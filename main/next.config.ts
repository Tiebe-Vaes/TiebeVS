import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // A stray package-lock.json higher up (in the user folder) would otherwise be picked as the root.
  turbopack: { root: __dirname },
  // No Next.js dev indicator badge in the corner.
  devIndicators: false,
}

export default nextConfig
