import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { g4mColors } from "./tokens";

// Framing the design challenge this concept is built around. No participant
// quotes here — there was no formal usability study behind this project, so
// nothing is attributed to research that didn't happen.
export default function ResearchQuotes({ index = "04" }: { index?: string }) {
  return (
    <div>
      <SectionHeading index={index} title="Design Challenge" />
      <RevealOnScroll delay={0.05} y={16} className="mt-5">
        <div
          className="rounded-2xl border p-6"
          style={{ borderColor: g4mColors.burntSienna + "40", backgroundColor: g4mColors.burntSienna + "14" }}
        >
          <p className="font-dm-mono text-[11px] uppercase tracking-wider" style={{ color: g4mColors.subdued }}>
            How might we
          </p>
          <p className="mt-2 font-big-shoulders text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
            How might a large music catalogue support confident product discovery without overwhelming the
            customer?
          </p>
        </div>
      </RevealOnScroll>
    </div>
  );
}
