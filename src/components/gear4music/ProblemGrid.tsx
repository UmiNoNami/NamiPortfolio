import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { g4mColors } from "./tokens";

// Four heuristic-review findings — framed as observations from reviewing
// the live site against usability heuristics and competitor patterns, not
// as claims of access to Gear4Music's own analytics or research.
const PROBLEMS = [
  {
    n: "01",
    title: "Competing Visual Priorities",
    detail:
      "Promotional banners, navigation elements and product content compete for attention, making it difficult to identify the primary action.",
  },
  {
    n: "02",
    title: "Complex Product Discovery",
    detail:
      "A large catalogue requires clearer category relationships and stronger support for both browsing and direct search.",
  },
  {
    n: "03",
    title: "Inconsistent Trust Information",
    detail: "Delivery, returns and availability information should remain visible at important purchase decisions.",
  },
  {
    n: "04",
    title: "Mobile Hierarchy",
    detail: "Desktop navigation patterns need to be reconsidered for smaller screens rather than simply compressed.",
  },
];

export default function ProblemGrid({ index = "03" }: { index?: string }) {
  return (
    <div>
      <SectionHeading index={index} title="Areas of Opportunity" />
      <p className="mt-3 max-w-lg font-figtree text-sm" style={{ color: g4mColors.subdued }}>
        Findings from a heuristic review of the live site against standard usability heuristics and
        competitor patterns.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {PROBLEMS.map((p, i) => (
          <RevealOnScroll key={p.n} delay={0.05 * i} y={16}>
            <div
              className="h-full rounded-2xl border p-5 transition-transform duration-300 hover:-translate-y-1"
              style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.charcoalSurface }}
            >
              <span className="font-dm-mono text-xs" style={{ color: g4mColors.burntSienna }}>
                {p.n}
              </span>
              <p className="mt-1 font-big-shoulders text-lg font-bold uppercase tracking-tight text-white">
                {p.title}
              </p>
              <p className="mt-2 font-figtree text-[13px] leading-relaxed" style={{ color: g4mColors.subdued }}>
                {p.detail}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
