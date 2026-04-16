import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { fail, requireStr, validEmail, validRole, isResponse, str } from "@/lib/validation";

function parseId(id: string) {
  const n = parseInt(id, 10);
  return isNaN(n) || n <= 0 ? null : n;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return fail("Unauthorized", 401);
  if (session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const numId = parseId((await params).id);
  if (!numId) return fail("Invalid ID");

  const user = await prisma.user.findUnique({
    where: { id: numId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  if (!user) return fail("Not found", 404);
  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return fail("Unauthorized", 401);
  if (session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const numId = parseId((await params).id);
  if (!numId) return fail("Invalid ID");

  try {
    const body = await request.json();

    const name = requireStr(body.name, "Ad", 2, 100);
    if (isResponse(name)) return name;

    const email = validEmail(body.email);
    if (!email) return fail("Geçerli bir e-posta adresi giriniz.");

    const role = validRole(body.role);
    if (!role) return fail("Geçersiz rol. (ADMIN veya EDITOR)");

    const data: Record<string, unknown> = { name, email, role };

    const pw = str(body.password, 128);
    if (pw && pw.length >= 8) {
      data.passwordHash = await bcrypt.hash(pw, 12);
    }

    const user = await prisma.user.update({
      where: { id: numId },
      data,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json(user);
  } catch {
    return fail("İstek işlenemedi.");
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return fail("Unauthorized", 401);
  if (session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const numId = parseId((await params).id);
  if (!numId) return fail("Invalid ID");

  if (parseInt(session.user.id || "0", 10) === numId) {
    return fail("Kendi hesabınızı silemezsiniz.");
  }

  await prisma.user.delete({ where: { id: numId } });
  return NextResponse.json({ success: true });
}
