# 01 — Architecture

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16, App Router | Server Components ship near-zero JS; file routing mirrors the page-spec model |
| Language | TypeScript strict + `noUncheckedIndexedAccess` | Eligibility logic should fail at compile time, not in front of a patient |
| Styling | Tailwind v4 `@theme` tokens | Design tokens as CSS variables, no runtime cost |
| Hosting | Vercel | Edge CDN, preview deploys per PR, good CWV defaults |
| Booking | Semble (external) | Already her clinical system of record |
| Payments | Stripe, likely via Semble | Confirm at kick-off |

## ADR-001 — Next.js rather than WordPress

Designated Medical proposed WordPress; Social Script proposed Next.js. We chose
Next.js.

The strategy depends on being quotable — by Google's AI Overviews and by
assistants when someone asks who supports you after coming off treatment. That
needs precise control of JSON-LD structure, answer-block position in the DOM,
`llms.txt` and Core Web Vitals. WordPress can do all of it via plugins, but each
is a configuration surface that drifts. Here it's typed and tested.

Secondly, this is being built agentically, and Codex is materially more reliable
on typed React than on PHP themes.

**Cost:** Akila can't edit pages in a familiar CMS. Mitigated in ADR-002.
Revisit if she ends up blocked on publishing — she wants to blog, and blocking
that would be a real failure.

## ADR-002 — Content editing, deferred

At launch, content lives in the repo. Once the blog cadence starts — she's
already named topics she wants to write about — add a git-backed editor
(Keystatic or TinaCMS). Both write Markdown into the repo, so posts stay
version-controlled and reviewable.

## ADR-003 — The patient journey is the architecture

`src/lib/patient-journey.ts` holds every page's stage, job, objection, next step
and search targets. The sitemap and footer generate from it, and
`npm run copy-check` fails if a route file and a spec drift apart.

The point: a marketing site decays when pages accumulate without a reason. Here
a page can't exist without declaring what it's for, and the test suite asserts
that every worry Akila named is answered somewhere.

## ADR-004 — The eligibility check computes in the browser

BMI and eligibility calculate client-side; nothing is persisted. On a pass, the
patient is handed to Semble, which is the system of record.

Two reasons. It keeps health data out of our infrastructure entirely, which is
the right posture for a solo practitioner. And it makes the check instant, which
matters for the site's primary conversion action.

Logic lives in `src/lib/eligibility.ts` as pure functions, tested independently
of the UI — including a test that no outcome is ever a dead end.

## Rendering

Static by default. Two dynamic surfaces: the eligibility form (client component,
leaf-level) and form submissions (Server Actions / route handlers).

## Directories

```
src/app/        routes — each page.tsx carries its brief in a header comment
src/components/ ui/ primitives · layout/ chrome · sections/ page blocks
                schema/ JSON-LD · forms/ inputs
src/lib/        site-config · patient-journey (the spine) · seo · schema
                navigation · eligibility
scripts/        copy-check.ts
tests/          eligibility logic, and the strategy itself
```

## Data flow

```
Visitor → /am-i-eligible  (computes in browser, stores nothing)
        → eligible       → Semble booking → Stripe fee → confirmation
                           → NMWLP health questionnaire → video consultation
        → review needed  → /contact, so Akila can talk to her
        → not eligible   → nutrition guidance, no dead end
```

The website qualifies, informs and hands off. It never becomes a clinical system.

## Non-goals

No patient login (she declined it). No e-commerce. No multi-language. No blog
comments. No live chat beyond an optional WhatsApp deep link.
