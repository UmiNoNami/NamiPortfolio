"use client";

import RevealOnScroll from "./RevealOnScroll";
import PixelWindow from "./PixelWindow";
import PixelButton from "./PixelButton";
import DesktopIcon from "./DesktopIcon";
import { NoteIcon, EnvelopeIcon } from "./PixelIcons";

export default function Connect() {
  return (
    <section id="connect" className="border-b-2 border-ink bg-paper px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll>
          <PixelWindow title="Contact Me" className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              let&apos;s talk
            </p>
            <h2 className="mt-2 font-pixel text-3xl sm:text-4xl">
              Say hi, Nami&apos;s listening
            </h2>
            <p className="mx-auto mt-3 max-w-md font-mono text-sm text-ink-soft sm:text-base">
              Open to product design work, front-end collabs, or just talking
              about good UI. Drop a line whenever.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <PixelButton href="mailto:naransuvd57@gmail.com">
                naransuvd57@gmail.com
              </PixelButton>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-muted">
              {/* TODO: replace with your real LinkedIn URL */}
              <a
                href="https://linkedin.com/in/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-1 underline-offset-4 hover:text-ink"
              >
                LinkedIn ↗
              </a>
              {/* TODO: add resume.pdf to the /public folder */}
              <a
                href="/resume.pdf"
                className="underline decoration-1 underline-offset-4 hover:text-ink"
              >
                Résumé ↗
              </a>
            </div>
          </PixelWindow>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="mt-14 flex justify-center gap-8 sm:gap-12">
          <DesktopIcon href="/#work" label="Case Studies">
            <NoteIcon className="h-7 w-7" />
          </DesktopIcon>
          <DesktopIcon href="mailto:naransuvd57@gmail.com" label="Contact Me">
            <EnvelopeIcon className="h-7 w-7" />
          </DesktopIcon>
        </RevealOnScroll>
      </div>
    </section>
  );
}
