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

  const testimonial = await prisma.testimonial.findUnique({ where: { id: numId } });
  if (!testimonial) return fail("Not found", 404);
  return NextResponse.json(testimonial);
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

    const name = requireStr(body.name, "Ad", 2, 100);
    if (isResponse(name)) return name;

    const role = requireStr(body.role, "Rol", 2, 100);
    if (isResponse(role)) return role;

    const text = requireStr(body.text, "Yorum", 5, 2000);
    if (isResponse(text)) return text;

    const rating = clampInt(body.rating, 1, 5, 5);

    const testimonial = await prisma.testimonial.update({
      where: { id: numId },
      data: {
        name,
        role,
        rating,
        text,
        theme: str(body.theme, 50) || null,
        isPublished: body.isPublished ?? true,
        order: clampInt(body.order, 0, 9999, 0),
      },
    });

    return NextResponse.json(testimonial);
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

  await prisma.testimonial.delete({ where: { id: numId } });
  return NextResponse.json({ success: true });
}
