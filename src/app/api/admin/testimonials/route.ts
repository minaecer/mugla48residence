import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fail, requireStr, isResponse, clampInt, str } from "@/lib/validation";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(testimonials);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  try {
    const body = await request.json();

    const name = requireStr(body.name, "Ad", 2, 100);
    if (isResponse(name)) return name;

    const role = requireStr(body.role, "Rol", 2, 100);
    if (isResponse(role)) return role;

    const text = requireStr(body.text, "Yorum", 5, 2000);
    if (isResponse(text)) return text;

    const rating = clampInt(body.rating, 1, 5, 5);

    const testimonial = await prisma.testimonial.create({
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

    return NextResponse.json(testimonial, { status: 201 });
  } catch {
    return fail("İstek işlenemedi.");
  }
}
