"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SPRING_SNAPPY } from "@/lib/motion";
import { OrbitIcon } from "./ModernIcons";

// Serializable subset of ProjectDisplayMeta — deliberately excludes the
// `Icon` component reference. Server Components (like the case-study page)
// can't pass function values across the server/client boundary to this
// "use client" component, so this chip owns its own fallback icon instead.
type ChipMeta = {
  bg: string;
  iconImage?: string;
  iconFit?: "cover" | "contain";
  iconPosition?: string;
};

// Shared project icon chip — used by both the homepage Works list and each
// case-study page's "More projects" section, so a project's icon looks
// identical everywhere it appears.
export default function ProjectIconChip({ meta, size = "h-10 w-10" }: { meta: ChipMeta; size?: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.08, rotate: -4 }}
      transition={SPRING_SNAPPY}
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl text-cream ${size} ${meta.bg}`}
    >
      {meta.iconImage ? (
        <Image
          src={meta.iconImage}
          alt=""
          fill
          className={meta.iconFit === "contain" ? "object-contain p-1.5" : "object-cover"}
          style={meta.iconFit === "contain" ? undefined : { objectPosition: meta.iconPosition ?? "center" }}
        />
      ) : (
        <OrbitIcon className="h-5 w-5" />
      )}
    </motion.span>
  );
}
