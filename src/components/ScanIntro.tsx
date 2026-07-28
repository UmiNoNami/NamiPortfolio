"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTypewriter } from "@/lib/useTypewriter";

// Real photo goes here once it's dropped into /public — see PHOTO_SRC.
// Using the pixel avatar as a placeholder until then so the layout still
// renders correctly.
const PHOTO_SRC = "/avatar.png";

const LEFT_LINES = [
  "NARANSUVD ENKHJARGAL",
  'AKA "NAMI"',
  "ORIGIN: MONGOLIA",
  "BASED: DUBLIN, IRELAND",
];

const RIGHT_LINES = [
  "ROLE: UI/UX DESIGNER",
  "FOCUS: FRONT-END DEV",
  "TOOLS: FIGMA / REACT / NEXT.JS",
  "STATUS: DESIGNING + BUILDING",
];

/**
 * The About Me overlay content, in full — a permanent sci-fi "identity
 * scan" HUD screen (cyan grid, moving scan-line, orange target frame around
 * a real photo) with bio lines that auto-type themselves on both sides.
 * Replaces the classic Win95 about_me.txt window for this popup entirely;
 * the on-canvas desktop version stays untouched.
 */
export default function ScanIntro({ onClose }: { onClose?: () => void }) {
  const left = useTypewriter(LEFT_LINES, { speed: 24, startDelay: 300 });
  const right = useTypewriter(RIGHT_LINES, { speed: 24, startDelay: 900 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex h-[460px] w-full overflow-hidden border border-cyan-400/40 bg-black font-mono text-cyan-300 sm:h-[500px]"
    >
      {/* background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* scanning sweep, loops continuously since this is now the whole view */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-cyan-300/0 via-cyan-200/25 to-cyan-300/0"
        initial={{ top: "-15%" }}
        animate={{ top: "115%" }}
        transition={{ duration: 2.6, ease: "linear", repeat: Infinity, repeatDelay: 0.6 }}
      />

      {/* flicker vignette */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-cyan-300/5"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />

      {/* close control */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-2 top-2 z-20 flex h-6 w-6 items-center justify-center border border-cyan-400/60 bg-black/60 text-xs text-cyan-200 hover:bg-cyan-400/20"
      >
        ✕
      </button>

      {/* left data column */}
      <div className="relative z-10 flex w-[28%] flex-col justify-between p-2.5 text-[9px] leading-tight tracking-tight sm:p-3 sm:text-[10px]">
        <div>
          <p className="text-cyan-200">ON FILE</p>
          <p className="text-orange-400">N4M1.01</p>
          <p className="mt-2 text-cyan-200">CONFIRM 1.0</p>
        </div>
        <div className="space-y-1.5 text-cyan-400/80">
          {left.lines.map((line, i) => (
            <p key={LEFT_LINES[i]}>
              {line}
              {left.lines[i].length < LEFT_LINES[i].length && (
                <span className="animate-blink">▍</span>
              )}
            </p>
          ))}
        </div>
      </div>

      {/* center scan frame with photo */}
      <div className="relative z-10 flex flex-1 items-center justify-center py-4">
        <div className="relative h-full w-[68%] border border-orange-400/70">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="absolute left-0 right-0 h-px bg-orange-400/40"
              style={{ top: `${(i + 1) * 14}%` }}
            />
          ))}
          <span className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-orange-400" />
          <span className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-orange-400" />
          <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-orange-400" />
          <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-orange-400" />
          <Image
            src={PHOTO_SRC}
            alt="Nami"
            fill
            sizes="320px"
            className="object-cover"
            style={{
              filter:
                "grayscale(1) contrast(1.3) brightness(1.15) sepia(1) hue-rotate(150deg) saturate(4)",
              mixBlendMode: "screen",
            }}
          />
        </div>
      </div>

      {/* right data column */}
      <div className="relative z-10 flex w-[34%] flex-col gap-3 p-2.5 text-[9px] leading-tight tracking-tight sm:p-3 sm:text-[10px]">
        <div>
          <p className="text-sm text-cyan-100 sm:text-base">NAMI</p>
          <p className="text-cyan-400/70">UI/UX DESIGNER</p>
        </div>
        <div>
          <p className="mb-1 text-cyan-200">MATRIX INDEX</p>
          <p className="text-orange-400">4 8014690</p>
        </div>
        <div className="space-y-1.5 text-cyan-400/80">
          {right.lines.map((line, i) => (
            <p key={RIGHT_LINES[i]}>
              {line}
              {right.lines[i].length < RIGHT_LINES[i].length && (
                <span className="animate-blink">▍</span>
              )}
            </p>
          ))}
        </div>
        <motion.p
          className="mt-auto text-cyan-200"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          IDENTIFYING...
        </motion.p>
      </div>
    </motion.div>
  );
}
