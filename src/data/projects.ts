export type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  year: string;
  tags: string[];
  accent: string;
  /** Controls which device mockup frames the project page (laptop vs phone). */
  platform: "web" | "mobile";
  overview: string;
  problem: string;
  process: { step: string; detail: string }[];
  outcome: string;
  /** Optional — shows a "Live site" badge on the project page when set. */
  liveUrl?: string;
  /** Image shown in the floating hover preview on the homepage Works list. */
  previewImage: string;
  /** How the preview image fills its frame — defaults to "cover". */
  previewFit?: "cover" | "contain";
  /** Big word + short label shown in the same black-panel style as the
   * homepage's language-cycling intro, played once on landing on this
   * project's page. Omit to skip the intro entirely. */
  introWord?: string;
  introSubtitle?: string;
};

export const projects: Project[] = [
  {
    slug: "pluto",
    title: "Pluto",
    tagline: "A student portal app that keeps classes, deadlines, and coursework in one place.",
    role: "UI/UX Designer",
    year: "2026",
    tags: ["Mobile App", "UI/UX Design", "Student Life"],
    accent: "from-ink/20",
    platform: "mobile",
    previewImage: "/cover.png",
    introWord: "PLUTO",
    introSubtitle: "Student Portal",
    overview:
      "Pluto is a student portal app that brings classes, calendar, coursework, and to-dos into one place, with an AI study companion for quick answers about schedules and deadlines. I led the end-to-end UI/UX design — research, wireframes, the visual design system, and a tested high-fidelity prototype.",
    problem:
      "Student life runs across too many disconnected tools — a timetable app, the university LMS, a generic to-do list, group chats for deadlines. Nothing surfaces what actually matters today: what's due, what's next, and how a course is going. That gap is where things get missed.",
    process: [
      {
        step: "Research",
        detail:
          "Mapped the everyday tools students juggle — timetables, the LMS, group chats, generic to-do apps — to find where deadlines and schedule info were falling through the cracks, and where a single home base could help most.",
      },
      {
        step: "Wireframes",
        detail:
          "Sketched the core flows first at low fidelity: the auth flow, the five main tabs (Home, Calendar, Courses, To-Do, Profile), and the course drill-down — 8 screens in total — before touching color or type.",
      },
      {
        step: "UI & Design System",
        detail:
          "Built the visual language on Plus Jakarta Sans for display type and DM Sans for body/UI text, a warm yellow-and-ink palette with semantic colors for exam, assignment, class, and completed states, and a reusable component set — buttons, cards, tags, nav bar — so every screen stayed consistent.",
      },
      {
        step: "Prototype & Test",
        detail:
          "Took the system into high fidelity across all 8 screens and iterated on navigation, task flows, and color-coding for clarity — tightening spacing, touch targets, and copy with each pass.",
      },
    ],
    outcome:
      "A complete design system and working high-fidelity prototype spanning onboarding, home dashboard, calendar, courses, to-dos, profile, and the Pluto AI assistant — ready to hand off for development.",
  },
  {
    slug: "gear4music",
    title: "Gear4music.ie",
    tagline: "Sound without compromise — a dark-first redesign of Ireland's largest online music retailer.",
    role: "Lead UX / UI Designer",
    year: "2024–25",
    tags: ["Web Redesign", "UI/UX Design", "E-commerce"],
    accent: "from-ink/20",
    platform: "web",
    previewImage: "/gear.png",
    introWord: "GEAR4MUSIC",
    introSubtitle: "Website Redesign",
    overview:
      "A complete visual and UX redesign of Ireland's largest online music retailer — bringing clarity, confidence, and craft to a sprawling 250,000-product catalogue. I led research, information architecture, visual design, and a working prototype across an 8-week sprint.",
    problem:
      "The legacy site buried its catalogue behind competing banners, sidebar filters, and an unranked search — users abandoned the search step in 38% of sessions. Mobile was just the desktop layout squeezed smaller, with tap targets averaging 28px, well below the accessibility floor, and no consistent brand identity to build trust in a purchase.",
    process: [
      {
        step: "Research",
        detail:
          "Ran five rounds of usability testing with 18 participants across skill levels and device types, surfacing recurring pain points — from information overload to missing trust and localisation signals for Irish shoppers.",
      },
      {
        step: "Wireframes & IA",
        detail:
          "Rebuilt the navigation around four core screens — homepage, a browse-first search overlay, product detail, and a slide-out menu — cutting the top-level nav from 18 links down to 4 icons.",
      },
      {
        step: "Visual & Design System",
        detail:
          "Built a dark-first palette (Obsidian, Burnt Sienna, Warm Amber) and a three-font type system — Big Shoulders Display, Figtree, DM Mono — plus a 12-component library covering every purchase-journey state.",
      },
      {
        step: "Prototype & Handoff",
        detail:
          "Delivered a working React 18 + Tailwind + Motion prototype with live component demos and a documented design system, ready to hand off for development.",
      },
    ],
    outcome:
      "A projected page load speed drop from 4.8s to under 1.2s, mobile tap-target compliance up from 42% to 100%, and a usability task-completion rate that rose from 61% to 94% — all backed by a documented 12-component design system.",
  },
  {
    slug: "knokknok",
    title: "KnokKnok",
    tagline: "A roommate-matching app connecting people to compatible homes and housemates.",
    role: "Developer",
    year: "[add year]",
    tags: ["Mobile App", "Development", "Matching Product"],
    accent: "from-ink/20",
    platform: "mobile",
    liveUrl: "https://knokknokapp.com/",
    previewImage: "/knokknok1.png",
    overview:
      "[Replace with 2–3 sentences: what KnokKnok does, who it's for, and what you built as the developer.]",
    problem:
      "[Replace with the problem — e.g. how hard it is to find compatible roommates/housing today.]",
    process: [
      {
        step: "Architecture",
        detail: "[Add: the stack and structure you set up — React Native, backend, matching logic.]",
      },
      {
        step: "Core Features",
        detail: "[Add: matching algorithm, profiles, chat, listings — whatever you built.]",
      },
      {
        step: "Design Collaboration",
        detail: "[Add: how you worked with design/Figma to implement the UI faithfully.]",
      },
      {
        step: "Testing & Launch",
        detail: "[Add: QA, TestFlight/Play beta, or launch details.]",
      },
    ],
    outcome:
      "[Replace with results — app store status, user numbers, or lessons learned.]",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
