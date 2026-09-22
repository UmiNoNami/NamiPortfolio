"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import type { KeyInteraction } from "./project-key-3d/config";
import { PROJECT_KEY } from "./project-key-3d/config";
import styles from "./project-key-3d/ProjectKey3D.module.css";

const Scene = dynamic(() => import("./project-key-3d/ProjectKeyScene"), { ssr: false });
const REST: KeyInteraction = { pressed: false, hovered: false, x: 0, y: 0 };

class SceneBoundary extends Component<{ children: ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export type ProjectKey3DProps = {
  href?: string;
  onActivate?: () => void;
  /** Pass only existing audio paths. Omit to make no audio/network requests. */
  sounds?: { down?: string; up?: string };
  className?: string;
  label?: string;
  capColor?: string;
  legendColor?: string;
  idlePhase?: number;
  /** Smaller buffers for groups of keys, without changing the geometry. */
  embedded?: boolean;
};

/** Independent navigation control. No homepage or provider coupling. */
export default function ProjectKey3D({ href = "/projects", onActivate, sounds, className = "", label = "Projects", capColor = PROJECT_KEY.colors.cap, legendColor = PROJECT_KEY.colors.legend, idlePhase = 0, embedded = false }: ProjectKey3DProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [interaction, setInteraction] = useState(REST);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const pressed = useRef(false);
  const cancelledPointer = useRef(false);
  const keyboardPress = useRef(false);
  const activating = useRef(false);
  const navigationTimer = useRef<ReturnType<typeof setTimeout>>();
  const releaseTimer = useRef<ReturnType<typeof setTimeout>>();
  const audio = useRef<{ down?: HTMLAudioElement; up?: HTMLAudioElement }>({});
  const onReady = useCallback(() => setReady(true), []);
  const onUnavailable = useCallback(() => { setUnavailable(true); setReady(false); }, []);

  useEffect(() => {
    const soundBank = audio.current;
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2");
    if (gl) { gl.getExtension("WEBGL_lose_context")?.loseContext(); setCanRender(true); }
    else setUnavailable(true);
    const media = window.matchMedia("(max-width: 700px), (pointer: coarse)");
    const resize = () => setCompact(media.matches);
    resize();
    media.addEventListener("change", resize);
    let inView = true;
    const visibility = () => setActive(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; visibility(); });
    if (host.current) observer.observe(host.current);
    document.addEventListener("visibilitychange", visibility);
    const cancelPress = () => { pressed.current = false; keyboardPress.current = false; setInteraction(REST); };
    window.addEventListener("blur", cancelPress);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", resize);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("blur", cancelPress);
      clearTimeout(navigationTimer.current);
      clearTimeout(releaseTimer.current);
      Object.values(soundBank).forEach(sound => { sound?.pause(); });
    };
  }, []);

  const play = (kind: "down" | "up") => {
    const path = sounds?.[kind];
    if (!path) return;
    let sound = audio.current[kind];
    if (!sound) {
      sound = new Audio(path);
      sound.volume = .28;
      sound.preload = "none";
      audio.current[kind] = sound;
    }
    sound.currentTime = 0;
    void sound.play().catch(() => { /* Optional sound must never block navigation. */ });
  };
  const down = () => {
    if (pressed.current || activating.current) return;
    pressed.current = true;
    setInteraction(value => ({ ...value, pressed: true }));
    play("down");
  };
  const up = () => {
    if (!pressed.current) return;
    pressed.current = false;
    setInteraction(value => ({ ...value, pressed: false }));
    play("up");
  };
  const activate = () => {
    if (activating.current) return;
    activating.current = true;
    navigationTimer.current = setTimeout(() => {
      activating.current = false;
      if (onActivate) onActivate();
      else router.push(href);
    }, prefersReducedMotion ? 0 : 175);
  };

  return <div ref={host} className={`${styles.root} ${className}`} data-embedded={embedded} data-renderer={unavailable ? "fallback" : ready ? "webgl" : "loading"}>
    <div className={styles.canvas} aria-hidden="true">
      {canRender && !unavailable && <SceneBoundary onUnavailable={onUnavailable}>
        <Scene label={label} capColor={capColor} legendColor={legendColor} idlePhase={idlePhase} embedded={embedded} interaction={interaction} compact={compact} active={active} reducedMotion={Boolean(prefersReducedMotion)} onReady={onReady} onUnavailable={onUnavailable} />
      </SceneBoundary>}
    </div>
    <button type="button" className={styles.control} aria-label={`Open ${label.toLowerCase()}`} data-ready={ready} data-pressed={interaction.pressed}
      onPointerMove={event => {
        const rect = event.currentTarget.getBoundingClientRect();
        setInteraction(value => ({ ...value, hovered: event.pointerType !== "touch", x: (event.clientX - rect.left) / rect.width * 2 - 1, y: (event.clientY - rect.top) / rect.height * 2 - 1 }));
      }}
      onPointerLeave={() => setInteraction(value => ({ ...value, hovered: false, x: 0, y: 0 }))}
      onPointerDown={event => {
        if (event.button !== 0) return;
        cancelledPointer.current = false;
        event.currentTarget.setPointerCapture(event.pointerId);
        down();
      }}
      onPointerUp={event => {
        const rect = event.currentTarget.getBoundingClientRect();
        cancelledPointer.current = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
        up();
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => { cancelledPointer.current = true; up(); }} onLostPointerCapture={up}
      onBlur={() => { keyboardPress.current = false; up(); }}
      onKeyDown={event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (event.repeat) return;
        keyboardPress.current = true;
        down();
      }}
      onKeyUp={event => {
        if ((event.key !== "Enter" && event.key !== " ") || !keyboardPress.current) return;
        event.preventDefault();
        keyboardPress.current = false;
        up();
        activate();
      }}
      onClick={event => {
        if (event.detail > 0 && cancelledPointer.current) return;
        if (event.detail === 0 && !keyboardPress.current) {
          // Screen-reader activation has no pointer/key down event.
          down();
          releaseTimer.current = setTimeout(up, 85);
        }
        activate();
      }}>
      <span className={styles.fallback} style={{ backgroundColor: capColor, color: legendColor }}>{label.toUpperCase()} <span aria-hidden="true">↗</span></span>
    </button>
    {unavailable && !embedded && <p className={styles.unavailable}>3D isn’t available here. The {label.toLowerCase()} button still works.</p>}
  </div>;
}
