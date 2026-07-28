import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { g4mColors } from "./tokens";

const QUOTES = [
  {
    quote: "I can never find where to start — there's just too much going on.",
    who: "Beginner Guitarist, Age 24",
    insight: "Navigation hierarchy must collapse surface area for new visitors.",
  },
  {
    quote: "I know exactly what I want but the search always shows me the wrong thing first.",
    who: "Professional Sound Engineer, Age 38",
    insight: "Category-first search filtering is critical for expert users.",
  },
  {
    quote: "Does this company even ship to Ireland? I can't see it anywhere.",
    who: "Parent Buying a Gift, Age 44",
    insight: "Trust and localisation signals should appear above the fold.",
  },
  {
    quote: "The photos look like they were taken in 2009. Makes me doubt the quality.",
    who: "Studio Producer, Age 31",
    insight: "Photography quality directly affects perceived product and brand quality.",
  },
];

export default function ResearchQuotes() {
  return (
    <div>
      <SectionHeading index="02" title="What Users Said" />
      <p className="mt-3 max-w-lg font-figtree text-sm" style={{ color: g4mColors.subdued }}>
        Five rounds of usability testing with 18 participants across skill levels and device types.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {QUOTES.map((q, i) => (
          <RevealOnScroll key={q.who} delay={0.05 * i} y={16}>
            <div
              className="h-full rounded-2xl border p-5"
              style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.charcoalSurface }}
            >
              <p className="font-figtree text-base leading-snug text-white">&ldquo;{q.quote}&rdquo;</p>
              <div className="mt-4 border-t pt-3" style={{ borderColor: g4mColors.hairline }}>
                <p className="font-dm-mono text-[11px] uppercase tracking-wider" style={{ color: g4mColors.burntSienna }}>
                  {q.who}
                </p>
                <p className="mt-1.5 font-figtree text-[13px]" style={{ color: g4mColors.subdued }}>
                  {q.insight}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={0.2} y={16} className="mt-5">
        <div
          className="rounded-2xl border p-6"
          style={{ borderColor: g4mColors.burntSienna + "40", backgroundColor: g4mColors.burntSienna + "14" }}
        >
          <p className="font-dm-mono text-[11px] uppercase tracking-wider" style={{ color: g4mColors.subdued }}>
            Design Question
          </p>
          <p className="mt-2 font-big-shoulders text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
            How might we help musicians of all levels discover the right instrument — quickly, confidently, and
            without friction?
          </p>
        </div>
      </RevealOnScroll>
    </div>
  );
}
