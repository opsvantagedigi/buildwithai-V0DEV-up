import type { IncidentPattern, KnowledgeArticle } from "@/lib/types"

const knowledgeStore: KnowledgeArticle[] = []

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

export function listKnowledgeArticles(limit?: number): KnowledgeArticle[] {
  return typeof limit === "number" ? knowledgeStore.slice(0, limit) : [...knowledgeStore]
}

export function getKnowledgeArticle(id: string): KnowledgeArticle | undefined {
  return knowledgeStore.find((a) => a.id === id)
}

export function upsertKnowledgeArticle(article: KnowledgeArticle): KnowledgeArticle {
  const idx = knowledgeStore.findIndex((a) => a.id === article.id)
  if (idx >= 0) {
    knowledgeStore[idx] = { ...knowledgeStore[idx], ...article, updatedAt: article.updatedAt }
    return knowledgeStore[idx]
  }
  knowledgeStore.unshift(article)
  return article
}

export function generateKnowledgeFromPatterns(patterns: IncidentPattern[]): KnowledgeArticle[] {
  const generated: KnowledgeArticle[] = patterns.map((p) => {
    const id = `auto-${p.tenantId ?? "global"}-${p.siteId ?? "global"}-${p.type}-${p.key}`
    const summary = `Recurring issue observed ${p.occurrences} time${p.occurrences === 1 ? "" : "s"}: ${p.key}.`
    const body = [
      `Pattern: ${p.key}`,
      `Occurrences: ${p.occurrences}`,
      p.successCount ? `Successful remediations: ${p.successCount}` : "",
      p.failureCount ? `Failed remediation attempts: ${p.failureCount}` : "",
      p.rollbackCount ? `Rollbacks executed: ${p.rollbackCount}` : "",
    ]
      .filter(Boolean)
      .join("\n")

    const article: KnowledgeArticle = {
      id,
      title: `Recurring issue: ${p.key}`,
      summary,
      relatedDiagnosisIds: p.relatedDiagnosisIds,
      relatedProposalIds: p.relatedProposalIds,
      relatedPatternKeys: [p.key],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: "operator",
      tags: [p.type],
      body,
      tenantId: p.tenantId,
      siteId: p.siteId,
    }

    return article
  })

  generated.forEach((article) => {
    const existing = getKnowledgeArticle(article.id)
    if (!existing) {
      upsertKnowledgeArticle(article)
    }
  })

  return generated
}
