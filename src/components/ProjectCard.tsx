"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/data/projects";
import { ArrowDoodle } from "./Doodles";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const tilt = index % 2 === 0 ? -1 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 90, damping: 15, delay: index * 0.12 }}
      whileHover={{ y: -8, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 18 } }}
      style={{ rotate: tilt }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group relative block bg-paper p-6 shadow-md shadow-black/10 transition-shadow hover:shadow-xl sm:p-8"
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-charcoal/70"
          viewBox="0 0 400 220"
          preserveAspectRatio="none"
        >
          <path
            d="M8,10 C3,60 2,155 9,212 C110,218 290,217 392,208 C397,150 396,50 390,8 C270,2 120,4 8,10 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
        </svg>

        <div className="relative flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink/40 px-3 py-1 font-hand text-xs text-ink-dark"
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h3 className="font-display text-4xl text-charcoal">
              {project.title}
            </h3>
            <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-charcoal/70">
              {project.tagline}
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="font-hand text-sm text-charcoal/60">
              {project.role}
            </span>
            <ArrowDoodle className="h-8 w-8 text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
