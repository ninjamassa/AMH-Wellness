# AMH Wellness

The website for **AMH Wellness Ltd** — a UK weight loss service led by Akila
Dungarwalla MPharmS, an independent prescribing pharmacist (GPhC 2063173).

`amhwellness.co.uk` · Next.js 16 · React 19 · TypeScript · Tailwind v4 · Vercel

> **Never built a site before?** Go straight to
> [`BUILD-GUIDE.md`](./BUILD-GUIDE.md) — accounts, installs, and every step
> through to launch day, assuming no terminal experience.
>
> **Otherwise:** [`START-HERE.md`](./START-HERE.md), then
> [`docs/02-the-patient.md`](./docs/02-the-patient.md). Knowing who this is for
> matters more than knowing the stack.

## The proposition

Everyone else sells the medication. Akila sells the support around it — the same
clinician every time, nutrition coaching, four-weekly reviews, and a plan for
when treatment stops. `/support-after-injections` is the page that carries it.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run verify       # typecheck → lint → test → build
npm run copy-check   # structure gate + tone advisory
```

Requires Node 22+.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit`, strict |
| `npm run lint` | ESLint |
| `npm run test` | Vitest — eligibility logic *and* the strategy |
| `npm run copy-check` | Page/spec sync (fails) + tone warnings (advisory) |
| `npm run verify` | typecheck → lint → test → build |

## How this repo is organised

`src/lib/patient-journey.ts` is the spine. Every page declares:

- a **stage** — aware, considering, ready, booking, supported
- a **job**, in one sentence
- which of the patient's **four worries** it answers
- **one** next step
- its **search targets**

The sitemap and footer generate from it. `copy-check` fails if a page and a spec
drift apart. `tests/patient-journey.test.ts` asserts the strategy is still
intact — 21 pages, all four worries answered, the differentiator still flagged,
the aftercare cluster still targeted.

## Structure

```
AGENTS.md          What Codex reads before every task
BUILD-GUIDE.md     Step-by-step: accounts → build → launch (no experience assumed)
START-HERE.md      Operating manual
.codex/agents/     7 Codex custom agents — "use the content agent" and it loads
docs/              Brief, the patient, architecture, SEO, page briefs, launch
prompts/           Master kickoff + 8 specialist agent prompts
src/app/           21 routes, each with its brief in a header comment
src/lib/           site-config · patient-journey · seo · schema · eligibility
scripts/           copy-check.ts
tests/             Eligibility logic and the strategy itself
```

## Documentation

| Doc | For |
|---|---|
| [`00-the-brief.md`](docs/00-the-brief.md) | The business, the market, the opportunity |
| [`01-architecture.md`](docs/01-architecture.md) | Stack and the four ADRs |
| [`02-the-patient.md`](docs/02-the-patient.md) | **Who this is for. Read it.** |
| [`03-seo-aeo-geo.md`](docs/03-seo-aeo-geo.md) | Keyword map, answer blocks, AI citability |
| [`04-page-briefs.md`](docs/04-page-briefs.md) | All 21 pages and their jobs |
| [`05-design-system.md`](docs/05-design-system.md) | Tokens, components, accessibility |
| [`06-integrations.md`](docs/06-integrations.md) | Semble, Stripe, forms, WhatsApp |
| [`07-analytics-and-measurement.md`](docs/07-analytics-and-measurement.md) | Events, consent, reporting |
| [`08-codex-playbook.md`](docs/08-codex-playbook.md) | Driving Codex well on this repo |
| [`09-launch-checklist.md`](docs/09-launch-checklist.md) | Every gate before go-live |

## Environment

Copy `.env.example` to `.env.local`. Never commit it. No secret in a
`NEXT_PUBLIC_*` variable.

## License

Private and proprietary. © AMH Wellness Ltd.
