# Handoff — architect — 2026-08-05

## What I was asked to do

Audit the scaffold and complete architect phase 1 only: keep routes aligned with
the patient-journey specs, build the browser-only eligibility flow around the
existing pure assessment function, add a typed and server-validated enquiry
boundary, define shared content contracts, add route fallbacks, repair build and
lint configuration where needed, verify the result, and leave later copy,
design, SEO and integrations work untouched.

## What I built

- `.gitignore` — excludes dependencies, build output, local environment files,
  TypeScript caches and operating-system files while allowing `.env.example`.
- `eslint.config.mjs` — replaced the incompatible legacy `FlatCompat` wrapper
  with the flat configs exported by the installed Next.js 16 packages. The old
  config crashed before linting any file.
- `postcss.config.mjs` — named the exported config to clear the now-working
  lint rule without changing PostCSS behaviour.
- `src/lib/eligibility-flow.ts` — typed transient draft state, the 3 input-step
  contract, per-step completeness checks, and safe conversion to the existing
  `EligibilityAnswers` contract. It does not duplicate eligibility criteria.
- `src/components/forms/EligibilityFlow.tsx` — the smallest client leaf for the
  3-step check. It imports `assessEligibility`, collects only the 6 inputs that
  function needs, computes in the browser, stores nothing, and gives every
  outcome its existing next step.
- `src/app/am-i-eligible/page.tsx` — remains a Server Component and now renders
  the client flow, passing condition examples from `siteConfig` rather than
  hardcoding them.
- `src/lib/enquiry.ts` — Zod schema, typed visible field errors, 1.5-second
  timing heuristic, honeypot handling, and a validated payload containing only
  name, email and message.
- `src/app/contact/actions.ts` — typed Server Action that reads an explicit
  allowlist of fields and performs server-side validation. It intentionally
  returns `delivery-unavailable` after validation until the integrations phase
  connects a provider, so the scaffold never falsely says a message was sent.
- `src/components/forms/EnquiryForm.tsx` — the client leaf using React 19 action
  state, accessible field errors, a non-focusable honeypot, and a post-hydration
  timestamp so static rendering cannot defeat the timing check.
- `src/app/contact/page.tsx` — remains a Server Component and renders the
  enquiry form skeleton.
- `src/app/error.tsx` and `src/app/loading.tsx` — application-level error and
  loading fallbacks; only the error boundary is client-side because `reset`
  requires it.
- `src/types/content.ts` — serialisable contracts for article frontmatter, FAQ
  entries, testimonials and pricing items. Pricing uses a discriminated union:
  an amount cannot exist unless its status is explicitly `confirmed`.
- `tests/eligibility-flow.test.ts` — 4 tests written before implementation for
  empty state, minimum step completion, conversion and invalid numeric input.
- `tests/enquiry.test.ts` — 5 tests written before implementation for the
  allowlisted payload, trimming, typed errors, honeypot, timing and malformed
  anti-spam metadata.

No dependency was added; Zod was already in `package.json`.

## What I deliberately did not do

- I did not write final page or form copy, style the new forms, change metadata
  content, add schema markup, or start another specialist phase.
- I did not connect Semble, Stripe, email delivery, analytics or any external
  system. No integration URL or credential name was guessed.
- I did not collect a name, email address or health details in the eligibility
  check. ADR-004 says it computes in the browser and persists nothing; Semble is
  intended to become the system of record at the handoff.
- I did not alter `assessEligibility` or its existing outcome wording and
  routing. The component imports it as required.
- I did not add route-specific loading files to static routes that have no
  asynchronous data dependency; the app-level boundary covers route loading.
- I did not create a commit. This repository has no initial commit and the
  entire supplied scaffold is untracked, so an architect-only commit would
  either omit required baseline files or misleadingly claim ownership of them.

## Assumptions I made

- 3 short input steps are the minimum useful grouping: age and residency,
  measurements, then 2 yes/no health-context answers.
- Metric inputs are acceptable for the skeleton because the existing
  `EligibilityAnswers` contract requires centimetres and kilograms. A later
  design/content decision may add imperial input conversion without changing
  the eligibility rules.
- The existing `needsClinicalReview` boolean can be reached through a broad,
  non-diagnostic self-report question. Its exact wording and clinical triggers
  require Akila's confirmation before launch.
- A 1.5-second minimum completion time is a low-friction spam heuristic. The
  honeypot and timing result intentionally do not reveal which check fired.
- Until a delivery provider is connected, valid and suspected-spam enquiries
  receive the same honest non-delivery state. The integration agent must replace
  that terminal branch only after real delivery succeeds.
- App-level error and loading fallbacks are proportionate while all routes are
  statically rendered and the only dynamic work is inside client leaves or a
  Server Action.

## Open questions

| Question | Who decides | Blocking? |
|---|---|---|
| What exact question and clinical triggers should set `needsClinicalReview`? | Akila | Yes for launch; no for this typed skeleton |
| Should the public form accept stones/feet as well as kg/cm? | Akila with design/content | No for architecture; important for conversion/accessibility |
| What Semble booking URL should eligible patients receive, and can it accept prefill values? | Akila / integrations agent | Yes for launch |
| Which delivery route should the general enquiry action use? | Akila / integrations agent | Yes for launch |

## TODO(human) markers I left

| File:line | What is needed | Who from |
|---|---|---|
| `src/components/forms/EligibilityFlow.tsx:200` | Confirm the wording and triggers for the clinical-review branch. | Akila |

## Verification

```text
npm run typecheck   pass
npm run lint        pass — 0 errors, 0 warnings
npm run compliance  not available — no such package script
npm run copy-check  pass — 0 structural, 0 tone warnings
npm run test        pass — 33/33
npm run build       pass — 25 static pages generated
npm run verify      pass
```

The sandboxed build could not reach Google Fonts; the exact `npm run verify`
command was rerun with approved network access and passed end to end.

## What the next agent needs to know

1. `EligibilityFlow` is intentionally the only client boundary on
   `/am-i-eligible`; preserve browser-only calculation and import
   `assessEligibility` rather than recreating its rules.
2. The enquiry action validates and filters correctly but does not deliver yet.
   Replace the final `delivery-unavailable` result only when a real provider is
   connected, and never log `validation.data`.
3. The public clinical-review question is a launch-blocking Akila decision. Do
   not expand it into a contraindication questionnaire without an approved
   clinical source.
