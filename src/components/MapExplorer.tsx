"use client";

import L from "leaflet";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import {
  FiExternalLink,
  FiGrid,
  FiMapPin,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";
import { MdRestaurant } from "react-icons/md";
import type { Place } from "@/types/place";

type Props = {
  places: Place[];
  activeCategory?: "all" | Place["category"];
  center?: { lat: number; lng: number };
  zoom?: number;
};

const NYC_CENTER: [number, number] = [40.7128, -74.006];
const NYC_BOUNDS: L.LatLngBoundsExpression = [
  [40.4774, -74.2591],
  [40.9176, -73.7004],
];

const categoryColors: Record<Place["category"], string> = {
  food: "#F59E0B",
  grocery: "#2E8B57",
  community: "#1E3A8A",
  neighborhood: "#38BDF8",
};

const categoryLabels: Record<Place["category"], string> = {
  food: "Restaurant",
  grocery: "Grocery",
  community: "Community",
  neighborhood: "Neighborhood",
};

function CategoryIcon({ category, size = 14 }: { category: Place["category"]; size?: number }) {
  const props = { size, color: "#ffffff" };

  switch (category) {
    case "food":
      return <MdRestaurant {...props} />;
    case "grocery":
      return <FiShoppingCart {...props} />;
    case "community":
      return <FiUsers {...props} />;
    default:
      return <FiGrid {...props} />;
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createMarkerIcon(place: Place, isOverview: boolean) {
  const color = categoryColors[place.category];
  const isNeighborhoodAnchor = place.category === "neighborhood";
  const markerSize = isNeighborhoodAnchor ? 42 : isOverview ? 24 : 32;
  const dotSize = isNeighborhoodAnchor ? 12 : isOverview ? 7 : 9;
  const dotOffset = (markerSize - dotSize - 6) / 2;
  const iconWidth = isNeighborhoodAnchor ? 190 : markerSize;
  const iconHeight = isNeighborhoodAnchor ? 58 : markerSize + 8;
  const iconAnchor: L.PointExpression = isNeighborhoodAnchor
    ? [21, markerSize + 6]
    : [markerSize / 2, markerSize + 4];
  const popupAnchor: L.PointExpression = [0, -(markerSize + 2)];
  const label = isNeighborhoodAnchor
    ? `
        <span
          style="
            margin-left:8px;
            max-width:136px;
            padding:4px 8px;
            border-radius:999px;
            background:#ffffff;
            border:1px solid #D8E3EA;
            box-shadow:0 4px 12px rgba(15,23,42,0.16);
            color:#0F172A;
            font-family:Inter, sans-serif;
            font-size:11px;
            font-weight:800;
            line-height:1.1;
            white-space:normal;
          "
        >
          ${escapeHtml(place.name)}
        </span>
      `
    : "";

  return L.divIcon({
    className: "kababayan-leaflet-marker",
    iconSize: [iconWidth, iconHeight],
    iconAnchor,
    popupAnchor,
    html: `
      <span style="display:flex; align-items:center;">
        <span
          style="
            display:block;
            width:${markerSize}px;
            height:${markerSize}px;
            border-radius:50% 50% 50% 0;
            background:${color};
            border:${isNeighborhoodAnchor ? 3 : 2}px solid #ffffff;
            box-shadow:0 ${isNeighborhoodAnchor ? 5 : 3}px ${isNeighborhoodAnchor ? 15 : 9}px rgba(15,23,42,0.28);
            transform:rotate(-45deg);
            position:relative;
            flex:0 0 auto;
            opacity:${isOverview && !isNeighborhoodAnchor ? 0.86 : 1};
            z-index:${isNeighborhoodAnchor ? 2 : 1};
          "
        >
          <span
            style="
              position:absolute;
              width:${dotSize}px;
              height:${dotSize}px;
              border-radius:999px;
              background:#ffffff;
              left:${dotOffset}px;
              top:${dotOffset}px;
            "
          ></span>
        </span>
        ${label}
      </span>
    `,
  });
}

function FitMapToPlaces({ places }: { places: Place[] }) {
  const map = useMap();

  useEffect(() => {
    if (places.length === 0) {
      map.fitBounds(NYC_BOUNDS, { padding: [24, 24] });
      return;
    }

    const bounds = L.latLngBounds(
      places.map((place) => [place.latitude, place.longitude] as [number, number]),
    );

    map.fitBounds(bounds, { padding: [64, 64], maxZoom: 15 });
  }, [map, places]);

  return null;
}

function ResizeAwareMap() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize({ animate: true });
    });

    resizeObserver.observe(container);

    const timeouts = [120, 320, 520].map((delay) =>
      window.setTimeout(() => map.invalidateSize({ animate: true }), delay),
    );

    return () => {
      resizeObserver.disconnect();
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [map]);

  return null;
}

function compactText(value: string, maxLength = 150) {
  if (value.length <= maxLength) return value;

  const trimmed = value.slice(0, maxLength).trim();
  return `${trimmed.slice(0, trimmed.lastIndexOf(" "))}...`;
}

function PlaceCloud({ place, onClose }: { place: Place; onClose: () => void }) {
  const isNeighborhood = place.category === "neighborhood";
  const accent = categoryColors[place.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.86, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 14 }}
      transition={{ type: "spring", stiffness: 360, damping: 28, mass: 0.9 }}
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
      onTouchStart={(event) => event.stopPropagation()}
      style={{
        width: 310,
        maxWidth: "min(310px, calc(100vw - 64px))",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          borderRadius: "34px 38px 32px 36px / 34px 32px 38px 30px",
          background:
            "radial-gradient(circle at 17% 12%, #ffffff 0 19%, transparent 20%), radial-gradient(circle at 82% 14%, #ffffff 0 16%, transparent 17%), radial-gradient(circle at 94% 47%, #ffffff 0 13%, transparent 14%), radial-gradient(circle at 22% 94%, #ffffff 0 18%, transparent 19%), #ffffff",
          border: "1px solid rgba(216,227,234,0.95)",
          boxShadow: "0 18px 42px rgba(15,23,42,0.2)",
          color: "#0F172A",
          fontFamily: "Inter, sans-serif",
          position: "relative",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 62,
            bottom: -13,
            width: 30,
            height: 30,
            background: "#ffffff",
            borderRight: "1px solid rgba(216,227,234,0.95)",
            borderBottom: "1px solid rgba(216,227,234,0.95)",
            transform: "rotate(45deg)",
            borderRadius: "0 0 9px 0",
            boxShadow: "9px 9px 18px rgba(15,23,42,0.08)",
            zIndex: -1,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderTop: `6px solid ${accent}`,
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        />
        <div style={{ padding: "18px 18px 18px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: accent,
                flexShrink: 0,
              }}
            >
              <CategoryIcon category={place.category} size={13} />
            </span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p
                style={{
                  color: "#0F172A",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: 14,
                  fontWeight: 900,
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                {place.name}
              </p>
              <p
                style={{
                  color: "#94A3B8",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  margin: "4px 0 0",
                  textTransform: "uppercase",
                }}
              >
                {place.subtitle ?? categoryLabels[place.category]}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close location details"
              onClick={onClose}
              style={{
                width: 24,
                height: 24,
                borderRadius: 999,
                border: "1px solid #E2E8F0",
                background: "#F8FAFC",
                color: "#475569",
                cursor: "pointer",
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {place.tag && (
            <span
              style={{
                display: "inline-flex",
                borderRadius: 999,
                background: "#EFF6FF",
                color: "#1E3A8A",
                fontSize: 10,
                fontWeight: 800,
                padding: "3px 7px",
                marginTop: 8,
              }}
            >
              {place.tag}
            </span>
          )}

          {place.filipinoPresence && (
            <div
              style={{
                borderRadius: 10,
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                padding: "6px 8px",
                marginTop: 8,
              }}
            >
              <p
                style={{
                  color: "#0F172A",
                  fontSize: 9,
                  fontWeight: 900,
                  margin: "0 0 3px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Community Presence
              </p>
              <p style={{ color: "#475569", fontSize: 10, lineHeight: 1.35, margin: 0 }}>
                {compactText(place.filipinoPresence, 90)}
              </p>
            </div>
          )}

          {place.keySpots && place.keySpots.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <p
                style={{
                  color: "#94A3B8",
                  fontSize: 10,
                  fontWeight: 900,
                  margin: "0 0 6px",
                  textTransform: "uppercase",
                }}
              >
                Key Spots
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {place.keySpots.slice(0, 4).map((spot) => (
                  <span
                    key={spot}
                    style={{
                      border: "1px solid #E2E8F0",
                      borderRadius: 999,
                      color: "#475569",
                      background: "#ffffff",
                      fontSize: 10,
                      fontWeight: 800,
                      padding: "4px 7px",
                    }}
                  >
                    {spot}
                  </span>
                ))}
              </div>
            </div>
          )}

          <a
            href={place.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 11,
              fontWeight: 800,
              color: "#ffffff",
              background: "#3f7366",
              padding: "7px 11px",
              borderRadius: 10,
              textDecoration: "none",
              marginTop: 10,
            }}
          >
            Open in Google Maps
            <FiExternalLink size={10} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function MapDismissHandler({ onDismiss }: { onDismiss: () => void }) {
  useMapEvents({
    click: onDismiss,
    dragstart: onDismiss,
  });

  return null;
}

function SelectedPlaceOverlayContent({
  place,
  onClose,
}: {
  place: Place;
  onClose: () => void;
}) {
  const map = useMap();
  const [position, setPosition] = useState<L.Point | null>(null);
  const cloudWidth = 310;
  const cloudHeight = place.category === "neighborhood" ? 430 : 260;
  const markerGap = place.category === "neighborhood" ? 74 : 58;

  useEffect(() => {
    const latLng = L.latLng(place.latitude, place.longitude);
    const markerPoint = map.latLngToContainerPoint(latLng);
    const size = map.getSize();
    const margin = 28;

    const desiredMarkerX = Math.min(
      Math.max(markerPoint.x, cloudWidth / 2 + margin),
      size.x - cloudWidth / 2 - margin,
    );
    const desiredMarkerY = Math.min(
      Math.max(markerPoint.y, cloudHeight + markerGap + margin),
      size.y - margin,
    );

    const panX = markerPoint.x - desiredMarkerX;
    const panY = markerPoint.y - desiredMarkerY;

    if (Math.abs(panX) < 4 && Math.abs(panY) < 4) return;

    // Convert delta to a target center in geographic coords instead of using panBy,
    // then clamp within NYC bounds — prevents Leaflet from fighting maxBounds and springing back.
    const centerPx = map.latLngToContainerPoint(map.getCenter());
    const newCenterLatLng = map.containerPointToLatLng(
      L.point(centerPx.x - panX, centerPx.y - panY),
    );

    const lat = Math.max(40.4774, Math.min(40.9176, newCenterLatLng.lat));
    const lng = Math.max(-74.2591, Math.min(-73.7004, newCenterLatLng.lng));

    map.panTo([lat, lng], { animate: true, duration: 0.45, easeLinearity: 0.2 });
  }, [cloudHeight, map, markerGap, place]);

  useEffect(() => {
    const updatePosition = () => {
      const point = map.latLngToContainerPoint([place.latitude, place.longitude]);
      setPosition(point);
    };

    updatePosition();
    map.on("move zoom resize", updatePosition);

    return () => {
      map.off("move zoom resize", updatePosition);
    };
  }, [map, place]);

  if (!position) return null;

  return (
    <div className="leaflet-pane leaflet-tooltip-pane" style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          transform: `translate(-50%, calc(-100% - ${markerGap}px))`,
          zIndex: 900,
          pointerEvents: "none",
        }}
      >
        <AnimatePresence mode="wait">
          <PlaceCloud key={place.id} place={place} onClose={onClose} />
        </AnimatePresence>
      </div>
    </div>
  );
}

function SelectedPlaceOverlay({
  place,
  onClose,
}: {
  place: Place | null;
  onClose: () => void;
}) {
  if (!place) return null;

  return <SelectedPlaceOverlayContent place={place} onClose={onClose} />;
}

export default function MapExplorer({ places, activeCategory = "all", center, zoom = 11 }: Props) {
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const defaultCenter: [number, number] = center ? [center.lat, center.lng] : NYC_CENTER;
  const isOverview = activeCategory === "all";
  const selectedPlace = places.find((place) => place.id === selectedPlaceId) ?? null;
  const markerIcons = useMemo(
    () =>
      places.reduce<Record<number, L.DivIcon>>((icons, place) => {
        icons[place.id] = createMarkerIcon(place, isOverview);
        return icons;
      }, {}),
    [places, isOverview],
  );

  return (
    <MapContainer
      center={defaultCenter}
      zoom={zoom}
      minZoom={10}
      maxBounds={NYC_BOUNDS}
      maxBoundsViscosity={0.65}
      scrollWheelZoom
      style={{ width: "100%", height: "100%", background: "#F8FAFC" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ResizeAwareMap />
      <MapDismissHandler onDismiss={() => setSelectedPlaceId(null)} />
      <FitMapToPlaces places={places} />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          icon={markerIcons[place.id]}
          title={place.name}
          zIndexOffset={place.category === "neighborhood" ? 1000 : 0}
          eventHandlers={{
            click: (event) => {
              event.originalEvent.stopPropagation();
              setSelectedPlaceId(place.id);
            },
          }}
        />
      ))}

      <SelectedPlaceOverlay place={selectedPlace} onClose={() => setSelectedPlaceId(null)} />

      {places.length === 0 && (
        <div className="leaflet-top leaflet-left">
          <div
            className="leaflet-control"
            style={{
              margin: 12,
              borderRadius: 8,
              background: "#ffffff",
              border: "1px solid #E2E8F0",
              color: "#475569",
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              padding: "8px 10px",
              boxShadow: "0 6px 18px rgba(15,23,42,0.12)",
            }}
          >
            <FiMapPin size={13} style={{ display: "inline", marginRight: 5 }} />
            No locations match this filter
          </div>
        </div>
      )}
    </MapContainer>
  );
}
