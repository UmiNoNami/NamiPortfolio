import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { g4mColors } from "./tokens";

const PROBLEMS = [
  {
    n: "01",
    title: "Visual Overload",
    detail:
      "Banner promotions, sidebar filters, sticky upsells and competing CTAs created cognitive paralysis before a user could locate an instrument category.",
  },
  {
    n: "02",
    title: "Broken Discovery",
    detail:
      "The search bar returned unranked flat results with no category pre-filtering. Users abandoned the funnel at the search step in 38% of sessions.",
  },
  {
    n: "03",
    title: "Trust Signals Missing",
    detail:
      "No visible returns policy, brand logos buried in a footer table, and a checkout that felt dated compared to direct-to-consumer competitors like Andertons.",
  },
  {
    n: "04",
    title: "Mobile Parity Gap",
    detail:
      "The desktop layout was compressed into mobile viewports rather than redesigned. Tap targets averaged 28px — well below the 44px accessibility floor.",
  },
  {
    n: "05",
    title: "Brand Identity Absent",
    detail:
      "No consistent colour palette, three competing typefaces in the navigation alone, and a logo that differed between header, email, and app icon.",
  },
  {
    n: "06",
    title: "Performance Debt",
    detail:
      "Unoptimised hero images and third-party scripts pushed page load speed to 4.8 seconds, directly correlating with a 22% bounce rate on product landing pages.",
  },
];

export default function ProblemGrid() {
  return (
    <div>
      <SectionHeading index="01" title="What Was Broken" />
      <p className="mt-3 max-w-lg font-figtree text-sm" style={{ color: g4mColors.subdued }}>
        The legacy site had a catalogue of problems as large as its product range.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
