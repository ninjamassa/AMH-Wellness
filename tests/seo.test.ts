import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { internalLinkPlan } from "@/lib/internal-links";
import { pages } from "@/lib/patient-journey";
import { pageSeo } from "@/lib/page-seo";
import type { SeoRoute } from "@/lib/page-seo";
import { siteConfig } from "@/lib/site-config";

const sorted = (values: readonly string[]) => [...values].sort();

describe("route SEO specifications", () => {
  it("covers every declared route exactly once", () => {
    const routes = pages.map((page) => page.route);

    expect(sorted(Object.keys(pageSeo))).toEqual(sorted(routes));
    expect(sorted(Object.keys(answerBlockQuestions))).toEqual(sorted(routes));
  });

  it("keeps rendered titles under 60 characters and descriptions between 140 and 160", () => {
    for (const [route, seo] of Object.entries(pageSeo)) {
      const renderedTitle = `${seo.title} | ${siteConfig.name}`;

      expect(renderedTitle.length, `${route} title`).toBeLessThan(60);
      expect(seo.description.length, `${route} description minimum`).toBeGreaterThanOrEqual(140);
      expect(seo.description.length, `${route} description maximum`).toBeLessThanOrEqual(160);
      expect(seo.path).toBe(route);
    }
  });

  it("uses unique titles and descriptions", () => {
    const entries = Object.values(pageSeo);

    expect(new Set(entries.map((entry) => entry.title)).size).toBe(entries.length);
    expect(new Set(entries.map((entry) => entry.description)).size).toBe(entries.length);
  });

  it("provides the 1200 by 630 default social image used by buildMetadata", () => {
    const image = readFileSync(resolve(process.cwd(), "public/og-default.png"));

    expect(image.readUInt32BE(16)).toBe(1200);
    expect(image.readUInt32BE(20)).toBe(630);
  });

  it("gives every answer block one patient-shaped question", () => {
    for (const [route, question] of Object.entries(answerBlockQuestions)) {
      expect(question.endsWith("?"), route).toBe(true);
      expect(question.split(/\s+/).length, route).toBeGreaterThanOrEqual(5);
    }
  });
});

describe("strategic internal links", () => {
  it("routes every entry treatment page to aftercare and eligibility", () => {
    const treatmentRoutes = ["/weight-loss-injections", "/mounjaro", "/wegovy"] as const;

    for (const route of treatmentRoutes) {
      const destinations = internalLinkPlan[route].map((link) => link.href);

      expect(destinations, route).toContain("/support-after-injections");
      expect(destinations, route).toContain("/am-i-eligible");
    }
  });

  it("routes every article to a service page", () => {
    const articleRoutes = pages
      .filter((page) => page.route.startsWith("/blog/"))
      .map((page) => page.route as SeoRoute);
    const serviceRoutes = new Set(
      pages.filter((page) => page.group === "treatment").map((page) => page.route),
    );

    for (const route of articleRoutes) {
      const links = internalLinkPlan[route];
      if (!links) throw new Error(`Missing internal-link plan for ${route}`);
      expect(links.some((link) => serviceRoutes.has(link.href)), route).toBe(true);
    }
  });

  it("makes every article discoverable from the blog hub", () => {
    const articleRoutes = pages
      .filter((page) => page.route.startsWith("/blog/"))
      .map((page) => page.route);
    const hubDestinations = internalLinkPlan["/blog"].map((link) => link.href);

    expect(sorted(hubDestinations)).toEqual(sorted(articleRoutes));
  });
});
