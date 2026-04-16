import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fail, requireStr, isResponse, clampInt, str } from "@/lib/validation";

function parseId(id: string) {
  const n = parseInt(id, 10);
  return isNaN(n) || n <= 0 ? null : n;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const numId = parseId((await params).id);
  if (!numId) return fail("Invalid ID");

  const image = await prisma.galleryImage.findUnique({
    where: { id: numId },
    include: { apartment: true },
  });

  if (!image) return fail("Not found", 404);
  return NextResponse.json(image);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const numId = parseId((await params).id);
  if (!numId) return fail("Invalid ID");

  try {
    const body = await request.json();

    const title = requireStr(body.title, "Başlık", 1, 200);
    if (isResponse(title)) return title;

    const category = requireStr(body.category, "Kategori", 1, 100);
    if (isResponse(category)) return category;

    const imageUrl = requireStr(body.imageUrl, "Görsel URL", 1, 1000);
    if (isResponse(imageUrl)) return imageUrl;

    const apartmentIdVal = body.apartmentId ? parseInt(body.apartmentId, 10) : null;

    const image = await prisma.galleryImage.update({
      where: { id: numId },
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

    return NextResponse.json(image);
  } catch {
    return fail("İstek işlenemedi.");
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const numId = parseId((await params).id);
  if (!numId) return fail("Invalid ID");

  await prisma.galleryImage.delete({ where: { id: numId } });
  return NextResponse.json({ success: true });
}
