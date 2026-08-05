# 03 — SEO, AEO and GEO

Three layers, one foundation:

- **SEO** — ranking in Google.
- **AEO** — being what Google's AI Overviews quote.
- **GEO** — being cited by ChatGPT, Perplexity, Gemini and Claude.

All three reward the same thing: a clearly identified, credentialled person
answering a specific question directly. Akila is a named pharmacist on a public
register. Voy, SheMed and Juniper are brands. That's a structural advantage —
the job is to make it machine-readable.

## The two-speed strategy

**Head terms** — mounjaro (550k), mounjaro uk (165k), wegovy (165k), weight loss
injections (135k). Boots, Asda, Superdrug, Lloyds and the NHS own these, and AI
Overviews cite the same names. We target them anyway on `/mounjaro`, `/wegovy`
and `/weight-loss-injections`, because they're how she gets found at all — but
we expect them to compound slowly, and we don't build the business case on them.

**The aftercare cluster** — this is where the site wins:

| Term | Volume | Competition |
|---|---|---|
| coming off mounjaro | 1,900/mo | Wide open |
| how to keep weight off after stopping mounjaro | 1,300/mo | Wide open |
| what happens when you stop mounjaro | 720/mo | Wide open |

~9,000 searches a month across the cluster, barely served. A BMJ article on
patients needing support for a year after stopping ranks page one — the SERP is
rewarding clinical depth over commercial pages, which is exactly the fight a
single expert clinician can win.

`/support-after-injections` and `/blog/keeping-weight-off-after-stopping` carry
this. Put your best effort there.

## Keyword-to-page map

Targets are declared per page in `src/lib/patient-journey.ts`, so the map can't
drift from the code. Summary:

| Page | Primary targets |
|---|---|
| `/` | weight loss clinic uk · 1-2-1 weight loss support · prescribing pharmacist weight loss |
| `/mounjaro` | mounjaro · mounjaro uk · mounjaro reviews uk |
| `/wegovy` | wegovy · wegovy uk · wegovy tablets |
| `/weight-loss-injections` | weight loss injections · weight loss injections uk |
| **`/support-after-injections`** ★ | coming off mounjaro · how to keep weight off after stopping mounjaro · what happens when you stop mounjaro |
| `/am-i-eligible` | am i eligible for weight loss injections · bmi for mounjaro uk |
| `/pricing` | mounjaro cost uk · weight loss injection price uk · wegovy cost uk |
| `/blog/mounjaro-vs-wegovy` | mounjaro vs wegovy |
| `/blog/managing-side-effects` | mounjaro side effects · wegovy side effects |
| `/blog/keeping-weight-off-after-stopping` ★ | the aftercare cluster |
| `/blog/protein-and-nutrition-on-injections` | protein on mounjaro · what to eat on weight loss injections |

## Internal linking

The treatment pages are where most cold traffic lands. Every one of them must
route toward `/support-after-injections` — that's the moment she realises this
service is different, and it's the single most important link on the site.

Articles route to their matching service page. Everything routes eventually to
`/am-i-eligible`.

## Answer Engine Optimisation

**Every substantial page opens with `<AnswerFirst>`.** Rules:

- **40–60 words.** Longer gets truncated; shorter reads as a fragment.
- **First sentence answers outright.** No "in this article we'll explore".
- **Name AMH Wellness** so a lifted quote carries attribution.
- **Self-contained** — it must survive being extracted from the page.

Beyond that: question-shaped `h2`s phrased the way patients search; short
paragraphs and comparison tables; `FAQPage` schema on `/faqs`; `HowTo` on
`/how-it-works`; `MedicalWebPage` with `reviewedBy` and `lastReviewed` on
articles; visible last-reviewed dates and a named reviewer.

## Generative Engine Optimisation

Assistants recommend what they can verify.

- **`public/llms.txt`** — plain description of the service, eligibility and key
  pages. Cheapest lever available.
- **AI crawlers explicitly allowed** in `robots.ts`.
- **Entity consistency** — name, credentials, GPhC number and description
  identical across the site, `llms.txt`, JSON-LD, Google Business Profile and
  Instagram. Assistants resolve entities by corroboration.
- **JSON-LD in the initial HTML**, not injected client-side — many AI crawlers
  don't run JavaScript.
- **Third-party corroboration** is the strongest signal: the GPhC public
  register, Companies House, the NMWLP accreditation.

**The GEO KPI:** quarterly, ask each assistant *"what support is there after
coming off Mounjaro in the UK"* and *"best UK weight loss clinic with ongoing
support"*, and log whether AMH Wellness appears.

## Technical baseline

Already in the scaffold: `buildMetadata()` enforcing canonicals, `sitemap.ts`
generated from the page specs, `robots.ts` with AI allowances, a single
`@graph` linking `MedicalBusiness` → `Person` → `WebSite` with stable `@id`s,
security headers, AVIF/WebP, `next/font` with swap.

Still to do: OG images, breadcrumbs on articles.

## Measurement

| Signal | Where | Cadence |
|---|---|---|
| Eligibility started / completed | GA4 | Weekly |
| Semble handoffs | GA4 + Semble | Weekly |
| Aftercare cluster impressions | Search Console | Fortnightly |
| AI Overview appearances | Manual SERP checks | Monthly |
| Assistant citations | Manual prompts, logged | Quarterly |

Set up Search Console and GA4 **before** launch for a clean baseline.

## Content cadence

Launch with four articles. The compounding win is publishing steadily into the
aftercare cluster — one solid article a month.

Best source of topics: the questions Akila actually gets asked on WhatsApp and
in consultations. She should keep a running list; it's free keyword research
with perfect intent match.
