"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import KeyboardHome from "../KeyboardHome";
import GlassOverlay from "./GlassOverlay";
import ProjectsPanel from "./ProjectsPanel";
import AboutPanel from "./AboutPanel";
import ContactPanel from "./ContactPanel";
import PlaygroundPanel from "./PlaygroundPanel";
import styles from "./GlassOverlay.module.css";

const panels = {
  projects: { title:"PROJECTS", description:"Selected work in product design and development.", component:ProjectsPanel, note:"Design meets development." },
  about: { title:"ABOUT", description:"Product thinking. Precise design. Considered development.", component:AboutPanel, note:"Dublin, Ireland / Design & development" },
  contact: { title:"CONTACT", description:"An idea, a question, a hello. Start here.", component:ContactPanel, note:"Good conversations make good things." },
  playground: { title:"PLAYGROUND", description:"Interaction, motion, and creative development.", component:PlaygroundPanel, note:"Made for the joy of making." },
} as const;
type PanelId = keyof typeof panels;
function panelAt(path: string | null): PanelId | null {
  const id = path?.slice(1);
  return id && Object.prototype.hasOwnProperty.call(panels,id) ? id as PanelId : null;
}

export default function HomeWorld({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const current = panelAt(pathname);
  const [lastPanel, setLastPanel] = useState<PanelId>(current || "projects");
  const selected = current || lastPanel;
  const panel = panels[selected];
  const Content = panel.component;
  const open = current !== null;
  const isHomeWorld = pathname === "/" || open;
  const [exiting, setExiting] = useState(false);
  const background = useRef<HTMLDivElement>(null);
  const previous = useRef<string | null>(null);
  const closing = useRef(false);
  const seededHome = useRef(false);
  const covered = open || exiting;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (open && previous.current !== "/" && !panelAt(previous.current)) {
        seededHome.current = true;
        window.history.replaceState(null, "", "/");
        window.history.pushState(null, "", pathname);
      }
      previous.current = pathname;
    });
    if (current) { setLastPanel(current); closing.current = false; setExiting(true); }
    if (!isHomeWorld) setExiting(false);
    if (pathname === "/" && seededHome.current) {
      seededHome.current = false;
      router.refresh();
    }
    return () => cancelAnimationFrame(frame);
  }, [current, open, isHomeWorld, pathname, router]);
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    router.back();
  }, [router]);
  const onClosed = useCallback(() => {
    setExiting(false);
    if (background.current) background.current.inert = false;
  }, []);
  useEffect(() => { if (background.current) background.current.inert = covered; }, [covered]);

  if (!isHomeWorld) return <>{children}</>;
  return <>
    <div ref={background} className={styles.homeLayer} data-covered={covered} aria-hidden={covered || undefined}>
      <KeyboardHome suspended={covered} />
    </div>
    {children}
    <GlassOverlay restoreFocusTo={`[data-key="${selected}"]`} open={open} onClose={close} onClosed={onClosed}
      eyebrow={`NAMI / ${selected === "projects" ? "SELECTED WORK" : selected.toUpperCase()}`}
      footer={<><span>{panel.note}</span><span>NAMI STUDIO <i> / </i> {String(Object.keys(panels).indexOf(selected)+1).padStart(2,"0")}</span></>}
      title={panel.title} description={panel.description}
      // Works, About and Contact already have their entry buttons on the
      // home screen, so the in-panel title/nav header would be redundant.
      // Playground keeps its header.
      hideHeader={selected !== "playground"}>
      <Content key={selected} />
    </GlassOverlay>
  </>;
}
