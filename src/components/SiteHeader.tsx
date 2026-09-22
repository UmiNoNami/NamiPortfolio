"use client";
import Link from "next/link";
import AccessibilityPanel from "./AccessibilityPanel";
import styles from "./SiteHeader.module.css";
export function NamiLogo() {
  return <svg viewBox="0 0 52 48" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 22V15C9 4 43 4 43 15V22M14 17V13M38 17V13"/><rect x="9" y="18" width="34" height="27" rx="8"/><path d="M9 23H5Q2 23 2 28V33Q2 37 9 37M43 23H47Q50 23 50 28V33Q50 37 43 37"/></g><ellipse cx="19" cy="30" rx="2.5" ry="4" fill="currentColor"/><ellipse cx="33" cy="30" rx="2.5" ry="4" fill="currentColor"/></svg>;
}


export default function SiteHeader() { return <header className={styles.header}><Link href="/" className={styles.logo} aria-label="Nami home"><NamiLogo /></Link><div className={styles.actions}><nav aria-label="Main navigation"><Link href="/projects">works</Link><Link href="/about">about</Link><Link href="/contact">contact</Link><span aria-hidden="true" className={styles.dot}/></nav><AccessibilityPanel /></div></header>; }
