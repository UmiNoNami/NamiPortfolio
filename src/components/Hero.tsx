"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import WorksWidget from "./WorksWidget";
import DrawCanvas, { type DrawCanvasHandle, type DrawTool } from "./DrawCanvas";
import Tooltip from "./Tooltip";
import ColorRevealLens from "./ColorRevealLens";
import { playClick } from "@/lib/sound";
import { EASE_SMOOTH, SPRING_SNAPPY } from "@/lib/motion";
import { enterCursorBadgeTarget, leaveCursorBadgeTarget } from "@/lib/cursorBadge";
import {
  BrushIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CursorIcon,
  FigmaMarkIcon,
  GitHubIcon,
  LinkedInIcon,
  PenIcon,
  ShapeIcon,
  UndoIcon,
} from "./ModernIcons";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE_SMOOTH },
});

const swatches = [
  { hex: "#E2532E", name: "Orange" },
  { hex: "#16233F", name: "Navy" },
  { hex: "#F0B429", name: "Yellow" },
  { hex: "#111111", name: "Black" },
  { hex: "#9FC6E0", name: "Sky" },
];

const tools: { id: DrawTool; icon: typeof PenIcon; label: string }[] = [
  { id: "cursor", icon: CursorIcon, label: "Cursor" },
  { id: "pencil", icon: PenIcon, label: "Pencil" },
  { id: "brush", icon: BrushIcon, label: "Brush" },
  { id: "shape", icon: ShapeIcon, label: "Shape" },
];

const socials = [
  {
    label: "LinkedIn",
    icon: LinkedInIcon,
    bg: "bg-[#0A66C2]",
    fg: "text-white",
    href: "https://www.linkedin.com/in/naransuvd-enkhjargal-8084271a9/",
  },
  {
    label: "Figma",
    icon: FigmaMarkIcon,
    bg: "bg-white",
    fg: "text-navy",
    href: "https://www.figma.com/files/team/1304010695859886085/user/1181584970159162332?fuid=1181584970159162332",
  },
  { label: "GitHub", icon: GitHubIcon, bg: "bg-black", fg: "text-white", href: "https://github.com/UmiNoNami" },
];

export default function Hero() {
  const [tool, setTool] = useState<DrawTool>("cursor");
  const [color, setColor] = useState(swatches[1].hex);
  const canvasRef = useRef<DrawCanvasHandle>(null);
  const [designHover, setDesignHover] = useState(false);
  const [codeHover, setCodeHover] = useState(false);
  const [uiCardHover, setUiCardHover] = useState(false);

  // Subtle mouse-tracked parallax on the illustration.
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 60, damping: 16 });
  const springY = useSpring(mvY, { stiffness: 60, damping: 16 });
  const illustrationX = useTransform(springX, [-1, 1], [14, 26]);
  const illustrationRotate = useTransform(springY, [-1, 1], [1.5, -1.5]);

  const handleArtMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mvX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mvY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };
  const handleArtMouseLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <section id="top" className="relative">
      <div className="grid grid-cols-1 gap-12 py-3 lg:grid-cols-[200px_1fr_260px] lg:gap-8 lg:py-4">
        {/* ---------------- LEFT ---------------- */}
        <motion.div {...fadeUp(0)} className="flex flex-col gap-4">
          <div className="relative z-50 hidden flex-col items-center gap-3 lg:flex">
            <motion.button
              type="button"
              aria-label="Scroll up"
              onClick={() => playClick()}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.85 }}
              transition={SPRING_SNAPPY}
              className="text-navy/35 transition-colors hover:text-navy dark:text-cream/35 dark:hover:text-cream"
            >
              <ChevronUpIcon className="h-4 w-4" />
            </motion.button>

            <div className="flex flex-col items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-2.5 py-3 shadow-sm dark:border-cream/10 dark:bg-white/5">
              {tools.map((t) => (
                <Tooltip key={t.id} label={t.label}>
                  <motion.button
                    type="button"
                    aria-label={t.label}
                    onClick={() => {
                      playClick();
                      setTool(t.id);
                    }}
                    whileTap={{ scale: 0.88 }}
                    transition={SPRING_SNAPPY}
                    className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      tool === t.id
                        ? "text-cream dark:text-navy"
                        : "text-navy/45 hover:text-navy dark:text-cream/45 dark:hover:text-cream"
                    }`}
                  >
                    {tool === t.id && (
                      <motion.span
                        layoutId="activeToolPill"
                        transition={SPRING_SNAPPY}
                        className="absolute inset-0 rounded-full bg-navy dark:bg-cream"
                      />
                    )}
                    <t.icon className="relative z-10 h-3.5 w-3.5" />
                  </motion.button>
                </Tooltip>
              ))}

              <span className="my-0.5 h-px w-4 bg-navy/10 dark:bg-cream/10" />

              {swatches.map((c) => (
                <Tooltip key={c.hex} label={c.name}>
                  <motion.button
                    type="button"
                    aria-label={`Color ${c.name}`}
                    onClick={() => {
                      playClick();
                      setColor(c.hex);
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={SPRING_SNAPPY}
                    className={`h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-black/5 ${
                      color === c.hex ? "scale-125 ring-2 ring-navy dark:ring-cream" : ""
                    }`}
                    style={{ background: c.hex }}
                  />
                </Tooltip>
              ))}

              <span className="my-0.5 h-px w-4 bg-navy/10 dark:bg-cream/10" />

              <Tooltip label="Undo">
                <motion.button
                  type="button"
                  aria-label="Undo last stroke"
                  onClick={() => {
                    playClick();
                    canvasRef.current?.undo();
                  }}
                  whileHover={{ rotate: -18 }}
                  whileTap={{ scale: 0.88 }}
                  transition={SPRING_SNAPPY}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-navy/45 transition-colors hover:text-navy dark:text-cream/45 dark:hover:text-cream"
                >
                  <UndoIcon className="h-3.5 w-3.5" />
                </motion.button>
              </Tooltip>
            </div>

            <motion.button
              type="button"
              aria-label="Scroll down"
              onClick={() => playClick()}
              whileHover={{ y: 2 }}
              whileTap={{ scale: 0.85 }}
              transition={SPRING_SNAPPY}
              className="text-navy/35 transition-colors hover:text-navy dark:text-cream/35 dark:hover:text-cream"
            >
              <ChevronDownIcon className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* ---------------- CENTER ---------------- */}
        <motion.div {...fadeUp(0.15)} className="flex flex-col items-center">
          <div
            className="relative w-full max-w-[560px]"
            onMouseMove={handleArtMouseMove}
            onMouseLeave={handleArtMouseLeave}
          >
            <ColorRevealLens
              className="h-[300px] overflow-hidden rounded-[32px] bg-brand-orange sm:h-[320px]"
              onMouseEnter={enterCursorBadgeTarget}
              onMouseLeave={leaveCursorBadgeTarget}
            >
              <div className="absolute left-4 top-16 max-w-[150px]">
                <h3 className="font-sans text-sm font-semibold text-navy dark:text-cream">UI/UX Design</h3>
                <p className="mt-1 font-sans text-xs leading-relaxed text-navy/70 dark:text-cream/70">
                  Thoughtful interfaces shaped around real people.
                </p>
              </div>

              <div className="absolute right-4 top-4 flex flex-col items-end gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playClick()}
                    className="group flex items-center justify-end gap-2"
                  >
                    <span className="whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 font-sans text-xs font-medium text-navy shadow-sm transition-transform duration-200 group-hover:-translate-x-0.5">
                      {s.label}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-md transition-transform duration-200 group-hover:scale-110 ${s.bg} ${s.fg}`}
                    >
                      <s.icon className="h-4 w-4" />
                    </span>
                  </a>
                ))}
                <div className="mt-6 max-w-[150px] text-right">
                  <h3 className="font-sans text-sm font-semibold text-navy dark:text-cream">Front-End</h3>
                  <p className="mt-1 font-sans text-xs leading-relaxed text-navy/70 dark:text-cream/70">
                    Playful ideas built into responsive experiences.
                  </p>
                </div>
              </div>

              <div
                className="absolute bottom-4 left-4 h-24 w-32 overflow-hidden rounded-2xl bg-white shadow-md sm:h-28 sm:w-36"
                onMouseEnter={() => setUiCardHover(true)}
                onMouseLeave={() => setUiCardHover(false)}
              >
                <AnimatePresence initial={false}>
                  {uiCardHover ? (
                    <motion.div
                      key="designed"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                      className="absolute inset-0 flex flex-col gap-1.5 p-3"
                    >
                      {/* Fake nav bar — a little logo dot, a couple of
                          colorful "menu" pills, and a dark CTA. No real
                          text or branding, just color and shape. */}
                      <motion.div
                        variants={{ hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0, transition: SPRING_SNAPPY } }}
                        className="flex items-center gap-1"
                      >
                        <span className="h-2 w-2 rounded-full bg-brand-orange" />
                        <span className="h-1.5 w-4 rounded-full bg-brand-sky" />
                        <span className="h-1.5 w-3 rounded-full bg-brand-yellow" />
                        <span className="ml-auto h-2 w-6 rounded-full bg-navy" />
                      </motion.div>

                      {/* Animated gradient "hero" block with a little
                          floating dot for a bit of life. */}
                      <motion.div
                        variants={{ hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0, transition: SPRING_SNAPPY } }}
                        className="relative h-9 w-full overflow-hidden rounded-md"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-sky"
                          style={{ backgroundSize: "200% 200%" }}
                          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.span
                          className="absolute left-2 top-2 h-2.5 w-2.5 rounded-full bg-white/80"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </motion.div>

                      {/* Colorful "body copy" bars instead of real text. */}
                      <motion.span
                        variants={{ hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0, transition: SPRING_SNAPPY } }}
                        className="block h-1 w-full rounded-full bg-brand-sky/50"
                      />
                      <motion.span
                        variants={{ hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0, transition: SPRING_SNAPPY } }}
                        className="block h-1 w-4/5 rounded-full bg-brand-orange/40"
                      />

                      {/* Fake CTA pill. */}
                      <motion.span
                        variants={{ hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0, transition: SPRING_SNAPPY } }}
                        className="mt-0.5 h-3 w-10 rounded-full bg-navy"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="wireframe"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 flex flex-col gap-1.5 p-3"
                    >
                      {/* Same nav layout as the colored version — logo dot,
                          two menu pills, a CTA on the right — just gray. */}
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-navy/15" />
                        <span className="h-1.5 w-4 rounded-full bg-navy/15" />
                        <span className="h-1.5 w-3 rounded-full bg-navy/15" />
                        <span className="ml-auto h-2 w-6 rounded-full bg-navy/15" />
                      </div>
                      {/* Same hero-block footprint, empty/dashed instead of filled. */}
                      <span className="h-9 w-full rounded-md border border-dashed border-navy/20" />
                      {/* Same two body-copy widths as the colored version. */}
                      <span className="block h-1 w-full rounded-full bg-navy/10" />
                      <span className="block h-1 w-4/5 rounded-full bg-navy/10" />
                      {/* Same CTA pill footprint, outlined instead of filled. */}
                      <span className="mt-0.5 h-3 w-10 rounded-full border border-navy/15" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ColorRevealLens>

            {/* Illustration overflows past the card's bottom edge on purpose —
                kept full size while the card itself got shorter. Idle float +
                a subtle mouse-tracked tilt for a bit of life. */}
            <motion.div
              className="pointer-events-none absolute inset-x-20 top-2 z-10 h-[400px] sm:inset-x-24 sm:h-[440px]"
              style={{ x: illustrationX, rotate: illustrationRotate }}
              animate={{ y: [0, -8, 0] }}
              transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
              <Image
                src="/avatar-nami.png"
                alt="Illustration of Nami"
                fill
                sizes="(min-width: 1024px) 380px, 65vw"
                className="object-contain object-bottom"
                priority
              />
            </motion.div>

            {/* Flanking the character's legs — hovering "Design" turns it
                into a shimmering rainbow gradient (playful, colorful);
                hovering "Code" tightens and darkens it instead (stark,
                serious) — a deliberate contrast between the two words. */}
            <span
              className={`absolute left-14 top-[315px] z-20 font-serif text-4xl italic transition-all duration-300 sm:left-20 sm:top-[345px] sm:text-5xl ${
                designHover
                  ? "scale-110 animate-text-shimmer bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(240,180,41,0.55)]"
                  : "text-navy dark:text-cream"
              }`}
              style={
                designHover
                  ? {
                      backgroundImage:
                        "linear-gradient(90deg, #E2532E, #F0B429, #9FC6E0, #E2532E, #F0B429)",
                      backgroundSize: "200% auto",
                      WebkitTextFillColor: "transparent",
                    }
                  : undefined
              }
              onMouseEnter={() => setDesignHover(true)}
              onMouseLeave={() => setDesignHover(false)}
            >
              Design
            </span>
            <span
              className={`absolute right-14 top-[315px] z-20 font-sans text-4xl transition-all duration-300 sm:right-20 sm:top-[345px] sm:text-5xl ${
                codeHover
                  ? "scale-95 font-black tracking-tighter text-ink dark:text-white"
                  : "font-extrabold text-navy dark:text-cream"
              }`}
              onMouseEnter={() => setCodeHover(true)}
              onMouseLeave={() => setCodeHover(false)}
            >
              Code
            </span>
          </div>
        </motion.div>

        {/* ---------------- RIGHT ---------------- */}
        <motion.div {...fadeUp(0.3)} className="flex flex-col gap-4">
          <div id="work">
            <WorksWidget className="lg:ml-auto" />
          </div>
        </motion.div>
      </div>

      {/* Full-screen draw layer — sketch anywhere with the tools on the left,
          switch back to the cursor tool to interact with the page normally. */}
      <DrawCanvas ref={canvasRef} tool={tool} color={color} className="fixed inset-0 z-40" />
    </section>
  );
}
