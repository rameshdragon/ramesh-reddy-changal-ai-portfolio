import { portfolioData } from "@/data/portfolio";
import { RetrievedChunk, ResumeAssistantResponse } from "@/lib/rag/types";

const defaultSuggestions = [
  "What experience does he have?",
  "Show the strongest projects",
  "What technologies does he know?",
];

type Intent = "hire" | "experience" | "skills" | "projects" | "education" | "contact" | "highlights" | "general";

function dedupe(values: string[]) {
  return Array.from(new Set(values));
}

function pickSectionTitle(sectionId?: string) {
  return portfolioData.askRoutes.find((route) => route.sectionId === sectionId)?.title;
}

function pickSuggestions(sectionId?: string) {
  const bySection: Record<string, string[]> = {
    experience: ["Show the strongest projects", "What technologies does he know?", "Why should I hire him?"],
    projects: ["What technologies does he know?", "Why should I hire him?", "Show achievements"],
    skills: ["What experience does he have?", "Show projects", "Why should I hire him?"],
    education: ["Tell me about his background", "Show achievements", "How can I contact him?"],
    highlights: ["Why should I hire him?", "Show projects", "How can I contact him?"],
    contact: ["How can I contact him?", "What experience does he have?", "Show projects"],
    about: ["What experience does he have?", "What technologies does he know?", "Why should I hire him?"],
    hero: ["What does he specialize in?", "Show projects", "Tell me about his background"],
  };

  return bySection[sectionId ?? ""] ?? defaultSuggestions;
}

function detectIntent(question: string): Intent {
  const q = question.toLowerCase();

  if (q.includes("hire") || q.includes("why him") || q.includes("why should")) return "hire";
  if (q.includes("experience") || q.includes("work") || q.includes("career") || q.includes("role") || q.includes("intern")) return "experience";
  if (q.includes("skill") || q.includes("technology") || q.includes("tech") || q.includes("backend") || q.includes("full stack") || q.includes("distributed") || q.includes("ai") || q.includes("ml") || q.includes("cloud")) return "skills";
  if (q.includes("project") || q.includes("built") || q.includes("build")) return "projects";
  if (q.includes("education") || q.includes("degree") || q.includes("university") || q.includes("college")) return "education";
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("call") || q.includes("reach")) return "contact";
  if (q.includes("highlight") || q.includes("achievement") || q.includes("impact") || q.includes("metric")) return "highlights";
  return "general";
}

function sentence(text: string) {
  return text.trim().replace(/\s+/g, " ");
}

function topBySection(matches: RetrievedChunk[], sectionId: string, limit = 3) {
  return matches.filter((match) => match.chunk.sectionId === sectionId).slice(0, limit);
}

function formatProofPoints(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function buildContactAnswer() {
  return [
    "Summary: You can contact Ramesh directly through the details listed in his portfolio.",
    "Proof:",
    formatProofPoints([
      `Email: ${portfolioData.contacts[0].value}`,
      `Phone: ${portfolioData.contacts[1].value}`,
      `Location: ${portfolioData.contacts[2].value}`,
    ]),
  ].join("\n");
}

function buildEducationAnswer() {
  return [
    "Summary: Ramesh has formal computer science training at both graduate and undergraduate levels.",
    "Proof:",
    formatProofPoints(
      portfolioData.education.map((item) => `${item.degree} at ${item.institution} (${item.period})`)
    ),
  ].join("\n");
}

function buildProjectsAnswer(matches: RetrievedChunk[]) {
  const projectMatches = topBySection(matches, "projects", 3);
  const proof = projectMatches.length
    ? projectMatches.map((match) => sentence(`${match.chunk.title}: ${match.chunk.content}`))
    : portfolioData.projects.slice(0, 3).map((project) => sentence(`${project.title}: ${project.summary}. Impact: ${project.impact[0]}`));

  return [
    "Summary: His project work shows strength across AI products, distributed systems, and real-time backend engineering.",
    "Proof:",
    formatProofPoints(proof),
  ].join("\n");
}

function buildSkillsAnswer(matches: RetrievedChunk[]) {
  const skillMatches = topBySection(matches, "skills", 2);
  const experienceMatches = topBySection(matches, "experience", 2);
  const proof = [
    ...skillMatches.map((match) => sentence(match.chunk.content)),
    ...experienceMatches.map((match) => sentence(`${match.chunk.title}: ${match.chunk.content}`)),
  ].slice(0, 4);

  return [
    "Summary: His strongest areas are distributed systems, backend engineering, AI/ML, cloud deployment, and full-stack product development.",
    "Proof:",
    formatProofPoints(proof.length ? proof : [portfolioData.title]),
  ].join("\n");
}

function buildExperienceAnswer(matches: RetrievedChunk[]) {
  const experienceMatches = topBySection(matches, "experience", 3);
  const proof = experienceMatches.length
    ? experienceMatches.map((match) => sentence(`${match.chunk.title}: ${match.chunk.content}`))
    : portfolioData.experience.slice(0, 3).map((item) => sentence(`${item.role} at ${item.company} (${item.period}). ${item.summary}`));

  return [
    "Summary: His experience spans graduate instruction, machine learning research, conversational AI, and robotics engineering.",
    "Proof:",
    formatProofPoints(proof),
  ].join("\n");
}

function buildHighlightsAnswer(matches: RetrievedChunk[]) {
  const highlightMatches = topBySection(matches, "highlights", 3);
  const proof = highlightMatches.length
    ? highlightMatches.map((match) => sentence(`${match.chunk.title}: ${match.chunk.content}`))
    : portfolioData.highlights.slice(0, 3).map((item) => sentence(`${item.value} ${item.label}: ${item.detail}`));

  return [
    "Summary: His profile includes measurable delivery, performance, and scale outcomes.",
    "Proof:",
    formatProofPoints(proof),
  ].join("\n");
}

function buildHireAnswer() {
  return [
    "Summary: He combines strong backend and distributed-systems fundamentals with applied AI/ML work and product delivery that is backed by measurable results.",
    "Proof:",
    formatProofPoints([
      "Built an AI-powered icon generation platform handling 10K+ daily requests and influencing $50K+ in revenue.",
      "Implemented a GFS-inspired distributed file system with 99.9% availability, heartbeat monitoring, and automated failover.",
      "Built a real-time chat application that supported 5,000+ concurrent users with sub-100ms latency.",
      "Applied machine learning at ICRISAT using Python, Scikit-learn, and Pandas, including a fertilizer recommendation model and a 40% improvement in field data reliability.",
      "Worked across teaching, AI chatbot engineering, robotics, cloud deployment, and microservices, which shows both technical depth and range.",
    ]),
  ].join("\n");
}

function buildGeneralAnswer(matches: RetrievedChunk[]) {
  const proof = matches.slice(0, 3).map((match) => sentence(`${match.chunk.title}: ${match.chunk.content}`));

  return [
    "Summary: Here is the most relevant information from Ramesh's resume for your question.",
    "Proof:",
    formatProofPoints(proof),
  ].join("\n");
}

function buildGroundedAnswer(question: string, matches: RetrievedChunk[]) {
  const intent = detectIntent(question);

  switch (intent) {
    case "hire":
      return buildHireAnswer();
    case "experience":
      return buildExperienceAnswer(matches);
    case "skills":
      return buildSkillsAnswer(matches);
    case "projects":
      return buildProjectsAnswer(matches);
    case "education":
      return buildEducationAnswer();
    case "contact":
      return buildContactAnswer();
    case "highlights":
      return buildHighlightsAnswer(matches);
    default:
      return buildGeneralAnswer(matches);
  }
}

export function buildLocalRagAnswer(question: string, matches: RetrievedChunk[]): ResumeAssistantResponse {
  const matchedRoute = portfolioData.askRoutes.find((route) =>
    route.keywords.some((keyword) => question.toLowerCase().includes(keyword.toLowerCase()))
  );

  if (!matches.length) {
    return {
      title: "Resume-only assistant",
      answer:
        "I can only answer questions grounded in Ramesh's resume and portfolio content. Try asking about experience, projects, skills, education, achievements, or contact information.",
      suggestions: defaultSuggestions,
      sources: ["resume-guardrail"],
      retrieved: [],
      mode: "out-of-scope",
    };
  }

  const primarySection = matchedRoute?.sectionId ?? matches[0].chunk.sectionId;
  const title = matchedRoute?.title ?? pickSectionTitle(primarySection) ?? matches[0].chunk.title;
  const answer = buildGroundedAnswer(question, matches);

  return {
    title,
    answer,
    sectionId: primarySection,
    suggestions: dedupe(pickSuggestions(primarySection)).slice(0, 3),
    sources: dedupe(matches.map((match) => match.chunk.id)),
    retrieved: matches,
    mode: "local-rag",
  };
}
