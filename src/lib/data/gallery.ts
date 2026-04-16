import { prisma } from "@/lib/prisma";

export async function getPublishedGalleryImages(category?: string) {
  const where: { isPublished: boolean; category?: string } = {
    isPublished: true,
  };
  if (category && category !== "Tümü") {
    where.category = category;
  }

  const images = await prisma.galleryImage.findMany({
    where,
    orderBy: { order: "asc" },
  });

  return images.map((img) => ({
    title: img.title,
    category: img.category,
    imageUrl: img.imageUrl,
    height: img.height ?? undefined,
    span: img.span ?? undefined,
  }));
}

export async function getHomepageGalleryItems() {
  const images = await prisma.galleryImage.findMany({
    where: {
      isPublished: true,
      span: { not: null },
    },
    orderBy: { order: "asc" },
  });

  return images.map((img) => ({
    title: img.title,
    category: img.category,
    imageUrl: img.imageUrl,
    span: img.span ?? "",
  }));
}
