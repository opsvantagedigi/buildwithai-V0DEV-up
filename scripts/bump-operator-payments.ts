#!/usr/bin/env ts-node

import fs from 'fs-extra'
import path from 'path'
import semverSort from 'semver-sort'

const versionArg = process.argv[2]
if (!versionArg) {
  console.error("Usage: pnpm bump:operator-payments v1.1.0")
  process.exit(1)
}
const version = versionArg.startsWith('v') ? versionArg : `v${versionArg}`

const repoRoot = process.cwd()
const base = path.join(repoRoot, 'apps/docs/pages/operator-payments')
const outputDir = path.join(base, version)

// Ensure base exists
if (!fs.existsSync(base)) {
  console.error(`Expected docs base at ${base} not found.`)
  process.exit(1)
}

// Detect previous version folder automatically: pick highest semver v* in base
const entries = fs.readdirSync(base, { withFileTypes: true })
const versionDirs = entries
  .filter(e => e.isDirectory() && /^v\d+\.\d+\.\d+$/.test(e.name))
  .map(e => e.name)

if (versionDirs.includes(version)) {
  console.error(`Version ${version} already exists at ${outputDir}.`)
  process.exit(1)
}

if (versionDirs.length === 0) {
  console.error(`No existing version directories found under ${base}. Please create v1.0.0 first.`)
  process.exit(1)
}

// semver-sort to find the latest; if unavailable, fallback to lexicographic highest
let prevVersion = versionDirs.sort((a, b) => {
  try {
    return semverSort.desc([a, b])[0] === a ? -1 : 1
  } catch {
    return a < b ? 1 : -1
  }
})[0]

// If semver-sort not installed or error, pick highest lexicographically
if (!prevVersion) {
  prevVersion = versionDirs[versionDirs.length - 1]
}

const prev = path.join(base, prevVersion)

try {
  fs.copySync(prev, outputDir, { overwrite: false, errorOnExist: true })
  console.log(`✔ Copied ${prevVersion} -> ${version}`)
} catch (err: any) {
  console.error('Error copying version folder:', err.message || err)
  process.exit(1)
}

// Update base _meta.json to include the new version
const metaPath = path.join(base, '_meta.json')
if (fs.existsSync(metaPath)) {
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'))
  // Add mapping if missing
  if (!meta[version]) {
    meta[version] = version
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2))
    console.log(`✔ Updated ${path.relative(repoRoot, metaPath)}`)
  } else {
    console.log(`- ${path.relative(repoRoot, metaPath)} already contains ${version}`)
  }
} else {
  console.warn(`Warning: ${metaPath} not found; skipping meta update.`)
}

// Update theme.config.tsx version switcher default value and banner text
const themePath = path.join(repoRoot, 'apps/docs/theme.config.tsx')
if (fs.existsSync(themePath)) {
  let theme = fs.readFileSync(themePath, 'utf8')

  // Replace defaultValue="/operator-payments/vX.Y.Z/handbook"
  theme = theme.replace(/defaultValue="[^"]+"/, `defaultValue="/operator-payments/${version}/handbook"`)

  // Replace the explicit current option if present; otherwise insert new option near the top select
  const optionRegex = /<option value="\/operator-payments\/v\d+\.\d+\.\d+\/handbook">[^<]+<\/option>/
  if (optionRegex.test(theme)) {
    theme = theme.replace(optionRegex, `<option value="/operator-payments/${version}/handbook">${version} (current)</option>`)
  } else {
    // Try inserting the new option into the select (best-effort)
    theme = theme.replace(
      /(<select[\s\S]*?>)/,
      `$1\n        <option value="/operator-payments/${version}/handbook">${version} (current)</option>\n`
    )
  }

  // Update banner key text if present (replace vX.Y.Z)
  theme = theme.replace(/Operator Payments Handbook v\d+\.\d+\.\d+/, `Operator Payments Handbook ${version}`)

  fs.writeFileSync(themePath, theme)
  console.log(`✔ Updated theme config at ${path.relative(repoRoot, themePath)}`)
} else {
  console.warn(`Warning: ${themePath} not found; skipping theme update.`)
}

console.log(`\nNext steps:\n  git add ${path.relative(repoRoot, outputDir)} ${path.relative(repoRoot, metaPath)} ${path.relative(repoRoot, themePath)}\n  git commit -m "docs: bump operator payments to ${version}"\n  git tag operator-payments-${version}\n  git push && git push --tags\n`)

console.log(`✔ Created Operator Payments docs version ${version}`)
