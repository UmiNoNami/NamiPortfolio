"use client";

import { motion } from "framer-motion";
import PixelWindow from "./PixelWindow";
import {
  PaletteIcon,
  SearchIcon,
  WrenchIcon,
  CodeBracketsIcon,
  Html5Badge,
  JsBadge,
  ReactBadge,
} from "./PixelIcons";
import { EASE_SMOOTH } from "@/lib/motion";

const skills = [
  { label: "UI Design", level: 9, icon: PaletteIcon },
  { label: "UX Research", level: 7, icon: SearchIcon },
  { label: "Prototyping", level: 8, icon: WrenchIcon },
  { label: "Front-End Dev", level: 8, icon: CodeBracketsIcon },
  { label: "HTML / CSS", level: 9, icon: Html5Badge },
  { label: "JavaScript", level: 7, icon: JsBadge },
  { label: "React", level: 7, icon: ReactBadge },
];

const BLOCKS = 10;

export default function Skills({ className = "" }: { className?: string }) {
  return (
    <PixelWindow
      title="skills.exe"
      className={className}
      statusBar={{ left: `${skills.length} items`, right: "Skills loading... 100%" }}
    >
      <div className="flex flex-col gap-5">
        {skills.map((s, i) => {
          const filled = Math.round((s.level / 10) * BLOCKS);
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="grid grid-cols-[2.4rem_8rem_1fr] items-center gap-3 sm:grid-cols-[2.8rem_9.5rem_1fr] sm:gap-4"
            >
              <Icon className="h-9 w-9 sm:h-11 sm:w-11" />
              <span className="font-mono text-base sm:text-lg">{s.label}</span>
              {/* flex-1 segments so the bar stretches to fill the whole
                  remaining row width instead of sitting as a small fixed-
                  width cluster with empty space after it — kept slim
                  (h-2.5) so the row reads as text-led, not bar-led. */}
              <div className="flex h-2.5 gap-[2px] sm:h-3">
                {Array.from({ length: BLOCKS }).map((_, b) => (
                  <motion.span
                    key={b}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + b * 0.02, duration: 0.25, ease: EASE_SMOOTH }}
                    className={`h-full flex-1 origin-bottom ${
                      b < filled ? "bg-winnavy" : "border border-ink/40 bg-paper"
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </PixelWindow>
  );
}
