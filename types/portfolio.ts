export type ContactItem = {
  label: string;
  value: string;
  href: string;
};

export type Highlight = {
  value: string;
  label: string;
  detail: string;
};

export type ExperienceItem = {
  company: string;
  location: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
  tools: string[];
};

export type ProjectItem = {
  title: string;
  stack: string[];
  summary: string;
  impact: string[];
  repoUrl?: string;
  liveUrl?: string;
};

export type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  location?: string;
};

export type CertificationItem = {
  title: string;
  issuer: string;
  period: string;
};

export type SkillGroup = {
  title: string;
  summary: string;
  items: string[];
};

export type AskRoute = {
  id: string;
  title: string;
  answer: string;
  sectionId?: string;
  keywords: string[];
};

export type PortfolioData = {
  name: string;
  title: string;
  location: string;
  heroSummary: string;
  overview: string[];
  contacts: ContactItem[];
  highlights: Highlight[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  skillGroups: SkillGroup[];
  askRoutes: AskRoute[];
};
