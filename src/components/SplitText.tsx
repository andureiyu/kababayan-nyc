"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { CSSProperties } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  /** Base delay before the first character appears (seconds) */
  delay?: number;
  /** Delay between each character (seconds) */
  stagger?: number;
}

const charVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.6,
    rotateX: -45,
    transformPerspective: 600,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transformPerspective: 600,
  },
};

export default function SplitText({
  text,
  className,
  style,
  delay = 0,
  stagger = 0.035,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <span ref={ref} className={className} style={{ display: "inline", ...style }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 180,
            delay: delay + i * stagger,
          }}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
