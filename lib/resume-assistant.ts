import { portfolioData } from "@/data/portfolio";
import { ResumeAssistantAction, ResumeAssistantResponse } from "@/lib/rag/types";

const RESUME_DOWNLOAD_HREF = "/resume/Ramesh-Reddy-Changal-Resume.pdf";

function buildResumeCorpus() {
  const { askRoutes, ...relevantData } = portfolioData;
  return JSON.stringify(relevantData);
}

const resumeCorpus = buildResumeCorpus();
const emailContact = portfolioData.contacts.find((contact) => contact.label === "Email")?.value ?? "rameshreddychangal@gmail.com";
const phoneContact = portfolioData.contacts.find((contact) => contact.label === "Phone")?.value ?? "(667) 260-3005";

function sectionAction(sectionId: string, label: string): ResumeAssistantAction {
  return { type: "scroll", label, target: sectionId };
}

function makeAction(
  type: Pick<ResumeAssistantAction, "type">["type"],
  label: string,
  extras: Partial<ResumeAssistantAction> = {}
): ResumeAssistantAction {
  return { type, label, ...extras };
}

function normalizeSmallTalkInput(lowerQ: string) {
  return lowerQ.replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function looksLikeSmallTalk(lowerQ: string) {
  const normalized = normalizeSmallTalkInput(lowerQ);
  const tokens = normalized.split(" ").filter(Boolean);
  const shortMessage = tokens.length > 0 && tokens.length <= 6;

  const greetingOnly =
    normalized === "hi" ||
    normalized === "hello" ||
    normalized === "hey" ||
    normalized === "good morning" ||
    normalized === "good afternoon" ||
    normalized === "good evening";

  const howAreYou =
    normalized === "how are you" ||
    normalized === "how are u" ||
    normalized === "how r u" ||
    normalized === "hru" ||
    normalized.includes("how are you") ||
    normalized.includes("how are u") ||
    normalized.includes("how r u");

  const whatsUp =
    normalized === "whats up" ||
    normalized === "what is up" ||
    normalized.includes("whats up") ||
    normalized.includes("what is up");

  const shortGreetingLead =
    shortMessage &&
    (normalized.startsWith("hi ") ||
      normalized.startsWith("hello ") ||
      normalized.startsWith("hey "));

  return greetingOnly || howAreYou || whatsUp || shortGreetingLead;
}

function makeSmallTalkResponse(lowerQ: string) {
  const normalized = normalizeSmallTalkInput(lowerQ);

  if (
    normalized === "how are you" ||
    normalized === "how are u" ||
    normalized === "how r u" ||
    normalized === "hru" ||
    normalized.includes("how are you") ||
    normalized.includes("how are u") ||
    normalized.includes("how r u")
  ) {
    return "I'm doing well, thanks for asking.";
  }

  if (
    normalized === "whats up" ||
    normalized === "what is up" ||
    normalized.includes("whats up") ||
    normalized.includes("what is up")
  ) {
    return "Not much, just here to help.";
  }

  return "Hi.";
}

function looksLikeRoleFitQuestion(lowerQ: string) {
  return (
    lowerQ.includes("fit for") ||
    lowerQ.includes("good fit") ||
    lowerQ.includes("right fit") ||
    lowerQ.includes("suitable for") ||
    lowerQ.includes("match for") ||
    lowerQ.includes("ats") ||
    lowerQ.includes("job description") ||
    lowerQ.includes("jd") ||
    lowerQ.includes("role") ||
    lowerQ.includes("position") ||
    lowerQ.includes("hiring") ||
    lowerQ.includes("ml engineer") ||
    lowerQ.includes("ai engineer") ||
    lowerQ.includes("software engineer") ||
    lowerQ.includes("full stack") ||
    lowerQ.includes("backend engineer")
  );
}

function looksLikeRecruiterAvailabilityQuestion(lowerQ: string) {
  return (
    lowerQ.includes("will you join") ||
    lowerQ.includes("would you join") ||
    lowerQ.includes("are you interested") ||
    lowerQ.includes("are you open to") ||
    lowerQ.includes("open to work") ||
    lowerQ.includes("available for") ||
    lowerQ.includes("available to join") ||
    lowerQ.includes("can you join") ||
    lowerQ.includes("looking for work") ||
    lowerQ.includes("interested in joining")
  );
}

function extractCompanyName(question: string) {
  const cleaned = question.replace(/[?!.]/g, " ").trim();
  const joinMatch = cleaned.match(/(?:join|joining)\s+([a-zA-Z0-9&.,' -]+)/i);
  if (joinMatch?.[1]) return joinMatch[1].trim();

  const forMatch = cleaned.match(/(?:at|for)\s+([A-Z][a-zA-Z0-9&.,' -]+)/);
  if (forMatch?.[1]) return forMatch[1].trim();

  return "the role";
}

function makeRoleFitResponse(question: string): string {
  const lowerQ = question.toLowerCase();

  let roleLabel = "the role";
  if (lowerQ.includes("ml engineer")) roleLabel = "the ML Engineer role";
  else if (lowerQ.includes("ai engineer")) roleLabel = "the AI Engineer role";
  else if (lowerQ.includes("software engineer")) roleLabel = "the Software Engineer role";
  else if (lowerQ.includes("full stack")) roleLabel = "the Full Stack role";
  else if (lowerQ.includes("backend")) roleLabel = "the Backend Engineer role";
  else if (lowerQ.includes("jd") || lowerQ.includes("job description")) roleLabel = "the role in the JD";

  return `Yes, I believe I am a strong fit for ${roleLabel}. My background covers AI/ML systems, backend engineering, distributed systems, FastAPI/Node.js services, cloud deployment, and full-stack product work. For more details, please contact me at ${emailContact} or ${phoneContact}.`;
}

function makeAvailabilityResponse(question: string): string {
  const company = extractCompanyName(question);
  return `Yes, I would be open to joining ${company}. I am currently open to opportunities in software engineering, AI/ML, backend, and full-stack roles. For more details, please contact me at ${emailContact} or ${phoneContact}.`;
}

function looksLikeOverallExperienceQuestion(lowerQ: string) {
  const asksForYears = lowerQ.includes("how many years") || lowerQ.includes("years of experience");
  const mentionsOverallExperience =
    lowerQ.includes("experience") ||
    lowerQ.includes("work experience") ||
    lowerQ.includes("overall experience") ||
    lowerQ.includes("total experience");
  const mentionsSpecificTech = TECH_EXPERIENCE_MAP.some((tech) =>
    tech.aliases.some((alias) => lowerQ.includes(alias))
  );

  return asksForYears && mentionsOverallExperience && !mentionsSpecificTech;
}

function makeOverallExperienceResponse(): string {
  return "I have about 1.5 years of direct hands-on experience across internships, research, and teaching roles, plus additional project work outside that. That includes Path Creators in 2019 and 2021, ICRISAT in 2022, and my Graduate Teaching Assistant role at UMBC from August 2024 to May 2025. I do not have full-time industry experience yet, but I do have strong internship, research, and project experience.";
}

function looksLikeAiCapabilityQuestion(lowerQ: string) {
  return (
    lowerQ.includes("rag") ||
    lowerQ.includes("rags") ||
    lowerQ.includes("llm") ||
    lowerQ.includes("llms") ||
    lowerQ.includes("large language model") ||
    lowerQ.includes("retrieval augmented generation")
  );
}

function makeAiCapabilityResponse(): string {
  return "Yes, I can work on RAG and LLM-based systems. My background includes AI agents, prompt engineering, retrieval pipelines, structured outputs, OpenAI and Anthropic API integrations, and backend systems to support production-style AI workflows. I have built related work through my agentic and AI product projects, and I would be glad to discuss the role in more detail.";
}

type TechExperienceMeta = {
  label: string;
  aliases: string[];
  startYear: number;
  internshipEvidence?: string[];
  projectEvidence?: string[];
};

const TECH_EXPERIENCE_MAP: TechExperienceMeta[] = [
  {
    label: "React",
    aliases: ["react", "react.js", "reactjs"],
    startYear: 2022,
    internshipEvidence: [
      "my ICRISAT ML Engineering internship, where I built a React dashboard for non-technical stakeholders",
    ],
    projectEvidence: [
      "my AI SaaS Platform",
      "my Real-Time Distributed Platform",
    ],
  },
  {
    label: "Python",
    aliases: ["python"],
    startYear: 2019,
    internshipEvidence: [
      "my 2019 Path Creators robotics internship",
      "my 2021 Path Creators software engineering internship",
      "my ICRISAT ML Engineering internship",
    ],
    projectEvidence: [
      "my Distributed File System",
      "my ML Prediction Platform",
      "my Real-Time Distributed Platform",
    ],
  },
  {
    label: "Node.js",
    aliases: ["node", "nodejs", "node.js"],
    startYear: 2021,
    internshipEvidence: [
      "my 2021 Path Creators software engineering internship",
    ],
    projectEvidence: [
      "my AI SaaS Platform",
      "my Real-Time Distributed Platform",
    ],
  },
  {
    label: "FastAPI",
    aliases: ["fastapi", "fast api"],
    startYear: 2022,
    internshipEvidence: [
      "my ICRISAT ML Engineering internship",
    ],
    projectEvidence: [
      "my ML Prediction Platform",
    ],
  },
  {
    label: "TensorFlow",
    aliases: ["tensorflow"],
    startYear: 2019,
    internshipEvidence: [
      "my 2019 Path Creators robotics internship",
      "my ICRISAT ML Engineering internship",
    ],
    projectEvidence: [
      "my ML Prediction Platform",
    ],
  },
  {
    label: "PostgreSQL",
    aliases: ["postgresql", "postgres", "psql"],
    startYear: 2021,
    internshipEvidence: [
      "my 2021 Path Creators software engineering internship",
    ],
    projectEvidence: [
      "my AI SaaS Platform",
      "my Real-Time Distributed Platform",
    ],
  },
  {
    label: "Docker",
    aliases: ["docker"],
    startYear: 2022,
    internshipEvidence: [],
    projectEvidence: [
      "my Distributed File System",
      "my ML Prediction Platform",
      "my AI SaaS Platform",
      "my Real-Time Distributed Platform",
    ],
  },
  {
    label: "Kafka",
    aliases: ["kafka"],
    startYear: 2024,
    internshipEvidence: [],
    projectEvidence: [
      "my Real-Time Distributed Platform",
    ],
  },
  {
    label: "Redis",
    aliases: ["redis"],
    startYear: 2024,
    internshipEvidence: [],
    projectEvidence: [
      "my Real-Time Distributed Platform",
    ],
  },
  {
    label: "TypeScript",
    aliases: ["typescript", "ts"],
    startYear: 2024,
    internshipEvidence: [],
    projectEvidence: [
      "my AI SaaS Platform",
    ],
  },
  {
    label: "LangChain",
    aliases: ["langchain"],
    startYear: 2024,
    internshipEvidence: [],
    projectEvidence: [
      "my multi-agent LLM work reflected in my AI agent portfolio projects",
    ],
  },
  {
    label: "LangGraph",
    aliases: ["langgraph"],
    startYear: 2024,
    internshipEvidence: [],
    projectEvidence: [
      "my multi-agent LLM work reflected in my AI agent portfolio projects",
    ],
  },
  {
    label: "MCP",
    aliases: ["mcp", "model context protocol"],
    startYear: 2024,
    internshipEvidence: [],
    projectEvidence: [
      "my multi-agent LLM work reflected in my AI agent portfolio projects",
    ],
  },
];

function looksLikeTechExperienceQuestion(lowerQ: string) {
  return (
    lowerQ.includes("experience in") ||
    lowerQ.includes("experience with") ||
    lowerQ.includes("years of experience") ||
    lowerQ.includes("how many years") ||
    lowerQ.includes("worked with") ||
    lowerQ.includes("using react") ||
    lowerQ.includes("using python") ||
    lowerQ.includes("using node") ||
    lowerQ.includes("using fastapi")
  );
}

function findTechExperienceMeta(lowerQ: string) {
  return TECH_EXPERIENCE_MAP.find((tech) => tech.aliases.some((alias) => lowerQ.includes(alias)));
}

function joinList(items: string[]) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function extractTechnologyFromQuestion(question: string) {
  const lowerQ = question.toLowerCase();
  const knownTech = findTechExperienceMeta(lowerQ);
  if (knownTech) return knownTech.label;

  const cleaned = question.replace(/[?!.:,/\\]/g, " ").replace(/\s+/g, " ").trim();
  const patterns = [
    /experience with ([a-zA-Z0-9.+# -]+)/i,
    /experience in ([a-zA-Z0-9.+# -]+)/i,
    /years of experience (?:in|with) ([a-zA-Z0-9.+# -]+)/i,
    /worked with ([a-zA-Z0-9.+# -]+)/i,
    /using ([a-zA-Z0-9.+# -]+)/i,
  ];

  for (const pattern of patterns) {
    const match = cleaned.match(pattern);
    if (match?.[1]) {
      return match[1].trim().replace(/(do|does|did|have|has|you|your).*$/i, "").trim();
    }
  }

  return null;
}

function makeUnknownTechExperienceResponse(question: string): string {
  const techLabel = extractTechnologyFromQuestion(question) || "that technology";
  return `I have heard about ${techLabel}, but my hands-on work so far has been more focused on the technologies already reflected in my resume and projects. I have not gone deep on ${techLabel} yet, but I would be glad to learn it as part of the opportunity. I am a quick learner and I am comfortable ramping up fast when a role needs it.`;
}

function makeTechExperienceResponse(question: string): string | null {
  const lowerQ = question.toLowerCase();
  const tech = findTechExperienceMeta(lowerQ);
  if (!tech) return null;

  const currentYear = new Date().getFullYear();
  const years = Math.max(1, currentYear - tech.startYear);
  const internshipPart = tech.internshipEvidence && tech.internshipEvidence.length > 0
    ? ` I used ${tech.label} in ${joinList(tech.internshipEvidence)}.`
    : "";
  const projectPart = tech.projectEvidence && tech.projectEvidence.length > 0
    ? ` I have also used it in ${joinList(tech.projectEvidence)}.`
    : "";

  return `I have roughly ${years}+ years of hands-on experience with ${tech.label}, based on using it since ${tech.startYear}.${internshipPart}${projectPart} I do not have direct full-time company experience focused only on ${tech.label}, but I do have real internship and project experience with it.`;
}

async function queryLLM(question: string, history: string[]): Promise<string> {
  const cfToken = process.env.CLF_API_Token?.replace(/^["']|["']$/g, "");
  const cfAccountId = process.env.CLF_ACCOUNT_ID?.replace(/^["']|["']$/g, "");
  const cfModel = process.env.CLF_MODEL?.replace(/^["']|["']$/g, "") || "@cf/meta/llama-3-8b-instruct";

  if (!cfToken || !cfAccountId) {
    return "I am unable to answer right now because the Cloudflare API token or Account ID is missing. Please provide `CLF_API_Token` and `CLF_ACCOUNT_ID` in `.env`.";
  }

  const currentDate = new Date().toLocaleDateString();
  const systemPrompt = `You are ${portfolioData.name.split(" ")[0]}, chatting with visitors on your portfolio website.
Current Date: ${currentDate}.
Answer questions about yourself, your background, skills, hobbies, and projects based on the JSON Context below. Speak in the first person ("I", "my", "mine").
RULES:
1. ONLY answer questions about your professional background, skills, education, hobbies, or life.
2. If the user asks you to write code, solve technical problems, or discuss completely unrelated topics, politely decline and steer the conversation back to your portfolio.
3. If the user asks if you are a fit for a role, asks about a JD, or asks recruiter-style hiring questions: keep it short. Confirm your fit briefly and tell them to contact you directly at ${emailContact} or ${phoneContact}. Do not ask follow-up questions about requirements, outputs, or pipeline details.
4. If the user asks whether you would join a company or whether you are open to work, answer directly and briefly. Say yes if it is a relevant opportunity, mention that you are open to opportunities, and provide contact details.
5. For basic greetings or small talk like "hi" or "how are you", respond very briefly and naturally. Do not give a long self-introduction unless the user asks who you are.
6. Be friendly, concise, and professional.

Context:
${resumeCorpus}`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-4).map((msg) => {
      const lower = msg.toLowerCase();
      const role = lower.startsWith("user:") ? "user" : "assistant";
      let content = msg.replace(/^(user|assistant):\s*/i, "").trim();
      if (content.length > 500) content = content.substring(0, 500) + "... [truncated]";
      return { role, content };
    }),
    { role: "user", content: question.length > 3000 ? question.substring(0, 3000) + "... [truncated]" : question }
  ];

  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/${cfModel}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${cfToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      messages,
      max_tokens: 800
    })
  });

  if (!response.ok) {
    console.error("CF API Error:", await response.text());
    throw new Error("Failed to query Cloudflare AI API.");
  }

  const data = await response.json();
  return data.result?.response?.trim() || "Received an empty response from the AI.";
}

export async function answerResumeQuestion(question: string, history: string[] = []): Promise<ResumeAssistantResponse> {
  const lowerQ = question.toLowerCase().trim();

  if (!lowerQ) {
    return {
      title: "Ask me anything",
      answer: "Hi! I am Ramesh. Ask me about my experience, projects, skills, resume, contact details, or whether I fit a role.",
      suggestions: ["What is your core experience?", "Show me your projects", "Download your resume"],
      sources: [],
      retrieved: [],
      mode: "out-of-scope",
      actions: []
    };
  }

  const actions: ResumeAssistantAction[] = [];
  if (lowerQ.includes("experience") || lowerQ.includes("work") || lowerQ.includes("job") || lowerQ.includes("role")) {
    actions.push(sectionAction("experience", "View Experience"));
  }
  if (lowerQ.includes("project") || lowerQ.includes("build") || lowerQ.includes("built") || lowerQ.includes("portfolio")) {
    actions.push(sectionAction("projects", "View Projects"));
  }
  if (lowerQ.includes("skill") || lowerQ.includes("tech") || lowerQ.includes("stack") || lowerQ.includes("tools")) {
    actions.push(sectionAction("skills", "View Skills"));
  }
  if (lowerQ.includes("contact") || lowerQ.includes("reach") || lowerQ.includes("email") || lowerQ.includes("phone")) {
    actions.push(sectionAction("contact", "Contact Ramesh"));
  }
  if (lowerQ.includes("resume") || lowerQ.includes("cv") || lowerQ.includes("download")) {
    actions.push(makeAction("download", "Download Resume", { href: RESUME_DOWNLOAD_HREF, download: true }));
  }
  if (actions.length === 0) {
    actions.push(sectionAction("experience", "View Experience"));
    actions.push(sectionAction("projects", "View Projects"));
  }

  if (looksLikeSmallTalk(lowerQ)) {
    return {
      title: "Small talk",
      answer: makeSmallTalkResponse(lowerQ),
      suggestions: ["Who is Ramesh?", "Show experience", "Download resume"],
      sources: [],
      retrieved: [],
      mode: "local-rag",
      actions: [],
    };
  }

  if (looksLikeOverallExperienceQuestion(lowerQ)) {
    return {
      title: "Experience summary",
      answer: makeOverallExperienceResponse(),
      suggestions: ["Show experience", "Show projects", "Download resume"],
      sources: [],
      retrieved: [],
      mode: "local-rag",
      actions,
    };
  }

  if (looksLikeAiCapabilityQuestion(lowerQ)) {
    return {
      title: "AI capabilities",
      answer: makeAiCapabilityResponse(),
      suggestions: ["Show projects", "Show skills", "Download resume"],
      sources: [],
      retrieved: [],
      mode: "local-rag",
      actions,
    };
  }

  if (looksLikeTechExperienceQuestion(lowerQ)) {
    const techAnswer = makeTechExperienceResponse(question) ?? makeUnknownTechExperienceResponse(question);
    return {
      title: "Technology experience",
      answer: techAnswer,
      suggestions: ["Show experience", "Show projects", "Download resume"],
      sources: [],
      retrieved: [],
      mode: "local-rag",
      actions,
    };
  }

  if (looksLikeRecruiterAvailabilityQuestion(lowerQ)) {
    return {
      title: "Availability",
      answer: makeAvailabilityResponse(question),
      suggestions: ["View experience", "Contact Ramesh", "Download resume"],
      sources: [],
      retrieved: [],
      mode: "local-rag",
      actions,
    };
  }

  if (looksLikeRoleFitQuestion(lowerQ)) {
    return {
      title: "Role fit",
      answer: makeRoleFitResponse(question),
      suggestions: ["View experience", "View projects", "Download resume"],
      sources: [],
      retrieved: [],
      mode: "local-rag",
      actions,
    };
  }

  let answerText = "Sorry, I couldn't process your request.";
  try {
    answerText = await queryLLM(question, history);
  } catch (err) {
    console.error("LLM Query Error:", err);
    answerText = "I ran into an error trying to process your request. Please ensure the API is reachable or try again later.";
  }

  return {
    title: "AI Response",
    answer: answerText,
    suggestions: ["What is your core experience?", "What technologies do you use?", "Show me your projects"],
    sources: [],
    retrieved: [],
    mode: "local-rag",
    actions,
  };
}
