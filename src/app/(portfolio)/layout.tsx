import Link from "next/link";
import styles from "./portfolio.module.css";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <main id="main-content" className={styles.page}>
    <header className={styles.header}><Link href="/">← home</Link><nav aria-label="Portfolio pages"><Link href="/projects">works</Link><Link href="/about">about</Link><Link href="/contact">contact</Link><Link href="/playground">playground</Link></nav></header>
    <div className={styles.content}>{children}</div>
  </main>;
}
