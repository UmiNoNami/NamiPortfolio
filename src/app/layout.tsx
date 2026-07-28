import type { Metadata } from "next";
import Script from "next/script";
import {
  Inter,
  Playfair_Display,
  Pixelify_Sans,
  Space_Mono,
  Plus_Jakarta_Sans,
  DM_Sans,
  Big_Shoulders_Display,
  Figtree,
  DM_Mono,
} from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import CursorBadge from "@/components/CursorBadge";
import Preloader from "@/components/Preloader";
import AboutModal from "@/components/AboutModal";
import ResumeModal from "@/components/ResumeModal";
import PlaygroundModal from "@/components/PlaygroundModal";
import ContactChat from "@/components/ContactChat";
import { ThemeProvider } from "@/lib/theme";
import { AboutModalProvider } from "@/lib/aboutModal";
import { ResumeModalProvider } from "@/lib/resumeModal";
import { WindowManagerProvider } from "@/lib/windowManager";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["italic", "normal"],
  variable: "--font-serif",
});

// Kept loaded (unused on the current homepage) so the still-linked retro
// desktop components elsewhere in the codebase don't break if reintroduced.
const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixel",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

// Used only inside the Pluto case study's design-system spec (that
// project's own type pairing), not the rest of the site.
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-jakarta",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm",
});

// Used only inside the Gear4music case study's design-system spec (that
// project's own type pairing), not the rest of the site.
const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-big-shoulders",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "Nami — UI/UX Designer & Frontend Developer",
  description:
    "Nami (Naransuvd Enkhjargal) is a UI/UX designer who also builds things in code — Figma, React Native, and Next.js.",
};

// Runs before hydration so the correct theme class is on <html> before the
// first paint — otherwise there's a flash of the wrong theme on load.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("nami-theme");
    var dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${pixelify.variable} ${spaceMono.variable} ${plusJakarta.variable} ${dmSans.variable} ${bigShoulders.variable} ${figtree.variable} ${dmMono.variable} bg-canvas font-sans text-navy antialiased transition-colors duration-300 dark:bg-midnight dark:text-cream`}
      >
        <ThemeProvider>
          <AboutModalProvider>
            <ResumeModalProvider>
              <WindowManagerProvider>
                <ScrollProgress />
                <CursorBadge />
                <Preloader />
                <div id="top" />
                {children}
                <AboutModal />
                <ResumeModal />
                <PlaygroundModal />
                <ContactChat />
              </WindowManagerProvider>
            </ResumeModalProvider>
          </AboutModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
