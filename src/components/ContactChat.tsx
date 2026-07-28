"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playClick } from "@/lib/sound";
import { SPRING_SOFT, SPRING_SNAPPY } from "@/lib/motion";
import { ChatIcon, ArrowRightIcon } from "./ModernIcons";

const MY_EMAIL = "naransuvd57@gmail.com";
const MY_PHONE = "+353 89 200 1759";
const MY_PHONE_TEL = "+353892001759";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TOPICS = [
  { id: "hire", label: "💼 Hiring / a project", reply: "Nice! Tell me a bit about the role or project." },
  { id: "chat", label: "💬 Just want to say hi", reply: "Aww, go ahead — what's on your mind?" },
  { id: "other", label: "❓ Something else", reply: "Sure, tell me what's up." },
] as const;

type TopicId = (typeof TOPICS)[number]["id"];
type Phase = "topic" | "message" | "email" | "sending" | "sent" | "error";

function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={SPRING_SOFT}
      className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-navy px-3.5 py-2.5 font-sans text-[13px] leading-relaxed text-cream shadow-sm dark:bg-cream dark:text-navy"
    >
      {children}
    </motion.div>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={SPRING_SOFT}
      className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-brand-orange/15 px-3.5 py-2.5 font-sans text-[13px] leading-relaxed text-navy shadow-sm dark:text-cream"
    >
      {children}
    </motion.div>
  );
}

export default function ContactChat() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("topic");
  const [topic, setTopic] = useState<TopicId | null>(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [messageDraft, setMessageDraft] = useState("");
  const [emailDraft, setEmailDraft] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const toggle = () => {
    playClick();
    setOpen((v) => !v);
  };

  const pickTopic = (id: TopicId) => {
    playClick();
    setTopic(id);
    setPhase("message");
  };

  const submitMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!messageDraft.trim()) return;
    playClick();
    setMessage(messageDraft.trim());
    setPhase("email");
  };

  const submitEmail = async (e: FormEvent) => {
    e.preventDefault();
    const clean = emailDraft.trim();
    if (!EMAIL_RE.test(clean)) {
      setEmailError("That doesn't look like a valid email — mind double-checking?");
      return;
    }
    setEmailError(null);
    playClick();
    setEmail(clean);
    setPhase("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, message, email: clean }),
      });
      if (!res.ok) throw new Error("failed");
      setPhase("sent");
    } catch {
      setPhase("error");
    }
  };

  const startOver = () => {
    playClick();
    setPhase("topic");
    setTopic(null);
    setMessage("");
    setEmail("");
    setMessageDraft("");
    setEmailDraft("");
    setEmailError(null);
  };

  const topicMeta = TOPICS.find((t) => t.id === topic);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={SPRING_SOFT}
            className="fixed bottom-24 right-5 z-[140] flex w-[320px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-[28px] border border-navy/10 bg-cream shadow-2xl dark:border-cream/10 dark:bg-midnight-card sm:right-6"
          >
            <div className="flex items-center gap-2.5 border-b border-navy/10 px-4 py-3.5 dark:border-cream/10">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-cream dark:bg-cream dark:text-navy">
                <ChatIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-sans text-sm font-semibold text-navy dark:text-cream">Say hi</p>
                <p className="font-sans text-[11px] text-navy/50 dark:text-cream/50">Usually replies within a day</p>
              </div>
            </div>

            <div className="flex max-h-[360px] flex-col gap-2.5 overflow-y-auto px-4 py-4">
              <BotBubble>Hey, I&apos;m Nami 👋 What brings you here?</BotBubble>

              {topicMeta && <UserBubble>{topicMeta.label}</UserBubble>}
              {topicMeta && <BotBubble>{topicMeta.reply}</BotBubble>}

              {phase !== "topic" && phase !== "message" && message && <UserBubble>{message}</UserBubble>}
              {phase !== "topic" && phase !== "message" && message && (
                <BotBubble>Got it — and what&apos;s your email so I can get back to you?</BotBubble>
              )}

              {(phase === "sending" || phase === "sent" || phase === "error") && email && (
                <UserBubble>{email}</UserBubble>
              )}
              {phase === "sending" && <BotBubble>Sending this over…</BotBubble>}
              {phase === "sent" && (
                <BotBubble>Got it, thank you! I&apos;ll get back to you very soon 🎉</BotBubble>
              )}
              {phase === "error" && (
                <BotBubble>
                  Hmm, that didn&apos;t send. Mind reaching me directly at {MY_EMAIL} or {MY_PHONE} instead?
                </BotBubble>
              )}
            </div>

            <div className="border-t border-navy/10 p-3 dark:border-cream/10">
              {phase === "topic" && (
                <div className="flex flex-col gap-1.5">
                  {TOPICS.map((t) => (
                    <motion.button
                      key={t.id}
                      type="button"
                      onClick={() => pickTopic(t.id)}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={SPRING_SNAPPY}
                      className="rounded-2xl border border-navy/15 bg-white px-3.5 py-2.5 text-left font-sans text-[13px] text-navy dark:border-cream/15 dark:bg-white/5 dark:text-cream"
                    >
                      {t.label}
                    </motion.button>
                  ))}
                </div>
              )}

              {phase === "message" && (
                <form onSubmit={submitMessage} className="flex items-end gap-2">
                  <textarea
                    autoFocus
                    rows={2}
                    value={messageDraft}
                    onChange={(e) => setMessageDraft(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 resize-none rounded-2xl border border-navy/15 bg-white px-3.5 py-2 font-sans text-[13px] text-navy outline-none placeholder:text-navy/35 focus:border-navy/30 dark:border-cream/15 dark:bg-white/5 dark:text-cream dark:placeholder:text-cream/35"
                  />
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.9 }}
                    transition={SPRING_SNAPPY}
                    aria-label="Next"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-cream dark:bg-cream dark:text-navy"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </motion.button>
                </form>
              )}

              {phase === "email" && (
                <form onSubmit={submitEmail} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <input
                      autoFocus
                      type="email"
                      value={emailDraft}
                      onChange={(e) => {
                        setEmailDraft(e.target.value);
                        if (emailError) setEmailError(null);
                      }}
                      placeholder="you@gmail.com"
                      className="flex-1 rounded-full border border-navy/15 bg-white px-3.5 py-2 font-sans text-[13px] text-navy outline-none placeholder:text-navy/35 focus:border-navy/30 dark:border-cream/15 dark:bg-white/5 dark:text-cream dark:placeholder:text-cream/35"
                    />
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.9 }}
                      transition={SPRING_SNAPPY}
                      aria-label="Send"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-cream dark:bg-cream dark:text-navy"
                    >
                      <ArrowRightIcon className="h-4 w-4" />
                    </motion.button>
                  </div>
                  {emailError && (
                    <p className="px-1 font-sans text-[11px] text-brand-orange">{emailError}</p>
                  )}
                </form>
              )}

              {phase === "sending" && (
                <div className="flex items-center justify-center gap-1.5 py-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-navy/40 dark:bg-cream/40"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}

              {(phase === "sent" || phase === "error") && (
                <button
                  type="button"
                  onClick={startOver}
                  className="w-full rounded-full border border-navy/15 py-2 text-center font-sans text-[12px] font-medium text-navy/70 hover:bg-navy/5 dark:border-cream/15 dark:text-cream/70 dark:hover:bg-cream/5"
                >
                  Start a new message
                </button>
              )}

              {phase !== "sent" && (
                <p className="mt-2 text-center font-sans text-[11px] text-navy/40 dark:text-cream/40">
                  or reach me directly:{" "}
                  <a
                    href={`mailto:${MY_EMAIL}`}
                    onClick={() => playClick()}
                    className="underline decoration-navy/20 underline-offset-2 hover:text-navy/60 dark:decoration-cream/20 dark:hover:text-cream/60"
                  >
                    {MY_EMAIL}
                  </a>{" "}
                  ·{" "}
                  <a
                    href={`tel:${MY_PHONE_TEL}`}
                    onClick={() => playClick()}
                    className="underline decoration-navy/20 underline-offset-2 hover:text-navy/60 dark:decoration-cream/20 dark:hover:text-cream/60"
                  >
                    {MY_PHONE}
                  </a>
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close chat" : "Say hi"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        transition={SPRING_SNAPPY}
        className="fixed bottom-5 right-5 z-[140] flex h-14 w-14 items-center justify-center rounded-full bg-navy text-cream shadow-lg dark:bg-cream dark:text-navy sm:right-6"
      >
        {!open && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-brand-orange/40"
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={SPRING_SNAPPY}
            className="relative flex items-center justify-center"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <ChatIcon className="h-5 w-5" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
