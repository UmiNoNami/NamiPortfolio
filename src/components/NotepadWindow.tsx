"use client";

import PixelWindow from "./PixelWindow";

export default function NotepadWindow({ className = "" }: { className?: string }) {
  return (
    <PixelWindow
      title="note_to_self - Notepad"
      className={className}
      menuItems={["File", "Edit", "Format", "View", "Help"]}
      statusBar={{ left: "Ln 4, Col 1", right: "100%" }}
    >
      <div className="win-inset flex h-full min-h-[190px] items-start gap-2 bg-white py-3 pl-1.5 pr-3 sm:min-h-[230px] sm:py-3 sm:pl-2 sm:pr-3">
        <p className="w-full flex-1 whitespace-pre-line text-left font-mono text-lg leading-relaxed text-ink sm:text-xl">
          {"destiny can be\nchanged only in\nthe present\n\n- daajil"}
        </p>
        <div className="win-inset flex h-full w-3 shrink-0 flex-col items-center bg-winface py-1">
          <span className="win-outset-sm h-3 w-3 shrink-0 bg-winface text-[7px] leading-3">▲</span>
          <span className="mt-1 h-8 w-2.5 shrink-0 bg-windark" />
        </div>
      </div>
    </PixelWindow>
  );
}
