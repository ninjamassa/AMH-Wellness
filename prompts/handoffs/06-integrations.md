# Handoff — integrations — 2026-08-05

## What I was asked to do

Complete the integrations phase only: audit the existing boundaries; choose the
safest Semble and Stripe strategy; connect general contact delivery without
letting health data escape; keep WhatsApp optional and off; add consent-gated
GA4 and the documented funnel events; test timeouts, failure states, consent and
client privacy; verify the application; commit focused changes; and leave body
copy, design, clinical rules, SEO contracts, routing strategy and later phases
untouched.

## What I built

- `src/lib/integrations.ts` — validates the configured hosted booking
  destination as HTTPS with no embedded credentials, and builds the neutral
  `wa.me` URL only when the operational flag is true. No patient input or
  request query is appended to either destination.
- `src/app/am-i-eligible/page.tsx`,
  `src/components/forms/EligibilityFlow.tsx` and
  `src/components/integrations/BookingHandoff.tsx` — pass the exact validated
  server-side `SEMBLE_BOOKING_URL` into the existing browser-only eligibility
  leaf. An eligible result names Akila and links directly to hosted booking when
  configured. Missing or invalid configuration shows an honest contact-request
  fallback rather than a broken or invented booking link. The eligibility
  answers, BMI and outcome never enter the URL or a server request.
- `.env.example` — documents names only. Direct Stripe remains explicitly
  disabled because Semble-hosted pre-payment is the chosen strategy. Resend now
  has provider-specific server variables plus separate verified from/to
  addresses.
- `src/lib/enquiry.ts`, `src/app/contact/actions.ts`,
  `src/lib/enquiry-delivery.ts` and
  `src/components/forms/EnquiryForm.tsx` — changed the architect's 3-field
  enquiry contract into a 2-field contact request: name and email only. This is
  a deliberate compatibility decision. Arbitrary free text can contain health
  data, so the textarea was removed rather than relying on a warning or keyword
  filter. The Server Action still uses Zod, a honeypot and the timing check. A
  configured Resend adapter sends a fixed plain-text notification with only
  name and email, a provider idempotency key and a 5-second abort timeout. It
  never logs the request, provider response or validation payload. Success is
  shown only after a 2xx provider response; missing config, timeouts and provider
  failures all give an honest non-delivery state.
- `src/lib/analytics.ts` — typed event union and an explicit parameter mapper
  for all 6 documented events. It cannot spread caller data: eligibility sends
  only `eligible`, `review-needed` or `not-eligible`; handoffs send a sanitised
  path without a query; articles send a safe slug. The tracker is a no-op until
  `gtag` exists.
- `src/components/integrations/AnalyticsConsent.tsx` and
  `src/app/layout.tsx` — implement basic consent mode. When a valid GA4 web ID
  is absent, no consent UI or analytics code renders. When it is present, the
  Google tag and data-layer setup do not exist before affirmative acceptance.
  Decline leaves them absent. A visitor can reopen settings; withdrawing a
  previous acceptance persists the new choice and reloads without the tag.
  Advertising storage, signals, user data and personalisation stay denied.
- `src/components/integrations/ArticleReadTracker.tsx` and the 4 article routes
  — fire `article_read` once at 75% document progress. The eligibility flow,
  hosted booking link, successful contact delivery and optional WhatsApp link
  emit the other 5 documented events with only their allowlisted parameters.
- `src/components/integrations/WhatsAppLink.tsx`,
  `src/components/layout/SiteFooter.tsx` and `src/lib/site-config.ts` — keep
  WhatsApp off by default. If Akila deliberately flips the server-side flag, a
  sitewide footer link appears with a neutral message and the configured
  response hours beside it.
- `src/components/layout/MobileNavigation.tsx` and `SiteHeader.tsx` — removed a
  pre-existing client import of the full `siteConfig`. The server now passes
  only `siteName`, preventing Akila's non-public phone from being pulled into a
  client bundle just to render the mobile wordmark.
- `tests/analytics.test.ts`, `tests/enquiry-delivery.test.ts`,
  `tests/integrations.test.ts`, `tests/client-privacy.test.ts` and
  `tests/enquiry.test.ts` — tests were written before implementation for consent
  parsing, GA ID validation, the event allowlist, query removal, the 75% read
  threshold, HTTPS booking configuration, WhatsApp gating, Resend
  configuration, free-text exclusion, timeout/provider failure, the changed
  contact contract and server-only client boundaries.

### Commits

- `ead3d38 feat(analytics): add consent-gated journey measurement`
- `3eabc6a feat(contact): add privacy-safe enquiry delivery`
- `0bae1ca feat(booking): add safe hosted handoff controls`

### Operational integration map

| Integration | What it does | What it needs | If it is unavailable | How to test before launch |
|---|---|---|---|---|
| Semble hosted booking | Receives an eligible visitor for booking and becomes the clinical system of record. | Exact HTTPS `SEMBLE_BOOKING_URL`; configured appointment product; Akila's account. | Missing/invalid configuration shows the site's honest contact fallback. An outage after the direct handoff is contained to Semble; this site remains available and exposes no stack trace. | Complete one real test booking from `/am-i-eligible`; verify Akila receives it and no eligibility values appear in the destination URL. |
| Stripe through Semble / Semble Pay | Takes the confirmed consultation booking fee inside hosted booking. | Confirmed fee; payment services connected to the Semble product; reconciliation owner. | Booking/payment behaviour is handled in Semble; this site has no second payment surface to fail. | Pay with the provider's test method, verify booking confirmation, receipt and reconciliation, then refund/cancel it. |
| NMWLP questionnaire | Collects the existing accredited health questionnaire after booking. | Supplied NMWLP URL placed in Semble's confirmation sequence. | Booking can still exist, but the pre-consultation clinical intake is unavailable; Akila needs a manual recovery process. | Make a test booking, follow the single confirmation next step, and verify the correct AMH Wellness clinic parameter and completed intake reach the intended system. |
| Resend contact delivery | Emails Akila a contact request containing only name and email. | `RESEND_API_KEY`, verified `ENQUIRY_FROM_ADDRESS`, working `ENQUIRY_TO_ADDRESS`, SPF/DKIM/DMARC. | The form states that details were not sent; nothing is queued or falsely acknowledged. | Use a provider test key/inbox, submit after the timing threshold, verify exactly one email and reply-to, then test missing config, provider 4xx/5xx and timeout. |
| Optional WhatsApp | Opens a neutral `wa.me` conversation and shows reply hours. | Akila's explicit decision and `whatsappEnabled: true`. | The normal contact request remains; no WhatsApp link or private number appears while off. | Flip the flag in a preview only, inspect the neutral text and hours, click with Akila's approval, then return the flag to the launch decision. |
| GA4 | Measures the eligibility funnel, handoffs, successful contacts, WhatsApp clicks and 75% article reads. | Approved privacy policy/consent wording; valid `NEXT_PUBLIC_GA_MEASUREMENT_ID`; GA4 property. | The site and every patient journey continue normally; analytics calls are no-ops. | Inspect network/tag state before choice, decline, accept and withdrawal; use GA DebugView to verify exact event names and allowlisted parameters only. |
| Search Console | Reports search performance and supports the planned GA linkage. | Verified domain property and Akila/launch-owner access. | Only reporting is lost; the site and GA events continue. | Verify the domain property, submit the sitemap and confirm impressions are visible before weekly reporting starts. |
| Vercel Web Analytics | Proposed Core Web Vitals reporting in the measurement brief. | A deliberate product/privacy decision and Vercel project access. | No patient journey breaks; QA can still measure locally. | Not implemented in this phase; decide during QA/launch whether its additional script and consent surface are justified. |

## What I deliberately did not do

- I did not build a Semble API integration. Hosted booking keeps clinical data
  out of this application, and no evidence showed that an API was required.
- I did not invent or append Semble prefill parameters. The exact configured
  hosted URL is the whole handoff. Semble's public API documentation describes
  booking data and availability, but I found no first-party confirmation of the
  proposed hosted-prefill contract.
- I did not add a same-origin `/book` route. It would add a route outside
  `patient-journey.ts` and change the architect's routing strategy. Passing one
  exact, server-validated public HTTPS destination into the existing eligible
  result achieves the same no-forwarding property without a new surface.
- I did not implement direct Stripe Checkout, a custom card form or a webhook.
  Semble's first-party help confirms its online booking products can require
  pre-payment when payment services are connected. Direct Stripe would add a
  second reconciliation path and needs confirmed pricing plus durable webhook
  idempotency that this intentionally stateless site does not have.
- I did not expose the NMWLP questionnaire as a second website CTA or iframe.
  Akila must place the supplied questionnaire link inside the Semble booking
  confirmation so the patient receives one sequenced next step.
- I did not enable WhatsApp, GA4, email delivery, Stripe or a real booking URL.
  No real key, GA property, verified mail domain, Semble URL or operational
  launch decision was supplied. The default build stays safely disabled.
- I did not send a real contact request, complete an external booking or charge
  a payment. Those actions require Akila's accounts, exact destinations and
  approval; local tests use mocks or a non-navigated example booking URL.
- I did not add Vercel Analytics or a new dependency. GA4 is the specified
  event system, and adding another tracker before the privacy policy is approved
  would increase cost and consent surface without helping this phase.
- I did not edit substantive page copy. The current homepage still says “Send
  a message” in body copy; the content/editor phases should align that wording
  with the safer contact-request form without reintroducing free text.

## Assumptions I made

- Resend is the transactional-email adapter because the project brief names
  “Resend or similar” and its official API supports a server-side send endpoint
  plus 24-hour idempotency keys. It is an implementation boundary, not a claim
  that Akila has selected or configured the provider.
- Name and email are permitted contact data. No health context, eligibility
  branch, source branch, BMI, measurements or arbitrary message belongs in the
  email.
- A configured hosted Semble booking URL is inherently public. Keeping its
  environment variable server-side prevents accidental configuration spread;
  rendering the final validated URL in the eligible CTA is necessary for the
  browser to navigate to it.
- Basic consent mode is the correct interpretation of “must not load before
  acceptance”: no tag and no consent ping are sent while the choice is unknown
  or declined. The preference is stored locally in the visitor's browser.
- A fixed neutral WhatsApp greeting and visible response hours are sufficient
  if Akila later enables the channel. The non-public number remains server-side
  while the flag is off.
- The prompt's “Server Action” requirement and “route handler” external-call
  wording both mean a server-only boundary with validation, timeout and graceful
  failure. An internal HTTP loop from the Server Action to a public route would
  create an unnecessary unauthenticated endpoint.

## Open questions

| Question | Who decides | Blocking? |
|---|---|---|
| What is the exact production Semble hosted booking URL, and has a real booking been tested from eligibility through confirmation? | Akila | Yes for launch |
| Is the consultation product configured in Semble to take the confirmed booking fee through Semble Pay or its connected Stripe service? | Akila | Yes for launch |
| Can the supplied NMWLP questionnaire be placed in Semble's booking confirmation, and has that sequence been tested? | Akila | Yes for launch |
| Is Resend the approved provider, and are `@amhwellness.co.uk`, SPF, DKIM, DMARC, the sending address and the receiving mailbox working? | Akila / launch owner | Yes for online contact delivery and launch |
| What is the production GA4 measurement ID, and have the privacy policy and consent wording been legally approved? | Akila / legal reviewer | Yes before enabling GA4 |
| Should WhatsApp be enabled at launch given Akila's response capacity? | Akila | No if it remains off; yes before enabling it |
| Does Akila want direct Stripe later despite Semble-hosted payment? If yes, what confirmed fee, Stripe Price ID and durable idempotency store will be used? | Akila / future integration owner | No for the current strategy |
| What exact question and clinical triggers should set `needsClinicalReview`? | Akila | Existing launch blocker; unchanged |

## TODO(human) markers I left

| File:line | What is needed | Who from |
|---|---|---|
| `src/app/am-i-eligible/page.tsx:28` | Supply and end-to-end test the exact hosted Semble booking URL. | Akila |
| `src/app/contact/actions.ts:41` | Confirm Resend, verify the sending domain, and supply the provider key plus from/to mailboxes. | Akila / launch owner |
| `src/app/layout.tsx:38` | Supply the GA4 ID after the privacy policy and analytics account are approved. | Akila / legal reviewer |
| `src/lib/site-config.ts:36` | Make a deliberate launch decision before changing the WhatsApp flag. | Akila |

The architect's clinical-review marker and the SEO agent's 4 article
review/date markers remain in place; this phase did not create or alter them.

## Verification

```text
npm run typecheck   pass
npm run lint        pass — 0 errors, 0 warnings
npm run compliance  unavailable — no such package script
npm run copy-check  pass — 0 structural, 0 tone warnings
npm run test        pass — 63/63
npm run build       pass — 25 static pages generated
npm run verify      pass
```

### Browser and bundle checks

- Followed the required in-app browser skill workflow against the default dev
  server and a separate production build with safe test configuration. This
  made consent, disabled-state and exact-link behaviour observable rather than
  relying only on unit tests.
- Default configuration: no GA consent UI or Google tag, no WhatsApp link,
  eligible result showed the honest contact fallback, and a contact submission
  reported that the details were not sent.
- Test GA configuration: before consent there was no Google tag; decline kept it
  absent; accept inserted exactly one `gtag.js` script; withdrawal reloaded with
  no Google tag. Browser console: 0 errors.
- Test booking configuration: the eligible result rendered exactly
  `https://booking.example.com/amh`; no BMI, measurement, outcome or input query
  was appended. The external link was inspected but not followed.
- Built with sentinel Semble, Stripe, webhook and Resend secrets. None appeared
  anywhere in `.next`; the server sentinels, Akila's private phone, WhatsApp
  number and example booking host were absent from `.next/static`.

### Primary documentation checked

- [Semble Pay overview](https://help.semble.io/integrating-with-semble-pay-semble-help-centre)
  — online booking can require pre-payment when payment services are connected.
- [Google basic versus advanced consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode)
  and [consent implementation](https://developers.google.com/tag-platform/security/guides/consent)
  — basic mode blocks Google tags until consent and requires a persisted choice.
- [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email)
  and [idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys)
  — server endpoint, required fields, error contract and 24-hour idempotency.
- [Stripe-hosted Checkout lifecycle](https://docs.stripe.com/payments/checkout/how-checkout-works)
  and [webhook fulfilment](https://docs.stripe.com/checkout/fulfillment)
  — used only to confirm what a future direct integration would require.

## What the next agent needs to know

1. Do not reintroduce a general free-text enquiry field or email the eligibility
   result. If Akila needs clinical text before booking, collect it in a
   Semble-hosted flow; the 2-field contact request is an intentional privacy
   boundary.
2. Do not import `siteConfig` into a client component. It contains Akila's
   non-public phone. Pass the smallest safe value from a Server Component and
   keep the `client-privacy` test green.
3. Keep integrations disabled until each launch gate above is resolved. A green
   unit/build suite proves the boundaries and failure states, not a real Semble
   booking, payment, email inbox, GA property or WhatsApp operating decision.
