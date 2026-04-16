import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { fail, requireStr, validEmail, validRole, isResponse } from "@/lib/validation";

export async function GET() {
  const session = await auth();
  if (!session?.user) return fail("Unauthorized", 401);
  if (session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return fail("Unauthorized", 401);
  if (session.user.role !== "ADMIN") return fail("Forbidden", 403);

  try {
    const body = await request.json();

    const name = requireStr(body.name, "Ad", 2, 100);
    if (isResponse(name)) return name;

    const email = validEmail(body.email);
    if (!email) return fail("Geçerli bir e-posta adresi giriniz.");

    const password = requireStr(body.password, "Şifre", 8, 128);
    if (isResponse(password)) return password;

    const role = validRole(body.role) || "EDITOR";

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, passwordHash, role },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return fail("İstek işlenemedi.");
  }
}
