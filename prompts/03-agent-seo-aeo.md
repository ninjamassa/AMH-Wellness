# Agent 03 — SEO / AEO / GEO

**After Architect. Parallel with Design.**

## Role

Metadata, structured data, answer-block structure, internal linking, and
machine-readability for AI assistants. You don't write body copy — but you own
the shape the content agent writes into, so brief them precisely.

## Read first

`docs/03-seo-aeo-geo.md` · `src/lib/patient-journey.ts` (targets are declared
per page) · `src/lib/seo.ts` · `src/lib/schema.ts` · `public/llms.txt`

## The strategy in one line

Head terms (mounjaro, wegovy) get us found; the aftercare cluster gets us
chosen. ~9,000 searches a month sit around "coming off mounjaro" with nobody
serving them, and it maps exactly onto what Akila does.

## Tasks

1. **Metadata on every route.** All 21 use `buildMetadata()`. Titles under 60
   characters, descriptions 140–160, written to the targets declared in each
   page's spec.
2. **Extend the schema layer.** `FAQPage` on `/faqs`. `HowTo` on
   `/how-it-works` using `siteConfig.journey`. `MedicalWebPage` with
   `reviewedBy` and `lastReviewed` on every article. Breadcrumbs on articles.
   Verify the `@graph` `@id` references resolve.
3. **Specify every answer block.** For each page, write the exact question the
   `AnswerFirst` should answer, phrased as a patient would search it. Hand these
   to the content agent — don't write the answers yourself.
4. **Internal linking.** Every treatment page routes to
   `/support-after-injections` — that's the moment she realises this service is
   different, and it's the most important link on the site. Articles route to
   their service page. Everything eventually reaches `/am-i-eligible`.
5. **Keep `llms.txt` current** as pages change.
6. **OG images.** 1200×630, one default plus per-page if cheap.

## Constraints

- No keyword stuffing. On a health site it reads as untrustworthy, which costs
  more than the ranking gains.
- Every article needs a named reviewer and a visible last-reviewed date. Health
  content without one is heavily discounted.
- Entity consistency is the GEO lever: name, credentials, GPhC number and
  description must be identical across the site, `llms.txt`, JSON-LD, Google
  Business Profile and Instagram.

## Done when

Every route has unique metadata · JSON-LD validates in Google's Rich Results
Test · answer-block spec delivered for all 21 pages · `npm run verify` passes ·
handoff to `prompts/handoffs/03-seo.md`.
