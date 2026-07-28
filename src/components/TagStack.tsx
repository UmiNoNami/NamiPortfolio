"use client";

import RibbonTag from "./RibbonTag";

const tags = [
  { label: "Design", rotate: -6 },
  { label: "Develop", rotate: -2 },
  { label: "Prototype", rotate: 2 },
  { label: "Collaborate", rotate: 6 },
];

export default function TagStack({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex w-fit flex-col gap-2.5 sm:gap-3 ${className}`}>
      {tags.map((t, i) => (
        <RibbonTag key={t.label} label={t.label} rotate={t.rotate} delay={0.3 + i * 0.08} />
      ))}
    </div>
  );
}
