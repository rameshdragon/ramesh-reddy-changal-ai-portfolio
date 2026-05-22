import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Ramesh Reddy Changal",
  title: "Software Engineer · Applied AI/ML · Backend Systems · Python",
  location: "Chicago, IL 60616",
  heroSummary:
    "UMBC Computer Science graduate building high-concurrency systems and resilient backend platforms.",
  overview: [
    "Ramesh is a software engineer and computer science graduate who works across AI agents, orchestration systems, backend platforms, distributed systems, and full-stack product development.",
    "His recent work spans multi-agent LLM systems, ML engineering, asynchronous APIs, cloud deployment, experiment tracking, and real-time architectures built for scale and maintainability.",
    "He is strongest when bridging research ideas and production software: translating complex technical designs into reliable systems that ship quickly and stay understandable.",
    "He is currently based in Chicago, Illinois and is actively seeking software engineering roles across backend, AI platform, agent infrastructure, and full-stack systems work.",
  ],
  contacts: [
    {
      label: "Email",
      value: "rameshreddychangal@gmail.com",
      href: "mailto:rameshreddychangal@gmail.com",
    },
    {
      label: "Phone",
      value: "(667) 260-3005",
      href: "tel:+16672603005",
    },
    {
      label: "Location",
      value: "Chicago, IL",
      href: "#contact",
    },
    {
      label: "GitHub",
      value: "github.com/rameshdragon",
      href: "https://github.com/rameshdragon",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/ramesh-reddy-changal-125413247",
      href: "https://www.linkedin.com/in/ramesh-reddy-changal-125413247/",
    },
  ],
  highlights: [
    {
      value: "70%",
      label: "ML accuracy",
      detail:
        "Deployed crop yield prediction model achieving 70% accuracy using Linear Regression and Random Forest.",
    },
    {
      value: "40%",
      label: "data reliability",
      detail:
        "Improved agricultural data reliability by 40% through systematic cleaning of noisy datasets.",
    },
    {
      value: "150+",
      label: "students graded",
      detail:
        "Supported 150+ students across 3 semesters grading assignments in discrete mathematics.",
    },
    {
      value: "36 days",
      label: "delivery sprint",
      detail:
        "Led 4-member team to ship functional IoT obstacle-detection prototype in 36 days.",
    },
  ],
  experience: [
    {
      company: "University of Maryland, Baltimore County",
      location: "Baltimore, MD",
      role: "Graduate Grading Assistant – Discrete Mathematics",
      period: "Mar 2024 - May 2025",
      summary:
        "Supported 150+ students across 3 semesters by grading assignments and exams in probability theory, graph theory, and combinatorics.",
      achievements: [
        "Graded assignments and exams in probability theory, graph theory, and combinatorics for 150+ students across 3 semesters.",
        "Held office hours covering advanced topics when primary TA was unavailable.",
      ],
      tools: ["Discrete Mathematics", "Grading", "Office Hours"],
    },
    {
      company: "International Crops Research Institute for the Semi-Arid Tropics (ICRISAT)",
      location: "Hyderabad, India",
      role: "Machine Learning Research Intern",
      period: "Sep 2022 - Oct 2022",
      summary:
        "Enabled data-driven farming risk assessment for 3-4 research scientists by deploying ML crop yield prediction model.",
      achievements: [
        "Deployed ML crop yield prediction model achieving 70% accuracy using Linear Regression and Random Forest on on-premises server accessible via local WiFi.",
        "Improved data reliability by 40% through systematic cleaning of noisy agricultural datasets; built Streamlit interface eliminating API overhead, making predictions accessible to non-technical users.",
        "Contributed to DHIS2 data collection tool with PostgreSQL integration.",
      ],
      tools: ["Python", "Scikit-learn", "Linear Regression", "Random Forest", "Streamlit", "PostgreSQL", "DHIS2"],
    },
    {
      company: "Path Creators",
      location: "Hyderabad, India",
      role: "Software Development Intern",
      period: "Jun 2021 - Jul 2021",
      summary:
        "Enhanced user engagement by delivering pattern-based conversational chatbot with Python, Flask, and JavaScript.",
      achievements: [
        "Delivered pattern-based conversational chatbot with Python, Flask, and JavaScript.",
        "Designed conversation flow logic and integrated backend-frontend systems for multi-turn interactions.",
      ],
      tools: ["Python", "Flask", "JavaScript"],
    },
    {
      company: "Path Creators",
      location: "Hyderabad, India",
      role: "Software Development Intern",
      period: "Jun 2019 - Jul 2019",
      summary:
        "Built real-time obstacle-detection IoT prototype using Arduino and sensor arrays.",
      achievements: [
        "Built real-time obstacle-detection IoT prototype using Arduino and sensor arrays.",
        "Led hardware-software integration within a 4-member team and shipped functional system in 36 days against a tight client deadline.",
      ],
      tools: ["Arduino", "IoT", "Sensors"],
    },
  ],
  projects: [
    {
      title: "MailMind – AI Gmail Intelligence Platform",
      stack: ["FastAPI", "LangChain", "OAuth 2.0", "LLM", "React"],
      summary:
        "Natural language search interface for Gmail using LangChain to translate user queries into Gmail API filters — no email data stored on backend.",
      impact: [
        "Built natural language search interface using LangChain to translate user queries into Gmail API filters.",
        "OAuth 2.0 with read-only scope enforces access boundaries at the auth layer; FastAPI backend handles async fetching with response caching to keep latency low.",
        "Built NLP-based analytics layer on top of email content — extracts transaction data, categorizes expenses, and tracks spending patterns without requiring users to manually export or tag anything.",
      ],
      repoUrl: "",
    },
    {
      title: "Multi-Agent Research Platform",
      stack: ["Python", "Mixtral-8x7B", "LangChain", "Beautiful Soup", "Hugging Face", "arXiv API"],
      summary:
        "Two-stage LLM verification pipeline to address hallucination on post-training-cutoff topics with live source retrieval and synthesis.",
      impact: [
        "Built two-stage LLM verification pipeline — first Mixtral-8x7B instance retrieves and analyzes 15 live sources (10 web via DDGS + 5 arXiv papers), second instance synthesizes a grounded response from that analysis.",
        "Separated retrieval from generation by design: Beautiful Soup handles web extraction, arXiv API fetches recent papers — prevents retrieval noise from propagating into the final output.",
        "Responses include source citations, making output auditable for topics like recent model releases or policy updates where a confident but wrong answer has real consequences.",
      ],
      repoUrl: "https://github.com/rameshdragon/research_agent",
    },
    {
      title: "Distributed File Storage System",
      stack: ["Python", "Flask", "Docker"],
      summary:
        "GFS-inspired distributed storage system — master node tracks chunk metadata, three storage nodes handle persistence with replication across nodes.",
      impact: [
        "Built GFS-inspired distributed storage system — master node tracks chunk metadata and assignments, three storage nodes handle persistence; files chunked at 512 bytes and replicated across nodes so the system tolerates two simultaneous node failures.",
        "Clients fetch chunk-to-node assignments from master and write directly to storage nodes, keeping master out of the data path and preventing it from becoming a throughput bottleneck.",
        "Implemented Flask heartbeat monitoring with automatic re-replication on node failure; containerized with Docker, sustained 99.9% uptime in failure-injection testing.",
      ],
      repoUrl: "https://github.com/rameshdragon/distributed-fs",
    },
    {
      title: "AI Icon Generation Platform",
      stack: ["Python", "FastAPI", "React", "LangChain", "Llama", "Stable Diffusion", "Hugging Face"],
      summary:
        "Prompt optimization pipeline where user input and style preferences are passed through LangChain to Llama, which rewrites them into a well-structured Stable Diffusion prompt.",
      impact: [
        "Built prompt optimization pipeline where user input and style preferences are passed through LangChain to Llama, which rewrites them into a well-structured Stable Diffusion prompt.",
        "Stable Diffusion runs 4 inference passes on the refined prompt via Hugging Face; all 4 outputs are converted from raw tensor format to web-compatible images and returned together so users can compare results.",
        "FastAPI owns the full backend pipeline — prompt rewriting, inference, format conversion, response delivery; React frontend handles display and selection only.",
      ],
      repoUrl: "https://github.com/rameshdragon/AI-Icon",
    },
  ],
  education: [
    {
      institution: "University of Maryland, Baltimore County",
      degree: "Master of Science in Computer Science - GPA 3.6/4.0",
      period: "Aug 2023 - May 2025",
      location: "Baltimore, Maryland",
    },
    {
      institution: "St. Peter's Engineering College",
      degree: "Bachelor of Technology in Computer Science",
      period: "May 2018 - May 2022",
      location: "Hyderabad, India",
    },
  ],
  certifications: [
    {
      title: "Microsoft AI Classroom Series",
      issuer: "Microsoft",
      period: "Oct 2020",
    },
    {
      title: "Software Engineering Virtual Experience",
      issuer: "J.P. Morgan",
      period: "Oct 2020",
    },
    {
      title: "Asset Management Virtual Experience Program",
      issuer: "J.P. Morgan",
      period: "Aug 2022",
    },
    {
      title: "Python for Everybody",
      issuer: "University of Michigan",
      period: "Nov 2022",
    },
    {
      title: "Advanced Software Engineering Virtual Experience",
      issuer: "Walmart",
      period: "Nov 2022",
    },
  ],
  skillGroups: [
    {
      title: "AI/ML",
      summary: "LLM workflows, RAG pipelines, machine learning, and model training.",
      items: ["LangChain", "RAG Pipelines", "Hugging Face Transformers", "PyTorch", "Scikit-learn", "Stable Diffusion", "LLMs (Mixtral, GPT-4)", "OpenAI API", "Anthropic API", "NumPy", "Pandas"],
    },
    {
      title: "Languages",
      summary: "Core programming languages for backend, scripting, and data work.",
      items: ["Python", "JavaScript", "TypeScript", "Java", "SQL"],
    },
    {
      title: "Backend & APIs",
      summary: "Building async APIs, production backends, and service-oriented systems.",
      items: ["FastAPI", "Flask", "Spring Boot", "Node.js", "REST APIs", "WebSockets", "OAuth 2.0"],
    },
    {
      title: "Frontend",
      summary: "Modern frontend frameworks and styling.",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Infrastructure",
      summary: "Cloud deployment, containers, databases, and DevOps tooling.",
      items: ["Docker", "Kubernetes", "AWS (EC2, S3, Lambda)", "PostgreSQL", "MongoDB", "Redis", "CI/CD", "Git", "Claude Code"],
    },
  ],
  askRoutes: [
    {
      id: "experience",
      title: "Experience overview",
      answer:
        "Ramesh's experience spans graduate teaching at UMBC, ML engineering at ICRISAT, software engineering at Path Creators, and earlier robotics engineering work at Path Creators. His work consistently combines production-minded software engineering with AI and systems thinking.",
      sectionId: "experience",
      keywords: ["experience", "work", "roles", "career", "job", "internship"],
    },
    {
      id: "skills",
      title: "Technical strengths",
      answer:
        "His strongest areas include AI agents and orchestration, backend engineering, distributed systems, async APIs, ML platforms, cloud deployment, and full-stack product engineering with React and TypeScript.",
      sectionId: "skills",
      keywords: ["skills", "technologies", "tech", "stack", "specialize", "specialties"],
    },
    {
      id: "projects",
      title: "Project work",
      answer:
        "My main projects are four: Distributed File System, ML Prediction Platform with Experiment Tracking, AI SaaS Platform - Solo End-to-End Build, and Real-Time Distributed Platform. They span distributed systems, ML platforms, full-stack AI product engineering, and real-time architecture at scale.",
      sectionId: "projects",
      keywords: ["projects", "built", "build", "portfolio", "work samples"],
    },
    {
      id: "education",
      title: "Education",
      answer:
        "Ramesh earned a Master of Science in Computer Science from UMBC with a 3.6 GPA and previously completed his undergraduate computer science degree in Hyderabad.",
      sectionId: "education",
      keywords: ["education", "study", "degree", "university", "college"],
    },
    {
      id: "achievements",
      title: "Standout achievements",
      answer:
        "Standout metrics include 10,000+ concurrent users on a distributed platform, 50,000+ daily records through ML pipelines, 40% API latency reduction, and 87% deployed model accuracy with tracked experimentation.",
      sectionId: "highlights",
      keywords: ["achievements", "impact", "metrics", "results", "highlights", "hire"],
    },
  ],
};
