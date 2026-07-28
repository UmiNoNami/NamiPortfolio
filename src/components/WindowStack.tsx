"use client";

/**
 * Cascade of "ghost" window frames peeking out behind a real PixelWindow —
 * same beveled frame + full title bar chrome (icon dot, title, minimize/
 * maximize/close buttons) as PixelWindow, just with an empty content pane —
 * to sell the classic "I have a bunch of windows open" stacked look.
 * Rendered as absolutely-positioned siblings *before* the real window in the
 * DOM, offset up-and-right so each one peeks out taller above the top edge
 * (kept away from the left edge on purpose, since the icon sidebar sits
 * close by).
 */
export default function WindowStack({
  width,
  height,
  count = 2,
  offset = 18,
  titles = [],
}: {
  width: number;
  height: number;
  count?: number;
  offset?: number;
  /** Optional title text per ghost, furthest-back first. */
  titles?: string[];
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const n = count - i; // furthest-back ghost gets the biggest offset
        const title = titles[i] ?? "";
        return (
          <div
            key={i}
            className="win-outset absolute flex flex-col bg-winface p-[3px]"
            style={{
              width,
              height,
              left: n * offset,
              top: -n * offset,
              zIndex: -n,
            }}
          >
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-winnavy to-winnavy2 px-1.5 py-1">
              <span className="h-2.5 w-2.5 shrink-0 border border-winnavy2 bg-white sm:h-3 sm:w-3" />
              <span className="mr-auto truncate font-pixel text-xs leading-none text-white sm:text-sm">
                {title}
              </span>
              <div className="flex items-center gap-[3px]">
                <span className="win-outset-sm flex h-4 w-4 items-center justify-center bg-winface text-[9px] font-bold leading-none text-black sm:h-[18px] sm:w-[18px] sm:text-[10px]">
                  _
                </span>
                <span className="win-outset-sm flex h-4 w-4 items-center justify-center bg-winface text-[8px] font-bold leading-none text-black sm:h-[18px] sm:w-[18px] sm:text-[9px]">
                  □
                </span>
                <span className="win-outset-sm flex h-4 w-4 items-center justify-center bg-winface text-[9px] font-bold leading-none text-black sm:h-[18px] sm:w-[18px] sm:text-[10px]">
                  ✕
                </span>
              </div>
            </div>
            <div className="win-inset mt-[3px] flex-1 bg-paper" />
          </div>
        );
      })}
    </>
  );
}
