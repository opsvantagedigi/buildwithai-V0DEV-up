import type {
  IncidentPattern,
  IncidentRecord,
  KnowledgeArticle,
  KnowledgeGraph,
  KnowledgeLink,
  KnowledgeRecommendation,
  Playbook,
  RemediationProposal,
} from "@/lib/types"

export function buildKnowledgeGraph(input: {
  incidents: IncidentRecord[]
  patterns: IncidentPattern[]
  proposals: RemediationProposal[]
  playbooks: Playbook[]
  articles: KnowledgeArticle[]
}): KnowledgeGraph {
  return {
    ...input,
    links: [],
  }
}

export function summarizeKnowledgeGraph(graph: KnowledgeGraph): string[] {
  const summaries: string[] = []
  summaries.push(`Incidents: ${graph.incidents.length}`)
  summaries.push(`Patterns: ${graph.patterns.length}`)
  summaries.push(`Proposals: ${graph.proposals.length}`)
  summaries.push(`Playbooks: ${graph.playbooks.length}`)
  summaries.push(`Articles: ${graph.articles.length}`)
  return summaries
}

export function linkIncidentsToPatterns(graph: KnowledgeGraph): KnowledgeGraph {
  const links: KnowledgeLink[] = [...graph.links]
  graph.incidents.forEach((inc) => {
    graph.patterns.forEach((pat) => {
      if (inc.summary && pat.key && inc.summary.includes(pat.key)) {
        links.push({ from: inc.id, to: pat.key, relation: "incident-pattern" })
      }
    })
  })
  return { ...graph, links }
}

export function linkPatternsToFixes(graph: KnowledgeGraph): KnowledgeGraph {
  const links: KnowledgeLink[] = [...graph.links]
  graph.patterns.forEach((pat) => {
    graph.proposals.forEach((prop) => {
      if (prop.historyNote && prop.historyNote.includes(pat.key)) {
        links.push({ from: pat.key, to: prop.id, relation: "pattern-proposal" })
      }
    })
  })
  return { ...graph, links }
}

export function linkFixesToPlaybooks(graph: KnowledgeGraph): KnowledgeGraph {
  const links: KnowledgeLink[] = [...graph.links]
  graph.proposals.forEach((prop) => {
    graph.playbooks.forEach((pb) => {
      if (pb.triggers?.diagnosisSummaryContains && prop.expectedImpact.includes(pb.triggers.diagnosisSummaryContains)) {
        links.push({ from: prop.id, to: pb.id, relation: "proposal-playbook" })
      }
    })
  })
  return { ...graph, links }
}

export function buildKnowledgeGraphInsights(graph: KnowledgeGraph): string[] {
  const insights: string[] = []
  if (!graph.incidents.length && !graph.patterns.length) {
    return ["Knowledge graph has no recent signals."]
  }
  const linkedCount = graph.links.length
  insights.push(`Graph links: ${linkedCount}`)
  const hotspot = graph.patterns[0]
  if (hotspot) insights.push(`Top pattern node: ${hotspot.key} (${hotspot.occurrences}x).`)
  if (graph.playbooks.length) insights.push(`Playbooks available: ${graph.playbooks.length}.`)
  if (graph.articles.length) insights.push(`Knowledge articles: ${graph.articles.length}.`)
  return insights
}

export function buildKnowledgeRecommendations(graph: KnowledgeGraph): KnowledgeRecommendation[] {
  const recs: KnowledgeRecommendation[] = []
  if (!graph.patterns.length) {
    return [
      {
        title: "Capture learnings",
        summary: "No patterns detected; capture emerging signals to enrich knowledge base.",
        actions: ["Log new incidents", "Annotate learnings", "Review observability gaps"],
      },
    ]
  }

  const topPattern = graph.patterns[0]
  recs.push({
    title: "Stabilize top pattern",
    summary: `Focus remediation on ${topPattern.key} with ${topPattern.occurrences} occurrences.`,
    actions: ["Pair with closest playbook", "Run tabletop rollback simulation", "Add guardrail checks"],
  })

  if (graph.playbooks.length) {
    recs.push({
      title: "Align playbooks",
      summary: "Ensure playbooks map to the most frequent patterns for faster response.",
      actions: ["Review triggers", "Tighten expected outcomes", "Add verification steps"],
    })
  }

  return recs
}
