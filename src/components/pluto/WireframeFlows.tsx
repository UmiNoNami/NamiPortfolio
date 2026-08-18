import Image from "next/image";
import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";

function GroupLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-navy/10 after:h-px after:flex-1 after:bg-navy/10 dark:before:bg-cream/10 dark:after:bg-cream/10">
      <p className="shrink-0 font-dm text-xs font-semibold uppercase tracking-wider text-navy/35 dark:text-cream/35">
        {children}
      </p>
    </div>
  );
}

// The exported wireframe PNGs already include their own device outline and
// drop shadow, so each one is shown as-is — no extra bezel or card wrapper
// layered on top, just the real screen and a caption underneath.
function Screen({ src, label, priority = false }: { src: string; label: string; priority?: boolean }) {
  return (
    <div>
      <div className="relative aspect-[553/1012] w-full">
        <Image
          src={src}
          alt={`${label} wireframe`}
          fill
          className="object-contain drop-shadow-sm"
          sizes="(min-width: 640px) 220px, 45vw"
          priority={priority}
        />
      </div>
      <p className="mt-2 text-center font-dm text-[11px] font-medium text-navy/50 dark:text-cream/50">{label}</p>
    </div>
  );
}

function ScreenGrid({
  screens,
  className = "",
  priorityFirst = false,
}: {
  screens: { src: string; label: string }[];
  className?: string;
  priorityFirst?: boolean;
}) {
  return (
    <div className={className}>
      {screens.map((s, i) => (
        <RevealOnScroll key={s.src} delay={0.06 * i} y={18}>
          <Screen src={s.src} label={s.label} priority={priorityFirst && i === 0} />
        </RevealOnScroll>
      ))}
    </div>
  );
}

/**
 * The real low-fidelity wireframes exported from Figma, grouped the same
 * way the design sheet does: the auth flow, the main app tabs, the AI
 * assistant, then the course-detail drill-down.
 */
export default function WireframeFlows({ index = "01" }: { index?: string }) {
  return (
    <div>
      <SectionHeading index={index} title="Wireframes" />
      <p className="mt-3 max-w-lg font-dm text-sm text-navy/60 dark:text-cream/60">
        Mid-fidelity wireframes showing screen anatomy, navigation structure, and component placement across all 8
        screens.
      </p>

      <div className="mt-10 space-y-12">
        <RevealOnScroll>
          <GroupLabel>Auth Flow</GroupLabel>
          {/* No priority preload here — this section sits well below the
              fold on the case-study page, so eagerly loading it would only
              compete with the actual above-the-fold hero image for
              bandwidth. Default lazy-loading is correct here. */}
          <ScreenGrid
            className="mx-auto mt-5 grid max-w-2xl grid-cols-3 gap-5"
            screens={[
              { src: "/wireframes/Welcome.png", label: "Welcome" },
              { src: "/wireframes/login.png", label: "Login" },
              { src: "/wireframes/register.png", label: "Register" },
            ]}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <GroupLabel>Main App — Tab Screens</GroupLabel>
          <ScreenGrid
            className="mx-auto mt-5 grid max-w-2xl grid-cols-3 gap-5"
            screens={[
              { src: "/wireframes/home.png", label: "Home" },
              { src: "/wireframes/calendar.png", label: "Calendar" },
              { src: "/wireframes/courses.png", label: "Courses" },
            ]}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <GroupLabel>AI Assistant &amp; Drill-Down Screen</GroupLabel>
          <ScreenGrid
            className="mx-auto mt-5 grid max-w-md grid-cols-2 gap-5"
            screens={[
              { src: "/wireframes/courses1.png", label: "Course Detail" },
              { src: "/wireframes/AI.png", label: "Pluto AI" },
            ]}
          />
        </RevealOnScroll>
      </div>
    </div>
  );
}
