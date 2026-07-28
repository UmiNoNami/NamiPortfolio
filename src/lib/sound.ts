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
