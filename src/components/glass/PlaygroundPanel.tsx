"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import styles from "./WorldPanels.module.css";
const DumplingGame = dynamic(()=>import("../DumplingGame"), {ssr:false, loading:()=> <p className={styles.padded}>Getting the dumplings ready…</p>});
export default function PlaygroundPanel() {
  const [playing, setPlaying] = useState(false);
  return <div className={styles.playGrid}>
    <section className={`${styles.pane} ${styles.arcade}`}><div className={styles.paneBar}><span>01 / DUMPLING DASH</span><span>INTERACTIVE EXPERIMENT</span></div><div className={styles.gameStage}>{playing ? <DumplingGame /> : <div className={styles.gameCover}><Image src="/dumpling.png" alt="A dumpling" width={100} height={100}/><p className={styles.eyebrow}>A SMALL BREAK FROM SERIOUS THINGS</p><h2>Dumpling<br/><em>Dash.</em></h2><button className={styles.enterArcade} onClick={()=>setPlaying(true)}>Enter the arcade <span>↗</span></button></div>}</div>{playing && <button className={styles.backToCover} onClick={()=>setPlaying(false)}>← Back to the arcade cover</button>}</section>
  </div>;
}
