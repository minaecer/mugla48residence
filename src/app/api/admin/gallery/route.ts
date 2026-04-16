import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fail, requireStr, isResponse, clampInt, str } from "@/lib/validation";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const images = await prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
    include: { apartment: true },
  });

  return NextResponse.json(images);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  try {
    const body = await request.json();

    const title = requireStr(body.title, "Başlık", 1, 200);
    if (isResponse(title)) return title;

    const category = requireStr(body.category, "Kategori", 1, 100);
    if (isResponse(category)) return category;

    const imageUrl = requireStr(body.imageUrl, "Görsel URL", 1, 1000);
    if (isResponse(imageUrl)) return imageUrl;

    const apartmentIdVal = body.apartmentId ? parseInt(body.apartmentId, 10) : null;

    const image = await prisma.galleryImage.create({
      data: {
        title,
        category,
        imageUrl,
        order: clampInt(body.order, 0, 9999, 0),
        height: str(body.height, 20) || null,
        span: str(body.span, 100) || null,
        apartmentId: apartmentIdVal !== null && !isNaN(apartmentIdVal) && apartmentIdVal > 0 ? apartmentIdVal : null,
        isPublished: body.isPublished ?? true,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch {
    return fail("İstek işlenemedi.");
  }
}
