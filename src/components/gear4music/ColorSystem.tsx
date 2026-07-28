import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { g4mColors, g4mContrast } from "./tokens";

const PALETTE: { name: string; hex: string; note: string; light?: boolean }[] = [
  { name: "Obsidian", hex: g4mColors.obsidian, note: "Page Background" },
  { name: "Charcoal Surface", hex: g4mColors.charcoalSurface, note: "Card / Panel" },
  { name: "Raised Surface", hex: g4mColors.raisedSurface, note: "Secondary Surface" },
  { name: "Burnt Sienna", hex: g4mColors.burntSienna, note: "Primary / Brand" },
  { name: "Warm Amber", hex: g4mColors.warmAmber, note: "Accent" },
  { name: "Warm White", hex: g4mColors.warmWhite, note: "Foreground", light: true },
  { name: "Subdued", hex: g4mColors.subdued, note: "Muted Foreground" },
  { name: "Hairline", hex: g4mColors.hairline, note: "Border" },
];

export default function ColorSystem() {
  return (
    <div>
      <SectionHeading index="04" title="The Palette" />
      <p className="mt-3 max-w-lg font-figtree text-sm" style={{ color: g4mColors.subdued }}>
        Dark-first. Every color chosen for contrast, warmth, and clear semantic role.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PALETTE.map((c, i) => (
          <RevealOnScroll key={c.name} delay={0.04 * i} y={14}>
            <div
              className="aspect-square w-full rounded-2xl border"
              style={{ backgroundColor: c.hex, borderColor: g4mColors.hairline }}
            />
            <p className="mt-2 font-big-shoulders text-sm font-bold uppercase tracking-tight text-white">
              {c.name}
            </p>
            <p className="font-dm-mono text-[11px] uppercase" style={{ color: g4mColors.subdued }}>{c.hex}</p>
            <p className="mt-0.5 font-figtree text-[11px]" style={{ color: g4mColors.subdued }}>{c.note}</p>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={0.15} y={14} className="mt-8">
        <p className="font-dm-mono text-xs uppercase tracking-wider" style={{ color: g4mColors.subdued }}>
          Contrast Ratios — WCAG AA
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {g4mContrast.map((c) => (
            <div
              key={c.pair}
              className="rounded-2xl border p-4"
              style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.charcoalSurface }}
            >
              <p className="font-big-shoulders text-lg font-bold text-white">Aa {c.ratio}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-figtree text-xs" style={{ color: g4mColors.subdued }}>
                  {c.pair}
                </p>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-dm-mono text-[10px] font-medium text-emerald-400">
                  PASS
                </span>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  );
}
