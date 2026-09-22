"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import styles from "./FloatingHomeNav.module.css";

export type NavItem = {
  id: "about" | "projects" | "contact" | "playground";
  label: string;
  width: number;
  height: number;
  duration: number;
  delay: number;
  drift: number;
  rise: number;
  rotation: number;
};

export default function FloatingNavButton({ item, selected, onSelect }: {
  item: NavItem;
  selected: boolean;
  onSelect: (id: NavItem["id"]) => void;
}) {
  const [pressed, setPressed] = useState(false);
  const motionStyle = {
    "--float-duration": `${item.duration}s`,
    "--float-delay": `${item.delay}s`,
    "--float-x": `${item.drift}px`,
    "--float-y": `${-item.rise}px`,
    "--float-rotation": `${item.rotation}deg`,
  } as CSSProperties;

  return (
    <div className={styles.slot} data-item={item.id} style={motionStyle}>
      <div className={styles.float}>
        <button type="button" className={styles.key} aria-label={item.label}
          aria-pressed={selected} data-pressed={pressed}
          onPointerDown={(event) => { if (event.isPrimary && event.button === 0) setPressed(true); }}
          onPointerUp={() => setPressed(false)}
          onPointerLeave={() => setPressed(false)}
          onPointerCancel={() => setPressed(false)}
          onBlur={() => setPressed(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              if (event.repeat) { event.preventDefault(); return; }
              setPressed(true);
            }
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter" || event.key === " ") setPressed(false);
          }}
          onClick={() => onSelect(item.id)}>
          <span className={styles.surface}>
          <Image className={styles.art} src={`/floating-buttons/${item.id}.svg`}
            alt="" width={item.width} height={item.height} priority draggable={false} />
          </span>
        </button>
      </div>
    </div>
  );
}
