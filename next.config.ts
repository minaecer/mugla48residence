import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const mediaBaseUrl = process.env.MEDIA_BASE_URL || "http://localhost:5002/mugla48-media";

// Extract host for CSP img-src
let mediaHost = "localhost:5002";
try {
  mediaHost = new URL(mediaBaseUrl).host;
} catch {}
const mediaProto = mediaBaseUrl.startsWith("https") ? "https:" : "http:";

const csp = [
  "default-src 'self'",
  `img-src 'self' data: ${mediaProto}//${mediaHost} https://mugla48residence.com`,
  // Next.js requires unsafe-inline for hydration scripts; unsafe-eval only in dev (hot reload)
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  // Tailwind injects styles via <style> tags, unsafe-inline required
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  `connect-src 'self' ${mediaProto}//${mediaHost}`,
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isProd && mediaProto === "https:" ? ["upgrade-insecure-requests"] : []),
].join("; ");

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      // Local dev MinIO
      { protocol: "http", hostname: "localhost", port: "5002", pathname: "/**" },
      // Docker internal
      { protocol: "http", hostname: "minio", port: "9000", pathname: "/**" },
      { protocol: "http", hostname: "mugla48-minio", port: "9000", pathname: "/**" },
      // Production - same domain media proxy
      { protocol: "https", hostname: "mugla48residence.com", pathname: "/**" },
      // Production MinIO (dynamic)
      { protocol: "https", hostname: mediaHost.split(":")[0], pathname: "/**" },
      { protocol: "http", hostname: mediaHost.split(":")[0], pathname: "/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Core security headers
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: csp },

          // Cross-origin isolation
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },

          // Permissions-Policy (comprehensive)
          {
            key: "Permissions-Policy",
            value: [
              "geolocation=()",
              "microphone=()",
              "camera=()",
              "payment=()",
              "usb=()",
              "accelerometer=()",
              "gyroscope=()",
              "magnetometer=()",
              "interest-cohort=()",
            ].join(", "),
          },
        ],
      },
      // Cache-control for admin API (no cache)
      {
        source: "/api/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "private, no-cache, no-store, must-revalidate" },
        ],
      },
      // Cache-control for static assets
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
