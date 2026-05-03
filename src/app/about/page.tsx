import Link from "next/link";
import {
  FiMap,
  FiGrid,
  FiMapPin,
  FiNavigation,
  FiHeart,
  FiDatabase,
  FiArrowRight,
} from "react-icons/fi";
import type { ElementType } from "react";

type FeatureItem = {
  Icon: ElementType;
  title: string;
  desc: string;
  accent: string;
  bg: string;
};

const features: FeatureItem[] = [
  {
    Icon: FiMap,
    title: "Interactive Map Explorer",
    desc: "Browse Filipino-related pins across NYC with category filters and clickable info cards.",
    accent: "#1E3A8A",
    bg: "#EFF6FF",
  },
  {
    Icon: FiGrid,
    title: "Neighborhood Guide",
    desc: "Understand which NYC neighborhoods have the strongest Filipino community presence.",
    accent: "#2E8B57",
    bg: "#DDF5E6",
  },
  {
    Icon: FiMapPin,
    title: "Curated Spots Directory",
    desc: "Browse hand-picked Filipino restaurants, grocery stores, and community centers.",
    accent: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    Icon: FiNavigation,
    title: "Google Maps Integration",
    desc: "Every location links directly to Google Maps for easy, real-time navigation.",
    accent: "#38BDF8",
    bg: "#F0F9FF",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-grid-texture min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: "#FFFBEB", color: "#F59E0B", fontFamily: "Inter, sans-serif" }}
          >
            Our Mission
          </span>
          <h1
            className="text-4xl font-extrabold leading-tight mb-4"
            style={{ fontFamily: "Nunito, sans-serif", color: "#0F172A" }}
          >
            About Kababayan NY
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "#475569", fontFamily: "Inter, sans-serif" }}
          >
            A digital guide built for Filipinos, by someone who understands what it means
            to look for a piece of home in a big city.
          </p>
        </div>

        {/* Mission card */}
        <div
          className="rounded-2xl p-8 mb-8 border"
          style={{ background: "#DDF5E6", borderColor: "#2E8B5733" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "#2E8B57" }}
            >
              <FiHeart size={18} color="#ffffff" />
            </span>
            <h2
              className="font-extrabold text-xl"
              style={{ fontFamily: "Nunito, sans-serif", color: "#0F172A" }}
            >
              Our Mission
            </h2>
          </div>
          <p
            className="text-base leading-relaxed"
            style={{ color: "#1F6F46", fontFamily: "Inter, sans-serif" }}
          >
            Kababayan NY exists to help Filipinos living in or visiting New York City feel
            less lost and more at home. By surfacing culturally relevant places from
            a bowl of sinigang to a community center that speaks your language we aim to
            make navigation and discovery more intuitive for every kababayan abroad.
          </p>
        </div>

        {/* What we offer */}
        <div className="mb-8">
          <h2
            className="font-extrabold text-2xl mb-6"
            style={{ fontFamily: "Nunito, sans-serif", color: "#0F172A" }}
          >
            What Kababayan NY Offers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((item) => {
              const { Icon } = item;
              return (
                <div
                  key={item.title}
                  className="place-card bg-white rounded-2xl p-5 border flex gap-4"
                  style={{ borderColor: "#E2E8F0" }}
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: item.bg }}
                  >
                    <Icon size={18} color={item.accent} />
                  </span>
                  <div>
                    <h3
                      className="font-bold text-sm mb-1"
                      style={{ color: "#0F172A", fontFamily: "Nunito, sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#475569", fontFamily: "Inter, sans-serif" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* About the data */}
        <div
          className="rounded-2xl p-6 mb-8 border flex gap-4 items-start"
          style={{ background: "#F8FAFC", borderColor: "#E2E8F0" }}
        >
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "#EFF6FF" }}
          >
            <FiDatabase size={18} color="#1E3A8A" />
          </span>
          <div>
            <h2
              className="font-extrabold text-lg mb-3"
              style={{ fontFamily: "Nunito, sans-serif", color: "#0F172A" }}
            >
              About Our Data
            </h2>
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: "#475569", fontFamily: "Inter, sans-serif" }}
            >
              Kababayan NY uses a curated static dataset rather than real-time or
              user-generated content. This ensures accuracy, simplicity, and a reliable
              experience. All locations are manually verified for cultural relevance to the
              Filipino community.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#475569", fontFamily: "Inter, sans-serif" }}
            >
              <strong style={{ color: "#0F172A" }}>Disclaimer:</strong> Business hours,
              availability, and locations may change. Always confirm details directly with
              the establishment before visiting.
            </p>
          </div>
        </div>

        {/* Community note */}
        <div
          className="rounded-2xl p-8 mb-10 text-center border"
          style={{ background: "#0F172A", borderColor: "#0F172A" }}
        >
          <p
            className="text-xl md:text-2xl mb-2 font-extrabold text-white leading-snug"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            &ldquo;Kahit saan ka man pumunta, hindi ka nag-iisa.&rdquo;
          </p>
          <p
            className="text-sm italic"
            style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}
          >
            &ldquo;Wherever you go, you are never alone.&rdquo;
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#2E8B57", fontFamily: "Inter, sans-serif" }}
          >
            Explore the Map
            <FiArrowRight size={13} />
          </Link>
          <Link
            href="/spots"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl border transition-all hover:bg-[#F8FAFC] active:scale-95"
            style={{ borderColor: "#E2E8F0", color: "#0F172A", fontFamily: "Inter, sans-serif" }}
          >
            Browse Filipino Spots
            <FiArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
