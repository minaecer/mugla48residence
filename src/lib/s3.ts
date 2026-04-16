import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const endpoint = process.env.S3_ENDPOINT || "http://localhost:9000";
const region = process.env.S3_REGION || "us-east-1";
const accessKeyId = process.env.S3_ACCESS_KEY || "minioadmin";
const secretAccessKey = process.env.S3_SECRET_KEY || "minioadmin";
export const bucket = process.env.S3_BUCKET || "mugla48-media";
const publicBase =
  process.env.MEDIA_BASE_URL ||
  `${endpoint.replace(/\/$/, "")}/${bucket}`;

export const s3 = new S3Client({
  endpoint,
  region,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true,
});

export function publicUrl(key: string) {
  return `${publicBase.replace(/\/$/, "")}/${key.replace(/^\//, "")}`;
}

export async function uploadObject(params: {
  key: string;
  body: Buffer | Uint8Array;
  contentType?: string;
}) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: params.key,
      Body: params.body,
      ContentType: params.contentType,
    })
  );
  return publicUrl(params.key);
}

export async function deleteObject(key: string) {
  await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

export async function listObjects(prefix?: string) {
  const res = await s3.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix }));
  return res.Contents ?? [];
}

export async function getSignedGetUrl(key: string, expiresIn = 3600) {
  return getSignedUrl(s3, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn });
}
