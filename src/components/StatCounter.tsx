"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

interface StatCounterProps {
  value: string;
  label: string;
  delay?: number;
}

export default function StatCounter({ value, label, delay = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const statParts = useMemo(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return null;

    return {
      number: parseInt(match[1], 10),
      suffix: match[2],
    };
  }, [value]);
  const [display, setDisplay] = useState(statParts ? "0" : value);

  useEffect(() => {
    if (!isInView || !statParts) return;

    const controls = animate(0, statParts.number, {
      duration: 1.4,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v) + statParts.suffix),
    });
    return controls.stop;
  }, [isInView, statParts, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.88 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", damping: 18, stiffness: 200, delay }}
      className="text-center"
    >
      <motion.p
        className="text-2xl font-extrabold tabular-nums"
        style={{ color: "#2E8B57", fontFamily: "Nunito, sans-serif" }}
      >
        {display}
      </motion.p>
      <p
        className="text-xs mt-0.5"
        style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </p>
    </motion.div>
  );
}
