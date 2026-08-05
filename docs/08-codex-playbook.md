# 08 — Codex playbook

How to actually drive this build well. Written for Taher.

## The four-part task prompt

Every non-trivial task to Codex should carry four things. Missing any one is the
most common cause of a bad result.

1. **Goal** — the outcome, not the method. *"The eligibility check should tell
   someone in under two minutes whether a consultation suits them"*, not
   *"add a form with five inputs"*.
2. **Context** — the exact files and docs that matter. `docs/02-the-patient.md`,
   `src/lib/eligibility.ts`, the page brief.
3. **Constraints** — what must not change. The compliance directory. The
   performance budget. Server Components by default.
4. **Done when** — the verifiable condition. Usually *"`npm run verify` passes
   and the new tests cover X"*.

## Session hygiene

**One agent, one concern, one session.** Do not ask the same session to write
compliance copy and refactor the design system. Context bleeds and quality
drops on both.

**Start fresh when the thread gets long.** A long session accumulates stale
assumptions. A new session with a good prompt and `AGENTS.md` beats a tired one.

**Let it read before it writes.** Open a session with *"Read AGENTS.md,
docs/00-the-brief.md and docs/02-the-patient.md, then describe the patient
back to me — what she's already tried, and why it didn't work."* If the summary is wrong, fix it before any
code is written — that is a two-minute check that prevents an hour of rework.

**Run the verify loop yourself.** Do not accept "it should work". `npm run
verify` is the contract.

## Tests first, for anything with logic

Ask Codex to write failing tests first, confirm they fail, then implement until
they pass — and tell it explicitly **not to modify the tests**. This is the
single highest-leverage habit in agentic development, and it is why
`tests/eligibility.test.ts` and `tests/patient-journey.test.ts` exist as models.

A real example from this repo: `tests/eligibility.test.ts` asserts that no
eligibility outcome is ever a dead end. That's a product rule, not a code rule —
Akila doesn't want people feeling dismissed — and encoding it as a test is what
stops it quietly disappearing in a future refactor.

## Guarding the strategy

`src/lib/patient-journey.ts` is the spine — it holds every page's job, the four
worries, and the search targets. When Codex wants to add a page, make it add the
spec first. `npm run copy-check` fails if a route and a spec drift apart, and
`tests/patient-journey.test.ts` asserts that all four of Akila's worries are
still answered somewhere.

If an agent proposes deleting a spec field or loosening a test to move faster,
reject it. Those tests are protecting the commercial logic of the site, not the
code.

## Multi-agent run order

See `prompts/`. The dependency chain that matters:

```
Architect ──► Design ──► Content ──► QA
     │           │          ▲         ▲
     └──► SEO ───┘          │         │
     └──► Integrations ─────┘         │
              Compliance ─────────────┘   (audits everything, runs last and again pre-launch)
```

Architect and SEO can run in parallel. Design and Integrations can run in
parallel once Architect lands. Content needs Design and SEO done. Compliance and
QA audit the result — and Compliance should also run as a spot audit after any
copy change, not only at the end.

Each agent writes a handoff into `prompts/handoffs/` using the template. That
handoff is the context you paste into the next agent, which is what keeps
sessions short without losing continuity.

## Prompts that work here

**Good:** *"Build `/am-i-eligible` per the brief in its page.tsx header. Use the
existing `assessEligibility` from `src/lib/eligibility.ts` — do not reimplement
the logic. Client component at leaf level only. Every outcome, including
failure, must offer a route forward. Done when `npm run verify` passes and a new
test covers the review-needed branch."*

**Bad:** *"Make the eligibility page nice."*

**Good:** *"Write `/mounjaro`. Read its spec in patient-journey.ts first. Most
traffic lands here cold from a search for the medication, so within one screen
she needs to understand this service includes one-to-one support and aftercare.
It answers the side-effects worry. Link onward to /support-after-injections."*

**Bad:** *"Write the Mounjaro page."*

## Failure modes to watch for

| Symptom | Cause | Fix |
|---|---|---|
| Invented prices, credentials or claims | It filled a gap rather than flagging it | Re-prompt: unknown facts get `TODO(human):`, never a guess |
| `"use client"` at the top of a page | Reached for interactivity too early | Push it to the leaf component that needs it |
| Urgency or hype copy | It defaulted to marketing voice | Point at docs/02-the-patient.md — this attracts the wrong patient |
| Hardcoded hex colours | Ignored the token layer | Point at the `@theme` block in `globals.css` |
| Reimplemented existing logic | Did not read `src/lib/` | Name the file to import from |
| "Dr Akila" | Pattern-matched on healthcare | The scanner blocks it — that is why the rule exists |

## What to review yourself, always

Codex is good at code and unreliable at judgement calls with legal weight.
Read personally, every time:

1. Every word on `/support-after-injections` — it's the business case.
2. Every clinical statement.
3. Anything touching pricing.
4. Any change to `src/lib/patient-journey.ts`.
5. Anything that touches patient data.
