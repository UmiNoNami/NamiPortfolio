import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import ResearchBoard from "./ResearchBoard";
import WireframeFlows from "./WireframeFlows";
import ColorSystem from "./ColorSystem";
import TypographySpec from "./TypographySpec";
import ComponentsShowcase from "./ComponentsShowcase";
import FinalScreensMarquee from "./FinalScreensMarquee";

const RESPONSIBILITIES = [
  "Product concept",
  "Interface exploration",
  "User-flow planning",
  "Wireframing",
  "Visual design",
  "Component system",
  "Interactive prototyping",
];

const DECISIONS = [
  {
    title: "Today-first dashboard",
    detail:
      "The home screen prioritises today's classes, approaching deadlines and incomplete tasks so students do not have to search for urgent information.",
  },
  {
    title: "Consistent colour coding",
    detail: "Classes, assignments, exams and completed tasks use distinct semantic colours across the app.",
  },
  {
    title: "Connected course information",
    detail:
      "Each course combines upcoming sessions, coursework and progress information instead of separating them across different tools.",
  },
  {
    title: "Focused AI assistance",
    detail:
      "The AI assistant is positioned as a shortcut for questions about the student's own schedule, courses and deadlines, rather than as a general-purpose chatbot.",
  },
];

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] border border-navy/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_16px_36px_-20px_rgba(17,17,17,0.16)] dark:border-cream/[0.06] dark:bg-midnight-card sm:p-8">
      {children}
    </div>
  );
}

function Prose({ children }: { children: string }) {
  return <p className="mt-3 font-dm text-[15px] leading-relaxed text-navy/70 dark:text-cream/70">{children}</p>;
}

export default function PlutoCaseStudy() {
  return (
    <div className="space-y-16">
      {/* 01 — Project introduction */}
      <RevealOnScroll>
        <Card>
          <SectionHeading index="01" title="Project Introduction" />
          <Prose>
            Pluto is a student portal concept that brings classes, deadlines, coursework and daily tasks into
            one mobile experience. The project explores how students could understand what needs their
            attention without moving between several disconnected tools.
          </Prose>
        </Card>
      </RevealOnScroll>

      {/* 02 + 03 — Problem & Goal */}
      <div className="grid gap-5 sm:grid-cols-2">
        <RevealOnScroll>
          <Card>
            <SectionHeading index="02" title="The Problem" />
            <Prose>
              Student information is often distributed across timetables, learning portals, emails, group
              chats and personal to-do lists. Moving between these tools makes it harder to understand what is
              happening today, what is due next and which tasks require immediate attention.
            </Prose>
          </Card>
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <Card>
            <SectionHeading index="03" title="Project Goal" />
            <Prose>
              Design one clear home base where students can quickly check their schedule, coursework and
              priorities.
            </Prose>
          </Card>
        </RevealOnScroll>
      </div>

      {/* 04 — My role */}
      <RevealOnScroll>
        <Card>
          <SectionHeading index="04" title="My Role" />
          <p className="mt-3 font-jakarta text-lg font-bold text-navy dark:text-cream">UI/UX Designer</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
            {RESPONSIBILITIES.map((r) => (
              <li
                key={r}
                className="flex items-center gap-2 font-dm text-sm text-navy/70 dark:text-cream/70"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-yellow" />
                {r}
              </li>
            ))}
          </ul>
        </Card>
      </RevealOnScroll>

      {/* 05 — Exploration */}
      <RevealOnScroll>
        <div className="grid items-center gap-10 sm:grid-cols-2">
          <div>
            <SectionHeading index="05" title="Exploration" />
            <Prose>
              I reviewed the common tools students use to manage classes and coursework. This helped me
              identify an opportunity to connect schedule information, deadlines and personal tasks within one
              consistent experience.
            </Prose>
          </div>
          <ResearchBoard />
        </div>
      </RevealOnScroll>

      {/* 06 — Information architecture / user flow */}
      <RevealOnScroll>
        <Card>
          <SectionHeading index="06" title="Information Architecture" />
          <Prose>
            The structure centres on a today-first home dashboard, with Calendar, Courses and To-Do as the
            other main tabs. Each course opens into its own drill-down screen combining sessions, coursework
            and progress, so nothing sits more than a couple of taps from the dashboard.
          </Prose>
        </Card>
      </RevealOnScroll>

      {/* 07 — Wireframes */}
      <RevealOnScroll delay={0.05}>
        <WireframeFlows index="07" />
      </RevealOnScroll>

      {/* 08 — Key design decisions */}
      <RevealOnScroll>
        <SectionHeading index="08" title="Key Design Decisions" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {DECISIONS.map((d, i) => (
            <RevealOnScroll key={d.title} delay={0.05 * i} y={14}>
              <div className="h-full rounded-2xl border border-navy/10 bg-white p-5 dark:border-cream/10 dark:bg-midnight-card">
                <p className="font-jakarta text-base font-bold text-navy dark:text-cream">{d.title}</p>
                <p className="mt-1.5 font-dm text-[13px] leading-relaxed text-navy/65 dark:text-cream/65">
                  {d.detail}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </RevealOnScroll>

      {/* 09–11 — Design system */}
      <RevealOnScroll delay={0.05} className="space-y-14">
        <ColorSystem index="09" />
        <TypographySpec index="10" />
        <ComponentsShowcase index="11" />
      </RevealOnScroll>

      {/* 12 — Final experience */}
      <RevealOnScroll delay={0.05}>
        <SectionHeading index="12" title="Final Experience" />
        <p className="mt-2 max-w-md font-dm text-sm text-navy/60 dark:text-cream/60">
          The finished screens — dashboard, calendar, courses, tasks, profile and the Pluto AI assistant.
        </p>
        <div className="mt-6">
          <FinalScreensMarquee />
        </div>
      </RevealOnScroll>

      {/* 13 — Prototype evaluation */}
      <RevealOnScroll>
        <Card>
          <SectionHeading index="13" title="Prototype Evaluation" />
          <Prose>
            I reviewed the interactive prototype across the main task flows, including checking today&apos;s
            schedule, viewing coursework, creating a task and asking the assistant about a deadline. This
            helped me identify areas where navigation labels, spacing and information hierarchy needed greater
            clarity.
          </Prose>
        </Card>
      </RevealOnScroll>

      {/* 14–15 — Outcome and reflection */}
      <div className="grid gap-5 sm:grid-cols-2">
        <RevealOnScroll>
          <Card>
            <SectionHeading index="14" title="Outcome" />
            <Prose>
              The final concept includes a connected student dashboard, calendar, course area, task manager
              and focused AI assistant. The project strengthened my ability to organise a multi-feature
              product into a consistent mobile system.
            </Prose>
          </Card>
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <Card>
            <SectionHeading index="15" title="Reflection" />
            <Prose>
              If I continued the project, the next step would be moderated usability testing with students. I
              would focus on whether the dashboard communicates priorities quickly and whether users
              understand the boundaries of the AI assistant.
            </Prose>
          </Card>
        </RevealOnScroll>
      </div>
    </div>
  );
}
