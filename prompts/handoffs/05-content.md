# Handoff — Content — 5 August 2026

## What I was asked to do

Write every patient-facing word in the route spine as a warm, precise clinician,
starting with aftercare and eligibility, then treatment pages, service pages,
articles and legal pages. Each substantial page had to answer its registered
question in a 40–60-word `AnswerFirst`, name Akila as the person the patient
deals with, address its assigned worry and keep one primary next step. Unknown
clinical, commercial and legal facts had to remain explicit review gates.

## What I built

- `src/app/support-after-injections/page.tsx` tells the truth about regain before
  it explains support. It treats regain as a documented pattern rather than a
  personal failure, links to NICE and published evidence, and does not promise a
  post-prescription package before Akila confirms its operating model.
- `src/app/am-i-eligible/page.tsx` explains that the check is preliminary,
  browser-local and not a prescribing decision. The Semble destination remains
  a launch gate rather than a fabricated URL.
- `src/app/weight-loss-injections/page.tsx`, `src/app/mounjaro/page.tsx` and
  `src/app/wegovy/page.tsx` turn cold medication searches into a clear account of
  named, supported care. The medicine pages link to NHS and current electronic
  medicines-compendium patient information. Oral Wegovy is not presented as an
  AMH treatment option until pharmacy supply is confirmed.
- `src/app/page.tsx`, `src/app/how-it-works/page.tsx`,
  `src/app/about/page.tsx`, `src/app/pricing/page.tsx`,
  `src/app/faqs/page.tsx`, `src/app/contact/page.tsx` and
  `src/app/reviews/page.tsx` now answer the patient's practical objections. The
  home page makes the pen-and-app failure legible in the first screen. Pricing
  shows three honest confirmation placeholders and no currency amount. Reviews
  says there are no approved reviews instead of inventing social proof. The FAQ
  renders visible answers and schema from the same 11-entry source.
- `src/app/blog/page.tsx` and the four supplied article routes contain complete
  patient drafts, primary or authoritative source links and explicit clinical
  review/date gates. The comparison and side-effect articles keep eligibility
  as the primary next step; the maintenance and nutrition articles feed the
  starred aftercare route.
- `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx`,
  `src/app/complaints/page.tsx` and `src/app/medical-disclaimer/page.tsx` are
  factual, visibly incomplete drafts. They describe only the data and service
  behaviour already implemented, while leaving every unsupplied legal or
  commercial term for review.
- `src/lib/site-config.ts`, `src/components/layout/SiteFooter.tsx`,
  `src/components/sections/TrustBar.tsx` and the About/FAQ copy now share the
  exact configured sentence `CQC registration is in progress.`
- `src/lib/page-seo.ts` and `src/lib/eligibility.ts` were aligned with the real
  contact contract: name and email for a reply, not a message or health-data
  field. Metadata no longer promises unconfirmed post-treatment access.
- `src/app/error.tsx`, `src/app/not-found.tsx` and footer copy were brought into
  the same calm, direct voice.

The work is split into focused Conventional Commits:

- `c27af8a feat(content): explain aftercare and eligibility`
- `e3b689a feat(content): explain supported injection treatment`
- `2af77cb feat(content): write core service pages`
- `7ba155d fix(content): avoid unconfirmed aftercare access`
- `f315661 fix(content): state regulatory status exactly`
- `2a3d4b6 feat(content): draft patient guidance articles`
- `0470d40 feat(content): draft review-gated legal pages`
- `d65e5c2 fix(content): restore article conversion steps`
- `1c13d0d fix(content): align contact request wording`
- `75fda05 fix(content): avoid unconfirmed aftercare promise`
- `57c0548 fix(content): address clinical copy audit`

## What I deliberately did not do

- I did not invent a price, fee, package term, cancellation rule, aftercare
  duration, response time, review, outcome, article date or legal position.
- I did not turn oral Wegovy's UK authorisation into a promise that Akila's
  dispensing pharmacy can supply it.
- I did not prescribe doses, titration, switching, protein targets, supplements
  or individual side-effect management. Patient-facing clinical wording is
  sourced and still requires Akila's review.
- I did not claim low protein caused lean-mass loss or that tapering prevents
  regain. The evidence supports more careful statements: weight loss can include
  lean tissue, and stopping can be followed by regain.
- I did not change the privacy-preserving form architecture. Eligibility answers
  remain browser-local, the contact form remains name-and-email only, and Semble
  receives no eligibility values through its URL.
- I did not approve or remove the live clinical-review eligibility branch. Its
  question and triggers require Akila's clinical decision; the result wording is
  now neutral, but the branch remains a launch blocker.
- I did not enable Semble, Resend, GA4, WhatsApp, payments or any other external
  integration.
- I did not invent a fifth legal route. The route spine contains four legal
  pages; `/reviews` was completed separately as a trust page.
- I did not start the editor or QA/performance phase.

## Assumptions I made

- A page has one primary next step when it has one primary CTA destination;
  contextual source citations and `RelatedLinks` remain supporting navigation.
- Until Akila confirms commercial terms, a visible “Price awaiting
  confirmation” state is more accurate than a plausible placeholder amount.
- The site is still pre-launch, so explicit human/legal/clinical review gates are
  acceptable in source and honest uncertainty is acceptable in rendered copy.
- NHS, NICE, MHRA, electronic medicines compendium and the linked primary studies
  were the appropriate source hierarchy for these patient drafts on 5 August
  2026. Akila remains responsible for clinical sign-off and review dates.
- “Message any time” means a patient may send a message; it does not promise an
  immediate, round-the-clock or emergency response.
- A 390 × 844 viewport is a useful representative mobile content check, not a
  substitute for the QA agent's full accessibility and device matrix.

## Open questions

| Question | Who decides | Blocking? |
|---|---|---|
| What are the consultation, treatment, booking and aftercare prices, what does each include, and what are the cancellation/refund/subscription terms? | Akila, with commercial/legal advice | Launch blocker |
| What exactly happens after prescriptions end: duration, review cadence, access to Akila and separate price, if any? | Akila | Launch blocker for aftercare promises |
| Does Akila approve every treatment/article/FAQ clinical statement and its escalation wording? | Akila | Publication blocker for clinical pages |
| What are the publication, modification and next-review dates for all four articles? | Akila | Article publication blocker |
| Can Akila's dispensing pharmacy supply oral Wegovy, and should AMH offer it? | Akila and dispensing pharmacy | Blocking only for an oral-treatment claim |
| What is the exact hosted Semble URL, and has the full booking journey been tested? | Akila/integration owner | Booking blocker |
| Should the extra eligibility clinical-review question ship, and what answers trigger it? | Akila | Eligibility-flow blocker |
| Are Resend, the professional sending domain and operational reply time approved? | Akila/integration owner | Contact-launch blocker |
| What are the controller, processor, lawful-basis, retention, complaints, consumer-term and liability decisions? | Akila and UK healthcare/data-protection legal reviewer | Legal-page launch blocker |
| Who handles complaints about Akila, and what are the approved stages and timescales? | Akila and legal reviewer | Complaints-page launch blocker |
| Will GA4 be enabled after consent, and will WhatsApp remain off? | Akila | Not blocking if both remain off |
| Can Akila supply a consented professional portrait and genuine support-focused reviews? | Akila/patients | Not technically blocking; affects trust proof |

## TODO(human) and TODO(legal-review) markers I left

| File:line | What is needed | Who from |
|---|---|---|
| `src/components/forms/EligibilityFields.tsx:190` | Approve the extra clinical-review question and its triggers. | Akila |
| `src/lib/site-config.ts:36` | Make a deliberate launch decision before enabling WhatsApp. | Akila |
| `src/app/layout.tsx:38` | Supply GA4 ID only after privacy/legal approval and consent controls. | Akila/legal reviewer |
| `src/app/am-i-eligible/page.tsx:28` | Supply and test the exact hosted Semble URL. | Akila/integration owner |
| `src/app/how-it-works/page.tsx:69` | Confirm every price and exactly what each amount includes. | Akila |
| `src/app/pricing/page.tsx:108` | Confirm prices, inclusions, cancellation/refund terms, subscription arrangement and aftercare charge. | Akila/legal reviewer |
| `src/app/support-after-injections/page.tsx:142` | Clinically review the regain and maintenance explanation. | Akila |
| `src/app/support-after-injections/page.tsx:143` | Confirm aftercare duration, cadence, access after prescriptions and separate price. | Akila |
| `src/app/mounjaro/page.tsx:134` | Clinically review side-effect and escalation wording. | Akila |
| `src/app/wegovy/page.tsx:71` | Confirm pharmacy supply before offering oral Wegovy. | Akila/dispensing pharmacy |
| `src/app/wegovy/page.tsx:134` | Clinically review side-effect and escalation wording. | Akila |
| `src/app/faqs/page.tsx:138` | Clinically review the side-effect FAQ. | Akila |
| `src/app/reviews/page.tsx:77` | Supply genuine support-focused reviews, first-name attribution and consent. | Akila/patients |
| `src/app/about/page.tsx:104` | Supply and approve a professional portrait. | Akila |
| `src/app/contact/page.tsx:71` | Confirm Resend, professional email domain and reply-time expectation. | Akila/integration owner |
| `src/app/contact/actions.ts:41` | Verify the sending domain and supply approved sender/recipient addresses. | Akila/integration owner |
| `src/app/blog/page.tsx:32,40,48,56,91` | Clinically review all four articles and approve publication/modification/review dates. | Akila |
| `src/app/blog/mounjaro-vs-wegovy/page.tsx:97,176` | Approve dates, clinically review the comparison and confirm oral-Wegovy supply before adding tablets. | Akila/dispensing pharmacy |
| `src/app/blog/managing-side-effects/page.tsx:63,153` | Approve dates and clinically review self-care and urgent-escalation wording. | Akila |
| `src/app/blog/keeping-weight-off-after-stopping/page.tsx:64,173,174` | Approve dates/clinical guidance and confirm the post-treatment operating model and price. | Akila |
| `src/app/blog/protein-and-nutrition-on-injections/page.tsx:62,86,168` | Approve dates, any future numeric protein target and all nutrition/kidney/supplement/activity wording. | Akila |
| `src/app/privacy-policy/page.tsx:46,107,168` | Approve the full notice, lawful bases/special-category condition and all mandatory Article 13/14 wording. | UK data-protection legal reviewer |
| `src/app/privacy-policy/page.tsx:60,95,130` | Confirm controller/contact/ICO/DPO details, supplier privacy roles/locations and retention schedule. | Akila/legal reviewer/integration owners |
| `src/app/terms/page.tsx:46,98,124` | Approve complete consumer, healthcare, cancellation, liability, jurisdiction and dispute terms. | UK healthcare/consumer legal reviewer |
| `src/app/terms/page.tsx:87,123` | Confirm contract formation, booking/payment rules and every commercial/service-delivery term. | Akila |
| `src/app/complaints/page.tsx:43,107` | Approve the complete complaints procedure, accessibility, confidentiality, candour and escalation wording. | Legal reviewer |
| `src/app/complaints/page.tsx:62,73` | Name the handler and independent alternative; confirm stages and timescales. | Akila/legal reviewer |
| `src/app/medical-disclaimer/page.tsx:43,105` | Approve clinical/legal scope, effective date, emergency wording, liability interaction and external links. | Akila/healthcare legal reviewer |

## Verification

```text
npm run verify       PASS
  typecheck          PASS
  lint               PASS
  test               PASS — 12/12 files, 67/67 tests
  build              PASS — 25/25 static pages generated

npm run copy-check   PASS
  structure          0 issues — every spec has a page, every page has a spec
  tone               0 warnings
```

The sandboxed build attempt could not reach Google Fonts; the approved
network-enabled rerun above passed. The sandboxed copy-check attempt could not
create `tsx`'s temporary IPC socket; its approved rerun above passed.

Pre-audit mobile content QA at 390 × 844 covered `/`,
`/support-after-injections`, `/pricing`, `/faqs`, `/contact`,
`/blog/managing-side-effects` and `/privacy-policy`. Each checked route had one
H1 and no horizontal overflow. Pricing rendered three confirmation placeholders
and no currency amount; FAQ had 11 visible/schema-identical entries; contact had
no message/health-data field; aftercare had no unconfirmed post-prescription
access promise. The audit then moved the home/aftercare `AnswerFirst` blocks and
added treatment-page CTAs, so the QA agent should visually retest `/`,
`/support-after-injections`, `/weight-loss-injections`, `/mounjaro` and `/wegovy`.

## What the next agent needs to know

1. The strongest copy is intentionally selective: it speaks to the person who
   already received a pen and an app but could not reach a clinician. Do not edit
   it back into generic weight-loss marketing or add urgency, transformation
   language or cheap/fast positioning.
2. The clinical copy is sourced but not signed off. Preserve the review gates,
   especially on side effects, escalation, stopping, nutrition and oral Wegovy.
   Do not turn citations into an AMH outcome or service promise.
3. Pricing, legal terms and the post-treatment operating model remain the real
   launch blockers. The honest placeholders are deliberate. FAQ schema must
   continue to derive from the exact visible answers, and contact must remain
   name-and-email only unless architecture/privacy are deliberately reopened.
4. The live eligibility branch still depends on an unapproved question and
   trigger (`EligibilityFields.tsx:190`). The neutral result copy is safe, but
   Akila must approve or remove that branch before launch. `/complaints` now
   states that no operational route exists; do not turn its contact link into a
   complaints submission path until the operation actually exists.
