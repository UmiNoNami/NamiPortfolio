import type { CSSProperties, ReactNode } from "react";
import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { g4mColors } from "./tokens";

// Simple single-color line icons standing in for product photography — kept
// as clean generic silhouettes (not any brand's real product shots) so the
// "Product Card" demo still reads clearly without needing real photos.
type ProductIconProps = { className?: string; style?: CSSProperties };

function GuitarGlyph({ className, style }: ProductIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.6 2.5l2.3 2.3" />
      <rect x="12.5" y="3" width="2.2" height="2.2" rx="0.4" transform="rotate(45 13.6 4.1)" />
      <line x1="14" y1="4.8" x2="9.6" y2="9.2" />
      <circle cx="8.2" cy="15.4" r="5.1" />
      <circle cx="8.2" cy="15.4" r="1.6" />
    </svg>
  );
}

function KeyboardGlyph({ className, style }: ProductIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="8" rx="1.2" />
      <line x1="7" y1="8" x2="7" y2="12" />
      <line x1="10.5" y1="8" x2="10.5" y2="12" />
      <line x1="14" y1="8" x2="14" y2="12" />
      <line x1="17.5" y1="8" x2="17.5" y2="12" />
    </svg>
  );
}

function DrumKitGlyph({ className, style }: ProductIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12.5" r="4.3" />
      <circle cx="5.3" cy="8.8" r="2.6" />
      <circle cx="18.7" cy="8.8" r="2.6" />
      <line x1="12" y1="16.8" x2="12" y2="20" />
    </svg>
  );
}

function MicrophoneGlyph({ className, style }: ProductIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="9" y1="21" x2="15" y2="21" />
    </svg>
  );
}

const COMPONENTS = [
  "Primary Button",
  "Ghost Button",
  "Product Card",
  "Sale Badge",
  "Cart Badge",
  "Search Overlay",
  "Slide Menu",
  "Hero Carousel",
  "Category Tile",
  "Brand Logo Grid",
  "Toast Notification",
  "Stat Counter",
];

function SubLabel({ children }: { children: string }) {
  return (
    <p className="font-dm-mono text-xs uppercase tracking-wider" style={{ color: g4mColors.subdued }}>
      {children}
    </p>
  );
}

function Row({ children }: { children: ReactNode }) {
  return (
    <div
      className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl border p-4"
      style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.charcoalSurface }}
    >
      {children}
    </div>
  );
}

const PRODUCTS = [
  { brand: "Fender", name: "Fender Stratocaster", price: "€1,299", was: null, badge: "NEW", badgeBg: g4mColors.warmWhite, badgeText: g4mColors.obsidian, Icon: GuitarGlyph },
  { brand: "Yamaha", name: "Yamaha P-145B", price: "€449", was: "€599", badge: "SALE", badgeBg: g4mColors.warmAmber, badgeText: g4mColors.obsidian, Icon: KeyboardGlyph },
  { brand: "Roland", name: "Roland TD-17KV", price: "€999", was: null, badge: null, badgeBg: "", badgeText: "", Icon: DrumKitGlyph },
  { brand: "Shure", name: "Shure SM7B", price: "€359", was: null, badge: "HOT", badgeBg: g4mColors.burntSienna, badgeText: "#fff", Icon: MicrophoneGlyph },
];

export default function ComponentsShowcase() {
  return (
    <div>
      <SectionHeading index="06" title="Building Blocks" />
      <p className="mt-3 max-w-lg font-figtree text-sm" style={{ color: g4mColors.subdued }}>
        12 core components covering every interaction state in the purchase journey.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {COMPONENTS.map((c, i) => (
          <RevealOnScroll key={c} delay={0.02 * i} y={12}>
            <div
              className="rounded-xl border px-3 py-3 text-center"
              style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.raisedSurface }}
            >
              <p className="font-figtree text-[12px] font-medium text-white">{c}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <p className="mt-8 font-dm-mono text-xs uppercase tracking-wider" style={{ color: g4mColors.subdued }}>
        Live Demos
      </p>

      <RevealOnScroll y={16} className="mt-3">
        <SubLabel>Buttons</SubLabel>
        <Row>
          <button
            type="button"
            className="rounded-lg px-4 py-2.5 font-figtree text-xs font-semibold text-white"
            style={{ backgroundColor: g4mColors.burntSienna }}
          >
            Add to Basket
          </button>
          <button
            type="button"
            className="rounded-lg border px-4 py-2.5 font-figtree text-xs font-semibold text-white"
            style={{ borderColor: g4mColors.subdued }}
          >
            View Details
          </button>
          <button type="button" className="font-figtree text-xs font-semibold" style={{ color: g4mColors.burntSienna }}>
            See All →
          </button>
          <button
            type="button"
            className="rounded-lg px-4 py-2.5 font-dm-mono text-[11px] font-bold uppercase"
            style={{ backgroundColor: g4mColors.warmAmber, color: g4mColors.obsidian }}
          >
            Sale — 30% Off
          </button>
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-lg px-4 py-2.5 font-dm-mono text-[11px] font-bold uppercase opacity-40"
            style={{ backgroundColor: g4mColors.raisedSurface, color: g4mColors.subdued }}
          >
            Out of Stock
          </button>
        </Row>
      </RevealOnScroll>

      <RevealOnScroll delay={0.06} y={16} className="mt-6">
        <SubLabel>Product Card</SubLabel>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className="overflow-hidden rounded-xl border"
              style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.charcoalSurface }}
            >
              <div className="relative flex aspect-square items-center justify-center" style={{ backgroundColor: g4mColors.raisedSurface }}>
                <p.Icon className="h-10 w-10 sm:h-12 sm:w-12" style={{ color: g4mColors.subdued }} />
                {p.badge && (
                  <span
                    className="absolute left-2 top-2 rounded-full px-2 py-0.5 font-dm-mono text-[9px] font-bold uppercase"
                    style={{ backgroundColor: p.badgeBg, color: p.badgeText }}
                  >
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="font-dm-mono text-[9px] uppercase tracking-wider" style={{ color: g4mColors.subdued }}>
                  {p.brand}
                </p>
                <p className="mt-0.5 font-big-shoulders text-sm font-bold text-white">{p.name}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="font-dm-mono text-xs font-bold" style={{ color: g4mColors.burntSienna }}>
                    {p.price}
                  </span>
                  {p.was && (
                    <span className="font-dm-mono text-[10px] line-through" style={{ color: g4mColors.subdued }}>
                      {p.was}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.12} y={16} className="mt-6">
        <SubLabel>Badges &amp; States</SubLabel>
        <Row>
          <span className="rounded-full px-3 py-1 font-dm-mono text-[10px] font-bold uppercase" style={{ backgroundColor: g4mColors.warmWhite, color: g4mColors.obsidian }}>
            New Arrival
          </span>
          <span className="rounded-full px-3 py-1 font-dm-mono text-[10px] font-bold uppercase" style={{ backgroundColor: g4mColors.warmAmber, color: g4mColors.obsidian }}>
            On Sale
          </span>
          <span className="rounded-full px-3 py-1 font-dm-mono text-[10px] font-bold uppercase text-white" style={{ backgroundColor: g4mColors.burntSienna }}>
            Hot Pick
          </span>
          <span className="rounded-full border px-3 py-1 font-dm-mono text-[10px] font-bold uppercase opacity-50" style={{ borderColor: g4mColors.subdued, color: g4mColors.subdued }}>
            Out of Stock
          </span>
          <span className="rounded-full border px-3 py-1 font-dm-mono text-[10px] font-bold uppercase text-emerald-400" style={{ borderColor: "#34d39955" }}>
            In Stock
          </span>
          <span className="flex items-center gap-1.5 font-figtree text-xs text-white">
            Basket
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full font-dm-mono text-[10px] font-bold text-white"
              style={{ backgroundColor: g4mColors.burntSienna }}
            >
              3
            </span>
          </span>
        </Row>
      </RevealOnScroll>

      <RevealOnScroll delay={0.18} y={16} className="mt-6">
        <SubLabel>Toast Notification</SubLabel>
        <div className="mt-3 max-w-xs rounded-xl border p-4" style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.raisedSurface }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-lg" style={{ backgroundColor: g4mColors.charcoalSurface }} />
            <div className="flex-1">
              <p className="font-figtree text-sm font-semibold text-white">Added to Basket</p>
              <p className="font-figtree text-xs" style={{ color: g4mColors.subdued }}>
                Fender Stratocaster · €1,299
              </p>
            </div>
            <span className="font-figtree text-lg" style={{ color: g4mColors.subdued }}>
              ×
            </span>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
