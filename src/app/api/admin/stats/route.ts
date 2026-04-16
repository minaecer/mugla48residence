import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [apartmentCount, newContactsCount, activeReservationsCount, testimonialCount] =
    await Promise.all([
      prisma.apartment.count(),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
      prisma.reservation.count({
        where: { status: { in: ["PENDING", "CONFIRMED"] } },
      }),
      prisma.testimonial.count(),
    ]);

  return NextResponse.json({
    apartments: apartmentCount,
    newContacts: newContactsCount,
    activeReservations: activeReservationsCount,
    testimonials: testimonialCount,
  });
}
