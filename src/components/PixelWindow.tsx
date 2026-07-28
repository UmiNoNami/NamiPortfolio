"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { SPRING_SNAPPY } from "@/lib/motion";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
  tilt?: number;
  /** Optional File/Edit/View/Help style menu row under the title bar. */
  menuItems?: string[];
  /** Optional bottom status bar, e.g. { left: "8 objects", right: "120KB" }. */
  statusBar?: { left: string; right: string };
  /** Override the content pane's background/padding — defaults to the
   * paper look used by text windows. Pass something tighter/gray for
   * windows (like Minesweeper) that should fit snugly, no extra margin. */
  contentClassName?: string;
  /** Wired up when this window is rendered inside an overlay/modal so the
   * title-bar buttons actually do something instead of being decorative. */
  onMinimize?: () => void;
  onClose?: () => void;
};

/**
 * The recurring "OS window" chrome: a gray beveled frame with a navy
 * gradient title bar (minimize/maximize/close buttons) and a white/paper
 * content pane — classic Windows 95/98 styling, built entirely from CSS
 * (see .win-outset / .win-inset in globals.css), no image assets.
 */
export default function PixelWindow({
  title,
  children,
  className = "",
  tilt = 0,
  menuItems,
  statusBar,
  contentClassName,
  onMinimize,
  onClose,
}: Props) {
  return (
    <motion.div
      style={{ rotate: tilt }}
      whileHover={tilt !== 0 ? { rotate: 0, y: -3 } : undefined}
      transition={SPRING_SNAPPY}
      className={`win-outset flex flex-col bg-winface p-[3px] ${className}`}
    >
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-winnavy to-winnavy2 px-1.5 py-1">
        <span className="h-2.5 w-2.5 shrink-0 border border-winnavy2 bg-white sm:h-3 sm:w-3" />
        <span className="mr-auto truncate font-pixel text-xs leading-none text-white sm:text-sm">
          {title}
        </span>
        <div className="flex items-center gap-[3px]">
          <button
            type="button"
            aria-label="Minimize"
            onClick={onMinimize}
            className="win-outset-sm flex h-4 w-4 items-center justify-center bg-winface text-[9px] font-bold leading-none text-black active:win-inset-sm sm:h-[18px] sm:w-[18px] sm:text-[10px]"
          >
            _
          </button>
          <button
            type="button"
            aria-label="Maximize"
            className="win-outset-sm flex h-4 w-4 items-center justify-center bg-winface text-[8px] font-bold leading-none text-black active:win-inset-sm sm:h-[18px] sm:w-[18px] sm:text-[9px]"
          >
            □
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="win-outset-sm flex h-4 w-4 items-center justify-center bg-winface text-[9px] font-bold leading-none text-black active:win-inset-sm sm:h-[18px] sm:w-[18px] sm:text-[10px]"
          >
            ✕
          </button>
        </div>
      </div>

      {menuItems && (
        <div className="flex items-center gap-3 bg-winface px-2 py-1 font-mono text-[0.65rem] text-black sm:gap-4 sm:text-xs">
          {menuItems.map((m) => (
            <span key={m} className="hover:bg-winnavy hover:text-white">
              {m}
            </span>
          ))}
        </div>
      )}

      <div className={`win-inset mt-[3px] flex-1 ${contentClassName ?? "bg-paper p-4 sm:p-5"}`}>{children}</div>

      {statusBar && (
        <div className="mt-[3px] flex items-center justify-between gap-2 bg-winface px-1 py-[3px]">
          <span className="win-inset-sm flex-1 truncate bg-winface px-2 py-[3px] font-mono text-[0.6rem] text-black sm:text-[0.65rem]">
            {statusBar.left}
          </span>
          <span className="win-inset-sm bg-winface px-2 py-[3px] font-mono text-[0.6rem] text-black sm:text-[0.65rem]">
            {statusBar.right}
          </span>
        </div>
      )}
    </motion.div>
  );
}
