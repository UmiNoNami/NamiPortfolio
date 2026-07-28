"use client";

import { motion } from "framer-motion";
import { Heart, Sparkle } from "./Doodles";

/**
 * A hand-drawn line-art scene: a browser window, a person at a laptop,
 * and potted plants either side — echoing the "at my desk" hero motif.
 */
export default function DeskIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 360 260"
        fill="none"
        className="h-full w-full text-ink"
      >
        {/* browser window */}
        <rect x="18" y="8" width="230" height="130" rx="4" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="34" x2="248" y2="34" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="21" r="2.5" fill="currentColor" />
        <circle cx="40" cy="21" r="2.5" fill="currentColor" />
        <circle cx="50" cy="21" r="2.5" fill="currentColor" />
        <line x1="150" y1="21" x2="200" y2="21" stroke="currentColor" strokeWidth="1.5" />

        {/* image placeholder box + text lines inside browser */}
        <rect x="32" y="46" width="70" height="55" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M38 92 56 68l10 12 10-16 20 28" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="48" cy="58" r="4" stroke="currentColor" strokeWidth="1.3" />

        <line x1="114" y1="52" x2="200" y2="52" stroke="currentColor" strokeWidth="1.5" />
        <line x1="114" y1="64" x2="230" y2="64" stroke="currentColor" strokeWidth="1.5" />
        <line x1="114" y1="76" x2="230" y2="76" stroke="currentColor" strokeWidth="1.5" />
        <line x1="114" y1="88" x2="190" y2="88" stroke="currentColor" strokeWidth="1.5" />

        {/* desk surface */}
        <line x1="10" y1="230" x2="350" y2="230" stroke="currentColor" strokeWidth="2" />

        {/* person sitting, resting head on hand, laptop in front */}
        <circle cx="150" cy="168" r="20" stroke="currentColor" strokeWidth="2" />
        {/* hair bun */}
        <circle cx="160" cy="152" r="6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M132 172c0 10 8 20 20 20s20-8 22-18" stroke="currentColor" strokeWidth="2" />
        {/* body */}
        <path
          d="M120 230c2-24 14-36 32-36 16 0 28 10 32 30"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* resting arm on cheek */}
        <path d="M134 178c-6 4-9 10-8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* laptop */}
        <path
          d="M118 224 122 200h60l6 24H118Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M132 210c4-2 22-2 26 0" stroke="currentColor" strokeWidth="1.3" />

        {/* left plant */}
        <path d="M30 230v-14" stroke="currentColor" strokeWidth="2" />
        <path d="M22 216c2-14 14-14 16 0M18 224c2-10 22-10 24 0" stroke="currentColor" strokeWidth="1.6" />
        <rect x="16" y="216" width="28" height="14" rx="2" stroke="currentColor" strokeWidth="2" />

        {/* right plant, taller */}
        <path d="M320 230v-46" stroke="currentColor" strokeWidth="2" />
        <path
          d="M304 200c4-18 26-18 30 0M300 214c4-14 34-14 38 0M306 186c3-12 16-12 18 0"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect x="300" y="214" width="34" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      </svg>

      <motion.div
        className="absolute right-2 top-2 text-ink-dark"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkle className="h-5 w-5" />
      </motion.div>
      <motion.div
        className="absolute left-[38%] top-[46%] text-ink/70"
        animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="h-4 w-4" />
      </motion.div>
    </div>
  );
}
