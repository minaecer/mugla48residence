import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fail, requireStr, validSlug, isResponse, clampInt } from "@/lib/validation";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const apartments = await prisma.apartment.findMany({
    orderBy: { order: "asc" },
    include: { images: true },
  });

  return NextResponse.json(apartments);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  try {
    const body = await request.json();

    const slug = validSlug(body.slug);
    if (!slug) return fail("Slug gerekli ve sadece küçük harf, rakam, tire içerebilir.");

    const type = requireStr(body.type, "Tip", 1, 100);
    if (isResponse(type)) return type;

    const size = requireStr(body.size, "Boyut", 1, 50);
    if (isResponse(size)) return size;

    const capacity = requireStr(body.capacity, "Kapasite", 1, 50);
    if (isResponse(capacity)) return capacity;

    const description = requireStr(body.description, "Açıklama", 10, 500);
    if (isResponse(description)) return description;

    const longDescription = requireStr(body.longDescription, "Detaylı açıklama", 10, 5000);
    if (isResponse(longDescription)) return longDescription;

    const jsonFields = ["rooms", "kitchen", "bathroom", "general", "rentalSuitability", "features"] as const;
    const data: Record<string, unknown> = {
      slug, type, size, capacity, description, longDescription,
      accent: (typeof body.accent === "string" ? body.accent.slice(0, 100) : "blue"),
      isPublished: body.isPublished ?? true,
      order: clampInt(body.order, 0, 9999, 0),
    };

    for (const field of jsonFields) {
      data[field] = Array.isArray(body[field]) ? JSON.stringify(body[field]) : (body[field] || "[]");
    }

    const apartment = await prisma.apartment.create({ data: data as any });
    return NextResponse.json(apartment, { status: 201 });
  } catch {
    return fail("İstek işlenemedi.");
  }
}
