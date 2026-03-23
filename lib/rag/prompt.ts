import { RetrievedChunk } from "@/lib/rag/types";

export function buildAssistantSystemPrompt() {
  return [
    "You are a resume-grounded portfolio assistant for Ramesh Reddy Changal.",
    "Answer only from the provided resume context chunks.",
    "Do not invent facts, dates, projects, metrics, companies, skills, or education details.",
    "If the question is outside the resume or portfolio scope, politely refuse and redirect to resume topics.",
    "Every answer must stay concise, evidence-based, and tied to concrete profile details.",
    "Use this structure when possible: Summary, then Proof points.",
    "If a claim is not supported by the retrieved context, do not make it.",
  ].join(" ");
}

export function buildAssistantUserPrompt(question: string, matches: RetrievedChunk[]) {
  return `Question: ${question}\n\nInstructions:\n- Answer only from the retrieved resume context below.\n- Use concrete facts such as role names, companies, projects, technologies, dates, metrics, and achievements when relevant.\n- If the context does not support the answer, say so briefly.\n- Prefer the format: Summary, then Proof points.\n\nRetrieved resume context:\n${matches
    .map(
      (match, index) =>
        `${index + 1}. [${match.chunk.sectionId}] ${match.chunk.title} | score=${match.score} | matched=${match.matchedTerms.join(", ") || "none"}\n${match.chunk.content}`
    )
    .join("\n\n")}`;
}
