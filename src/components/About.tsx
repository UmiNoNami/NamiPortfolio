"use client";

import RevealOnScroll from "./RevealOnScroll";
import PixelWindow from "./PixelWindow";
import Skills from "./Skills";
import { PersonIcon, MonitorIcon, StarIcon, HeartIcon } from "./PixelIcons";

const rows = [
  {
    icon: PersonIcon,
    label: "Role",
    body: "UI/UX Designer & Front-End Developer",
  },
  {
    icon: MonitorIcon,
    label: "Focus",
    body: "User Research, UI Design, Interaction, Front-End",
  },
  {
    icon: StarIcon,
    label: "Tools",
    body: "Figma, VS Code, React, React Native, JavaScript, Next.js",
  },
  {
    icon: HeartIcon,
    label: "Passion",
    body: "Creating meaningful and user-centered experiences",
  },
];

export default function About() {
  return (
    <section id="about" className="border-b-2 border-ink bg-paper px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            about me
          </p>
          <h2 className="mt-2 font-pixel text-3xl sm:text-4xl">
            A little bit design, a little bit dev.
          </h2>
          <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-ink-soft sm:text-base">
            I&apos;m Naransuvd — friends call me Nami. I design mobile and web
            products end-to-end in Figma, then I&apos;m usually the one poking
            around in the codebase making sure the shipped version still feels
            like the prototype.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <RevealOnScroll delay={0.1}>
            <PixelWindow title="About Me">
              <div className="divide-y-2 divide-ink -my-4 sm:-my-5">
                {rows.map((r) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.label} className="flex items-start gap-4 py-4 sm:py-5">
                      <Icon className="mt-0.5 h-6 w-6 shrink-0" />
                      <div>
                        <p className="font-pixel text-sm sm:text-base">{r.label}</p>
                        <p className="mt-1 font-mono text-xs leading-relaxed text-ink-soft sm:text-sm">
                          {r.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </PixelWindow>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <Skills />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
