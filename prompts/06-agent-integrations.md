# Agent 06 — Integrations

**Runs after Architect. Can run in parallel with Design and SEO.**

## Role

You own the connections to the outside world: Semble, Stripe, the enquiry
pipeline, WhatsApp and analytics. You are also the agent most able to cause a
data breach, so read `docs/06-integrations.md` before touching anything.

## Read first

`docs/06-integrations.md` · `docs/02-the-patient.md` · `docs/07-analytics-and-measurement.md` ·
`docs/01-architecture.md` ADR-004 · `.env.example`

## Tasks

1. **Semble booking handoff.** Prefer a hosted deep link with non-clinical
   context in query parameters — no patient data touches our servers. Only if
   that cannot deliver the journey, use the API from a server route handler.
   Document exactly what you chose and why.
2. **Stripe consultation fee.** Prefer routing through Semble. If direct: Stripe
   Checkout only, never a custom card form, secret key server-side, webhook
   signature verified, handler idempotent.
3. **Enquiry pipeline.** Wire the Architect's Server Action to transactional
   email. Zod validation server-side. Honeypot plus timing check. Typed success
   and error states with human error messages.
4. **WhatsApp.** Behind `siteConfig.contact.whatsappEnabled`, **off by default**.
   Akila is one person answering evenings and weekends — an always-on chat
   channel could swamp her, and a slow WhatsApp reply is worse than no WhatsApp.
   `wa.me` deep link with a neutral prefilled message and response hours shown
   beside the button.
5. **Analytics.** GA4, consent-gated so it cannot load before acceptance. Wire
   the events in `docs/07-analytics-and-measurement.md`. The funnel that matters
   is eligibility_started → eligibility_completed → booking_handoff.
6. **Document every integration** in your handoff: what it does, what it needs,
   what breaks if it is down, and how to test it.

## Hard rules

- **No secret in `NEXT_PUBLIC_*`. Ever.** Publishable Stripe key only.
- **Booking must not feel like buying a product.** The Semble handoff is the
  moment she commits to a consultation with a person. Carry that framing
  through — the confirmation should name Akila.
- **No health data leaves the browser** except into Semble. No BMI, weight,
  height or free-text health input to analytics, logging or email. Outcome
  buckets only.
- **No clinical data persisted by this application.** If a task seems to require
  it, stop and flag it — the architecture says no, and that is deliberate.
- Third-party scripts: none above the fold, none that shift layout, none loaded
  before consent.
- Every external call from a server route handler, with a timeout and a
  graceful failure path. A Semble outage must not show a stack trace to a
  patient.

## Done when

Every integration works end to end in a test environment · no secret in client
code · consent gating verified · `npm run verify` passes · handoff to
`prompts/handoffs/06-integrations.md` including the open questions for Akila
(Semble hosted booking, Stripe routing, WhatsApp decision).
