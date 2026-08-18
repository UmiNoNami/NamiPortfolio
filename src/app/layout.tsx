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
import { ContactChatProvider } from "@/lib/contactChat";

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

const SITE_URL = "https://heyitsnami.com";
const SITE_TITLE = "Nami — UI/UX Designer & Front-End Developer in Dublin";
const SITE_DESCRIPTION =
  "Portfolio of Nami Enkhjargal, a Dublin-based UI/UX designer and front-end developer creating thoughtful, playful digital experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Nami",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Nami — Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Nami — UI/UX Designer & Front-End Developer" }],
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

// Person + portfolio-website structured data, so search engines can surface
// Nami as a recognised entity (Knowledge Panel eligibility) alongside the
// standard page metadata above.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Naransuvd Enkhjargal",
      alternateName: "Nami",
      url: SITE_URL,
      jobTitle: "UI/UX Designer & Front-End Developer",
      address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
      sameAs: [
        "https://www.linkedin.com/in/naransuvd-enkhjargal-8084271a9/",
        "https://github.com/UmiNoNami",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Nami — Portfolio",
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${pixelify.variable} ${spaceMono.variable} ${plusJakarta.variable} ${dmSans.variable} ${bigShoulders.variable} ${figtree.variable} ${dmMono.variable} bg-canvas font-sans text-navy antialiased transition-colors duration-300 dark:bg-midnight dark:text-cream`}
      >
        <ThemeProvider>
          <AboutModalProvider>
            <ResumeModalProvider>
              <WindowManagerProvider>
                <ContactChatProvider>
                  <ScrollProgress />
                  <CursorBadge />
                  <Preloader />
                  <a
                    href="#main-content"
                    className="fixed left-3 top-3 z-[300] -translate-y-24 rounded-full bg-navy px-4 py-2 font-sans text-sm font-semibold text-cream opacity-0 transition-all focus:translate-y-0 focus:opacity-100 dark:bg-cream dark:text-navy"
                  >
                    Skip to content
                  </a>
                  <div id="top" />
                  {children}
                  <AboutModal />
                  <ResumeModal />
                  <PlaygroundModal />
                  <ContactChat />
                </ContactChatProvider>
              </WindowManagerProvider>
            </ResumeModalProvider>
          </AboutModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
