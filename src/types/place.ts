export type Place = {
  id: number;
  name: string;
  category: "food" | "grocery" | "community" | "neighborhood";
  neighborhood: string;
  latitude: number;
  longitude: number;
  description: string;
  address: string;
  mapsUrl: string;
};
