"use client";

import { useEffect, useState } from "react";

/**
 * Types out each line in `lines` one character at a time, one line after
 * another — the classic terminal/HUD "auto-typing" readout effect. Restarts
 * from scratch whenever `active` flips from false to true (or true again),
 * so a modal that remounts/reopens gets a fresh type-out each time.
 *
 * `lines` should be a stable reference (define the array as a module-level
 * constant, not inline in JSX) so this effect doesn't restart every render.
 */
export function useTypewriter(
  lines: string[],
  { speed = 22, startDelay = 0, linePause = 4, active = true }: { speed?: number; startDelay?: number; linePause?: number; active?: boolean } = {}
) {
  const [output, setOutput] = useState<string[]>(() => lines.map(() => ""));
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    setOutput(lines.map(() => ""));
    setDone(false);

    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function typeNext() {
      if (cancelled) return;
      if (lineIndex >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[lineIndex];
      if (charIndex <= line.length) {
        const li = lineIndex;
        const ci = charIndex;
        setOutput((prev) => {
          const next = [...prev];
          next[li] = line.slice(0, ci);
          return next;
        });
        charIndex++;
        timeouts.push(setTimeout(typeNext, speed));
      } else {
        lineIndex++;
        charIndex = 0;
        timeouts.push(setTimeout(typeNext, speed * linePause));
      }
    }

    timeouts.push(setTimeout(typeNext, startDelay));

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // lines is expected to be a stable module-level array; re-running only
    // needs to react to `active` toggling.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return { lines: output, done };
}
