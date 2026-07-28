"use client";

import { projects } from "@/data/projects";
import ProjectFolder from "./ProjectFolder";
import PixelWindow from "./PixelWindow";
import RevealOnScroll from "./RevealOnScroll";

export default function Work() {
  return (
    <section id="work" className="relative border-b-2 border-ink bg-paper px-4 py-20 sm:px-6 sm:py-28">
      <div className="halftone pointer-events-none absolute -right-16 bottom-10 h-56 w-56 opacity-60" />

      <div className="mx-auto max-w-4xl">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            selected work
          </p>
          <h2 className="mt-2 font-pixel text-3xl sm:text-4xl">Things I&apos;ve made</h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="mt-10">
          <PixelWindow title="Selected Work">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {projects.map((project) => (
                <ProjectFolder key={project.slug} project={project} />
              ))}
            </div>
          </PixelWindow>
        </RevealOnScroll>
      </div>
    </section>
  );
}
