"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const QUOTES = [
  { text: "Kahit saan ka man pumunta, hindi ka nag-iisa.", lang: "Filipino" },
  { text: "Wherever you go, you are never alone.", lang: "English" },
  { text: "Bisan asa ka moadto, dili ka nag-inusara.", lang: "Cebuano" },
];

const sentenceVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.038, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.018, staggerDirection: -1 } },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 48, rotateX: -90, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: "spring", damping: 13, stiffness: 180 },
  },
  exit: {
    opacity: 0,
    y: -28,
    scale: 0.88,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

export default function CyclingQuote() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const current = QUOTES[index];
  const rawWords = current.text.split(" ");
  const words = rawWords.map((word, wi) => {
    if (wi === 0) return String.fromCharCode(0x201c) + word;
    if (wi === rawWords.length - 1) return word + String.fromCharCode(0x201d);
    return word;
  });

  return (
    <div className="text-center">
      <div
        style={{
          minHeight: "clamp(4.5rem, 12vw, 7rem)",
          width: "100%",
          perspective: "600px",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-xl md:text-2xl font-extrabold text-white"
            style={{
              fontFamily: "Nunito, sans-serif",
              position: "absolute",
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 0.28em",
              lineHeight: 1.35,
            }}
          >
            {words.map((word, wi) => (
              <span key={wi} style={{ display: "inline-flex", overflow: "hidden" }}>
                {word.split("").map((char, ci) => (
                  <motion.span
                    key={`${wi}-${ci}`}
                    variants={charVariants}
                    style={{
                      display: "inline-block",
                      transformOrigin: "bottom center",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.p>
        </AnimatePresence>
      </div>

      <p
        className="text-xs tracking-widest uppercase mt-3"
        style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}
      >
        {String.fromCharCode(0x2014)} {current.lang}
      </p>

      <div className="flex items-center justify-center gap-2 mt-3">
        {QUOTES.map((q, i) => (
          <button
            key={q.lang}
            onClick={() => setIndex(i)}
            aria-label={`Show ${q.lang} quote`}
            style={{
              width: i === index ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === index ? "#2E8B57" : "#475569",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}