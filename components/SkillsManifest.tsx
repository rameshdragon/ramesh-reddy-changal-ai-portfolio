"use client";

import React, { useEffect, useState } from "react";
import {
  Bot,
  Box,
  Cloud,
  Cpu,
  Database,
  Eye,
  Github,
  Globe,
  Layers,
  Radio,
  Server,
  Smartphone,
  Workflow,
  Wrench,
} from "lucide-react";

const SKILL_EXPLAINERS = [
  {
    label: "Backend / APIs",
    text:
      "My backend work centers on designing reliable APIs, service boundaries, and distributed communication patterns that stay stable under load. I focus on microservice orchestration, real-time messaging, and data flow decisions that keep systems responsive even as concurrency increases. The goal is not just to make endpoints work, but to make the whole backend layer feel structured, resilient, and ready for production scale.",
  },
  {
    label: "AI / ML / Data",
    text:
      "In AI and data systems, I work on practical machine learning pipelines that connect models to real product behavior. That includes applied NLP, prediction workflows, computer vision, and the surrounding data preparation needed to keep results trustworthy. I care about turning models into usable systems, where experimentation, training, and deployment all support a clear outcome instead of staying as isolated research pieces.",
  },
  {
    label: "Frontend / Product",
    text:
      "My frontend approach is rooted in building interfaces that feel polished, responsive, and easy to trust. I use React-based product patterns to connect strong visual structure with clean state handling and fast interactions. Rather than treating the frontend as a thin layer, I see it as the place where system capability becomes understandable, usable, and valuable to the person on the other side of the screen.",
  },
  {
    label: "Cloud / DevOps",
    text:
      "For cloud and DevOps work, I focus on deployment paths that make systems easier to run, observe, and scale over time. That includes infrastructure choices, automation workflows, and operational thinking around reliability, cost, and maintainability. I like environments where releases are predictable, services are observable, and the platform can evolve without turning basic delivery into a fragile or manual process.",
  },
];

const SKILLS = [
  { id: "typescript", label: "TypeScript", icon: Layers, color: "#3178C6" },
  { id: "python", label: "Python", icon: Cpu, color: "#3776AB" },
  { id: "react", label: "React", icon: Globe, color: "#61DAFB" },
  { id: "node", label: "Node.js", icon: Database, color: "#339933" },
  { id: "flask", label: "Flask", icon: Server, color: "#111827" },
  { id: "langchain", label: "LangChain", icon: Workflow, color: "#111111" },
  { id: "langgraph", label: "LangGraph", icon: Workflow, color: "#0F766E" },
  { id: "mcp", label: "MCP", icon: Workflow, color: "#7C3AED" },
  { id: "autogen", label: "AutoGen", icon: Bot, color: "#8B5CF6" },
  { id: "fastapi", label: "FastAPI", icon: Server, color: "#009688" },
  { id: "postgresql", label: "PostgreSQL", icon: Database, color: "#336791" },
  { id: "redis", label: "Redis", icon: Database, color: "#DC382D" },
  { id: "tensorflow", label: "TensorFlow", icon: Bot, color: "#FF6F00" },
  { id: "pytorch", label: "PyTorch", icon: Bot, color: "#EE4C2C" },
  { id: "mlflow", label: "MLflow", icon: Wrench, color: "#0194E2" },
  { id: "docker", label: "Docker", icon: Box, color: "#2496ED" },
  { id: "kubernetes", label: "Kubernetes", icon: Box, color: "#326CE5" },
  { id: "aws", label: "AWS", icon: Cloud, color: "#FF9900" },
  { id: "github-actions", label: "GitHub Actions", icon: Github, color: "#181717" },
  { id: "plotly", label: "Plotly", icon: Eye, color: "#3F4F75" },
  { id: "streamlit", label: "Streamlit", icon: Smartphone, color: "#FF4B4B" },
  { id: "rag", label: "RAG", icon: Radio, color: "#2563EB" },
];

const TOP_SKILLS = SKILLS;

export function SkillsManifestSection() {
  const [activeExplainerIndex, setActiveExplainerIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveExplainerIndex((current) => (current + 1) % SKILL_EXPLAINERS.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  const activeExplainer = SKILL_EXPLAINERS[activeExplainerIndex];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden px-6 pb-20 pt-8 font-sans selection:bg-black selection:text-white sm:px-12 sm:pt-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <header className="z-20">
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight text-black sm:text-6xl">
            Skills
            <span className="mt-2 block h-1.5 w-12 bg-black" />
          </h2>
        </header>

        <div className="z-10 opacity-30">
          <span className="border-b border-black pb-1 text-[9px] font-black uppercase tracking-[0.4em]">
            Inventory_v.2.0
          </span>
        </div>
      </div>

      <div className="mb-10 max-w-5xl">
        <p className="mb-3 font-mono text-[10px] font-black uppercase tracking-[0.28em] text-black/35 sm:text-[11px]">
          {activeExplainer.label}
        </p>
        <p className="max-w-4xl text-[14px] font-semibold leading-7 text-black/75 text-justify transition-all duration-500 sm:text-[16px] sm:leading-8">
          {activeExplainer.text}
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-black py-5 shadow-2xl sm:py-7">
          <div className="flex whitespace-nowrap animate-[marquee-right_45s_linear_infinite] hover:[animation-play-state:paused]">
            {[...SKILLS, ...SKILLS].map((skill, index) => (
              <div
                key={`left-${skill.id}-${index}`}
                className="group inline-flex items-center gap-4 border-r border-white/5 px-8 sm:gap-6 sm:px-16"
              >
                <div className="rounded-lg bg-white/10 p-2 transition-all duration-300 group-hover:bg-white/20">
                  <skill.icon size={24} style={{ color: skill.color }} className="sm:h-7 sm:w-7" />
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white transition-all group-hover:tracking-normal sm:text-4xl">
                  {skill.label}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-black py-5 shadow-2xl sm:py-7">
          <div className="flex whitespace-nowrap animate-[marquee-left_45s_linear_infinite] hover:[animation-play-state:paused]">
            {[...SKILLS.slice().reverse(), ...SKILLS.slice().reverse()].map((skill, index) => (
              <div
                key={`right-${skill.id}-${index}`}
                className="group inline-flex items-center gap-4 border-r border-white/5 px-8 sm:gap-6 sm:px-16"
              >
                <div className="rounded-lg bg-white/10 p-2 transition-all duration-300 group-hover:bg-white/20">
                  <skill.icon size={24} style={{ color: skill.color }} className="sm:h-7 sm:w-7" />
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white transition-all group-hover:tracking-normal sm:text-4xl">
                  {skill.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {TOP_SKILLS.map((skill) => (
          <div
            key={skill.id}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-3 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.05)] backdrop-blur-sm"
          >
            <skill.icon size={15} style={{ color: skill.color }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/72 sm:text-xs">
              {skill.label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (max-width: 640px) {
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-60%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-60%); }
            100% { transform: translateX(0); }
          }
        }
      `}</style>
    </div>
  );
}
