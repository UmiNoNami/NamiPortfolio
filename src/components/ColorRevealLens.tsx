"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Sizing/background/rounding classes for the real content wrapper. */
  className?: string;
  /** Radius (px) of the warm glow around the cursor. */
  radius?: number;
  /** Called in addition to the lens's own tracking — lets a parent still
   * hook mouse enter/leave for other purposes (e.g. activating the cursor
   * badge) on this same element instead of wrapping it a second time. */
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
};

/**
 * Renders children completely normally — the only addition is a soft warm
 * "lamp" glow that follows the cursor while hovering, blended on top with
 * `soft-light` so it reads as light falling on the surface rather than a
 * flat color patch. No content duplication needed (unlike an earlier
 * grayscale/color-shift version of this component) — it's a pure lighting
 * effect layered over the real, untouched content.
 */
export default function ColorRevealLens({
  children,
  className = "",
  radius = 110,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
    setPos(null);
    onMouseLeave?.(e);
  };

  const glow = pos
    ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, rgba(255,205,120,0.65) 0%, rgba(255,205,120,0.3) 45%, rgba(255,205,120,0) 75%)`
    : undefined;

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className={`relative ${className}`}>{children}</div>
      {/* Reuses the same sizing/rounding classes purely so the glow clips to
          the card's shape — any background-color class in there is harmless
          since it's fully hidden (opacity 0) whenever not hovering, and
          overridden by the inline gradient whenever it is. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${className}`}
        style={{ background: glow, opacity: pos ? 1 : 0, mixBlendMode: "soft-light" }}
      />
    </div>
  );
}
