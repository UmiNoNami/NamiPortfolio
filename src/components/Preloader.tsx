"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";

// "Hello" in eight languages, each written in its own native script.
const greetings = [
  "Hello",
  "Сайн байна уу", // Mongolian
  "こんにちは", // Japanese
  "안녕하세요", // Korean
  "Hola", // Spanish
  "Bonjour", // French
  "Halo", // Indonesian
  "你好", // Chinese
];

const STEP_MS = 300;
const EXIT_MS = 700;
const STORAGE_KEY = "nami-intro-seen";

/**
 * A one-time welcome screen: cycles through "Hello" in eight languages
 * before fading out to reveal the site. Only plays once per browser
 * session (via sessionStorage) so repeat navigation doesn't replay it.
 *
 * Word swaps are instant (no exit-wait animation between them) — an
 * AnimatePresence mode="wait" + spring combo previously used here made
 * each word's exit block the next word's entrance, and since a fresh
 * setIndex() fired on a fixed timer regardless of whether that exit had
 * finished, several words got silently skipped. Rendering each word as a
 * plain keyed swap (old one unmounts immediately, new one only fades in)
 * removes that bottleneck entirely.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ?intro=1 forces it to replay even if this tab has already seen it —
    // handy for testing/demoing without opening a private window.
    const forceReplay = new URLSearchParams(window.location.search).has("intro");

    if (!forceReplay && sessionStorage.getItem(STORAGE_KEY)) {
      setVisible(false);
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < greetings.length; i++) {
      timers.push(setTimeout(() => setIndex(i), i * STEP_MS));
    }
    // Hide the text the instant the last word's turn is up, then let the
    // black panel slide up and off-screen on its own — no lingering text.
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

  if (!visible) return null;

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
          transition={{ duration: 0.1, ease: "easeOut" }}
          className="font-serif text-4xl italic text-paper sm:text-6xl"
        >
          {greetings[index]}
        </motion.span>
      )}
    </motion.div>
  );
}
