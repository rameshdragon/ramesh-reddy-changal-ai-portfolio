import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function AIGlintIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 1.8c.8 4.7 1.6 5.5 6.3 6.3-4.7.8-5.5 1.6-6.3 6.3-.8-4.7-1.6-5.5-6.3-6.3 4.7-.8 5.5-1.6 6.3-6.3Z" />
      <path d="M18.4 5.2c.35 2.05.7 2.4 2.75 2.75-2.05.35-2.4.7-2.75 2.75-.35-2.05-.7-2.4-2.75-2.75 2.05-.35 2.4-.7 2.75-2.75Z" />
    </svg>
  );
}

type ChatAction = {
  type: "scroll" | "download" | "link";
  label: string;
  target?: string;
  href?: string;
  download?: boolean;
};

type AskResponse = {
  title: string;
  answer: string;
  suggestions?: string[];
  actions?: ChatAction[];
};

function isNavigationQuery(question: string) {
  const normalized = question.toLowerCase().trim();
  return (
    normalized === "contact" ||
    normalized === "cintact" ||
    normalized === "experience" ||
    normalized === "experence" ||
    normalized === "experiance" ||
    normalized === "projects" ||
    normalized === "skills" ||
    normalized.includes("go to contact") ||
    normalized.includes("take me to contact") ||
    normalized.includes("go to experience") ||
    normalized.includes("take me to experience") ||
    normalized.includes("show experience") ||
    normalized.includes("go to projects") ||
    normalized.includes("show projects") ||
    normalized.includes("go to skills") ||
    normalized.includes("show skills")
  );
}

export type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
  actions?: ChatAction[];
  suggestions?: string[];
};

function openHref(action: ChatAction) {
  if (!action.href) return;

  const link = document.createElement("a");
  link.href = action.href;
  if (action.download) {
    link.setAttribute("download", "");
  }
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function ChatBot() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text:
        "Hi, I am Ramesh's portfolio assistant. Ask me about his background, skills, projects, contact details, or resume.",
      suggestions: ["Who is Ramesh?", "Show experience", "Download resume"],
    },
  ]);

  const dockRef = useRef<HTMLDivElement | null>(null);
  const bottomSearchInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatMessages, chatLoading]);

  useEffect(() => {
    if (!chatOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (dockRef.current?.contains(target)) return;
      closePanel();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [chatOpen]);

  const runAction = (action: ChatAction, fromQuickAction = false) => {
    if (action.type === "download" || action.type === "link") {
      openHref(action);
      if (action.type === "download" && !fromQuickAction) {
        setChatMessages((current) => [
          ...current,
          {
            id: Date.now() + 11,
            role: "assistant",
            text: "The resume download has started. If your browser blocks it, use the resume page button instead.",
          },
        ]);
      }
      return;
    }

    if (action.type === "scroll" && action.target) {
      const target = document.getElementById(action.target);
      setChatOpen(false);
      window.setTimeout(() => {
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 220);
    }
  };

  const submitChat = async (presetQuestion?: string) => {
    const question = (presetQuestion ?? chatInput).trim();
    if (!question || chatLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: question,
    };

    setChatMessages((current) => [...current, userMessage]);
    setChatInput("");
    setChatLoading(true);
    setChatOpen(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          history: chatMessages.slice(-8).map((message) => `${message.role}: ${message.text}`),
        }),
      });

      const result = (await response.json()) as AskResponse & { error?: string };
      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text:
          response.ok && !result.error
            ? result.answer
            : "Sorry, I could not answer that properly. Please try rephrasing it or paste the JD if you want a fit analysis.",
        actions: response.ok ? result.actions ?? [] : [],
        suggestions: response.ok ? result.suggestions ?? [] : ["Who is Ramesh?", "Paste JD here", "Download resume"],
      };

      setChatMessages((current) => [...current, assistantMessage]);

      const autoAction = assistantMessage.actions?.find((action) => action.type === "download");
      if (autoAction) {
        window.setTimeout(() => runAction(autoAction), 120);
      }

      const autoScrollAction = assistantMessage.actions?.find((action) => action.type === "scroll");
      if (autoScrollAction && isNavigationQuery(question)) {
        window.setTimeout(() => runAction(autoScrollAction), 180);
      }
    } catch {
      setChatMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "Sorry, I could not answer that just now. Please try again or rephrase the question with a little more detail.",
          suggestions: ["Who is Ramesh?", "Paste JD here", "Download resume"],
        },
      ]);
    } finally {
      setChatLoading(false);
      window.setTimeout(() => bottomSearchInputRef.current?.focus(), 80);
    }
  };

  const closePanel = () => {
    setChatOpen(false);
    window.setTimeout(() => bottomSearchInputRef.current?.blur(), 120);
  };

  return (
    <>
      <style>{`
        @keyframes glow-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
      <svg className="hidden">
        <defs>
          <filter id="chat-liquid" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"
              result="liquid"
            />
            <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
          </filter>
        </defs>
      </svg>
      {chatOpen ? <div className="fixed inset-0 z-[95] bg-black/10 backdrop-blur-[6px]" aria-hidden="true" /> : null}
      <div ref={dockRef} className="fixed bottom-0 left-1/2 z-[100] flex w-[min(94vw,52rem)] -translate-x-1/2 flex-col items-center">
        <div className={`absolute bottom-0 left-0 right-0 rounded-[1rem_1rem_0_0] px-[1.5px] pt-[1.5px] pb-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${chatOpen ? "bg-[linear-gradient(90deg,#ff3b92,#ff5fa2,#ad56ff,#5b7cff,#2ef1d0,#ff3b92,#ff5fa2)] bg-[length:200%_100%] shadow-[-14px_-8px_26px_rgba(255,59,146,0.12),0_-18px_32px_rgba(173,86,255,0.14),14px_-8px_26px_rgba(46,241,208,0.12)]" : "pointer-events-none bg-transparent px-0 pt-0 pb-0 shadow-none"}`} style={chatOpen ? { animation: "glow-shift 8s linear infinite" } : undefined}>
          <div className={`w-full origin-bottom overflow-hidden rounded-[1rem_1rem_0rem_0rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,10,0.98),rgba(5,5,5,0.98))] shadow-[0_-14px_36px_rgba(0,0,0,0.26)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${chatOpen ? "max-h-[72vh] translate-y-0 opacity-100" : "pointer-events-none max-h-0 translate-y-6 opacity-0"}`}>
            <div className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(15,15,15,0.98),rgba(9,9,9,0.96))] px-4 py-3 sm:px-5">
              <div className="flex items-center justify-between gap-4">
                <button type="button" onClick={closePanel} aria-label="Close assistant" className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-[10px] text-white/62 transition-colors hover:border-white/14 hover:bg-white/[0.06] hover:text-white">
                  <X className="h-3 w-3" />
                </button>
                <p className="text-right font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">portfolio assistant</p>
              </div>
            </div>

            <div className="h-[24rem] overflow-y-auto bg-[linear-gradient(180deg,#080808,#060606_48%,#050505)] px-4 py-4 sm:h-[30rem] sm:px-5 sm:py-5">
              <div className="space-y-5">
                {chatMessages.map((message) => (
                  <div key={message.id} className={message.role === "user" ? "ml-auto max-w-[88%]" : "max-w-[92%]"}>
                    <div className={`rounded-[1.6rem] px-4 py-3 leading-7 ${message.role === "user" ? "border border-white/10 bg-white/8 text-white/82" : "border border-white/8 bg-white/[0.02] text-[#d9ffd1] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"}`}>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                    {message.actions?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.actions.map((action) => (
                          <button key={`${message.id}-${action.label}`} type="button" onClick={() => runAction(action, true)} className="inline-flex items-center gap-1 px-0 py-0 text-[11px] tracking-[0.08em] text-white/52 transition-colors hover:text-white/78">
                            {action.label}
                            {(action.type === "link" || action.type === "download") ? <ExternalLink size={12} /> : null}
                          </button>
                        ))}
                      </div>
                    ) : null}
                    {message.suggestions?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.slice(0, 3).map((suggestion) => (
                          <button key={`${message.id}-${suggestion}`} type="button" onClick={() => void submitChat(suggestion)} className="px-0 py-0 text-[11px] tracking-[0.08em] text-white/42 transition-colors hover:text-white/72">
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
                {chatLoading ? <div className="text-sm text-white/35 animate-pulse">Thinking...</div> : null}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(8,8,8,0.92),rgba(5,5,5,0.98))] px-4 py-4 sm:px-5">
              <div className={`relative flex items-center transition-all duration-300 ${chatOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="relative flex w-full items-center rounded-full border border-white/10 bg-black/95 p-0">
                  <form onSubmit={(event) => { event.preventDefault(); void submitChat(); }} className="flex h-12 w-full items-center rounded-full border border-white/10 bg-black px-4">
                    <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/6 text-white/78">
                      <AIGlintIcon className="h-3 w-3" />
                    </div>
                    <input ref={bottomSearchInputRef} type="text" value={chatInput} onChange={(event) => setChatInput(event.target.value)} onFocus={() => setChatOpen(true)} placeholder="Ask about Ramesh, paste a JD, or request the resume" autoComplete="off" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/28" />
                    {chatInput ? (
                      <button type="button" onClick={(event) => { event.stopPropagation(); setChatInput(""); }} className="ml-2 text-white/45 transition-colors hover:text-white">
                        <X size={18} />
                      </button>
                    ) : null}
                    <button type="submit" className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-white hover:bg-white/12">
                      <Search size={16} strokeWidth={2.3} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`relative z-10 mb-5 flex w-full items-center justify-center transition-all duration-300 md:mb-8 ${chatOpen ? "pointer-events-none invisible opacity-0" : "visible opacity-100"}`}>
          <motion.div
            layout
            onClick={() => {
              if (!chatOpen) {
                setChatOpen(true);
                window.setTimeout(() => bottomSearchInputRef.current?.focus(), 600);
              }
            }}
            animate={{ width: chatOpen ? 832 : 196 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1.2 }}
            className={`relative h-8 max-w-[94vw] cursor-text rounded-full ${chatOpen ? "opacity-0" : "opacity-100"}`}
          >
            <div className="pointer-events-none absolute inset-[-1px] rounded-[999px] bg-[linear-gradient(90deg,#ff3b92,#ff5fa2,#ad56ff,#5b7cff,#2ef1d0,#ff3b92,#ff5fa2)] bg-[length:200%_100%] opacity-24 blur-[3px]" style={{ animation: "glow-shift 8s linear infinite" }} />
            <div className="relative z-20 h-full rounded-full border border-transparent bg-[linear-gradient(90deg,#ff3b92,#ff5fa2,#ad56ff,#5b7cff,#2ef1d0,#ff3b92,#ff5fa2)] bg-[length:200%_100%] p-[0.8px]" style={{ animation: "glow-shift 8s linear infinite" }}>
              <div className="flex h-full items-center rounded-full bg-black px-6">
                <div className="flex items-center gap-3">
                  <div className="relative -ml-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/6 text-white/78">
                    <AIGlintIcon className="h-3 w-3" />
                  </div>
                  <span className="whitespace-nowrap pt-[1px] text-[12px] font-medium tracking-[0.16em] text-white/30">Ask me</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-2 mt-2 w-full text-center font-mono text-[10px] uppercase tracking-[0.24em] text-black/42">
          {chatOpen ? "Assistant dock expanded" : "Click to expand"}
        </div>
      </div>
    </>
  );
}
