# 06 — Integrations

Principle: **the website qualifies and hands off. It never becomes a clinical
system.** Every integration is designed to keep special category health data out
of our infrastructure.

## Semble — booking and clinical records

The system of record for appointments, consultations and patient records.

**Preferred approach: hosted handoff.** Deep-link to Semble's booking flow with
non-clinical context in query parameters. No patient data touches our servers,
no API key on the front end, nothing to breach.

**Only if hosted booking cannot deliver the journey**, use the Semble API from a
server route handler with the key in `SEMBLE_API_KEY` — never client-side, never
in `NEXT_PUBLIC_*`. In that case a data processing agreement with Semble is
required before launch.

Open questions for kick-off: does Semble expose a hosted booking URL that
accepts prefill parameters? Does it collect the Stripe fee itself? Can the
NMWLP intake form be sequenced inside Semble's confirmation rather than sent
separately?

## Stripe — consultation booking fee

Akila needs a booking fee to reduce no-shows.

**Prefer Stripe through Semble** if Semble supports it — one system, one
reconciliation, one PCI surface.

If direct: Stripe Checkout only. Never build a custom card form. Secret key
server-side, webhook signature verified with `STRIPE_WEBHOOK_SECRET`, idempotent
handler.

**Pricing note:** Akila's prices are fixed and she wants a booking fee to reduce
no-shows. Avoid discounting and promotional urgency — it attracts the patient
she's explicitly trying not to attract.

## NMWLP consultation form

Akila sends patients an existing third-party intake form after booking:
`https://www.nmwlp.co.uk/consultation-form/?clinic=amh-wellness-ltd+CR2-8TG`

Keep it — it is already integrated with her accreditation body. Sequence it
inside the booking confirmation so patients receive one clear next step rather
than two disconnected links. Do not iframe it: a third-party health form in an
iframe creates consent and CSP problems for no gain.

## Enquiry form

Server Action, validated with Zod on the server (never trust client validation).
Honeypot field plus a timing check rather than a CAPTCHA — cheaper, more
accessible, sufficient at this volume. Delivers by transactional email to
`ENQUIRY_TO_ADDRESS`.

**Do not ask for health details in a general enquiry form.** Collect name, email
and a short message. Anything clinical belongs in Semble.

## WhatsApp

Akila is unsure about the admin load — a fair concern for a solo practitioner
answering evenings and weekends.

Ship it behind `siteConfig.contact.whatsapp`, **off by default**. Flipping one
value turns it on sitewide. When on, use a `wa.me` deep link with a prefilled
neutral message; state response hours next to the button so expectations are set.

## Analytics

GA4, consent-gated — it must not load before consent. Link Search Console.
Track: eligibility check started, eligibility completed (with outcome bucket, no
personal data), Semble handoff, enquiry submitted, WhatsApp click.

**Never send BMI, weight, height or any health input to analytics.** Bucket
outcomes as `eligible` / `review-needed` / `not-eligible` and nothing more.
Akila hasn't set up data protection yet — don't create a problem for her.

## Email domain

Akila currently uses a personal Gmail. Before launch: `@amhwellness.co.uk`
mailboxes with SPF, DKIM and DMARC configured. A private health service emailing
patients from Gmail undermines the trust the whole site is built on.

## Secrets

All in `.env.local`, documented by name only in `.env.example`. In production,
Vercel environment variables. Nothing secret in `NEXT_PUBLIC_*`. Never commit a
key — if one is committed, rotate it, do not just remove it.
