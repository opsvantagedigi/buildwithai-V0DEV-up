import { recordIncident } from "@/lib/intel"
import { upsertKnowledgeArticle } from "@/lib/knowledge"
import type {
  AutonomySimulation,
  EarlyWarning,
  FixStrategyScore,
  ForesightPrediction,
  IncidentRecord,
  KnowledgeArticle,
  KnowledgeRecommendation,
  PrimeBriefing,
  PrimeCognitionBundle,
  ReliabilityForecast,
} from "@/lib/types"

let seeded = false

const seededWarnings: EarlyWarning[] = []
const seededPredictions: ForesightPrediction[] = []
let seededCognition: PrimeCognitionBundle | null = null
let seededAutonomySimulations: AutonomySimulation[] = []
let seededStrategyScores: FixStrategyScore[] = []
let seededReliabilityForecast: ReliabilityForecast | null = null
let seededPrimeBriefing: PrimeBriefing | null = null
const seededKnowledgeArticles: KnowledgeArticle[] = []
const seededRecs: KnowledgeRecommendation[] = []

const baseTime = Date.now()
const dayMs = 24 * 60 * 60 * 1000
const hourMs = 60 * 60 * 1000

function isDev() {
  return process.env.NODE_ENV === "development"
}

function iso(daysAgo: number, hourOffset = 0) {
  return new Date(baseTime - daysAgo * dayMs - hourOffset * hourMs).toISOString()
}

export function seedIncidents() {
  if (!isDev()) return
  const incidents: IncidentRecord[] = [
    {
      id: "seed-inc-001",
      timestamp: iso(1, 2),
      source: "/api/checkout",
      summary: "API 500 spike on checkout",
      severity: "error",
      risk: "medium",
      actionType: "fix-applied",
      tags: ["api", "checkout", "500"],
    },
    {
      id: "seed-inc-002",
      timestamp: iso(2, 4),
      source: "/api/payments",
      summary: "Payment gateway timeout",
      severity: "warning",
      risk: "medium",
      actionType: "approval-required",
      tags: ["payments", "timeout"],
    },
    {
      id: "seed-inc-003",
      timestamp: iso(3, 3),
      source: "worker-billing",
      summary: "Billing worker retry storm",
      severity: "error",
      risk: "high",
      actionType: "fix-failed",
      proposalId: "prop-billing-throttle",
      tags: ["billing", "queue", "retries"],
    },
    {
      id: "seed-inc-004",
      timestamp: iso(4, 5),
      source: "edge-cache",
      summary: "Cache miss storm",
      severity: "warning",
      risk: "low",
      actionType: "fix-applied",
      proposalId: "prop-cache-warm",
      tags: ["cache", "latency"],
    },
    {
      id: "seed-inc-005",
      timestamp: iso(5, 1),
      source: "/api/catalog",
      summary: "Catalog schema drift detected",
      severity: "critical",
      risk: "high",
      actionType: "fix-failed",
      proposalId: "prop-catalog-rollback",
      tags: ["schema", "catalog"],
    },
  ]

  incidents.forEach((inc) => recordIncident(inc))
}

export function seedPatterns() {
  if (!isDev()) return
  const patternIncidents: IncidentRecord[] = [
    {
      id: "seed-inc-006",
      timestamp: iso(1, 6),
      source: "/api/checkout",
      summary: "API 500 spike on checkout",
      severity: "error",
      risk: "medium",
      actionType: "fix-failed",
      proposalId: "prop-checkout-circuit",
      tags: ["api", "checkout", "500"],
    },
    {
      id: "seed-inc-007",
      timestamp: iso(2, 2),
      source: "edge-cache",
      summary: "Cache miss storm",
      severity: "warning",
      risk: "medium",
      actionType: "fix-applied",
      proposalId: "prop-cache-warm",
      tags: ["cache", "latency"],
    },
    {
      id: "seed-inc-008",
      timestamp: iso(3, 6),
      source: "worker-billing",
      summary: "Billing worker retry storm",
      severity: "error",
      risk: "medium",
      actionType: "rollback-executed",
      proposalId: "prop-billing-throttle",
      tags: ["billing", "queue"],
    },
  ]

  patternIncidents.forEach((inc) => recordIncident(inc))
}

export function seedFixes() {
  if (!isDev()) return
  const fixes: IncidentRecord[] = [
    {
      id: "seed-fix-001",
      timestamp: iso(0, 4),
      source: "worker-billing",
      summary: "Billing worker retry storm",
      severity: "warning",
      risk: "medium",
      actionType: "fix-applied",
      proposalId: "prop-billing-throttle",
      tags: ["billing", "stability"],
    },
    {
      id: "seed-fix-002",
      timestamp: iso(1, 1),
      source: "edge-cache",
      summary: "Cache miss storm",
      severity: "info",
      risk: "low",
      actionType: "fix-applied",
      proposalId: "prop-cache-warm",
      tags: ["cache", "warmup"],
    },
    {
      id: "seed-fix-003",
      timestamp: iso(2, 0),
      source: "/api/catalog",
      summary: "Catalog schema drift detected",
      severity: "warning",
      risk: "medium",
      actionType: "fix-applied",
      proposalId: "prop-catalog-rollback",
      tags: ["schema", "catalog"],
    },
  ]

  fixes.forEach((fix) => recordIncident(fix))
}

export function seedRollbacks() {
  if (!isDev()) return
  const rollbacks: IncidentRecord[] = [
    {
      id: "seed-rb-001",
      timestamp: iso(1, 5),
      source: "worker-billing",
      summary: "Billing worker retry storm",
      severity: "error",
      risk: "high",
      actionType: "rollback-executed",
      rollbackId: "rb-billing-queue",
      proposalId: "prop-billing-throttle",
      tags: ["billing", "rollback"],
    },
    {
      id: "seed-rb-002",
      timestamp: iso(2, 3),
      source: "/api/checkout",
      summary: "API 500 spike on checkout",
      severity: "error",
      risk: "high",
      actionType: "rollback-executed",
      rollbackId: "rb-checkout-circuit",
      proposalId: "prop-checkout-circuit",
      tags: ["checkout", "rollback"],
    },
    {
      id: "seed-rb-003",
      timestamp: iso(3, 1),
      source: "/api/catalog",
      summary: "Catalog schema drift detected",
      severity: "critical",
      risk: "high",
      actionType: "rollback-executed",
      rollbackId: "rb-catalog-schema",
      proposalId: "prop-catalog-rollback",
      tags: ["schema", "rollback"],
    },
  ]

  rollbacks.forEach((rb) => recordIncident(rb))
}

export function seedEarlyWarnings() {
  if (!isDev()) return
  seededWarnings.splice(0, seededWarnings.length, 
    {
      id: "warn-checkout-hotspot",
      title: "Checkout API instability",
      severity: "high",
      rationale: "Multiple HTTP 500 events in checkout within 72 hours.",
      actions: ["Hold new rollouts", "Run checkout circuit test", "Pre-warm cache for checkout flows"],
      window: "immediate",
      source: "foresight",
    },
    {
      id: "warn-billing-retries",
      title: "Billing worker retry surge",
      severity: "medium",
      rationale: "Retry volume trending up in billing worker queue.",
      actions: ["Enable rate limits", "Add jitter to retries", "Inspect dead-letter queue"],
      window: "short-term",
      source: "foresight",
    },
    {
      id: "warn-catalog-schema",
      title: "Catalog schema drift risk",
      severity: "medium",
      rationale: "Schema drift detected on catalog service; rollbacks triggered previously.",
      actions: ["Lock schema migrations", "Verify downstream consumers", "Capture snapshots before deploy"],
      window: "mid-term",
      source: "foresight",
    },
  )
}

export function seedForesightPredictions() {
  if (!isDev()) return
  seededPredictions.splice(0, seededPredictions.length,
    {
      id: "pred-checkout-latency",
      likelihood: 0.32,
      impact: "medium",
      summary: "Checkout latency may spike during peak due to cache churn.",
      drivers: ["Edge cache misses", "Recent 500s on checkout"],
      horizon: "short",
    },
    {
      id: "pred-billing-rollback",
      likelihood: 0.28,
      impact: "high",
      summary: "Billing worker may need rollback if retry storm persists.",
      drivers: ["Queue depth growth", "Recent rollback in billing"],
      horizon: "short",
    },
    {
      id: "pred-catalog-drift",
      likelihood: 0.22,
      impact: "medium",
      summary: "Catalog schema drift likely if upcoming deploy proceeds without validation.",
      drivers: ["Recent schema rollback", "Missing contract tests"],
      horizon: "mid",
    },
  )
}

export function seedCognitionBundle() {
  if (!isDev()) return
  seededCognition = {
    confidences: [
      { target: "diagnosis", score: 0.86, rationale: "Recent fixes succeeded after circuit breakers." },
      { target: "prediction", score: 0.78, rationale: "Incident volume contained; forecast tempered." },
      { target: "warning", score: 0.82, rationale: "Checkout hotspot remains active." },
    ],
    rationales: [
      {
        summary: "Pattern stability improving",
        factors: ["Checkout errors reduced", "Cache warmup working", "Billing retries still monitored"],
      },
    ],
    traces: [
      {
        steps: ["Ingest incidents", "Rank patterns", "Adjust for recent rollbacks"],
        conclusion: "Confidence anchored by reduced failure rate and active guardrails",
      },
    ],
    drift: {
      status: "watch",
      indicators: ["Tenant mix stable", "Checkout path still noisy"],
      driftScore: 0.28,
    },
    stability: {
      score: 0.81,
      factors: ["Guardrails active", "Rollbacks succeeded", "Cache hit-rate recovering"],
    },
  }
}

export function seedAutonomySimulations() {
  if (!isDev()) return
  seededAutonomySimulations = [
    {
      id: "sim-checkout-circuit",
      description: "Dry-run checkout circuit breaker with staged rollout",
      risk: "medium",
      outcome: "pass",
      steps: ["Detect 500 spike", "Trip circuit", "Validate fallback"],
      approvalsNeeded: 1,
    },
    {
      id: "sim-billing-throttle",
      description: "Throttle billing worker retries during queue surge",
      risk: "medium",
      outcome: "pass",
      steps: ["Measure queue depth", "Apply jitter", "Verify DLQ volume"],
      approvalsNeeded: 1,
    },
    {
      id: "sim-catalog-rollback",
      description: "Rollback catalog migration with snapshot restore",
      risk: "high",
      outcome: "pass",
      steps: ["Capture snapshot", "Run rollback", "Verify contract tests"],
      approvalsNeeded: 2,
    },
  ]

  seededStrategyScores = [
    { strategy: "rollback-first", score: 0.74, rationale: "Fastest containment for catalog drift." },
    { strategy: "retry-then-rollback", score: 0.69, rationale: "Balances billing retry risk." },
    { strategy: "bluegreen-shift", score: 0.72, rationale: "Gradual checkout release keeps blast radius low." },
  ]

  seededReliabilityForecast = {
    score: 0.84,
    horizon: "short",
    rationale: ["Recent rollbacks succeeded", "Cache warmup stabilized latency", "Billing retries trending down"],
  }
}

export function seedPrimeBriefing() {
  if (!isDev()) return
  seededPrimeBriefing = {
    headline: "Prime reliability briefing",
    highlights: [
      "Reliability score holding at 92",
      "Checkout hotspot contained by circuit breaker",
      "Catalog schema guarded by rollback plan",
    ],
    reliabilityScore: 92,
  }
}

export function seedKnowledgeGraph() {
  if (!isDev()) return
  const articles: KnowledgeArticle[] = [
    {
      id: "ka-cache-warmup",
      title: "Edge cache warmup play",
      summary: "Warm cache on deploy to avoid early latency spikes for checkout and catalog.",
      relatedDiagnosisIds: [],
      relatedProposalIds: ["prop-cache-warm"],
      relatedPatternKeys: ["Cache miss storm"],
      createdAt: iso(2),
      updatedAt: iso(1),
      source: "operator",
      tags: ["cache", "latency"],
      body: "Pre-warm critical paths, validate hit-rate, monitor 95th percentile latency post-release.",
    },
    {
      id: "ka-billing-retries",
      title: "Billing retry control",
      summary: "Throttle billing worker retries to prevent queue storms and DLQ growth.",
      relatedDiagnosisIds: [],
      relatedProposalIds: ["prop-billing-throttle"],
      relatedPatternKeys: ["Billing worker retry storm"],
      createdAt: iso(3),
      updatedAt: iso(1),
      source: "operator",
      tags: ["billing", "queues"],
      body: "Add jitter, cap retries, and watch DLQ signal during incident windows.",
    },
    {
      id: "ka-catalog-schema",
      title: "Catalog schema rollback SOP",
      summary: "Steps to revert catalog migrations safely with snapshot restores.",
      relatedDiagnosisIds: [],
      relatedProposalIds: ["prop-catalog-rollback"],
      relatedPatternKeys: ["Catalog schema drift detected"],
      createdAt: iso(4),
      updatedAt: iso(2),
      source: "operator",
      tags: ["schema", "rollback"],
      body: "Capture snapshot, run down migration, validate contracts, and verify search/indexers.",
    },
  ]

  articles.forEach((article) => {
    seededKnowledgeArticles.push(article)
    upsertKnowledgeArticle(article)
  })
}

export function seedRecommendations() {
  if (!isDev()) return
  seededRecs.splice(0, seededRecs.length,
    {
      title: "Stabilize checkout path",
      summary: "Pair checkout with circuit breaker tests before next release.",
      actions: ["Run checkout rollback simulation", "Pre-warm cache for checkout", "Shadow traffic new release"],
    },
    {
      title: "Tame billing retries",
      summary: "Keep billing queue healthy by capping retries and inspecting DLQ daily.",
      actions: ["Add jitter to retries", "Alert on DLQ growth", "Validate idempotency keys"],
    },
    {
      title: "Guard catalog schema",
      summary: "Require snapshot and contract tests before schema deploys.",
      actions: ["Capture pre-deploy snapshot", "Run consumer contract suite", "Stage rollout with blue/green"],
    },
  )
}

export function runPrimeSeeder(): void {
  if (!isDev() || seeded) return

  seedIncidents()
  seedPatterns()
  seedFixes()
  seedRollbacks()
  seedEarlyWarnings()
  seedForesightPredictions()
  seedCognitionBundle()
  seedAutonomySimulations()
  seedPrimeBriefing()
  seedKnowledgeGraph()
  seedRecommendations()

  seeded = true
}

export function getSeededWarnings() {
  return seededWarnings
}

export function getSeededPredictions() {
  return seededPredictions
}

export function getSeededCognition() {
  return seededCognition
}

export function getSeededAutonomy() {
  return {
    autonomySimulations: seededAutonomySimulations,
    strategyScores: seededStrategyScores,
    reliabilityForecast: seededReliabilityForecast,
  }
}

export function getSeededPrimeBriefing() {
  return seededPrimeBriefing
}

export function getSeededRecommendations() {
  return seededRecs
}

export function getSeededKnowledgeArticles() {
  return seededKnowledgeArticles
}
