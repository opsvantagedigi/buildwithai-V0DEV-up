module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/audit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterLogs",
    ()=>filterLogs,
    "listLogs",
    ()=>listLogs,
    "logAction",
    ()=>logAction
]);
const auditLog = [];
function makeId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
function logAction(entry) {
    const next = {
        ...entry,
        id: makeId("audit"),
        timestamp: new Date().toISOString()
    };
    auditLog.push(next);
    return next;
}
function listLogs() {
    return [
        ...auditLog
    ].sort((a, b)=>a.timestamp > b.timestamp ? -1 : 1);
}
function filterLogs(options = {}) {
    return listLogs().filter((log)=>{
        if (options.risk && log.risk !== options.risk) return false;
        if (options.actionType && log.actionType !== options.actionType) return false;
        return true;
    });
}
}),
"[project]/lib/knowledge.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateKnowledgeFromPatterns",
    ()=>generateKnowledgeFromPatterns,
    "getKnowledgeArticle",
    ()=>getKnowledgeArticle,
    "listKnowledgeArticles",
    ()=>listKnowledgeArticles,
    "upsertKnowledgeArticle",
    ()=>upsertKnowledgeArticle
]);
const knowledgeStore = [];
function makeId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
function listKnowledgeArticles(limit) {
    return typeof limit === "number" ? knowledgeStore.slice(0, limit) : [
        ...knowledgeStore
    ];
}
function getKnowledgeArticle(id) {
    return knowledgeStore.find((a)=>a.id === id);
}
function upsertKnowledgeArticle(article) {
    const idx = knowledgeStore.findIndex((a)=>a.id === article.id);
    if (idx >= 0) {
        knowledgeStore[idx] = {
            ...knowledgeStore[idx],
            ...article,
            updatedAt: article.updatedAt
        };
        return knowledgeStore[idx];
    }
    knowledgeStore.unshift(article);
    return article;
}
function generateKnowledgeFromPatterns(patterns) {
    const generated = patterns.map((p)=>{
        const id = `auto-${p.tenantId ?? "global"}-${p.siteId ?? "global"}-${p.type}-${p.key}`;
        const summary = `Recurring issue observed ${p.occurrences} time${p.occurrences === 1 ? "" : "s"}: ${p.key}.`;
        const body = [
            `Pattern: ${p.key}`,
            `Occurrences: ${p.occurrences}`,
            p.successCount ? `Successful remediations: ${p.successCount}` : "",
            p.failureCount ? `Failed remediation attempts: ${p.failureCount}` : "",
            p.rollbackCount ? `Rollbacks executed: ${p.rollbackCount}` : ""
        ].filter(Boolean).join("\n");
        const article = {
            id,
            title: `Recurring issue: ${p.key}`,
            summary,
            relatedDiagnosisIds: p.relatedDiagnosisIds,
            relatedProposalIds: p.relatedProposalIds,
            relatedPatternKeys: [
                p.key
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            source: "operator",
            tags: [
                p.type
            ],
            body,
            tenantId: p.tenantId,
            siteId: p.siteId
        };
        return article;
    });
    generated.forEach((article)=>{
        const existing = getKnowledgeArticle(article.id);
        if (!existing) {
            upsertKnowledgeArticle(article);
        }
    });
    return generated;
}
}),
"[project]/lib/dev-seeder.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSeededAutonomy",
    ()=>getSeededAutonomy,
    "getSeededCognition",
    ()=>getSeededCognition,
    "getSeededKnowledgeArticles",
    ()=>getSeededKnowledgeArticles,
    "getSeededPredictions",
    ()=>getSeededPredictions,
    "getSeededPrimeBriefing",
    ()=>getSeededPrimeBriefing,
    "getSeededRecommendations",
    ()=>getSeededRecommendations,
    "getSeededWarnings",
    ()=>getSeededWarnings,
    "runPrimeSeeder",
    ()=>runPrimeSeeder,
    "seedAutonomySimulations",
    ()=>seedAutonomySimulations,
    "seedCognitionBundle",
    ()=>seedCognitionBundle,
    "seedEarlyWarnings",
    ()=>seedEarlyWarnings,
    "seedFixes",
    ()=>seedFixes,
    "seedForesightPredictions",
    ()=>seedForesightPredictions,
    "seedIncidents",
    ()=>seedIncidents,
    "seedKnowledgeGraph",
    ()=>seedKnowledgeGraph,
    "seedPatterns",
    ()=>seedPatterns,
    "seedPrimeBriefing",
    ()=>seedPrimeBriefing,
    "seedRecommendations",
    ()=>seedRecommendations,
    "seedRollbacks",
    ()=>seedRollbacks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intel.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$knowledge$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/knowledge.ts [app-route] (ecmascript)");
;
;
let seeded = false;
const seededWarnings = [];
const seededPredictions = [];
let seededCognition = null;
let seededAutonomySimulations = [];
let seededStrategyScores = [];
let seededReliabilityForecast = null;
let seededPrimeBriefing = null;
const seededKnowledgeArticles = [];
const seededRecs = [];
const baseTime = Date.now();
const dayMs = 24 * 60 * 60 * 1000;
const hourMs = 60 * 60 * 1000;
function isDev() {
    return ("TURBOPACK compile-time value", "development") === "development";
}
function iso(daysAgo, hourOffset = 0) {
    return new Date(baseTime - daysAgo * dayMs - hourOffset * hourMs).toISOString();
}
function seedIncidents() {
    if (!isDev()) //TURBOPACK unreachable
    ;
    const incidents = [
        {
            id: "seed-inc-001",
            timestamp: iso(1, 2),
            source: "/api/checkout",
            summary: "API 500 spike on checkout",
            severity: "error",
            risk: "medium",
            actionType: "fix-applied",
            tags: [
                "api",
                "checkout",
                "500"
            ]
        },
        {
            id: "seed-inc-002",
            timestamp: iso(2, 4),
            source: "/api/payments",
            summary: "Payment gateway timeout",
            severity: "warning",
            risk: "medium",
            actionType: "approval-required",
            tags: [
                "payments",
                "timeout"
            ]
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
            tags: [
                "billing",
                "queue",
                "retries"
            ]
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
            tags: [
                "cache",
                "latency"
            ]
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
            tags: [
                "schema",
                "catalog"
            ]
        }
    ];
    incidents.forEach((inc)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordIncident"])(inc));
}
function seedPatterns() {
    if (!isDev()) //TURBOPACK unreachable
    ;
    const patternIncidents = [
        {
            id: "seed-inc-006",
            timestamp: iso(1, 6),
            source: "/api/checkout",
            summary: "API 500 spike on checkout",
            severity: "error",
            risk: "medium",
            actionType: "fix-failed",
            proposalId: "prop-checkout-circuit",
            tags: [
                "api",
                "checkout",
                "500"
            ]
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
            tags: [
                "cache",
                "latency"
            ]
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
            tags: [
                "billing",
                "queue"
            ]
        }
    ];
    patternIncidents.forEach((inc)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordIncident"])(inc));
}
function seedFixes() {
    if (!isDev()) //TURBOPACK unreachable
    ;
    const fixes = [
        {
            id: "seed-fix-001",
            timestamp: iso(0, 4),
            source: "worker-billing",
            summary: "Billing worker retry storm",
            severity: "warning",
            risk: "medium",
            actionType: "fix-applied",
            proposalId: "prop-billing-throttle",
            tags: [
                "billing",
                "stability"
            ]
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
            tags: [
                "cache",
                "warmup"
            ]
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
            tags: [
                "schema",
                "catalog"
            ]
        }
    ];
    fixes.forEach((fix)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordIncident"])(fix));
}
function seedRollbacks() {
    if (!isDev()) //TURBOPACK unreachable
    ;
    const rollbacks = [
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
            tags: [
                "billing",
                "rollback"
            ]
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
            tags: [
                "checkout",
                "rollback"
            ]
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
            tags: [
                "schema",
                "rollback"
            ]
        }
    ];
    rollbacks.forEach((rb)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordIncident"])(rb));
}
function seedEarlyWarnings() {
    if (!isDev()) //TURBOPACK unreachable
    ;
    seededWarnings.splice(0, seededWarnings.length, {
        id: "warn-checkout-hotspot",
        title: "Checkout API instability",
        severity: "high",
        rationale: "Multiple HTTP 500 events in checkout within 72 hours.",
        actions: [
            "Hold new rollouts",
            "Run checkout circuit test",
            "Pre-warm cache for checkout flows"
        ],
        window: "immediate",
        source: "foresight"
    }, {
        id: "warn-billing-retries",
        title: "Billing worker retry surge",
        severity: "medium",
        rationale: "Retry volume trending up in billing worker queue.",
        actions: [
            "Enable rate limits",
            "Add jitter to retries",
            "Inspect dead-letter queue"
        ],
        window: "short-term",
        source: "foresight"
    }, {
        id: "warn-catalog-schema",
        title: "Catalog schema drift risk",
        severity: "medium",
        rationale: "Schema drift detected on catalog service; rollbacks triggered previously.",
        actions: [
            "Lock schema migrations",
            "Verify downstream consumers",
            "Capture snapshots before deploy"
        ],
        window: "mid-term",
        source: "foresight"
    });
}
function seedForesightPredictions() {
    if (!isDev()) //TURBOPACK unreachable
    ;
    seededPredictions.splice(0, seededPredictions.length, {
        id: "pred-checkout-latency",
        likelihood: 0.32,
        impact: "medium",
        summary: "Checkout latency may spike during peak due to cache churn.",
        drivers: [
            "Edge cache misses",
            "Recent 500s on checkout"
        ],
        horizon: "short"
    }, {
        id: "pred-billing-rollback",
        likelihood: 0.28,
        impact: "high",
        summary: "Billing worker may need rollback if retry storm persists.",
        drivers: [
            "Queue depth growth",
            "Recent rollback in billing"
        ],
        horizon: "short"
    }, {
        id: "pred-catalog-drift",
        likelihood: 0.22,
        impact: "medium",
        summary: "Catalog schema drift likely if upcoming deploy proceeds without validation.",
        drivers: [
            "Recent schema rollback",
            "Missing contract tests"
        ],
        horizon: "mid"
    });
}
function seedCognitionBundle() {
    if (!isDev()) //TURBOPACK unreachable
    ;
    seededCognition = {
        confidences: [
            {
                target: "diagnosis",
                score: 0.86,
                rationale: "Recent fixes succeeded after circuit breakers."
            },
            {
                target: "prediction",
                score: 0.78,
                rationale: "Incident volume contained; forecast tempered."
            },
            {
                target: "warning",
                score: 0.82,
                rationale: "Checkout hotspot remains active."
            }
        ],
        rationales: [
            {
                summary: "Pattern stability improving",
                factors: [
                    "Checkout errors reduced",
                    "Cache warmup working",
                    "Billing retries still monitored"
                ]
            }
        ],
        traces: [
            {
                steps: [
                    "Ingest incidents",
                    "Rank patterns",
                    "Adjust for recent rollbacks"
                ],
                conclusion: "Confidence anchored by reduced failure rate and active guardrails"
            }
        ],
        drift: {
            status: "watch",
            indicators: [
                "Tenant mix stable",
                "Checkout path still noisy"
            ],
            driftScore: 0.28
        },
        stability: {
            score: 0.81,
            factors: [
                "Guardrails active",
                "Rollbacks succeeded",
                "Cache hit-rate recovering"
            ]
        }
    };
}
function seedAutonomySimulations() {
    if (!isDev()) //TURBOPACK unreachable
    ;
    seededAutonomySimulations = [
        {
            id: "sim-checkout-circuit",
            description: "Dry-run checkout circuit breaker with staged rollout",
            risk: "medium",
            outcome: "pass",
            steps: [
                "Detect 500 spike",
                "Trip circuit",
                "Validate fallback"
            ],
            approvalsNeeded: 1
        },
        {
            id: "sim-billing-throttle",
            description: "Throttle billing worker retries during queue surge",
            risk: "medium",
            outcome: "pass",
            steps: [
                "Measure queue depth",
                "Apply jitter",
                "Verify DLQ volume"
            ],
            approvalsNeeded: 1
        },
        {
            id: "sim-catalog-rollback",
            description: "Rollback catalog migration with snapshot restore",
            risk: "high",
            outcome: "pass",
            steps: [
                "Capture snapshot",
                "Run rollback",
                "Verify contract tests"
            ],
            approvalsNeeded: 2
        }
    ];
    seededStrategyScores = [
        {
            strategy: "rollback-first",
            score: 0.74,
            rationale: "Fastest containment for catalog drift."
        },
        {
            strategy: "retry-then-rollback",
            score: 0.69,
            rationale: "Balances billing retry risk."
        },
        {
            strategy: "bluegreen-shift",
            score: 0.72,
            rationale: "Gradual checkout release keeps blast radius low."
        }
    ];
    seededReliabilityForecast = {
        score: 0.84,
        horizon: "short",
        rationale: [
            "Recent rollbacks succeeded",
            "Cache warmup stabilized latency",
            "Billing retries trending down"
        ]
    };
}
function seedPrimeBriefing() {
    if (!isDev()) //TURBOPACK unreachable
    ;
    seededPrimeBriefing = {
        headline: "Prime reliability briefing",
        highlights: [
            "Reliability score holding at 92",
            "Checkout hotspot contained by circuit breaker",
            "Catalog schema guarded by rollback plan"
        ],
        reliabilityScore: 92
    };
}
function seedKnowledgeGraph() {
    if (!isDev()) //TURBOPACK unreachable
    ;
    const articles = [
        {
            id: "ka-cache-warmup",
            title: "Edge cache warmup play",
            summary: "Warm cache on deploy to avoid early latency spikes for checkout and catalog.",
            relatedDiagnosisIds: [],
            relatedProposalIds: [
                "prop-cache-warm"
            ],
            relatedPatternKeys: [
                "Cache miss storm"
            ],
            createdAt: iso(2),
            updatedAt: iso(1),
            source: "operator",
            tags: [
                "cache",
                "latency"
            ],
            body: "Pre-warm critical paths, validate hit-rate, monitor 95th percentile latency post-release."
        },
        {
            id: "ka-billing-retries",
            title: "Billing retry control",
            summary: "Throttle billing worker retries to prevent queue storms and DLQ growth.",
            relatedDiagnosisIds: [],
            relatedProposalIds: [
                "prop-billing-throttle"
            ],
            relatedPatternKeys: [
                "Billing worker retry storm"
            ],
            createdAt: iso(3),
            updatedAt: iso(1),
            source: "operator",
            tags: [
                "billing",
                "queues"
            ],
            body: "Add jitter, cap retries, and watch DLQ signal during incident windows."
        },
        {
            id: "ka-catalog-schema",
            title: "Catalog schema rollback SOP",
            summary: "Steps to revert catalog migrations safely with snapshot restores.",
            relatedDiagnosisIds: [],
            relatedProposalIds: [
                "prop-catalog-rollback"
            ],
            relatedPatternKeys: [
                "Catalog schema drift detected"
            ],
            createdAt: iso(4),
            updatedAt: iso(2),
            source: "operator",
            tags: [
                "schema",
                "rollback"
            ],
            body: "Capture snapshot, run down migration, validate contracts, and verify search/indexers."
        }
    ];
    articles.forEach((article)=>{
        seededKnowledgeArticles.push(article);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$knowledge$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertKnowledgeArticle"])(article);
    });
}
function seedRecommendations() {
    if (!isDev()) //TURBOPACK unreachable
    ;
    seededRecs.splice(0, seededRecs.length, {
        title: "Stabilize checkout path",
        summary: "Pair checkout with circuit breaker tests before next release.",
        actions: [
            "Run checkout rollback simulation",
            "Pre-warm cache for checkout",
            "Shadow traffic new release"
        ]
    }, {
        title: "Tame billing retries",
        summary: "Keep billing queue healthy by capping retries and inspecting DLQ daily.",
        actions: [
            "Add jitter to retries",
            "Alert on DLQ growth",
            "Validate idempotency keys"
        ]
    }, {
        title: "Guard catalog schema",
        summary: "Require snapshot and contract tests before schema deploys.",
        actions: [
            "Capture pre-deploy snapshot",
            "Run consumer contract suite",
            "Stage rollout with blue/green"
        ]
    });
}
function runPrimeSeeder() {
    if (!isDev() || seeded) return;
    seedIncidents();
    seedPatterns();
    seedFixes();
    seedRollbacks();
    seedEarlyWarnings();
    seedForesightPredictions();
    seedCognitionBundle();
    seedAutonomySimulations();
    seedPrimeBriefing();
    seedKnowledgeGraph();
    seedRecommendations();
    seeded = true;
}
function getSeededWarnings() {
    return seededWarnings;
}
function getSeededPredictions() {
    return seededPredictions;
}
function getSeededCognition() {
    return seededCognition;
}
function getSeededAutonomy() {
    return {
        autonomySimulations: seededAutonomySimulations,
        strategyScores: seededStrategyScores,
        reliabilityForecast: seededReliabilityForecast
    };
}
function getSeededPrimeBriefing() {
    return seededPrimeBriefing;
}
function getSeededRecommendations() {
    return seededRecs;
}
function getSeededKnowledgeArticles() {
    return seededKnowledgeArticles;
}
}),
"[project]/lib/intel.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deriveIncidentPatterns",
    ()=>deriveIncidentPatterns,
    "detectAnomalies",
    ()=>detectAnomalies,
    "getIncidentHotspots",
    ()=>getIncidentHotspots,
    "getIncidentPatterns",
    ()=>getIncidentPatterns,
    "getRecentIncidents",
    ()=>getRecentIncidents,
    "getRecentPatterns",
    ()=>getRecentPatterns,
    "recordIncident",
    ()=>recordIncident,
    "summarizeIncidentHistory",
    ()=>summarizeIncidentHistory,
    "summarizeIncidentHistoryForDiagnostics",
    ()=>summarizeIncidentHistoryForDiagnostics,
    "summarizeIncidentHistoryForSources",
    ()=>summarizeIncidentHistoryForSources,
    "summarizeIncidents",
    ()=>summarizeIncidents,
    "summarizeProposalHistory",
    ()=>summarizeProposalHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/audit.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dev$2d$seeder$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dev-seeder.ts [app-route] (ecmascript)");
;
;
const incidentStore = [];
const MAX_INCIDENTS = 1000;
function makeId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
function normalizeSource(event) {
    return event?.context && typeof event.context.path === "string" ? String(event.context.path) : event?.source;
}
function toIncidentFromAudit(log) {
    return {
        id: log.id,
        timestamp: log.timestamp,
        diagnosisId: log.diagnosisId,
        proposalId: log.proposalId,
        rollbackId: log.rollbackId,
        snapshotId: log.snapshotId,
        risk: log.risk,
        actionType: log.actionType,
        message: log.message,
        tenantId: log.tenantId,
        siteId: log.siteId
    };
}
function recordIncident(record) {
    const entry = {
        id: "id" in record && record.id ? record.id : makeId("incident"),
        timestamp: record.timestamp ?? new Date().toISOString(),
        source: "source" in record ? record.source : undefined,
        summary: "summary" in record ? record.summary : undefined,
        eventId: "eventId" in record ? record.eventId : undefined,
        snapshotId: "snapshotId" in record ? record.snapshotId : undefined,
        diagnosisId: "diagnosisId" in record ? record.diagnosisId : undefined,
        proposalId: "proposalId" in record ? record.proposalId : undefined,
        rollbackId: "rollbackId" in record ? record.rollbackId : undefined,
        risk: record.risk,
        severity: "severity" in record ? record.severity : undefined,
        kind: "kind" in record ? record.kind : undefined,
        actionType: "actionType" in record ? record.actionType : undefined,
        message: "message" in record ? record.message : undefined,
        tags: "tags" in record && record.tags ? record.tags : [],
        tenantId: "tenantId" in record ? record.tenantId : undefined,
        siteId: "siteId" in record ? record.siteId : undefined
    };
    incidentStore.push(entry);
    if (incidentStore.length > MAX_INCIDENTS) {
        incidentStore.splice(0, incidentStore.length - MAX_INCIDENTS);
    }
    return entry;
}
function mergeIncidents(store, logs) {
    const map = new Map();
    [
        ...store,
        ...logs
    ].forEach((inc)=>{
        if (!map.has(inc.id)) {
            map.set(inc.id, inc);
        }
    });
    return Array.from(map.values());
}
function allIncidents() {
    const logIncidents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listLogs"])().map(toIncidentFromAudit);
    const combined = mergeIncidents(incidentStore, logIncidents);
    combined.sort((a, b)=>a.timestamp > b.timestamp ? -1 : 1);
    return combined;
}
function getRecentIncidents(limit = 100) {
    if ("TURBOPACK compile-time truthy", 1) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dev$2d$seeder$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runPrimeSeeder"])();
    }
    return allIncidents().slice(0, limit);
}
function deriveIncidentPatterns(records, limit = 20) {
    const patterns = {};
    const addPattern = (key, type, record, updater)=>{
        if (!key) return;
        const scopeKey = `${record.tenantId ?? "global"}:${record.siteId ?? "global"}`;
        const mapKey = `${scopeKey}:${type}:${key}`;
        const existing = patterns[mapKey] ?? {
            key,
            type,
            occurrences: 0,
            lastSeenAt: record.timestamp,
            relatedDiagnosisIds: [],
            relatedProposalIds: [],
            tenantId: record.tenantId,
            siteId: record.siteId
        };
        existing.occurrences += 1;
        if (record.timestamp > existing.lastSeenAt) existing.lastSeenAt = record.timestamp;
        if (record.diagnosisId && !existing.relatedDiagnosisIds?.includes(record.diagnosisId)) {
            existing.relatedDiagnosisIds = [
                ...existing.relatedDiagnosisIds ?? [],
                record.diagnosisId
            ];
        }
        if (record.proposalId && !existing.relatedProposalIds?.includes(record.proposalId)) {
            existing.relatedProposalIds = [
                ...existing.relatedProposalIds ?? [],
                record.proposalId
            ];
        }
        if (updater) updater(existing, record);
        patterns[mapKey] = existing;
    };
    records.forEach((rec)=>{
        if (rec.summary) addPattern(rec.summary, "diagnosis", rec);
        if (rec.source) addPattern(rec.source, "source", rec);
        if (rec.proposalId) {
            addPattern(rec.proposalId, "proposal", rec, (p, r)=>{
                if (r.actionType === "fix-applied") p.successCount = (p.successCount ?? 0) + 1;
                if (r.actionType === "fix-failed") p.failureCount = (p.failureCount ?? 0) + 1;
                if (r.actionType === "rollback-executed") p.rollbackCount = (p.rollbackCount ?? 0) + 1;
                if (r.actionType === "approval-required") p.approvalCount = (p.approvalCount ?? 0) + 1;
            });
        }
    });
    return Object.values(patterns).sort((a, b)=>b.occurrences - a.occurrences).slice(0, limit);
}
function getIncidentPatterns(limit = 20) {
    return deriveIncidentPatterns(allIncidents(), limit);
}
function summarizeIncidents(records) {
    const summary = {
        totalIncidents: records.length,
        fixSuccessCount: 0,
        fixFailureCount: 0,
        rollbackCount: 0,
        highRiskBlockedCount: 0,
        approvalsRequiredCount: 0,
        emailsSentCount: 0,
        emailsFailedCount: 0,
        topPatterns: []
    };
    records.forEach((rec)=>{
        if (rec.actionType === "fix-applied") summary.fixSuccessCount += 1;
        if (rec.actionType === "fix-failed") summary.fixFailureCount += 1;
        if (rec.actionType === "rollback-executed") summary.rollbackCount += 1;
        if (rec.actionType === "fix-rejected") summary.highRiskBlockedCount += 1;
        if (rec.actionType === "approval-required") summary.approvalsRequiredCount = (summary.approvalsRequiredCount ?? 0) + 1;
        if (rec.actionType === "email-sent") summary.emailsSentCount = (summary.emailsSentCount ?? 0) + 1;
        if (rec.actionType === "email-failed") summary.emailsFailedCount = (summary.emailsFailedCount ?? 0) + 1;
    });
    summary.topPatterns = deriveIncidentPatterns(records, 5);
    return summary;
}
function summarizeIncidentHistory() {
    return summarizeIncidents(allIncidents());
}
function detectAnomalies(events) {
    if (!events.length) return {
        anomalies: [],
        summary: "No events provided."
    };
    const errors = events.filter((e)=>e.severity === "error" || e.severity === "critical");
    const latency = events.filter((e)=>e.kind === "latency");
    const uptimeIssues = events.filter((e)=>e.kind === "uptime");
    const anomalies = [];
    const notes = [];
    if (errors.length >= 3 || errors.length >= Math.max(2, Math.ceil(events.length / 2))) {
        anomalies.push(...errors);
        notes.push(`Spike in errors/critical events (${errors.length})`);
    }
    const latencySources = new Set(latency.map((l)=>normalizeSource(l)));
    if (latency.length >= 3 || latencySources.size >= 2) {
        anomalies.push(...latency);
        notes.push("Elevated latency across multiple events");
    }
    const uptimeBySource = {};
    uptimeIssues.forEach((u)=>{
        const src = normalizeSource(u);
        if (!src) return;
        uptimeBySource[src] = (uptimeBySource[src] ?? 0) + 1;
    });
    Object.entries(uptimeBySource).forEach(([src, count])=>{
        if (count >= 2) {
            anomalies.push(...uptimeIssues.filter((u)=>normalizeSource(u) === src));
            notes.push(`Repeated uptime issues for ${src}`);
        }
    });
    const summary = notes.length ? notes.join("; ") : "No anomalies detected.";
    return {
        anomalies: Array.from(new Set(anomalies)),
        summary
    };
}
function getIncidentHotspots(limit = 10) {
    return getIncidentPatterns(limit);
}
function summarizeIncidentHistoryForDiagnostics(diagnoses) {
    const recent = getRecentIncidents(300);
    const summaryByDiag = {};
    diagnoses.forEach((diag)=>{
        const matches = recent.filter((rec)=>rec.diagnosisId === diag.id || rec.summary === diag.summary || rec.eventId && rec.eventId === diag.eventId || rec.source && diag.summary.includes(rec.source ?? ""));
        if (!matches.length) return;
        const successes = matches.filter((m)=>m.actionType === "fix-applied").length;
        const failures = matches.filter((m)=>m.actionType === "fix-failed").length;
        summaryByDiag[diag.id] = {
            occurrences: matches.length,
            failures,
            successes
        };
    });
    return summaryByDiag;
}
function summarizeProposalHistory(proposals) {
    const recent = getRecentIncidents(400);
    const map = {};
    proposals.forEach((proposal)=>{
        const matches = recent.filter((rec)=>rec.proposalId === proposal.id || rec.diagnosisId === proposal.diagnosisId);
        if (!matches.length) return;
        const successes = matches.filter((m)=>m.actionType === "fix-applied").length;
        const failures = matches.filter((m)=>m.actionType === "fix-failed").length;
        const rollbacks = matches.filter((m)=>m.actionType === "rollback-executed").length;
        map[proposal.id] = {
            attempts: matches.length,
            successes,
            failures,
            rollbacks
        };
    });
    return map;
}
function getRecentPatterns(limit = 10) {
    return getIncidentPatterns(limit);
}
function summarizeIncidentHistoryForSources(events) {
    const sourceCounts = {};
    events.forEach((evt)=>{
        const src = normalizeSource(evt);
        if (src) sourceCounts[src] = (sourceCounts[src] ?? 0) + 1;
    });
    return sourceCounts;
}
}),
"[project]/lib/reflection.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reflectBySubsystem",
    ()=>reflectBySubsystem,
    "reflectDaily",
    ()=>reflectDaily,
    "reflectMonthly",
    ()=>reflectMonthly,
    "reflectWeekly",
    ()=>reflectWeekly
]);
function buildHighlights(records) {
    if (!records.length) return [
        "No incidents recorded."
    ];
    const failures = records.filter((r)=>r.actionType === "fix-failed").length;
    const rollbacks = records.filter((r)=>r.actionType === "rollback-executed").length;
    const successes = records.filter((r)=>r.actionType === "fix-applied").length;
    return [
        `Fixes: ${successes} applied`,
        `Failures: ${failures}`,
        `Rollbacks: ${rollbacks}`
    ];
}
function buildRecommendations(records) {
    if (!records.length) return [
        "Maintain monitoring cadence."
    ];
    const recs = [];
    const failures = records.filter((r)=>r.actionType === "fix-failed").length;
    if (failures) recs.push("Review failed fixes and mitigate repeat causes.");
    const rollbacks = records.filter((r)=>r.actionType === "rollback-executed").length;
    if (rollbacks) recs.push("Validate rollback outcomes and guardrails.");
    if (!recs.length) recs.push("Keep safeguards steady and continue audits.");
    return recs;
}
function reflectPeriod(records, period) {
    const highlights = buildHighlights(records);
    const risks = records.length ? [
        "Operational load observed."
    ] : [
        "None"
    ];
    const recommendations = buildRecommendations(records);
    return {
        period,
        highlights,
        risks,
        recommendations
    };
}
function reflectDaily(records) {
    return reflectPeriod(records.slice(-50), "daily");
}
function reflectWeekly(records) {
    return reflectPeriod(records.slice(-200), "weekly");
}
function reflectMonthly(records) {
    return reflectPeriod(records.slice(-400), "monthly");
}
function reflectBySubsystem(records) {
    const grouped = {};
    records.forEach((r)=>{
        const key = r.source ?? "unknown";
        grouped[key] = grouped[key] ?? [];
        grouped[key].push(r);
    });
    const summaries = Object.entries(grouped).map(([subsystem, recs])=>{
        const highlights = buildHighlights(recs);
        const recommendations = buildRecommendations(recs);
        return `${subsystem}: ${highlights.join("; ")}; Recommendations: ${recommendations.join(" ")}`;
    });
    return {
        period: "subsystem",
        highlights: summaries,
        risks: [],
        recommendations: []
    };
}
}),
"[project]/app/api/intel/reflection/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intel.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$reflection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/reflection.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    const incidents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRecentIncidents"])(400);
    const dailyReflection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$reflection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["reflectDaily"])(incidents);
    const weeklyReflection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$reflection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["reflectWeekly"])(incidents);
    const subsystemReflection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$reflection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["reflectBySubsystem"])(incidents);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        dailyReflection,
        weeklyReflection,
        subsystemReflection
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__30ed3efc._.js.map