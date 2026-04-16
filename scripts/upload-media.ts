/**
 * Upload local /public/galeri/** to MinIO.
 *
 * Requires env: S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET.
 * Creates bucket if missing, sets public-read policy, uploads all jpg/png files
 * preserving relative paths (galeri/large/foo.jpg -> key "galeri/large/foo.jpg").
 */
import "dotenv/config";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, posix } from "path";
import { S3Client, PutObjectCommand, CreateBucketCommand, PutBucketPolicyCommand, HeadBucketCommand } from "@aws-sdk/client-s3";

const endpoint = process.env.S3_ENDPOINT || "http://localhost:9000";
const region = process.env.S3_REGION || "us-east-1";
const accessKeyId = process.env.S3_ACCESS_KEY || "minioadmin";
const secretAccessKey = process.env.S3_SECRET_KEY || "minioadmin";
const bucket = process.env.S3_BUCKET || "mugla48-media";

const s3 = new S3Client({
  endpoint,
  region,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true,
});

async function ensureBucket() {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucket }));
    console.log(`✓ bucket exists: ${bucket}`);
  } catch {
    await s3.send(new CreateBucketCommand({ Bucket: bucket }));
    console.log(`✓ created bucket: ${bucket}`);
  }
  // Public-read policy so image URLs work without signing
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: ["*"] },
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucket}/*`],
      },
    ],
  };
  await s3.send(new PutBucketPolicyCommand({ Bucket: bucket, Policy: JSON.stringify(policy) }));
  console.log("✓ public-read policy applied");
}

function walk(dir: string, acc: string[] = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const contentTypeOf = (f: string) => {
  const ext = f.toLowerCase().split(".").pop();
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  return "application/octet-stream";
};

async function main() {
  await ensureBucket();

  const root = join(process.cwd(), "public", "galeri");
  const files = walk(root).filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f));

  console.log(`Uploading ${files.length} files…`);
  let i = 0;
  for (const file of files) {
    const rel = relative(join(process.cwd(), "public"), file).split(/[\\/]/).join(posix.sep);
    const body = readFileSync(file);
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: rel,
        Body: body,
        ContentType: contentTypeOf(file),
      })
    );
    i++;
    if (i % 5 === 0 || i === files.length) console.log(`  ${i}/${files.length} ${rel}`);
  }

  // Also upload logo files if present
  for (const name of ["logo.jpg", "logo-white.png"]) {
    const p = join(process.cwd(), "public", name);
    try {
      const body = readFileSync(p);
      await s3.send(new PutObjectCommand({ Bucket: bucket, Key: name, Body: body, ContentType: contentTypeOf(p) }));
      console.log(`  uploaded ${name}`);
    } catch {}
  }

  console.log(`\n✓ All done. Public URL base: ${endpoint}/${bucket}/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
