# 00 — The brief

Everything here comes from Akila's discovery questionnaire and the Social Script
proposal. Where they differ, this file decides. Nothing is invented — if a fact
isn't here, it hasn't been supplied.

## The business

**AMH Wellness Ltd** (16149594), founded 2024. A remote-first UK weight loss
service run single-handed by **Akila Dungarwalla MPharmS**, an independent
prescribing pharmacist (GPhC 2063173) with SCOPE-accredited obesity training
through the NMWLP. She prescribes personally.

Registered office in South Croydon — a registered address, **not a clinic**.
Every consultation is a video call. Patients are UK-wide.

Domain owned with DNS access. Instagram `@amhwellnessltd`. No email domain yet
— she's on a personal Gmail, which needs fixing before launch. CQC registration
is in progress and she wants that stated on the site.

## The proposition, in her words

> "A holistic approach to weight loss, providing expertise and support for
> weight loss and nutrition."

> "1-2-1 coaching with nutrition guidance after coming off the weight loss
> injections."

Everyone in this market sells the medication. Akila sells everything around it:
the same clinician every time, nutrition coaching, reviews every four weeks,
message access between appointments, and a plan for when treatment ends.

## The patient

**25–75, majority women, typically 35–60, middle income.**

She has probably already tried a weight loss injection service. It posted her a
pen and gave her an app. When she felt sick in week two, there was nobody to
ask. She's here because that didn't work — not because she wants it faster or
cheaper.

### Her four worries

| Worry | What she's really asking | Where we answer it |
|---|---|---|
| **Cost** | Will I know what I'm paying for? | `/pricing`, `/how-it-works`, `/faqs` |
| **Side effects** | What if I feel awful and nobody answers? | `/blog/managing-side-effects`, `/how-it-works` |
| **Maintenance** | What happens when I stop? | `/support-after-injections` ★ |
| **Ongoing care** | Can I actually speak to someone? | `/`, `/about`, `/how-it-works` |

The third is the biggest, and it's the one the whole business is built to answer.

### Who she isn't

Akila is explicit about who she doesn't want: *"Not committed. Not motivated,
people looking for a quick fix. No plan on how they will manage afterwards."*

That's a strategic gift. The site can be calm, honest and slightly selective —
and it will convert better for it, because the people it does convert will stay.
It also rules out urgency and hype entirely, which is enforced as a warning in
`npm run copy-check`.

## The service

**Treatments:** Wegovy (injection and oral tablets) and Mounjaro. All MHRA
approved, dispensed by a registered UK pharmacy — usually next-day if ordered
before 3pm, with 7-day delivery available on most injections. Each pen lasts
four weeks, which sets the review rhythm.

**The five steps** (encoded in `siteConfig.journey`):

1. Book through the online booking system, paying a booking fee.
2. Get a confirmation with a video call link and a health questionnaire.
3. Meet Akila on a video call for a proper one-to-one consultation.
4. If appropriate, the prescription goes to a UK pharmacy and is delivered.
5. Review every four weeks — with message access in between.

**Eligibility:** BMI 30+, or 27+ with a weight-related condition (high blood
pressure, pre-diabetes, sleep apnoea). Adults, UK residents.

**Also offered:** meal plans, supplement recommendations. **Coming, not live:**
working with a PT on fitness plans, and a downloadable guide. Don't present
roadmap items as current.

## The market opportunity

From Social Script's DataForSEO research (July 2026):

| Term | Monthly UK volume |
|---|---|
| mounjaro | 550,000 |
| mounjaro uk | 165,000 |
| wegovy | 165,000 |
| weight loss injections | 135,000 |

Huge head demand, owned by Boots, Asda, Superdrug, Lloyds and the NHS. A new
single-clinician site won't take those quickly — but it should still target them,
because the treatment pages are how she gets found at all.

**The winnable lane is aftercare:**

| Term | Monthly volume | Competition |
|---|---|---|
| coming off mounjaro | 1,900 | Wide open |
| how to keep weight off after stopping mounjaro | 1,300 | Wide open |
| what happens when you stop mounjaro | 720 | Wide open |

~9,000 searches a month in the cluster, almost entirely unserved. A BMJ article
on patients needing support for a year after stopping ranks page one — meaning
the SERP is rewarding genuine clinical depth over commercial pages. That's a
fight Akila can win, and it maps exactly onto what she does.

**Competitors:** Voy (~2,460 ranked keywords — strong content engine, ignores
aftercare and personal clinician trust), SheMed (~285 — ranks for little beyond
its own brand), Juniper (brand demand, thin content). None leads with a named,
registered prescribing pharmacist. She does.

Also named by Akila: MedExpress, CutKilo, London Slimming Clinic.

## Objectives, in priority order

1. **Book consultations.** The eligibility check is the primary lead capture —
   Akila: *"Can we incorporate an online assessment? If so this will be key to
   gain lead information."*
2. **Make the support visible.** Someone landing on `/mounjaro` should leave
   understanding they'd get something materially different here.
3. **Own the aftercare conversation** in search and in AI assistants.
4. **Be maintainable by one busy clinician** working evenings and weekends.

## Platform

**Next.js 16 on Vercel**, per the Social Script proposal. Designated Medical
proposed WordPress. See `01-architecture.md` for the trade-off and the
content-editing plan that follows.

## Integrations

| System | Role |
|---|---|
| **Semble** | Booking, consultations, records. The system of record. |
| **Stripe** | The consultation booking fee. Possibly via Semble. |
| **NMWLP form** | Her existing intake questionnaire, sent after booking. |
| **WhatsApp** | Enquiries — she's unsure about admin load, so it ships behind a flag, off. |
| **GA4 + Search Console** | Nothing is tracked today. |

## Constraints

- **Budget £750**, her own money. Scope accordingly.
- **No hard deadline**; ideally live within three months.
- **No logo vector, no photography, no copy, no reviews yet.** The build has to
  look right with tasteful placeholders and improve as assets arrive.
- **She is the only sign-off**, and she has a day job. Batch questions.

## Success measures

Leading: eligibility checks started and completed, Semble handoffs, enquiries,
aftercare-cluster impressions in Search Console.

Lagging: consultations booked — and Akila's own bar, patients who stay supported
after treatment ends.

## Open questions for kick-off

1. Confirmed pricing — consultation, booking fee, programme.
2. Professional `@amhwellness.co.uk` email.
3. Does Stripe run through Semble, or does the site take payment directly?
4. Does Semble offer a hosted booking URL that accepts prefill parameters?
5. WhatsApp on or off at launch?
6. Who reviews the four legal documents?
7. Timeline for logo vector, bio photography and first reviews.
