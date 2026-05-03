"use client";

import { useState } from "react";
import Link from "next/link";
import { FiGrid, FiShoppingCart, FiUsers, FiMapPin, FiSearch, FiClipboard, FiArrowLeft } from "react-icons/fi";
import { MdRestaurant } from "react-icons/md";
import placesData from "@/data/places.json";
import PlaceCard from "@/components/PlaceCard";
import type { Place } from "@/types/place";

const ALL_FILTERS = ["all", "food", "grocery", "community", "neighborhood"] as const;
type FilterKey = (typeof ALL_FILTERS)[number];

const filterConfig: Record<FilterKey, { label: string; Icon: React.ElementType }> = {
  all: { label: "All Spots", Icon: FiGrid },
  food: { label: "Restaurants", Icon: MdRestaurant },
  grocery: { label: "Grocery", Icon: FiShoppingCart },
  community: { label: "Community", Icon: FiUsers },
  neighborhood: { label: "Neighborhoods", Icon: FiMapPin },
};

export default function SpotsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const places = placesData as Place[];

  const filtered =
    activeFilter === "all"
      ? places
      : places.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-grid-texture min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: "#DDF5E6", color: "#2E8B57", fontFamily: "Inter, sans-serif" }}
          >
            Curated Filipino Places
          </span>
          <h1
            className="text-4xl font-extrabold leading-tight mb-3"
            style={{ fontFamily: "Nunito, sans-serif", color: "#0F172A" }}
          >
            Filipino Spots in NYC
          </h1>
          <p
            className="text-base max-w-2xl leading-relaxed"
            style={{ color: "#475569", fontFamily: "Inter, sans-serif" }}
          >
            A hand-curated directory of Filipino restaurants, grocery stores, community
            centers, and neighborhoods across New York City.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          {ALL_FILTERS.map((f) => {
            const isActive = activeFilter === f;
            const { label, Icon } = filterConfig[f];
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl border transition-all active:scale-95"
                style={{
                  fontFamily: "Inter, sans-serif",
                  backgroundColor: isActive ? "#2E8B57" : "#ffffff",
                  color: isActive ? "#ffffff" : "#475569",
                  borderColor: isActive ? "#2E8B57" : "#E2E8F0",
                }}
              >
                <Icon size={13} />
                {label}
              </button>
            );
          })}
          <span
            className="ml-auto text-xs"
            style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}
          >
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Cards grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <FiSearch size={36} color="#94A3B8" />
            <p
              className="text-base font-semibold"
              style={{ color: "#0F172A", fontFamily: "Nunito, sans-serif" }}
            >
              No spots found
            </p>
            <p
              className="text-sm"
              style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}
            >
              Try a different category filter.
            </p>
          </div>
        )}

        {/* Data note */}
        <div
          className="mt-12 rounded-2xl p-6 border flex gap-4 items-start"
          style={{ borderColor: "#E2E8F0", background: "#F8FAFC" }}
        >
          <FiClipboard size={24} color="#94A3B8" className="shrink-0 mt-0.5" />
          <div>
            <p
              className="font-bold text-sm mb-1"
              style={{ color: "#0F172A", fontFamily: "Nunito, sans-serif" }}
            >
              About our data
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#475569", fontFamily: "Inter, sans-serif" }}
            >
              All spots are hand-curated for accuracy and cultural relevance. We prioritize
              community-owned and community-serving Filipino businesses. Data is static and
              updated periodically. Always verify hours and availability directly with the
              location.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl border transition-all hover:bg-[#F8FAFC] active:scale-95"
            style={{ borderColor: "#E2E8F0", color: "#0F172A", fontFamily: "Inter, sans-serif" }}
          >
            <FiArrowLeft size={13} />
            Back to Map Explorer
          </Link>
        </div>
      </div>
    </div>
  );
}


