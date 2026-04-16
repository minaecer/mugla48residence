export type ApartmentData = {
  type: string;
  size: string;
  capacity: string;
  description: string;
  longDescription: string;
  rooms: { icon: string; label: string }[];
  kitchen: string[];
  bathroom: string[];
  general: string[];
  rentalSuitability: string[];
  images?: { imageUrl: string; alt: string }[];
};
