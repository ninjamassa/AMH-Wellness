# 09 — Launch checklist

Owner in brackets.

## Akila's sign-off — blocking

- [ ] She has read and approved every page *(Akila)*
- [ ] **Pricing confirmed** — every number is a placeholder until she signs it off *(Akila)*
- [ ] Every clinical statement approved *(Akila)*
- [ ] Every testimonial has permission on file *(Akila)*
- [ ] Legal pages reviewed *(Akila)*
- [ ] She's happy the site sounds like her *(Akila)*

That last one isn't a formality. If it doesn't sound like her, patients meet a
different person on the video call than the one they chose — and the whole
proposition is that she's a real person.

## The proposition lands

- [ ] Landing cold on `/mounjaro` on a phone, the support and aftercare are obvious within one screen *(Dev)*
- [ ] Every treatment page links to `/support-after-injections` *(Dev)*
- [ ] Every page says somewhere that she'd be speaking to Akila herself *(Editor)*
- [ ] All four worries — cost, side effects, maintenance, ongoing care — answered somewhere obvious *(Editor)*
- [ ] No urgency or hype copy anywhere; `npm run copy-check` tone-clean *(Editor)*
- [ ] Every eligibility outcome leaves her somewhere to go *(Dev)*

## Technical

- [ ] `npm run verify` passes from a clean `node_modules` *(Dev)*
- [ ] `npm run copy-check` shows no structural drift *(Dev)*
- [ ] Lighthouse ≥ 95 / 100 / 100 / 100 on mobile — homepage, `/mounjaro`, one article *(Dev)*
- [ ] First-load JS < 100 KB per route *(Dev)*
- [ ] Canonical on every page *(Dev)*
- [ ] `sitemap.xml`, `robots.txt`, `llms.txt` correct in production *(Dev)*
- [ ] JSON-LD validates in Google's Rich Results Test *(Dev)*
- [ ] Security headers present *(Dev)*
- [ ] Real iOS Safari and Android Chrome, not devtools *(Dev)*
- [ ] Keyboard-only and screen reader pass on the eligibility flow *(Dev)*

## Integrations

- [ ] Semble booking works end to end with a real test booking *(Dev + Akila)*
- [ ] Stripe booking fee charges and reconciles *(Dev)*
- [ ] NMWLP health questionnaire sequenced into the confirmation *(Akila)*
- [ ] Enquiry form delivers to the right inbox *(Dev)*
- [ ] WhatsApp flag set deliberately *(Akila)*
- [ ] `@amhwellness.co.uk` email live with SPF, DKIM, DMARC — she's on Gmail today *(Dev)*

## Domain

- [ ] DNS pointed at Vercel, TTL lowered first *(Dev)*
- [ ] `www` and apex both resolve, one canonical *(Dev)*
- [ ] HTTPS valid, HSTS on *(Dev)*
- [ ] Existing URLs 301-redirected *(Dev)*

## Measurement

- [ ] GA4 live, consent-gated, events firing *(Dev)*
- [ ] Search Console verified, sitemap submitted *(Dev)*
- [ ] Google Business Profile claimed *(Marketing)*
- [ ] Day-one Search Console baseline captured *(Marketing)*

## Day one

- [ ] Crawl for broken links and orphan pages
- [ ] One real end-to-end booking, as a patient would
- [ ] Confirm Akila receives the enquiry and the booking notification
- [ ] Diarise the 30-day review
