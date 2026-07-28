import RevealOnScroll from "../RevealOnScroll";
import ProblemGrid from "./ProblemGrid";
import ResearchQuotes from "./ResearchQuotes";
import WireframeScreens from "./WireframeScreens";
import ColorSystem from "./ColorSystem";
import TypographySpec from "./TypographySpec";
import ComponentsShowcase from "./ComponentsShowcase";
import RealScreens from "./RealScreens";
import Outcomes from "./Outcomes";
import { g4mColors } from "./tokens";

/**
 * The full gear4music.ie case study, rebuilt section-for-section from the
 * Figma Make source: the problem, research insights, lo-fi-to-hi-fi
 * wireframes, the color system, the type system, the component library with
 * live demos, and finally outcomes + design principles + reflection.
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
      <RevealOnScroll>
        <ProblemGrid />
      </RevealOnScroll>

      <RevealOnScroll delay={0.05}>
        <ResearchQuotes />
      </RevealOnScroll>

      <RevealOnScroll delay={0.05}>
        <WireframeScreens />
      </RevealOnScroll>

      {/* Each design-system section gets its own scroll trigger — wrapping
          all three in a single reveal meant the whole (very tall) block had
          to be 25% on-screen before it would fade in, which left a large
          blank gap while scrolling past it. */}
      <div className="space-y-14">
        <RevealOnScroll>
          <ColorSystem />
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <TypographySpec />
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <ComponentsShowcase />
        </RevealOnScroll>
      </div>

      <RevealOnScroll>
        <RealScreens />
      </RevealOnScroll>

      <Outcomes />
    </div>
  );
}
