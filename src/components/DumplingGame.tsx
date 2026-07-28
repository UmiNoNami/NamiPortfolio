"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playClick, playPickup, playWin, playLose } from "@/lib/sound";

// ---- World geometry -------------------------------------------------------

const CANVAS_W = 480;
const CANVAS_H = 320;

const GRAVITY = 0.55;
const MAX_FALL = 13;
const JUMP_VELOCITY = -10.6;
const MOVE_SPEED = 2.8;

const PLAYER_W = 28;
const PLAYER_H = 28;
const ENEMY_W = 20;
const ENEMY_H = 20;
const DUMPLING_W = 22;
const DUMPLING_H = 18;

type Rect = { x: number; y: number; w: number; h: number };
type EnemyDef = { x: number; y: number; minX: number; maxX: number; speed: number };
type LevelDef = {
  name: string;
  difficulty: string;
  platforms: Rect[];
  dumplings: { x: number; y: number }[];
  enemies: EnemyDef[];
  goal: Rect;
  playerStart: { x: number; y: number };
};

const LEVELS: LevelDef[] = [
  {
    name: "Level 1",
    difficulty: "Easy — just a stroll",
    platforms: [
      { x: 0, y: 300, w: 480, h: 20 },
      { x: 130, y: 235, w: 90, h: 16 },
      { x: 290, y: 180, w: 90, h: 16 },
    ],
    dumplings: [
      { x: 50, y: 278 },
      { x: 160, y: 215 },
      { x: 320, y: 160 },
      { x: 230, y: 278 },
      { x: 400, y: 278 },
    ],
    enemies: [],
    goal: { x: 440, y: 250, w: 26, h: 50 },
    playerStart: { x: 20, y: 280 },
  },
  {
    name: "Level 2",
    difficulty: "Medium — mind the gaps",
    platforms: [
      { x: 0, y: 300, w: 150, h: 20 },
      { x: 230, y: 300, w: 120, h: 20 },
      { x: 420, y: 300, w: 60, h: 20 },
      { x: 70, y: 240, w: 80, h: 16 },
      { x: 190, y: 190, w: 70, h: 16 },
      { x: 330, y: 230, w: 80, h: 16 },
    ],
    dumplings: [
      { x: 90, y: 278 },
      { x: 95, y: 220 },
      { x: 210, y: 170 },
      { x: 350, y: 210 },
      { x: 250, y: 278 },
      { x: 300, y: 278 },
      { x: 435, y: 278 },
    ],
    enemies: [{ x: 235, y: 282, minX: 235, maxX: 332, speed: 1.2 }],
    goal: { x: 450, y: 250, w: 26, h: 50 },
    playerStart: { x: 20, y: 280 },
  },
  {
    name: "Level 3",
    difficulty: "Hard — dumplings don't come easy",
    platforms: [
      { x: 0, y: 300, w: 110, h: 20 },
      { x: 200, y: 300, w: 90, h: 20 },
      { x: 380, y: 300, w: 100, h: 20 },
      { x: 130, y: 235, w: 70, h: 16 },
      { x: 300, y: 225, w: 70, h: 16 },
      { x: 210, y: 160, w: 70, h: 16 },
      { x: 400, y: 150, w: 80, h: 16 },
    ],
    dumplings: [
      { x: 40, y: 278 },
      { x: 150, y: 215 },
      { x: 240, y: 278 },
      { x: 270, y: 278 },
      { x: 230, y: 140 },
      { x: 325, y: 205 },
      { x: 410, y: 278 },
      { x: 415, y: 130 },
    ],
    enemies: [
      { x: 205, y: 282, minX: 205, maxX: 272, speed: 1.3 },
      { x: 305, y: 207, minX: 305, maxX: 352, speed: 1.6 },
    ],
    goal: { x: 430, y: 100, w: 26, h: 50 },
    playerStart: { x: 20, y: 280 },
  },
];

// Each level gets its own sky so the game visibly moves forward as it gets
// harder: bright morning, golden dusk, then a vivid rainbow sky for the finale.
type ThemeMode = "day" | "dusk" | "vivid";
type Theme = { skyTop: string; skyBottom: string; mode: ThemeMode };
const LEVEL_THEMES: Theme[] = [
  { skyTop: "#8FD3F4", skyBottom: "#EAF8FF", mode: "day" },
  { skyTop: "#F3906A", skyBottom: "#FFD9A0", mode: "dusk" },
  { skyTop: "#FF7BAC", skyBottom: "#FFE29A", mode: "vivid" },
];

type Dumpling = { x: number; y: number; collected: boolean };
type Enemy = EnemyDef & { dir: 1 | -1 };
type World = {
  player: { x: number; y: number; vx: number; vy: number; onGround: boolean; facing: 1 | -1 };
  platforms: Rect[];
  dumplings: Dumpling[];
  enemies: Enemy[];
  goal: Rect;
  start: { x: number; y: number };
  theme: Theme;
};

function rectsOverlap(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number
) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function buildWorld(idx: number): World {
  const def = LEVELS[idx];
  return {
    player: { x: def.playerStart.x, y: def.playerStart.y, vx: 0, vy: 0, onGround: false, facing: 1 },
    platforms: def.platforms,
    dumplings: def.dumplings.map((d) => ({ ...d, collected: false })),
    enemies: def.enemies.map((e) => ({ ...e, dir: 1 as const })),
    goal: def.goal,
    start: def.playerStart,
    theme: LEVEL_THEMES[idx],
  };
}

// ---- Hand-pixelled sprites, drawn as blocky grids on the canvas -----------

// A pot-sticker silhouette — pale pleated dough on top, seared golden-brown
// bottom — rather than a plain blob, so it actually reads as a dumpling.
const DUMPLING_GRID = [
  ".KKKKKKKK.",
  "KWWWWWWWWK",
  "KWWSWWSWWK",
  "KWWWWWWWWK",
  "KWWWWWWWWK",
  "KBBBBBBBBK",
  ".KKKKKKKK.",
];
const DUMPLING_COLORS: Record<string, string> = {
  K: "#2A1A10",
  W: "#FBEBC7",
  S: "#E4CB92",
  B: "#C97B3D",
};

const ENEMY_GRID = [".KKKK.", "KRRRRK", "KDDDDK", "KDWDWK", "KDDDDK", ".KKKK."];
const ENEMY_COLORS: Record<string, string> = {
  K: "#12192B",
  R: "#E2532E",
  D: "#3A2416",
  W: "#FFFFFF",
};

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, 22 * scale, 12 * scale, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 18 * scale, y - 6 * scale, 16 * scale, 10 * scale, 0, 0, Math.PI * 2);
  ctx.ellipse(x - 18 * scale, y - 4 * scale, 14 * scale, 9 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
}

// Concentric arcs, painted outer-band-first so each color shows as a ring.
const RAINBOW_BANDS = ["#E2532E", "#F0B429", "#F5DD6E", "#5FAE6F", "#4C8FCB", "#8B6FCB"];

function drawRainbow(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
  const bandWidth = 7;
  RAINBOW_BANDS.forEach((color, i) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = bandWidth;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - i * bandWidth, Math.PI, Math.PI * 2);
    ctx.stroke();
  });
}

// Distinct backdrop per level — sun and soft clouds for the easy morning
// level, a lower golden sun for dusk, and a bright rainbow sky for the
// hardest level so the finale feels like a payoff, not a slog.
function drawDecor(ctx: CanvasRenderingContext2D, theme: Theme) {
  if (theme.mode === "day") {
    ctx.fillStyle = "#FFE49A";
    ctx.beginPath();
    ctx.arc(420, 46, 24, 0, Math.PI * 2);
    ctx.fill();
    drawCloud(ctx, 90, 55, 1, "rgba(255,255,255,0.9)");
    drawCloud(ctx, 250, 38, 0.75, "rgba(255,255,255,0.85)");
  } else if (theme.mode === "dusk") {
    ctx.fillStyle = "#FFCE7C";
    ctx.beginPath();
    ctx.arc(400, 190, 38, 0, Math.PI * 2);
    ctx.fill();
    drawCloud(ctx, 100, 55, 1, "rgba(255,236,225,0.55)");
    drawCloud(ctx, 300, 40, 0.85, "rgba(255,220,205,0.5)");
  } else {
    drawRainbow(ctx, 240, 300, 210);
    ctx.fillStyle = "#FFF3B0";
    ctx.beginPath();
    ctx.arc(60, 45, 22, 0, Math.PI * 2);
    ctx.fill();
    drawCloud(ctx, 380, 50, 0.9, "rgba(255,255,255,0.85)");
    drawCloud(ctx, 150, 35, 0.7, "rgba(255,255,255,0.8)");
  }
}

function drawSprite(
  ctx: CanvasRenderingContext2D,
  grid: string[],
  colors: Record<string, string>,
  x: number,
  y: number,
  w: number,
  h: number,
  flip = false
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const cw = w / cols;
  const ch = h / rows;
  for (let ry = 0; ry < rows; ry++) {
    const row = flip ? [...grid[ry]].reverse().join("") : grid[ry];
    for (let rx = 0; rx < cols; rx++) {
      const color = colors[row[rx]];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(x + rx * cw, y + ry * ch, cw + 0.6, ch + 0.6);
    }
  }
}

type Status = "intro" | "playing" | "cleared" | "won";

/**
 * Dumpling Dash — a tiny Mario-style platformer for the Playground window.
 * Move with arrow keys / A-D, jump with space / W / up, collect every
 * dumpling in a level, then reach the flag to clear it. Three levels,
 * each a little tougher: wider gaps, moving obstacles, higher platforms.
 */
export default function DumplingGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const worldRef = useRef<World | null>(null);
  const keysRef = useRef({ left: false, right: false, jumpQueued: false });
  const hintLockRef = useRef(false);
  const levelDoneRef = useRef(false);
  const playerImgRef = useRef<HTMLImageElement | null>(null);
  const dumplingImgRef = useRef<HTMLImageElement | null>(null);

  const [levelIndex, setLevelIndex] = useState(0);
  const [status, setStatus] = useState<Status>("intro");
  const [collected, setCollected] = useState(0);
  const [hint, setHint] = useState<string | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const world = worldRef.current;
    if (!canvas || !world) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const theme = world.theme;
    const sky = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    sky.addColorStop(0, theme.skyTop);
    sky.addColorStop(1, theme.skyBottom);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    drawDecor(ctx, theme);

    for (const plat of world.platforms) {
      ctx.fillStyle = "#8A5A3B";
      ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
      ctx.fillStyle = "#B98A5E";
      ctx.fillRect(plat.x, plat.y, plat.w, 4);
    }

    const allCollected = world.dumplings.every((d) => d.collected);
    const g = world.goal;
    ctx.fillStyle = "#5B4636";
    ctx.fillRect(g.x + g.w / 2 - 2, g.y, 4, g.h);
    ctx.fillStyle = allCollected ? "#2F8F5B" : "#B0433A";
    ctx.beginPath();
    ctx.moveTo(g.x + g.w / 2 + 2, g.y + 2);
    ctx.lineTo(g.x + g.w / 2 + 2 + g.w * 0.75, g.y + g.h * 0.18);
    ctx.lineTo(g.x + g.w / 2 + 2, g.y + g.h * 0.36);
    ctx.closePath();
    ctx.fill();

    const dumplingImg = dumplingImgRef.current;
    for (const d of world.dumplings) {
      if (d.collected) continue;
      if (dumplingImg) {
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(dumplingImg, d.x, d.y, DUMPLING_W, DUMPLING_H);
        ctx.imageSmoothingEnabled = false;
      } else {
        drawSprite(ctx, DUMPLING_GRID, DUMPLING_COLORS, d.x, d.y, DUMPLING_W, DUMPLING_H);
      }
    }

    for (const en of world.enemies) {
      drawSprite(ctx, ENEMY_GRID, ENEMY_COLORS, en.x, en.y, ENEMY_W, ENEMY_H, en.dir < 0);
    }

    const avatar = playerImgRef.current;
    if (avatar) {
      ctx.save();
      ctx.imageSmoothingEnabled = true;
      if (world.player.facing < 0) {
        ctx.translate(world.player.x + PLAYER_W, world.player.y);
        ctx.scale(-1, 1);
        ctx.drawImage(avatar, 0, 0, PLAYER_W, PLAYER_H);
      } else {
        ctx.drawImage(avatar, world.player.x, world.player.y, PLAYER_W, PLAYER_H);
      }
      ctx.restore();
    } else {
      // Fallback while the avatar art loads.
      ctx.fillStyle = "#16233F";
      ctx.fillRect(world.player.x, world.player.y, PLAYER_W, PLAYER_H);
    }
  }, []);

  const startLevel = useCallback(
    (idx: number, playImmediately: boolean) => {
      worldRef.current = buildWorld(idx);
      setLevelIndex(idx);
      setCollected(0);
      setHint(null);
      levelDoneRef.current = false;
      setStatus(playImmediately ? "playing" : "intro");
      requestAnimationFrame(draw);
    },
    [draw]
  );

  // Build the first level on mount.
  useEffect(() => {
    startLevel(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load the real character art for the player sprite once, then redraw.
  useEffect(() => {
    const img = new window.Image();
    img.src = "/avatar.png";
    img.onload = () => {
      playerImgRef.current = img;
      draw();
    };
  }, [draw]);

  // Load the dumpling illustration once, then redraw.
  useEffect(() => {
    const img = new window.Image();
    img.src = "/dumpling.png";
    img.onload = () => {
      dumplingImgRef.current = img;
      draw();
    };
  }, [draw]);

  const respawn = (world: World) => {
    playLose();
    world.player.x = world.start.x;
    world.player.y = world.start.y;
    world.player.vx = 0;
    world.player.vy = 0;
    world.player.onGround = false;
  };

  const step = useCallback(() => {
    const world = worldRef.current;
    if (!world) return;
    const keys = keysRef.current;
    const p = world.player;

    p.vx = keys.left ? -MOVE_SPEED : keys.right ? MOVE_SPEED : 0;
    if (keys.left) p.facing = -1;
    else if (keys.right) p.facing = 1;

    if (keys.jumpQueued && p.onGround) {
      p.vy = JUMP_VELOCITY;
      p.onGround = false;
      playClick();
    }
    keys.jumpQueued = false;

    p.vy = Math.min(p.vy + GRAVITY, MAX_FALL);

    p.x += p.vx;
    p.x = Math.max(0, Math.min(CANVAS_W - PLAYER_W, p.x));
    for (const plat of world.platforms) {
      if (rectsOverlap(p.x, p.y, PLAYER_W, PLAYER_H, plat.x, plat.y, plat.w, plat.h)) {
        if (p.vx > 0) p.x = plat.x - PLAYER_W;
        else if (p.vx < 0) p.x = plat.x + plat.w;
      }
    }

    p.onGround = false;
    p.y += p.vy;
    for (const plat of world.platforms) {
      if (rectsOverlap(p.x, p.y, PLAYER_W, PLAYER_H, plat.x, plat.y, plat.w, plat.h)) {
        if (p.vy > 0) {
          p.y = plat.y - PLAYER_H;
          p.vy = 0;
          p.onGround = true;
        } else if (p.vy < 0) {
          p.y = plat.y + plat.h;
          p.vy = 0;
        }
      }
    }

    if (p.y > CANVAS_H) respawn(world);

    for (const en of world.enemies) {
      en.x += en.speed * en.dir;
      if (en.x <= en.minX) {
        en.x = en.minX;
        en.dir = 1;
      } else if (en.x + ENEMY_W >= en.maxX) {
        en.x = en.maxX - ENEMY_W;
        en.dir = -1;
      }
      if (rectsOverlap(p.x, p.y, PLAYER_W, PLAYER_H, en.x, en.y, ENEMY_W, ENEMY_H)) {
        respawn(world);
      }
    }

    let gotOne = false;
    for (const d of world.dumplings) {
      if (!d.collected && rectsOverlap(p.x, p.y, PLAYER_W, PLAYER_H, d.x, d.y, DUMPLING_W, DUMPLING_H)) {
        d.collected = true;
        gotOne = true;
      }
    }
    if (gotOne) {
      playPickup();
      setCollected(world.dumplings.filter((d) => d.collected).length);
    }

    const allCollected = world.dumplings.every((d) => d.collected);
    if (rectsOverlap(p.x, p.y, PLAYER_W, PLAYER_H, world.goal.x, world.goal.y, world.goal.w, world.goal.h)) {
      if (allCollected) {
        if (!levelDoneRef.current) {
          levelDoneRef.current = true;
          playWin();
          setStatus(levelIndex === LEVELS.length - 1 ? "won" : "cleared");
        }
      } else if (!hintLockRef.current) {
        hintLockRef.current = true;
        setHint("Collect every dumpling first!");
        setTimeout(() => {
          hintLockRef.current = false;
          setHint(null);
        }, 1400);
      }
    }
  }, [levelIndex]);

  // Game loop, only while actively playing.
  useEffect(() => {
    if (status !== "playing") return;
    let raf: number;
    const loop = () => {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [status, step, draw]);

  // Keyboard controls.
  useEffect(() => {
    const move = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "KeyA", "KeyD", "KeyW", "Space"]);
    const down = (e: KeyboardEvent) => {
      if (move.has(e.code)) e.preventDefault();
      if (e.code === "ArrowLeft" || e.code === "KeyA") keysRef.current.left = true;
      else if (e.code === "ArrowRight" || e.code === "KeyD") keysRef.current.right = true;
      else if (e.code === "ArrowUp" || e.code === "KeyW" || e.code === "Space") {
        if (!e.repeat) keysRef.current.jumpQueued = true;
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") keysRef.current.left = false;
      else if (e.code === "ArrowRight" || e.code === "KeyD") keysRef.current.right = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Canvas resolution, scaled for device pixel ratio so pixel art stays crisp.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_W * dpr;
    canvas.height = CANVAS_H * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    draw();
  }, [draw]);

  const level = LEVELS[levelIndex];
  const total = level.dumplings.length;

  const setHeld = (key: "left" | "right", value: boolean) => {
    keysRef.current[key] = value;
  };

  const primaryBtn =
    "rounded-full bg-cream px-5 py-2 font-sans text-sm font-semibold text-navy shadow-md transition-transform hover:-translate-y-0.5";
  const ghostBtn =
    "rounded-full border border-navy/15 bg-white/70 px-3 py-1 font-sans text-xs font-medium text-navy/80 backdrop-blur transition-colors hover:bg-white dark:border-cream/15 dark:bg-midnight-card/70 dark:text-cream/80";
  const padBtn =
    "flex items-center justify-center rounded-full bg-navy text-cream shadow-md transition-transform active:scale-95 dark:bg-cream dark:text-navy";

  return (
    <div className="flex w-[480px] max-w-[88vw] flex-col items-center gap-3 sm:max-w-[480px]">
      <div
        className="relative w-full overflow-hidden rounded-xl shadow-inner"
        style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
      >
        <canvas ref={canvasRef} className="block h-full w-full" />

        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy/70 px-6 text-center backdrop-blur-md">
            {status === "intro" && (
              <>
                <p className="font-serif text-2xl italic text-cream sm:text-3xl">{level.name}</p>
                <p className="font-sans text-xs font-medium uppercase tracking-wide text-cream/80 sm:text-sm">
                  {level.difficulty}
                </p>
                <p className="max-w-[280px] font-sans text-[13px] leading-relaxed text-cream/70">
                  Collect every dumpling 🥟, then reach the flag. Avoid enemies and don&apos;t fall!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setStatus("playing");
                  }}
                  className={primaryBtn}
                >
                  Start
                </button>
              </>
            )}

            {status === "cleared" && (
              <>
                <p className="font-serif text-2xl italic text-cream sm:text-3xl">Level Clear! 🥟</p>
                <p className="max-w-[260px] font-sans text-[13px] leading-relaxed text-cream/70">
                  On to {LEVELS[levelIndex + 1].name}: {LEVELS[levelIndex + 1].difficulty}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    startLevel(levelIndex + 1, false);
                  }}
                  className={primaryBtn}
                >
                  Continue
                </button>
              </>
            )}

            {status === "won" && (
              <>
                <p className="font-serif text-2xl italic text-cream sm:text-3xl">All Dumplings Collected! 🥟🎉</p>
                <p className="max-w-[260px] font-sans text-[13px] leading-relaxed text-cream/70">
                  You cleared all 3 levels. Nicely played.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    startLevel(0, false);
                  }}
                  className={primaryBtn}
                >
                  Play Again
                </button>
              </>
            )}
          </div>
        )}

        {status === "playing" && hint && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center">
            <span className="rounded-full bg-navy/80 px-3 py-1 font-sans text-xs text-cream backdrop-blur">
              {hint}
            </span>
          </div>
        )}
      </div>

      <div className="flex w-full items-center justify-between font-sans text-xs text-navy/70 dark:text-cream/70">
        <span>
          {level.name} <span className="text-navy/40 dark:text-cream/40">·</span> {level.difficulty}
        </span>
        <span className="font-semibold text-navy dark:text-cream">
          🥟 {collected}/{total}
        </span>
        {status === "playing" && (
          <button
            type="button"
            onClick={() => {
              playClick();
              startLevel(levelIndex, true);
            }}
            className={ghostBtn}
          >
            Restart
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 sm:hidden">
        <button
          type="button"
          onPointerDown={() => setHeld("left", true)}
          onPointerUp={() => setHeld("left", false)}
          onPointerLeave={() => setHeld("left", false)}
          className={`${padBtn} h-11 w-11 text-base`}
        >
          ◀
        </button>
        <button
          type="button"
          onPointerDown={() => setHeld("right", true)}
          onPointerUp={() => setHeld("right", false)}
          onPointerLeave={() => setHeld("right", false)}
          className={`${padBtn} h-11 w-11 text-base`}
        >
          ▶
        </button>
        <button
          type="button"
          onPointerDown={() => {
            keysRef.current.jumpQueued = true;
          }}
          className={`${padBtn} h-11 w-20 font-sans text-sm font-semibold`}
        >
          Jump
        </button>
      </div>

      <p className="hidden font-sans text-xs text-navy/50 dark:text-cream/50 sm:block">
        Arrow keys / A-D to move, Space / Up to jump
      </p>
    </div>
  );
}
