import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Ramesh Reddy Changal",
  title: "Software Engineer focused on AI agents, distributed systems, backend platforms, and full-stack product engineering",
  location: "Chicago, Illinois",
  heroSummary:
    "Building agentic systems, resilient backend platforms, and real-time applications with a strong bias toward production quality, measurable impact, and fast iteration.",
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
      value: "10K+",
      label: "concurrent users",
      detail:
        "Built and tuned a real-time distributed platform that scaled to more than 10,000 concurrent users.",
    },
    {
      value: "50K+",
      label: "daily records",
      detail:
        "Designed ML-serving pipelines and dashboards processing more than 50,000 daily records with stronger reliability.",
    },
    {
      value: "40%",
      label: "latency reduction",
      detail:
        "Cut API p99 latency from 320ms to 190ms through async query optimization and backend tuning.",
    },
    {
      value: "87%",
      label: "model accuracy",
      detail:
        "Tracked structured ML experiments with MLflow and deployed the strongest model at 87% accuracy.",
    },
  ],
  experience: [
    {
      company: "University of Maryland, Baltimore County",
      location: "Baltimore, Maryland",
      role: "Graduate Teaching Assistant",
      period: "Aug 2024 - May 2025",
      summary:
        "Built evaluation workflows, led technical reviews, and helped students translate formal CS concepts into clean, reproducible implementations.",
      achievements: [
        "Built an automated evaluation pipeline for 150+ students, reduced grading error rate by 30%, and improved outcomes by 20%.",
        "Led weekly code reviews focused on architecture, documentation, and reproducibility using the same habits that keep AI systems maintainable in production.",
        "Explained complex technical designs clearly to non-engineers and often served as the bridge between research ideas and working systems.",
      ],
      tools: ["Claude Code", "Cursor", "Git", "Code Review", "Software Engineering", "Technical Communication"],
    },
    {
      company: "ICRISAT",
      location: "Patancheru, India",
      role: "Research Intern - ML Engineering",
      period: "Sep 2022 - Oct 2022",
      summary:
        "Designed, trained, and deployed ML systems with experiment tracking, FastAPI serving, and dashboards for non-technical stakeholders.",
      achievements: [
        "Designed Decision Tree, Random Forest, and SVM models in Scikit-learn and deployed the best model at 87% accuracy with structured experiment tracking in MLflow.",
        "Built the full platform around the model including Python ingestion, feature engineering, FastAPI serving, and a React dashboard for stakeholder access.",
        "Set up automated retraining and production alerting so model quality could be monitored and improved over time.",
      ],
      tools: ["Python", "Scikit-learn", "MLflow", "FastAPI", "React", "Pandas", "TensorFlow"],
    },
    {
      company: "Path Creators",
      location: "Hyderabad, India",
      role: "Software Engineering Intern",
      period: "Jun 2021 - Jul 2021",
      summary:
        "Built conversational AI features and backend routing logic for an NLP chatbot that guided users and recommended IoT sensors.",
      achievements: [
        "Built conversational AI features for an NLP chatbot that guided users and recommended IoT sensors.",
        "Collaborated in a four-person team to build a chatbot using the RASA framework and improve intent handling quality.",
        "Contributed backend architecture, API integrations, and response routing logic to make the chatbot more reliable for users.",
      ],
      tools: ["Python", "RASA", "Node.js", "REST API", "NLP", "Backend Architecture"],
    },
    {
      company: "Path Creators",
      location: "Hyderabad, India",
      role: "Robotics Engineering Intern",
      period: "Jun 2019 - Jul 2019",
      summary:
        "Built a sensor-based robotics system that combined ROS, computer vision, AI detection, and remote device communication.",
      achievements: [
        "Led a five-person team to ship the robot in a 36-day sprint-driven timeline.",
        "Integrated ROS, OpenCV, TensorFlow, and Raspberry Pi for AI-based obstacle detection.",
        "Built WiFi sensor communication with mobile monitoring through a custom REST API.",
      ],
      tools: ["ROS", "OpenCV", "TensorFlow", "Raspberry Pi", "REST API", "Computer Vision"],
    },
  ],
  projects: [
    {
      title: "Distributed File System",
      stack: ["Python", "gRPC", "Docker", "Distributed Systems"],
      summary:
        "A GFS-inspired distributed file system focused on replication, reliability, and coordinated storage behavior across nodes.",
      impact: [
        "Designed a distributed file system inspired by GFS with core storage and coordination primitives built from scratch.",
        "Used Python and gRPC to coordinate communication between services while Docker simplified multi-node local execution.",
        "Focused on system reliability, distributed design tradeoffs, and clean service boundaries for filesystem operations.",
      ],
      repoUrl: "https://github.com/rameshdragon/distributed-fs",
    },
    {
      title: "ML Prediction Platform with Experiment Tracking",
      stack: ["Python", "Scikit-learn", "TensorFlow", "MLflow", "NumPy", "Pandas", "FastAPI", "Streamlit", "Docker", "GCP"],
      summary:
        "An end-to-end ML platform covering data ingestion, training, experiment tracking, evaluation, retraining, and stakeholder-facing dashboards.",
      impact: [
        "Built the full ML lifecycle with data ingestion, feature engineering, multi-model training, experiment tracking, and automated evaluation.",
        "Improved accuracy by 23% over baseline and reduced preprocessing time by 80%.",
        "Deployed on GCP with Docker, CI/CD, automated retraining on drift, and a Streamlit dashboard for non-technical users.",
      ],
      repoUrl: "https://github.com/rameshdragon/crop-yield",
    },
    {
      title: "AI SaaS Platform - Solo End-to-End Build",
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "OpenAI API", "AWS Lambda", "Docker", "CI/CD"],
      summary:
        "A production AI SaaS product built solo with a full frontend, backend, payments-ready persistence, and deployment pipeline.",
      impact: [
        "Integrated OpenAI image generation into a full production SaaS with a React/TypeScript frontend and Node.js backend.",
        "Ran with real paying users and kept API performance under 100ms while shipping and maintaining the product solo.",
        "Used Docker and GitHub Actions CI/CD for repeatable deployment and operational stability.",
      ],
      repoUrl: "https://github.com/rameshdragon/AI-Icon",
    },
    {
      title: "Real-Time Distributed Platform",
      stack: ["Node.js", "Python", "PostgreSQL", "Kafka", "Redis", "React", "Plotly", "Docker", "GCP"],
      summary:
        "A distributed real-time platform built for high concurrency, low latency, event streaming, and operational visibility.",
      impact: [
        "Scaled to more than 10,000 concurrent users using Kafka for event streaming, Redis for caching, and tuned PostgreSQL queries.",
        "Maintained under 50ms p99 latency at 99.9% uptime on GCP.",
        "Added Plotly dashboards for live monitoring and system visibility.",
      ],
      repoUrl: "https://github.com/rameshdragon/realtime-chat",
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
      title: "AI Agents & Orchestration",
      summary: "Stateful workflows, tool use, reasoning loops, memory, and multi-agent execution.",
      items: ["LangChain", "LangGraph", "MCP", "AutoGen", "Multi-Agent Systems", "Tool Calling", "Memory Management", "RLlib"],
    },
    {
      title: "LLMs / NLP",
      summary: "Agentic workflows, prompt systems, structured outputs, and retrieval-based pipelines.",
      items: ["OpenAI API", "Anthropic Claude API", "Hugging Face Transformers", "Prompt Engineering", "RAG Pipelines", "Structured Outputs"],
    },
    {
      title: "ML / Data",
      summary: "Training, evaluation, tracking, retraining, and simulation-driven experimentation.",
      items: ["Scikit-learn", "TensorFlow", "PyTorch", "MLflow", "NumPy", "Pandas", "Model Evaluation", "OpenAI Gym"],
    },
    {
      title: "Backend / APIs",
      summary: "Async APIs, production backends, databases, and service-oriented systems.",
      items: ["Python 3.10+", "FastAPI", "Flask", "Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Redis"],
    },
    {
      title: "Cloud / Infra",
      summary: "Deployment, containers, cloud services, CI/CD, and scalable infrastructure.",
      items: ["AWS Lambda", "AWS EC2", "AWS S3", "AWS ECS", "GCP Cloud Run", "Docker", "Kubernetes", "GitHub Actions"],
    },
    {
      title: "Frontend / Engineering",
      summary: "Modern frontend delivery with strong engineering fundamentals and product execution.",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Plotly", "Streamlit", "Data Structures", "Algorithms"],
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
