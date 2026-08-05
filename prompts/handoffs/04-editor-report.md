# Editor report — 5 August 2026

I read all 21 routes, their shared patient-facing components, metadata and the
machine-facing `llms.txt` as the patient described in the brief: usually 35–60,
already let down by a pen-and-app service, and now looking for a named person.

The initial exact `npm run copy-check` found 0 structural issues and 0 tone
warnings. My verdict is that none was a false positive; the checker was simply
too narrow to catch the important editorial problems. It did not detect
celebratory eligibility copy, deterministic clinical wording, an invented
review-attribution policy, internal system language or unconfirmed promises in
metadata and `llms.txt`. Those were found by the human edit and an independent
read-only audit.

## MUST FIX

### Outstanding before launch

| File:line | What is wrong | Required resolution |
|---|---|---|
| `src/lib/patient-journey.ts:145` | The declared eligibility job says the flow captures contact details either way. The privacy-safe implementation sends no eligibility answers or contact details, and decline outcomes lead to guidance only. The page therefore does not fully perform its declared lead-capture job. | Akila and the privacy/legal owner must choose: either replace the final clause with `and give every result a useful next step`, or commission a separately consented name-and-email-only opt-in on every result. Any opt-in must transmit no BMI, answers or outcome and requires architecture/privacy review and tests. |
| `src/lib/patient-journey.ts:309`; `src/app/complaints/page.tsx:43-73` | The route job promises a proper complaints route, but none has been supplied. The contact form cannot accept complaint details. Copy cannot solve this operational gap. | Akila and a legal/regulatory reviewer must supply the accessible route, named handler, alternative for complaints about Akila, stages, timescales and independent escalation. Then replace the honest unavailable state with those approved facts. This is a hard launch blocker. |

### Resolved in this editorial pass

| File:line | What was wrong | Replacement applied |
|---|---|---|
| `src/lib/eligibility.ts:87-98` | “Good news” celebrated a preliminary outcome, and the decline copy presented AMH criteria as a licensing claim. | Outcomes now say `You appear to meet the starting criteria` or `You do not meet the starting criteria right now`; the explanation imports AMH's configured thresholds and preserves a dignified next step. |
| `src/app/page.tsx:54,76-90` | “The pharmacist who stays with you” could imply indefinite access; “built differently” was generic conversion language; “No obligation” was not sourced. | The first screen now promises the same pharmacist at each review, names Akila, explains the previous-service problem precisely and states that Akila confirms suitability. |
| `src/app/support-after-injections/page.tsx:68-128` | The eyebrow blamed competitors, the answer made appetite change sound certain and some phrasing sounded like marketing reassurance. | The page now explains how appetite *may* change, treats regain as documented rather than as failure, and explains the practical gap before presenting maintenance planning. |
| `src/app/pricing/page.tsx:73-103` | The page referred to amounts that did not exist and exposed internal “commercial structure/weight” language. | It now says every item is marked `Price awaiting confirmation`, lists exactly what remains unknown and gives the patient no invented figure. |
| `src/app/reviews/page.tsx:36-76` | A first-name-only review policy had been invented. | Attribution remains explicitly undecided; only genuine, consented reviews may be added. |
| `src/lib/page-seo.ts:13-135` | Search descriptions implied confirmed aftercare, operative terms and an operational complaints route. | Metadata now limits the promise to maintenance planning and states the draft/privacy/legal/complaints status honestly. All SEO length and uniqueness tests still pass. |
| `src/lib/schema.ts:30-43`; `tests/schema.test.ts:30-37` | Organisation schema published a non-operational professional email and a generic marketing slogan. | Both fields are omitted, with a regression test. |
| `src/app/privacy-policy/page.tsx:76-82`; contact and eligibility copy | “Allowlisted journey events” and “hosted clinical booking process” were developer language. | Copy now says a limited set of site actions and identifies external booking and health-questionnaire systems in plain language. |
| `src/lib/navigation.ts:74` and all eligibility CTAs | “Check your eligibility” overstated what a browser-only starting screen decides. | Primary labels now consistently say `Check if you may be eligible`. |
| `public/llms.txt` | The AI summary published the non-operational email, vague “holistic” copy, non-exact CQC wording and unconfirmed support after prescriptions end. | It now uses confirmed service facts, the exact CQC sentence and a bounded maintenance-planning promise; the email is omitted. |

## CONSIDER

- `src/app/faqs/page.tsx:70` renders the configured phrase “7-day delivery
  available on most injections”. A patient may read this as a 7-day transit
  time rather than delivery on 7 days of the week. Akila should clarify the
  source fact before an editor changes it.
- The `/support-after-injections` route name necessarily sounds like an
  after-treatment service. The page now makes the operating uncertainty clear,
  and link labels promise only maintenance planning. Keep that boundary until
  Akila confirms duration, frequency, access and price.
- The name-and-email contact request protects health data but requires a second
  exchange before Akila knows the question. That is an operational trade-off,
  not a reason to restore free text without privacy and architecture review.
- Keep `RelatedLinks` as supporting guidance. They currently preserve the SEO
  paths without becoming competing primary calls to action.
- The source files still contain historical `STATUS: scaffold` comments. They
  are not patient-facing and were left alone in this copy-only phase, but QA may
  remove or update them as internal housekeeping if desired.

## FOR AKILA

- Confirm every consultation, booking, treatment and aftercare price; what each
  includes; payment timing; cancellation, refund, subscription and medicine
  return terms.
- Decide the exact post-prescription model: whether it exists as a separate
  service, how long it lasts, review frequency, access to Akila and price.
- Decide whether the eligibility flow remains a private starting screen or also
  offers a separate contact opt-in on every outcome.
- Approve or remove the extra eligibility clinical-review question and define
  its triggers.
- Clinically review both treatment pages, the side-effect FAQ, the aftercare
  explanation and all 4 articles; approve publication, modification and next
  review dates.
- Confirm whether the dispensing pharmacy can supply oral Wegovy and whether it
  should be presented as an AMH option.
- Clarify what “7-day delivery” means.
- Supply and test the exact Semble URL and the booking/questionnaire/payment
  sequence. Confirm Resend, the professional domain and realistic reply
  expectation. Keep GA4 and WhatsApp off until their recorded launch decisions
  are complete.
- Supply a complete privacy notice, terms, complaints procedure and medical
  disclaimer approved by the relevant UK legal/healthcare reviewers.
- Supply genuine reviews with publication consent and an agreed attribution
  method, plus an approved professional portrait if available.

## WORKING WELL

- `/support-after-injections` is the strongest page. It explains why weight can
  return before it offers the plan, preserves uncertainty and does not blame the
  patient.
- `/mounjaro` and `/wegovy` work for cold search traffic: Akila, the one-to-one
  consultation, four-weekly reviews and a route for non-urgent concerns are all
  visible in the first answer.
- Every eligibility outcome preserves dignity and a useful next step. No result
  is a prescribing decision, and all CTAs now say “may be eligible”.
- Pricing and reviews use honest visible placeholders instead of plausible
  numbers or social proof.
- Contact remains name-and-email only. No health answers, BMI, free text or
  eligibility outcome are sent by the page.
- The exact sentence `CQC registration is in progress.` is now sufficient on
  every rendered surface; defensive repetition was removed.
- All 21 `AnswerFirst` blocks remain self-contained, identify AMH Wellness,
  answer in the first sentence and are 40–60 words.

| Route | Words | Editorial verdict |
|---|---:|---|
| `/` | 47 | Pass — named clinician, previous-service failure and maintenance are visible immediately. |
| `/how-it-works` | 49 | Pass — the process and unconfirmed cost are explicit. |
| `/am-i-eligible` | 52 | Copy passes; declared lead-capture job remains an Akila/privacy decision. |
| `/pricing` | 46 | Honest placeholder; fixed-price job remains blocked by sign-off. |
| `/about` | 45 | Pass — named, registered and accountable pharmacist. |
| `/reviews` | 45 | Honest placeholder; proof awaits genuine consented reviews. |
| `/contact` | 46 | Pass — matches the name-and-email-only contract. |
| `/weight-loss-injections` | 46 | Pass — the support, not the pen, is the service. |
| `/mounjaro` | 45 | Pass — Akila and ongoing help are clear on a cold landing. |
| `/wegovy` | 45 | Pass for injections; oral supply remains unresolved. |
| `/support-after-injections` | 52 | Pass — truth first, then maintenance planning. |
| `/blog` | 49 | Pass — useful hub with explicit clinical-review gate. |
| `/blog/mounjaro-vs-wegovy` | 46 | Pass — no universal winner or superiority claim. |
| `/blog/keeping-weight-off-after-stopping` | 50 | Pass — no invented post-treatment package. |
| `/blog/managing-side-effects` | 48 | Pass editorially; clinical sign-off remains mandatory. |
| `/blog/protein-and-nutrition-on-injections` | 49 | Pass — no universal protein target. |
| `/faqs` | 44 | Pass — second person, visible/schema-identical answers. |
| `/privacy-policy` | 50 | Candid factual draft; legal approval remains blocking. |
| `/terms` | 48 | Candid factual draft; not operative terms. |
| `/complaints` | 49 | Honest copy, but the route job fails until an operation exists. |
| `/medical-disclaimer` | 47 | Pass editorially; Akila and legal approval remain mandatory. |

No invented price, credential, statistic, delivery promise, patient result or
review was introduced. Akila is never called “Dr”.
