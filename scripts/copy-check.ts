#!/usr/bin/env tsx
/**
 * Advisory copy and structure check. NOT a build gate — `npm run copy-check`.
 *
 * Two jobs:
 *   1. Structural — every page spec has a route file and vice versa.
 *   2. Tone — flags language that would attract the wrong patient.
 *
 * That second one comes straight from Akila's brief. She does not want people
 * looking for a quick fix with no plan for afterwards, so hype and urgency
 * copy is actively counterproductive here: it fills the diary with people who
 * churn. Warnings only — use judgement.
 */

import { existsSync } from "node:fs";
import { join } from "node:path";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { pages } from "../src/lib/patient-journey";

const ROOT = process.cwd();

/* ── 1. structure ────────────────────────────────────────────────────────── */

function checkStructure(): string[] {
  const problems: string[] = [];

  for (const page of pages) {
    const dir = page.route === "/" ? "src/app" : join("src/app", page.route.slice(1));
    if (!existsSync(join(ROOT, dir, "page.tsx"))) {
      problems.push(`spec "${page.route}" has no page.tsx at ${dir}/`);
    }
  }

  const routes = new Set(pages.map((p) => p.route));
  const walk = (dir: string): void => {
    for (const entry of readdirSync(join(ROOT, dir))) {
      const rel = join(dir, entry);
      if (statSync(join(ROOT, rel)).isDirectory()) walk(rel);
      else if (entry === "page.tsx") {
        const route = "/" + dir.replace(/^src\/app\/?/, "");
        const normalised = route === "/" ? "/" : route.replace(/\/$/, "");
        if (!routes.has(normalised)) {
          problems.push(`${rel} exists but has no spec in patient-journey.ts`);
        }
      }
    }
  };
  walk("src/app");

  return problems;
}

/* ── 2. tone ─────────────────────────────────────────────────────────────── */

interface ToneRule {
  pattern: RegExp;
  label: string;
  why: string;
}

const TONE_RULES: ToneRule[] = [
  {
    pattern: /\b(limited time|act now|don'?t miss out|hurry|offer ends|while stocks last|last chance)\b/i,
    label: "Urgency",
    why: "Attracts impulse bookers. Akila explicitly does not want people looking for a quick fix.",
  },
  {
    pattern: /\b(quick fix|effortless|melt away|shed the pounds|beach body|bikini body|drop a dress size)\b/i,
    label: "Hype or body-image framing",
    why: "Wrong patient, wrong tone. Her audience is 25–75 and mostly wary of exactly this language.",
  },
  {
    pattern: /\b(guaranteed results?|guaranteed weight loss)\b/i,
    label: "Guarantee",
    why: "Nothing is guaranteed, and promising it undermines the clinical credibility the whole site rests on.",
  },
  {
    pattern: /\bdr\.?\s+akila\b/i,
    label: "Wrong title",
    why: "Akila is MPharmS, a pharmacist. Getting her title wrong on her own site is the worst possible detail to fluff.",
  },
];

function checkTone(): string[] {
  const problems: string[] = [];
  const scan = (dir: string): void => {
    for (const entry of readdirSync(join(ROOT, dir))) {
      const rel = join(dir, entry);
      if (statSync(join(ROOT, rel)).isDirectory()) scan(rel);
      // patient-journey.ts describes the language we avoid, so it would
      // always self-flag. Strategy config isn't customer-facing copy.
      else if (
        /\.(tsx?|mdx?)$/.test(entry) &&
        !rel.includes("copy-check") &&
        !rel.includes("patient-journey")
      ) {
        readFileSync(join(ROOT, rel), "utf8")
          .split("\n")
          .forEach((line, i) => {
            for (const rule of TONE_RULES) {
              if (rule.pattern.test(line)) {
                problems.push(
                  `${rel}:${i + 1}  ${rule.label} — ${rule.why}\n      ${line.trim().slice(0, 100)}`
                );
              }
            }
          });
      }
    }
  };
  scan("src");
  return problems;
}

/* ── run ─────────────────────────────────────────────────────────────────── */

const structure = checkStructure();
const tone = checkTone();

if (structure.length) {
  console.log("\nStructure\n");
  structure.forEach((p) => console.log(`  ✗ ${p}`));
} else {
  console.log("\nStructure: every spec has a page, every page has a spec.");
}

if (tone.length) {
  console.log("\nTone (advisory)\n");
  tone.forEach((p) => console.log(`  ! ${p}`));
} else {
  console.log("Tone: nothing flagged.");
}

console.log(
  `\ncopy-check: ${structure.length} structural, ${tone.length} tone warning(s).\n`
);

// Structural drift fails; tone is advisory only.
if (structure.length) process.exit(1);
