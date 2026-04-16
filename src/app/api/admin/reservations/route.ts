import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fail, requireStr, validPhone, validEmail, validReservationStatus, isResponse, str } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];
  const where = status && validStatuses.includes(status) ? { status } : {};

  const reservations = await prisma.reservation.findMany({
    where,
    include: { apartment: true },
    orderBy: { checkIn: "desc" },
  });

  return NextResponse.json(reservations);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return fail("Forbidden", 403);

  try {
    const body = await request.json();

    const apartmentId = parseInt(String(body.apartmentId), 10);
    if (isNaN(apartmentId) || apartmentId <= 0) return fail("Geçerli bir daire seçiniz.");

    const apartment = await prisma.apartment.findUnique({ where: { id: apartmentId } });
    if (!apartment) return fail("Daire bulunamadı.", 404);

    const guestName = requireStr(body.guestName, "Misafir adı", 2, 100);
    if (isResponse(guestName)) return guestName;

    const guestPhone = validPhone(body.guestPhone);
    if (!guestPhone) return fail("Geçerli bir telefon numarası giriniz.");

    const guestEmail = validEmail(body.guestEmail);

    const checkIn = new Date(body.checkIn);
    const checkOut = new Date(body.checkOut);
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) return fail("Geçersiz tarih.");
    if (checkIn >= checkOut) return fail("Giriş tarihi çıkış tarihinden önce olmalıdır.");

    const status = validReservationStatus(body.status) || "PENDING";

    const totalPrice = body.totalPrice ? parseFloat(body.totalPrice) : null;
    if (totalPrice !== null && (isNaN(totalPrice) || totalPrice < 0 || totalPrice > 9999999)) {
      return fail("Geçersiz fiyat.");
    }

    const reservation = await prisma.reservation.create({
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

    return NextResponse.json(reservation, { status: 201 });
  } catch {
    return fail("İstek işlenemedi.");
  }
}
