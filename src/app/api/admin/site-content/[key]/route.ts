import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fail } from "@/lib/validation";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const { key } = await params;
  if (!key || key.length > 100) return fail("Geçersiz key.");

  const item = await prisma.siteContent.findUnique({ where: { key } });
  if (!item) return fail("Not found", 404);
  return NextResponse.json(item);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  try {
    const { key } = await params;
    if (!key || key.length > 100) return fail("Geçersiz key.");

    const body = await request.json();

    if (typeof body.value !== "string" || body.value.length > 100_000) {
      return fail("Değer geçersiz veya çok büyük.");
    }

    const item = await prisma.siteContent.upsert({
      where: { key },
      update: { value: body.value },
      create: { key, value: body.value },
    });

    return NextResponse.json(item);
  } catch {
    return fail("İstek işlenemedi.");
  }
}
