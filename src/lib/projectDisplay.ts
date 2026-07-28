import { GearIcon, LockIcon, OrbitIcon } from "@/components/ModernIcons";

export type ProjectDisplayMeta = {
  name: string;
  Icon: typeof GearIcon;
  bg: string;
  iconImage?: string;
  iconFit?: "cover" | "contain";
  iconPosition?: string;
};

// Display-name / icon / accent-color overrides, keyed by slug — shared by
// the homepage Works list (WorksWidget) and each case-study page's "More
// projects" chips, so a project's identity looks identical in both places.
export const PROJECT_DISPLAY: Record<string, ProjectDisplayMeta> = {
  // Pluto's icon is cropped straight from the project's own welcome-screen
  // illustration (its mascot), so the list shows the real project art
  // instead of a generic stand-in icon.
  pluto: { name: "Pluto", Icon: OrbitIcon, bg: "bg-white", iconImage: "/pluto-icon.png" },
  // gear.png is the full, wide case-study cover banner (904×529) — its
  // shape is too different from this square chip to use directly (object-fit
  // would squash the whole banner into a 40px sliver rather than zoom into
  // the wordmark). gear-icon.png is a pre-cropped still taken straight from
  // that same file, focused on the "GEAR4" mark.
  gear4music: { name: "Gear4Music", Icon: GearIcon, bg: "bg-navy-soft", iconImage: "/gear-icon.png" },
  // KnockKnock's own logo mark (transparent background), shown with some
  // breathing room rather than cropped edge-to-edge like the other two.
  knokknok: { name: "KnockKnock", Icon: LockIcon, bg: "bg-white", iconImage: "/knokknok.png", iconFit: "contain" },
};

export function getProjectDisplay(slug: string, fallbackName: string): ProjectDisplayMeta {
  return PROJECT_DISPLAY[slug] ?? { name: fallbackName, Icon: OrbitIcon, bg: "bg-white/10" };
}
