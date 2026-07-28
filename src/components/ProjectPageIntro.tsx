"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";

const HOLD_MS = 1300;
const EXIT_MS = 700;

/**
 * A short black-panel reveal shown on landing on a project's case-study
 * page — same visual language as the homepage's language-cycling
 * <Preloader/>, but holding a single word (the project name) plus a short
 * label instead of cycling through many. Plays every time this page is
 * visited (unlike the homepage intro, which is gated to once per session),
 * since it's a per-page transition rather than a whole-site welcome.
 */
export default function ProjectPageIntro({ word, subtitle }: { word: string; subtitle: string }) {
  const [visible, setVisible] = useState(true);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setShowText(false), HOLD_MS);
    const t2 = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = prevOverflow;
    }, HOLD_MS + EXIT_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
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
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-3 bg-ink"
      aria-hidden={!showText}
    >
      {showText && (
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-serif text-4xl italic text-paper sm:text-6xl">{word}</span>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.35em] text-paper/60 sm:text-sm">
            {subtitle}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
