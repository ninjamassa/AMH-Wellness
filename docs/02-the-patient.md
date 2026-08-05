# 02 — The patient, and how the site answers her

The single most useful thing you can do before writing anything is picture the
person reading it.

## She's already been let down once

She's 47. Her GP mentioned her BMI. She looked into it, found a service with a
slick website, filled in a form, and a pen arrived two days later.

Week two, she felt sick. She messaged the app and got a reply from someone whose
name she didn't recognise, three days later, telling her it was normal. She
carried on. She lost weight. Then she started worrying about what happens when
she stops — and realised she had no idea, and no one to ask.

That's who arrives on this site. **She isn't shopping on price and she isn't
shopping on speed. She's shopping for a person.**

## What that means for every page

| Instinct | Why it's wrong here | Do instead |
|---|---|---|
| Lead with the medication | She can get that anywhere, cheaper | Lead with who she'll be talking to |
| Emphasise how fast it works | Attracts the patient Akila doesn't want | Emphasise what happens over months |
| Use urgency to convert | Reads as the last place that let her down | Give her the information and let her decide |
| Hide the cost until she enquires | Cost is worry number one | Publish it plainly |
| Treat aftercare as an upsell | It's the reason to choose this service | Make it a headline |

## Her four worries

Encoded in `src/lib/patient-journey.ts` as `objections`, each with the pages
that must address it.

### 1. Cost
*"Is this going to cost more than I can justify, and will I know what I'm
paying for?"*

Fixed, published pricing. A booking fee that buys a real appointment with a real
clinician, not a form review. No subscription that's hard to leave.

### 2. Side effects
*"I've read about the side effects. What happens if I feel awful and nobody
answers?"*

She can message Akila directly between appointments. Not a chatbot, not a ticket
queue — the same pharmacist who prescribed for her, who can adjust the plan.
`/blog/managing-side-effects` should be genuinely, practically useful.

### 3. Maintenance — the big one
*"What happens when I stop? Am I just going to put it all back on?"*

This is why the business exists. Nutrition coaching and a maintenance plan are
built in from the first consultation. `/support-after-injections` owns this, fed
by `/blog/keeping-weight-off-after-stopping`.

### 4. Ongoing care
*"Will I actually be able to speak to someone, or am I on my own?"*

Every consultation and every four-weekly review is with Akila. Same person,
every time. She prescribes personally. Say it plainly and often.

## The journey

| Stage | Where she is | Pages |
|---|---|---|
| **Aware** | Just realised there's an alternative | `/`, `/blog` |
| **Considering** | Reading, comparing, checking credibility | Treatment pages, `/about`, `/reviews`, articles |
| **Ready** | Wants to know if she qualifies and what it costs | `/am-i-eligible`, `/pricing` |
| **Booking** | Converting | Semble handoff |
| **Supported** | Already a patient | `/blog`, `/support-after-injections` |

Most traffic lands mid-journey on a treatment page from a search for "mounjaro".
The job of those pages is to make her realise, within a screen, that this one is
different.

## Voice

Akila is a clinician who gives people her time. The site should sound like her
at her most reassuring: **warm, precise, unhurried, honest.**

Write like a good clinician talks in a consultation. Explain, don't sell.
Acknowledge that this is hard. Be specific — specificity reads as expertise,
vagueness reads as marketing.

Not: breathless, transformational, coy about cost, or written in institutional
prose.

UK English. Second person. Short sentences. No exclamation marks. Numerals for
numbers. Sentence case headings.

### Words that fit
*one-to-one · the same clinician every time · nutrition guidance · reviewed
every four weeks · message me between appointments · a plan for when you stop ·
honestly · we'll tell you if it isn't right for you*

### Words that don't
*transform · quick fix · effortless · guaranteed · limited time · act now ·
melt away · beach body · drop a dress size · Dr Akila (she's MPharmS)*

`npm run copy-check` flags most of these as warnings.

## The test for any page

Read it as her. Then ask:

1. Do I know who I'd actually be talking to?
2. Do I know what happens next?
3. Do I know what it costs?
4. Has anyone addressed the thing I'm most worried about?
5. Does this feel like the place that let me down last time?

If the answer to 5 is anything but a clear no, rewrite it.
