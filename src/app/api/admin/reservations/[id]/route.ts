import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fail, requireStr, validPhone, validEmail, validReservationStatus, isResponse, str } from "@/lib/validation";

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

  const reservation = await prisma.reservation.findUnique({
    where: { id: numId },
    include: { apartment: true },
  });

  if (!reservation) return fail("Not found", 404);
  return NextResponse.json(reservation);
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

    const apartmentId = parseInt(String(body.apartmentId), 10);
    if (isNaN(apartmentId) || apartmentId <= 0) return fail("Geçerli bir daire seçiniz.");

    const guestName = requireStr(body.guestName, "Misafir adı", 2, 100);
    if (isResponse(guestName)) return guestName;

    const guestPhone = validPhone(body.guestPhone);
    if (!guestPhone) return fail("Geçerli bir telefon numarası giriniz.");

    const guestEmail = validEmail(body.guestEmail);

    const checkIn = new Date(body.checkIn);
    const checkOut = new Date(body.checkOut);
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) return fail("Geçersiz tarih.");
    if (checkIn >= checkOut) return fail("Giriş tarihi çıkış tarihinden önce olmalıdır.");

    const status = validReservationStatus(body.status);
    if (!status) return fail("Geçersiz durum.");

    const totalPrice = body.totalPrice ? parseFloat(body.totalPrice) : null;
    if (totalPrice !== null && (isNaN(totalPrice) || totalPrice < 0 || totalPrice > 9999999)) {
      return fail("Geçersiz fiyat.");
    }

    const reservation = await prisma.reservation.update({
      where: { id: numId },
      data: {
        apartmentId,
        guestName,
        guestPhone,
        guestEmail: guestEmail || null,
        checkIn,
        checkOut,
        status,
        rentalType: str(body.rentalType, 50) || null,
        notes: str(body.notes, 2000) || null,
        totalPrice,
      },
    });

    return NextResponse.json(reservation);
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

  await prisma.reservation.delete({ where: { id: numId } });
  return NextResponse.json({ success: true });
}
