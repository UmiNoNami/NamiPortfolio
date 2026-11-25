"use client";

// Tiny synthesized UI sounds using the Web Audio API — no audio files to
// load. A single AudioContext is created lazily on first use (must happen
// inside a user-gesture handler like onClick to satisfy browser autoplay
// policies) and reused for every subsequent sound.
let ctx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ctx) ctx = new AudioCtx();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function playClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Slight random pitch variance so repeated clicks feel organic, not robotic.
    const base = 500 + Math.random() * 40;

    // Main tone: soft sine "tock" — starts a little higher, settles down.
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(base * 1.7, now);
    osc.frequency.exponentialRampToValueAtTime(base, now + 0.05);

    // A faint octave-up shimmer layered underneath for warmth.
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(base * 2, now);

    // Low-pass filter softens everything so it stays gentle, not buzzy.
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2200, now);
    filter.Q.setValueAtTime(0.6, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.008); // soft attack
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.17); // smooth fade

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.exponentialRampToValueAtTime(0.012, now + 0.008);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
    osc2.start(now);
    osc2.stop(now + 0.11);
  } catch {
    // Sound is a nice-to-have; never let it break a click.
  }
}

// A cheerful upward "whoo-hoo!" swoop with a bright sparkle on top — for
// picking up something fun, like a dumpling.
export function playPickup() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const pitch = 0.95 + Math.random() * 0.1; // slight variance so repeats don't sound identical

    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(360 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(720 * pitch, now + 0.11);
    osc.frequency.exponentialRampToValueAtTime(920 * pitch, now + 0.19);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    // A brighter shimmer layered on top for sparkle.
    const shimmer = ctx.createOscillator();
    shimmer.type = "sine";
    shimmer.frequency.setValueAtTime(720 * pitch, now);
    shimmer.frequency.exponentialRampToValueAtTime(1440 * pitch, now + 0.19);
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.setValueAtTime(0.0001, now);
    shimmerGain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.24);
    shimmer.start(now);
    shimmer.stop(now + 0.22);
  } catch {
    // Sound is a nice-to-have; never let it break the game.
  }
}

// A little magical fanfare — an ascending arpeggio topped with a sparkle —
// for clearing a level or reaching the goal.
export function playWin() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    const step = 0.09;

    notes.forEach((freq, i) => {
      const start = now + i * step;
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.22, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.34);
    });

    // Sparkle shimmer trailing the last note.
    const shimmerStart = now + notes.length * step - 0.02;
    for (let i = 0; i < 3; i++) {
      const s = shimmerStart + i * 0.06;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1800 + i * 300, s);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, s);
      gain.gain.exponentialRampToValueAtTime(0.1, s + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, s + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(s);
      osc.stop(s + 0.2);
    }
  } catch {
    // Sound is a nice-to-have; never let it break the game.
  }
}

// A short, soft downward dip — not harsh, since it plays often — for when
// the player is hit by an enemy or falls and respawns.
export function playLose() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.32);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.32);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  } catch {
    // Sound is a nice-to-have; never let it break the game.
  }
}

// --- Mechanical key sounds (homepage 3D keys) ------------------------------
// A short burst of filtered noise for the "clack" of the keycap plus a low
// sine thump for the switch bottoming out. Press and release are separate so
// the keys sound like a real mechanical keyboard: thock down, lighter tick up.
let noiseBuffer: AudioBuffer | null = null;
function getNoise(ctx: AudioContext) {
  if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) return noiseBuffer;
  const length = Math.floor(ctx.sampleRate * 0.08);
  noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  return noiseBuffer;
}

function noiseClick(ctx: AudioContext, at: number, freq: number, q: number, level: number, decay: number) {
  const src = ctx.createBufferSource();
  src.buffer = getNoise(ctx);
  src.playbackRate.value = 0.9 + Math.random() * 0.2;
  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.setValueAtTime(freq, at);
  band.Q.setValueAtTime(q, at);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(level, at + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + decay);
  src.connect(band);
  band.connect(gain);
  gain.connect(ctx.destination);
  src.start(at);
  src.stop(at + decay + 0.01);
}

/** Key pressed down: a solid "thock". */
export function playKeyDown() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const pitch = 0.94 + Math.random() * 0.12;

    noiseClick(ctx, now, 2300 * pitch, 1.1, 0.32, 0.035);

    const thump = ctx.createOscillator();
    thump.type = "sine";
    thump.frequency.setValueAtTime(170 * pitch, now);
    thump.frequency.exponentialRampToValueAtTime(70, now + 0.07);
    const tg = ctx.createGain();
    tg.gain.setValueAtTime(0.0001, now);
    tg.gain.exponentialRampToValueAtTime(0.22, now + 0.004);
    tg.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
    thump.connect(tg);
    tg.connect(ctx.destination);
    thump.start(now);
    thump.stop(now + 0.1);
  } catch {
    // Sound is a nice-to-have; never let it break a click.
  }
}

/** Key released: a lighter, higher "tick". */
export function playKeyUp() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    noiseClick(ctx, now, 3800 * (0.95 + Math.random() * 0.1), 1.4, 0.13, 0.022);
  } catch {
    // Sound is a nice-to-have; never let it break a click.
  }
}
