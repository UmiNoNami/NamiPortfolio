import { PenIcon } from "./ModernIcons";

// Phone-portrait aspect ratios, close enough to a real screen that every
// card still reads as a full screen rather than a cropped sliver — small
// variation between them is what gives the grid its staggered look.
const ASPECTS = ["9/18", "9/16", "9/19", "9/17", "9/16", "9/19", "9/18", "9/17"];

/**
 * A loose, Pinterest-style sheet of flat low-fidelity screens — no phone
 * bezel, just soft rounded cards on a muted backdrop — for dropping in
 * quick wireframe PNGs. Swap each placeholder's contents for an
 * <Image src="/wireframes/..."> once the real screens are ready.
 */
export default function WireframeMasonry({ count = 8 }: { count?: number }) {
  return (
    <div className="rounded-[32px] bg-navy/[0.03] p-5 dark:bg-cream/[0.04] sm:p-8">
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="mb-4 flex w-full flex-col items-center justify-center gap-2 rounded-[22px] border border-dashed border-navy/15 bg-white text-navy/35 shadow-sm dark:border-cream/15 dark:bg-midnight-card dark:text-cream/35"
            style={{ aspectRatio: ASPECTS[i % ASPECTS.length], breakInside: "avoid" }}
          >
            <PenIcon className="h-4 w-4" />
            <span className="font-sans text-[11px]">Wireframe</span>
          </div>
        ))}
      </div>
    </div>
  );
}
