# Handoff — editor — 5 August 2026

## What I was asked to do

Read every patient-facing word as the named patient, edit surgically rather than
rewrite wholesale, check all 21 routes against their job, worry and one next
step, preserve every sourced clinical nuance and launch gate, keep each
`AnswerFirst` at 40–60 words, and produce both the editor report and this QA
handoff. I was also asked to run `npm run copy-check` and `npm run verify`, use
one concern per Conventional Commit and avoid all clinical, commercial, routing,
design and integration invention.

## What I built

- `src/lib/eligibility.ts` — removed celebratory “Good news” language and an
  unsupported licensing claim. Outcomes now describe AMH Wellness's configured
  starting criteria, preserve dignity and make clear that Akila decides
  suitability.
- `src/app/page.tsx`, `src/app/how-it-works/page.tsx` and
  `src/app/support-after-injections/page.tsx` — made the same-pharmacist
  relationship precise, removed generic conversion language, preserved
  uncertainty about appetite change and put the explanation of regain before
  the maintenance plan.
- `src/app/mounjaro/page.tsx`, `src/app/wegovy/page.tsx`, the FAQ, footer and
  optional WhatsApp copy — aligned message access with the published response
  hours without implying a guaranteed turnaround time.
- `src/app/pricing/page.tsx` and `src/app/reviews/page.tsx` — retained honest
  visible placeholders while removing internal commercial language and an
  invented first-name-only attribution policy.
- `src/app/blog/**`, `src/app/medical-disclaimer/page.tsx` and the legal routes
  — replaced developer/editor language with direct patient language while
  preserving every clinical and legal review gate.
- `src/app/contact/page.tsx`, `src/components/forms/EnquiryForm.tsx` and the
  contact spec in `src/lib/patient-journey.ts` — aligned the words with the
  privacy-safe name-and-email request. No message or health field was restored.
- `src/lib/navigation.ts` and `src/lib/internal-links.ts` — standardised the
  primary action to `Check if you may be eligible` and bounded maintenance link
  labels without changing any destination.
- `src/lib/page-seo.ts` — kept descriptions within the tested 140–160-character
  contract while removing unconfirmed aftercare, terms and complaints claims.
- `src/lib/schema.ts` and `tests/schema.test.ts` — stopped publishing the
  non-operational professional email and generic slogan in Organisation schema;
  the regression test was written red before implementation.
- `src/lib/site-config.ts` — replaced the generic tagline and description with
  confirmed facts, made the four-week review step consistent in voice, and
  bounded the canonical positioning to nutrition guidance, reviews and
  maintenance planning from the start.
- `public/llms.txt` — aligned AI-facing copy with the same factual contract:
  exact CQC wording, no public unconfirmed email and no invented
  post-prescription package.
- `prompts/handoffs/04-editor-report.md` — records the exact editorial findings,
  proposed resolutions, Akila decisions and page-by-page verdicts.

### Focused commits

- `f56c847 fix(copy): make eligibility outcomes precise`
- `51636c9 fix(copy): clarify the support proposition`
- `f78e856 fix(copy): bound the support promise`
- `1d5923a fix(copy): keep review attribution unconfirmed`
- `e4ce7d2 fix(copy): remove unconfirmed public identity claims`
- `1776326 fix(copy): align the review-step voice`
- `cb7948f fix(seo): keep metadata promises bounded`
- `adb5962 fix(copy): make the service description factual`
- `ddd334c fix(copy): explain unconfirmed pricing plainly`
- `9880616 fix(copy): remove internal editorial language`
- `65d425d fix(copy): align the contact request contract`
- `c24ca76 fix(copy): qualify eligibility calls to action`
- `7a370d9 fix(copy): replace system language with patient wording`
- `0555427 fix(copy): align the AI summary with confirmed facts`
- `a6535b4 fix(copy): explain draft legal status to patients`
- `8b72503 fix(copy): bound maintenance link promises`

The final canonical-positioning line, the final Terms sentence and both handoff
files were left for the lead to commit because the environment stopped allowing
Git index writes after the escalated-command usage limit was reached.

## What I deliberately did not do

- I did not invent a price, credential, statistic, delivery interpretation,
  review, response time, patient result, post-prescription duration or legal
  position.
- I did not call Akila “Dr”. Public CQC copy remains exactly
  `CQC registration is in progress.`
- I did not decide whether “7-day delivery” means every day of the week or a
  7-day transit time.
- I did not add contact capture to eligibility. That is a commercial/privacy
  decision and would require a separately consented name-and-email boundary,
  architecture review and tests.
- I did not invent a complaints route. The honest unavailable state remains a
  launch blocker.
- I did not restore free-text contact, expose a phone/email, enable Semble,
  Resend, GA4, WhatsApp or payment, or change clinical logic.
- I did not change route destinations, component architecture, design tokens,
  layout, metadata/schema contracts or styling.
- I did not start the QA/performance phase.

## Assumptions I made

- One primary next step means one primary CTA destination; source links and the
  existing `RelatedLinks` remain supporting navigation.
- Maintenance planning from the first consultation is confirmed in
  `siteConfig.includes`; the duration, frequency, access and price of any
  separate service after prescriptions end are not confirmed.
- Message access means a patient may send a non-urgent message between
  appointments. The published hours are when Akila handles messages, not a
  guaranteed turnaround.
- It is safer to omit a non-operational email from schema and `llms.txt` than to
  publish a plausible contact route.
- The 21 AnswerFirst word counts in the editor report include interpolated
  clinician values as rendered.

## Open questions

| Question | Who decides | Blocking? |
|---|---|---|
| Should eligibility stop being described as contact capture, or should every outcome offer a separate name/email-only opt-in? | Akila with privacy/architecture owner | Yes for the declared conversion strategy; not for privacy-safe operation |
| What are all prices, inclusions, payment, cancellation, refund, subscription and medicine-return terms? | Akila with legal/commercial advice | Launch blocker |
| What exactly happens after prescriptions end: duration, frequency, access and price? | Akila | Launch blocker for post-prescription promises |
| What is the approved complaint route, handler, alternative for complaints about Akila, stages, timescales and escalation? | Akila with legal/regulatory reviewer | Hard launch blocker |
| Is the extra eligibility clinical-review question approved, and what triggers it? | Akila | Eligibility launch blocker |
| Does Akila approve all treatment, FAQ and article clinical wording and escalation advice? | Akila | Publication blocker |
| What are the publication, modification and next-review dates for all 4 articles? | Akila | Article publication blocker |
| Can the dispensing pharmacy supply oral Wegovy, and should AMH offer it? | Akila and dispensing pharmacy | Blocking for any oral-treatment claim |
| Does “7-day delivery” mean 7-days-a-week service or a delivery duration? | Akila and dispensing pharmacy | Copy/expectation blocker |
| What is the tested production Semble URL and booking/questionnaire/payment sequence? | Akila/integration owner | Booking blocker |
| Are Resend, the professional domain, from/to addresses and reply expectation approved? | Akila/integration owner | Contact-launch blocker |
| Will GA4 be approved with the broad eligibility bucket and history page views disabled? Will WhatsApp remain off? | Akila/legal/launch owner | Blocking only before either is enabled |
| What are the controller, processor, lawful-basis, retention, consumer-term, complaints and liability decisions? | Akila with UK healthcare/data-protection legal reviewers | Legal-page launch blocker |
| Can Akila supply a consented portrait and genuine consented reviews with an approved attribution method? | Akila/patients | Not technically blocking; trust proof remains incomplete |

## TODO(human) markers I left

| File:line | What is needed | Who from |
|---|---|---|
| `src/components/forms/EligibilityFields.tsx:190` | Approve the extra clinical-review question and its triggers. | Akila |
| `src/app/am-i-eligible/page.tsx:28` | Supply and end-to-end test the exact hosted Semble URL. | Akila/integration owner |
| `src/lib/site-config.ts:35` | Make a deliberate launch decision before enabling WhatsApp. | Akila |
| `src/app/layout.tsx:38` | Approve GA processing/wording, disable history page views and then supply the GA ID. | Akila/legal/launch owner |
| `src/app/contact/actions.ts:41`; `src/app/contact/page.tsx:71` | Confirm Resend, verify the professional domain, addresses and operational reply expectation. | Akila/integration owner |
| `src/app/how-it-works/page.tsx:69`; `src/app/pricing/page.tsx:107` | Confirm every price, inclusion and commercial term. | Akila/legal reviewer |
| `src/app/support-after-injections/page.tsx:143-144` | Clinically review the regain explanation; confirm post-prescription duration, frequency, access and price. | Akila |
| `src/app/mounjaro/page.tsx:134` | Clinically review side-effect and escalation wording. | Akila |
| `src/app/wegovy/page.tsx:71,135` | Confirm oral supply and clinically review side-effect/escalation wording. | Akila/dispensing pharmacy |
| `src/app/faqs/page.tsx:137` | Clinically review the side-effect FAQ. | Akila |
| `src/app/blog/page.tsx:32,40,48,56,90` | Review all articles and approve publication, modification and review dates. | Akila |
| `src/app/blog/mounjaro-vs-wegovy/page.tsx:97,176` | Approve dates, clinically review the comparison and confirm oral-Wegovy supply before adding tablets. | Akila/dispensing pharmacy |
| `src/app/blog/managing-side-effects/page.tsx:63,153` | Approve dates and self-care/urgent-escalation wording. | Akila |
| `src/app/blog/keeping-weight-off-after-stopping/page.tsx:64,173-174` | Approve dates and guidance; confirm the post-treatment model and price. | Akila |
| `src/app/blog/protein-and-nutrition-on-injections/page.tsx:62,85,167` | Approve dates, any numeric protein target and all nutrition/kidney/supplement/activity wording. | Akila |
| `src/app/about/page.tsx:103` | Supply and approve a professional portrait. | Akila |
| `src/app/reviews/page.tsx:76` | Supply genuine support-focused reviews, approved attribution and publication consent. | Akila/patients |
| `src/app/privacy-policy/page.tsx:46,107,169` | Approve the notice, lawful bases/special-category condition and all mandatory information. | UK data-protection legal reviewer |
| `src/app/privacy-policy/page.tsx:60,95,131` | Confirm controller/contact/ICO details, supplier roles/locations and retention schedule. | Akila/legal/integration owners |
| `src/app/terms/page.tsx:46,99,124` | Approve consumer, healthcare, cancellation, liability, governing-law and dispute terms. | UK healthcare/consumer legal reviewer |
| `src/app/terms/page.tsx:87,123` | Confirm contract formation, booking/payment rules and all commercial/service-delivery terms. | Akila |
| `src/app/complaints/page.tsx:43,107` | Approve the complete procedure, accessibility, confidentiality, candour and escalation wording. | Legal/regulatory reviewer |
| `src/app/complaints/page.tsx:62,73` | Name the handler/independent alternative and confirm stages and timescales. | Akila/legal reviewer |
| `src/app/medical-disclaimer/page.tsx:43,105` | Approve clinical/legal scope, effective date, emergency wording, liability interaction and external links. | Akila/healthcare legal reviewer |

Two additional unresolved gates are not represented by TODO comments:

- `src/lib/patient-journey.ts:145` — eligibility lead-capture job conflicts with
  the privacy-safe implementation.
- `src/lib/patient-journey.ts:309` — complaints route job cannot be met until an
  operational route exists.

## Verification

```text
npm run verify       BLOCKED BY EXTERNAL FONT FETCH
  typecheck          PASS
  lint               PASS
  test               PASS — 12/12 files, 68/68 tests
  build              NOT COMPLETE — sandbox could not fetch Inter from
                     fonts.googleapis.com

npm run copy-check   exact command passed earlier in the editorial pass:
                     0 structural, 0 tone warnings
final source check   PASS via `node --import tsx scripts/copy-check.ts`:
                     0 structural, 0 tone warnings
```

The required network-enabled `npm run verify` rerun and the final exact npm
copy-check wrapper were attempted, but approval was rejected because the
environment had reached its escalated-command usage limit. The exact npm
copy-check wrapper fails only because `tsx` cannot create its sandbox IPC socket;
running the same script through Node on the final worktree passed. Do not report
the editor phase fully complete until the lead reruns both exact commands and
the production build passes.

## What the next agent needs to know

1. Retest all eligibility branches and the longer `Check if you may be eligible`
   CTA at mobile widths. Do not add contact capture without the Akila/privacy
   decision above.
2. Visually retest `/`, `/support-after-injections`, `/pricing`, `/contact`,
   `/faqs`, `/terms` and `/complaints`; check the longer four-week review title,
   legal-draft paragraphs and CTA wrapping at 320–390 px with no overflow.
3. Verify rendered metadata, FAQ parity, Organisation schema and `llms.txt`:
   there must be no unconfirmed email or slogan, and no promise of a separate
   post-prescription package. Then rerun exact `npm run verify` and
   `npm run copy-check` with the required network/IPC permissions before any
   launch-quality report.
