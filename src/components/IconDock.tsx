"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DesktopIcon from "./DesktopIcon";
import { NoteIcon, CodeWindowIcon, ControllerIcon, EnvelopeIcon } from "./PixelIcons";
import { SPRING_SNAPPY } from "@/lib/motion";

export default function IconDock({ className = "" }: { className?: string }) {
  const [toast, setToast] = useState(false);

  return (
    <div className={`relative flex justify-center gap-6 sm:gap-10 ${className}`}>
      <DesktopIcon href="#work-window" label="Case Studies">
        <NoteIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </DesktopIcon>
      <DesktopIcon href="/work/knokknok" label="Development">
        <CodeWindowIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </DesktopIcon>
      <DesktopIcon
        href="#"
        label="Mini Game"
        onClick={(e) => {
          e.preventDefault();
          setToast(true);
          setTimeout(() => setToast(false), 1800);
        }}
      >
        <ControllerIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </DesktopIcon>
      <DesktopIcon href="mailto:naransuvd57@gmail.com" label="Contact Me">
        <EnvelopeIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </DesktopIcon>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={SPRING_SNAPPY}
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-ink px-2 py-1 font-mono text-[0.65rem] text-paper"
          >
            🎮 coming soon
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
