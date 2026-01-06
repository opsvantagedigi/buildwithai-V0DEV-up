"use client"

import { useEffect, useState } from "react"
import { defaultPersona, formatExplanation } from "@/lib/persona"
import { buildCoachingBody } from "@/lib/coaching"
import type {
  AutonomyLevel,
  EarlyWarning,
  ForesightPrediction,
  IncidentPattern,
  IncidentRecord,
  IncidentSummary,
  KnowledgeArticle,
  KnowledgeRecommendation,
  KnowledgeGraph,
  Playbook,
  PrimeCognitionBundle,
  PrimeBriefing,
  PrimeInsight,
  PrimeNarrativeBundle,
  ReliabilityForecast,
  ReflectionSummary,
  SimpleTrend,
  StabilityIndex,
  VoiceSummary,
  AutonomySimulation,
  FixStrategyScore,
} from "@/lib/types"

type IntelResponse = {
  incidents: IncidentRecord[]
  patterns: IncidentPattern[]
  summary: IncidentSummary
  voiceSummary?: VoiceSummary
  trends?: SimpleTrend[]
  stabilityIndex?: StabilityIndex
  earlyWarnings?: EarlyWarning[]
  foresightPredictions?: ForesightPrediction[]
  playbooks?: Playbook[]
  cognition?: PrimeCognitionBundle
  autonomySimulations?: AutonomySimulation[]
  strategyScores?: FixStrategyScore[]
  reliabilityForecast?: ReliabilityForecast
}

type KnowledgeResponse = {
  knowledge: KnowledgeArticle[]
}

type ReflectionResponse = {
  dailyReflection: ReflectionSummary
  weeklyReflection: ReflectionSummary
  subsystemReflection: ReflectionSummary
}

type PrimeResponse = {
  primeBriefing: PrimeBriefing
  primeInsights: PrimeInsight[]
  primeInsightsFeed: string[]
  primeWeeklyReport: string[]
  primeMonthlyDigest: string[]
  globalReliabilityScore: number
  cognition?: PrimeCognitionBundle
  autonomy?: {
    autonomySimulations: AutonomySimulation[]
    strategyScores: FixStrategyScore[]
    reliabilityForecast: ReliabilityForecast
  }
  knowledgeBrain?: KnowledgeBrainResponse["knowledgeBrain"]
  primeNarrative?: PrimeNarrativeBundle
}

type PrimeNarrativeResponse = {
  primeNarrative: PrimeNarrativeBundle
  primeBriefing: PrimeBriefing
  primeInsights: PrimeInsight[]
}

type KnowledgeBrainResponse = {
  knowledgeBrain: {
    graph: KnowledgeGraph
    insights: string[]
    recommendations: KnowledgeRecommendation[]
    summary: string[]
  }
}

type IntelligencePanelProps = {
  sessionId: string
  level?: AutonomyLevel
}

export default function IntelligencePanel({ sessionId, level }: IntelligencePanelProps) {
  const [data, setData] = useState<IntelResponse | null>(null)
  const [knowledge, setKnowledge] = useState<KnowledgeArticle[]>([])
  const [reflection, setReflection] = useState<ReflectionResponse | null>(null)
  const [prime, setPrime] = useState<PrimeResponse | null>(null)
  const [primeNarrative, setPrimeNarrative] = useState<PrimeNarrativeResponse["primeNarrative"] | null>(null)
  const [knowledgeBrain, setKnowledgeBrain] = useState<KnowledgeBrainResponse["knowledgeBrain"] | null>(null)
  const [loading, setLoading] = useState(true)
  const [knowledgeLoading, setKnowledgeLoading] = useState(true)
  const [reflectionLoading, setReflectionLoading] = useState(true)
  const [primeLoading, setPrimeLoading] = useState(true)
  const [primeNarrativeLoading, setPrimeNarrativeLoading] = useState(true)
  const [knowledgeBrainLoading, setKnowledgeBrainLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [knowledgeError, setKnowledgeError] = useState<string | null>(null)
  const [reflectionError, setReflectionError] = useState<string | null>(null)
  const [primeError, setPrimeError] = useState<string | null>(null)
  const [primeNarrativeError, setPrimeNarrativeError] = useState<string | null>(null)
  const [knowledgeBrainError, setKnowledgeBrainError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch("/api/intel/summary")
        const json = await res.json().catch(() => null)
        setData(json)
      } catch (err) {
        setError("Failed to load intelligence summary")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    async function loadKnowledge() {
      setKnowledgeLoading(true)
      try {
        const res = await fetch("/api/intel/knowledge")
        const json: KnowledgeResponse | null = await res.json().catch(() => null)
        if (json?.knowledge) setKnowledge(json.knowledge)
      } catch (err) {
        setKnowledgeError("Failed to load knowledge base")
      } finally {
        setKnowledgeLoading(false)
      }
    }
    loadKnowledge()
  }, [])

  useEffect(() => {
    async function loadKnowledgeBrain() {
      setKnowledgeBrainLoading(true)
      try {
        const res = await fetch("/api/intel/knowledge-graph")
        const json: KnowledgeBrainResponse | null = await res.json().catch(() => null)
        if (json?.knowledgeBrain) setKnowledgeBrain(json.knowledgeBrain)
      } catch (err) {
        setKnowledgeBrainError("Failed to load knowledge graph")
      } finally {
        setKnowledgeBrainLoading(false)
      }
    }
    loadKnowledgeBrain()
  }, [])

  useEffect(() => {
    async function loadReflection() {
      setReflectionLoading(true)
      try {
        const res = await fetch("/api/intel/reflection")
        const json: ReflectionResponse | null = await res.json().catch(() => null)
        if (json) setReflection(json)
      } catch (err) {
        setReflectionError("Failed to load reflection")
      } finally {
        setReflectionLoading(false)
      }
    }
    loadReflection()
  }, [])

  useEffect(() => {
    async function loadPrime() {
      setPrimeLoading(true)
      try {
        const res = await fetch("/api/intel/prime")
        const json: PrimeResponse | null = await res.json().catch(() => null)
        if (json) setPrime(json)
      } catch (err) {
        setPrimeError("Failed to load prime intelligence")
      } finally {
        setPrimeLoading(false)
      }
    }
    loadPrime()
  }, [])

  useEffect(() => {
    async function loadPrimeNarrative() {
      setPrimeNarrativeLoading(true)
      try {
        const res = await fetch("/api/intel/prime-narrative")
        const json: PrimeNarrativeResponse | null = await res.json().catch(() => null)
        if (json?.primeNarrative) setPrimeNarrative(json.primeNarrative)
      } catch (err) {
        setPrimeNarrativeError("Failed to load prime narrative")
      } finally {
        setPrimeNarrativeLoading(false)
      }
    }
    loadPrimeNarrative()
  }, [])

  const summary = data?.summary
  const topPatterns = summary?.topPatterns?.length ? summary.topPatterns : data?.patterns.slice(0, 5) ?? []
  const recentIncidents = data?.incidents.slice(0, 10) ?? []
  const voiceSummary = data?.voiceSummary
  const playbooks = data?.playbooks ?? []
  const stabilityIndex = data?.stabilityIndex
  const earlyWarnings = data?.earlyWarnings ?? []
  const foresightPredictions = data?.foresightPredictions ?? []
  const cognition = data?.cognition ?? prime?.cognition
  const autonomySimulations = data?.autonomySimulations ?? prime?.autonomy?.autonomySimulations ?? []
  const strategyScores = data?.strategyScores ?? prime?.autonomy?.strategyScores ?? []
  const reliabilityForecast = data?.reliabilityForecast ?? prime?.autonomy?.reliabilityForecast ?? prime?.autonomy?.reliabilityForecast
  const primeNarrativeBundle = primeNarrative ?? prime?.primeNarrative ?? null
  const knowledgeBrainInsights = knowledgeBrain?.insights ?? []
  const knowledgeBrainSummary = knowledgeBrain?.summary ?? []
  const knowledgeRecommendations = knowledgeBrain?.recommendations ?? []

  const coachingBaseBody = buildCoachingBody({
    persona: defaultPersona,
    summary,
    patterns: topPatterns,
    voiceSummary,
  })

  const coachingLines = formatExplanation(defaultPersona, {
    title: "Operator coaching",
    body: coachingBaseBody,
  })

  return (
    <div style={{ background: "#0b1224", borderRadius: 12, padding: 16, border: "1px solid #1f2937", color: "#e5e7eb" }}>
      <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>Operator Intelligence</h2>
      <p style={{ margin: 0, marginBottom: 6, color: "#a5b4fc", fontSize: 12 }}>
        Session {sessionId} · Mode {level ?? "unspecified"}
      </p>
      <p style={{ margin: 0, marginBottom: 12, color: "#7dd3fc", fontSize: 12 }}>
        Live intelligence from your recent incidents, fixes, and rollbacks.
      </p>

      {loading && <div style={{ color: "#cbd5e1", fontSize: 13 }}>Loading intelligence...</div>}
      {error && <div style={{ color: "#fca5a5", fontSize: 13 }}>{error}</div>}

      {!loading && !error && summary && (
        <div style={{ display: "grid", gap: 12 }}>
          {stabilityIndex && (
            <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
              <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Stability Index</h3>
              <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#cbd5e1" }}>
                <div>Score: {stabilityIndex.score} · Level: {stabilityIndex.level}</div>
                <div>Computed: {stabilityIndex.computedAt}</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {stabilityIndex.factors.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {earlyWarnings.length > 0 && (
            <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
              <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Early warnings</h3>
              <div style={{ display: "grid", gap: 8, fontSize: 13, color: "#cbd5e1" }}>
                {earlyWarnings.map((w) => (
                  <div key={w.id} style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                    <div style={{ fontWeight: 600 }}>{w.title} · {w.severity} · {w.window}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>{w.rationale}</div>
                    <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                      {w.actions.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {foresightPredictions.length > 0 && (
            <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
              <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Foresight predictions</h3>
              <div style={{ display: "grid", gap: 8, fontSize: 13, color: "#cbd5e1" }}>
                {foresightPredictions.map((p) => (
                  <div key={p.id} style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                    <div style={{ fontWeight: 600 }}>Likelihood {p.likelihood} · Impact {p.impact} · Horizon {p.horizon}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>{p.summary}</div>
                    <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                      {p.drivers.map((d, idx) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cognition && (
            <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
              <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Prime cognition</h3>
              <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#cbd5e1" }}>
                <div>Stability: {cognition.stability.score}</div>
                <div>Drift: {cognition.drift.status} · Score: {cognition.drift.driftScore}</div>
                <div>Indicators: {cognition.drift.indicators.join("; ")}</div>
                <div style={{ fontWeight: 600, marginTop: 4 }}>Confidences</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {cognition.confidences.map((c, idx) => (
                    <li key={idx}>{c.target}: {c.score} — {c.rationale}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 600, marginTop: 4 }}>Rationales</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {cognition.rationales.map((r, idx) => (
                    <li key={idx}>{r.summary} — {r.factors.join("; ")}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 600, marginTop: 4 }}>Traces</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {cognition.traces.map((t, idx) => (
                    <li key={idx}>{t.steps.join(" → ")} → {t.conclusion}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {(autonomySimulations.length > 0 || strategyScores.length > 0 || reliabilityForecast) && (
            <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
              <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Prime autonomy</h3>
              <div style={{ display: "grid", gap: 8, fontSize: 13, color: "#cbd5e1" }}>
                {reliabilityForecast && (
                  <div style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                    <div style={{ fontWeight: 600 }}>Reliability forecast · {reliabilityForecast.horizon}</div>
                    <div>Score: {reliabilityForecast.score}</div>
                    <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                      {reliabilityForecast.rationale.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {strategyScores.length > 0 && (
                  <div style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                    <div style={{ fontWeight: 600 }}>Strategy scores</div>
                    <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                      {strategyScores.map((s, idx) => (
                        <li key={idx}>{s.strategy}: {s.score} — {s.rationale}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {autonomySimulations.length > 0 && (
                  <div style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                    <div style={{ fontWeight: 600 }}>Simulations</div>
                    <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                      {autonomySimulations.map((sim) => (
                        <li key={sim.id}>
                          {sim.description} — {sim.outcome} — risk {sim.risk}; approvals {sim.approvalsNeeded ?? 0}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Operator health snapshot</h3>
            <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#cbd5e1" }}>
              <div>Incidents: {summary.totalIncidents}</div>
              <div>Fix success: {summary.fixSuccessCount} · Fix failure: {summary.fixFailureCount} · Rollbacks: {summary.rollbackCount}</div>
              <div>High-risk blocked: {summary.highRiskBlockedCount} · Approvals required: {summary.approvalsRequiredCount ?? 0}</div>
              <div>Emails sent: {summary.emailsSentCount ?? 0} · Emails failed: {summary.emailsFailedCount ?? 0}</div>
            </div>
          </section>

          {voiceSummary && (
            <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
              <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Briefing (voice-ready)</h3>
              <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#cbd5e1" }}>
                <div style={{ fontWeight: 600 }}>{voiceSummary.title}</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {voiceSummary.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
                {voiceSummary.recommendedActions && voiceSummary.recommendedActions.length > 0 && (
                  <div>
                    Recommended actions:
                    <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                      {voiceSummary.recommendedActions.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Recurring patterns</h3>
            <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#cbd5e1" }}>
              <div>Top recurring patterns:</div>
              <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                {topPatterns.length === 0 && <li>No recurring patterns detected — no hotspots at this time.</li>}
                {topPatterns.map((p) => (
                  <li key={`${p.type}-${p.key}`}>
                    {p.type}: {p.key} — {p.occurrences} occurrences · last seen {p.lastSeenAt}
                    {typeof p.successCount !== "undefined" && ` · success: ${p.successCount}`}
                    {typeof p.failureCount !== "undefined" && ` · failures: ${p.failureCount}`}
                    {typeof p.rollbackCount !== "undefined" && ` · rollbacks: ${p.rollbackCount}`}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {playbooks.length > 0 && (
            <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
              <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Playbooks</h3>
              <div style={{ display: "grid", gap: 8, fontSize: 13, color: "#cbd5e1" }}>
                {playbooks.slice(0, 4).map((pb) => (
                  <div key={pb.id} style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                    <div style={{ fontWeight: 600 }}>{pb.name}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>{pb.description}</div>
                    <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                      {pb.steps.slice(0, 3).map((step) => (
                        <li key={step.order}>{step.description}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Recent incidents</h3>
            <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#cbd5e1" }}>
              {recentIncidents.length === 0 && <div>No incidents recorded yet — the system is quiet.</div>}
              {recentIncidents.map((inc) => (
                <div key={inc.id} style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                  <div style={{ fontWeight: 600 }}>{inc.summary || inc.actionType || "Incident"}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>{inc.timestamp}</div>
                  {inc.source && <div style={{ fontSize: 12, color: "#a5b4fc" }}>Source: {inc.source}</div>}
                  {inc.message && <div style={{ fontSize: 12, color: "#cbd5e1" }}>{inc.message}</div>}
                </div>
              ))}
            </div>
          </section>

          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Knowledge</h3>
            {knowledgeLoading && <div style={{ color: "#cbd5e1", fontSize: 13 }}>Loading knowledge...</div>}
            {knowledgeError && <div style={{ color: "#fca5a5", fontSize: 13 }}>{knowledgeError}</div>}
            {!knowledgeLoading && !knowledgeError && (
              <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#cbd5e1" }}>
                {(knowledge.slice(0, 5) ?? []).map((article) => (
                  <div key={article.id} style={{ background: "#111827", padding: 8, borderRadius: 8 }}>
                    <div style={{ fontWeight: 600 }}>{article.title}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>{article.summary}</div>
                    <div style={{ fontSize: 12, color: "#a5b4fc" }}>Source: {article.source}</div>
                  </div>
                ))}
                {knowledge.length === 0 && <div>No knowledge articles yet — add context as you learn.</div>}
              </div>
            )}
          </section>

          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Knowledge graph</h3>
            {knowledgeBrainLoading && <div style={{ color: "#cbd5e1", fontSize: 13 }}>Loading knowledge graph...</div>}
            {knowledgeBrainError && <div style={{ color: "#fca5a5", fontSize: 13 }}>{knowledgeBrainError}</div>}
            {!knowledgeBrainLoading && !knowledgeBrainError && knowledgeBrain && (
              <div style={{ display: "grid", gap: 8, fontSize: 13, color: "#cbd5e1" }}>
                <div style={{ fontWeight: 600 }}>Summary</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {knowledgeBrainSummary.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 600 }}>Insights</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {knowledgeBrainInsights.map((insight, idx) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
                {knowledgeRecommendations.length > 0 && (
                  <div>
                    <div style={{ fontWeight: 600 }}>Recommendations</div>
                    <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                      {knowledgeRecommendations.map((rec, idx) => (
                        <li key={idx}>{rec.title}: {rec.summary} — {rec.actions.join("; ")}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>

          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Operator coaching</h3>
            <div style={{ display: "grid", gap: 4, fontSize: 13, color: "#cbd5e1" }}>
              {coachingLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </section>

          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Reflection</h3>
            {reflectionLoading && <div style={{ color: "#cbd5e1", fontSize: 13 }}>Loading reflections...</div>}
            {reflectionError && <div style={{ color: "#fca5a5", fontSize: 13 }}>{reflectionError}</div>}
            {!reflectionLoading && !reflectionError && reflection && (
              <div style={{ display: "grid", gap: 8, fontSize: 13, color: "#cbd5e1" }}>
                <div style={{ fontWeight: 600 }}>Daily</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {reflection.dailyReflection.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 600 }}>Weekly</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {reflection.weeklyReflection.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 600 }}>Subsystem</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {reflection.subsystemReflection.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Prime narrative</h3>
            {primeNarrativeLoading && <div style={{ color: "#cbd5e1", fontSize: 13 }}>Loading prime narrative...</div>}
            {primeNarrativeError && <div style={{ color: "#fca5a5", fontSize: 13 }}>{primeNarrativeError}</div>}
            {!primeNarrativeLoading && !primeNarrativeError && primeNarrativeBundle && (
              <div style={{ display: "grid", gap: 8, fontSize: 13, color: "#cbd5e1" }}>
                <div style={{ fontWeight: 600 }}>{primeNarrativeBundle.headline}</div>
                <div style={{ fontWeight: 600 }}>Weekly</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {primeNarrativeBundle.weekly.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 600 }}>Monthly</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {primeNarrativeBundle.monthly.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 600 }}>Feed</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {primeNarrativeBundle.feed.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 600 }}>Briefing</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {primeNarrativeBundle.briefing.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Prime Intelligence</h3>
            {primeLoading && <div style={{ color: "#cbd5e1", fontSize: 13 }}>Loading Prime intelligence...</div>}
            {primeError && <div style={{ color: "#fca5a5", fontSize: 13 }}>{primeError}</div>}
            {!primeLoading && !primeError && prime && (
              <div style={{ display: "grid", gap: 8, fontSize: 13, color: "#cbd5e1" }}>
                <div style={{ fontWeight: 600 }}>Global reliability score: {prime.globalReliabilityScore}</div>
                <div style={{ fontWeight: 600 }}>{prime.primeBriefing.headline}</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {prime.primeBriefing.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 600 }}>Prime insights</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {prime.primeInsights.map((i) => (
                    <li key={i.id}>{i.title}: {i.narrative}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 600 }}>Prime feed</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {prime.primeInsightsFeed.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 600 }}>Prime monthly</div>
                <ul style={{ margin: "4px 0 0 16px", padding: 0 }}>
                  {prime.primeMonthlyDigest.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
