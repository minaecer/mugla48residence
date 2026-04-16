import { prisma } from "@/lib/prisma";

export async function getSiteContent(key: string): Promise<string | null> {
  const entry = await prisma.siteContent.findUnique({ where: { key } });
  return entry?.value ?? null;
}

export async function getAllSiteContent(): Promise<Record<string, string>> {
  const entries = await prisma.siteContent.findMany();
  const result: Record<string, string> = {};
  for (const entry of entries) {
    result[entry.key] = entry.value;
  }
  return result;
}
