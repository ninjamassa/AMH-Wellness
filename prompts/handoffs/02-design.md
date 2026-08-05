# Handoff — design system — 2026-08-05

## What I was asked to do

Complete the design-system phase only: audit the live scaffold; finish the
tokens and reusable UI sections; make the header responsive with an accessible
mobile menu; style the eligibility and enquiry flows; verify responsive,
keyboard and contrast behaviour; preserve the architect and SEO contracts; run
the required checks; and commit the work as focused Conventional Commits.

## What I built

- `src/app/globals.css` — completed the colour, typography, spacing, container,
  radius, shadow, motion, touch-target and stacking tokens. The fluid type
  tokens now generate working Tailwind utilities; the previous
  `text-[length:--text-*]` forms resolved to the 16px body default in the live
  browser. Global focus, selection, reduced-motion and skip-link behaviour are
  also defined here.
- `src/components/ui/Button.tsx` and `Container.tsx` — token-driven button and
  layout primitives with 44px minimum targets, AA-safe secondary-button colour,
  stable no-wrap labels and consistent calm motion.
- `src/components/sections/FaqAccordion.tsx` — native `<details>` disclosure,
  with no client JavaScript.
- `src/components/sections/TestimonialCard.tsx` — consent-gated testimonial
  presentation; an entry with `consentConfirmed: false` renders nothing.
- `src/components/sections/PricingTable.tsx` and
  `src/lib/presentation.ts` — responsive pricing cards that can only format an
  amount from the `confirmed` pricing branch. The unconfirmed branch says
  `Price awaiting confirmation` and cannot accidentally expose a number.
- `src/components/sections/ArticleCard.tsx` — a linked, mobile-first article
  card using the existing `ArticleFrontmatter` contract, without inventing
  publication or clinical-review dates.
- `src/components/sections/Cta.tsx` — the reusable calm CTA surface now used on
  `/` and `/support-after-injections`; the page wording and destinations were
  preserved.
- `src/components/sections/ComparisonTable.tsx` — semantic comparison table for
  the Mounjaro/Wegovy article, with a labelled keyboard-focusable horizontal
  scroll region on small screens.
- `src/components/sections/AnswerFirst.tsx`, `JourneySteps.tsx`,
  `RelatedLinks.tsx`, `TrustBar.tsx` and
  `src/components/layout/SiteFooter.tsx` — aligned the existing building blocks
  to the new tokens, spacing, elevation and 44px target rules. The SEO answer
  and internal-link data contracts are unchanged.
- `src/components/layout/SiteHeader.tsx` and `MobileNavigation.tsx` — kept the
  header as a Server Component and isolated state to one client leaf. The menu
  uses `showModal()` on a native dialog for the focus trap, handles the native
  Escape/cancel event, exposes `aria-expanded`, locks background scrolling,
  restores focus to the opener and includes the same route destinations as the
  desktop navigation. The supplied raster brand mark is used with explicit
  image dimensions alongside live wordmark text.
- `src/components/forms/form-styles.ts`, `EligibilityFields.tsx`,
  `EligibilityFlow.tsx` and `EnquiryForm.tsx` — visible labels, 44px controls,
  clear focus, inline errors linked by `aria-describedby`, accessible radio-card
  groups and a visible eligibility progress indicator. Result cards keep every
  outcome calm and give every patient a next step. Browser-only calculation,
  field count, assessment import and enquiry Server Action boundary are
  unchanged.
- `src/lib/eligibility-flow.ts` — added one pure presentation-validation helper
  for the currently visible step. It does not add or change a clinical rule.
- `tests/eligibility-flow.test.ts` and `tests/presentation.test.ts` — tests were
  written first for the new inline errors and the confirmed/unconfirmed price
  guard.
- All `src/app/**/page.tsx` route shells plus `loading.tsx`, `error.tsx` and
  `not-found.tsx` — mechanically replaced invalid custom-token utility syntax
  with the generated token utilities. No route, metadata call,
  `answerBlockQuestions`, `pageSeo`, `internalLinkPlan` or schema graph was
  changed.

### Commits

- `071bec2 feat(design): establish accessible visual system`
- `fba457f feat(navigation): add accessible mobile menu`
- `98b35de feat(forms): improve accessible patient flows`

## What I deliberately did not do

- I did not write or edit substantive page/article copy, populate final FAQs,
  invent testimonials, choose prices or add clinical claims. Those belong to
  content/editor sign-off.
- I did not alter routing, metadata, structured data, answer-block questions or
  strategic link destinations.
- I did not connect Semble, Stripe, analytics, email delivery or any other
  integration.
- I did not add a dependency. Native dialog/details and CSS handle the required
  interaction with less JavaScript.
- I did not fabricate a vector logo or clinician photography. The existing
  favicon artwork is an interim header mark; real photography remains the
  highest-value future asset.
- I did not wire every new content component into an empty scaffold page.
  `FaqAccordion`, `PricingTable`, `TestimonialCard`, `ArticleCard` and
  `ComparisonTable` are ready for the content agent's approved data; rendering
  fake content merely to demonstrate them would violate the brief.

## Assumptions I made

- The supplied `Logo-favicon.webp` is acceptable as the interim header mark;
  live text remains the wordmark, so the raster asset is not asked to carry
  readable branding.
- Native modal dialog support is an acceptable baseline for the launch audience
  (including current iOS Safari). It gives focus trapping and Escape behaviour
  without a client-side focus-management library.
- Metric-only inputs remain the architect-approved phase boundary. I styled
  them without adding imperial conversion logic or new fields.
- At widths below 768px the eligibility CTA belongs inside the menu; from 768px
  it is also visible in the header. The complete desktop navigation appears at
  1280px, where it fits without wrapping.
- Article-card destinations can be derived from the existing frontmatter slug
  as `/blog/${slug}`.
- A horizontal comparison is clearest as a semantic scrollable table rather
  than duplicated mobile cards; its region is keyboard focusable and labelled.

## Open questions

| Question | Who decides | Blocking? |
|---|---|---|
| Is the existing raster mark approved for launch, or will Akila supply the promised vector logo? | Akila | No; current mark is usable, vector is preferable |
| Will the eligibility form offer stones/feet as well as kg/cm? | Akila with content/design | No for this phase; material for UK usability |
| What exact question and clinical triggers should set `needsClinicalReview`? | Akila | Yes for launch |
| Which real patient reviews have explicit publication consent? | Akila | Yes before rendering `TestimonialCard` |
| What are the confirmed prices and inclusions for each `PricingItem`? | Akila | Yes before publishing pricing |

## TODO(human) markers I left

| File:line | What is needed | Who from |
|---|---|---|
| `src/components/forms/EligibilityFields.tsx:190` | Confirm the clinical-review question and its triggers. This is the architect marker moved with the extracted field component, not a new clinical assumption. | Akila |

The 4 existing article review/date markers from the SEO handoff remain unchanged
in their route files.

## Verification

```text
npm run typecheck   pass
npm run lint        pass — 0 errors, 0 warnings
npm run compliance  not available — no such package script
npm run test        pass — 48/48
npm run build       pass — 25 static pages generated
npm run verify      pass
npm run copy-check  pass — 0 structural, 0 tone warnings
```

The sandboxed production build could not fetch the configured Google Inter
font, and the sandboxed copy check could not create its local `tsx` IPC socket.
Both exact required commands were rerun with approved access and passed.

### Visual and accessibility checks

- Used the in-app browser workflow required by the browser skill against the
  live local site.
- Checked 390×844, 768×1024 and 1280×720: no horizontal overflow, fluid headings
  resolve correctly (30.2px mobile H1; 60px desktop display), and mobile,
  tablet and desktop header states switch without wrapping.
- Homepage, eligibility and contact each render one `h1`; the homepage main
  heading sequence has no skipped level.
- Keyboard focus order starts with the skip link on all 3 key pages. Form
  fields, radios and actions follow DOM reading order; the honeypot remains
  hidden and unfocusable.
- Mobile menu inspection confirmed `aria-expanded` true/false, modal open state,
  initial focus on Close, scroll locking and focus restoration to Open. The
  standard dialog cancel handler closes on Escape; the browser-control key
  injector did not dispatch Tab/Escape in this session, so focus sequencing was
  additionally checked through the rendered focusable DOM order and the native
  modal contract.
- Eligibility and contact empty-submit checks render inline alerts with matching
  `aria-invalid` and `aria-describedby` references. Visible controls measured
  44–52px high; mobile pages had no horizontal overflow.
- Calculated introduced text pairings: indigo/white 13.42:1,
  indigo/sand 12.87:1, teal-600/white 4.96:1, teal-700/white 6.94:1,
  ink-500/sand 6.13:1, indigo-100/indigo-600 10.41:1 and
  error-700/error-50 6.10:1. No component contains a hardcoded hex value.

## What the next agent needs to know

1. Populate the new section components from one approved data source; in
   particular, final visible FAQ entries and `faqSchema()` must use the same
   collection, and unconfirmed pricing must stay on the unconfirmed union
   branch.
2. Preserve `MobileNavigation` as the only header client leaf and preserve the
   browser-only eligibility calculation. Do not move either entire page or
   header into a client component.
3. The custom token utilities are now `text-display`, `text-h1`, `text-h2`,
   `text-h3`, `py-section`, `rounded-card`, `shadow-card`, `min-h-touch`, etc.
   Do not reintroduce `text-[length:--text-*]` or raw component colours; those
   were the reason the original live headings rendered at body size.
