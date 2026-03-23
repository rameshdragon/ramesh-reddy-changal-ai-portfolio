"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { AnimatePresence, motion, useAnimation, useMotionValue, useSpring, useTransform } from "framer-motion";

import { portfolioData } from "@/data/portfolio";

type TiltCardProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isActive: boolean;
  isMobile: boolean;
};

type ContactActionItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  color: string;
  href?: string;
  action: "navigate" | "copy";
};

function TiltCard({ children, onClick, className = "", isActive, isMobile }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        scale: isMobile && isActive ? 1.04 : 1,
        y: isMobile && isActive ? -8 : 0,
        zIndex: isMobile && isActive ? 20 : 1,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        rotateY: isMobile && isActive ? "8deg" : rotateY,
        rotateX: isMobile && isActive ? "-10deg" : rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-shadow ${isMobile && isActive ? "shadow-2xl" : "shadow-sm"} ${className}`}
    >
      <div
        className={`rounded-[1.4rem] border transition-colors ${isMobile && isActive ? "border-black bg-gray-50" : "border-gray-100 bg-white hover:border-gray-400"}`}
        style={{ transform: "translateZ(26px)", transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function ContactStage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [showDust, setShowDust] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  const phone = useAnimation();
  const whatsapp = useAnimation();
  const mail = useAnimation();
  const linkedIn = useAnimation();
  const github = useAnimation();

  const emailContact = portfolioData.contacts.find((contact) => contact.label === "Email");
  const phoneContact = portfolioData.contacts.find((contact) => contact.label === "Phone");
  const linkedinContact = portfolioData.contacts.find((contact) => contact.label === "LinkedIn");
  const githubContact = portfolioData.contacts.find((contact) => contact.label === "GitHub");

  const contactItems: readonly ContactActionItem[] = [
    {
      id: "email",
      label: emailContact?.value ?? "rameshreddychangal@gmail.com",
      href: emailContact?.href ?? "mailto:rameshreddychangal@gmail.com",
      icon: Mail,
      color: "text-red-500",
      action: "navigate",
    },
    {
      id: "phone",
      label: phoneContact?.value ?? "(667) 260-3005",
      href: phoneContact?.href ?? "tel:+16672603005",
      icon: Phone,
      color: "text-purple-600",
      action: "navigate",
    },
    {
      id: "whatsapp",
      label: "+91 7989411907",
      icon: MessageCircle,
      color: "text-green-500",
      action: "copy",
    },
    {
      id: "linkedin",
      label: linkedinContact?.value ?? "linkedin.com/in/ramesh-reddy-changal-125413247",
      href: linkedinContact?.href ?? "https://www.linkedin.com/in/ramesh-reddy-changal-125413247/",
      icon: Linkedin,
      color: "text-blue-600",
      action: "navigate",
    },
    {
      id: "github",
      label: githubContact?.value ?? "github.com/rameshdragon",
      href: githubContact?.href ?? "https://github.com/rameshdragon",
      icon: Github,
      color: "text-black",
      action: "navigate",
    },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setActiveCardIndex(-1);
      return;
    }

    let currentIndex = 0;
    const cycle = window.setInterval(() => {
      setActiveCardIndex(currentIndex);
      currentIndex = (currentIndex + 1) % contactItems.length;
    }, 1200);

    return () => window.clearInterval(cycle);
  }, [contactItems.length, isMobile]);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

    const runLoop = async () => {
      while (!cancelled) {
        setShowDust(false);
        const leftStart = -420;
        const rightStart = 420;
        const reset = { y: 0, opacity: 1, scale: 1, rotate: 0, scaleY: 1 };

        phone.set({ x: leftStart, ...reset });
        whatsapp.set({ x: leftStart - 72, ...reset });
        mail.set({ x: leftStart - 144, ...reset });
        linkedIn.set({ x: rightStart, ...reset });
        github.set({ x: rightStart + 72, ...reset });

        const walk = (controls: ReturnType<typeof useAnimation>, target: number, direction: number) =>
          controls.start({
            x: target,
            rotate: [0, direction * 14, -direction * 4, direction * 14, 0],
            y: [0, -28, 6, -28, 0],
            scaleY: [1, 0.72, 1.16, 0.72, 1],
            transition: { duration: 3.3, ease: "easeInOut" as const },
          });

        await Promise.all([
          walk(phone, -78, 1),
          walk(whatsapp, -146, 1),
          walk(mail, -214, 1),
          walk(linkedIn, 78, -1),
          walk(github, 146, -1),
        ]);

        const argue = (controls: ReturnType<typeof useAnimation>, direction: number) =>
          controls.start({
            rotate: [direction * 24, direction * -14, direction * 24],
            scale: [1, 1.24, 0.92, 1],
            transition: { duration: 0.28, repeat: 6 },
          });

        argue(phone, -1);
        argue(whatsapp, -1);
        argue(mail, -1);
        argue(linkedIn, 1);
        argue(github, 1);

        await sleep(900);

        const jumpIn = (controls: ReturnType<typeof useAnimation>) =>
          controls.start({
            x: 0,
            y: [-90, 0],
            scaleY: [1.45, 0.54, 1],
            transition: { duration: 0.32, ease: "circIn" as const },
          });

        await Promise.all([jumpIn(phone), jumpIn(whatsapp), jumpIn(mail), jumpIn(linkedIn), jumpIn(github)]);

        setShowDust(true);
        const brawl = {
          x: [-38, 38, -28, 28, 0],
          y: [-26, 26, -36, 36, 0],
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 0.56, 1.38, 1],
          transition: { duration: 0.11, repeat: 22 },
        };

        phone.start(brawl);
        whatsapp.start(brawl);
        mail.start(brawl);
        linkedIn.start(brawl);
        github.start(brawl);

        await sleep(950);

        phone.start({
          y: -260,
          x: -136,
          scale: 2.7,
          rotate: 1260,
          transition: { duration: 0.52, ease: "backOut" as const },
        }).then(() => {
          phone.start({ x: -760, opacity: 0, transition: { duration: 0.4, ease: "anticipate" as const } });
        });

        await sleep(360);

        mail.start({
          y: -220,
          x: 136,
          scale: 2.5,
          rotate: -1260,
          transition: { duration: 0.52, ease: "backOut" as const },
        }).then(() => {
          mail.start({ x: 760, opacity: 0, transition: { duration: 0.4, ease: "anticipate" as const } });
        });

        await sleep(240);
        setShowDust(false);
        await sleep(140);

        const center = { y: 0, x: 0, opacity: 1, scale: 1, rotate: 0, scaleY: 1 };
        whatsapp.set(center);
        linkedIn.set(center);
        github.set(center);

        await sleep(120);

        const bow = {
          rotate: [0, 42, 0],
          scaleY: [1, 0.6, 1],
          y: [0, 18, 0],
          transition: { duration: 1.1, ease: "easeInOut" as const },
        };

        await Promise.all([whatsapp.start(bow), linkedIn.start(bow), github.start(bow)]);
        await sleep(450);

        const exitWalk = (controls: ReturnType<typeof useAnimation>, target: number, direction: number) =>
          controls.start({
            x: target,
            opacity: 0,
            rotate: [0, direction * 24, 0],
            y: [0, -18, 0, -18, 0],
            transition: { duration: 1.45, ease: "circIn" as const },
          });

        await Promise.all([
          exitWalk(whatsapp, -760, -1),
          exitWalk(linkedIn, 760, 1),
          exitWalk(github, 760, 1),
        ]);

        await sleep(120);
      }
    };

    void runLoop();
    return () => {
      cancelled = true;
    };
  }, [github, linkedIn, mail, phone, whatsapp]);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  const renderCardInner = (item: ContactActionItem, index: number) => (
    <div className="flex items-center justify-between p-5 transition-colors">
      <div className="flex items-center gap-5" style={{ transform: "translateZ(20px)" }}>
        <item.icon className={`${item.color} ${(isMobile && activeCardIndex === index) ? "scale-110" : ""} transition-transform group-hover:scale-110`} size={24} strokeWidth={2.2} />
        <span className="text-lg font-bold tracking-tight text-gray-800 sm:text-xl">{item.label}</span>
      </div>
      <div className="flex h-8 w-8 items-center justify-center" style={{ transform: "translateZ(25px)" }}>
        {item.action === "copy" ? (
          copied === item.id ? (
            <Check size={22} className="text-green-500" strokeWidth={3} />
          ) : (
            <Copy size={18} className={`text-gray-200 transition-all group-hover:text-black ${(isMobile && activeCardIndex === index) ? "text-black opacity-100" : "opacity-0"}`} />
          )
        ) : (
          <ArrowUpRight size={18} className={`text-gray-300 transition-all group-hover:text-black ${(isMobile && activeCardIndex === index) ? "text-black opacity-100" : "opacity-0"}`} />
        )}
      </div>
    </div>
  );

  return (
    <section id="contact" className="relative min-h-screen overflow-hidden px-4 py-20 pb-48 sm:px-6 md:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-16 lg:flex-row lg:gap-24">
        <div className="flex flex-1 flex-col text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h1 className="mb-2 text-6xl font-black italic uppercase tracking-tighter text-black sm:text-7xl lg:text-9xl">
              LETS_<br />WORK
            </h1>
            <a
              href="/resume/Ramesh-Reddy-Changal-Resume.pdf"
              download
              className="mb-14 inline-flex items-center justify-center gap-2 text-base font-light uppercase tracking-tight text-[#0a66c2] transition-colors hover:text-[#004182] lg:justify-start sm:text-xl"
            >
              <motion.span
                animate={{ y: [0, 3, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <Download size={18} className="text-[#0a66c2]" />
              </motion.span>
              Download my <span className="border-b-2 border-[#0a66c2] font-bold text-[#0a66c2]">resume</span>
            </a>
          </motion.div>

          <div className="relative flex h-80 w-full items-center justify-center lg:justify-start" style={{ filter: "url(#contact-sketch-effect)" }}>
            <svg className="absolute h-0 w-0">
              <filter id="contact-sketch-effect">
                <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
              </filter>
              <filter id="contact-dust-filter">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="5" />
                <feDisplacementMap in="SourceGraphic" scale="30" />
              </filter>
            </svg>

            <AnimatePresence>
              {showDust ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.5 } }}
                  className="pointer-events-none absolute z-50 flex h-full w-full items-center justify-center"
                  style={{ filter: "url(#contact-dust-filter)" }}
                >
                  {[...Array(14)].map((_, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        scale: [1, 1.4, 0.9, 1.3, 1],
                        rotate: [0, 90, -90, 0],
                        borderRadius: ["30% 70% 70% 30%", "70% 30% 30% 70%", "30% 70% 70% 30%"],
                        x: [0, index % 2 === 0 ? 70 : -70, 0],
                        y: [0, index > 6 ? 70 : -70, 0],
                      }}
                      transition={{ duration: 0.15, repeat: Infinity, delay: index * 0.01 }}
                      className="absolute border-[4px] border-black bg-white"
                      style={{ width: `${110 + index * 3}px`, height: `${90 + index * 2}px`, opacity: 0.98 }}
                    />
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="relative flex w-full items-center justify-center">
              <motion.div animate={mail} className="absolute"><Mail className="h-12 w-12 text-red-500 sm:h-14 sm:w-14" strokeWidth={2.5} /></motion.div>
              <motion.div animate={whatsapp} className="absolute"><MessageCircle className="h-12 w-12 text-green-500 sm:h-14 sm:w-14" strokeWidth={2.5} /></motion.div>
              <motion.div animate={phone} className="absolute"><Phone className="h-12 w-12 text-purple-600 sm:h-14 sm:w-14" strokeWidth={2.5} /></motion.div>
              <motion.div animate={github} className="absolute"><Github className="h-12 w-12 text-black sm:h-14 sm:w-14" strokeWidth={2.5} /></motion.div>
              <motion.div animate={linkedIn} className="absolute"><Linkedin className="h-12 w-12 text-blue-600 sm:h-14 sm:w-14" strokeWidth={2.5} /></motion.div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col gap-8" style={{ perspective: "1000px" }}>
          <div className="text-center lg:text-left">
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-none text-black sm:text-6xl">CONTACT</h2>
            <h2 className="text-4xl font-light uppercase tracking-tighter leading-none text-transparent opacity-20 sm:text-5xl" style={{ WebkitTextStroke: "1px #000" }}>
              DETAILS
            </h2>
          </div>

          <div className="space-y-4 py-4">
            {contactItems.map((item, index) => {
              const card = (
                <TiltCard
                  isMobile={isMobile}
                  isActive={activeCardIndex === index}
                  onClick={item.action === "copy" ? () => void handleCopy(item.label, item.id) : undefined}
                  className="group cursor-pointer"
                >
                  {renderCardInner(item, index)}
                </TiltCard>
              );

              if (item.action === "navigate" && item.href) {
                const external = item.href.startsWith("http");
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="block"
                  >
                    {card}
                  </a>
                );
              }

              return <React.Fragment key={item.id}>{card}</React.Fragment>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
