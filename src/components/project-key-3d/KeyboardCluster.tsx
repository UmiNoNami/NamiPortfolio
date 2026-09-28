"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { useAccessibility } from "@/lib/accessibility";
import { CLUSTER_KEYS, CLUSTER_OUTLINES, type ClusterKeyId } from "./clusterConfig";
import styles from "./KeyboardCluster.module.css";

const Scene = dynamic(() => import("./KeyboardClusterScene"), { ssr: false });
class SceneBoundary extends Component<{children: ReactNode; onError: () => void}, {failed: boolean}> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function KeyboardCluster({ suspended = false }: { suspended?: boolean }) {
  const router = useRouter();
  const osReduced = useReducedMotion();
  const { settings } = useAccessibility();
  const reduced = Boolean(osReduced) || settings.reduceMotion;
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(true);
  const [compact, setCompact] = useState(false);
  const [pressed, setPressed] = useState<ClusterKeyId | null>(null);
  const host = useRef<HTMLElement>(null);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const outlines = useRef<(SVGPolygonElement | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const cancelled = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => { setFailed(true); setReady(false); }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px), (pointer: coarse)");
    const resize = () => setCompact(media.matches);
    resize(); media.addEventListener("change", resize);
    let visible = true;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    if (host.current) observer.observe(host.current);
    document.addEventListener("visibilitychange", update);
    const release = () => { setPressed(null); pointer.current = { x: 0, y: 0 }; };
    window.addEventListener("blur", release);
    return () => { observer.disconnect(); media.removeEventListener("change", resize); document.removeEventListener("visibilitychange", update); window.removeEventListener("blur", release); clearTimeout(timer.current); };
  }, []);

  const activate = (id: ClusterKeyId) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => router.push(`/${id}`, { scroll: false }), reduced ? 0 : 170);
  };

  return <nav ref={host} className={styles.cluster} aria-label="Explore the portfolio" data-ready={ready}
    onPointerMove={event => {
      if (event.pointerType !== "mouse" || reduced) return;
      const r = event.currentTarget.getBoundingClientRect();
      pointer.current = { x: (event.clientX - r.left) / r.width * 2 - 1, y: (event.clientY - r.top) / r.height * 2 - 1 };
    }} onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; }}>
    <Image className={styles.poster} src="/keyboard-cluster.png" alt="" fill priority unoptimized sizes="(max-width: 700px) 100vw, 780px" />
    <div className={styles.canvas} aria-hidden="true">
      {!failed && <SceneBoundary onError={onError}><Scene pressed={pressed} pointer={pointer} controls={controls} outlines={outlines}
        reduced={reduced} active={active && !suspended} compact={compact} onReady={onReady} onError={onError} /></SceneBoundary>}
    </div>
    {CLUSTER_KEYS.map((key, i) => <button key={key.id} ref={el => { controls.current[i] = el; }} className={styles.key}
      style={{ clipPath: `polygon(${CLUSTER_OUTLINES[i].split(" ").map(p => p.split(",").join("% ") + "%").join(",")})` }}
      data-key={key.id} type="button" aria-label={`Open ${key.id}`}
      onPointerDown={event => {
        if (event.button !== 0 || !event.isPrimary) return;
        cancelled.current = false;
        pointerStart.current = { x: event.clientX, y: event.clientY };
        // Keep tracking this pointer even if the live 3D cluster silhouette
        // (its clip-path is re-projected every frame while idling) drifts out
        // from under a held finger — without this, brief pointerleave events
        // caused by that drift were silently swallowing taps on mobile.
        try { event.currentTarget.setPointerCapture(event.pointerId); } catch {}
        setPressed(key.id);
      }}
      onPointerMove={event => {
        if (cancelled.current || pressed !== key.id) return;
        const dx = event.clientX - pointerStart.current.x;
        const dy = event.clientY - pointerStart.current.y;
        if (Math.hypot(dx, dy) > 24) { cancelled.current = true; setPressed(null); }
      }}
      onPointerUp={event => { setPressed(null); try { event.currentTarget.releasePointerCapture(event.pointerId); } catch {} }}
      onPointerLeave={() => setPressed(null)}
      onPointerCancel={() => { cancelled.current = true; setPressed(null); }}
      onBlur={() => setPressed(null)}
      onKeyDown={event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault(); if (!event.repeat) setPressed(key.id);
      }} onKeyUp={event => {
        if ((event.key === "Enter" || event.key === " ") && pressed === key.id) {
          event.preventDefault(); setPressed(null); activate(key.id);
        }
      }} onClick={event => { if (event.detail === 0 || !cancelled.current) activate(key.id); }}>
      <span className={styles.srOnly}>{key.label}</span>
    </button>)}
    <svg className={styles.focus} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {CLUSTER_KEYS.map((key, i) => <polygon key={key.id} data-outline={key.id} points={CLUSTER_OUTLINES[i]} ref={el => { outlines.current[i] = el; }} />)}
    </svg>
  </nav>;
}
