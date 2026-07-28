import RevealOnScroll from "../RevealOnScroll";
import { CalendarIcon, ChatIcon, BookIcon, ChecklistIcon } from "../ModernIcons";
import { plutoColors } from "./tokens";

const TOOLS = [
  { Icon: CalendarIcon, label: "Timetable app", note: "Shows the schedule, nothing else", rotate: "-rotate-3" },
  { Icon: BookIcon, label: "University LMS", note: "Assignments buried in a portal", rotate: "rotate-2" },
  { Icon: ChatIcon, label: "Group chat", note: "Deadlines get lost in the scroll", rotate: "-rotate-2" },
  { Icon: ChecklistIcon, label: "Generic to-do app", note: "Disconnected from any of it", rotate: "rotate-3" },
];

/**
 * An illustrated stand-in for research artifacts — since there's no photographed
 * whiteboard or survey deck to show, this represents the actual finding: four
 * disconnected tools students juggle, scattered like sticky notes, all pointing
 * at the same gap.
 */
export default function ResearchBoard() {
  return (
    <div className="relative rounded-[28px] bg-cream-dim p-6 dark:bg-midnight-card sm:p-10">
      <div className="grid grid-cols-2 gap-4 sm:gap-5">
        {TOOLS.map(({ Icon, label, note, rotate }, i) => (
          <RevealOnScroll key={label} delay={0.06 * i} y={16}>
            <div
              className={`rounded-2xl bg-white p-4 shadow-md dark:bg-navy-soft/40 ${rotate} transition-transform hover:rotate-0`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream-dim text-navy/60 dark:bg-white/10 dark:text-cream/70">
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-3 font-sans text-sm font-semibold text-navy dark:text-cream">{label}</p>
              <p className="mt-1 font-sans text-xs leading-snug text-navy/55 dark:text-cream/55">{note}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6 sm:p-10">
        <RevealOnScroll delay={0.3} y={10} className="pointer-events-auto">
          <div
            className="max-w-[190px] rounded-2xl px-4 py-3 text-center font-sans text-[13px] font-semibold leading-snug shadow-lg sm:max-w-[210px] sm:px-5 sm:text-sm"
            style={{ backgroundColor: plutoColors.yellow, color: plutoColors.ink }}
          >
            None of them show what&apos;s due today
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
