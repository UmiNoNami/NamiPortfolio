import Image from "next/image";

// Real, final exported screens — order doesn't matter much here since they
// get shuffled across columns, just needs to cover the whole app.
const SCREENS = [
  { src: "/final/welcome.png", label: "Welcome" },
  { src: "/final/login.png", label: "Sign In" },
  { src: "/final/register.png", label: "Create Account" },
  { src: "/final/home.png", label: "Home" },
  { src: "/final/calendar.png", label: "Calendar" },
  { src: "/final/course.png", label: "My Courses" },
  { src: "/final/coursedetail.png", label: "Course Detail" },
  { src: "/final/todo.png", label: "To-Do" },
  { src: "/final/todo1.png", label: "New Task" },
  { src: "/final/profile.png", label: "Profile" },
  { src: "/final/ai.png", label: "Pluto AI" },
];

const COLUMN_COUNT = 4;
const columns: (typeof SCREENS)[] = Array.from({ length: COLUMN_COUNT }, (_, i) =>
  SCREENS.filter((_, idx) => idx % COLUMN_COUNT === i)
);

function Phone({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative aspect-[553/1012] w-full overflow-hidden rounded-[22px]">
      <Image src={src} alt={`${label} — final screen`} fill className="object-contain" sizes="200px" />
    </div>
  );
}

/**
 * An infinite, alternating-direction vertical marquee of the final screens —
 * columns 1 and 3 drift up, columns 2 and 4 drift down, looping forever
 * inside a fixed "box" so it reads like a portfolio cover collage rather
 * than a static grid.
 */
export default function FinalScreensMarquee() {
  return (
    <div className="relative mt-2 overflow-hidden rounded-[28px] bg-cream-dim p-4 dark:bg-midnight-card sm:p-6">
      {/* Defined inline (rather than as Tailwind theme utilities) so the
          animation never depends on the dev server having picked up a
          config change — it's guaranteed to ship with this component. */}
      <style>{`
        @keyframes pluto-marquee-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes pluto-marquee-down {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        .pluto-marquee-up { animation-name: pluto-marquee-up; animation-timing-function: linear; animation-iteration-count: infinite; }
        .pluto-marquee-down { animation-name: pluto-marquee-down; animation-timing-function: linear; animation-iteration-count: infinite; }
      `}</style>

      <div className="relative grid h-[480px] grid-cols-2 gap-4 overflow-hidden sm:h-[600px] sm:grid-cols-4 sm:gap-5">
        {columns.map((col, i) => {
          const looped = [...col, ...col];
          const direction = i % 2 === 0 ? "pluto-marquee-up" : "pluto-marquee-down";
          const duration = 22 + i * 4;
          return (
            <div key={i} className="overflow-hidden">
              <div
                className={`flex flex-col gap-4 sm:gap-5 ${direction}`}
                style={{ animationDuration: `${duration}s` }}
              >
                {looped.map((screen, j) => (
                  <Phone key={`${screen.src}-${j}`} src={screen.src} label={screen.label} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fade the top and bottom edges so screens appear to drift in/out of the box. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cream-dim to-transparent dark:from-midnight-card sm:h-24" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cream-dim to-transparent dark:from-midnight-card sm:h-24" />
    </div>
  );
}
