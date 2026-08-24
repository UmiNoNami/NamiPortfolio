"use client";

import type { ReactNode } from "react";

// Lightweight CSS-only hover tooltip (no JS state needed per-instance) —
// fades + slides in from the anchor side. Used on the draw toolbar so
// hovering a tool shows its name.
export default function Tooltip({
  label,
  side = "right",
  children,
}: {
  label: string;
  side?: "right" | "left" | "bottom";
  children: ReactNode;
}) {
  const sideClasses =
    side === "right"
      ? "left-full top-1/2 ml-2.5 -translate-y-1/2 -translate-x-1 group-hover:translate-x-0 group-focus-within:translate-x-0"
      : side === "left"
        ? "right-full top-1/2 mr-2.5 -translate-y-1/2 translate-x-1 group-hover:translate-x-0 group-focus-within:translate-x-0"
        : "left-1/2 top-full mt-2.5 -translate-x-1/2 translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0";

  return (
    <div className="group relative flex items-center">
      {children}
      {/* Shows on hover for mouse users and on focus-within for keyboard
          users tabbing to the trigger, so the label isn't hover-only. */}
      <span
        className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-navy px-2 py-1 font-sans text-[11px] font-medium text-cream opacity-0 shadow-md transition-all duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-cream dark:text-navy ${sideClasses}`}
      >
        {label}
      </span>
    </div>
  );
}
