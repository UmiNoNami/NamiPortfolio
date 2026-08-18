import { g4mColors } from "./tokens";

// A recreation of the real Figma Make hero — there's no exported cover image
// for this project, so the headline and copy are rebuilt here directly
// rather than standing in with a generic mockup. The stat grid that used to
// live here (page-load time, bounce rate, "supported brands", etc.) has been
// removed — those numbers were never measured against the real site and
// read as if they came from private analytics, which they didn't.
export default function HeroPreview() {
  return (
    <div className="w-full p-6 sm:p-10" style={{ backgroundColor: g4mColors.obsidian }}>
      <span
        className="inline-block rounded-full border px-3 py-1 font-dm-mono text-[11px] uppercase tracking-wider"
        style={{ borderColor: g4mColors.burntSienna, color: g4mColors.burntSienna }}
      >
        Independent conceptual redesign — not commissioned by Gear4Music
      </span>

      <h2 className="mt-5 font-big-shoulders text-4xl font-black uppercase leading-[0.9] text-white sm:text-6xl">
        Sound without
        <br />
        <span style={{ color: g4mColors.burntSienna }}>compro-mise.</span>
      </h2>

      <p className="mt-5 max-w-md font-figtree text-sm leading-relaxed sm:text-base" style={{ color: g4mColors.subdued }}>
        An independent conceptual redesign exploring how Gear4Music&apos;s online shopping experience could
        feel clearer, more focused and more confident across desktop and mobile.
      </p>
    </div>
  );
}
