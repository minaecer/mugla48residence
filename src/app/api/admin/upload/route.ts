import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadObject, publicUrl } from "@/lib/s3";
import crypto from "crypto";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const MAGIC_BYTES: Record<string, number[][]> = {
  "image/jpeg": [[0xFF, 0xD8, 0xFF]],
  "image/png": [[0x89, 0x50, 0x4E, 0x47]],
  "image/webp": [[0x52, 0x49, 0x46, 0x46]],
};

function validateMagicBytes(buffer: Buffer, mimeType: string): boolean {
  const signatures = MAGIC_BYTES[mimeType];
  if (!signatures) return false;
  return signatures.some((sig) => sig.every((byte, i) => buffer[i] === byte));
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type. Allowed: JPEG, PNG, WebP" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large. Maximum 5MB allowed" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (!validateMagicBytes(buffer, file.type)) {
    return NextResponse.json({ error: "File content does not match declared type" }, { status: 400 });
  }

  const ext = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[file.type] || "jpg";
  const key = `uploads/${crypto.randomUUID()}.${ext}`;

  try {
    await uploadObject({ key, body: buffer, contentType: file.type });
  } catch (err) {
    console.error("MinIO upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  return NextResponse.json({ url: publicUrl(key) });
}
