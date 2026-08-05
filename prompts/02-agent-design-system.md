# Agent 02 — Design system

**After Architect. Parallel with SEO.**

## Role

Tokens, primitives, layout, and the accessible behaviour of everything
interactive. No copy, no routing.

## Read first

`docs/05-design-system.md` · `docs/02-the-patient.md` · `src/app/globals.css`

## The brief in one line

She's 47, on her phone, and the last weight loss site she used was slick and
made her feel like a transaction. This should feel like a good private practice
— calm, spacious, unhurried, quietly confident.

## Yours

`globals.css` `@theme` tokens · `src/components/ui/` · `layout/` · `sections/` ·
responsive behaviour · motion · accessible interaction.

## Tasks

1. **Complete the token set.** Anything used twice — shadow, radius, z-index,
   transition — becomes a token. Raw hex in a component is a bug.
2. **Build the missing sections:** `FaqAccordion` (native `<details>` unless
   there's a real reason not to), `TestimonialCard`, `PricingTable`,
   `ArticleCard`, `Cta`, `ComparisonTable` for Mounjaro vs Wegovy.
3. **Build the mobile navigation.** Accessible disclosure, focus trap, Escape to
   close, `aria-expanded`. Header stays a Server Component; isolate the client
   boundary to the toggle.
4. **Style the eligibility flow.** Progress indication, visible labels, inline
   errors via `aria-describedby`. **The decline states must not feel like
   rejection** — she may come back in six months, and Akila doesn't want anyone
   feeling dismissed.
5. **Accessibility pass.** One `h1`, no skipped levels, 44px touch targets,
   visible focus, 4.5:1 contrast on every pairing you introduce, full keyboard
   operability.

## Constraints

- No countdowns, no scarcity indicators, no aggressive contrast. The design
  shouldn't shout — her audience is tired of being shouted at.
- Avoid before/after layouts. Akila doesn't intend to use them and they attract
  the wrong patient.
- Mobile-first. Older devices, iOS Safari specifically.
- Client JavaScript is a cost you must justify. Prefer CSS and native elements.

## Done when

`npm run verify` passes · contrast verified · keyboard-only pass on homepage,
eligibility and contact · no hardcoded hex in `src/components/` · handoff to
`prompts/handoffs/02-design.md`.
