import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || "http://92.249.61.70:3048";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/galeri`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/kvkk`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/gizlilik`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/cerez`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  let apartmentPages: MetadataRoute.Sitemap = [];
  try {
    const apartments = await prisma.apartment.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
    apartmentPages = apartments.map((apt) => ({
      url: `${baseUrl}/daireler/${apt.slug}`,
      lastModified: apt.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
  } catch {
    // DB unavailable, skip dynamic pages
  }

  return [...staticPages, ...apartmentPages];
}
