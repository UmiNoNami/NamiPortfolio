import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import HomeWorld from "@/components/glass/HomeWorld";
import ScrollProgress from "@/components/ScrollProgress";
import CursorBadge from "@/components/CursorBadge";
import Preloader from "@/components/Preloader";
import AboutModal from "@/components/AboutModal";
import ResumeModal from "@/components/ResumeModal";
import PlaygroundModal from "@/components/PlaygroundModal";
import ContactChat from "@/components/ContactChat";
import { AccessibilityProvider } from "@/lib/accessibility";
import { AboutModalProvider } from "@/lib/aboutModal";
import { ResumeModalProvider } from "@/lib/resumeModal";
import { WindowManagerProvider } from "@/lib/windowManager";
import { ContactChatProvider } from "@/lib/contactChat";

// Fonts are loaded with one plain Google Fonts <link> in <head> (below) and
// mapped to the --font-* variables in globals.css. next/font/google in Next
// 14.2.5 crashes during `next build` when Google serves a family from an
// extension-less file URL ("Cannot read properties of null (reading '1')").
// Families: Inter (site sans), Playfair Display (serif accents), Pixelify Sans
// + Space Mono (retro desktop components), Plus Jakarta Sans (Pluto case
// study), DM Sans, Big Shoulders Display (Gear4music case study), Figtree,
// DM Mono.
const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2" +
  "?family=Inter:wght@400;500;600;700;800" +
  "&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700" +
  "&family=Pixelify+Sans:wght@400;500;600;700" +
  "&family=Space+Mono:wght@400;700" +
  "&family=Plus+Jakarta+Sans:wght@400;600;700;800" +
  "&family=DM+Sans:wght@300;400;500;600;700" +
  "&family=Big+Shoulders+Display:wght@700;800;900" +
  "&family=Figtree:wght@400;500;600;700" +
  "&family=DM+Mono:wght@400;500" +
  "&display=swap";

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

// Runs before hydration so the correct color theme, text size and
// motion/link/font accessibility preferences are all on <html> before the
// first paint — otherwise there's a flash of the wrong theme (or a jump in
// text size) right after load. Mirrors the shape of AccessibilitySettings
// in @/lib/accessibility, since this has to run as plain JS before React
// (and that module's own code) is available.
const A11Y_INIT_SCRIPT = `
(function () {
  try {
    var root = document.documentElement;
    var settings = null;
    var raw = localStorage.getItem("nami-a11y-settings");
    if (raw) {
      settings = JSON.parse(raw);
    } else {
      var legacy = localStorage.getItem("nami-theme");
      var dark = legacy ? legacy === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      settings = {
        colorTheme: dark ? "dark" : "light",
        textSize: "default",
        reduceMotion: reduceMotion,
        highlightLinks: false,
        readableFont: false
      };
    }
    if (settings.colorTheme === "dark" || settings.colorTheme === "high-contrast") {
      root.classList.add("dark");
    }
    if (settings.colorTheme === "high-contrast" || settings.colorTheme === "soft") {
      root.setAttribute("data-a11y-theme", settings.colorTheme);
    }
    root.setAttribute("data-text-size", settings.textSize || "default");
    if (settings.reduceMotion) root.setAttribute("data-reduce-motion", "");
    if (settings.highlightLinks) root.setAttribute("data-highlight-links", "");
    if (settings.reduceTransparency) root.setAttribute("data-reduce-transparency", "");
    if (settings.readableFont) root.setAttribute("data-readable-font", "");
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href={GOOGLE_FONTS_HREF}
        />
        <Script id="a11y-init" strategy="beforeInteractive">
          {A11Y_INIT_SCRIPT}
        </Script>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body
        className={`bg-canvas font-sans text-navy antialiased transition-colors duration-300 dark:bg-midnight dark:text-cream`}
      >
        <AccessibilityProvider>
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
                  <HomeWorld>{children}</HomeWorld>
                  <AboutModal />
                  <ResumeModal />
                  <PlaygroundModal />
                  <ContactChat />
                </ContactChatProvider>
              </WindowManagerProvider>
            </ResumeModalProvider>
          </AboutModalProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
