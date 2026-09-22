import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import ProjectKey3D from "@/components/ProjectKey3D";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Projects key — 3D prototype", robots: { index: false, follow: false } };

export default function ProjectKeyPrototype() {
  // Check locally at build/render time: missing optional audio causes zero 404s.
  const sounds = {
    down: existsSync(path.join(process.cwd(), "public/sounds/key-down.mp3")) ? "/sounds/key-down.mp3" : undefined,
    up: existsSync(path.join(process.cwd(), "public/sounds/key-up.mp3")) ? "/sounds/key-up.mp3" : undefined,
  };
  return <main id="main-content" className={styles.page}>
    <header className={styles.header}><Link href="/">NAMI.</Link><span>OBJECT STUDY / 01</span></header>
    <section className={styles.study} aria-labelledby="key-title">
      <div className={styles.caption}><p>ONE KEY. A LITTLE CHARACTER.</p><h1 id="key-title">Projects.</h1></div>
      <div className={styles.object}><ProjectKey3D sounds={sounds} /></div>
      <p className={styles.hint}>Move to explore. Press to open projects.</p>
    </section>
    <footer className={styles.footer}><span>CORAL / CHARCOAL</span><span>Single-key prototype</span></footer>
  </main>;
}
