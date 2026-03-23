import { portfolioData } from "@/data/portfolio";

export type AskResult = {
  title: string;
  answer: string;
  sectionId?: string;
};

const fallback: AskResult = {
  title: "Ask about Ramesh",
  answer:
    "Try asking about experience, skills, projects, education, achievements, or what he specializes in. Responses are grounded in the resume data used to build this portfolio.",
};

export function answerPortfolioQuestion(input: string): AskResult {
  const normalized = input.toLowerCase().trim();

  if (!normalized) return fallback;

  const scored = portfolioData.askRoutes
    .map((route) => ({
      route,
      score: route.keywords.reduce(
        (total, keyword) =>
          total + (normalized.includes(keyword.toLowerCase()) ? 2 : 0),
        0
      ),
    }))
    .sort((a, b) => b.score - a.score);

  if (scored[0]?.score) {
    const match = scored[0].route;
    return {
      title: match.title,
      answer: match.answer,
      sectionId: match.sectionId,
    };
  }

  if (normalized.includes("contact") || normalized.includes("email")) {
    return {
      title: "Contact",
      answer:
        "You can reach Ramesh at rameshreddychangal@gmail.com or by phone at (667) 260-3005. He is currently based in Chicago, Illinois.",
      sectionId: "contact",
    };
  }

  return fallback;
}
