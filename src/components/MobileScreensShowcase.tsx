import type { ComponentType } from "react";
import RevealOnScroll from "./RevealOnScroll";
import WireframeFlows from "./pluto/WireframeFlows";
import ColorSystem from "./pluto/ColorSystem";
import TypographySpec from "./pluto/TypographySpec";
import ComponentsShowcase from "./pluto/ComponentsShowcase";
import FinalScreensMarquee from "./pluto/FinalScreensMarquee";
import ResearchBoard from "./pluto/ResearchBoard";

type Step = { step: string; detail: string };

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="font-sans text-xs font-semibold uppercase tracking-wider text-navy/40 dark:text-cream/40">
      {children}
    </p>
  );
}

function Detail({ children }: { children: string }) {
  return (
    <p className="mt-3 font-sans text-[15px] leading-relaxed text-navy/70 dark:text-cream/70">{children}</p>
  );
}

/**
 * A bespoke "screens + story" gallery for the Pluto case study. Each of the
 * four groups (mapped from the project's process steps) gets its own
 * composition — an illustrated research board, the real wireframes, the
 * real design system, then an endless marquee of the final screens — so
 * the section has visual rhythm instead of feeling like a template.
 */
export default function MobileScreensShowcase({
  steps,
}: {
  steps: Step[];
  Icon?: ComponentType<{ className?: string }>;
  bg?: string;
}) {
  const [a, b, c, d] = steps;

  return (
    <div className="space-y-20">
      {/* Group 1 — text left, an illustrated research board on the right
          (not app screens — this step happens before the app exists). */}
      {a && (
        <RevealOnScroll>
          <div className="grid items-center gap-10 sm:grid-cols-2">
            <div>
              <Eyebrow>{a.step}</Eyebrow>
              <Detail>{a.detail}</Detail>
            </div>
            <ResearchBoard />
          </div>
        </RevealOnScroll>
      )}

      {/* Group 2 — the real wireframe flows from the design sheet, grouped
          the same way it is: auth flow, tab screens, drill-down detail. */}
      {b && (
        <RevealOnScroll delay={0.05}>
          <WireframeFlows />
        </RevealOnScroll>
      )}

      {/* Group 3 — the actual design system: colors, type, and components,
          pulled straight from the design sheet rather than generic mockups. */}
      {c && (
        <RevealOnScroll delay={0.05} className="space-y-14">
          <ColorSystem />
          <TypographySpec />
          <ComponentsShowcase />
        </RevealOnScroll>
      )}

      {/* Group 4 — the real, final screens in an endless alternating-direction
          marquee, boxed like a portfolio cover collage rather than a grid. */}
      {d && (
        <RevealOnScroll delay={0.05}>
          <Eyebrow>{d.step}</Eyebrow>
          <p className="mt-2 max-w-md font-sans text-sm text-navy/60 dark:text-cream/60">{d.detail}</p>
          <FinalScreensMarquee />
        </RevealOnScroll>
      )}
    </div>
  );
}
