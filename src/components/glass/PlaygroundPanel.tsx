"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import styles from "./WorldPanels.module.css";
const DumplingGame = dynamic(()=>import("../DumplingGame"), {ssr:false, loading:()=> <p className={styles.padded}>Getting the dumplings ready…</p>});
export default function PlaygroundPanel() {
  const [playing, setPlaying] = useState(false);
  return <div className={styles.playGrid}>
    <section className={`${styles.pane} ${styles.arcade}`}><div className={styles.paneBar}><span>01 / DUMPLING DASH</span><span>INTERACTIVE EXPERIMENT</span></div><div className={styles.gameStage}>{playing ? <DumplingGame /> : <div className={styles.gameCover}><Image src="/dumpling.png" alt="A dumpling" width={100} height={100}/><p className={styles.eyebrow}>A SMALL BREAK FROM SERIOUS THINGS</p><h2>Dumpling<br/><em>Dash.</em></h2><button className={styles.primary} onClick={()=>setPlaying(true)}>Enter the arcade <span>↗</span></button></div>}</div>{playing && <button className={styles.backToCover} onClick={()=>setPlaying(false)}>← Back to the arcade cover</button>}</section>
    <aside className={styles.playAside}><section className={styles.pane}><div className={styles.paneBar}>02 / THE MISSION</div><div className={styles.padded}><h3>Collect. Jump.<br/>Just one more go.</h3><p>Find the dumplings, make it across the platforms, and reach the exit. Three levels, a few surprises, and no pressure to be productive.</p><ol className={styles.steps}><li><b>Move</b><span><kbd>←</kbd> <kbd>→</kbd> or A / D</span></li><li><b>Jump</b><span><kbd>Space</kbd> or ↑ / W</span></li><li><b>On your phone</b><span>Use the on-screen movement and jump buttons.</span></li></ol></div></section><section className={`${styles.pane} ${styles.playNote}`}><span>✳</span><h3>Play is part<br/>of the process.</h3><p>A space to try things, build for the fun of it, and follow a little curiosity.</p></section></aside>
  </div>;
}
