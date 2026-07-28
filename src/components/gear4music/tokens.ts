// Gear4music's own design-system palette — exact values pulled directly from
// the Figma Make source file, so the Color System swatches, badges, and
// component demos all reference the same numbers as the real case study.
export const g4mColors = {
  obsidian: "#0D0D0D",
  charcoalSurface: "#161616",
  raisedSurface: "#1E1E1E",
  burntSienna: "#C8561A",
  warmAmber: "#D4962A",
  warmWhite: "#F0EFEA",
  subdued: "#8A8A82",
  hairline: "#1F1F1F",
};

export const g4mContrast: { pair: string; ratio: string }[] = [
  { pair: "Warm White on Obsidian", ratio: "16.5:1" },
  { pair: "Burnt Sienna on Obsidian", ratio: "4.6:1" },
  { pair: "Warm Amber on Obsidian", ratio: "5.8:1" },
  { pair: "Warm White on Card", ratio: "14.1:1" },
  { pair: "Subdued on Obsidian", ratio: "4.7:1" },
  { pair: "White on Burnt Sienna", ratio: "4.5:1" },
];
