import { NextResponse } from "next/server"
import { getIncidentPatterns, getRecentIncidents } from "@/lib/intel"
import { knowledgeBrainBundle } from "@/lib/prime-knowledge"
import { listPlaybooks } from "@/lib/playbooks"
import { listKnowledgeArticles } from "@/lib/knowledge"

export async function GET() {
  const incidents = getRecentIncidents(200)
  const patterns = getIncidentPatterns(25)
  const playbooks = listPlaybooks()
  const articles = listKnowledgeArticles()

  const knowledgeBrain = knowledgeBrainBundle({ incidents, patterns, proposals: [], playbooks, articles })

  return NextResponse.json({ knowledgeBrain })
}
