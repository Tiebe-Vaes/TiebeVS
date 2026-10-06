import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // A stray package-lock.json higher up (in the user folder) would otherwise be picked as the root.
  turbopack: { root: __dirname },
}

export default nextConfig
