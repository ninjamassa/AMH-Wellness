import { describe, expect, it } from "vitest";
import {
  articleSchema,
  breadcrumbSchema,
  buildGraph,
  clinicianSchema,
  faqSchema,
  howToSchema,
  organisationSchema,
  schemaIds,
  websiteSchema,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

type JsonObject = Record<string, unknown>;

function referencedIds(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(referencedIds);
  if (typeof value !== "object" || value === null) return [];

  const object = value as JsonObject;
  const ownReference =
    typeof object["@id"] === "string" && Object.keys(object).length === 1
      ? [object["@id"]]
      : [];

  return [...ownReference, ...Object.values(object).flatMap(referencedIds)];
}

describe("page schema builders", () => {
  it("builds a linked FAQPage from the visible FAQ data contract", () => {
    const node = faqSchema({
      path: "/faqs",
      faqs: [{ question: "A patient question?", answer: "A visible answer." }],
    });

    expect(node["@type"]).toBe("FAQPage");
    expect(node["@id"]).toBe(`${siteConfig.url}/faqs#faq`);
    expect(node.isPartOf).toEqual({ "@id": schemaIds.website });
    expect(node.mainEntity).toHaveLength(1);
  });

  it("builds HowTo steps directly from the configured patient journey", () => {
    const node = howToSchema({
      name: "How AMH Wellness works",
      description: siteConfig.positioning,
      path: "/how-it-works",
      steps: siteConfig.journey,
    });

    expect(node["@type"]).toBe("HowTo");
    expect(node["@id"]).toBe(`${siteConfig.url}/how-it-works#howto`);
    expect(node.step).toHaveLength(siteConfig.journey.length);
    expect(node.step).toEqual(
      siteConfig.journey.map((step) =>
        expect.objectContaining({ name: step.title, text: step.detail }),
      ),
    );
  });

  it("builds a MedicalWebPage with an explicit review date and reviewer", () => {
    const node = articleSchema({
      headline: "Test article",
      description: "Schema contract test",
      path: "/blog/test-article",
      datePublished: "2026-01-01",
      dateModified: "2026-02-01",
      lastReviewed: "2026-02-02",
    });

    expect(node["@type"]).toBe("MedicalWebPage");
    expect(node["@id"]).toBe(`${siteConfig.url}/blog/test-article#webpage`);
    expect(node.lastReviewed).toBe("2026-02-02");
    expect(node.reviewedBy).toEqual({ "@id": schemaIds.clinician });
    expect(node.breadcrumb).toEqual({
      "@id": `${siteConfig.url}/blog/test-article#breadcrumb`,
    });
  });

  it("gives article graph references matching definitions", () => {
    const path = "/blog/test-article";
    const breadcrumb = breadcrumbSchema({
      path,
      trail: [
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: "Test article", path },
      ],
    });
    const article = articleSchema({
      headline: "Test article",
      description: "Schema contract test",
      path,
      datePublished: "2026-01-01",
      dateModified: "2026-02-01",
      lastReviewed: "2026-02-02",
    });
    const graph = JSON.parse(
      buildGraph(
        organisationSchema(),
        clinicianSchema(),
        websiteSchema(),
        breadcrumb,
        article,
      ),
    ) as { "@graph": JsonObject[] };
    const definitions = new Set(
      graph["@graph"].flatMap((node) =>
        typeof node["@id"] === "string" ? [node["@id"]] : [],
      ),
    );

    for (const reference of referencedIds(graph)) {
      expect(definitions.has(reference), reference).toBe(true);
    }
  });
});
