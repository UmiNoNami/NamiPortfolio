import type { ReactNode } from "react";
import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { plutoColors, plutoSemantic, plutoPriority } from "./tokens";

function SubLabel({ children }: { children: string }) {
  return (
    <p className="font-dm text-xs font-semibold uppercase tracking-wider text-navy/40 dark:text-cream/40">
      {children}
    </p>
  );
}

function Row({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl border border-navy/10 bg-white p-4 dark:border-cream/10 dark:bg-midnight-card">
      {children}
    </div>
  );
}

function SpecPill({ children }: { children: string }) {
  return (
    <span className="rounded-md border border-current px-2 py-0.5 font-dm text-[10px] font-medium opacity-70">
      {children}
    </span>
  );
}

function Badge({ text, bg, filled = false }: { text: string; bg: string; filled?: boolean }) {
  return (
    <span
      className="rounded-full border-2 px-3 py-1 font-dm text-[11px] font-bold"
      style={
        filled
          ? { backgroundColor: bg, borderColor: plutoColors.ink, color: plutoColors.ink }
          : { borderColor: bg, color: bg, backgroundColor: "transparent" }
      }
    >
      {text}
    </span>
  );
}

export default function ComponentsShowcase({ index = "04" }: { index?: string }) {
  return (
    <div>
      <SectionHeading index={index} title="Components" />

      <RevealOnScroll y={16}>
        <SubLabel>Buttons</SubLabel>
        <Row>
          <button
            type="button"
            className="rounded-full border-2 px-4 py-2 font-jakarta text-xs font-bold"
            style={{ backgroundColor: plutoColors.yellow, color: plutoColors.ink, borderColor: plutoColors.ink }}
          >
            Primary CTA
          </button>
          <button
            type="button"
            className="rounded-full border-2 bg-white px-4 py-2 font-jakarta text-xs font-bold text-navy dark:bg-transparent dark:text-cream"
            style={{ borderColor: plutoColors.ink }}
          >
            Secondary
          </button>
          <button
            type="button"
            className="rounded-full border-2 px-4 py-2 font-jakarta text-xs font-bold text-white"
            style={{ backgroundColor: plutoColors.ink, borderColor: plutoColors.ink }}
          >
            Dark
          </button>
          <button
            type="button"
            className="rounded-full border-2 px-4 py-2 font-jakarta text-xs font-bold text-white"
            style={{ backgroundColor: plutoSemantic.exam.text, borderColor: plutoColors.ink }}
          >
            Destructive
          </button>
          <button
            type="button"
            className="rounded-full border-2 bg-white px-4 py-2 font-jakarta text-xs font-bold text-navy/60 dark:bg-transparent dark:text-cream/60"
            style={{ borderColor: plutoColors.ink }}
          >
            Ghost
          </button>
        </Row>
      </RevealOnScroll>

      <RevealOnScroll delay={0.06} y={16} className="mt-6">
        <SubLabel>Cards</SubLabel>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border-2 bg-white p-4" style={{ borderColor: plutoColors.ink }}>
            <p className="font-jakarta text-base font-bold text-navy">Standard Card</p>
            <p className="mt-1 font-dm text-xs text-navy/50">2px offset shadow — main workhorse</p>
            <div className="mt-3 flex gap-1.5 text-navy/60">
              <SpecPill>borderRadius: 20</SpecPill>
              <SpecPill>offset shadow</SpecPill>
            </div>
          </div>
          <div className="rounded-2xl border-2 p-4" style={{ backgroundColor: plutoColors.darkCard, borderColor: plutoColors.ink }}>
            <p className="font-jakarta text-base font-bold text-white">Dark Card</p>
            <p className="mt-1 font-dm text-xs text-white/60">Dark mode surface (#252525)</p>
            <div className="mt-3 flex gap-1.5 text-white/60">
              <SpecPill>borderRadius: 20</SpecPill>
              <SpecPill>offset shadow</SpecPill>
            </div>
          </div>
          <div className="rounded-2xl border-2 p-4" style={{ backgroundColor: plutoColors.yellow, borderColor: plutoColors.ink }}>
            <p className="font-jakarta text-base font-bold" style={{ color: plutoColors.ink }}>
              Accent Card
            </p>
            <p className="mt-1 font-dm text-xs" style={{ color: plutoColors.ink, opacity: 0.65 }}>
              Yellow hero cards and carousel banners
            </p>
            <div className="mt-3 flex gap-1.5" style={{ color: plutoColors.ink }}>
              <SpecPill>borderRadius: 20</SpecPill>
              <SpecPill>offset shadow</SpecPill>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.12} y={16} className="mt-6">
        <SubLabel>Status Tags &amp; Badges</SubLabel>
        <Row>
          <Badge text="Exam" bg={plutoSemantic.exam.text} />
          <Badge text="Assignment" bg={plutoSemantic.assignment.text} />
          <Badge text="Class" bg={plutoSemantic.class.text} />
          <Badge text="Completed" bg={plutoSemantic.completed.text} />
          <Badge text="High" bg={plutoPriority.high.text} />
          <Badge text="Medium" bg={plutoPriority.medium.text} />
          <Badge text="Low" bg={plutoPriority.low.text} />
          <Badge text="CS501" bg={plutoColors.yellow} filled />
        </Row>
      </RevealOnScroll>

      <RevealOnScroll delay={0.18} y={16} className="mt-6">
        <SubLabel>Navigation Bar</SubLabel>
        <div
          className="mt-3 flex items-center justify-center gap-1 rounded-full border-2 bg-white px-3 py-2 dark:bg-midnight-card"
          style={{ borderColor: plutoColors.ink }}
        >
          {["Home", "Calendar", "Courses", "To-Do", "Profile"].map((label, i) => (
            <span
              key={label}
              className={`rounded-full border-2 px-4 py-1.5 font-dm text-[13px] font-semibold ${
                i === 0 ? "" : "border-transparent text-navy/50 dark:text-cream/50"
              }`}
              style={i === 0 ? { backgroundColor: plutoColors.yellow, color: plutoColors.ink, borderColor: plutoColors.ink } : undefined}
            >
              {label}
            </span>
          ))}
        </div>
        <p className="mt-2 text-center font-dm text-[11px] text-navy/40 dark:text-cream/40">
          Spring physics sliding pill — layoutId=&quot;nav-pill&quot; · stiffness: 460 · damping: 32
        </p>
      </RevealOnScroll>
    </div>
  );
}
