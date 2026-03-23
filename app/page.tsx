"use client";

import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

import { portfolioData } from "@/data/portfolio";
import { SkillsManifestSection } from "@/components/SkillsManifest";
import { ExperienceStack } from "@/components/ExperienceStack";
import { ProjectsStack } from "@/components/ProjectsStack";
import { Scene } from "@/components/Scene";
import { ChatBot } from "@/components/ChatBot";
import { ContactStage } from "@/components/ContactStage";

const PROFILE_SNAPSHOTS = [
  {
    summary: "UMBC Computer Science graduate building high-concurrency systems and resilient backend platforms.",
    terminal: "status: focused on backend engineering, distributed systems, and full-stack AI delivery",
  },
  {
    summary: "Designing production-grade APIs and data flows that stay calm under load.",
    terminal: "status: shipping resilient services with observability and clean deployment paths",
  },
  {
    summary: "Blending AI product delivery with strong systems thinking across the stack.",
    terminal: "status: connecting LLM experiences to real apps, infra, and automation",
  },
  {
    summary: "Turning complex technical requirements into polished, usable software experiences.",
    terminal: "status: translating product ideas into scalable full-stack execution",
  },
] as const;
const BINARY_COLUMNS = 10;
const BINARY_REPEL_RADIUS = 240;
const BINARY_MAX_PUSH = 64;

type BinaryPointer = {
  x: number;
  y: number;
} | null;

function BinaryColumn({
  id,
  side,
  bits,
  opacityOffset = 0,
}: {
  id: string;
  side: "left" | "right";
  bits: string[];
  opacityOffset?: number;
}) {
  const [pointer, setPointer] = useState<BinaryPointer>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const columnRef = React.useRef<HTMLDivElement | null>(null);
  const totalRows = Math.ceil(bits.length / BINARY_COLUMNS);

  useEffect(() => {
    const updateSize = () => {
      const node = columnRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        const node = columnRef.current;
        if (!node) return;

        const rect = node.getBoundingClientRect();
        setPointer({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      });
    };

    const clearPointer = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      setPointer(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", clearPointer);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return (
    <div
      ref={columnRef}
      id={id}
      aria-hidden="true"
      className="binary-column hidden md:grid"
    >
      {bits.map((bit, index) => {
        const column = index % BINARY_COLUMNS;
        const row = Math.floor(index / BINARY_COLUMNS);
        const homeX = ((column + 0.5) / BINARY_COLUMNS) * size.width;
        const homeY = ((row + 0.5) / totalRows) * size.height;
        const baseOpacity = 0.2 + (((index + opacityOffset) % 5) * 0.08);
        let translateX = 0;
        let translateY = 0;
        let opacity = baseOpacity;

        if (pointer && size.width > 0 && size.height > 0) {
          const dx = homeX - pointer.x;
          const dy = homeY - pointer.y;
          const distance = Math.hypot(dx, dy);

          if (distance < BINARY_REPEL_RADIUS) {
            const force = ((BINARY_REPEL_RADIUS - distance) / BINARY_REPEL_RADIUS) ** 2;
            const safeDistance = Math.max(distance, 0.001);
            translateX = (dx / safeDistance) * BINARY_MAX_PUSH * force;
            translateY = (dy / safeDistance) * BINARY_MAX_PUSH * force;
            opacity = Math.min(0.98, baseOpacity + force * 0.4);
          }
        }

        return (
          <span
            key={`${side}-${index}`}
            className="bit"
            style={{
              opacity,
              transform: `translate(${translateX}px, ${translateY}px)`,
            }}
          >
            {bit}
          </span>
        );
      })}
    </div>
  );
}

export default function Page() {
  const [snapshotIndex, setSnapshotIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [bits, setBits] = useState<string[]>(() =>
    Array.from({ length: 260 }, (_, i) => (i % 2 === 0 ? "1" : "0"))
  );
  const currentSnapshot = PROFILE_SNAPSHOTS[snapshotIndex];

  useEffect(() => {
    setTypedText("");
    let index = 0;
    const nextText = currentSnapshot.terminal;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(nextText.slice(0, index));
      if (index >= nextText.length) {
        window.clearInterval(timer);
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, [currentSnapshot]);

  useEffect(() => {
    const currentTypingDuration = currentSnapshot.terminal.length * 28;
    const timer = window.setTimeout(() => {
      setSnapshotIndex((current) => (current + 1) % PROFILE_SNAPSHOTS.length);
    }, currentTypingDuration + 3600);

    return () => window.clearTimeout(timer);
  }, [currentSnapshot]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBits((current) => {
        const next = [...current];
        const flips = 8;

        for (let index = 0; index < flips; index += 1) {
          const target = Math.floor(Math.random() * next.length);
          next[target] = next[target] === "1" ? "0" : "1";
        }

        return next;
      });
    }, 55);

    return () => window.clearInterval(timer);
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: custom * 0.1, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
  };

  return (
    <div className="relative min-h-screen bg-white text-black selection:bg-black/10 overflow-hidden font-sans">
      <style>{`
        :root { --grid-color: rgba(0, 0, 0, 0.05); }
        .grid-bg {
          background-image: linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
          background-size: 45px 45px;
          position: fixed;
          inset: 0;
          z-index: 0;
        }
        .binary-column {
          position: fixed;
          top: 0;
          bottom: 0;
          width: 34%;
          padding: 24px 28px;
          font-family: 'Courier New', Consolas, monospace;
          font-size: 16px;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.14);
          line-height: 1.48;
          letter-spacing: 0.04em;
          overflow: hidden;
          grid-template-columns: repeat(10, minmax(0, 1fr));
          grid-auto-rows: minmax(0, 1fr);
          align-items: center;
          justify-items: start;
          pointer-events: none;
          z-index: 0;
        }
        #binary-left {
          left: 0;
          mask-image: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.88) 46%, rgba(0,0,0,0.18) 100%);
        }
        #binary-right {
          right: 0;
          mask-image: linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.88) 46%, rgba(0,0,0,0.18) 100%);
        }
        .bit { min-width: 14px; text-shadow: 0 0 0.4px rgba(0,0,0,0.12); transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease; will-change: transform, opacity; }
        .glass-card { 
          background: rgba(255, 255, 255, 0.85); 
          backdrop-filter: blur(10px); 
          border: 1px solid rgba(0,0,0,0.1); 
        }
        @keyframes jump-forward-1 {
          0% { transform: translateX(0px) translateY(0) scale(1, 1); }
          10% { transform: translateX(30px) translateY(-30px) scale(0.9, 1.1); }
          20% { transform: translateX(60px) translateY(0) scale(1, 1); }
          50% { transform: translateX(180px) translateY(-25px) scale(0.9, 1.1); }
          60% { transform: translateX(240px) translateY(0) scale(1, 1); }
          80% { transform: translateX(320px) translateY(-35px) scale(0.9, 1.1); }
          100% { transform: translateX(400px) translateY(0) scale(1, 1); }
        }
        @keyframes jump-forward-2 {
          0% { transform: translateX(0px) translateY(0); }
          15% { transform: translateX(40px) translateY(-45px); }
          30% { transform: translateX(80px) translateY(0); }
          45% { transform: translateX(130px) translateY(-20px); }
          60% { transform: translateX(180px) translateY(0); }
          80% { transform: translateX(260px) translateY(-35px); }
          100% { transform: translateX(340px) translateY(0); }
        }
        @keyframes headline-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
      
      <div className="grid-bg" />
      <BinaryColumn id="binary-left" side="left" bits={bits} />
      <BinaryColumn id="binary-right" side="right" bits={bits} opacityOffset={2} />

      <Scene />
      
      <div className="relative z-10 w-full">
        
        {/* HERO SECTION */}
        <section className="flex min-h-[100svh] flex-col items-center justify-center px-4 pb-32 pt-16 text-center sm:min-h-screen sm:px-6 sm:pb-16 pt-32">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-black/40"
          >
            Welcome to my portfolio
          </motion.p>
          
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="text-5xl font-black leading-none tracking-tighter sm:text-7xl md:text-9xl text-black"
          >
            RAMESH REDDY
          </motion.h1>
          
          <motion.h2
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="mb-10 text-5xl font-black uppercase leading-none sm:text-7xl md:text-9xl text-transparent"
            style={{ WebkitTextStroke: "1px rgba(0,0,0,0.8)" }}
          >
            CHANGAL
          </motion.h2>
          
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="relative mx-auto max-w-3xl glass-card rounded-[2rem] p-6 sm:p-10 shadow-2xl transition-shadow duration-700 hover:shadow-3xl"
          >
            <div
              aria-hidden="true"
              className="absolute left-6 top-6 flex items-center gap-2"
            >
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <h3 className="mb-4 text-sm font-bold tracking-widest text-black/50">PROFILE SNAPSHOT</h3>
            <p className="mb-4 min-h-[4.5rem] text-lg font-medium leading-relaxed text-black/90 sm:text-xl">
              {currentSnapshot.summary}
            </p>
            <div className="w-full max-w-2xl rounded-xl border border-[#16351d] bg-[#061109] p-4 font-mono text-sm text-[#c8ffbf] shadow-[inset_0_1px_0_rgba(140,255,140,0.08),0_18px_45px_rgba(0,0,0,0.18)]">
              <div className="mb-3 flex items-center justify-between gap-3 border-b border-[#17361e] pb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#6f9e74]">
                <span>terminal.live</span>
                <span>active stream</span>
              </div>
              <span className="block min-h-[1.5rem] whitespace-pre-wrap text-sm leading-7 text-[#b7ffad] sm:text-[0.95rem]">
                {typedText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="ml-1 inline-block h-[1em] w-[10px] translate-y-1 bg-[#92ff84] align-baseline"
                />
              </span>
            </div>
          </motion.div>

          <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden bg-black py-1.5">
            <div className="flex w-max whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.32em] text-white/55 motion-safe:animate-[headline-scroll_16s_linear_infinite]">
              <div className="flex shrink-0 whitespace-nowrap pl-6">
                <span className="pr-10">Open to work</span>
                <span className="pr-10 text-white/35">/</span>
                <span className="pr-10">Open to work</span>
                <span className="pr-10 text-white/35">/</span>
                <span className="pr-10">Open to work</span>
                <span className="pr-10 text-white/35">/</span>
                <span className="pr-10">Open to work</span>
                <span className="pr-10 text-white/35">/</span>
                <span className="pr-10">Open to work</span>
                <span className="pr-10 text-white/35">/</span>
                <span className="pr-10">Open to work</span>
                <span className="pr-10 text-white/35">/</span>
              </div>
              <div className="flex shrink-0 whitespace-nowrap pl-6" aria-hidden="true">
                <span className="pr-10">Open to work</span>
                <span className="pr-10 text-white/35">/</span>
                <span className="pr-10">Open to work</span>
                <span className="pr-10 text-white/35">/</span>
                <span className="pr-10">Open to work</span>
                <span className="pr-10 text-white/35">/</span>
                <span className="pr-10">Open to work</span>
                <span className="pr-10 text-white/35">/</span>
                <span className="pr-10">Open to work</span>
                <span className="pr-10 text-white/35">/</span>
                <span className="pr-10">Open to work</span>
                <span className="pr-10 text-white/35">/</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center justify-center sm:px-8 md:px-10 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full flex justify-center"
          >
            <ExperienceStack items={portfolioData.experience} />
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="relative py-20 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectsStack items={portfolioData.projects} />
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="relative min-h-screen py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <SkillsManifestSection />
          </motion.div>
        </section>

        {/* CONTACT SECTION */}
        <ContactStage />
      </div>

      <ChatBot />
    </div>
  );
}
