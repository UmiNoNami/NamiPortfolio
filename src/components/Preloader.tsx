"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";

// "Hello" in four languages, each written in its own native script — kept
// short deliberately: this used to cycle through eight words at 300ms each
// (2.4s) plus a 700ms exit, well over 3s total. Now it's four words at
// 150ms each (0.6s) plus a 300ms exit, landing under the ~0.8–1s ceiling.
const greetings = ["Hello", "Сайн байна уу", "こんにちは", "你好"];

const STEP_MS = 150;
const EXIT_MS = 300;
const STORAGE_KEY = "nami-intro-seen";

/**
 * A brief, one-time welcome screen: cycles through "Hello" in four languages
 * before fading out to reveal the site. Only plays once per browser session
 * (via sessionStorage) so repeat navigation doesn't replay it, and is
 * skipped entirely for prefers-reduced-motion — it never delays access to
 * the portfolio either way, since the whole thing resolves in under a
 * second, well within what's needed to not feel like a loading gate.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);

    // ?intro=1 forces it to replay even if this tab has already seen it —
    // handy for testing/demoing without opening a private window.
    const forceReplay = new URLSearchParams(window.location.search).has("intro");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      // Respect the preference outright — no flashing word cycle, no
      // full-screen takeover, just mark it seen and get out of the way.
      sessionStorage.setItem(STORAGE_KEY, "1");
      return;
    }

    if (!forceReplay && sessionStorage.getItem(STORAGE_KEY)) {
      return;
    }

    setVisible(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < greetings.length; i++) {
      timers.push(setTimeout(() => setIndex(i), i * STEP_MS));
    }
    timers.push(setTimeout(() => setShowText(false), greetings.length * STEP_MS));
    timers.push(
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = prevOverflow;
        sessionStorage.setItem(STORAGE_KEY, "1");
      }, greetings.length * STEP_MS + EXIT_MS),
    );

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Nothing rendered until we know (client-side) whether this should play —
  // avoids a server/client mismatch and never blocks the homepage's own
  // first paint since this is a purely additive overlay, not a gate.
  if (!mounted || !visible) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: showText ? 0 : "-100%" }}
      transition={{ duration: EXIT_MS / 1000, ease: EASE_SMOOTH }}
      style={{ pointerEvents: showText ? "auto" : "none" }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
      aria-hidden={!showText}
    >
      {showText && (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.08, ease: "easeOut" }}
          className="font-serif text-4xl italic text-paper sm:text-6xl"
        >
          {greetings[index]}
        </motion.span>
      )}
    </motion.div>
  );
}
