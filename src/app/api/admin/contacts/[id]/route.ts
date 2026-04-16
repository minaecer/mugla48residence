import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fail, validContactStatus, str } from "@/lib/validation";

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

  const contact = await prisma.contactSubmission.findUnique({ where: { id: numId } });
  if (!contact) return fail("Not found", 404);
  return NextResponse.json(contact);
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

    const status = validContactStatus(body.status);
    if (!status) return fail("Geçersiz durum. (NEW, READ, REPLIED, ARCHIVED)");

    const contact = await prisma.contactSubmission.update({
      where: { id: numId },
      data: {
        status,
        notes: str(body.notes, 2000) || null,
      },
    });

    return NextResponse.json(contact);
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

  await prisma.contactSubmission.delete({ where: { id: numId } });
  return NextResponse.json({ success: true });
}
