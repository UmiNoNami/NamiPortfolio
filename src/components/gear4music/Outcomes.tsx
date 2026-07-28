import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { g4mColors } from "./tokens";

const METRICS = [
  { label: "Page load speed", before: "4.8s", after: "< 1.2s" },
  { label: "Navigation items (top level)", before: "18 links", after: "4 icons" },
  { label: "Bounce rate — product pages", before: "22%", after: "~9%" },
  { label: "Usability task completion", before: "61%", after: "94%" },
  { label: "Mobile tap target compliance", before: "42%", after: "100%" },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Dark-First",
    detail: "Lower eye strain in studio and stage environments where musicians actually shop.",
  },
  {
    n: "02",
    title: "Search = Browse",
    detail: "The search overlay functions as the primary navigation tool, not a keyword box.",
  },
  {
    n: "03",
    title: "Signal Over Noise",
    detail: "Every element earns its place. Promotional clutter replaced by confident hierarchy.",
  },
  {
    n: "04",
    title: "Craft at Scroll",
    detail: "Micro-animations and hover states reward attention without distracting from the product.",
  },
];

export default function Outcomes() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeading index="08" title="What Changed" />
        <p className="mt-3 max-w-lg font-figtree text-sm" style={{ color: g4mColors.subdued }}>
          Projected improvements based on industry benchmarks and usability testing outcomes.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <RevealOnScroll y={16}>
            <div className="rounded-2xl border p-5" style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.charcoalSurface }}>
              <p className="font-dm-mono text-[11px] uppercase tracking-wider" style={{ color: g4mColors.subdued }}>
                Before · Legacy Site
              </p>
              <div className="mt-3 divide-y" style={{ borderColor: g4mColors.hairline }}>
                {METRICS.map((m) => (
                  <div key={m.label} className="flex items-center justify-between border-t py-2.5 first:border-t-0" style={{ borderColor: g4mColors.hairline }}>
                    <span className="font-figtree text-[13px] text-white/80">{m.label}</span>
                    <span className="font-dm-mono text-sm font-bold text-red-400">{m.before}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.06} y={16}>
            <div className="rounded-2xl border p-5" style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.charcoalSurface }}>
              <p className="font-dm-mono text-[11px] uppercase tracking-wider" style={{ color: g4mColors.subdued }}>
                After · Redesign
              </p>
              <div className="mt-3 divide-y" style={{ borderColor: g4mColors.hairline }}>
                {METRICS.map((m) => (
                  <div key={m.label} className="flex items-center justify-between border-t py-2.5 first:border-t-0" style={{ borderColor: g4mColors.hairline }}>
                    <span className="font-figtree text-[13px] text-white/80">{m.label}</span>
                    <span className="font-dm-mono text-sm font-bold text-emerald-400">{m.after}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRINCIPLES.map((p, i) => (
          <RevealOnScroll key={p.n} delay={0.05 * i} y={14}>
            <div className="border-t-2 pt-3" style={{ borderColor: g4mColors.burntSienna }}>
              <span className="font-dm-mono text-xs" style={{ color: g4mColors.burntSienna }}>
                {p.n}
              </span>
              <p className="mt-1 font-big-shoulders text-lg font-bold uppercase tracking-tight text-white">
                {p.title}
              </p>
              <p className="mt-1.5 font-figtree text-[13px] leading-relaxed" style={{ color: g4mColors.subdued }}>
                {p.detail}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={0.1} y={16}>
        <div
          className="rounded-[24px] p-6 sm:p-8"
          style={{ backgroundColor: g4mColors.obsidian, border: `1px solid ${g4mColors.hairline}` }}
        >
          <p className="font-dm-mono text-[11px] uppercase tracking-wider" style={{ color: g4mColors.subdued }}>
            Reflection
          </p>
          <p className="mt-3 font-big-shoulders text-xl font-extrabold uppercase leading-tight text-white sm:text-2xl">
            Music deserves a storefront that takes it seriously.
          </p>
          <p className="mt-4 font-figtree text-[15px] leading-relaxed" style={{ color: g4mColors.subdued }}>
            The gear4music redesign isn&apos;t about aesthetics for aesthetics&apos; sake. It&apos;s about giving
            musicians a digital experience as considered as the instruments they&apos;re looking for. Every decision
            — from the condensed display typeface to the full-screen search — traces back to a real user need
            uncovered in research.
          </p>
          <p className="mt-3 font-figtree text-[15px] leading-relaxed" style={{ color: g4mColors.subdued }}>
            The dark canvas isn&apos;t a trend choice. It&apos;s a practical one: professional music environments are
            low-light, and a screen that doesn&apos;t fight the room keeps the focus where it belongs — on the gear.
          </p>
        </div>
      </RevealOnScroll>
    </div>
  );
}
