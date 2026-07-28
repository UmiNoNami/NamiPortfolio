"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/data/projects";
import { playClick } from "@/lib/sound";
import { SPRING_SNAPPY } from "@/lib/motion";

export default function ProjectFolder({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex flex-col items-center gap-2 py-2 text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => playClick()}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={SPRING_SNAPPY}
            className="pointer-events-none absolute -top-8 whitespace-nowrap border-2 border-ink bg-ink px-2 py-1 font-mono text-[0.65rem] text-paper"
          >
            {project.role}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ y: -4, rotate: -3 }}
        transition={SPRING_SNAPPY}
        className="relative h-24 w-24 sm:h-28 sm:w-28"
      >
        <Image src="/folder.png" alt="" fill sizes="112px" className="object-contain" />
      </motion.div>

      <div>
        <p className="font-pixel text-base sm:text-lg">{project.title}</p>
        <p className="font-mono text-sm text-muted sm:text-base">({project.tags[0]})</p>
      </div>
    </Link>
  );
}
