import { g4mColors } from "./tokens";

const STATS = [
  { value: "250K+", label: "Products catalogued" },
  { value: "12", label: "Top-level categories" },
  { value: "24", label: "Supported brands" },
  { value: "4.8s", label: "Load time on legacy site" },
];

// A recreation of the real Figma Make hero — there's no exported cover image
// for this project, so the actual headline, copy, and stat grid are rebuilt
// here directly rather than standing in with a generic mockup.
export default function HeroPreview() {
  return (
    <div className="w-full p-6 sm:p-10" style={{ backgroundColor: g4mColors.obsidian }}>
      <span
        className="inline-block rounded-full border px-3 py-1 font-dm-mono text-[11px] uppercase tracking-wider"
        style={{ borderColor: g4mColors.hairline, color: g4mColors.subdued }}
      >
        Case Study · gear4music.ie
      </span>

      <h2 className="mt-5 font-big-shoulders text-4xl font-black uppercase leading-[0.9] text-white sm:text-6xl">
        Sound without
        <br />
        <span style={{ color: g4mColors.burntSienna }}>compro-mise.</span>
      </h2>

      <p className="mt-5 max-w-md font-figtree text-sm leading-relaxed sm:text-base" style={{ color: g4mColors.subdued }}>
        A complete visual and UX redesign of Ireland&apos;s largest online music retailer — bringing clarity,
        confidence, and craft to a sprawling 250,000-product catalogue.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4" style={{ backgroundColor: g4mColors.hairline }}>
        {STATS.map((s) => (
          <div key={s.label} className="p-4" style={{ backgroundColor: g4mColors.charcoalSurface }}>
            <p className="font-big-shoulders text-2xl font-extrabold sm:text-3xl" style={{ color: g4mColors.burntSienna }}>
              {s.value}
            </p>
            <p className="mt-1 font-figtree text-[11px] leading-snug" style={{ color: g4mColors.subdued }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
