"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Folder,
  Github,
  GitFork,
  Layers,
  Star,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

function isTouchMobileViewport() {
  if (typeof window === "undefined") return false;
  const narrowViewport = window.innerWidth < 768;
  if (!narrowViewport) return false;

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const noHover = window.matchMedia("(hover: none)").matches;
  const touchPoints = typeof navigator !== "undefined" ? navigator.maxTouchPoints > 0 : false;
  const touchEvent = "ontouchstart" in window;
  return coarsePointer || noHover || touchPoints || touchEvent || narrowViewport;
}

type ProjectShowcaseCard = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  stars: number;
  forks: number;
  color: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  progress: number;
  repoUrl?: string;
  liveUrl?: string;
};

function getProjectMeta(project: (typeof portfolioData.projects)[number], index: number) {
  const haystack = `${project.title} ${project.stack.join(" ")}`.toLowerCase();

  if (haystack.includes("icon") || haystack.includes("ai") || haystack.includes("dall")) {
    return { icon: Cpu, color: "#EAB308", stars: 124, forks: 18, progress: 6 };
  }
  if (haystack.includes("distributed") || haystack.includes("grpc") || haystack.includes("file system")) {
    return { icon: Database, color: "#0EA5E9", stars: 89, forks: 12, progress: 4 };
  }
  if (haystack.includes("chat") || haystack.includes("socket") || haystack.includes("kafka")) {
    return { icon: Box, color: "#22C55E", stars: 210, forks: 45, progress: 7 };
  }
  if (haystack.includes("react") || haystack.includes("dashboard") || haystack.includes("yield")) {
    return { icon: Layers, color: "#6366F1", stars: 562, forks: 82, progress: 5 };
  }

  const fallbacks = [
    { icon: Cpu, color: "#EAB308", stars: 124, forks: 18, progress: 6 },
    { icon: Database, color: "#0EA5E9", stars: 89, forks: 12, progress: 4 },
    { icon: Box, color: "#22C55E", stars: 210, forks: 45, progress: 7 },
    { icon: Layers, color: "#6366F1", stars: 562, forks: 82, progress: 5 },
  ] as const;

  return fallbacks[index % fallbacks.length];
}

function DotIndicator({ activeCount, isActive = false, total = 8 }: { activeCount: number; isActive?: boolean; total?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
            index < activeCount
              ? isActive
                ? "bg-green-500 opacity-100"
                : "bg-black opacity-80 group-hover:bg-green-500 group-hover:opacity-100"
              : "bg-black/10"
          }`}
          style={{ transitionDelay: index < activeCount ? `${index * 50}ms` : "0ms" }}
        />
      ))}
    </div>
  );
}

function ProjectCard({ project, isMobileActive = false, setCardRef }: { project: ProjectShowcaseCard; isMobileActive?: boolean; setCardRef?: (node: HTMLDivElement | null) => void }) {
  const Icon = project.icon;
  const [mobileShineKey, setMobileShineKey] = useState(0);
  const [showMobileShine, setShowMobileShine] = useState(false);
  const [hoverShineKey, setHoverShineKey] = useState(0);
  const [showHoverShine, setShowHoverShine] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (isMobileActive) {
      setMobileShineKey((current) => current + 1);
      setShowMobileShine(true);
      timeoutId = setTimeout(() => {
        setShowMobileShine(false);
      }, 1400);
    } else {
      setShowMobileShine(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isMobileActive]);

  const triggerHoverShine = () => {
    setHoverShineKey((current) => current + 1);
    setShowHoverShine(true);
    window.setTimeout(() => {
      setShowHoverShine(false);
    }, 1400);
  };

  return (
    <div
      ref={setCardRef}
      onMouseEnter={triggerHoverShine}
      className={`group relative overflow-hidden rounded-2xl border-2 border-black bg-white p-6 transition-all duration-500 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${isMobileActive ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : ""}`}
    >
      <div
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-5 blur-[60px] transition-opacity duration-700 group-hover:opacity-10"
        style={{ backgroundColor: project.color }}
      />
      {showMobileShine ? (
        <div
          key={`mobile-${mobileShineKey}`}
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(110deg,transparent_18%,rgba(34,197,94,0.12)_40%,rgba(34,197,94,0.45)_50%,rgba(34,197,94,0.12)_60%,transparent_82%)] motion-safe:animate-[project-green-shine_1.35s_cubic-bezier(0.22,1,0.36,1)_1]"
        />
      ) : null}
      {showHoverShine ? (
        <div
          key={`hover-${hoverShineKey}`}
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(110deg,transparent_18%,rgba(34,197,94,0.12)_40%,rgba(34,197,94,0.45)_50%,rgba(34,197,94,0.12)_60%,transparent_82%)] motion-safe:animate-[project-green-shine_1.35s_cubic-bezier(0.22,1,0.36,1)_1]"
        />
      ) : null}

      <div className="relative z-20">
        <div className="mb-6 flex items-start justify-between">
          <div className="rounded-xl bg-black p-3 text-white shadow-lg transition-all duration-500 group-hover:scale-110">
            <Icon size={26} />
          </div>
          <div className="flex gap-4 text-black/30">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="transition-colors hover:text-black"
              >
                <Github size={20} className="cursor-pointer" />
              </a>
            ) : (
              <Github size={20} className="cursor-pointer transition-colors hover:text-black" />
            )}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live link`}
                className="transition-colors hover:text-black"
              >
                <ExternalLink size={20} className="cursor-pointer" />
              </a>
            ) : null}
          </div>
        </div>

        <h3 className="mb-2 text-2xl font-black uppercase italic tracking-tighter text-black transition-transform duration-300 group-hover:translate-x-1">
          {project.title}
        </h3>

        <div className="mb-4">
          <DotIndicator activeCount={project.progress} isActive={isMobileActive} />
        </div>

        <p className="mb-8 line-clamp-2 h-10 text-[13px] font-medium leading-relaxed text-black/60">
          {project.description}
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-black/10 bg-black/5 px-2.5 py-1 text-[10px] font-bold font-mono text-black transition-colors hover:border-black"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5 border-t-2 border-black/5 pt-5 font-mono text-[11px] text-black/40">
          <div className="flex cursor-default items-center gap-1.5 transition-colors hover:text-black">
            <Star size={14} />
            <span className="font-bold">{project.stars}</span>
          </div>
          <div className="flex cursor-default items-center gap-1.5 transition-colors hover:text-black">
            <GitFork size={14} />
            <span className="font-bold">{project.forks}</span>
          </div>
          <div className="ml-auto">
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors ${isMobileActive ? "text-green-600" : "text-black/30 group-hover:text-green-600"}`}>
              v{project.progress}.0.1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsStack({ items }: { items: typeof portfolioData.projects }) {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [isMobileProjectView, setIsMobileProjectView] = useState(false);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const projects: ProjectShowcaseCard[] = items.slice(0, 4).map((project, index) => {
    const meta = getProjectMeta(project, index);
    return {
      id: index + 1,
      title: project.title,
      description: project.summary,
      tech: project.stack.slice(0, 3),
      stars: meta.stars,
      forks: meta.forks,
      color: meta.color,
      icon: meta.icon,
      progress: meta.progress,
      repoUrl: project.repoUrl,
      liveUrl: project.liveUrl,
    };
  });

  useEffect(() => {
    let frame = 0;

    const updateActiveCard = () => {
      const mobile = isTouchMobileViewport();
      setIsMobileProjectView(mobile);

      if (mobile && cardRefs.current.length > 0) {
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
        const center = viewportHeight * 0.5;
        const band = Math.max(90, viewportHeight * 0.18);
        let bestIndex = 0;
        let bestScore = Number.NEGATIVE_INFINITY;

        cardRefs.current.forEach((node, index) => {
          if (!node) return;
          const rect = node.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - center);
          const overlapsBand = rect.top <= center + band && rect.bottom >= center - band;
          const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
          const score = (overlapsBand ? 100000 : 0) + visibleHeight - distance;

          if (score > bestScore) {
            bestScore = score;
            bestIndex = index;
          }
        });

        setActiveMobileIndex(bestIndex);
      }

      frame = window.requestAnimationFrame(updateActiveCard);
    };

    frame = window.requestAnimationFrame(updateActiveCard);
    return () => window.cancelAnimationFrame(frame);
  }, [projects.length]);

  return (
    <div className="min-h-screen w-full bg-white p-6 font-sans text-black selection:bg-black selection:text-white md:p-16">
      <style>{`
        @keyframes project-green-shine {
          0% { transform: translateX(-135%) skewX(-18deg); }
          100% { transform: translateX(135%) skewX(-18deg); }
        }
      `}</style>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-black/40">
              <Terminal size={14} />
              <span className="uppercase tracking-[0.4em]">Session: /usr/local/bin/projects</span>
            </div>
            <h2 className="text-6xl font-black uppercase italic leading-[0.8] tracking-tighter text-black md:text-8xl">
              Projects<span className="text-black/10">.log</span>
            </h2>
          </div>

          <div className="flex items-center gap-6 rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Index</span>
              <span className="font-mono text-3xl font-bold leading-none text-black">04</span>
            </div>
            <div className="h-10 w-px bg-black/10" />
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-black/30">Network</span>
              <span className="mt-1 flex items-center gap-2 font-mono text-[10px] font-bold text-black">
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22C55E] animate-pulse" />
                STABLE
              </span>
            </div>
          </div>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isMobileActive={isMobileProjectView && index === activeMobileIndex}
              setCardRef={(node) => {
                cardRefs.current[index] = node;
              }}
            />
          ))}
        </motion.main>

        <footer className="mt-24 flex flex-col items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-black/20 sm:flex-row">
          <div className="flex items-center gap-8 border-l-2 border-black pl-6">
            <span className="font-bold text-black/40">&copy; 2024 SYSTEM_RECALL</span>
            <span className="hidden sm:inline">Build: 1.0.4-LATEST</span>
          </div>
          <div className="flex gap-6">
            <span className="flex cursor-pointer items-center gap-2 transition-colors hover:text-black"><Folder size={12} /> Root</span>
            <span className="flex cursor-pointer items-center gap-2 transition-colors hover:text-black"><Code2 size={12} /> Source</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
