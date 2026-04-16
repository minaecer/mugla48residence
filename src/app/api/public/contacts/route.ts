import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limit: 5 submissions per hour per IP
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    const { name, phone, email, rentalType, apartmentType, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Ad Soyad alanı zorunludur." }, { status: 400 });
    }

    if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
      return NextResponse.json({ error: "Telefon alanı zorunludur." }, { status: 400 });
    }

    // Length limits
    if (name.trim().length > 100) {
      return NextResponse.json({ error: "Ad Soyad en fazla 100 karakter olabilir." }, { status: 400 });
    }
    if (phone.trim().length > 20) {
      return NextResponse.json({ error: "Telefon en fazla 20 karakter olabilir." }, { status: 400 });
    }
    if (email && (typeof email !== "string" || email.trim().length > 100)) {
      return NextResponse.json({ error: "E-posta en fazla 100 karakter olabilir." }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      return NextResponse.json({ error: "Geçersiz e-posta formatı." }, { status: 400 });
    }
    if (message && (typeof message !== "string" || message.trim().length > 2000)) {
      return NextResponse.json({ error: "Mesaj en fazla 2000 karakter olabilir." }, { status: 400 });
    }
    if (rentalType && (typeof rentalType !== "string" || rentalType.trim().length > 50)) {
      return NextResponse.json({ error: "Kiralama türü en fazla 50 karakter olabilir." }, { status: 400 });
    }
    if (apartmentType && (typeof apartmentType !== "string" || apartmentType.trim().length > 50)) {
      return NextResponse.json({ error: "Daire tipi en fazla 50 karakter olabilir." }, { status: 400 });
    }

    // Phone format check
    if (!/^[0-9+\-\s()]{7,20}$/.test(phone.trim())) {
      return NextResponse.json({ error: "Geçersiz telefon numarası." }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        rentalType: rentalType?.trim() || null,
        apartmentType: apartmentType?.trim() || null,
        message: message?.trim() || null,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
