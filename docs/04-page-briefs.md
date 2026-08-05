# 04 — Page briefs

21 pages, matching the Social Script proposal exactly. Every page's full spec —
stage, job, objection, next step, targets — lives in
`src/lib/patient-journey.ts` and is repeated as a header comment in its
`page.tsx`, so an agent editing a file sees the brief without leaving it.

This document is the index and the reasoning.

## Core & conversion (7)

| Route | Job | Answers |
|---|---|---|
| `/` | Make her feel in one screen that this is a real clinician who'll know her name — and that someone thought about what happens after | ongoing care |
| `/how-it-works` | Remove every unknown from the process so booking feels small | cost |
| `/am-i-eligible` | **Primary lead capture.** Honest answer in two minutes, details captured either way | — |
| `/pricing` | Be straight about money before she has to ask | cost |
| `/about` | The trust page. A named, registered, accountable person | ongoing care |
| `/reviews` | Proof from people like her that the support is real | ongoing care |
| `/contact` | A low-commitment way to ask when she isn't ready to book | — |

## Treatment & service (4)

| Route | Job | Answers |
|---|---|---|
| `/weight-loss-injections` | Service overview — what treatment here involves, and why the support around it is the point | ongoing care |
| `/mounjaro` | Capture the largest term in the category and convert it into an enquiry about a *supported* service | side effects |
| `/wegovy` | Same, covering both the injection and the oral tablets she offers | side effects |
| **`/support-after-injections`** ★ | Own the question nobody answers. This page is the business case | maintenance |

These four take most of the cold traffic. Each must make the difference obvious
fast, and each must link onward to `/support-after-injections`.

## Resources (5)

| Route | Job |
|---|---|
| `/blog` | The hub Akila wants for patient guidance |
| `/blog/mounjaro-vs-wegovy` | Comparison demand — high intent, low competition |
| **`/blog/keeping-weight-off-after-stopping`** ★ | The flagship article. Owns the aftercare cluster and feeds the service page |
| `/blog/managing-side-effects` | The biggest fear, answered practically. ~110k/mo demand |
| `/blog/protein-and-nutrition-on-injections` | Her nutrition expertise — a topic she raised herself |

## Trust (5)

`/faqs` · `/privacy-policy` · `/terms` · `/complaints` · `/medical-disclaimer`

`/faqs` is built for AI Overviews: self-contained answers, questions phrased the
way patients ask them. `/complaints` matters more than it looks — it's needed
for CQC readiness and it needs a named person and stated timescales.

## The two pages that decide whether this works

**`/support-after-injections`** — the differentiator, marked ★ in the proposal.
The reader is frightened of failing again and has probably already failed once
on someone else's watch. Don't sell to her. Tell her the truth about why weight
returns, then show her the plan. The honesty *is* the conversion mechanism.

**`/am-i-eligible`** — the primary lead capture. Akila: *"Can we incorporate an
online assessment? If so this will be key to gain lead information."* Two
minutes, honest either way, and no outcome is a dead end. There's a test
asserting that last part.

## Rules for every page

- One `h1` saying what the page is.
- An `<AnswerFirst>` block, 40–60 words, answering outright.
- Question-shaped `h2`s in her words.
- **One** next step. One — not a menu.
- Every page states, somewhere, that she'd be speaking to Akila herself.
