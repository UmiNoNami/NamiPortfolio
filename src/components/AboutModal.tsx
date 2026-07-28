"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAboutModal } from "@/lib/aboutModal";
import { playClick } from "@/lib/sound";
import { SPRING_SOFT, SPRING_SNAPPY } from "@/lib/motion";
import { MailIcon } from "./ModernIcons";

type Spread = { left: ReactNode; right: ReactNode };

// A photo "taped" into the notebook page, like a scrapbook — a slight
// rotation plus a little washi-tape strip at the top for a hand-made feel.
function PagePhoto({ src, alt, rotate = -2 }: { src: string; alt: string; rotate?: number }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="relative aspect-[3/4] h-[55%] max-h-48 overflow-hidden rounded-xl bg-white shadow-md sm:h-[60%] sm:max-h-60 sm:rounded-2xl"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
        <span
          aria-hidden
          className="absolute -top-1.5 left-1/2 h-3 w-10 -translate-x-1/2 rounded-sm bg-brand-yellow/50 shadow-sm sm:h-4 sm:w-12"
          style={{ transform: "translateX(-50%) rotate(-1.5deg)" }}
        />
      </div>
    </div>
  );
}

const spreads: Spread[] = [
  {
    left: <PagePhoto src="/about/about1.png" alt="Nami" rotate={-2} />,
    right: (
      <div className="flex h-full flex-col justify-center">
        <h2 className="font-serif text-2xl italic leading-tight text-navy sm:text-3xl">Hello</h2>
        <p className="mt-3 font-sans text-[13px] leading-relaxed text-navy/75 sm:text-sm">
          My name is Naransuvd Enkhjargal, but everyone calls me Nami. I&apos;m originally from
          Mongolia and now based in Dublin. I&apos;m curious, creative, and happiest when I&apos;m
          learning something new or turning a random idea into something real.
        </p>
      </div>
    ),
  },
  {
    left: <PagePhoto src="/about/about2.jpeg" alt="Nami" rotate={2} />,
    right: (
      <div className="flex h-full flex-col justify-center">
        <h2 className="font-serif text-2xl italic leading-tight text-navy sm:text-3xl">My Journey</h2>
        <p className="mt-3 font-sans text-[13px] leading-relaxed text-navy/75 sm:text-sm">
          My career path wasn&apos;t perfectly planned. I changed direction, taught myself new
          things, made plenty of mistakes, and discovered what genuinely excited me. This led
          me to complete a Higher Diploma in Computing and later a master&apos;s degree in
          Interactive Digital Media.
        </p>
      </div>
    ),
  },
  {
    left: <PagePhoto src="/about/about3.png" alt="Nami" rotate={-2} />,
    right: (
      <div className="flex h-full flex-col justify-center">
        <h2 className="font-serif text-2xl italic leading-tight text-navy sm:text-3xl">Always Growing</h2>
        <p className="mt-3 font-sans text-[13px] leading-relaxed text-navy/75 sm:text-sm">
          I&apos;m hungry to keep learning, improving, and bringing fresh energy to the right
          team. I&apos;m adaptable, determined, and never afraid to begin again when something
          matters to me. My portfolio shows what I&apos;ve created, but a conversation will
          reveal much more about me.
        </p>
      </div>
    ),
  },
  {
    left: (
      <div className="flex h-full flex-col items-center justify-center">
        <motion.div
          className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-yellow/35 to-brand-orange/25 sm:h-36 sm:w-36"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-5xl sm:text-6xl" role="img" aria-label="Coffee cup">
            ☕
          </span>
        </motion.div>
      </div>
    ),
    right: (
      <div className="flex h-full flex-col justify-center">
        <h2 className="font-serif text-2xl italic leading-tight text-navy sm:text-3xl">Coffee?</h2>
        <p className="mt-3 font-sans text-[13px] leading-relaxed text-navy/75 sm:text-sm">
          I&apos;m also a serious coffee lover. If something here catches your attention, let&apos;s
          grab a coffee and have a chat. I might be exactly the person you&apos;re looking for. ☕
        </p>
        <a
          href="mailto:naransuvd57@gmail.com"
          onClick={() => playClick()}
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-4 py-2 font-sans text-xs font-semibold text-cream transition-transform hover:-translate-y-0.5 sm:text-sm"
        >
          <MailIcon className="h-3.5 w-3.5" />
          Say hello
        </a>
      </div>
    ),
  },
];

function ChevronIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default function AboutModal() {
  const { isOpen, close } = useAboutModal();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (isOpen) setPage(0);
  }, [isOpen]);

  const goTo = (target: number) => {
    if (target < 0 || target > spreads.length - 1 || target === page) return;
    playClick();
    setPage(target);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goTo(page + 1);
      if (e.key === "ArrowLeft") goTo(page - 1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, close, page]);

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
            aria-label="Close about"
            onClick={() => {
              playClick();
              close();
            }}
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm dark:bg-black/60"
          />

          {/* Notebook */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 40, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 24, rotate: 2 }}
            transition={SPRING_SOFT}
            className="relative w-full max-w-3xl"
          >
            <motion.button
              type="button"
              aria-label="Close about"
              onClick={() => {
                playClick();
                close();
              }}
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={SPRING_SOFT}
              className="absolute -top-3 -right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-navy text-cream shadow-lg dark:bg-cream dark:text-navy sm:-top-4 sm:-right-4"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </motion.button>

            {/* Page controls, flanking the notebook */}
            {page > 0 && (
              <motion.button
                type="button"
                aria-label="Previous page"
                onClick={() => goTo(page - 1)}
                whileHover={{ x: -3, scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
                transition={SPRING_SNAPPY}
                className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg sm:-left-4"
              >
                <ChevronIcon className="h-4 w-4 rotate-180" />
              </motion.button>
            )}
            {page < spreads.length - 1 && (
              <motion.button
                type="button"
                aria-label="Next page"
                onClick={() => goTo(page + 1)}
                whileHover={{ x: 3, scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
                transition={SPRING_SNAPPY}
                className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg sm:-right-4"
              >
                <ChevronIcon className="h-4 w-4" />
              </motion.button>
            )}

            <div className="relative aspect-[3/2] w-full drop-shadow-2xl">
              <Image src="/notebook.png" alt="" fill className="pointer-events-none object-contain" priority />

              {/* Left page — new content rises up from the bottom */}
              <div className="absolute inset-y-[7%] left-[9%] right-[52%] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`left-${page}`}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full"
                  >
                    {spreads[page].left}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right page — new content rises up from the bottom */}
              <div className="absolute inset-y-[8%] left-[54%] right-[9%] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`right-${page}`}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                    className="h-full w-full"
                  >
                    {spreads[page].right}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Page dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {spreads.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to page ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === page ? "w-5 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
