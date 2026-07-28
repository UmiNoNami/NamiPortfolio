import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { g4mColors } from "./tokens";

function WeightBadge({ children }: { children: string }) {
  return (
    <span
      className="rounded-md border px-2 py-0.5 font-dm-mono text-[10px]"
      style={{ borderColor: g4mColors.hairline, color: g4mColors.subdued }}
    >
      {children}
    </span>
  );
}

function SpecimenCard({
  tag,
  name,
  weights,
  sample,
  fontClass,
}: {
  tag: string;
  name: string;
  weights: string[];
  sample: string;
  fontClass: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border" style={{ borderColor: g4mColors.hairline }}>
      <div className="p-5" style={{ backgroundColor: g4mColors.charcoalSurface }}>
        <span className="font-dm-mono text-[11px] uppercase tracking-wider" style={{ color: g4mColors.burntSienna }}>
          {tag}
        </span>
        <p className={`mt-1 text-xl font-bold text-white ${fontClass}`}>{name}</p>
      </div>
      <div className="p-5" style={{ backgroundColor: g4mColors.obsidian }}>
        <p className={`text-2xl text-white ${fontClass}`}>{sample}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {weights.map((w) => (
            <WeightBadge key={w}>{w}</WeightBadge>
          ))}
        </div>
      </div>
    </div>
  );
}

const SCALE: { label: string; spec: string; sample: string; className: string; use: string }[] = [
  { label: "Hero Display", spec: "5rem / lh 0.9", sample: "Sound W…", className: "font-big-shoulders font-extrabold uppercase", use: "Hero carousel headline" },
  { label: "Section Heading", spec: "3rem / lh 1.0", sample: "New Arrivals", className: "font-big-shoulders font-extrabold uppercase", use: "Section titles" },
  { label: "Card Heading", spec: "1.4rem / lh 1.1", sample: "Fender Stratocaster", className: "font-big-shoulders font-bold", use: "Product card titles" },
  { label: "Body Large", spec: "1.125rem / lh 1.7", sample: "Discover instruments and pro audio gear.", className: "font-figtree font-normal", use: "Hero subheading, section intros" },
  { label: "Body Regular", spec: "0.9375rem / lh 1.6", sample: "Free delivery on orders over €49. 30-day returns.", className: "font-figtree font-normal", use: "Product descriptions, nav links" },
  { label: "Label / UI", spec: "0.6875rem / lh 1", sample: "NEW ARRIVAL · €1,299.00", className: "font-dm-mono uppercase tracking-wider", use: "Badges, price tags, category labels" },
];

export default function TypographySpec() {
  return (
    <div>
      <SectionHeading index="05" title="Type Hierarchy" />
      <p className="mt-3 max-w-lg font-figtree text-sm" style={{ color: g4mColors.subdued }}>
        Three families with one purpose each. No redundancy, no decoration.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <RevealOnScroll y={16}>
          <SpecimenCard
            tag="Display / Headings"
            name="Big Shoulders Display"
            sample="STRATOCASTER"
            weights={["700", "800", "900"]}
            fontClass="font-big-shoulders font-extrabold uppercase"
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.06} y={16}>
          <SpecimenCard
            tag="Body / UI Text"
            name="Figtree"
            sample="Free UK & Ireland delivery"
            weights={["400", "500", "600", "700"]}
            fontClass="font-figtree"
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.12} y={16}>
          <SpecimenCard
            tag="Labels / Metadata"
            name="DM Mono"
            sample="NEW · €1,299.00"
            weights={["400", "500"]}
            fontClass="font-dm-mono"
          />
        </RevealOnScroll>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border" style={{ borderColor: g4mColors.hairline }}>
        {SCALE.map((row, i) => (
          <RevealOnScroll key={row.label} delay={0.04 * i} y={10}>
            <div
              className="flex flex-wrap items-center gap-3 px-5 py-3.5"
              style={{ backgroundColor: i % 2 === 0 ? g4mColors.charcoalSurface : g4mColors.obsidian }}
            >
              <span className="w-28 shrink-0 font-dm-mono text-[10px] uppercase tracking-wider" style={{ color: g4mColors.subdued }}>
                {row.label}
              </span>
              <span
                className="shrink-0 rounded-md px-2 py-0.5 font-dm-mono text-[10px]"
                style={{ backgroundColor: g4mColors.raisedSurface, color: g4mColors.subdued }}
              >
                {row.spec}
              </span>
              <span className={`flex-1 text-white ${row.className}`} style={{ fontSize: row.label.includes("Hero") ? "1.4rem" : undefined }}>
                {row.sample}
              </span>
              <span className="w-full font-figtree text-[11px] sm:w-auto" style={{ color: g4mColors.subdued }}>
                {row.use}
              </span>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
