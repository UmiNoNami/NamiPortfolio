"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useResumeModal } from "@/lib/resumeModal";
import { playClick } from "@/lib/sound";
import { SPRING_SOFT } from "@/lib/motion";

export default function ResumeModal() {
  const { isOpen, close } = useResumeModal();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close resume"
            onClick={() => {
              playClick();
              close();
            }}
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm dark:bg-black/60"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={SPRING_SOFT}
            className="relative flex h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-cream shadow-2xl dark:bg-midnight"
          >
            <div className="flex items-center justify-between border-b border-navy/10 px-5 py-3 dark:border-cream/10">
              <span className="font-sans text-sm font-semibold text-navy dark:text-cream">
                Resume
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  download
                  onClick={() => playClick()}
                  className="rounded-full bg-navy px-3 py-1.5 font-sans text-xs font-semibold text-cream transition-transform hover:-translate-y-0.5 dark:bg-cream dark:text-navy"
                >
                  Download PDF
                </a>
                <button
                  type="button"
                  aria-label="Close resume"
                  onClick={() => {
                    playClick();
                    close();
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
            </div>
            <div className="relative min-h-0 flex-1 p-4">
              <Image
                src="/resume.png"
                alt="Resume"
                fill
                sizes="(max-width: 640px) 90vw, 448px"
                className="object-contain object-top p-2"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
