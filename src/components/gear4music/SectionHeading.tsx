import { g4mColors } from "./tokens";

// Unlike the site's light/dark theme toggle, the gear4music showcase always
// sits on its own dark Obsidian card (matching the real case study's
// dark-first palette), so this heading is always light — it doesn't adapt
// to the site's theme the way Pluto's SectionHeading does.
export default function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex h-7 w-7 items-center justify-center rounded-lg font-dm-mono text-[11px] font-bold text-white"
        style={{ backgroundColor: g4mColors.burntSienna }}
      >
        {index}
      </span>
      <h3 className="font-big-shoulders text-xl font-bold uppercase tracking-tight text-white">{title}</h3>
    </div>
  );
}
