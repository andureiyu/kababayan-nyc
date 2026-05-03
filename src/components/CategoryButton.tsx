"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CategoryButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}

export default function CategoryButton({ isActive, onClick, children }: CategoryButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      animate={{
        x: isActive ? 3 : 0,
        y: isActive ? 3 : 0,
        backgroundColor: isActive ? "#3f7366" : "#ffffff",
        color: isActive ? "#ffffff" : "#0F172A",
        boxShadow: isActive ? "0px 0px 0px #0F172A" : "3px 3px 0px #0F172A",
      }}
      whileHover={
        !isActive
          ? { x: 1.5, y: 1.5, boxShadow: "1.5px 1.5px 0px #0F172A", backgroundColor: "#f0faf7" }
          : {}
      }
      whileTap={{ x: 3, y: 3, boxShadow: "0px 0px 0px #0F172A", scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 22 }}
      style={{
        border: "2px solid #0F172A",
        fontFamily: "Inter, sans-serif",
        fontWeight: 700,
        fontSize: 13,
        padding: "8px 14px",
        borderRadius: 10,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        outline: "none",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </motion.button>
  );
}
