# Master kickoff prompt

Paste everything below the line into a fresh Codex session in the repository
root. It orients the agent, makes it prove it understands the patient before it
writes a word, and sets the run order.

**Don't skip step 2.** If it can't describe the patient back to you accurately,
everything it writes will sound like every other weight loss site — which is
precisely the problem this build exists to solve.

---

You are the lead engineer on the AMH Wellness website — a real business, run
single-handed by a named pharmacist, launching on a £750 budget. Work
accordingly.

## Step 1 — Read before you write

In this order, in full:

1. `AGENTS.md`
2. `docs/00-the-brief.md`
3. `docs/02-the-patient.md`
4. `src/lib/patient-journey.ts`
5. `docs/04-page-briefs.md`

Then skim `src/lib/site-config.ts` and `docs/01-architecture.md`.

## Step 2 — Prove you understand who this is for

Before any code, answer these back to me. Be specific; if you're guessing, say so.

1. Describe the person this website is for. What has she already tried, and why
   didn't it work?
2. What are her four worries, and which page owns each one?
3. Why is `/support-after-injections` marked ★, and what makes it the business
   case rather than just another service page?
4. Someone lands on `/mounjaro` cold from a Google search. What has to happen in
   the first screen, and why?
5. Akila named the kind of patient she *doesn't* want. Who is that, and what does
   it mean for the tone of the copy?

**Stop after answering. Wait for my confirmation.**

## Step 3 — The build

Once confirmed, work through the specialist prompts in `prompts/`, in order.
Run each as its own focused session where you can; if you continue in one
session, announce which role you're operating as before each phase.

```
1. prompts/01-agent-architect.md      foundations, routing, eligibility flow
2. prompts/03-agent-seo-aeo.md        metadata, schema, answer blocks   ─┐ parallel
3. prompts/02-agent-design-system.md  tokens, components, layout        ─┘
4. prompts/06-agent-integrations.md   Semble, Stripe, forms, analytics
5. prompts/05-agent-content.md        all page copy — the big one
6. prompts/04-agent-editor.md         edits every word against the patient
7. prompts/07-agent-qa-performance.md accessibility, performance, launch
```

After each phase, write a handoff into `prompts/handoffs/` using the template.
The next session starts by reading it.

## Non-negotiables

These override anything I ask for later. If a task conflicts with one, say so
and stop.

1. **Never invent a fact.** Prices, credentials, statistics, patient numbers,
   delivery times. If it's not in `site-config.ts` or `docs/`, leave
   `TODO(human):` and tell me. Pricing in particular is unconfirmed — every
   number on `/pricing` is a placeholder until Akila signs it off.
2. **Never call Akila "Dr".** She is MPharmS, a pharmacist. Getting her title
   wrong on her own website is the worst possible detail to fluff.
3. **CQC registration is in progress**, not granted. Say exactly that.
4. **No urgency, no hype, no transformation language.** It attracts the patient
   Akila explicitly doesn't want. `npm run copy-check` warns; use judgement too.
5. **`npm run verify` must pass** before you report anything complete.
6. **No secrets in the repo.** Names only, in `.env.example`.

## How I want you to work

- One concern per commit, Conventional Commits.
- Tests before implementation for anything with logic, and don't edit a test to
  make it pass.
- Server Components by default; `"use client"` only at the leaf that needs it.
- Design tokens, never raw hex.
- Every page must answer, somewhere: *who am I actually talking to?*
- Ask rather than guess when a decision has clinical or commercial weight.

Begin with Step 1.
