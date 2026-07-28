"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { SPRING_SOFT } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  y = 28,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...SPRING_SOFT, delay }}
    >
      {children}
    </motion.div>
  );
}
