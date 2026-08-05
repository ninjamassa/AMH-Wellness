# Start here

Taher — read this, then `docs/02-the-patient.md`, then open Codex.

> **For the actual step-by-step** — accounts, installs, running the agents, DNS
> cutover — use [`BUILD-GUIDE.md`](./BUILD-GUIDE.md). It assumes no terminal
> experience. This file is the why; that one is the how.

## The idea this whole repo is built to protect

Everyone in this market sells the medication. Akila sells everything around it.

> "Lack of support with the weight loss injections provided by other companies.
> This is 1-2-1 support, tailored to them with first hand contact to clinician
> when needed." — Akila, discovery questionnaire

The patient arriving on this site has probably already used a jab-in-the-post
service. She got a pen, an app, and nobody to talk to. She isn't looking for
faster or cheaper. **She's looking for a person.**

The single biggest risk on this project isn't a technical one. It's that the
site ends up sounding like Voy — competent, slick, and indistinguishable. Every
decision in here exists to stop that happening.

## What makes this repo different from a normal scaffold

**The strategy is code, not a document nobody reads.**
`src/lib/patient-journey.ts` holds every page's stage, job, the patient worry it
answers, its one next step and its search targets. The sitemap and footer
generate from it. `npm run copy-check` fails if a page and its spec drift apart.

**The commercial logic has tests.** `tests/patient-journey.test.ts` asserts the
sitemap still matches the proposal's 21 pages, that all four of Akila's worries
are answered somewhere, that `/support-after-injections` is still flagged as the
differentiator, and that the aftercare keyword cluster is still targeted. If a
future session quietly drops the thing that makes this business work, the suite
says so.

**Every page carries its own brief.** Open any `page.tsx` and the header comment
tells you the stage, the job, the worry it answers, the next step and the
targets. Codex can't write a page without seeing what it's for.

**No outcome is a dead end.** There's a test for it. Akila doesn't want people
feeling dismissed, and a decline today is a patient in six months.

## The two pages that decide whether this works

**`/support-after-injections`** — marked ★ in the proposal, and it's the
business case. ~9,000 searches a month sit around "coming off mounjaro", "how to
keep weight off after stopping", "what happens when you stop" — and nobody
serves them. Voy has a real content engine and ignores aftercare. SheMed ranks
for almost nothing beyond its own name. Juniper is brand demand with thin
content. A BMJ article ranks page one for this cluster, which tells you the SERP
wants clinical depth, not a landing page.

It's written to tell the truth first — *why* weight comes back — and only then
offer the plan. That reader has already failed once on someone else's watch. The
honesty is the conversion mechanism.

**`/am-i-eligible`** — the primary lead capture. Akila: *"Can we incorporate an
online assessment? If so this will be key to gain lead information."* Two
minutes, honest either way, and it computes in the browser so no health data
touches your infrastructure.

## Running it

Delete the `node_modules` folder first if one is present — it's a leftover from
my sandbox, built for a different architecture.

```bash
cd amh-wellness-website-v2
rm -rf node_modules package-lock.json
npm install
npm run dev          # http://localhost:3000
npm run verify       # typecheck → lint → test → build
npm run copy-check   # structure gate + tone advisory
```

Requires Node 22+.

## Driving Codex

1. Fresh session in the repo root.
2. Paste `prompts/00-MASTER-KICKOFF.md`.
3. **It asks you five questions back before writing code.** Read the answers.
   If it can't describe the patient accurately, everything it writes will sound
   generic — fix it there, it's a two-minute check.
4. Then work the specialist prompts in order.

```
Architect ──► Design ──────► Content ──► Editor ──► QA
     │                          ▲           │
     ├──► SEO ──────────────────┤           │
     └──► Integrations ─────────┘           ▼
                              re-run after any copy change
```

The seven agents are installed as Codex custom agents in `.codex/agents/`, so you
invoke them by name — "use the content agent" — rather than pasting prompts.

The **editor agent** is the one to actually use.
It reads every page as the patient and asks the question no test can: *does this
feel like the place that let me down last time?*

`docs/08-codex-playbook.md` covers session hygiene and failure modes.

## About the compliance work

You said not to worry about it yet, so it's out of the way — no build gate, no
zone architecture, and the treatment pages are named exactly as the proposal
specifies (`/mounjaro`, `/wegovy`, `/weight-loss-injections`,
`/support-after-injections`).

Two things I kept, because they earn their place on commercial grounds alone:

- `npm run copy-check` warns on urgency and hype copy. Not a legal thing — Akila
  explicitly doesn't want people looking for a quick fix, and that language
  recruits exactly them.
- `docs/reference-uk-advertising-rules.ts.txt` is the research from the first
  pass, parked. Nothing imports it. It's there if the CQC registration lands or
  you start running paid ads and want it back.

## Six things to get from Akila

Batch these — she's running this alone around a day job.

1. **Pricing.** Every number on the site is a placeholder. This is the one
   blocking item.
2. **The `@amhwellness.co.uk` email.** She's on personal Gmail. A private health
   service emailing patients from Gmail undercuts the whole proposition.
3. **Semble** — does it offer a hosted booking URL with prefill? Does it take
   the Stripe fee? Can the NMWLP questionnaire live inside its confirmation?
4. **WhatsApp on or off.** She's worried about the admin load, which is fair for
   one person answering evenings and weekends. It ships off; one flag turns it on.
5. **Legal review** for the four policy pages.
6. **Assets** — logo vector, bio photography, and the first few reviews from the
   patients she mentioned.

## What's built vs. what Codex does

**Real and tested:** the 21 routes with their briefs, the patient-journey spine,
eligibility logic, design tokens, JSON-LD, SEO utilities, sitemap, `llms.txt`,
and the homepage and `/support-after-injections` written out as worked examples
of the voice.

**Stubbed with briefs:** the other 19 pages' copy, the eligibility UI,
integrations, and the remaining components. That's Codex's job — and it'll do it
far better with the patient, the briefs and the voice already in place than it
would from a blank repo.

## The old WordPress site

It's an Elementor build behind a "Coming Soon" wall, with nine live inner pages
and a FAQ that is still placeholder Latin. Nothing worth migrating — but the
URLs are real, so 301 redirects for all of them are built into `next.config.ts`
and tested. `/mounjaro` and `/wegovy` keep their exact paths.

Worth salvaging before you decommission it: the logo files, the three
testimonial images, the newsletter list it's been collecting since January 2025,
and Search Console ownership. `BUILD-GUIDE.md` Part 4 has the detail.

## Verification

TypeScript compiles clean under strict; 20/20 tests pass; `copy-check` shows no
structural drift and no tone warnings; all 17 redirect assertions pass.

`next build` wasn't verified — the sandbox couldn't execute the ARM64 SWC binary
(SIGBUS on load, an environment limit, not a repo defect). Run `npm run verify`
first thing locally.

## The earlier version

`../amh-wellness-website` is the first pass, organised around the advertising
rules. It's superseded — this is the one to use. I couldn't delete it from the
sandbox, so it's still there if you want to compare.
