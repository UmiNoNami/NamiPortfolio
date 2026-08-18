"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { g4mColors } from "./tokens";
import { SPRING_SOFT } from "@/lib/motion";

// ---------------------------------------------------------------------------
// A. Two full-length pages, looping in a fixed-height "browser window" so a
// very tall export (a whole homepage or category scroll) reads as a living
// screen rather than a giant static image.
// ---------------------------------------------------------------------------

const LONG_PAGES = [
  {
    src: "/gear/home.png",
    label: "Homepage",
    note: "Hero, featured-brand strip, New Arrivals, On Sale, trust banner, and footer — the full scroll, looping.",
  },
  {
    src: "/gear/Products.png",
    label: "Category — Electric Guitars",
    note: "24 products with Sale, Best Seller, and New badges — pricing shown the same way on every single card.",
  },
];

function ScrollingPage({
  src,
  label,
  note,
  duration,
}: {
  src: string;
  label: string;
  note: string;
  duration: number;
}) {
  const uid = label.replace(/[^a-z0-9]/gi, "").toLowerCase();
  return (
    <div>
      <div
        className="relative h-[420px] w-full overflow-hidden rounded-2xl border"
        style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.charcoalSurface }}
      >
        {/* Defined inline so the loop is guaranteed to ship with this
            component regardless of Tailwind config state. */}
        <style>{`
          @keyframes g4m-scroll-${uid} { from { transform: translateY(0); } to { transform: translateY(-50%); } }
          .g4m-scroll-${uid} { animation: g4m-scroll-${uid} ${duration}s linear infinite; }
        `}</style>

        <div
          className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 px-4 py-3"
          style={{ backgroundColor: g4mColors.obsidian }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: g4mColors.subdued + "40" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: g4mColors.subdued + "40" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: g4mColors.subdued + "40" }} />
        </div>

        {/* The image rendered twice back to back — translateY(-50%) then
            lands exactly on the second copy's start, so the loop is seamless. */}
        <div className={`absolute inset-x-0 top-[38px] flex flex-col g4m-scroll-${uid}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={label} className="w-full" loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" aria-hidden className="w-full" loading="lazy" />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
          style={{ background: `linear-gradient(to top, ${g4mColors.charcoalSurface}, transparent)` }}
        />
      </div>
      <p className="mt-2 font-dm-mono text-xs uppercase tracking-wider text-white">{label}</p>
      <p className="mt-1 font-figtree text-[13px] leading-snug" style={{ color: g4mColors.subdued }}>
        {note}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// B. The checkout flow, running as a horizontal filmstrip — already
// desktop-sized exports, so they play at native size, just drifting sideways
// on a loop instead of sitting in a static grid.
// ---------------------------------------------------------------------------

const CHECKOUT_STEPS = [
  { src: "/gear/Cart.png", label: "Basket", note: "Subtotal, delivery, and total — visible immediately" },
  { src: "/gear/Checkout- contact.png", label: "Contact", note: "Step 1 of 4" },
  { src: "/gear/checkout address.png", label: "Address", note: "Step 2 of 4" },
  { src: "/gear/checkout-delivery.png", label: "Delivery", note: "Step 3 of 4 — every option's cost shown upfront" },
  { src: "/gear/checkout payment.png", label: "Payment", note: "Step 4 of 4 — total restated before paying" },
  { src: "/gear/order placed.png", label: "Confirmation", note: "Processing → Dispatching → Delivered" },
];

function CheckoutFilmstrip() {
  const looped = [...CHECKOUT_STEPS, ...CHECKOUT_STEPS];
  return (
    <div
      className="relative mt-6 overflow-hidden rounded-2xl border py-6"
      style={{ borderColor: g4mColors.hairline, backgroundColor: g4mColors.charcoalSurface }}
    >
      <style>{`
        @keyframes g4m-checkout-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .g4m-checkout-scroll { animation: g4m-checkout-scroll 40s linear infinite; }
      `}</style>
      <div className="flex w-max g4m-checkout-scroll">
        {looped.map((step, i) => (
          <div key={i} className="flex shrink-0 flex-col items-center gap-2 px-3">
            <div className="h-[260px] overflow-hidden rounded-lg border" style={{ borderColor: g4mColors.hairline }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={step.src} alt={step.label} className="h-[260px] w-auto" loading="lazy" />
            </div>
            <p className="font-dm-mono text-[11px] uppercase tracking-wider text-white">
              {String((i % CHECKOUT_STEPS.length) + 1).padStart(2, "0")} — {step.label}
            </p>
            <p className="max-w-[160px] text-center font-figtree text-[11px] leading-snug" style={{ color: g4mColors.subdued }}>
              {step.note}
            </p>
          </div>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16"
        style={{ background: `linear-gradient(to right, ${g4mColors.charcoalSurface}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16"
        style={{ background: `linear-gradient(to left, ${g4mColors.charcoalSurface}, transparent)` }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// C. The four laptop mockups, as an auto-advancing carousel paired with text
// that walks through the shopping journey they represent.
// ---------------------------------------------------------------------------

const MOCKUP_SLIDES = [
  {
    src: "/gear/mockup1.png",
    title: "Browse",
    text: "The “Own the Night” campaign hero leads with a full-bleed pro-audio shot, one clear CTA, and a scrolling brand strip underneath.",
  },
  {
    src: "/gear/mockup3.png",
    title: "Compare",
    text: "Electric Guitars — 39 products. Sale, Best Seller, and New badges sit right on the card, so comparison shopping takes zero extra clicks.",
  },
  {
    src: "/gear/mockup2.png",
    title: "Decide",
    text: "Price, star rating, and delivery / returns / warranty badges sit above the fold, next to one unmissable Add to Basket button.",
  },
  {
    src: "/gear/mockup4.png",
    title: "Basket",
    text: "Subtotal, free delivery, and total are laid out before checkout even starts — plus a cross-sell rail to complete the setup.",
  },
];

function MockupCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % MOCKUP_SLIDES.length), 4200);
    return () => clearInterval(t);
  }, []);

  const slide = MOCKUP_SLIDES[index];

  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
        style={{ backgroundColor: g4mColors.obsidian }}
      >
        <AnimatePresence mode="wait">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.title}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={SPRING_SOFT}
            className="absolute inset-0 h-full w-full object-contain p-4"
          />
        </AnimatePresence>
      </div>

      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-dm-mono text-xs uppercase tracking-wider" style={{ color: g4mColors.burntSienna }}>
              {String(index + 1).padStart(2, "0")} / {String(MOCKUP_SLIDES.length).padStart(2, "0")}
            </p>
            <h4 className="mt-2 font-big-shoulders text-2xl font-bold uppercase text-white">{slide.title}</h4>
            <p className="mt-2 font-figtree text-sm leading-relaxed" style={{ color: g4mColors.subdued }}>
              {slide.text}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex gap-2">
          {MOCKUP_SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 28 : 8,
                backgroundColor: i === index ? g4mColors.burntSienna : g4mColors.hairline,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

export default function RealScreens({ index = "08" }: { index?: string }) {
  return (
    <div>
      <SectionHeading index={index} title="Final Solution" />
      <p className="mt-3 max-w-lg font-figtree text-sm" style={{ color: g4mColors.subdued }}>
        Real, exported screens from the finished build, running end to end rather than sitting still.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {LONG_PAGES.map((p, i) => (
          <RevealOnScroll key={p.src} delay={0.05 * i} y={16}>
            <ScrollingPage src={p.src} label={p.label} note={p.note} duration={26 + i * 6} />
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={0.1} y={16} className="mt-10">
        <h3 className="font-big-shoulders text-2xl font-bold uppercase text-white sm:text-3xl">
          Checkout, Made Honest
        </h3>
        <p className="mt-3 max-w-2xl font-figtree text-sm leading-relaxed" style={{ color: g4mColors.subdued }}>
          The old checkout kept the true cost a secret until the very last screen — shipping and fees showed up as
          a surprise right before payment. The rebuild keeps a running order summary — subtotal, delivery, total —
          visible on every single step, next to a clear 4-step progress bar. Nothing hidden, nothing sprung on you at
          the till.
        </p>
        <CheckoutFilmstrip />
      </RevealOnScroll>

      <RevealOnScroll delay={0.15} y={16} className="mt-10">
        <h3 className="font-big-shoulders text-2xl font-bold uppercase text-white sm:text-3xl">
          The Shopping Journey
        </h3>
        <p className="mt-3 max-w-2xl font-figtree text-sm leading-relaxed" style={{ color: g4mColors.subdued }}>
          From browsing to basket, every screen carries the same pricing, badges, and CTA pattern — so trust builds
          quietly the whole way through, not just at checkout.
        </p>
        <div className="mt-6">
          <MockupCarousel />
        </div>
      </RevealOnScroll>
    </div>
  );
}
