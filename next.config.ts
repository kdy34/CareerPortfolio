import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    const headers = [{ source: "/(.*)", headers: securityHeaders }];
    // Keep Vercel preview deployments out of search results.
    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
      headers.push({ source: "/(.*)", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] });
    }
    return headers;
  },
};

export default nextConfig;
