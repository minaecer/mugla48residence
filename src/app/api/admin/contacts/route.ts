import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const where = status ? { status } : {};

  const contacts = await prisma.contactSubmission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(contacts);
}
