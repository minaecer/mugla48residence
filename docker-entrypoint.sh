#!/bin/sh
set -e

# Run migrations
if [ -n "$DATABASE_URL" ]; then
  echo "→ Running Prisma migrations..."
  npx prisma migrate deploy || {
    echo "  migrate deploy failed, falling back to db push..."
    npx prisma db push --skip-generate
  }
fi

# Seed (idempotent — upserts handle re-runs)
echo "→ Seeding database..."
npx prisma db seed || echo "  ⚠ Seed failed (may be OK if already seeded)"

# Upload media to MinIO if configured
if [ -n "$S3_BUCKET" ] && [ -f "scripts/upload-media.ts" ]; then
  echo "→ Syncing media to MinIO..."
  npx tsx scripts/upload-media.ts || echo "  ⚠ Media sync failed"
fi

echo "→ Starting server..."
exec node server.js
