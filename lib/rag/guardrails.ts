const allowedTopicHints = [
  "experience",
  "work",
  "career",
  "projects",
  "skills",
  "technology",
  "education",
  "background",
  "achievements",
  "highlights",
  "contact",
  "email",
  "phone",
  "location",
  "resume",
  "portfolio",
  "ramesh",
  "hire",
  "backend",
  "distributed",
  "ai",
  "ml",
  "full stack",
  "cloud",
];

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "for",
  "from",
  "he",
  "him",
  "his",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "should",
  "tell",
  "that",
  "the",
  "them",
  "this",
  "to",
  "today",
  "what",
  "when",
  "where",
  "who",
  "why",
  "with",
  "you",
]);

export function normalizeText(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function tokenize(text: string) {
  return normalizeText(text)
    .split(" ")
    .filter((token) => token && token.length > 1 && !stopWords.has(token));
}

export function isLikelyResumeScopedQuestion(question: string) {
  const normalized = normalizeText(question);
  return allowedTopicHints.some((hint) => normalized.includes(hint));
}
