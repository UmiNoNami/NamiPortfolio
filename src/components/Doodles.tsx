"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type FloatProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  rotate?: number;
  distance?: number;
};

/** Wrap any doodle in a gentle infinite float/rotate loop. */
export function Float({
  children,
  className = "",
  duration = 6,
  delay = 0,
  rotate = 4,
  distance = 10,
}: FloatProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -distance, 0],
        rotate: [-rotate, rotate, -rotate],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 3 L23 16 L36 20 L23 24 L20 37 L17 24 L4 20 L17 16 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2c.6 4.8 1.6 6.6 6 8-4.4 1.4-5.4 3.2-6 8-.6-4.8-1.6-6.6-6-8 4.4-1.4 5.4-3.2 6-8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 20" fill="none" className={className}>
      <path
        d="M2 10c6-10 12-10 18 0s12 10 18 0 12-10 18 0 12 10 18 0 12-10 18 0 12 10 18 0 12-10 18 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 36" fill="none" className={className}>
      <path
        d="M13 28C6 28 2 24 2 19c0-5 4-8 9-8 1-6 6-9 12-9 6 0 10 3 12 8 6 0 10 4 10 9s-4 9-10 9H13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className}>
      <path
        d="M6 6c20 2 34 14 42 40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M36 38c4 3 8 6 12 8m-12-8c1-4 2-8 2-12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Heart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 36" fill="none" className={className}>
      <path
        d="M20 33S3 22 3 11.5C3 5.5 8 2 13 2c4 0 6.5 2 7 4 .5-2 3-4 7-4 5 0 10 3.5 10 9.5C37 22 20 33 20 33Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PuzzlePiece({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M8 8h8c0-3 2-5 4-5s4 2 4 5h8v8c3 0 5 2 5 4s-2 4-5 4v8h-8c0 3-2 5-4 5s-4-2-4-5H8v-8c-3 0-5-2-5-4s2-4 5-4V8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CodeBrackets({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 30" fill="none" className={className}>
      <path
        d="M14 5 3 15l11 10M26 5l11 10-11 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PenTool({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M6 34 27 13m0 0 3-8 8 8-8 3m-3-3 7 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="32" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function GameController({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 30" fill="none" className={className}>
      <path
        d="M11 6h22c6 0 9 5 9 11 0 5-2 9-6 9-3 0-4-4-8-4H16c-4 0-5 4-8 4-4 0-6-4-6-9 0-6 3-11 9-11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14 13v6M11 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="13" r="1.6" fill="currentColor" />
      <circle cx="36" cy="17" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function Eye({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 24" fill="none" className={className}>
      <path
        d="M2 12s7-10 18-10 18 10 18 10-7 10-18 10S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Cursor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" fill="none" className={className}>
      <path
        d="M5 3 24 13l-8 2-2 8L5 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 40" fill="none" className={className}>
      <path
        d="M15 38C4 30 3 16 15 2c12 14 11 28 0 36Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M15 6v28" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Diamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" fill="none" className={className}>
      <path
        d="M15 2 28 15 15 28 2 15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TurnPageArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M11 12a14 14 0 1 1 -2.5 16.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M4 24l3.5 6 6-3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pencil({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" fill="none" className={className}>
      <path
        d="M5 25 8 25 24 9a3 3 0 0 0 0-4l-1-1a3 3 0 0 0-4 0L3 20l-1 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M17 6l5 5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Smiley({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" fill="none" className={className}>
      <circle cx="15" cy="15" r="12" stroke="currentColor" strokeWidth="2" />
      <circle cx="10.5" cy="13" r="1.4" fill="currentColor" />
      <circle cx="19.5" cy="13" r="1.4" fill="currentColor" />
      <path
        d="M9 18c2 3 10 3 12 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
