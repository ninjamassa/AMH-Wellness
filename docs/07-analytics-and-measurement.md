# 07 — Analytics and measurement

Nothing is tracked today. Set this up **before** launch so there is a clean
baseline to judge against.

## Stack

GA4 (consent-gated) · Google Search Console · Vercel Analytics for Core Web
Vitals · Google Business Profile.

## Events

| Event | Fires when | Parameters |
|---|---|---|
| `eligibility_started` | First input in the check | — |
| `eligibility_completed` | Outcome shown | `outcome`: eligible / review-needed / not-eligible |
| `booking_handoff` | Click through to Semble | `source_page` |
| `enquiry_submitted` | Contact form success | `source_page` |
| `whatsapp_click` | WhatsApp button clicked | `source_page` |
| `article_read` | 75% scroll on a blog article | `slug` |

**Never send health data.** No BMI, no weight, no height, no free text. Outcome
buckets only. Akila hasn't set up data protection yet — don't create a problem
for her.

## Consent

Health-adjacent site, UK GDPR. GA4 must not load before affirmative consent.
Essential-only by default; the site must work fully with analytics declined.

## Reporting

Weekly: eligibility funnel, enquiries, handoffs.
Fortnightly: Search Console impressions and average position for the aftercare
cluster — see `03-seo-aeo-geo.md`.
Monthly: manual AI Overview checks on the after-care cluster; Core Web Vitals.
Quarterly: assistant citation checks (see `03-seo-aeo-geo.md` §5), logged.

## The funnel to watch

```
Sessions → eligibility_started → eligibility_completed → booking_handoff → booked
```

The step that will leak is `started → completed`. If the drop is steep, the form
is too long or asks something that feels intrusive too early. Fix by reordering,
not by removing the clinical questions.
