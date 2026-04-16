import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fail } from "@/lib/validation";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const items = await prisma.siteContent.findMany();
  return NextResponse.json(items);
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  try {
    const body = await request.json();
    const items: { key: string; value: string }[] = body.items;

    if (!Array.isArray(items) || items.length === 0 || items.length > 100) {
      return fail("Geçersiz veri.");
    }

    for (const item of items) {
      if (typeof item.key !== "string" || item.key.length === 0 || item.key.length > 100) {
        return fail(`Geçersiz key: ${String(item.key).slice(0, 20)}`);
      }
      if (typeof item.value !== "string" || item.value.length > 100_000) {
        return fail(`Değer çok büyük: ${item.key}`);
      }
    }

    const results = await Promise.all(
      items.map((item) =>
        prisma.siteContent.upsert({
          where: { key: item.key },
          update: { value: item.value },
          create: { key: item.key, value: item.value },
        })
      )
    );

    return NextResponse.json(results);
  } catch {
    return fail("İstek işlenemedi.");
  }
}
