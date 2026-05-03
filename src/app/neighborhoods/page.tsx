import Link from "next/link";
import {
  FiGrid,
  FiGlobe,
  FiLink2,
  FiStar,
  FiHome,
  FiFeather,
  FiArrowLeft,
  FiExternalLink,
  FiFlag,
  FiMapPin,
} from "react-icons/fi";
import type { ElementType } from "react";

type Neighborhood = {
  id: number;
  name: string;
  subtitle: string;
  borough: string;
  description: string;
  filipinoPresence: string;
  keySpots: string[];
  mapsUrl: string;
  accent: string;
  bg: string;
  Icon: ElementType;
  tag: string;
};

const neighborhoods: Neighborhood[] = [
  {
    id: 1,
    name: "Woodside, Queens",
    subtitle: "Little Manila",
    borough: "Queens",
    description:
      "Woodside is the undisputed heart of Filipino New York. Roosevelt Avenue from 69th to 72nd Street is lined with Filipino restaurants, bakeries, remittance centers, and grocery stores. Tens of thousands of Filipinos call this neighborhood home.",
    filipinoPresence:
      "The largest concentration of Filipino-owned businesses in NYC. Home to the annual Filipino Independence Day celebrations and community parades.",
    keySpots: ["Ihawan Restaurant", "Phil-Am Food Mart", "Seafood City", "Krystal's Café"],
    mapsUrl: "https://maps.google.com/?q=Woodside+Queens+NYC",
    accent: "#2E8B57",
    bg: "#DDF5E6",
    Icon: FiGrid,
    tag: "Most Filipino",
  },
  {
    id: 2,
    name: "Jackson Heights, Queens",
    subtitle: "Diverse & Vibrant",
    borough: "Queens",
    description:
      "Adjacent to Woodside, Jackson Heights is one of the most ethnically diverse urban neighborhoods in the world. A significant Filipino population lives here alongside South Asian and Latin American communities.",
    filipinoPresence:
      "Several Filipino restaurants, markets, and services are scattered throughout. Easy access to Woodside's Little Manila strip via the 7 train.",
    keySpots: ["Filipino bakeries", "Asian supermarkets", "Roosevelt Ave corridor"],
    mapsUrl: "https://maps.google.com/?q=Jackson+Heights+Queens+NYC",
    accent: "#1E3A8A",
    bg: "#EFF6FF",
    Icon: FiGlobe,
    tag: "Queens",
  },
  {
    id: 3,
    name: "Jersey City, NJ",
    subtitle: "Greater Metro Area",
    borough: "New Jersey (Metro)",
    description:
      "While technically outside NYC, Jersey City across the Hudson River has a thriving Filipino community. Many Filipinos live here while working in Manhattan, drawn by relatively lower costs and strong community ties.",
    filipinoPresence:
      "Filipino restaurants, churches, and the annual Jersey City Filipino Festival draw thousands of attendees each year.",
    keySpots: ["Filipino restaurants in Journal Square", "Filipino Catholic churches", "Asian markets"],
    mapsUrl: "https://maps.google.com/?q=Jersey+City+NJ+Filipino+community",
    accent: "#F59E0B",
    bg: "#FFFBEB",
    Icon: FiLink2,
    tag: "Metro Area",
  },
  {
    id: 4,
    name: "Manhattan (Midtown)",
    subtitle: "Work & Commerce",
    borough: "Manhattan",
    description:
      "Midtown Manhattan hosts a Jollibee location and the Philippine Consulate General, making it a key hub for Filipinos visiting or working in the city. Many Filipino professionals commute through or work in this area.",
    filipinoPresence:
      "The Philippine Consulate General at 556 5th Ave serves thousands of Filipinos monthly with passport, visa, and overseas worker services.",
    keySpots: ["Jollibee Times Square", "Philippine Consulate General", "FilAm Arts"],
    mapsUrl: "https://maps.google.com/?q=Midtown+Manhattan+NYC",
    accent: "#38BDF8",
    bg: "#F0F9FF",
    Icon: FiStar,
    tag: "Manhattan",
  },
  {
    id: 5,
    name: "Brooklyn",
    subtitle: "Growing Community",
    borough: "Brooklyn",
    description:
      "Brooklyn has a growing Filipino presence, particularly in areas like Bay Ridge and Sunset Park. Modern Filipino restaurants and second-generation Filipino-American culture have found a home here.",
    filipinoPresence:
      "Younger Filipino-Americans and new Filipino restaurants have energized Brooklyn's Filipino dining scene, blending traditional flavors with contemporary cuisine.",
    keySpots: ["Anak Filipino Kitchen", "Filipino pop-up events", "Asian grocery stores"],
    mapsUrl: "https://maps.google.com/?q=Brooklyn+NYC+Filipino",
    accent: "#2E8B57",
    bg: "#DDF5E6",
    Icon: FiHome,
    tag: "Brooklyn",
  },
  {
    id: 6,
    name: "The Bronx",
    subtitle: "Community Roots",
    borough: "The Bronx",
    description:
      "The Bronx has a dedicated Filipino community with roots going back several decades. Community centers and churches serve as gathering points for Filipinos in this borough.",
    filipinoPresence:
      "Filipino Catholic churches and community organizations provide social services, cultural programming, and a sense of home for Fil-Am families in the Bronx.",
    keySpots: ["Filipino community churches", "Cultural centers", "Local Filipino eateries"],
    mapsUrl: "https://maps.google.com/?q=The+Bronx+NYC+Filipino+community",
    accent: "#1E3A8A",
    bg: "#EFF6FF",
    Icon: FiFeather,
    tag: "The Bronx",
  },
];

export default function NeighborhoodsPage() {
  return (
    <div className="bg-grid-texture min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: "#EFF6FF", color: "#1E3A8A", fontFamily: "Inter, sans-serif" }}
          >
            NYC Filipino Neighborhoods
          </span>
          <h1
            className="text-4xl font-extrabold leading-tight mb-3"
            style={{ fontFamily: "Nunito, sans-serif", color: "#0F172A" }}
          >
            Neighborhood Guide
          </h1>
          <p
            className="text-base max-w-2xl leading-relaxed"
            style={{ color: "#475569", fontFamily: "Inter, sans-serif" }}
          >
            Explore the key areas where Filipino communities thrive across New York City
            and the greater metro area.
          </p>
        </div>

        {/* Neighborhoods grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {neighborhoods.map((hood) => {
            const { Icon } = hood;
            return (
              <div
                key={hood.id}
                className="place-card bg-white rounded-2xl border overflow-hidden"
                style={{ borderColor: "#E2E8F0" }}
              >
                {/* Top accent bar */}
                <div className="h-1.5 w-full" style={{ backgroundColor: hood.accent }} />

                <div className="p-6 flex flex-col gap-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: hood.bg }}
                      >
                        <Icon size={18} color={hood.accent} />
                      </span>
                      <div>
                        <h2
                          className="font-extrabold text-lg leading-tight"
                          style={{ fontFamily: "Nunito, sans-serif", color: "#0F172A" }}
                        >
                          {hood.name}
                        </h2>
                        <p
                          className="text-xs"
                          style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}
                        >
                          {hood.subtitle} · {hood.borough}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                      style={{ background: hood.bg, color: hood.accent, fontFamily: "Inter, sans-serif" }}
                    >
                      {hood.tag}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#475569", fontFamily: "Inter, sans-serif" }}
                  >
                    {hood.description}
                  </p>

                  {/* Filipino Presence */}
                  <div className="rounded-xl p-4" style={{ background: hood.bg }}>
                    <p
                      className="inline-flex items-center gap-1.5 text-xs font-semibold mb-1"
                      style={{ color: hood.accent, fontFamily: "Inter, sans-serif" }}
                    >
                      <FiFlag size={11} />
                      Filipino Community Presence
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#475569", fontFamily: "Inter, sans-serif" }}
                    >
                      {hood.filipinoPresence}
                    </p>
                  </div>

                  {/* Key spots */}
                  <div>
                    <p
                      className="text-xs font-semibold mb-2 flex items-center gap-1.5"
                      style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}
                    >
                      <FiMapPin size={10} />
                      KEY SPOTS
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {hood.keySpots.map((spot) => (
                        <span
                          key={spot}
                          className="text-xs px-2.5 py-1 rounded-lg border"
                          style={{
                            borderColor: "#E2E8F0",
                            color: "#475569",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {spot}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={hood.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl text-white transition-all hover:opacity-90 active:scale-95 self-start mt-1"
                    style={{ backgroundColor: hood.accent, fontFamily: "Inter, sans-serif" }}
                  >
                    View on Google Maps
                    <FiExternalLink size={13} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to map */}
        <div className="mt-12 text-center">
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
