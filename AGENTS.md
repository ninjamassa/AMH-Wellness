# AGENTS.md — AMH Wellness

Codex reads this before every task. It only contains what you can't infer from
the code. Read it fully before your first edit.

## Who this is for

`amhwellness.co.uk` — the website for AMH Wellness Ltd, a UK weight loss service
run by **Akila Dungarwalla MPharmS**, an independent prescribing pharmacist
(GPhC 2063173). Remote consultations, UK-wide. She runs it single-handed.

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 · Vercel.

## The one thing that must come through on every page

**She has already been let down once.**

The patient arriving here has probably used a jab-in-the-post service. She got a
pen, an app, and nobody to talk to. She isn't looking for faster or cheaper —
she's looking for someone who will actually pick up.

Akila's own words on why people come to her:

> "Lack of support with the weight loss injections provided by other companies.
> This is 1-2-1 support, tailored to them with first hand contact to clinician
> when needed."

So the product is **the relationship**, not the prescription. The medication is
what she searches for; the support is what makes her stay. Every page should
make that trade legible.

### Her four worries, in her order

1. **Cost** — will I know what I'm paying for?
2. **Side effects** — what if I feel awful and nobody answers?
3. **Maintenance** — what happens when I stop? *(the big one)*
4. **Ongoing care** — will I actually be able to speak to someone?

These are encoded in `src/lib/patient-journey.ts`. Every page declares which one
it answers. If you're writing a page and you don't know which worry it addresses,
read its spec before you write a word.

### Who we don't want

Akila is explicit: not people looking for a quick fix, not people who aren't
committed, not people with no plan for afterwards.

That's a licence to be calm and slightly selective. **No urgency, no hype, no
transformation language.** It attracts exactly the wrong person and fills her
diary with people who churn. `npm run copy-check` flags this as a warning.

## The architecture follows the patient

`src/lib/patient-journey.ts` is the spine. Every page has:

- a **stage** (aware → considering → ready → booking → supported)
- a **job**, in one sentence
- the **worry** it answers
- **one** next step
- its **search targets**

`sitemap.ts` and the footer generate from it. Adding a route means adding a spec
first — `npm run copy-check` fails if a page and a spec drift apart.

## The differentiator is a page, and it's the point

`/support-after-injections` is marked ★ in the proposal and it carries the
business case. ~9,000 searches a month sit in the aftercare cluster and nobody
serves it: Voy has a real content engine but ignores aftercare, SheMed ranks for
little beyond its own name, Juniper is brand demand with thin content.

If you're deciding where to put effort, put it there and on
`/blog/keeping-weight-off-after-stopping`, which feeds it.

## Facts you must not invent

Everything factual is in `src/lib/site-config.ts` — response hours, the five
process steps, delivery times, eligibility thresholds, what's included. Import
it; never hardcode.

- Akila is **MPharmS**, a pharmacist. Never "Dr".
- CQC registration is **in progress** — say exactly that, nothing stronger.
- The registered office is not a clinic. The service is fully remote.
- No public phone number. Patients get it after they join.
- **Pricing is not set yet.** Everything is a placeholder until she confirms.

If you can't source it from `site-config.ts` or `docs/`, it's unknown. Leave a
`TODO(human):` and say so. A placeholder is honest; a plausible invention is a
problem nobody catches until a patient reads it.

## Definition of done

```
npm run verify      # typecheck → lint → test → build
npm run copy-check  # advisory: structure + tone
```

Run it yourself before reporting complete. Don't report done with a failing
check and an explanation.

## Code principles

1. **Server Components by default.** `"use client"` only where you need state or
   browser APIs, and only on the smallest leaf.
2. **No `any`, no `!`, no `@ts-expect-error`** without a comment saying why.
3. **Tokens, not hex.** Colours and type live in the `@theme` block in
   `globals.css`. A raw hex in a component is a bug.
4. **Every page calls `buildMetadata()`.**
5. **Every substantial page opens with `<AnswerFirst>`** — 40–60 words answering
   the page's question outright. It serves the skim-reader and the AI crawler at
   once.
6. **Accessibility is a gate.** WCAG 2.2 AA. Her patients are 25–75, often on
   older phones.
7. **No new dependency** without justifying it.
8. **Tests before implementation** for anything with logic.

## Performance budget

Per route: **< 100 KB** first-load JS, LCP **< 2.0s** on mobile 4G, CLS
**< 0.05**, INP **< 200ms**. Images via `next/image` with explicit dimensions.

## Working style

- Read `docs/00-the-brief.md` and `src/lib/patient-journey.ts` before your first
  change in a session.
- One concern per commit. Conventional Commits.
- Secrets in `.env.local`; `.env.example` documents names only.
- When a task conflicts with this file, **this file wins** — say so and stop.

## Repository map

```
docs/       the brief, the patient, SEO, page briefs, integrations, launch
prompts/    multi-agent prompt library — start at prompts/00-MASTER-KICKOFF.md
src/app/    21 routes, each carrying its own brief in a header comment
src/lib/    site-config · patient-journey (the spine) · seo · schema · eligibility
scripts/    copy-check.ts — structure gate + tone advisory
tests/      vitest: eligibility logic and the strategy itself
```
