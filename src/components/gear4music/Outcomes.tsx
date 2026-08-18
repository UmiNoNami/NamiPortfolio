import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { g4mColors } from "./tokens";

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
        <SectionHeading index="11" title="Outcome" />
        <p className="mt-3 max-w-2xl font-figtree text-[15px] leading-relaxed" style={{ color: g4mColors.subdued }}>
          The final concept covers the main shopping journey from product discovery to order confirmation. It
          also includes a reusable component system for navigation, product cards, status badges, buttons,
          search and checkout.
        </p>
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
            12 — Reflection
          </p>
          <p className="mt-4 font-figtree text-[15px] leading-relaxed" style={{ color: g4mColors.subdued }}>
            The strongest improvement was creating a more consistent path through a large catalogue. The next
            step would be usability testing with beginner and experienced musicians to compare browsing
            behaviour, search expectations and checkout comprehension.
          </p>
        </div>
      </RevealOnScroll>
    </div>
  );
}
