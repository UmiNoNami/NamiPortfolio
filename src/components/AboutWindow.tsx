"use client";

import Image from "next/image";
import PixelWindow from "./PixelWindow";
import { MonitorIcon, ControllerIcon } from "./PixelIcons";

const facts = [
  { icon: MonitorIcon, text: "Based in Dublin, Ireland" },
  { icon: ControllerIcon, text: "Code. Design. Coffee." },
];

export default function AboutWindow({
  className = "",
  onClose,
  onMinimize,
}: {
  className?: string;
  onClose?: () => void;
  onMinimize?: () => void;
}) {
  return (
    <PixelWindow title="about_me.txt" className={className} onClose={onClose} onMinimize={onMinimize}>
      <div className="flex items-start gap-6 sm:gap-8">
        <div className="win-inset relative h-[190px] w-[190px] shrink-0 overflow-hidden bg-white sm:h-[225px] sm:w-[225px]">
          <Image
            src="/avatar.png"
            alt="Pixel-art illustration of Nami wearing headphones"
            fill
            sizes="225px"
            className="object-cover"
            priority
          />
        </div>

        <div className="min-w-0">
          <h3 className="font-pixel text-4xl leading-tight sm:text-5xl">Hi, I&apos;m Nami.</h3>
          <div
            className="my-4 h-px w-48"
            style={{ backgroundImage: "repeating-linear-gradient(to right, #111 0 4px, transparent 4px 8px)" }}
          />
          <p className="font-pixel text-2xl leading-snug sm:text-3xl">
            UI/UX Designer &amp;
            <br />
            Front-End Developer
          </p>
        </div>
      </div>

      {/* This line and the heading/role above are the primary read —
          sized above the supporting fact rows below to keep that hierarchy. */}
      <p className="mt-7 font-mono text-xl leading-relaxed text-ink-soft sm:text-2xl">
        I design and build digital experiences that are intuitive, accessible and
        visually engaging.
      </p>

      <div className="mt-7 border-t-2 border-ink pt-5">
        <div className="flex flex-col gap-4">
          {facts.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.text} className="flex items-center gap-3">
                <Icon className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
                <span className="font-mono text-lg sm:text-xl">{f.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </PixelWindow>
  );
}
