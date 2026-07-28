import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { g4mColors } from "./tokens";

// The Figma Make source renders its lo-fi wireframes as grey placeholder
// bars/boxes on the dark canvas rather than exported PNGs, so each screen is
// recreated here the same way — plain blocks standing in for real content,
// not polished mockups.
function Bar({ w = "100%", h = 10 }: { w?: string; h?: number }) {
  return <div className="rounded-full" style={{ width: w, height: h, backgroundColor: g4mColors.subdued + "55" }} />;
}

function ScreenFrame({ label, note, children }: { label: string; note: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        className="aspect-[9/16] w-full overflow-hidden rounded-2xl border p-4"
        style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.obsidian }}
      >
        {children}
      </div>
      <p className="mt-2 text-center font-dm-mono text-[11px] uppercase tracking-wider text-white">{label}</p>
      <p className="mt-1 text-center font-figtree text-[11px] leading-snug" style={{ color: g4mColors.subdued }}>
        {note}
      </p>
    </div>
  );
}

const DECISIONS = [
  {
    title: "Nav Reduced To 4 Icons",
    detail:
      "Logo, Search, Basket, Menu. Eliminated exposed category mega-nav which competed with hero content and confused mobile users.",
  },
  {
    title: "Search = Discovery",
    detail:
      "Redesigned search as a browse-first experience: show 8 illustrated category tiles first, drill to subcategories, then products. Reduces dead-end searches.",
  },
  {
    title: "Zero-Chrome Basket",
    detail:
      "Cart state lives in an animated badge only. No sidebar drawer — fewer UI layers, less cognitive load. Confirmation via toast.",
  },
];

export default function WireframeScreens() {
  return (
    <div>
      <SectionHeading index="03" title="Lo-Fi to Hi-Fi" />
      <p className="mt-3 max-w-lg font-figtree text-sm" style={{ color: g4mColors.subdued }}>
        Four key screens drive the entire purchase journey. Each was tested at low fidelity before visual design
        began.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <RevealOnScroll delay={0} y={16}>
          <ScreenFrame label="Homepage" note="Auto-advancing hero, category grid, product rails, brand grid, footer">
            <div className="flex items-center justify-between">
              <Bar w="35%" h={8} />
              <div className="flex gap-1">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: g4mColors.subdued + "55" }} />
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: g4mColors.subdued + "55" }} />
              </div>
            </div>
            <div className="mt-3 space-y-2 rounded-lg p-3" style={{ backgroundColor: g4mColors.charcoalSurface }}>
              <Bar w="70%" h={10} />
              <Bar w="45%" h={6} />
              <div className="mt-2 h-3 w-16 rounded-full" style={{ backgroundColor: g4mColors.burntSienna }} />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((k) => (
                <div key={k} className="h-8 rounded" style={{ backgroundColor: g4mColors.charcoalSurface }} />
              ))}
            </div>
          </ScreenFrame>
        </RevealOnScroll>

        <RevealOnScroll delay={0.06} y={16}>
          <ScreenFrame label="Search Overlay" note="Full-screen with category browse, drill-down subcategory, then product grid">
            <Bar w="90%" h={10} />
            <p className="mt-3 font-figtree text-[10px]" style={{ color: g4mColors.subdued }}>
              Browse Categories
            </p>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5">
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <div key={k} className="flex h-8 items-center justify-center rounded" style={{ backgroundColor: g4mColors.charcoalSurface }}>
                  <Bar w="60%" h={5} />
                </div>
              ))}
            </div>
          </ScreenFrame>
        </RevealOnScroll>

        <RevealOnScroll delay={0.12} y={16}>
          <ScreenFrame label="Product Detail" note="Hero image, price, specs, Add to Basket, delivery/returns trust strip">
            <div className="flex items-center justify-between">
              <Bar w="50%" h={8} />
              <Bar w="15%" h={8} />
            </div>
            <div className="mt-3 flex aspect-square items-center justify-center rounded-lg" style={{ backgroundColor: g4mColors.charcoalSurface }}>
              <div className="h-10 w-10 rounded" style={{ backgroundColor: g4mColors.subdued + "40" }} />
            </div>
            <div className="mt-2 h-2.5 w-24 rounded-full" style={{ backgroundColor: g4mColors.burntSienna }} />
            <div className="mt-2 space-y-1.5">
              <Bar w="100%" h={5} />
              <Bar w="80%" h={5} />
            </div>
            <div className="mt-2 h-6 rounded" style={{ backgroundColor: g4mColors.burntSienna }} />
          </ScreenFrame>
        </RevealOnScroll>

        <RevealOnScroll delay={0.18} y={16}>
          <ScreenFrame label="Slide Menu" note="Utility links — Support, Company, Legal — slide in from the left">
            <Bar w="55%" h={8} />
            <div className="mt-4 space-y-2.5">
              {[85, 65, 70, 55, 60].map((w, k) => (
                <Bar key={k} w={`${w}%`} h={5} />
              ))}
            </div>
            <div className="mt-3 h-2 w-14 rounded-full" style={{ backgroundColor: g4mColors.burntSienna }} />
          </ScreenFrame>
        </RevealOnScroll>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {DECISIONS.map((d, i) => (
          <RevealOnScroll key={d.title} delay={0.05 * i} y={14}>
            <div className="border-l-2 pl-4" style={{ borderColor: g4mColors.burntSienna }}>
              <p className="font-big-shoulders text-base font-bold uppercase tracking-tight text-white">{d.title}</p>
              <p className="mt-1.5 font-figtree text-[13px] leading-relaxed" style={{ color: g4mColors.subdued }}>
                {d.detail}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
