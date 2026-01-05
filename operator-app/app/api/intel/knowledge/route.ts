import { NextResponse } from "next/server"
import { getIncidentPatterns } from "@/lib/intel"
import { generateKnowledgeFromPatterns, listKnowledgeArticles } from "@/lib/knowledge"

export async function GET() {
  const patterns = getIncidentPatterns()
  const generated = generateKnowledgeFromPatterns(patterns)
  const stored = listKnowledgeArticles()

  const combinedMap = new Map<string, ReturnType<typeof listKnowledgeArticles>[number]>()
  ;[...generated, ...stored].forEach((article) => {
    combinedMap.set(article.id, article)
  })

  const knowledge = Array.from(combinedMap.values())
  return NextResponse.json({ knowledge })
}
