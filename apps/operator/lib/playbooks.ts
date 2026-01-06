import type { Diagnosis, IncidentPattern, Playbook } from "@/lib/types"

const playbooks: Playbook[] = [
  {
    id: "pb-api-500",
    name: "API 500 investigation",
    description: "Systematic workflow for HTTP 500 or unhandled exceptions in APIs.",
    triggers: { diagnosisSummaryContains: "500" },
    steps: [
      { order: 1, description: "Capture recent error logs and stack traces" },
      { order: 2, description: "Check recent deploys or config changes affecting the API" },
      { order: 3, description: "Replay failing request in staging with feature flags aligned" },
      { order: 4, description: "Verify error handling, timeouts, and retries for upstream calls" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "pb-latency",
    name: "Latency spike in API",
    description: "Steps to triage sudden latency increases.",
    triggers: { diagnosisSummaryContains: "latency" },
    steps: [
      { order: 1, description: "Check p95/p99 latency and correlate with traffic changes" },
      { order: 2, description: "Inspect dependency health (DB, cache, upstream services)" },
      { order: 3, description: "Validate connection pooling, timeouts, and retry/backoff policies" },
      { order: 4, description: "Profile hotspots or heavy queries; consider temporary scaling" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "pb-uptime",
    name: "Uptime degradation",
    description: "Checklist for recurring uptime/health check failures.",
    triggers: { diagnosisSummaryContains: "uptime" },
    steps: [
      { order: 1, description: "Validate health check endpoints and dependency reachability" },
      { order: 2, description: "Review autoscaling events and resource saturation" },
      { order: 3, description: "Check rollout/rollback status and partial deploys" },
      { order: 4, description: "Set temporary circuit breakers or traffic shaping if needed" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "pb-content-integrity",
    name: "Content integrity checks",
    description: "Steps for content mismatch or schema drift incidents.",
    triggers: { diagnosisSummaryContains: "content" },
    steps: [
      { order: 1, description: "Compare payload/schema versions across services" },
      { order: 2, description: "Validate cache invalidation and propagation" },
      { order: 3, description: "Replay affected content through staging to reproduce" },
      { order: 4, description: "Add temporary guards for malformed inputs" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export function listPlaybooks(): Playbook[] {
  return [...playbooks]
}

function includes(haystack: string | undefined, needle: string | undefined) {
  if (!haystack || !needle) return false
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

export function matchPlaybooksForDiagnosis(diag: Diagnosis): Playbook[] {
  return playbooks.filter((pb) => includes(diag.summary, pb.triggers?.diagnosisSummaryContains ?? ""))
}

export function matchPlaybooksForPattern(pattern: IncidentPattern): Playbook[] {
  return playbooks.filter((pb) => includes(pattern.key, pb.triggers?.patternKey ?? "") || includes(pattern.key, pb.triggers?.diagnosisSummaryContains ?? ""))
}
