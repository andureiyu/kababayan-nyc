"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiMap,
  FiShoppingCart,
  FiUsers,
  FiGrid,
  FiArrowRight,
  FiInfo,
  FiMapPin,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";
import { MdRestaurant } from "react-icons/md";
import placesData from "@/data/places.json";
import type { Place } from "@/types/place";
import CyclingHero from "@/components/CyclingHero";
import StatCounter from "@/components/StatCounter";
import CategoryButton from "@/components/CategoryButton";

const MapExplorer = dynamic(() => import("@/components/MapExplorer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#F8FAFC] rounded-2xl">
      <p style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}>Loading map…</p>
    </div>
  ),
});

const ALL_CATEGORIES = ["all", "food", "grocery", "community", "neighborhood"] as const;

type CategoryKey = (typeof ALL_CATEGORIES)[number];

const categoryConfig: Record<
  CategoryKey,
  { label: string; Icon: React.ElementType }
> = {
  all: { label: "All", Icon: FiGrid },
  food: { label: "Food", Icon: MdRestaurant },
  grocery: { label: "Grocery", Icon: FiShoppingCart },
  community: { label: "Community", Icon: FiUsers },
  neighborhood: { label: "Neighborhoods", Icon: FiMapPin },
};

const navCards = [
  {
    href: "/neighborhoods",
    title: "Neighborhood Guide",
    desc: "Discover key Filipino neighborhoods across NYC boroughs.",
    Icon: FiMap,
    accent: "#1E3A8A",
    bg: "#EFF6FF",
  },
  {
    href: "/spots",
    title: "Filipino Spots",
    desc: "Curated restaurants, grocery stores, and community hubs.",
    Icon: FiMapPin,
    accent: "#2E8B57",
    bg: "#DDF5E6",
  },
  {
    href: "/about",
    title: "About Kababayan NY",
    desc: "Learn about the mission and purpose of this platform.",
    Icon: FiInfo,
    accent: "#F59E0B",
    bg: "#FFFBEB",
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const places = placesData as Place[];

  const filtered =
    activeCategory === "all"
      ? places
      : places.filter((p) => p.category === activeCategory);

  useEffect(() => {
    document.body.style.overflow = isMapFullscreen ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMapFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMapFullscreen]);

  return (
    <div className="bg-grid-texture min-h-screen pt-32 pb-16">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 mb-10">
        <div className="text-center mb-8">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: "#DDF5E6", color: "#2E8B57", fontFamily: "Inter, sans-serif" }}
          >
            Your New York City Filipino Community Guide
          </span>
          <CyclingHero />
          <p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "#475569", fontFamily: "Inter, sans-serif" }}
          >
            Explore Filipino community hubs, grocery stores, restaurants, and
            neighborhoods across New York City — all in one place.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-10 mb-10">
          <StatCounter value="17+" label="Curated Spots" delay={0} />
          <StatCounter value="4" label="Boroughs" delay={0.15} />
          <StatCounter value="100K+" label="Fil-Am Community" delay={0.3} />
        </div>
      </section>

      {/* Map + Filters */}
      <section className="max-w-6xl mx-auto px-4">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          {ALL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const { label, Icon } = categoryConfig[cat];
            return (
              <CategoryButton
                key={cat}
                isActive={isActive}
                onClick={() => setActiveCategory(cat)}
              >
                <Icon size={13} />
                {label}
              </CategoryButton>
            );
          })}
          <span
            className="ml-auto text-xs"
            style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}
          >
            {filtered.length} location{filtered.length !== 1 ? "s" : ""} shown
          </span>
        </div>

        {/* Map */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className={
            isMapFullscreen
              ? "fixed inset-3 md:inset-6 z-100 overflow-hidden border bg-white"
              : "relative rounded-2xl overflow-hidden border"
          }
          style={{
            height: isMapFullscreen ? "auto" : 520,
            borderColor: "#E2E8F0",
            borderRadius: isMapFullscreen ? 18 : 16,
            boxShadow: isMapFullscreen ? "0 24px 80px rgba(15,23,42,0.24)" : "none",
          }}
        >
          <div className="absolute right-3 top-3 z-500 flex gap-2">
            <button
              type="button"
              onClick={() => setIsMapFullscreen((current) => !current)}
              aria-label={isMapFullscreen ? "Exit fullscreen map" : "Open fullscreen map"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white text-[#0F172A] shadow-lg transition-all hover:bg-[#F8FAFC] active:scale-95"
              style={{ borderColor: "#E2E8F0" }}
            >
              {isMapFullscreen ? <FiMinimize2 size={17} /> : <FiMaximize2 size={17} />}
            </button>
          </div>

          {isMapFullscreen && (
            <div
              className="absolute left-4 top-4 z-500 rounded-xl border bg-white/95 px-4 py-3 shadow-lg"
              style={{ borderColor: "#E2E8F0" }}
            >
              <p
                className="text-sm font-extrabold leading-none"
                style={{ color: "#0F172A", fontFamily: "Nunito, sans-serif" }}
              >
                Kababayan NY Map
              </p>
              <p className="mt-1 text-xs" style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}>
                {filtered.length} location{filtered.length !== 1 ? "s" : ""} shown
              </p>
            </div>
          )}

          <MapExplorer places={filtered} activeCategory={activeCategory} />
        </motion.div>

        <AnimatePresence>
          {isMapFullscreen && (
            <motion.button
              type="button"
              aria-label="Close fullscreen map"
              className="fixed inset-0 z-90 bg-[#0F172A]/35"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMapFullscreen(false)}
            />
          )}
        </AnimatePresence>

        <p
          className="text-xs mt-2 text-center"
          style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}
        >
          Click any pin on the map to view details and open navigation.
        </p>
      </section>

      {/* Quick nav cards */}
      <section className="max-w-6xl mx-auto px-4 mt-14">
        <h2
          className="text-2xl font-extrabold mb-6"
          style={{ fontFamily: "Nunito, sans-serif", color: "#0F172A" }}
        >
          Explore Kababayan NY
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {navCards.map((card) => {
            const { Icon } = card;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="place-card bg-white rounded-2xl p-6 border flex flex-col gap-3"
                style={{ borderColor: "#E2E8F0", textDecoration: "none" }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: card.bg }}
                >
                  <Icon size={18} color={card.accent} />
                </span>
                <h3
                  className="font-bold text-base"
                  style={{ color: "#0F172A", fontFamily: "Nunito, sans-serif" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#475569", fontFamily: "Inter, sans-serif" }}
                >
                  {card.desc}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-sm font-semibold mt-auto"
                  style={{ color: card.accent, fontFamily: "Inter, sans-serif" }}
                >
                  Explore <FiArrowRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}


