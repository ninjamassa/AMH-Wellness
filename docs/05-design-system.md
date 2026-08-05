# 05 — Design system

## Direction

Calm, premium, clinical-but-warm. The patient is often anxious and has likely
been marketed at aggressively by faster competitors. The design should feel like
a considered private practice — generous space, quiet confidence, no urgency,
no stock-photo triumphalism.

Reference point: a good private GP's practice, not a direct-to-consumer health
brand. She's seen the DTC version already and it let her down.

## Colour

Brand indigo `#252767` plus teal from the existing logo, confirmed by Akila.
Full scales are in the `@theme` block of `src/app/globals.css`.

| Token | Use |
|---|---|
| `indigo-600` `#252767` | Primary brand, headings, primary buttons |
| `indigo-50/100` | Tinted surfaces |
| `teal-500` `#229c93` | Secondary actions, answer blocks, accents |
| `sand-50/100/200` | Page background, cards, hairlines — warm, not cold grey |
| `ink-500/700/900` | Body copy hierarchy |

**Never write a hex value in a component.** Add a token.

Contrast: 4.5:1 minimum for body text, 3:1 for large text and UI boundaries.
`indigo-600` on `sand-50` and white on `indigo-600` both clear AA comfortably.
Verify any new pairing before shipping.

## Typography

Inter via `next/font`, `display: swap`, subset to latin. One family — a second
face costs more than it adds at this scale.

Fluid scale, defined as tokens: `--text-display`, `--text-h1`, `--text-h2`,
`--text-h3`. Body 1rem / 1.65. Measure capped around 68ch. `text-wrap: balance`
on headings, `pretty` on body.

## Spacing and layout

`--spacing-section` gives a consistent fluid vertical rhythm between sections.
Content max-width 72rem via `<Container>`. Mobile-first — the majority of this
audience arrives on a phone.

## Components

Primitives in `src/components/ui/`: `Container`, `Button`. Page blocks in
`sections/`: `AnswerFirst` and, to be built, `TrustBar`, `StepList`,
`FaqAccordion`, `TestimonialCard`, `PricingTable`, `EligibilityForm`, `Cta`.

Rules: server components unless interactivity is required; props typed, no
`any`; no component larger than roughly 150 lines — extract instead.

## Imagery

Real photography of Akila is the highest-value asset this site can get — she's
arranging bio shots. Until then, calm lifestyle and food imagery.

Avoid before/after comparisons: Akila said herself she doesn't expect to use
them, and they attract the wrong patient. Avoid anything that implies a body
ideal — her audience is 25–75 and largely tired of that language.

Every image through `next/image` with explicit width and height, and descriptive
alt text.

## Accessibility — WCAG 2.2 AA, a gate not a polish pass

Semantic landmarks, one `h1` per page, no skipped heading levels, visible focus
(defined globally), 44×44px minimum touch targets, form labels always visible
with inline errors tied via `aria-describedby`, `prefers-reduced-motion`
respected, full keyboard operability, tested with a screen reader before launch.

## Motion

Minimal. Short opacity and transform transitions only. Nothing that moves on
scroll for decoration. Everything disabled under `prefers-reduced-motion`.
