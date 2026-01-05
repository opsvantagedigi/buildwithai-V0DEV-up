import { buildKnowledgeGraph, buildKnowledgeGraphInsights, buildKnowledgeRecommendations, linkFixesToPlaybooks, linkIncidentsToPatterns, linkPatternsToFixes, summarizeKnowledgeGraph } from "@/lib/knowledge-graph"
import type { IncidentPattern, IncidentRecord, KnowledgeArticle, KnowledgeGraph, KnowledgeRecommendation, Playbook, RemediationProposal } from "@/lib/types"

export function evolveKnowledgeGraph(input: {
  incidents: IncidentRecord[]
  patterns: IncidentPattern[]
  proposals: RemediationProposal[]
  playbooks: Playbook[]
  articles: KnowledgeArticle[]
}): KnowledgeGraph {
  let graph = buildKnowledgeGraph(input)
  graph = linkIncidentsToPatterns(graph)
  graph = linkPatternsToFixes(graph)
  graph = linkFixesToPlaybooks(graph)
  return graph
}

export function knowledgeBrainBundle(input: {
  incidents: IncidentRecord[]
  patterns: IncidentPattern[]
  proposals: RemediationProposal[]
  playbooks: Playbook[]
  articles: KnowledgeArticle[]
}): { graph: KnowledgeGraph; insights: string[]; recommendations: KnowledgeRecommendation[]; summary: string[] } {
  const graph = evolveKnowledgeGraph(input)
  const insights = buildKnowledgeGraphInsights(graph)
  const recommendations = buildKnowledgeRecommendations(graph)
  const summary = summarizeKnowledgeGraph(graph)
  return { graph, insights, recommendations, summary }
}
