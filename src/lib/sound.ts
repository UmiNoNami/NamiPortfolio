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

// --- Key / mouse click sounds (homepage 3D keys) --------------------------
// Modelled on a real switch rather than a musical tone: each click is a very
// short broadband transient (≈1 ms of noise) exciting a few fast-decaying
// plastic resonances, followed a few ms later by a smaller second contact
// "bounce" — the double-tick you hear in a mouse microswitch. Press adds a
// little low body (the keycap bottoming out); release is lighter and higher.
// Samples are computed once into AudioBuffers (a few random variants each, so
// repeated presses don't sound identical) and then just played back.
type ClickSpec = {
  bounces: [number, number][]; // [time s, amplitude]
  resonances: [number, number, number][]; // [Hz, decay s, amplitude]
  noiseDecay: number;
  noise: number; // level of the click transient
  bright: number; // 0 = muffled, 1 = crisp/glassy
  body: number; // amplitude of the low "thock"
  length: number;
};

// Tuned to a deep mechanical-keyboard "thock": most of the energy sits below
// 1.5 kHz (the keycap and case), with only a muffled click on top — not the
// bright, glassy tick of a mouse.
const PRESS: ClickSpec = {
  bounces: [[0, 1], [0.006, 0.3]],
  resonances: [[380, 0.022, 0.55], [820, 0.012, 0.35], [1500, 0.006, 0.18]],
  noiseDecay: 0.003,
  noise: 0.7,
  bright: 0.3,
  body: 0.7,
  length: 0.1,
};
const RELEASE: ClickSpec = {
  bounces: [[0, 1]],
  resonances: [[520, 0.014, 0.45], [1100, 0.008, 0.3], [2000, 0.004, 0.12]],
  noiseDecay: 0.002,
  noise: 0.7,
  bright: 0.3,
  body: 0.3,
  length: 0.07,
};

function renderClick(ctx: AudioContext, spec: ClickSpec): AudioBuffer {
  const sr = ctx.sampleRate;
  const n = Math.floor(sr * spec.length);
  const buf = ctx.createBuffer(1, n, sr);
  const out = buf.getChannelData(0);
  const detune = 0.94 + Math.random() * 0.12;
  let hpPrevIn = 0, hpPrevOut = 0, lp = 0, mid = 0;
  const hpA = 0.93; // gentle high-pass on the noise so it stays crisp
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const white = Math.random() * 2 - 1;
    const hp = hpA * (hpPrevOut + white - hpPrevIn);
    hpPrevIn = white; hpPrevOut = hp;
    lp += 0.06 * (white - lp); // low-passed noise for the body
    mid += 0.15 * (white - mid); // darker noise for a muffled click
    const clickNoise = spec.noise * (spec.bright * hp + (1 - spec.bright) * mid * 2.2);
    let v = 0;
    for (const [t0, a] of spec.bounces) {
      if (t < t0) continue;
      const dt = t - t0;
      let ring = 0;
      for (const [f, d, ra] of spec.resonances) ring += ra * Math.sin(2 * Math.PI * f * detune * dt) * Math.exp(-dt / d);
      v += a * (clickNoise * Math.exp(-dt / spec.noiseDecay) + ring);
    }
    v += spec.body * lp * 5 * Math.exp(-t / 0.022);
    out[i] = v;
  }
  // Tiny fade-in/out to avoid DC clicks, then normalise.
  let peak = 0;
  for (let i = 0; i < n; i++) {
    const edge = Math.min(1, i / 8, (n - 1 - i) / 64);
    out[i] *= edge;
    peak = Math.max(peak, Math.abs(out[i]));
  }
  if (peak > 0) for (let i = 0; i < n; i++) out[i] = (out[i] / peak) * 0.9;
  return buf;
}

const clickBank = new Map<ClickSpec, AudioBuffer[]>();
function bankFor(ctx: AudioContext, spec: ClickSpec) {
  let bank = clickBank.get(spec);
  if (!bank || bank[0].sampleRate !== ctx.sampleRate) {
    bank = [0, 1, 2, 3].map(() => renderClick(ctx, spec));
    clickBank.set(spec, bank);
  }
  return bank;
}

/** Create the audio context and render the click sounds ahead of time (e.g.
 * when the pointer first moves over the keys). Opening the audio device can
 * block the page for a few hundred ms on some systems — doing it on the first
 * press made that press stutter. The context starts suspended and is resumed
 * by the first real press. */
export function warmUpKeySounds() {
  try {
    if (typeof window === "undefined") return;
    if (!ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      ctx = new AudioCtx();
    }
    bankFor(ctx, PRESS);
    bankFor(ctx, RELEASE);
  } catch {
    // Optional optimisation only.
  }
}

function playSpec(spec: ClickSpec, level: number) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const bank = bankFor(ctx, spec);
    const src = ctx.createBufferSource();
    src.buffer = bank[Math.floor(Math.random() * bank.length)];
    src.playbackRate.value = 0.97 + Math.random() * 0.06;
    const gain = ctx.createGain();
    gain.gain.value = level;
    src.connect(gain);
    gain.connect(ctx.destination);
    src.start();
  } catch {
    // Sound is a nice-to-have; never let it break a click.
  }
}

/** Key pressed down: crisp click with a little thock. */
export function playKeyDown() {
  playSpec(PRESS, 0.9);
}

/** Key released: lighter, higher tick. */
export function playKeyUp() {
  playSpec(RELEASE, 0.5);
}
