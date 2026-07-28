import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { plutoColors } from "./tokens";

function WeightBadge({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-navy/15 px-2 py-0.5 font-dm text-[10px] font-medium text-navy/60 dark:border-cream/15 dark:text-cream/60">
      {children}
    </span>
  );
}

function SpecimenCard({
  tag,
  name,
  weights,
  fontClass,
}: {
  tag: string;
  name: string;
  weights: string[];
  fontClass: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/10 shadow-sm dark:border-cream/10">
      <div className="p-5" style={{ backgroundColor: plutoColors.ink }}>
        <span className="font-dm text-[11px] font-bold uppercase tracking-wider" style={{ color: plutoColors.yellow }}>
          {tag}
        </span>
        <p className={`mt-1 text-3xl font-extrabold text-white ${fontClass}`}>{name}</p>
      </div>
      <div className="bg-white p-5 dark:bg-midnight-card">
        <p className={`text-base text-navy dark:text-cream ${fontClass}`}>AaBbCcDdEeFfGg</p>
        <p className={`text-base text-navy dark:text-cream ${fontClass}`}>0123456789 !@#</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {weights.map((w) => (
            <WeightBadge key={w}>{w}</WeightBadge>
          ))}
        </div>
      </div>
    </div>
  );
}

const SCALE: { label: string; spec: string; sample: string; className: string }[] = [
  { label: "Display", spec: "64px / 800", sample: "PLUTO", className: "font-jakarta text-4xl font-extrabold" },
  { label: "H1", spec: "32px / 800", sample: "Student Dashboard", className: "font-jakarta text-2xl font-extrabold" },
  { label: "H2", spec: "24px / 800", sample: "Today's Classes", className: "font-jakarta text-xl font-extrabold" },
  { label: "H3", spec: "18px / 700", sample: "Advanced Algorithms", className: "font-jakarta text-lg font-bold" },
  {
    label: "Body",
    spec: "14px / 400",
    sample: "Your universe of learning, organized and explored.",
    className: "font-dm text-sm font-normal",
  },
  { label: "Caption", spec: "12px / 600", sample: "CS501 — Tue, 09:00 · LT-204", className: "font-dm text-xs font-semibold" },
  {
    label: "Label",
    spec: "11px / 700",
    sample: "STUDENT PORTAL",
    className: "font-dm text-[11px] font-bold uppercase tracking-wider",
  },
];

export default function TypographySpec() {
  return (
    <div>
      <SectionHeading index="03" title="Typography" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <RevealOnScroll y={16}>
          <SpecimenCard tag="Display & Headings" name="Plus Jakarta Sans" weights={["400", "600", "700", "800 ExtraBold"]} fontClass="font-jakarta" />
        </RevealOnScroll>
        <RevealOnScroll delay={0.06} y={16}>
          <SpecimenCard tag="Body & UI Text" name="DM Sans" weights={["300", "400", "500", "600", "700"]} fontClass="font-dm" />
        </RevealOnScroll>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-navy/10 dark:border-cream/10">
        {SCALE.map((row, i) => (
          <RevealOnScroll key={row.label} delay={0.04 * i} y={10}>
            <div
              className={`flex flex-wrap items-center gap-3 px-5 py-3.5 ${
                i % 2 === 0 ? "bg-white dark:bg-midnight-card" : "bg-navy/[0.02] dark:bg-cream/[0.03]"
              }`}
            >
              <span className="w-16 shrink-0 font-dm text-xs text-navy/50 dark:text-cream/50">{row.label}</span>
              <span className="shrink-0 rounded-md bg-navy/[0.06] px-2 py-0.5 font-dm text-[11px] text-navy/40 dark:bg-cream/10 dark:text-cream/40">
                {row.spec}
              </span>
              <span className={`text-navy dark:text-cream ${row.className}`}>{row.sample}</span>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
