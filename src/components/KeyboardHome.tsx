"use client";

import SiteHeader from "./SiteHeader";
import KeyboardCluster from "./project-key-3d/KeyboardCluster";

import styles from "./KeyboardHome.module.css";


export default function KeyboardHome({ suspended = false }: { suspended?: boolean }) {
  return <main id="main-content" className={styles.home}>
    <div className={styles.header}><SiteHeader /></div>
    <p className={`${styles.micro} ${styles.manifesto}`}><span className={styles.rule} />design<br/>develop<br/>explore<br/>and more</p>
    <p className={`${styles.micro} ${styles.location}`}>Dublin, Ireland<br/><span>UI/UX · Product</span><br/>Frontend</p>
    <div className={styles.scene}><KeyboardCluster suspended={suspended} /></div>
    <section className={styles.intro} aria-label="Introduction">
      <h1>hey,<br/>i’m nami.</h1>
      <p className={styles.micro}>UI/UX designer<br/>frontend developer<br/>based in Dublin</p>
    </section>
    <p className={`${styles.micro} ${styles.tagline}`}><span className={styles.rule}/>turn ideas<br/>into playful<br/>digital experiences</p>
  </main>;
}
