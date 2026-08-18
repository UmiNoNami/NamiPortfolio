export type Project = {
  slug: string;
  title: string;
  /** Short "Category · Type" line shown under the title on cards and the
   * case-study header — e.g. "Product Design · Mobile App". */
  category: string;
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
  /** Optional — shows a "Live site" badge on the project page when set, and
   * makes the homepage card/chips link straight out to it instead of the
   * internal case-study page. Only used for projects with no case study to
   * visit first. */
  liveUrl?: string;
  /** The live product's own URL, shown as a CTA *inside* the case-study page
   * (unlike liveUrl, this never bypasses the case study from the homepage
   * card — used for projects like KnockKnock where the card should always
   * lead to the internal write-up first). */
  productUrl?: string;
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
    category: "Product Design · Mobile App",
    tagline:
      "A student portal concept designed to bring classes, deadlines, coursework and daily tasks into one clear mobile experience.",
    role: "UI/UX Designer",
    year: "2026",
    tags: ["Product Design", "Mobile App", "UI/UX Design"],
    accent: "from-ink/20",
    platform: "mobile",
    previewImage: "/cover.png",
    introWord: "PLUTO",
    introSubtitle: "Student Portal",
    overview:
      "Pluto is a student portal concept that brings classes, deadlines, coursework and daily tasks into one mobile experience. The project explores how students could understand what needs their attention without moving between several disconnected tools.",
    problem:
      "Student information is often distributed across timetables, learning portals, emails, group chats and personal to-do lists. Moving between these tools makes it harder to understand what is happening today, what is due next and which tasks require immediate attention.",
    process: [
      {
        step: "Exploration",
        detail:
          "I reviewed the common tools students use to manage classes and coursework. This helped me identify an opportunity to connect schedule information, deadlines and personal tasks within one consistent experience.",
      },
      {
        step: "Wireframes",
        detail:
          "Sketched the core flows first at low fidelity: the auth flow, the five main tabs (Home, Calendar, Courses, To-Do, Profile), and the course drill-down — 8 screens in total — before touching color or type.",
      },
      {
        step: "Design System",
        detail:
          "Built the visual language on Plus Jakarta Sans for display type and DM Sans for body/UI text, a warm yellow-and-ink palette with semantic colors for exam, assignment, class, and completed states, and a reusable component set — buttons, cards, tags, nav bar — so every screen stayed consistent.",
      },
      {
        step: "Final Experience",
        detail:
          "Took the system into high fidelity across all 8 screens — the connected student dashboard, calendar, course area, task manager and focused AI assistant.",
      },
    ],
    outcome:
      "The final concept includes a connected student dashboard, calendar, course area, task manager and focused AI assistant. The project strengthened my ability to organise a multi-feature product into a consistent mobile system.",
  },
  {
    slug: "gear4music",
    title: "Gear4Music Redesign",
    category: "UX/UI Redesign · E-commerce",
    tagline:
      "A conceptual redesign exploring how a large music catalogue could feel clearer, more focused and easier to navigate.",
    role: "UX/UI Designer",
    year: "2024–25",
    tags: ["UX/UI Redesign", "E-commerce", "Independent Concept"],
    accent: "from-ink/20",
    platform: "web",
    previewImage: "/gear.png",
    introWord: "GEAR4MUSIC",
    introSubtitle: "Independent Redesign Concept",
    overview:
      "An independent conceptual redesign exploring how Gear4Music's online shopping experience could feel clearer, more focused and more confident across desktop and mobile. This project was not commissioned by Gear4Music.",
    problem:
      "Large e-commerce catalogues must support very different customers, from beginners exploring their first instrument to experienced musicians searching for a specific product. This concept focuses on reducing visual competition and creating a more structured route from discovery to checkout.",
    process: [
      {
        step: "Heuristic Review",
        detail:
          "Reviewed the legacy site against usability heuristics and competitor patterns to identify areas of opportunity — competing visual priorities, complex product discovery, inconsistent trust information and a compressed rather than redesigned mobile hierarchy.",
      },
      {
        step: "Information Architecture",
        detail:
          "Rebuilt the navigation around four core mobile actions — home, search, basket and menu — and expanded search into a browse-first discovery tool.",
      },
      {
        step: "Design System",
        detail:
          "Built a dark-first palette (Obsidian, Burnt Sienna, Warm Amber) and a three-font type system — Big Shoulders Display, Figtree, DM Mono — plus a component library covering navigation, product cards, status badges, buttons, search and checkout.",
      },
      {
        step: "Final Solution",
        detail:
          "Delivered a working prototype covering the core shopping journey from product discovery through to order confirmation, with a running order summary visible at every checkout step.",
      },
    ],
    outcome:
      "The final concept covers the main shopping journey from product discovery to order confirmation, backed by a reusable component system for navigation, product cards, status badges, buttons, search and checkout.",
  },
  {
    slug: "knockknock",
    title: "KnockKnock",
    category: "Mobile Development · Collaboration",
    tagline:
      "A working roommate-matching application developed with React Native, Expo and Firebase from a UI/UX design created by Fernanda Fernandes.",
    role: "Mobile App Developer",
    year: "2025",
    tags: ["Mobile Development", "Collaboration", "React Native"],
    accent: "from-ink/20",
    platform: "mobile",
    productUrl: "https://knokknokapp.com/",
    previewImage: "/knokknok1.png",
    introWord: "KNOCKKNOCK",
    introSubtitle: "Roommate Matching App",
    overview:
      "KnockKnock is a roommate and accommodation-matching application created as a collaborative master's project. The UI/UX design was created by Fernanda Fernandes, while I was responsible for developing the application and connecting the experience to a working Firebase backend.",
    problem:
      "Finding compatible roommates and accommodation usually means juggling several disconnected listing sites and group chats, with no structured way to see who and what is actually compatible.",
    process: [
      {
        step: "Architecture",
        detail:
          "Developed the application using React Native and Expo, built Firebase authentication, and structured the Firestore database to support separate Seeker and Provider experiences.",
      },
      {
        step: "Core Features",
        detail:
          "Implemented user profiles and accommodation listings, image uploading, swiping and matching functionality, and real-time conversations with image messaging.",
      },
      {
        step: "Design Collaboration",
        detail:
          "Translated the Figma designs created by Fernanda Fernandes into reusable React Native components and working interactions, communicating technical constraints while preserving the original visual direction.",
      },
      {
        step: "Discovery & Safety",
        detail:
          "Added map-based accommodation discovery, plus reporting, hiding and account-management features.",
      },
    ],
    outcome:
      "The result was a functioning end-to-end mobile application rather than only a visual prototype. The project strengthened my ability to collaborate with a designer, translate interface designs into code and connect complex user flows to a real database.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
