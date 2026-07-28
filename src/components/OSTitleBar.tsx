"use client";

/**
 * The outermost "browser chrome" — makes the whole page read as one big
 * OS window titled "Nami Portfolio", exactly like the reference mockup.
 * Fixed to the very top; pairs with Taskbar.tsx fixed to the very bottom.
 */
export default function OSTitleBar() {
  return (
    <div className="win-outset fixed inset-x-0 top-0 z-50 flex h-9 items-center gap-2 bg-gradient-to-r from-winnavy to-winnavy2 px-2 sm:h-10">
      <span className="h-3 w-3 shrink-0 border border-winnavy2 bg-white sm:h-3.5 sm:w-3.5" />
      <span className="mr-auto font-pixel text-xs leading-none text-white sm:text-sm">
        Nami Portfolio
      </span>
      <div className="flex items-center gap-[3px]">
        <span className="win-outset-sm flex h-5 w-5 items-center justify-center bg-winface text-[10px] font-bold leading-none text-black sm:h-6 sm:w-6 sm:text-xs">
          _
        </span>
        <span className="win-outset-sm flex h-5 w-5 items-center justify-center bg-winface text-[9px] font-bold leading-none text-black sm:h-6 sm:w-6 sm:text-[11px]">
          □
        </span>
        <span className="win-outset-sm flex h-5 w-5 items-center justify-center bg-winface text-[10px] font-bold leading-none text-black sm:h-6 sm:w-6 sm:text-xs">
          ✕
        </span>
      </div>
    </div>
  );
}
