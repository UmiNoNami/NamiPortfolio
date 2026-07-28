import type { ComponentType } from "react";
import { PlayIcon } from "@/components/ModernIcons";

// Fills a BrowserFrame/PhoneFrame until real screenshots or video clips are
// dropped in — an accent-colored panel with the project's icon, optionally
// with a play affordance to read as a video slot.
export default function MockupPlaceholder({
  Icon,
  bg,
  withPlay = false,
}: {
  Icon: ComponentType<{ className?: string }>;
  bg: string;
  withPlay?: boolean;
}) {
  return (
    <div className={`relative flex h-full w-full items-center justify-center ${bg}`}>
      <Icon className="h-10 w-10 text-white/80" />
      {withPlay && (
        <span className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-md">
          <PlayIcon className="ml-0.5 h-5 w-5 text-navy" />
        </span>
      )}
    </div>
  );
}
