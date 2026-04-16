import { NextResponse } from "next/server";

export function fail(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

export function str(v: unknown, max = 500): string | null {
  if (v === undefined || v === null) return null;
  if (typeof v !== "string") return null;
  return v.trim().slice(0, max) || null;
}

export function requireStr(v: unknown, field: string, min = 1, max = 500): string | NextResponse {
  const s = str(v, max);
  if (!s || s.length < min) return fail(`${field} gerekli (min ${min}, max ${max} karakter).`);
  return s;
}

export function validEmail(v: unknown): string | null {
  const s = str(v, 254);
  if (!s) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)) return null;
  return s;
}

export function validSlug(v: unknown): string | null {
  const s = str(v, 100);
  if (!s) return null;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)) return null;
  return s;
}

export function validPhone(v: unknown): string | null {
  const s = str(v, 20);
  if (!s) return null;
  if (!/^[0-9+\-\s()]{7,20}$/.test(s)) return null;
  return s;
}

export function clampInt(v: unknown, min: number, max: number, fallback: number): number {
  const n = parseInt(String(v), 10);
  if (isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

export function isResponse(v: unknown): v is NextResponse {
  return v instanceof NextResponse;
}

const VALID_ROLES = ["ADMIN", "EDITOR"] as const;
export function validRole(v: unknown): string | null {
  const s = str(v, 20);
  if (!s) return null;
  return VALID_ROLES.includes(s as (typeof VALID_ROLES)[number]) ? s : null;
}

const VALID_CONTACT_STATUSES = ["NEW", "READ", "REPLIED", "ARCHIVED"] as const;
export function validContactStatus(v: unknown): string | null {
  const s = str(v, 20);
  if (!s) return null;
  return VALID_CONTACT_STATUSES.includes(s as (typeof VALID_CONTACT_STATUSES)[number]) ? s : null;
}

const VALID_RESERVATION_STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"] as const;
export function validReservationStatus(v: unknown): string | null {
  const s = str(v, 20);
  if (!s) return null;
  return VALID_RESERVATION_STATUSES.includes(s as (typeof VALID_RESERVATION_STATUSES)[number]) ? s : null;
}
