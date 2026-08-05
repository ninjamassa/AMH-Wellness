import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(path) ? [path] : [];
  });
}

describe("client privacy boundary", () => {
  it("does not import the full site configuration into a client module", () => {
    const clientSources = sourceFiles(join(process.cwd(), "src"))
      .map((path) => ({ path, content: readFileSync(path, "utf8") }))
      .filter(({ content }) => content.startsWith('"use client"'));

    for (const source of clientSources) {
      expect(source.content, source.path).not.toContain("@/lib/site-config");
    }
  });

  it("does not reference server integration secrets from a client module", () => {
    const serverOnlyNames = [
      "SEMBLE_API_KEY",
      "STRIPE_SECRET_KEY",
      "STRIPE_WEBHOOK_SECRET",
      "RESEND_API_KEY",
      "ENQUIRY_FROM_ADDRESS",
      "ENQUIRY_TO_ADDRESS",
    ];
    const clientSources = sourceFiles(join(process.cwd(), "src"))
      .map((path) => readFileSync(path, "utf8"))
      .filter((content) => content.startsWith('"use client"'));

    for (const content of clientSources) {
      for (const name of serverOnlyNames) expect(content).not.toContain(name);
    }
  });
});
