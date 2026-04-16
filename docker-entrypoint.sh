#!/bin/sh
set -e

if [ -n "$DATABASE_URL" ]; then
  echo "-> Running Prisma db push..."
  npx prisma db push || echo "  db push note: may have failed"
fi

echo "-> Seeding database..."
npx prisma db seed || echo "  Seed skipped"

echo "-> Starting server..."
exec node server.js
