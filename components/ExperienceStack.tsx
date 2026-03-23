"use client";

import React, { useEffect, useRef, useState } from "react";
import { Briefcase, Calendar, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export type ExperienceAccent = {
  logoColor: string;
  accentHex: string;
  accentSoft: string;
  accentGlow: string;
  accentBadgeBg: string;
};

export type ExperienceTimelineItem = (typeof portfolioData.experience)[number] & {
  id: number;
  year: string;
  duration: string;
  accent: ExperienceAccent;
  isCurrent: boolean;
};

export type ExperienceTimelineCardData = ExperienceTimelineItem & {
  description: string;
  skills: string[];
};

export function isTouchMobileViewport() {
  if (typeof window === "undefined") return false;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const noHover = window.matchMedia("(hover: none)").matches;
  const touchPoints = typeof navigator !== "undefined" ? navigator.maxTouchPoints > 0 : false;
  const touchEvent = "ontouchstart" in window;
  return coarsePointer || noHover || touchPoints || touchEvent || window.innerWidth < 768;
}

export function formatDuration(period: string) {
  const match = period.match(/([A-Za-z]{3})\s+(\d{4})\s+-\s+([A-Za-z]{3})\s+(\d{4})|([A-Za-z]{3})\s+(\d{4})\s+-\s+Present/i);
  if (!match) return period;

  const monthIndex: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };

  const startMonth = match[1] ?? match[5];
  const startYear = match[2] ?? match[6];
  const endMonth = match[3];
  const endYear = match[4];

  if (!startMonth || !startYear) return period;

  const start = new Date(Number(startYear), monthIndex[startMonth.toLowerCase()], 1);
  const end = endMonth && endYear
    ? new Date(Number(endYear), monthIndex[endMonth.toLowerCase()], 1)
    : new Date();

  const months = Math.max(0, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));
  const years = Math.floor(months / 12);
  const remainder = months % 12;

  if (years > 0 && remainder > 0) return `${years} yr ${remainder} mos`;
  if (years > 0) return `${years} yr${years > 1 ? "s" : ""}`;
  return `${Math.max(1, remainder)} mos`;
}

export function getExperienceAccent(index: number): ExperienceAccent {
  const accents: ExperienceAccent[] = [
    {
      logoColor: "bg-yellow-500",
      accentHex: "#eab308",
      accentSoft: "rgba(234,179,8,0.12)",
      accentGlow: "rgba(234,179,8,0.15)",
      accentBadgeBg: "rgba(234,179,8,0.14)",
    },
    {
      logoColor: "bg-emerald-600",
      accentHex: "#10b981",
      accentSoft: "rgba(16,185,129,0.12)",
      accentGlow: "rgba(16,185,129,0.15)",
      accentBadgeBg: "rgba(16,185,129,0.14)",
    },
    {
      logoColor: "bg-blue-600",
      accentHex: "#2563eb",
      accentSoft: "rgba(37,99,235,0.12)",
      accentGlow: "rgba(37,99,235,0.15)",
      accentBadgeBg: "rgba(37,99,235,0.14)",
    },
    {
      logoColor: "bg-teal-600",
      accentHex: "#0d9488",
      accentSoft: "rgba(13,148,136,0.12)",
      accentGlow: "rgba(13,148,136,0.15)",
      accentBadgeBg: "rgba(13,148,136,0.14)",
    },
  ];

  return accents[index % accents.length];
}

function ExperienceTimelineCard({
  exp,
  isActive = false,
  isMuted = false,
  onActivate,
}: {
  exp: ExperienceTimelineCardData;
  isActive?: boolean;
  isMuted?: boolean;
  onActivate?: () => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const isAccentActive = isCardHovered || isActive;
  const isLogoActive = isIconHovered || isAccentActive;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };


  return (
    <div className="relative group/container">
      <div className="absolute left-[-1.1rem] md:left-[-2rem] top-0 bottom-0 w-[6px] md:w-[8px] bg-black/5 rounded-full overflow-hidden border border-black/5 shadow-inner z-0">
        <div
          className="w-full transition-all duration-700 ease-out origin-top"
          style={{
            height: isAccentActive ? "100%" : "0%",
            backgroundColor: exp.accent.accentHex,
            boxShadow: `0 0 15px ${exp.accent.accentGlow}`,
          }}
        />
        <div className="absolute top-8 left-1/2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-[2px] border-white transition-all duration-300 md:h-4 md:w-4 md:border-[3px]" style={isAccentActive ? { backgroundColor: exp.accent.accentHex, transform: "translateX(-50%) scale(1.25)" } : undefined} />
      </div>

      <div className="absolute right-[-1.1rem] md:right-[-2rem] top-0 bottom-0 w-[6px] md:w-[8px] bg-black/5 rounded-full overflow-hidden border border-black/5 shadow-inner z-0">
        <div
          className="w-full transition-all duration-700 ease-out origin-bottom"
          style={{
            height: isAccentActive ? "100%" : "0%",
            backgroundColor: exp.accent.accentHex,
            boxShadow: `0 0 15px ${exp.accent.accentGlow}`,
          }}
        />
        <div className="absolute top-8 left-1/2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-[2px] border-white transition-all duration-300 md:h-4 md:w-4 md:border-[3px]" style={isAccentActive ? { backgroundColor: exp.accent.accentHex, transform: "translateX(-50%) scale(1.25)" } : undefined} />
      </div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsCardHovered(true);
          onActivate?.();
        }}
        onFocus={onActivate}
        onMouseLeave={() => setIsCardHovered(false)}
        className="group relative z-10 overflow-hidden rounded-xl border border-black/10 bg-white p-4 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-6"
        style={{
          borderColor: isAccentActive ? exp.accent.accentHex : undefined,
          boxShadow: isAccentActive ? `0 22px 40px -28px ${exp.accent.accentGlow}` : undefined,
          backgroundImage: isAccentActive
            ? isCardHovered
              ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${exp.accent.accentSoft}, transparent 35%)`
              : `radial-gradient(circle at 50% 22%, ${exp.accent.accentSoft}, transparent 42%)`
            : undefined,
          filter: isMuted ? "blur(1.6px) saturate(0.9)" : "blur(0px)",
          opacity: isMuted ? 0.62 : 1,
          transform: isMuted ? "scale(0.985)" : undefined,
        }}
      >
        <div
          className={`absolute inset-0 pointer-events-none z-20 transition-transform duration-1000 ease-in-out ${isAccentActive ? "translate-x-[200%] skew-x-[-20deg]" : "-translate-x-[100%] skew-x-[-20deg]"}`}
          style={{
            background: "linear-gradient(to right, transparent, rgba(0,0,0,0.02), transparent)",
            width: "60%",
          }}
        />

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row md:gap-5">
          <div className="flex flex-shrink-0 items-center justify-between sm:block">
            <div
              onMouseEnter={() => setIsIconHovered(true)}
              onMouseLeave={() => setIsIconHovered(false)}
              className={`relative z-30 flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-xl text-white shadow-md transition-all duration-300 md:h-14 md:w-14 ${isLogoActive ? "scale-110 rotate-3 shadow-lg" : "scale-100 rotate-0"}`}
              style={{
                backgroundColor: isLogoActive ? exp.accent.accentHex : "#111111",
                boxShadow: isLogoActive ? `0 18px 34px -12px ${exp.accent.accentGlow}` : undefined,
              }}
            >
              <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 ${isLogoActive ? "opacity-100" : "opacity-0"}`}>
                <div className={`absolute inset-0 rounded-full bg-white/40 transition-transform duration-700 ease-out origin-center ${isLogoActive ? "scale-[3]" : "scale-0"}`} />
              </div>
              <Briefcase className="relative z-10 h-6 w-6 md:h-7 md:w-7 text-white" />
            </div>
            <span className="rounded bg-black/5 px-2 py-1 text-xs font-bold text-black shadow-sm sm:hidden border border-black/5">{exp.year}</span>
          </div>

          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <h3 className="pr-2 text-base font-bold text-black transition-colors md:text-lg" style={isAccentActive ? { color: exp.accent.accentHex } : undefined}>
                {exp.role}
              </h3>
              <span className="hidden rounded bg-black/5 px-2 py-1 text-xs font-bold text-black shadow-sm sm:inline-block border border-black/5">{exp.year}</span>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-black/70">{exp.company}</p>
              {exp.isCurrent ? <span className="rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ backgroundColor: exp.accent.accentBadgeBg, color: exp.accent.accentHex }}>Current</span> : null}
            </div>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <p className="flex items-center gap-1 text-xs text-black/60">
                <Calendar size={14} className="text-black/40" /> {exp.period} - {exp.duration}
              </p>
              <p className="flex items-center gap-1 text-xs text-black/60">
                <MapPin size={14} className="text-black/40" /> {exp.location}
              </p>
            </div>

            <div className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 sm:max-h-[500px] sm:opacity-100"}`}>
              <p className="border-t border-black/5 pt-3 text-sm leading-relaxed text-black/70 sm:border-0 sm:pt-0">
                {exp.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span key={skill} className="rounded border border-black/5 bg-black/5 px-2 py-1 text-[10px] font-semibold text-black/70 md:text-[11px] hover:bg-black/10 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsExpanded((current) => !current)}
              className="mt-3 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider sm:hidden"
              style={{ color: exp.accent.accentHex }}
            >
              {isExpanded ? (
                <><span>Show Less</span><ChevronUp size={14} /></>
              ) : (
                <><span>Read More</span><ChevronDown size={14} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperienceStack({ items }: { items: typeof portfolioData.experience }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileTimeline, setIsMobileTimeline] = useState(false);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const timelineItems: ExperienceTimelineItem[] = items.map((item, index) => ({
    ...item,
    id: index + 1,
    year: (item.period.match(/(\d{4})(?!.*\d{4})/)?.[1] ?? String(new Date().getFullYear())),
    duration: formatDuration(item.period),
    accent: getExperienceAccent(index),
    isCurrent: /present/i.test(item.period),
  }));

  useEffect(() => {
    let frame = 0;

    const updateActiveCard = () => {
      const mobile = isTouchMobileViewport();
      setIsMobileTimeline(mobile);

      if (mobile && cardRefs.current.length > 0) {
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
        const center = viewportHeight * 0.5;
        const band = Math.max(88, viewportHeight * 0.18);
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

        setActiveIndex(bestIndex);
      }

      frame = window.requestAnimationFrame(updateActiveCard);
    };

    frame = window.requestAnimationFrame(updateActiveCard);

    return () => window.cancelAnimationFrame(frame);
  }, [timelineItems.length]);

  return (
    <div className="w-full max-w-[850px]">
      <div className="mb-12 flex items-baseline gap-4">
        <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">Experience</h2>
        <div className="h-[2px] flex-grow rounded-full bg-gradient-to-r from-white/20 to-transparent" />
      </div>

      <div className="relative grid grid-cols-1 gap-12 md:gap-16">
        {timelineItems.map((exp, index) => {
          const description = [exp.summary, ...exp.achievements].join(" ");
          return (
            <div
              key={exp.id}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
            >
              <ExperienceTimelineCard
                exp={{
                  ...exp,
                  description,
                  skills: exp.tools,
                }}
                isActive={index === activeIndex}
                isMuted={index !== activeIndex}
                onActivate={() => setActiveIndex(index)}
              />
            </div>
          );
        })}
      </div>

      <footer className="mt-20 pb-4 text-center opacity-40 transition-opacity hover:opacity-100 md:mt-24 md:pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-white/40">End of Timeline</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">exp-mobile-v2</p>
      </footer>
    </div>
  );
}
