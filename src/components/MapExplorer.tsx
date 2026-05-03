"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import {
  FiMapPin,
  FiShoppingCart,
  FiUsers,
  FiGrid,
  FiExternalLink,
} from "react-icons/fi";
import { MdRestaurant } from "react-icons/md";
import type { Place } from "@/types/place";

type Props = {
  places: Place[];
  center?: { lat: number; lng: number };
  zoom?: number;
};

const categoryColors: Record<string, string> = {
  food: "#F59E0B",
  grocery: "#2E8B57",
  community: "#1E3A8A",
  neighborhood: "#38BDF8",
};

const categoryLabels: Record<string, string> = {
  food: "Restaurant",
  grocery: "Grocery",
  community: "Community",
  neighborhood: "Neighborhood",
};

function CategoryIcon({ category, size = 14 }: { category: string; size?: number }) {
  const props = { size, color: "#ffffff" };
  switch (category) {
    case "food": return <MdRestaurant {...props} />;
    case "grocery": return <FiShoppingCart {...props} />;
    case "community": return <FiUsers {...props} />;
    default: return <FiGrid {...props} />;
  }
}

function CustomPin({ category }: { category: string }) {
  const color = categoryColors[category] ?? "#2E8B57";
  return (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: "50% 50% 50% 0",
        transform: "rotate(-45deg)",
        backgroundColor: color,
        border: "2.5px solid white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.22)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ transform: "rotate(45deg)", display: "flex" }}>
        <CategoryIcon category={category} size={14} />
      </span>
    </div>
  );
}

export default function MapExplorer({ places, center, zoom = 13 }: Props) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const defaultCenter = center ?? { lat: 40.7455, lng: -73.9009 };

  if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-3"
        style={{ background: "#F8FAFC" }}
      >
        <FiMapPin size={32} color="#94A3B8" />
        <p
          style={{
            color: "#475569",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          Map requires a Google Maps API key
        </p>
        <p style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif", fontSize: 12 }}>
          Add your key to <code>.env.local</code> as{" "}
          <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        mapId="kababayan-ny-map"
        defaultCenter={defaultCenter}
        defaultZoom={zoom}
        gestureHandling="greedy"
        disableDefaultUI={false}
        style={{ width: "100%", height: "100%" }}
      >
        {places.map((place) => (
          <AdvancedMarker
            key={place.id}
            position={{ lat: place.latitude, lng: place.longitude }}
            onClick={() => setSelectedPlace(place)}
            title={place.name}
          >
            <CustomPin category={place.category} />
          </AdvancedMarker>
        ))}

        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.latitude,
              lng: selectedPlace.longitude,
            }}
            onCloseClick={() => setSelectedPlace(null)}
            pixelOffset={[0, -44]}
          >
            <div style={{ fontFamily: "Inter, sans-serif", maxWidth: 220, padding: "4px 2px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    backgroundColor: categoryColors[selectedPlace.category],
                    flexShrink: 0,
                  }}
                >
                  <CategoryIcon category={selectedPlace.category} size={11} />
                </span>
                <p
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#0F172A",
                    margin: 0,
                  }}
                >
                  {selectedPlace.name}
                </p>
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: "#94A3B8",
                  marginBottom: 4,
                  margin: "0 0 6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  fontWeight: 600,
                }}
              >
                {categoryLabels[selectedPlace.category]}
              </p>
              <p
                style={{ fontSize: 12, color: "#475569", marginBottom: 8, lineHeight: 1.5 }}
              >
                {selectedPlace.description}
              </p>
              <a
                href={selectedPlace.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#ffffff",
                  background: "#2E8B57",
                  padding: "6px 12px",
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                Open in Google Maps
                <FiExternalLink size={11} />
              </a>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}


