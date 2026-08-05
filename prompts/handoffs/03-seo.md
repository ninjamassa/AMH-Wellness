# Handoff — SEO / AEO / GEO — 2026-08-05

## What I was asked to do

Complete phase 2 only: audit and enforce unique metadata for all 21 declared
routes, extend and wire the structured-data layer, specify the exact question
for every `AnswerFirst`, build the strategic internal-link paths, keep
`llms.txt` and social metadata current, validate the rendered machine-readable
output, and leave body-copy, design, integrations, editing and QA work to their
later specialist phases.

## What I built

- `src/lib/page-seo.ts` — one canonical registry for all 21 routes. Every
  rendered title is under 60 characters after the ` | AMH Wellness` template is
  applied, and every unique description is 140–160 characters. The wording
  follows the route targets without keyword stuffing and states that pricing is
  awaiting Akila's confirmation.
- All 21 `src/app/**/page.tsx` route files — still call `buildMetadata()`
  themselves, now using the tested registry rather than independent strings.
- `src/lib/answer-blocks.ts` — the exact patient-shaped question each content
  answer must address. Every route imports its question from this file, so the
  content brief and rendered `aria-label` cannot silently drift.
- `src/lib/internal-links.ts` and
  `src/components/sections/RelatedLinks.tsx` — typed, rendered search pathways.
  The Mounjaro, Wegovy and weight-loss-injection entry pages link to aftercare
  and eligibility; every article links to its matching service page; the blog
  hub exposes all 4 launch articles.
- `src/lib/schema.ts` — stable page-node IDs, exported entity IDs, absolute URLs
  and linked builders for `MedicalTherapy`, `FAQPage`, `HowTo`,
  `MedicalWebPage` and `BreadcrumbList`. Article schema now requires an
  explicit `lastReviewed` date rather than silently treating `dateModified` as
  clinical review. Organisation markup now includes the supplied logo and the
  1200×630 social image.
- `src/app/how-it-works/page.tsx` — renders the configured journey visibly and
  emits matching `HowTo` JSON-LD from `siteConfig.journey` in the initial HTML.
- `src/app/weight-loss-injections/page.tsx`, `src/app/mounjaro/page.tsx` and
  `src/app/wegovy/page.tsx` — emit linked `MedicalTherapy` JSON-LD in the initial
  HTML.
- All 4 article route files — emit 3-level breadcrumb JSON-LD and carry an
  explicit human gate for publication, modification and clinical-review dates.
- `src/app/faqs/page.tsx` — records the required integration contract: the
  content agent must render final answers and pass that same collection into
  `faqSchema()`. This avoids structured answers that differ from, or are absent
  from, the visible page.
- `public/llms.txt` — adds the exact supplied service description, fully remote
  status, registered-office distinction, CQC status as `Registration in
  progress`, all resource pages, and the explicit warning that pricing is not
  confirmed.
- `public/og-default.png` — a 1200×630 social image mechanically derived from
  the supplied AMH Wellness brand artwork. `buildMetadata()` already uses it for
  Open Graph and Twitter cards on every route.
- `tests/seo.test.ts` — 8 tests covering route completeness, rendered title and
  description lengths, uniqueness, social-image dimensions, patient-shaped
  answer questions, aftercare pathways, article-to-service paths and blog-hub
  discoverability.
- `tests/schema.test.ts` — 4 tests covering FAQ, configured HowTo steps,
  explicit article review metadata and resolution of every internal `@id`
  reference in a composed article graph.

### Exact answer-block questions for the content agent

| Route | Question the 40–60 word answer must answer |
|---|---|
| `/` | Where can I get one-to-one weight loss support in the UK? |
| `/how-it-works` | How does online weight loss treatment work in the UK? |
| `/am-i-eligible` | Am I eligible for weight loss injections in the UK? |
| `/pricing` | How much do weight loss injections cost in the UK? |
| `/about` | Who is the prescribing pharmacist behind AMH Wellness? |
| `/reviews` | What do patients say about AMH Wellness? |
| `/contact` | How can I contact AMH Wellness? |
| `/weight-loss-injections` | How do weight loss injections work in the UK? |
| `/mounjaro` | How does Mounjaro treatment work with AMH Wellness? |
| `/wegovy` | How does Wegovy treatment work with AMH Wellness? |
| `/support-after-injections` | What happens when you stop Mounjaro? |
| `/blog` | Where can I find pharmacist-led weight loss guidance? |
| `/blog/mounjaro-vs-wegovy` | Mounjaro vs Wegovy: which is right for me? |
| `/blog/keeping-weight-off-after-stopping` | How do you keep weight off after stopping Mounjaro? |
| `/blog/managing-side-effects` | How do you manage Mounjaro and Wegovy side effects? |
| `/blog/protein-and-nutrition-on-injections` | How much protein should you eat on weight loss injections? |
| `/faqs` | What should I know before starting weight loss injections? |
| `/privacy-policy` | How does AMH Wellness use and protect my information? |
| `/terms` | What terms apply when I use AMH Wellness? |
| `/complaints` | How do I make a complaint about AMH Wellness? |
| `/medical-disclaimer` | Does this website replace personal medical advice? |

## What I deliberately did not do

- I did not write any `AnswerFirst` answers or substantive page/article copy.
  That belongs to the content phase; most scaffolds still honestly say
  `Content in progress.`
- I did not publish `FAQPage` JSON-LD against an empty scaffold. Google's rules
  require structured answers to match answers visible to the patient. The
  builder and route integration instruction are ready for the final FAQ data.
- I did not emit `MedicalWebPage`, `reviewedBy` or `lastReviewed` claims on the
  4 article scaffolds. No source says Akila has clinically reviewed unfinished
  articles, and no publication/review dates were supplied. Inventing those
  facts would be worse than leaving the honest pre-publication gate.
- I did not add per-route social images. One lightweight default meets the
  prompt; bespoke cards should wait until the design system and final titles
  settle.
- I did not add a public telephone, a price range or the registered office as a
  clinic to `MedicalBusiness` markup. Google labels those fields optional, and
  each would conflict with the supplied business facts if guessed or exposed.
- I did not change Google Business Profile, Instagram, Search Console or any
  external account. No external write was requested in this phase.
- I did not create a commit. `main` still has no initial commit and the supplied
  scaffold remains entirely untracked, so a phase-only commit would create a
  misleading project baseline.

## Assumptions I made

- The 60-character title budget includes the root title-template suffix, not
  just the page-specific title.
- The supplied square AMH Wellness artwork is approved enough to crop into a
  default social card; Akila/design can replace it later without touching page
  metadata.
- `MedicalTherapy` is appropriate for the 3 treatment entry pages. I did not
  apply it to aftercare, which is broader than medication treatment.
- The small `RelatedLinks` server component is a structural SEO pathway, not a
  final design. Later agents may restyle or relocate it but must retain the
  destinations in `internalLinkPlan`.
- Schema-only article breadcrumbs are proportionate at scaffold stage. Visible
  breadcrumbs can be added by the design/content phases if they improve the
  final article layout.
- Google's 3 remaining non-critical notices are intentionally acceptable: the
  phone is private, pricing is unconfirmed, and the South Croydon address is a
  registered office rather than a clinic.

## Open questions

| Question | Who decides | Blocking? |
|---|---|---|
| What are the real publication, modification and clinical-review dates for each final article, and has Akila reviewed each one? | Akila | Yes for publishing the articles and their `MedicalWebPage` markup |
| What is the final visible FAQ collection? | Content agent drafts; Akila approves | Yes for `FAQPage` markup and launch-quality FAQs |
| What are the confirmed consultation, booking-fee and programme prices? | Akila | Yes for launch; current metadata remains explicitly unconfirmed |
| Is the supplied brand artwork approved as the launch social card? | Akila / design agent | No; the current default is valid and replaceable |
| Which exact entity description and URL are live on Google Business Profile and Instagram? | Akila / launch owner | No for code; important for GEO corroboration before launch |

## TODO(human) markers I left

| File:line | What is needed | Who from |
|---|---|---|
| `src/app/blog/mounjaro-vs-wegovy/page.tsx:56` | Approve and clinically review the final article; confirm published, modified and reviewed dates before emitting the visible review line and `MedicalWebPage`. | Akila |
| `src/app/blog/keeping-weight-off-after-stopping/page.tsx:58` | Same 3 date confirmations and clinical review for the flagship aftercare article. | Akila |
| `src/app/blog/managing-side-effects/page.tsx:56` | Same 3 date confirmations and clinical review for the side-effects article. | Akila |
| `src/app/blog/protein-and-nutrition-on-injections/page.tsx:56` | Same 3 date confirmations and clinical review for the nutrition article. | Akila |

The architect's existing clinical-review-question marker remains at
`src/components/forms/EligibilityFlow.tsx:200`; this phase did not change it.

## Verification

```text
npm run typecheck   pass
npm run lint        pass — 0 errors, 0 warnings
npm run compliance  not available — no such package script
npm run copy-check  pass — 0 structural, 0 tone warnings
npm run test        pass — 45/45
npm run build       pass — 25 static pages generated
npm run verify      pass
```

The sandboxed build could not fetch the configured Google font. The exact
`npm run verify` command was rerun with approved network access and passed end
to end.

Rendered browser checks confirmed unique title, description, canonical,
1200×630 Open Graph image, answer question and initial-HTML JSON-LD on
`/how-it-works`, `/mounjaro` and the flagship aftercare article. Treatment and
article pathways rendered at the expected destinations, and the browser console
had no errors.

Google Rich Results Test was run with the rendered `/mounjaro` markup as code:

- Result: 2 valid items eligible for rich results (`Local businesses` and
  `Organization`), with no invalid items.
- Evidence URL:
  `https://search.google.com/test/rich-results/result?id=jGqk2cjdDKG330E31yQL3Q`
- 3 non-critical optional notices remain: `telephone`, `priceRange`, `address`.
  They are deliberately omitted for the factual reasons above.
- HowTo, MedicalTherapy and breadcrumbs are not all Google rich-result
  categories, so their syntax, linkage and content parity are additionally
  covered by the schema tests and rendered-DOM checks.

## What the next agent needs to know

1. Write every `AnswerFirst` answer against `answerBlockQuestions`, 40–60 words,
   first sentence direct, naming AMH Wellness, and self-contained. Do not change
   the question contract casually; tests enforce all 21 routes.
2. Use one shared visible data source for FAQ copy and `faqSchema()`. For each
   article, add the visible reviewer/date and `articleSchema()` only after Akila
   supplies real dates and confirms clinical review.
3. Preserve `internalLinkPlan`: treatment pages must continue to route through
   aftercare, articles through a service page, and the journey eventually to
   eligibility. Preserve `pageSeo` length/uniqueness tests when editing titles.
