import { describe, expect, it } from "vitest";
import {
  objections,
  pages,
  pagesAnswering,
  pagesInGroup,
  specForRoute,
} from "@/lib/patient-journey";

/**
 * These tests protect the strategy, not the code. If someone adds a page with
 * no job, or drops the differentiator, the suite says so.
 */

describe("the sitemap matches the agreed proposal", () => {
  it("has 21 pages", () => {
    expect(pages).toHaveLength(21);
  });

  it("has the 7 core, 4 treatment, 5 resource and 5 trust pages", () => {
    expect(pagesInGroup("core")).toHaveLength(7);
    expect(pagesInGroup("treatment")).toHaveLength(4);
    expect(pagesInGroup("resources")).toHaveLength(5);
    expect(pagesInGroup("trust")).toHaveLength(5);
  });

  it("keeps the differentiator as a flagship page", () => {
    const spec = specForRoute("/support-after-injections");
    expect(spec?.flagship).toBe(true);
    expect(spec?.answers).toBe("maintenance");
  });

  it("routes are unique", () => {
    const routes = pages.map((p) => p.route);
    expect(new Set(routes).size).toBe(routes.length);
  });
});

describe("every page earns its place", () => {
  it("has a job, a stage and a next step", () => {
    for (const page of pages) {
      expect(page.job.length, `${page.route} has no job`).toBeGreaterThan(20);
      expect(page.stage).toBeTruthy();
      expect(page.nextStep.length, `${page.route} has no next step`).toBeGreaterThan(0);
    }
  });

  it("never points its next step at itself", () => {
    for (const page of pages) {
      expect(page.nextStep).not.toBe(page.route);
    }
  });
});

describe("the four patient objections are all answered somewhere", () => {
  it("each objection has at least one page owning it", () => {
    for (const id of Object.keys(objections) as Array<keyof typeof objections>) {
      expect(pagesAnswering(id).length, `nothing answers "${id}"`).toBeGreaterThan(0);
    }
  });

  it("each objection lists the pages that must address it", () => {
    for (const objection of Object.values(objections)) {
      expect(objection.addressedOn.length).toBeGreaterThan(0);
      expect(objection.worry.length).toBeGreaterThan(20);
      expect(objection.answer.length).toBeGreaterThan(20);
    }
  });

  it("the maintenance objection — the whole business case — is answered in at least three places", () => {
    expect(objections.maintenance.addressedOn.length).toBeGreaterThanOrEqual(3);
  });
});

describe("the aftercare keyword cluster is covered", () => {
  it("targets the phrases the proposal identified as winnable", () => {
    const allTargets = pages.flatMap((p) => p.targets).join(" ");
    expect(allTargets).toContain("coming off mounjaro");
    expect(allTargets).toContain("how to keep weight off after stopping mounjaro");
    expect(allTargets).toContain("what happens when you stop mounjaro");
  });
});
