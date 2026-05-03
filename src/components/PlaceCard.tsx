import { FiMapPin, FiShoppingCart, FiUsers, FiGrid, FiExternalLink, FiMap } from "react-icons/fi";
import { MdRestaurant } from "react-icons/md";
import type { Place } from "@/types/place";

type Props = {
  place: Place;
  onViewMap?: (place: Place) => void;
};

const categoryConfig = {
  food: {
    label: "Restaurant",
    color: "#F59E0B",
    bg: "#FFFBEB",
    Icon: MdRestaurant,
  },
  grocery: {
    label: "Grocery",
    color: "#2E8B57",
    bg: "#DDF5E6",
    Icon: FiShoppingCart,
  },
  community: {
    label: "Community",
    color: "#1E3A8A",
    bg: "#EFF6FF",
    Icon: FiUsers,
  },
  neighborhood: {
    label: "Neighborhood",
    color: "#38BDF8",
    bg: "#F0F9FF",
    Icon: FiGrid,
  },
};

export default function PlaceCard({ place, onViewMap }: Props) {
  const config = categoryConfig[place.category];
  const { Icon } = config;

  return (
    <div
      className="place-card bg-white rounded-2xl p-5 border flex flex-col gap-3"
      style={{ borderColor: "#E2E8F0" }}
    >
      {/* Category badge */}
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ color: config.color, background: config.bg }}
        >
          <Icon size={12} />
          {config.label}
        </span>
        <span className="text-xs" style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}>
          {place.neighborhood}
        </span>
      </div>

      {/* Name */}
      <h3
        className="font-bold text-base leading-snug"
        style={{ color: "#0F172A", fontFamily: "Nunito, sans-serif" }}
      >
        {place.name}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "#475569", fontFamily: "Inter, sans-serif" }}
      >
        {place.description}
      </p>

      {/* Address */}
      <p
        className="text-xs flex items-start gap-1.5"
        style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}
      >
        <FiMapPin size={12} className="mt-0.5 shrink-0" />
        {place.address}
      </p>

      {/* Actions */}
      <div className="flex gap-2 mt-1">
        <a
          href={place.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "#3f7366", fontFamily: "Inter, sans-serif" }}
        >
          <FiExternalLink size={11} />
          Open in Maps
        </a>
        {onViewMap && (
          <button
            onClick={() => onViewMap(place)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 rounded-xl border transition-all hover:bg-[#F8FAFC] active:scale-95"
            style={{
              borderColor: "#E2E8F0",
              color: "#0F172A",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <FiMap size={11} />
            View on Map
          </button>
        )}
      </div>
    </div>
  );
}


