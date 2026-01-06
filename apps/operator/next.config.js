/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    // In pnpm workspaces Next may be hoisted to the repo root.
    // Point Turbopack root to the workspace root so the `next` package is resolvable.
    root: path.resolve(__dirname, '../..'),
  },
}

module.exports = nextConfig
