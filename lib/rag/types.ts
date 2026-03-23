export type ResumeChunk = {
  id: string;
  sectionId: string;
  title: string;
  content: string;
  keywords: string[];
};

export type RetrievedChunk = {
  chunk: ResumeChunk;
  score: number;
  matchedTerms: string[];
};

export type ResumeAssistantMode = "local-rag" | "out-of-scope";

export type ResumeAssistantAction = {
  type: "scroll" | "download" | "link";
  label: string;
  target?: string;
  href?: string;
  download?: boolean;
};

export type ResumeAssistantResponse = {
  title: string;
  answer: string;
  sectionId?: string;
  suggestions: string[];
  sources: string[];
  retrieved: RetrievedChunk[];
  mode: ResumeAssistantMode;
  actions?: ResumeAssistantAction[];
};
