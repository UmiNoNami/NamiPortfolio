import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#111111",
          soft: "#3a3a3a",
        },
        paper: {
          DEFAULT: "#F3F2EE",
          dim: "#E7E5DE",
        },
        line: "#111111",
        muted: "#8a8a86",
        // Classic Windows 95/98 chrome palette (kept for the retired retro
        // build — still referenced by a few legacy components)
        winface: "#C0C0C0",
        windark: "#808080",
        winborder: "#0a0a0a",
        winlight: "#dfdfdf",
        winnavy: "#000080",
        winnavy2: "#1084D0",
        // Current site palette (modern illustrated portfolio)
        canvas: "#E7E4DE",
        cream: {
          DEFAULT: "#F5F2EC",
          dim: "#EDEAE2",
        },
        navy: {
          DEFAULT: "#16233F",
          soft: "#23355C",
        },
        midnight: {
          DEFAULT: "#0C1322",
          card: "#141D33",
        },
        brand: {
          orange: "#E2532E",
          "orange-dark": "#C6431F",
          yellow: "#F0B429",
          sky: "#9FC6E0",
        },
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        // Pluto's own type pairing, used only within its case-study page.
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        dm: ["var(--font-dm)", "sans-serif"],
        // Gear4music's own type pairing, used only within its case-study page.
        "big-shoulders": ["var(--font-big-shoulders)", "sans-serif"],
        figtree: ["var(--font-figtree)", "sans-serif"],
        "dm-mono": ["var(--font-dm-mono)", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(var(--r, 0deg))" },
          "50%": { transform: "translateY(-10px) rotate(var(--r, 0deg))" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "marquee-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "marquee-down": {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "marquee-up": "marquee-up 26s linear infinite",
        "marquee-down": "marquee-down 26s linear infinite",
        "text-shimmer": "text-shimmer 2s linear infinite",
      },
      boxShadow: {
        pixel: "4px 4px 0 0 #111111",
        "pixel-sm": "2px 2px 0 0 #111111",
      },
    },
  },
  plugins: [],
};
export default config;
