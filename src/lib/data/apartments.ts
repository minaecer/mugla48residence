import { prisma } from "@/lib/prisma";
import { parseJSON } from "@/lib/json";
import type { ApartmentData } from "@/lib/types";

export async function getPublishedApartments() {
  const apartments = await prisma.apartment.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  return apartments.map((apt) => ({
    slug: apt.slug,
    type: apt.type,
    size: apt.size,
    capacity: apt.capacity,
    description: apt.description,
    longDescription: apt.longDescription,
    features: parseJSON<string[]>(apt.features, []),
    accent: apt.accent,
    rooms: parseJSON<{ icon: string; label: string }[]>(apt.rooms, []),
    kitchen: parseJSON<string[]>(apt.kitchen, []),
    bathroom: parseJSON<string[]>(apt.bathroom, []),
    general: parseJSON<string[]>(apt.general, []),
    rentalSuitability: parseJSON<string[]>(apt.rentalSuitability, []),
  }));
}

export async function getApartmentBySlug(
  slug: string
): Promise<ApartmentData | null> {
  const apt = await prisma.apartment.findFirst({
    where: { slug, isPublished: true },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!apt) return null;

  return {
    type: apt.type,
    size: apt.size,
    capacity: apt.capacity,
    description: apt.description,
    longDescription: apt.longDescription,
    rooms: parseJSON<{ icon: string; label: string }[]>(apt.rooms, []),
    kitchen: parseJSON<string[]>(apt.kitchen, []),
    bathroom: parseJSON<string[]>(apt.bathroom, []),
    general: parseJSON<string[]>(apt.general, []),
    rentalSuitability: parseJSON<string[]>(apt.rentalSuitability, []),
    images: apt.images.map((img) => ({ imageUrl: img.imageUrl, alt: img.alt })),
  };
}
