export type Poster = {
  /** Two-digit index shown in captions — "01", "02"… */
  no: string;
  /** File in /public/posters (A4 portrait, exported from Figma at 2x = 1190×1684, saved as WebP). */
  src: string;
  title: string;
  /** The visual style this poster explores. */
  style: string;
  /** Fictional event + place, one line. */
  event: string;
  /** Background colour shown while the image loads. */
  tone: string;
};

/** Self-initiated poster series — ten fictional events in London and Dublin,
 * each one exploring a different visual language. Designed in Figma, 2026. */
export const posters: Poster[] = [
  { no: "01", src: "/posters/01-noise-dublin.webp", title: "NOISE//DUBLIN", style: "Acid / Chrome", event: "Techno night · Smithfield, Dublin", tone: "#050505" },
  { no: "02", src: "/posters/02-concrete-echoes.webp", title: "Concrete Echoes", style: "Swiss Punk", event: "Architecture lectures · Barbican, London", tone: "#ECEAE4" },
  { no: "03", src: "/posters/03-motion-studies.webp", title: "Motion Studies", style: "Kinetic Type", event: "Design conference · King's Cross, London", tone: "#2B3BFF" },
  { no: "04", src: "/posters/04-afterglow.webp", title: "Afterglow", style: "Liquid Blur", event: "Ambient night · Shoreditch, London", tone: "#6A2BFF" },
  { no: "05", src: "/posters/05-zine-fair.webp", title: "Zine Fair", style: "Riso Collage", event: "Small press fair · Peckham, London", tone: "#F0EBDF" },
  { no: "06", src: "/posters/06-signal-04.webp", title: "SIGNAL_04", style: "Data / Technical", event: "Media art exhibition · Somerset House, London", tone: "#E4E4DF" },
  { no: "07", src: "/posters/07-form-and-function.webp", title: "Form & Function", style: "Neo-Bauhaus 3D", event: "Design festival · Southbank Centre, London", tone: "#EFE6D2" },
  { no: "08", src: "/posters/08-corrupted-archive.webp", title: "Corrupted Archive", style: "Glitch", event: "Digital art show · Temple Bar, Dublin", tone: "#050505" },
  { no: "09", src: "/posters/09-quiet-rooms.webp", title: "Quiet Rooms", style: "Editorial Luxury", event: "Photography exhibition · Mayfair, London", tone: "#F2EEE6" },
  { no: "10", src: "/posters/10-electric-garden.webp", title: "Electric Garden", style: "Psychedelic", event: "Summer festival · Phoenix Park, Dublin", tone: "#FF5A1F" },
];
