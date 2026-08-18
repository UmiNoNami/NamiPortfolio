import RevealOnScroll from "../RevealOnScroll";
import ProblemGrid from "./ProblemGrid";
import ResearchQuotes from "./ResearchQuotes";
import WireframeScreens from "./WireframeScreens";
import ColorSystem from "./ColorSystem";
import TypographySpec from "./TypographySpec";
import ComponentsShowcase from "./ComponentsShowcase";
import RealScreens from "./RealScreens";
import Outcomes from "./Outcomes";
import SectionHeading from "./SectionHeading";
import { g4mColors } from "./tokens";

const RESPONSIBILITIES = [
  "Heuristic review",
  "Competitive review",
  "Information architecture",
  "User-flow planning",
  "Wireframing",
  "Visual design",
  "Interactive prototype",
];

const KEY_DECISIONS = [
  {
    title: "Search as a discovery tool",
    detail:
      "Search was expanded into a browse-first experience that allows customers to move from major categories to subcategories and products.",
  },
  {
    title: "Reduced navigation",
    detail: "The mobile navigation focuses on four essential actions: home, search, basket and menu.",
  },
  {
    title: "Visible purchase information",
    detail: "Delivery, availability, returns and the running order total remain visible at relevant decision points.",
  },
  {
    title: "Consistent product cards",
    detail: "Product imagery, pricing, status badges and calls to action follow one repeatable hierarchy.",
  },
  {
    title: "Dark visual direction",
    detail:
      "The dark interface was chosen to give product photography greater visual focus and create a distinctive music-focused identity. This is a visual design decision, not a proven performance improvement.",
  },
];

/**
 * The full gear4music.ie case study, rebuilt section-for-section as an
 * honest, clearly-labelled independent concept: context, a heuristic
 * review (not a claim of private analytics access), the design challenge,
 * the key decisions behind the redesign, the core shopping flow, the
 * design system, the final solution, and an outcome/reflection that makes
 * no unverified before/after performance claims.
 *
 * Wrapped in its own dark card (matching the case study's actual dark-first
 * palette) rather than inheriting the site's light cream background, since
 * the content only reads correctly against Obsidian.
 */
export default function Gear4MusicShowcase() {
  return (
    <div
      className="space-y-16 rounded-[28px] p-6 sm:space-y-20 sm:p-10"
      style={{ backgroundColor: g4mColors.obsidian, border: `1px solid ${g4mColors.hairline}` }}
    >
      {/* 02 — Context + role */}
      <RevealOnScroll>
        <div>
          <SectionHeading index="02" title="Context" />
          <p className="mt-3 max-w-2xl font-figtree text-[15px] leading-relaxed" style={{ color: g4mColors.subdued }}>
            Large e-commerce catalogues must support very different customers, from beginners exploring their
            first instrument to experienced musicians searching for a specific product. This concept focuses
            on reducing visual competition and creating a more structured route from discovery to checkout.
          </p>

          <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.charcoalSurface }}>
            <p className="font-dm-mono text-[11px] uppercase tracking-wider" style={{ color: g4mColors.burntSienna }}>
              My Role — UX/UI Designer
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-4">
              {RESPONSIBILITIES.map((r) => (
                <li key={r} className="flex items-center gap-2 font-figtree text-[13px]" style={{ color: g4mColors.subdued }}>
                  <span className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: g4mColors.burntSienna }} />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealOnScroll>

      {/* 03 — Heuristic review */}
      <RevealOnScroll delay={0.05}>
        <ProblemGrid index="03" />
      </RevealOnScroll>

      {/* 04 — Design challenge */}
      <RevealOnScroll delay={0.05}>
        <ResearchQuotes index="04" />
      </RevealOnScroll>

      {/* 05 — Key design decisions */}
      <RevealOnScroll>
        <SectionHeading index="05" title="Key Design Decisions" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {KEY_DECISIONS.map((d, i) => (
            <RevealOnScroll key={d.title} delay={0.05 * i} y={14}>
              <div
                className="h-full rounded-2xl border p-5"
                style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.charcoalSurface }}
              >
                <p className="font-big-shoulders text-base font-bold uppercase tracking-tight text-white">
                  {d.title}
                </p>
                <p className="mt-1.5 font-figtree text-[13px] leading-relaxed" style={{ color: g4mColors.subdued }}>
                  {d.detail}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </RevealOnScroll>

      {/* 06 — Core shopping flow */}
      <RevealOnScroll delay={0.05}>
        <WireframeScreens index="06" />
      </RevealOnScroll>

      {/* 07–09 — Design system */}
      <div className="space-y-14">
        <RevealOnScroll>
          <ColorSystem index="07" />
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <TypographySpec index="08" />
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <ComponentsShowcase index="09" />
        </RevealOnScroll>
      </div>

      {/* 10 — Final solution */}
      <RevealOnScroll>
        <RealScreens index="10" />
      </RevealOnScroll>

      {/* 11 — Outcome / 12 — Reflection */}
      <Outcomes />
    </div>
  );
}
