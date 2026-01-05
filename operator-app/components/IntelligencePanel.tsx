"use client"

import { useEffect, useState } from "react"
import { defaultPersona, formatExplanation } from "@/lib/persona"
import type {
  AutonomyLevel,
  IncidentPattern,
  IncidentRecord,
  IncidentSummary,
  KnowledgeArticle,
  Playbook,
  VoiceSummary,
} from "@/lib/types"

type IntelResponse = {
  incidents: IncidentRecord[]
  patterns: IncidentPattern[]
  summary: IncidentSummary
  voiceSummary?: VoiceSummary
  playbooks?: Playbook[]
}

type KnowledgeResponse = {
  knowledge: KnowledgeArticle[]
}

type IntelligencePanelProps = {
  sessionId: string
  level?: AutonomyLevel
}

export default function IntelligencePanel({ sessionId, level }: IntelligencePanelProps) {
  const [data, setData] = useState<IntelResponse | null>(null)
  const [knowledge, setKnowledge] = useState<KnowledgeArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [knowledgeLoading, setKnowledgeLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [knowledgeError, setKnowledgeError] = useState<string | null>(null)

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

  const summary = data?.summary
  const topPatterns = summary?.topPatterns?.length ? summary.topPatterns : data?.patterns.slice(0, 5) ?? []
  const recentIncidents = data?.incidents.slice(0, 10) ?? []
  const voiceSummary = data?.voiceSummary
  const playbooks = data?.playbooks ?? []

  const coachingLines = formatExplanation(defaultPersona, {
    title: "Coaching insight",
    body: [
      topPatterns.length ? `Focus areas: ${topPatterns.slice(0, 2).map((p) => p.key).join(", ")}` : "Patterns stable.",
      summary ? `Recent fixes succeeded: ${summary.fixSuccessCount}, failed: ${summary.fixFailureCount}.` : "",
      summary && summary.highRiskBlockedCount ? `High-risk actions blocked: ${summary.highRiskBlockedCount}.` : "",
    ],
  })

  return (
    <div style={{ background: "#0b1224", borderRadius: 12, padding: 16, border: "1px solid #1f2937", color: "#e5e7eb" }}>
      <h2 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>Operator Intelligence</h2>
      <p style={{ margin: 0, marginBottom: 6, color: "#a5b4fc", fontSize: 12 }}>
        Session {sessionId} · Mode {level ?? "unspecified"}
      </p>
      <p style={{ margin: 0, marginBottom: 12, color: "#7dd3fc", fontSize: 12 }}>
        Learned patterns from recent incidents, fixes, and rollbacks.
      </p>

      {loading && <div style={{ color: "#cbd5e1", fontSize: 13 }}>Loading intelligence...</div>}
      {error && <div style={{ color: "#fca5a5", fontSize: 13 }}>{error}</div>}

      {!loading && !error && summary && (
        <div style={{ display: "grid", gap: 12 }}>
          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Health summary</h3>
            <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#cbd5e1" }}>
              <div>Incidents: {summary.totalIncidents}</div>
              <div>Fix success: {summary.fixSuccessCount} · Fix failure: {summary.fixFailureCount} · Rollbacks: {summary.rollbackCount}</div>
              <div>High-risk blocked: {summary.highRiskBlockedCount} · Approvals required: {summary.approvalsRequiredCount ?? 0}</div>
              <div>Emails sent: {summary.emailsSentCount ?? 0} · Emails failed: {summary.emailsFailedCount ?? 0}</div>
            </div>
          </section>

          {voiceSummary && (
            <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
              <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Voice summary</h3>
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
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Patterns</h3>
            <div style={{ display: "grid", gap: 6, fontSize: 13, color: "#cbd5e1" }}>
              <div>Top recurring patterns:</div>
              <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                {topPatterns.length === 0 && <li>No patterns yet.</li>}
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
              {recentIncidents.length === 0 && <div>No incidents recorded yet.</div>}
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
                {knowledge.length === 0 && <div>No knowledge articles yet.</div>}
              </div>
            )}
          </section>

          <section style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: "#c7d2fe" }}>Coaching insight</h3>
            <div style={{ display: "grid", gap: 4, fontSize: 13, color: "#cbd5e1" }}>
              {coachingLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
