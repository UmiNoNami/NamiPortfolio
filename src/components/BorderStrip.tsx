"use client";

import {
  PuzzlePiece,
  Eye,
  Cursor,
  Leaf,
  Diamond,
  GameController,
  Sparkle,
  Star,
} from "./Doodles";

const icons = [
  PuzzlePiece,
  Eye,
  Cursor,
  Leaf,
  Diamond,
  GameController,
  Sparkle,
  Star,
];

/** A vertical strip of small hand-drawn icon tiles, alternating ink/paper backgrounds. */
export default function BorderStrip({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`pointer-events-none fixed top-0 z-40 hidden h-full w-11 flex-col overflow-hidden lg:flex ${
        side === "left" ? "left-0" : "right-0"
      }`}
      aria-hidden="true"
    >
      {Array.from({ length: 14 }).map((_, i) => {
        const Icon = icons[i % icons.length];
        const isInk = i % 2 === 0;
        return (
          <div
            key={i}
            className={`flex aspect-square w-full shrink-0 items-center justify-center border border-charcoal/40 ${
              isInk ? "bg-ink text-paper" : "bg-charcoal text-ink-light"
            }`}
          >
            <Icon className="h-4 w-4" />
          </div>
        );
      })}
    </div>
  );
}
