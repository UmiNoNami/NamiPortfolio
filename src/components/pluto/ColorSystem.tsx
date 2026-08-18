import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { plutoColors, plutoSemantic } from "./tokens";

const CORE_PALETTE: { name: string; hex: string; note: string; bordered?: boolean }[] = [
  { name: "Pluto Yellow", hex: plutoColors.yellow, note: "Primary accent, CTAs, highlights" },
  { name: "Ink", hex: plutoColors.ink, note: "Headings, borders, shadows" },
  { name: "Canvas", hex: plutoColors.canvas, note: "App background, warm white", bordered: true },
  { name: "Card White", hex: plutoColors.cardWhite, note: "Card surfaces, modal backgrounds", bordered: true },
  { name: "Muted", hex: plutoColors.muted, note: "Secondary text, captions" },
  { name: "Surface", hex: plutoColors.surface, note: "Input fills, inactive states", bordered: true },
];

const SEMANTIC = [
  { name: "Exam / Danger", note: "Exam deadlines, critical alerts", ...plutoSemantic.exam },
  { name: "Assignment", note: "Homework, upcoming tasks", ...plutoSemantic.assignment },
  { name: "Class", note: "Scheduled lectures, sessions", ...plutoSemantic.class },
  { name: "Completed", note: "Done items, success states", ...plutoSemantic.completed },
];

export default function ColorSystem({ index = "02" }: { index?: string }) {
  return (
    <div>
      <SectionHeading index={index} title="Color System" />

      <p className="mt-6 font-dm text-xs font-semibold uppercase tracking-wider text-navy/40 dark:text-cream/40">
        Core Palette
      </p>
      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {CORE_PALETTE.map((c, i) => (
          <RevealOnScroll key={c.name} delay={0.05 * i} y={14}>
            <div
              className={`aspect-square w-full rounded-2xl shadow-sm ${c.bordered ? "border border-navy/10 dark:border-cream/10" : ""}`}
              style={{ backgroundColor: c.hex }}
            />
            <p className="mt-2 font-jakarta text-xs font-bold text-navy dark:text-cream">{c.name}</p>
            <p className="font-dm text-[11px] uppercase text-navy/40 dark:text-cream/40">{c.hex}</p>
            <p className="mt-0.5 font-dm text-[11px] text-navy/50 dark:text-cream/50">{c.note}</p>
          </RevealOnScroll>
        ))}
      </div>

      <p className="mt-8 font-dm text-xs font-semibold uppercase tracking-wider text-navy/40 dark:text-cream/40">
        Semantic Colors
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SEMANTIC.map((s, i) => (
          <RevealOnScroll key={s.name} delay={0.05 * i} y={14}>
            <div className="rounded-2xl border-2 p-4" style={{ backgroundColor: s.bg, borderColor: s.text }}>
              <p className="font-jakarta text-sm font-bold" style={{ color: s.text }}>
                {s.name}
              </p>
              <p className="mt-1 font-dm text-[11px] font-medium" style={{ color: s.text }}>
                {s.text} · BG {s.bg}
              </p>
              <p className="mt-1 font-dm text-[11px] opacity-70" style={{ color: s.text }}>
                {s.note}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={0.1} y={14} className="mt-6">
        <div
          className="flex flex-wrap items-center gap-2 rounded-2xl px-6 py-5 font-dm text-sm"
          style={{ backgroundColor: plutoColors.yellow, color: plutoColors.ink }}
        >
          <span className="mr-2 font-jakarta text-3xl font-extrabold">Aa</span>
          <span>
            Yellow {plutoColors.yellow} on Ink {plutoColors.ink} → <strong>8.2:1 AAA</strong>
          </span>
          <span className="opacity-50">·</span>
          <span>
            White on Ink → <strong>16.1:1 AAA</strong>
          </span>
          <span className="opacity-50">·</span>
          <span>
            Muted on White → <strong>4.6:1 AA</strong>
          </span>
        </div>
      </RevealOnScroll>
    </div>
  );
}
