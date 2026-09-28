"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import styles from "./ProjectsPanel.module.css";

const ordered = ["knockknock", "pluto", "gear4music"].map(slug => projects.find(project => project.slug === slug)!);
const galleries: Record<string, { src: string; label: string }[]> = {
  knockknock: [{ src: "/knokknok1.png", label: "Roommate matching app" }],
  gear4music: [{ src: "/gear.png", label: "Commerce redesigned" }, { src: "/gear/mockup1.png", label: "Shopping experience" }, { src: "/gear/mockup2.png", label: "Product discovery" }, { src: "/gear/responsive.png", label: "Across devices" }],
  pluto: [{ src: "/cover.png", label: "The student experience" }, { src: "/final/home.png", label: "Your day, at a glance" }, { src: "/final/calendar.png", label: "Calendar" }, { src: "/final/course.png", label: "Courses" }, { src: "/final/ai.png", label: "Study assistant" }],
};
const filters = ["All work", "Design", "Development"] as const;

function ProjectPreview({ project, active, select, index }: { project: typeof projects[number]; active: boolean; select: () => void; index: number }) {
  const slides = galleries[project.slug];
  const [slide, setSlide] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches || document.documentElement.hasAttribute("data-reduce-motion"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-reduce-motion"] });
    media.addEventListener("change", update);
    return () => { observer.disconnect(); media.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    if (reduceMotion || slides.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setSlide(current => (current + 1) % slides.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [reduceMotion, slides.length]);
  return <Link href={"/work/" + project.slug} className={styles.window} data-active={active} data-project={project.slug} onPointerEnter={event => { if (event.pointerType === "mouse") select(); }} onFocus={select} aria-label={"View " + project.title + " case study"}>
    <div className={styles.preview}>
      {slides.map((image, position) => <Image key={image.src} src={image.src} alt={position === slide ? project.title + ": " + image.label : ""} aria-hidden={position !== slide} fill priority={index === 0 && position === 0} sizes="(max-width: 700px) 90vw, 60vw" className={styles.image} data-visible={position === slide} style={{ objectFit: "contain" }} />)}
    </div>
    <div className={styles.projectInfo}>
      <div className={styles.titleRow}><div><p>{project.slug === "knockknock" ? "MOBILE DEVELOPMENT" : project.slug === "pluto" ? "PRODUCT DESIGN" : "COMMERCE / CONCEPT"}</p><h2>{project.title.replace(" Redesign", "")}</h2></div></div>
    </div>
  </Link>;
}

export default function ProjectsPanel() {
  const [filter, setFilter] = useState<typeof filters[number]>("All work");
  const [active, setActive] = useState("knockknock");
  const visible = ordered.filter(project => filter === "All work" || (filter === "Development" ? project.slug === "knockknock" : project.slug !== "knockknock"));
  const selected = visible.some(project => project.slug === active) ? active : visible[0].slug;
  return <div className={styles.projects}>
    <div className={styles.toolbar}><div className={styles.filters} role="group" aria-label="Filter projects">{filters.map(item => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><span>EXPLORE THE WORK</span></div>
    <div className={styles.grid}>{visible.map(project => <ProjectPreview key={project.slug} project={project} active={selected === project.slug} select={() => setActive(project.slug)} index={ordered.indexOf(project)} />)}</div>
  </div>;
}
