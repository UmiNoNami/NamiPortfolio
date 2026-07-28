"use client";

import { useId } from "react";

type IconProps = { className?: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinejoin: "miter" as const,
  strokeLinecap: "square" as const,
};

// ---------------------------------------------------------------------
// "Fun sticker" icon set — bold dark outlines, flat saturated color
// fields, and a single glossy highlight shape per icon, in the spirit
// of a classic colorful Win95/98 icon pack. Original artwork, not
// traced from any reference image. Smaller inline icons (used next to
// a line of text rather than as a standalone tile) stay simple flat
// line-art so they don't compete with the copy around them.
// ---------------------------------------------------------------------

const INK = "#1a1a1a";

export function FolderIcon({ className = "" }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <defs>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD23D" />
          <stop offset="100%" stopColor="#FFA400" />
        </linearGradient>
      </defs>
      <path
        d="M1.5 5.2h7.4l1.7 2.1H22a1 1 0 0 1 1 1v1.1H1.5z"
        fill="#FFC63D"
        stroke={INK}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <path
        d="M1.5 8.4H23v10.9a1.1 1.1 0 0 1-1.1 1.1H2.6a1.1 1.1 0 0 1-1.1-1.1z"
        fill={`url(#${id}-front)`}
        stroke={INK}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <path d="M3 9.9h6.5" stroke="#FFEFB0" strokeWidth={1.4} strokeLinecap="round" opacity={0.9} />
    </svg>
  );
}

export function FloppyIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="2.4" y="2.2" width="19.2" height="19.6" rx="1.6" fill="#3E6BFF" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <rect x="6.6" y="3.4" width="8.6" height="6.2" fill="#EDEFF4" stroke={INK} strokeWidth={1.1} strokeLinejoin="round" />
      <rect x="12" y="4.2" width="1.9" height="4.6" fill="#3B4252" />
      <rect x="5" y="12.2" width="14" height="7.6" fill="#FFF7DE" stroke={INK} strokeWidth={1.1} strokeLinejoin="round" />
      <rect x="6.2" y="13.6" width="9.6" height="1.3" rx="0.4" fill="#FF7A59" opacity={0.9} />
      <rect x="6.2" y="15.7" width="7.4" height="1.3" rx="0.4" fill="#3E6BFF" opacity={0.7} />
      <path d="M4 3.6c.6-.4 1.2-.5 1.7 0" stroke="#B9C7FF" strokeWidth={1} strokeLinecap="round" opacity={0.9} />
    </svg>
  );
}

export function EnvelopeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="1.6" y="4.6" width="20.8" height="14.6" rx="1.2" fill="#FFFFFF" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <path d="M1.6 5.1l10.4 8 10.4-8" fill="none" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" />
      <path d="M1.6 5l4.8 3.7-4.8 9.4z" fill="#FFE28A" opacity={0.7} />
      <path d="M22.4 5l-4.8 3.7 4.8 9.4z" fill="#FFE28A" opacity={0.7} />
      <rect x="2.4" y="16.4" width="19.2" height="1.5" fill="#3E6BFF" />
      <rect x="2.4" y="18" width="19.2" height="1.5" fill="#FF5C5C" />
    </svg>
  );
}

export function ControllerIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M5.6 7.6h12.8l3.2 4.6v5.4a2.1 2.1 0 0 1-3.7 1.4L15.6 16H8.4l-2.3 2.9a2.1 2.1 0 0 1-3.7-1.4v-5.4z"
        fill="#7C6CF0"
        stroke={INK}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <path d="M7 10.6v3.4M5.3 12.3h3.4" stroke="#FFFFFF" strokeWidth={1.4} strokeLinecap="round" />
      <circle cx="14.9" cy="11.6" r="1.15" fill="#FF5C5C" stroke={INK} strokeWidth={0.6} />
      <circle cx="17.7" cy="14" r="1.15" fill="#3EC6FF" stroke={INK} strokeWidth={0.6} />
      <path d="M7.5 8.5c1.5-.7 3-.7 4.5 0" stroke="#C6BEFF" strokeWidth={1} strokeLinecap="round" opacity={0.9} />
    </svg>
  );
}

export function NoteIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M3.6 1.8h12.3L20 6v16.2H3.6z" fill="#FFFDF6" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <path d="M15.9 1.8V6H20z" fill="#FFE28A" stroke={INK} strokeWidth={1.2} strokeLinejoin="round" />
      <path d="M6.4 9.6h10.4M6.4 13h10.4M6.4 16.4h6.8" stroke="#3E6BFF" strokeWidth={1.4} strokeLinecap="round" />
    </svg>
  );
}

export function CodeWindowIcon({ className = "" }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <defs>
        <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B2A57" />
          <stop offset="100%" stopColor="#0B1533" />
        </linearGradient>
      </defs>
      <rect x="1.6" y="2.6" width="20.8" height="18.2" rx="1.2" fill="#EDEFF4" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <rect x="1.6" y="2.6" width="20.8" height="4.4" rx="1.2" fill="#3E6BFF" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <circle cx="4.1" cy="4.8" r="0.75" fill="#FF5C5C" />
      <circle cx="6.3" cy="4.8" r="0.75" fill="#FFC94A" />
      <circle cx="8.5" cy="4.8" r="0.75" fill="#4ADE80" />
      <rect x="2.7" y="8" width="18.6" height="11.8" fill={`url(#${id}-screen)`} />
      <path
        d="M8.8 11.7l-2.6 2.6 2.6 2.6M15.2 11.7l2.6 2.6-2.6 2.6"
        stroke="#6CF4C8"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function StarIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M12 2l2.5 7.5H22l-6 4.6 2.3 7.4L12 17.1 5.7 21.5 8 14.1 2 9.5h7.5z"
        fill="#FFC94A"
        stroke={INK}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <path d="M12 5.4l1.3 4" stroke="#FFF0BE" strokeWidth={1.1} strokeLinecap="round" opacity={0.85} />
    </svg>
  );
}

export function PersonIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
    </svg>
  );
}

export function MonitorIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <rect x="2" y="4" width="20" height="13" />
      <path d="M9 21h6M12 17v4" />
    </svg>
  );
}

export function HeartIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M12 20S3 14 3 8.5 8 2 12 6c4-4 9-2 9 2.5S12 20 12 20Z" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function SpeakerIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
      <path d="M4 9h4l5-4v14l-5-4H4z" />
      <path
        d="M16.5 8.5a5 5 0 0 1 0 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <path
        d="M19 6a9 9 0 0 1 0 12"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        opacity={0.7}
      />
    </svg>
  );
}

export function CursorIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
      <path d="M4 2l14 8-6 1.5L14 20l-3-6-7 4.5z" />
    </svg>
  );
}

// ---------------------------------------------------------------------
// Sidebar desktop-icon tiles — same bold-outline "sticker" treatment.
// ---------------------------------------------------------------------

export function GlobeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="9.6" fill="#3EC6FF" stroke={INK} strokeWidth={1.3} />
      <path
        d="M6 6.5c1.6 1.6 2.4 3.6 1.4 5.8-1 2.2.2 4.4 2.4 5.2M17 6c-1.2 1.6-3.4 2-4.6 3.8-1 1.5.2 3.2 2 3 1.8-.2 2.8 1.4 2 3-.5 1-.3 2 .4 2.8"
        fill="none"
        stroke="#1E9E4C"
        strokeWidth={1.6}
        strokeLinecap="round"
        opacity={0.85}
      />
      <ellipse cx="12" cy="12" rx="9.6" ry="9.6" fill="none" stroke={INK} strokeWidth={1.3} />
      <path d="M2.4 12h19.2" stroke={INK} strokeWidth={0.7} opacity={0.35} />
      <path d="M8.5 6.5c-3 3-3 8 0 11M15.5 6.5c3 3 3 8 0 11" fill="none" stroke={INK} strokeWidth={0.7} opacity={0.35} />
      <path d="M6.5 6.5a7 5 0 0 1 4.5-1.6" stroke="#D7F5FF" strokeWidth={1.4} strokeLinecap="round" opacity={0.85} />
    </svg>
  );
}

export function FilmIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="1.8" y="8.6" width="20.4" height="12.6" rx="1.2" fill="#3B3B45" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <path
        d="M1.8 8.6l2.6-5.4h3.4L5.2 8.6zM8.4 8.6l2.6-5.4h3.4L11.8 8.6zM15 8.6l2.6-5.4h3.4L19 8.6z"
        fill="#FF5C5C"
        stroke={INK}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      <circle cx="12" cy="15" r="4" fill="#FFC94A" stroke={INK} strokeWidth={1.1} />
      <path d="M10.8 13.1l3 1.9-3 1.9z" fill="#3B3B45" />
    </svg>
  );
}

export function TrashIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M5 7.4h14l-1.3 13a1.6 1.6 0 0 1-1.6 1.4H7.9a1.6 1.6 0 0 1-1.6-1.4z"
        fill="#B9C2D6"
        stroke={INK}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <rect x="3.2" y="4.6" width="17.6" height="2.6" rx="0.5" fill="#8C96AC" stroke={INK} strokeWidth={1.2} strokeLinejoin="round" />
      <rect x="9" y="2.2" width="6" height="2.4" rx="0.5" fill="#A7B0C4" stroke={INK} strokeWidth={1.1} strokeLinejoin="round" />
      <path d="M9.6 10.4v8M12 10.4v8M14.4 10.4v8" stroke={INK} strokeWidth={1.1} strokeLinecap="round" opacity={0.7} />
      <path d="M7 9l1.4 1.4" stroke="#4ADE80" strokeWidth={1.4} strokeLinecap="round" opacity={0.9} />
    </svg>
  );
}

export function SearchIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="10.2" cy="10.2" r="7.2" fill="#3EC6FF" stroke={INK} strokeWidth={1.4} />
      <circle cx="10.2" cy="10.2" r="4.4" fill="none" stroke="#1E7FB5" strokeWidth={0.9} opacity={0.6} />
      <path d="M6.6 6.9c1.4-1.4 3.2-1.7 4.7-1" stroke="#E4F7FF" strokeWidth={1.4} strokeLinecap="round" opacity={0.9} />
      <rect
        x="18.1"
        y="17"
        width="3.7"
        height="2"
        rx="0.6"
        transform="rotate(45 19.9 18)"
        fill="#3B3B45"
        stroke={INK}
        strokeWidth={0.8}
      />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="5.8" y="1.4" width="12.4" height="21.2" rx="2.4" fill="#4ADE80" stroke={INK} strokeWidth={1.3} strokeLinejoin="round" />
      <rect x="7.4" y="4" width="9.2" height="13.4" rx="0.6" fill="#0B1533" stroke={INK} strokeWidth={1} />
      <path d="M8.6 6.2h6.8M8.6 8.2h5" stroke="#4ADE80" strokeWidth={1} strokeLinecap="round" opacity={0.8} />
      <circle cx="12" cy="20" r="1.15" fill="#0B1533" />
      <path d="M7 3.4c.9-.6 1.9-.7 2.7 0" stroke="#DFFFE9" strokeWidth={1.1} strokeLinecap="round" opacity={0.9} />
    </svg>
  );
}

export function WrenchIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#FF9A3D" stroke={INK} strokeWidth={1.2} />
      <path
        d="M17 6.2a4 4 0 0 0-5.3 4.5L6.2 16.2l1.6 1.6 5.5-5.5a4 4 0 0 0 4.5-5.3l-2.4 2.4-1.8-.6-.6-1.8z"
        fill="#FFF3E4"
        stroke={INK}
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CodeBracketsIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#7C6CF0" stroke={INK} strokeWidth={1.2} />
      <path
        d="M9 7.5L4.5 12 9 16.5M15 7.5l4.5 4.5-4.5 4.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Html5Badge({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#E44D26" stroke={INK} strokeWidth={1.2} />
      <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="monospace">
        5
      </text>
    </svg>
  );
}

export function JsBadge({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#F0DB4F" stroke={INK} strokeWidth={1.2} />
      <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="700" fill="#111" fontFamily="monospace">
        JS
      </text>
    </svg>
  );
}

export function ReactBadge({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#0B1E3D" stroke={INK} strokeWidth={1.2} />
      <g stroke="#61DAFB" strokeWidth={1.1} fill="none">
        <ellipse cx="12" cy="12" rx="7" ry="2.8" />
        <ellipse cx="12" cy="12" rx="7" ry="2.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="7" ry="2.8" transform="rotate(120 12 12)" />
      </g>
      <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
    </svg>
  );
}

export function PaletteIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M12 1.6a10.4 9.4 0 0 0 0 18.8c1.5 0 2.1-1.1 1.2-2-.6-.6-.2-1.7.8-1.7H16.6a5.2 5.2 0 0 0 5.2-5.2c0-6-4.7-9.9-9.8-9.9z"
        fill="#FFC94A"
        stroke={INK}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <circle cx="7.6" cy="9.4" r="1.6" fill="#FF5C5C" stroke={INK} strokeWidth={0.7} />
      <circle cx="12.4" cy="6.6" r="1.6" fill="#3E6BFF" stroke={INK} strokeWidth={0.7} />
      <circle cx="17" cy="9.4" r="1.6" fill="#4ADE80" stroke={INK} strokeWidth={0.7} />
      <circle cx="7.9" cy="14.8" r="1.6" fill="#FFFFFF" stroke={INK} strokeWidth={0.7} />
      <path d="M5.4 5.6c1.2-1.4 2.7-2.2 4.3-2.6" stroke="#FFF0BE" strokeWidth={1.2} strokeLinecap="round" opacity={0.85} />
    </svg>
  );
}
