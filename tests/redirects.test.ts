import { describe, expect, it } from "vitest";
import nextConfig from "../next.config";
import { ROUTES } from "@/lib/patient-journey";

/**
 * The old WordPress URLs are live and indexable today. If one of these
 * redirects is dropped or points somewhere that no longer exists, a patient
 * following a link Akila already shared gets a 404. Worth a test.
 */
describe("WordPress redirects", () => {
  it("covers every old URL that isn't already a live route", async () => {
    const redirects = await nextConfig.redirects!();
    const sources = redirects.map((r) => r.source);

    const oldUrls = [
      "/home",
      "/weight-loss-treatment",
      "/about-us",
      "/contact-us",
      "/faq",
      "/privacy-policy-2",
      "/terms-of-service",
    ];

    for (const url of oldUrls) {
      expect(sources, `no redirect for ${url}`).toContain(url);
    }
  });

  it("points every redirect at a route that actually exists", async () => {
    const redirects = await nextConfig.redirects!();
    for (const r of redirects) {
      expect(ROUTES, `${r.source} -> ${r.destination} is a dead end`).toContain(
        r.destination
      );
    }
  });

  it("leaves /mounjaro and /wegovy alone — the paths are unchanged", async () => {
    const redirects = await nextConfig.redirects!();
    const sources = redirects.map((r) => r.source);
    expect(sources).not.toContain("/mounjaro");
    expect(sources).not.toContain("/wegovy");
    expect(ROUTES).toContain("/mounjaro");
    expect(ROUTES).toContain("/wegovy");
  });

  it("uses permanent redirects", async () => {
    const redirects = await nextConfig.redirects!();
    for (const r of redirects) expect(r.permanent).toBe(true);
  });
});
