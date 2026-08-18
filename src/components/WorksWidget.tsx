"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { projects, type Project } from "@/data/projects";
import { playClick } from "@/lib/sound";
import { SPRING_SNAPPY, SPRING_SOFT } from "@/lib/motion";
import { enterCursorBadgeTarget, leaveCursorBadgeTarget } from "@/lib/cursorBadge";
import { getProjectDisplay } from "@/lib/projectDisplay";
import ColorRevealLens from "./ColorRevealLens";
import ProjectIconChip from "./ProjectIconChip";
import { ArrowRightIcon } from "./ModernIcons";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: SPRING_SOFT },
};

// Offset so the preview sits above-right of the cursor rather than directly
// under it, à la dennissnellenberg.com-style project-list hover previews.
const PREVIEW_OFFSET_X = 28;
const PREVIEW_OFFSET_Y = -170;

function HoverPreview({
  project,
  mouseX,
  mouseY,
}: {
  project: Project;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const springX = useSpring(mouseX, { stiffness: 220, damping: 26, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 26, mass: 0.6 });

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: -2 }}
      exit={{ opacity: 0, scale: 0.85, rotate: -3 }}
      transition={SPRING_SNAPPY}
      className="pointer-events-none fixed left-0 top-0 z-[145] h-32 w-52 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
    >
      <Image
        src={project.previewImage}
        alt=""
        fill
        className={project.previewFit === "contain" ? "object-contain p-4" : "object-cover"}
      />
    </motion.div>
  );
}

export default function WorksWidget({ className = "" }: { className?: string }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleListMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX + PREVIEW_OFFSET_X);
    mouseY.set(e.clientY + PREVIEW_OFFSET_Y);
  };

  const hoveredProject = projects.find((p) => p.slug === hoveredSlug) ?? null;

  return (
    <>
    <ColorRevealLens
      className={`w-full max-w-[240px] rounded-[28px] bg-navy p-5 text-cream shadow-lg ${className}`}
      onMouseEnter={enterCursorBadgeTarget}
      onMouseLeave={leaveCursorBadgeTarget}
    >
      <h3 className="font-sans text-lg font-semibold">Works</h3>

      <motion.div
        className="mt-4 flex flex-col gap-2.5"
        variants={listVariants}
        initial="hidden"
        animate="visible"
        onMouseMove={handleListMouseMove}
        onMouseLeave={() => setHoveredSlug(null)}
      >
        {projects.map((project) => {
          const meta = getProjectDisplay(project.slug, project.title);
          return (
            <motion.div
              key={project.slug}
              variants={rowVariants}
              whileHover={{ x: 3 }}
              transition={SPRING_SNAPPY}
              className="group"
              onMouseEnter={() => {
                enterCursorBadgeTarget();
                setHoveredSlug(project.slug);
              }}
              onMouseLeave={leaveCursorBadgeTarget}
            >
              {/* Projects with a live site link straight out to it — no case
                  study page to visit first. */}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClick()}
                  aria-label={`Visit the live site for ${meta.name}`}
                  className="flex min-h-[44px] items-center gap-3 rounded-2xl px-2 py-2 outline-none transition-colors group-hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-2 focus-visible:ring-cream/50"
                >
                  <ProjectIconChip meta={meta} />
                  <span className="min-w-0">
                    <span className="block font-sans text-sm font-medium">{meta.name}</span>
                    <span className="block truncate font-sans text-[11px] text-cream/55">{project.category}</span>
                  </span>
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="ml-auto shrink-0 text-cream/60 group-hover:opacity-100"
                  >
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </motion.span>
                </a>
              ) : (
                <Link
                  href={`/work/${project.slug}`}
                  onClick={() => playClick()}
                  aria-label={`View case study: ${meta.name}`}
                  className="flex min-h-[44px] items-center gap-3 rounded-2xl px-2 py-2 outline-none transition-colors group-hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-2 focus-visible:ring-cream/50"
                >
                  <ProjectIconChip meta={meta} />
                  <span className="min-w-0">
                    <span className="block font-sans text-sm font-medium">{meta.name}</span>
                    <span className="block truncate font-sans text-[11px] text-cream/55">{project.category}</span>
                  </span>
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="ml-auto shrink-0 text-cream/60 group-hover:opacity-100"
                  >
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </motion.span>
                </Link>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-4 h-px w-full bg-cream/15" />

      <div className="mt-4 flex justify-center">
        <motion.a
          href="#work"
          onClick={() => playClick()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={SPRING_SNAPPY}
          aria-label="See all work"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-navy"
        >
          <ArrowRightIcon className="h-4 w-4" />
        </motion.a>
      </div>
    </ColorRevealLens>

    <AnimatePresence>
      {hoveredProject && <HoverPreview key={hoveredProject.slug} project={hoveredProject} mouseX={mouseX} mouseY={mouseY} />}
    </AnimatePresence>
    </>
  );
}
