import { forwardRef } from "react";
import styles from "./NamiIntro.module.css";

const asset = "/nami-intro-assets/";

/** Coordinates share the original 633px line's canvas; no flattened poses. */
const NamiCharacter = forwardRef<SVGGElement>(function NamiCharacter(_, pupilRef) {
  return (
    <svg className={styles.character} viewBox="0 0 633 310" aria-hidden="true">
      <defs>
        <filter id="nami-ink" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
          <feComponentTransfer><feFuncA type="linear" slope="1.06" /></feComponentTransfer>
        </filter>
        <clipPath id="nami-head-crop"><rect width="633" height="274" /></clipPath>
        <clipPath id="nami-hand-crop"><rect width="633" height="284" /></clipPath>
        <clipPath id="nami-fringe-crop"><rect x="120" y="122" width="390" height="190" /></clipPath>
        <clipPath id="nami-left-eye"><path d="M222 245 Q245 238 270 240 Q269 273 241 273 Q219 273 222 245Z" /></clipPath>
        <clipPath id="nami-right-eye"><path d="M325 245 Q348 238 373 240 Q372 273 344 273 Q322 273 325 245Z" /></clipPath>
      </defs>
      <g clipPath="url(#nami-head-crop)">
        <g className={styles.head}>
          <image className={styles.hairBack} href={`${asset}hair-back.svg`} x="122" y="0" width="390" height="390" />
          <ellipse cx="317" cy="234" rx="115" ry="109" fill="#f7f3e9" />
          <image href={`${asset}face.svg`} x="169" y="184" width="297" height="157" />
          <g transform="translate(20 0)">
            <image href={`${asset}eyes/eye-left-outline.svg`} x="211" y="217" width="66" height="56" />
            <image href={`${asset}eyes/eye-right-outline.svg`} x="314" y="217" width="66" height="56" />
            <g ref={pupilRef}>
              <g clipPath="url(#nami-left-eye)"><image className={styles.pupil} href={`${asset}pupils/Vector.svg`} x="235" y="241" width="27" height="26" /></g>
              <g clipPath="url(#nami-right-eye)"><image className={styles.pupil} href={`${asset}pupils/Vector-1.svg`} x="338" y="241" width="27" height="26" /></g>
            </g>
          </g>
          <g clipPath="url(#nami-fringe-crop)">
            <image className={styles.hairFront} href={`${asset}hair-front.svg`} x="158" y="27" width="317" height="264" />
          </g>
          <path d="M179 136Q151 158 148 226Q143 267 177 268L199 260L198 169Z M445 134Q467 150 482 192Q505 253 461 265L434 258L432 168Z" fill="#f7f3e9" />
          <image href={`${asset}headphones/Vector.svg`} x="143" y="126" width="69" height="142" />
          <image href={`${asset}headphones/Vector-1.svg`} x="424" y="126" width="68" height="140" />
        </g>
      </g>
      <image className={styles.line} href={`${asset}line.svg`} x="0" y="273" width="633" height="10" />
      <g clipPath="url(#nami-hand-crop)">
        <g className={styles.firstHand}>
          <path d="M166 275Q163 250 181 250Q195 229 217 243Q236 240 236 275Z" fill="#f7f3e9" />
          <image href={`${asset}hand-left.svg`} x="148" y="237" width="101" height="46" />
        </g>
        <g className={styles.secondHand}>
          <path d="M410 275Q406 242 428 240Q442 234 451 246Q475 244 481 275Z" fill="#f7f3e9" />
          <image href={`${asset}hand-right.svg`} x="395" y="237" width="101" height="45" />
        </g>
      </g>
    </svg>
  );
});

export default NamiCharacter;
