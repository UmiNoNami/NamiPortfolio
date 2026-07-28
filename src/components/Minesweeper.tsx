"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playClick } from "@/lib/sound";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

type Cell = { mine: boolean; revealed: boolean; flagged: boolean; adjacent: number };
type GameState = "ready" | "playing" | "won" | "lost";

// Classic Minesweeper number colors.
const NUMBER_COLORS: Record<number, string> = {
  1: "text-blue-600",
  2: "text-green-700",
  3: "text-red-600",
  4: "text-blue-900",
  5: "text-red-900",
  6: "text-teal-600",
  7: "text-black",
  8: "text-gray-600",
};

function createEmptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, revealed: false, flagged: false, adjacent: 0 }))
  );
}

function withMines(board: Cell[][], avoidRow: number, avoidCol: number): Cell[][] {
  const next = board.map((row) => row.map((c) => ({ ...c })));
  const forbidden = new Set<string>();
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      forbidden.add(`${avoidRow + dr},${avoidCol + dc}`);
    }
  }

  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (forbidden.has(`${r},${c}`) || next[r][c].mine) continue;
    next[r][c].mine = true;
    placed++;
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (next[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && next[nr][nc].mine) count++;
        }
      }
      next[r][c].adjacent = count;
    }
  }

  return next;
}

/** Flood-fill reveal starting at (row, col), opening connected zero-adjacent cells. */
function reveal(board: Cell[][], row: number, col: number): Cell[][] {
  const next = board.map((r) => r.map((c) => ({ ...c })));
  const stack: [number, number][] = [[row, col]];
  const seen = new Set<string>();

  while (stack.length) {
    const [r, c] = stack.pop()!;
    const key = `${r},${c}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue;

    const cell = next[r][c];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;

    if (cell.adjacent === 0 && !cell.mine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          stack.push([r + dr, c + dc]);
        }
      }
    }
  }

  return next;
}

/** Reveals every unflagged mine (correctly flagged ones stay hidden under their flag). */
function revealAllMines(board: Cell[][]): Cell[][] {
  return board.map((row) => row.map((c) => (c.mine && !c.flagged ? { ...c, revealed: true } : c)));
}

/** Cosmetic finishing touch: auto-flags every remaining mine on a win. */
function flagAllMines(board: Cell[][]): Cell[][] {
  return board.map((row) => row.map((c) => (c.mine ? { ...c, flagged: true } : c)));
}

function countFlags(board: Cell[][]): number {
  return board.flat().filter((c) => c.flagged).length;
}

function checkWin(board: Cell[][]): boolean {
  return board.flat().every((c) => c.mine || c.revealed);
}

// ---- Seven-segment LED digit, for the mine/timer counters ----

const SEGMENTS: Record<string, string[]> = {
  "0": ["top", "topLeft", "topRight", "bottomLeft", "bottomRight", "bottom"],
  "1": ["topRight", "bottomRight"],
  "2": ["top", "topRight", "middle", "bottomLeft", "bottom"],
  "3": ["top", "topRight", "middle", "bottomRight", "bottom"],
  "4": ["topLeft", "topRight", "middle", "bottomRight"],
  "5": ["top", "topLeft", "middle", "bottomRight", "bottom"],
  "6": ["top", "topLeft", "middle", "bottomLeft", "bottomRight", "bottom"],
  "7": ["top", "topRight", "bottomRight"],
  "8": ["top", "topLeft", "topRight", "middle", "bottomLeft", "bottomRight", "bottom"],
  "9": ["top", "topLeft", "topRight", "middle", "bottomRight", "bottom"],
  "-": ["middle"],
  " ": [],
};

function Digit({ char }: { char: string }) {
  const active = new Set(SEGMENTS[char] ?? []);
  const seg = (name: string, cls: string) => (
    <span
      className={`absolute rounded-[1px] ${cls} ${
        active.has(name) ? "bg-red-500" : "bg-red-950/70"
      }`}
      style={active.has(name) ? { boxShadow: "0 0 4px rgba(255,40,40,0.9)" } : undefined}
    />
  );
  return (
    <span className="relative inline-block h-[22px] w-[13px]">
      {seg("top", "left-[2px] right-[2px] top-0 h-[3px]")}
      {seg("topLeft", "left-0 top-[2px] h-[8px] w-[3px]")}
      {seg("topRight", "right-0 top-[2px] h-[8px] w-[3px]")}
      {seg("middle", "left-[2px] right-[2px] top-[9.5px] h-[3px]")}
      {seg("bottomLeft", "left-0 bottom-[2px] h-[8px] w-[3px]")}
      {seg("bottomRight", "right-0 bottom-[2px] h-[8px] w-[3px]")}
      {seg("bottom", "left-[2px] right-[2px] bottom-0 h-[3px]")}
    </span>
  );
}

function LedDisplay({ value }: { value: number }) {
  const clamped = Math.max(-99, Math.min(999, value));
  const negative = clamped < 0;
  const digitsStr = Math.abs(clamped)
    .toString()
    .padStart(negative ? 2 : 3, "0");
  const chars = (negative ? "-" : "") + digitsStr;
  const padded = chars.padStart(3, " ").split("");

  return (
    <div className="win-inset flex gap-[1px] bg-black px-1.5 py-1">
      {padded.map((ch, i) => (
        <Digit key={i} char={ch} />
      ))}
    </div>
  );
}

// ---- Pixel-grid sprite renderer — hand-authored, blocky, no smoothing ----
// (an 8-bit-style alternative to smooth SVG curves/circles)

const PIXEL_COLORS: Record<string, string> = {
  Y: "#FFDE2E",
  K: "#000000",
  R: "#e00000",
  W: "#ffffff",
};

function PixelIcon({ rows, className = "h-4 w-4" }: { rows: string[]; className?: string }) {
  const h = rows.length;
  const w = rows[0]?.length ?? 0;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges" className={className}>
      {rows.map((row, y) =>
        [...row].map((ch, x) => {
          const color = PIXEL_COLORS[ch];
          if (!color) return null;
          return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />;
        })
      )}
    </svg>
  );
}

// ---- Classic face button (normal / pressing / win / dead) — pixel sprites ----

type FaceState = "normal" | "pressing" | "won" | "lost";

const FACE_GRIDS: Record<FaceState, string[]> = {
  normal: [
    "....KKKK....",
    "..KKYYYYKK..",
    ".KYYYYYYYYK.",
    "KYYYYYYYYYYK",
    "KYYKYYYYKYYK",
    "KYYYYYYYYYYK",
    "KYYYYYYYYYYK",
    "KYYYYYYYYYYK",
    "KYYKYYYYKYYK",
    ".KYYKKKKYYK.",
    "..KKYYYYKK..",
    "....KKKK....",
  ],
  won: [
    "....KKKK....",
    "..KKYYYYKK..",
    ".KYYYYYYYYK.",
    "KKKKKKKKKKKK",
    "KKKKKKKKKKKK",
    "KYYYYYYYYYYK",
    "KYYYYYYYYYYK",
    "KYYYYYYYYYYK",
    "KYYKYYYYKYYK",
    ".KYYKKKKYYK.",
    "..KKYYYYKK..",
    "....KKKK....",
  ],
  lost: [
    "....KKKK....",
    "..KKYYYYKK..",
    ".KYYYYYYYYK.",
    "KYKYKYYKYKYK",
    "KYYKYYYYKYYK",
    "KYKYKYYKYKYK",
    "KYYYYYYYYYYK",
    "KYYYYYYYYYYK",
    "KYYYKKKKYYYK",
    ".KYKYYYYKYK.",
    "..KKYYYYKK..",
    "....KKKK....",
  ],
  pressing: [
    "....KKKK....",
    "..KKYYYYKK..",
    ".KYYYYYYYYK.",
    "KYYYYYYYYYYK",
    "KYYKYYYYKYYK",
    "KYYYYYYYYYYK",
    "KYYYYYYYYYYK",
    "KYYYYYYYYYYK",
    "KYYYYKKYYYYK",
    ".KYYYKKYYYK.",
    "..KKYYYYKK..",
    "....KKKK....",
  ],
};

function Face({ state }: { state: FaceState }) {
  return <PixelIcon rows={FACE_GRIDS[state]} className="h-6 w-6" />;
}

// ---- Mine glyph (kept as a smooth SVG per feedback — only the face and
// flag are pixel sprites) + flag pixel sprite ----

function MineIcon({ wrong = false, className = "h-4 w-4" }: { wrong?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className}>
      <g stroke="#000" strokeWidth="1">
        <line x1="8" y1="1" x2="8" y2="15" />
        <line x1="1" y1="8" x2="15" y2="8" />
        <line x1="3" y1="3" x2="13" y2="13" />
        <line x1="13" y1="3" x2="3" y2="13" />
      </g>
      <circle cx="8" cy="8" r="4.2" fill="#000" />
      <circle cx="6.5" cy="6.5" r="1" fill="#fff" />
      {wrong && <line x1="1.5" y1="1.5" x2="14.5" y2="14.5" stroke="#e00" strokeWidth="1.8" />}
      {wrong && <line x1="14.5" y1="1.5" x2="1.5" y2="14.5" stroke="#e00" strokeWidth="1.8" />}
    </svg>
  );
}

const FLAG_GRID = [
  "..K........",
  "..KRRRRR...",
  "..KRRRR....",
  "..KRRR.....",
  "..KRR......",
  "..KR.......",
  "..K........",
  "..K........",
  "..K........",
  "..K........",
  ".KKK.......",
];

function FlagIcon({ className = "h-4 w-4" }: { className?: string }) {
  return <PixelIcon rows={FLAG_GRID} className={className} />;
}

/**
 * Classic Minesweeper, rebuilt for the Playground icon — same beveled gray
 * chrome, seven-segment red LED mine/timer counters, a smiley reset button
 * that reacts to what's happening (pressing/won/dead), and colored number
 * cells matching the real Windows applet. Beginner difficulty: 9x9, 10
 * mines, first click is always safe.
 */
export default function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>(createEmptyBoard);
  const [state, setState] = useState<GameState>("ready");
  const [seconds, setSeconds] = useState(0);
  const [exploded, setExploded] = useState<{ row: number; col: number } | null>(null);
  const [pressing, setPressing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state === "playing") {
      timerRef.current = setInterval(() => setSeconds((s) => Math.min(s + 1, 999)), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state]);

  // Safety net: if the mouse is released outside the board, don't leave the
  // face stuck in the "pressing" surprised state.
  useEffect(() => {
    const clear = () => setPressing(false);
    window.addEventListener("mouseup", clear);
    return () => window.removeEventListener("mouseup", clear);
  }, []);

  const reset = useCallback(() => {
    playClick();
    setBoard(createEmptyBoard());
    setState("ready");
    setSeconds(0);
    setExploded(null);
    setPressing(false);
  }, []);

  const handleReveal = (row: number, col: number) => {
    if (state === "won" || state === "lost") return;
    const cell = board[row][col];
    if (cell.revealed || cell.flagged) return;
    playClick();

    let working = board;
    if (state === "ready") {
      working = withMines(board, row, col);
    }

    const clicked = working[row][col];
    if (clicked.mine) {
      const revealedAll = revealAllMines(working);
      revealedAll[row][col].revealed = true;
      setBoard(revealedAll);
      setExploded({ row, col });
      setState("lost");
      return;
    }

    const revealedBoard = reveal(working, row, col);
    if (checkWin(revealedBoard)) {
      setBoard(flagAllMines(revealedBoard));
      setState("won");
    } else {
      setBoard(revealedBoard);
      setState("playing");
    }
  };

  const handleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (state === "won" || state === "lost") return;
    const cell = board[row][col];
    if (cell.revealed) return;
    playClick();
    const next = board.map((r) => r.map((c) => ({ ...c })));
    next[row][col].flagged = !next[row][col].flagged;
    setBoard(next);
  };

  const flagCount = countFlags(board);
  const mineCounter = Math.max(-99, Math.min(999, MINES - flagCount));
  const faceState: FaceState = state === "lost" ? "lost" : state === "won" ? "won" : pressing ? "pressing" : "normal";
  const gameOver = state === "lost";

  return (
    <div className="win-outset inline-flex flex-col gap-2 bg-winface p-3">
      <div className="win-inset flex items-center justify-between gap-2 bg-winface p-1.5">
        <LedDisplay value={mineCounter} />
        <button
          type="button"
          onClick={reset}
          aria-label="Reset game"
          className="win-outset-sm flex h-8 w-8 items-center justify-center bg-winface active:win-inset-sm"
        >
          <Face state={faceState} />
        </button>
        <LedDisplay value={seconds} />
      </div>

      <div
        className="win-inset grid gap-0 bg-winface p-1"
        style={{ gridTemplateColumns: `repeat(${COLS}, 2.25rem)` }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {board.map((rowCells, r) =>
          rowCells.map((cell, c) => {
            const isExploded = exploded?.row === r && exploded?.col === c;
            const wrongFlag = gameOver && cell.flagged && !cell.mine;
            return (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => handleReveal(r, c)}
                onContextMenu={(e) => handleFlag(e, r, c)}
                onMouseDown={(e) => {
                  if (e.button === 0 && state !== "won" && state !== "lost" && !cell.revealed && !cell.flagged) {
                    setPressing(true);
                  }
                }}
                onMouseUp={() => setPressing(false)}
                onMouseLeave={() => setPressing(false)}
                className={`flex h-9 w-9 items-center justify-center text-xl font-bold leading-none ${
                  cell.revealed || wrongFlag ? "win-inset-sm" : "win-outset-sm"
                } ${isExploded ? "bg-red-500" : "bg-winface"}`}
              >
                {cell.revealed ? (
                  cell.mine ? (
                    <MineIcon className="h-7 w-7" />
                  ) : cell.adjacent > 0 ? (
                    <span className={`font-pixel ${NUMBER_COLORS[cell.adjacent]}`}>{cell.adjacent}</span>
                  ) : null
                ) : cell.flagged ? (
                  wrongFlag ? (
                    <MineIcon wrong className="h-7 w-7" />
                  ) : (
                    <FlagIcon className="h-6 w-6" />
                  )
                ) : null}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
