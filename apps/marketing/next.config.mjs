import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    // Set Turbopack root to workspace root so Next is resolvable in pnpm workspaces.
    root: path.resolve(__dirname, '../..'),
  },
 
}

export default nextConfig
