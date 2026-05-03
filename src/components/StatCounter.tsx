"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface StatCounterProps {
  value: string;
  label: string;
  delay?: number;
}

export default function StatCounter({ value, label, delay = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const num = parseInt(match[1], 10);
    const suffix = match[2];
    const controls = animate(0, num, {
      duration: 1.4,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v) + suffix),
    });
    return controls.stop;
  }, [isInView, value, delay]);

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
