import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/**
 * Redirects from the old WordPress site.
 *
 * The existing amhwellness.co.uk is an Elementor build sitting behind a
 * "Coming Soon" wall, but the inner pages are live and indexable. When the
 * domain moves to Vercel these URLs would 404 without this map — which loses
 * any link equity they have and, more importantly, breaks any link Akila has
 * already shared with a patient.
 *
 * Verified against https://amhwellness.co.uk/page-sitemap.xml (Aug 2026).
 * Permanent (308) because these moves are final.
 */
const wordpressRedirects = [
  { source: "/home", destination: "/", permanent: true },
  { source: "/weight-loss-treatment", destination: "/weight-loss-injections", permanent: true },
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
  { source: "/faq", destination: "/faqs", permanent: true },
  { source: "/privacy-policy-2", destination: "/privacy-policy", permanent: true },
  { source: "/terms-of-service", destination: "/terms", permanent: true },
  // /mounjaro and /wegovy keep the same paths — no redirect needed.
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return wordpressRedirects;
  },
};

export default nextConfig;
