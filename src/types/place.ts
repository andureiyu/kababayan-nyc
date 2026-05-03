export type Place = {
  id: number;
  name: string;
  category: "food" | "grocery" | "community" | "neighborhood";
  neighborhood: string;
  latitude: number;
  longitude: number;
  description: string;
  subtitle?: string;
  filipinoPresence?: string;
  keySpots?: string[];
  tag?: string;
  address: string;
  mapsUrl: string;
};
