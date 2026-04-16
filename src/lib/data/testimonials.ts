import { prisma } from "@/lib/prisma";

export async function getPublishedTestimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  return testimonials.map((t) => ({
    name: t.name,
    role: t.role,
    rating: t.rating,
    text: t.text,
    theme: t.theme ?? undefined,
  }));
}
