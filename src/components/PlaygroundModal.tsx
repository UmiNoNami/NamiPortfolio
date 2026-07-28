"use client";

import { AnimatePresence, motion } from "framer-motion";
import DumplingGame from "./DumplingGame";
import { useWindowManager } from "@/lib/windowManager";
import { playClick } from "@/lib/sound";
import { SPRING_SOFT } from "@/lib/motion";

/**
 * Playground — pops open on the same page as a clean, modern card (matching
 * the About/Resume overlays) with the Dumpling Dash platformer inside.
 */
export default function PlaygroundModal() {
  const { isOpen, close } = useWindowManager();
  const open = isOpen("playground");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close playground"
            onClick={() => {
              playClick();
              close("playground");
            }}
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm dark:bg-black/60"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={SPRING_SOFT}
            className="relative flex max-h-[92vh] w-fit max-w-[95vw] flex-col overflow-hidden rounded-2xl bg-cream shadow-2xl dark:bg-midnight"
          >
            <div className="flex items-center justify-between border-b border-navy/10 px-5 py-3 dark:border-cream/10">
              <span className="font-sans text-sm font-semibold text-navy dark:text-cream">
                Dumpling Dash
              </span>
              <button
                type="button"
                aria-label="Close playground"
                onClick={() => {
                  playClick();
                  close("playground");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-navy/60 transition-colors hover:bg-navy/10 hover:text-navy dark:text-cream/60 dark:hover:bg-cream/10 dark:hover:text-cream"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="overflow-auto p-4 sm:p-5">
              <DumplingGame />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
