"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const PHRASES = [
  { text: "Discover Your Kababayan Community in NYC", keyword: "Kababayan", lang: "English" },
  { text: "Tuklasin Ang Inyong Kababayan sa NYC", keyword: "Kababayan", lang: "Tagalog" },
  { text: "Pangitaa Ang Imong Kababayan sa NYC", keyword: "Kababayan", lang: "Bisaya" },
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

export default function CyclingHero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const phrase = PHRASES[phraseIndex];

  return (
    <div className="mb-4">
      {/* h-32 on mobile handles up to 3-line wrap at text-4xl; md:h-20 fits single-line text-5xl ~58px with breathing room */}
      <div
        className="relative h-32 md:h-20"
        style={{ width: "100%", perspective: "600px" }}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={phraseIndex}
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{
              fontFamily: "Nunito, sans-serif",
              color: "#0F172A",
              position: "absolute",
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 0.28em",
            }}
          >
            {phrase.text.split(" ").map((word, wi) => (
              <span key={wi} style={{ display: "inline-flex", overflow: "hidden" }}>
                {word.split("").map((char, ci) => (
                  <motion.span
                    key={`${wi}-${ci}`}
                    variants={charVariants}
                    style={{
                      display: "inline-block",
                      transformOrigin: "bottom center",
                      color: word === phrase.keyword ? "#3f7366" : undefined,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Language indicator */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {PHRASES.map((p, i) => (
          <button
            key={p.lang}
            onClick={() => setPhraseIndex(i)}
            aria-label={`Show ${p.lang}`}
            style={{
              width: i === phraseIndex ? 22 : 7,
              height: 7,
              borderRadius: 4,
              background: i === phraseIndex ? "#3f7366" : "#CBD5E1",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
        <span
          className="text-xs ml-1 font-medium tracking-wide uppercase"
          style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif", fontSize: 10 }}
        >
          {phrase.lang}
        </span>
      </div>
    </div>
  );
}
