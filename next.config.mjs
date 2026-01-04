import { fileURLToPath } from "url"
import { dirname } from "path"

const root = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Force Turbopack to treat this folder as the project root when multiple lockfiles exist
    root,
  },
}

export default nextConfig
