"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playClick } from "@/lib/sound";
import { SPRING_SNAPPY } from "@/lib/motion";
import { useWindowManager, type WindowId } from "@/lib/windowManager";
import { NoteIcon, FolderIcon, CodeBracketsIcon, SpeakerIcon } from "./PixelIcons";

const menuItems: { href: string; label: string; openWindow?: WindowId }[] = [
  { href: "/#about-window", label: "About Me", openWindow: "about" },
  { href: "/#work-window", label: "Selected Work" },
  { href: "mailto:naransuvd57@gmail.com", label: "Contact" },
];

// Decorative "open window" tabs, purely for the authentic multi-window
// taskbar look — they still function as anchors to the real sections
// (except about_me.txt, which pops the real overlay window open).
const openTabs: {
  href: string;
  label: string;
  icon: typeof NoteIcon;
  openWindow?: WindowId;
}[] = [
  { href: "/#about-window", label: "about_me.txt", icon: NoteIcon, openWindow: "about" },
  { href: "/#work-window", label: "projects", icon: FolderIcon },
  { href: "/#work-window", label: "skills.exe", icon: CodeBracketsIcon },
  { href: "/#notepad-window", label: "CD Player", icon: NoteIcon },
];

/**
 * Fixed bottom taskbar, styled like classic Windows 95/98 — a beveled gray
 * bar with a Start button, open-window tabs, a volume glyph, and a live
 * clock. This replaces the old top navbar entirely.
 */
export default function Taskbar() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const { open: openWindow } = useWindowManager();

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="win-outset fixed inset-x-0 bottom-0 z-50 flex h-10 items-center gap-2 bg-winface px-1.5 sm:h-11 sm:gap-3">
      <div className="relative">
        <motion.button
          type="button"
          onClick={() => {
            playClick();
            setOpen((v) => !v);
          }}
          whileTap={{ y: 1 }}
          transition={SPRING_SNAPPY}
          className={`flex items-center gap-1.5 bg-winface px-2 py-1.5 font-pixel text-xs font-bold sm:text-sm ${
            open ? "win-inset" : "win-outset"
          }`}
        >
          <span className="flex h-4 w-4 items-center justify-center border border-black bg-white text-[9px] font-bold sm:h-5 sm:w-5 sm:text-[10px]">
            N
          </span>
          Start
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={SPRING_SNAPPY}
              className="win-outset absolute bottom-full left-0 mb-1 w-44 bg-winface p-1"
            >
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    playClick();
                    setOpen(false);
                    if (item.openWindow) {
                      e.preventDefault();
                      openWindow(item.openWindow);
                    }
                  }}
                  className="block px-2 py-1.5 font-mono text-xs hover:bg-winnavy hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="win-inset hidden h-[70%] w-[2px] sm:block" />

      <div className="hidden items-center gap-1.5 sm:flex">
        {openTabs.map((tab, i) => {
          const Icon = tab.icon;
          return (
            <a
              key={`${tab.href}-${i}`}
              href={tab.href}
              onClick={(e) => {
                playClick();
                if (tab.openWindow) {
                  e.preventDefault();
                  openWindow(tab.openWindow);
                }
              }}
              className="win-inset flex items-center gap-1.5 bg-winface px-2.5 py-1.5 font-mono text-xs"
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {tab.label}
            </a>
          );
        })}
      </div>

      <div className="win-inset ml-auto flex h-[70%] items-center gap-2 bg-winface px-2.5 font-mono text-xs sm:text-sm">
        <SpeakerIcon className="h-3.5 w-3.5 shrink-0" />
        {time}
      </div>
    </div>
  );
}
