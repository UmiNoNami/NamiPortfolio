"use client";

import Image from "next/image";
import PixelWindow from "./PixelWindow";
import ProjectFolder from "./ProjectFolder";
import { projects } from "@/data/projects";

export default function WorkWindow({ className = "" }: { className?: string }) {
  return (
    <PixelWindow
      title="projects"
      className={className}
      menuItems={["File", "Edit", "View", "Help"]}
      statusBar={{ left: `${projects.length + 1} objects`, right: "120KB" }}
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        {projects.map((project) => (
          <ProjectFolder key={project.slug} project={project} />
        ))}
        <div className="flex flex-col items-center gap-2 py-2 text-center opacity-40">
          <div className="relative h-24 w-24 sm:h-28 sm:w-28">
            <Image src="/folder.png" alt="" fill sizes="112px" className="object-contain" />
          </div>
          <div>
            <p className="font-pixel text-base sm:text-lg">More</p>
            <p className="font-mono text-sm text-muted sm:text-base">(coming soon)</p>
          </div>
        </div>
      </div>
    </PixelWindow>
  );
}
