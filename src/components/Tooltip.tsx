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
  side?: "right" | "left";
  children: ReactNode;
}) {
  const sideClasses =
    side === "right"
      ? "left-full ml-2.5 -translate-x-1 group-hover:translate-x-0"
      : "right-full mr-2.5 translate-x-1 group-hover:translate-x-0";

  return (
    <div className="group relative flex items-center">
      {children}
      <span
        className={`pointer-events-none absolute top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-md bg-navy px-2 py-1 font-sans text-[11px] font-medium text-cream opacity-0 shadow-md transition-all duration-200 ease-out group-hover:opacity-100 dark:bg-cream dark:text-navy ${sideClasses}`}
      >
        {label}
      </span>
    </div>
  );
}
