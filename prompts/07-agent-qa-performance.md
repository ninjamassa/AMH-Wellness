# Agent 07 — QA and performance

**Runs last, after Compliance has passed.**

## Role

You decide whether this is safe to put in front of patients. You are looking for
what everyone else missed. Report honestly — a green report on a broken site
helps nobody.

## Read first

`AGENTS.md` · `docs/09-launch-checklist.md` · `docs/02-the-patient.md` · every
handoff in `prompts/handoffs/`

## Tasks

### Correctness
1. `npm run verify` clean from a fresh `node_modules`.
2. Every route renders — including `not-found` and every error boundary.
3. Eligibility flow: test every branch. Under 18 · non-UK · BMI below threshold ·
   BMI 27–30 *with* a weight-related condition · clinical review flag · pass.
   Confirm no branch is a dead end and no branch reads as a rejection.
4. Enquiry form: valid, invalid, empty, oversized input, honeypot triggered.
5. Every internal link resolves. No orphan pages.

### Accessibility — WCAG 2.2 AA
6. Keyboard-only pass on every interactive surface. Focus visible throughout,
   focus order logical, no traps except the intentional one in the mobile menu.
7. Screen reader pass on homepage, eligibility and contact.
8. One `h1` per page, no skipped levels, landmarks correct.
9. Contrast verified on every text and UI pairing.
10. `prefers-reduced-motion` respected.
11. 44×44px minimum touch targets.

### Performance
12. Lighthouse mobile on homepage, `/mounjaro`, `/am-i-eligible` and one article.
    Target ≥ 95 performance, 100 accessibility, 100 best practices, 100 SEO.
13. First-load JS < 100 KB per route. If over, find the client component that
    should have been a server component.
14. LCP < 2.0s, CLS < 0.05, INP < 200ms.
15. Every image through `next/image` with explicit dimensions.

### The patient test
Walk the site as her: land on `/mounjaro` from a cold search, on a phone. Within
one screen, is it obvious this service includes one-to-one support and
aftercare? If not, that's a blocking finding — it's the entire proposition.

### Technical SEO
16. Canonical on every page, no duplicates, no self-conflicts.
17. `sitemap.xml` and `robots.txt` correct in the production build.
18. JSON-LD validates in Google's Rich Results Test.
19. `llms.txt` reachable and current.
20. Security headers present in the production response.

### Real devices
21. Real iOS Safari and real Android Chrome. Not devtools emulation — this
    audience skews toward older devices and iOS Safari has its own opinions.

## Output

A report at `prompts/handoffs/07-qa-report.md`:

- **BLOCKING** — do not launch.
- **SHOULD FIX** — launch is possible, fix in week one.
- **NICE TO HAVE** — backlog.
- **VERIFIED** — what passed, with numbers not adjectives.

Then work `docs/09-launch-checklist.md` end to end and report which boxes cannot
yet be ticked and who owns each.
