# Build guide — from here to a live website

Written for someone who has never used a terminal. Nothing is assumed. If a step
feels obvious, skip it; if a step feels scary, it isn't — I'll tell you what
you'll see before you see it.

**Total hands-on time: roughly 12–18 hours spread over 2–4 weeks.** Most of the
calendar time is waiting on Akila, not on you.

---

## Part 0 — What you're actually doing

Right now `amhwellness.co.uk` points at a WordPress site. You're going to build a
new site, park it at a temporary web address where only you and Akila can see it,
get it right, and then flip the domain over to the new one. WordPress stays
untouched the whole time, so nothing can break while you work.

Four pieces:

| Piece | What it is | Think of it as |
|---|---|---|
| **The project folder** | The one on your computer, with all the code and docs | The document you're working on |
| **GitHub** | A website that stores the project and remembers every change | Dropbox with unlimited undo |
| **Codex** | OpenAI's coding agent — reads your instructions, writes the code | The person doing the building |
| **Vercel** | Turns the project into a real website on the internet | The printer |

The flow: **you brief Codex → Codex changes the project → the change goes to
GitHub → Vercel publishes it automatically.** Once set up, that last part is
invisible — you save, and 40 seconds later it's live.

### Which Codex should you use?

There are three. **Use the Codex app.** It has a visual review screen showing
exactly what changed, side by side, before you accept it — and it can run the
technical commands for you, so you barely touch a terminal. The command-line
version is what experienced developers use; you'd be making it harder for
yourself for no benefit.

You'll need a **ChatGPT Plus, Pro or Business** subscription — Codex is included.

---

## Part 1 — Accounts (about 20 minutes)

Three accounts. All free except the first.

**1. ChatGPT Plus** — [chatgpt.com](https://chatgpt.com). ~£20/month. This is
what pays for Codex.

**2. GitHub** — [github.com](https://github.com). Free. Sign up with the email
you'll keep using. Use a real password manager entry, you'll need it again.

**3. Vercel** — [vercel.com](https://vercel.com). Free tier covers this site
comfortably. **Sign up using "Continue with GitHub"** — this links them
automatically and saves you a fiddly step later.

> Do all three now. Waiting for a verification email halfway through the build is
> the most annoying possible interruption.

---

## Part 2 — Install two things (about 15 minutes)

### Node.js

The engine that runs the website on your computer. Go to
[nodejs.org](https://nodejs.org) and download the **LTS** version (the one on the
left, marked "Recommended"). Open the downloaded file, click through the
installer. Nothing to configure.

### The Codex app

Download from [developers.openai.com/codex/app](https://developers.openai.com/codex/app).
Install it, open it, sign in with your ChatGPT account.

That's everything installed.

---

## Part 3 — Get the project onto your computer (10 minutes)

1. Move the `amh-wellness-website-v2` folder somewhere sensible and permanent —
   `Documents/amh-wellness` is fine. Not Downloads; you'll lose it.
2. **Delete the `node_modules` folder inside it if one exists.** It's a leftover
   from my sandbox and it's built for a different type of computer. Deleting it
   is safe — it gets rebuilt in a moment.
3. Open the Codex app, choose **Open folder**, and select that folder.

Codex can now see the project.

### Your first instruction

In the Codex chat box, paste this:

```
Install the project dependencies and start the development server so I can see
the site in my browser. Tell me the address to open when it's ready.
```

It'll run for a minute or two, printing a lot of text. **Text scrolling past is
normal — it isn't errors.** It'll finish by telling you to open
`http://localhost:3000`.

Open that in your browser. You should see the AMH Wellness homepage: the headline
"Weight loss injections, with someone who actually picks up", the credentials
bar, and the dark blue aftercare panel.

**That's the site running on your own machine.** Nobody else can see it. Leave it
running — it updates automatically as Codex makes changes.

> **If it fails:** paste the error back into Codex and say "this failed, fix it."
> That genuinely is the correct move — it reads errors better than most people.

---

## Part 4 — What to take from WordPress (30 minutes)

I looked at the current site. Here's what's actually there.

**The public homepage is a "Coming Soon" holding page.** But there are nine more
pages sitting behind it, live and indexable: `/home/`, `/about-us/`, `/faq/`,
`/contact-us/`, `/mounjaro/`, `/wegovy/`, `/weight-loss-treatment/`,
`/privacy-policy-2/`, `/terms-of-service/`.

**Almost none of it is worth keeping.** The FAQ page is entirely placeholder
Latin text — "Accordion Tab Title 1", ten times. The positioning is generic
DTC ("clinically proven medication boosts metabolism, reduces appetite") which is
the opposite of the support-led angle Akila described. And it repeatedly says
**"doctor-prescribed"** — Akila is a pharmacist, not a doctor. That's a factual
error currently live on her own website.

So: **replace it entirely.** Don't migrate content. Do grab these five things.

**Log into WordPress and collect:**

1. **The logo.** Media Library → find `Untitled-design-10.webp` and
   `Logo-favicon.webp`. Download the largest versions. Ask Akila if she has the
   original vector file (`.ai`, `.svg` or `.eps`) — she told the questionnaire she
   didn't, but her designer might. Save into `public/` in the project folder.

2. **The three testimonial images** — `Testiomonial-1.jpg`, `-2`, `-3`. Check
   whether these are real patients or stock. If real, you need written permission
   before reusing them.

3. **Newsletter signups.** The Coming Soon page has been collecting emails since
   January 2025. Export that list — those are warm leads who explicitly asked to
   be told when she launches. Sending them a launch email is the single
   cheapest win available on this project.

4. **Google Search Console access.** The site already has a verification tag
   (`55tvVB5j5Hx_...`). That means someone — probably the previous developer,
   "Mustafa Massawi" per the footer — has Search Console access. Get Akila added
   as owner, then yourself. Do this before launch, not after.

5. **Note the old URLs.** Already done — I've built the redirects into
   `next.config.ts` and there's a test proving each one lands on a real page.
   `/mounjaro` and `/wegovy` keep the same addresses, so those links won't even
   need redirecting.

**Don't cancel the WordPress hosting yet.** It costs a few pounds a month and it's
your safety net if launch goes sideways. Kill it a month after launch.

---

## Part 5 — Build it, one agent at a time

This is the main event. Seven specialists, each doing one job well.

I've set them up as **Codex custom agents** — they live in `.codex/agents/` and
Codex reads them automatically. You don't paste long prompts; you just name the
agent.

### Start here — before any building

Open a new Codex conversation and paste the entire contents of
`prompts/00-MASTER-KICKOFF.md`.

**It will ask you five questions back before writing any code.** Things like
"describe the person this website is for" and "why is `/support-after-injections`
the business case".

**Read the answers properly.** This is the highest-value two minutes in the whole
build. If Codex has misunderstood who the patient is, every word it writes will
sound like a generic weight loss site — which is the exact failure this project
exists to avoid. If the answers are wrong, correct it before saying "go".

When you're happy, reply: `Confirmed. Begin with the architect agent.`

### The run order

Run each in a **fresh conversation**. Long conversations get muddled — a new one
with a clear brief beats a tired one every time.

| # | Say this | What you get | Rough time |
|---|---|---|---|
| 1 | `Use the architect agent.` | Routing, the eligibility form structure, contact form plumbing | 1–2h |
| 2 | `Use the seo agent.` | Page titles, Google structured data, internal linking | 1–2h |
| 3 | `Use the design agent.` | Components, mobile menu, the visual polish | 2–3h |
| 4 | `Use the integrations agent.` | Semble, Stripe, enquiry emails, analytics | 2–3h |
| 5 | `Use the content agent.` | **Every word on all 21 pages** | 3–5h |
| 6 | `Use the editor agent.` | Reads it all back as the patient, flags weak copy | 1h |
| 7 | `Use the qa agent.` | Accessibility, speed, launch readiness | 1–2h |

Steps 2 and 3 can run at the same time in two windows if you want. Step 5 needs
2 and 3 finished.

### After each one

Each agent writes a summary into `prompts/handoffs/`. Read it — that's how you
know what it actually did versus what it claims. Then:

```
Run npm run verify and npm run copy-check, and show me the output.
```

`verify` checks the code compiles and the tests pass. `copy-check` checks every
page still has a purpose, and warns if the copy has drifted into hype.

**If something fails, don't debug it yourself.** Paste the output back and say
"fix this." That's the workflow.

### The one agent to actually pay attention to

**The editor.** It re-reads all 21 pages as the patient — a 47-year-old on her
phone who's already been let down by a service like this once — and asks the
question no automated test can: *does this feel like the place that let me down
last time?*

Its report is where you'll find the difference between a site that works and a
site that converts.

### If Codex does something odd

| What happens | Why | What to say |
|---|---|---|
| Invents a price | It filled a gap instead of flagging it | "Never invent facts. Use TODO(human): and tell me what you need." |
| Calls her "Dr Akila" | Pattern-matched on healthcare | "She's MPharmS, a pharmacist. Fix everywhere." |
| Adds urgency copy | Defaulted to marketing voice | "Read docs/02-the-patient.md. That language attracts the patient Akila explicitly doesn't want." |
| Claims CQC registration | Read it as a credential | "Registration is in progress, not granted. Those exact words." |
| Rewrites a test to pass | Took the shortcut | "Revert that. Fix the code so the original test passes." |

---

## Part 6 — Put it online where Akila can see it (30 minutes)

You want her reviewing a real website on her phone, not screenshots.

### Push the project to GitHub

In Codex:

```
Set up git for this project, create a private GitHub repository called
amh-wellness-website, and push everything to it. Walk me through anything you
need me to authorise.
```

It'll handle the technical parts and tell you when to click something.

### Connect Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Find `amh-wellness-website` in the list, click **Import**
3. Change nothing. Vercel recognises the project type automatically.
4. Click **Deploy**, wait about a minute.

You get an address like `amh-wellness-website.vercel.app`. **That's a real
website on the real internet.** Send it to Akila.

From now on, every change you approve goes live there within a minute. Preview
links per change too, so she can review one specific update.

> **Ask Vercel to hide it from Google.** In Project Settings → Deployment
> Protection, turn on password protection while you're building. You don't want a
> half-finished medical site indexed.

---

## Part 7 — The part only you can do

Codex cannot get these. **Start now — they're the long pole, not the code.**

Send Akila one message with all six. She's running this single-handed around a
day job; six separate emails over three weeks will stall you.

1. **Pricing.** Consultation fee, booking fee, programme cost, what's included.
   **This is the one genuine blocker** — every number on `/pricing` is a
   placeholder until she confirms.
2. **The `@amhwellness.co.uk` email.** She's on personal Gmail. A private health
   service emailing patients from Gmail undercuts the entire trust proposition.
3. **Semble questions.** Does it give a booking link you can send people to? Does
   it take the Stripe payment itself? Can her NMWLP health questionnaire be built
   into its confirmation email?
4. **WhatsApp — yes or no?** She was unsure about the admin load, which is fair.
   It ships switched off; one setting turns it on.
5. **Who reviews the legal pages.** The privacy policy, terms, complaints
   procedure and disclaimer are drafts. They need a professional read.
6. **Assets.** Logo vector, her bio photographs, and the patient reviews she
   mentioned having.

Meanwhile ask her to write, in her own words: **what she says on a first call
when someone asks "what happens when I stop?"** That answer is the most valuable
paragraph on the entire website, and it should be hers, not Codex's.

---

## Part 8 — Wire up Semble and Stripe

Once Akila answers #3, run the integrations agent again with what she told you:

```
Use the integrations agent. Akila has confirmed: [paste her answers].
Wire up the real Semble booking flow and the Stripe booking fee.
```

**Test it properly.** Make a real booking as if you were a patient, on a phone.
Check the confirmation arrives, the payment shows up in Stripe, and Akila gets
notified. Do this before launch, not on launch day.

---

## Part 9 — Launch (about an hour, plus waiting)

### A few days before

1. Work through `docs/09-launch-checklist.md` and tick everything.
2. Get Akila's explicit sign-off. Not "looks good" — sign-off on pricing, the
   clinical wording, and the testimonials.
3. **Lower the DNS TTL.** In whatever manages `amhwellness.co.uk`, find the TTL
   setting and change it to 300 seconds. This makes the switchover fast instead
   of taking a day. Do it 48 hours ahead. Codex can't do this — it's a
   web dashboard.

### Switchover day

Pick a quiet morning. Not Friday afternoon.

1. In Vercel: Project Settings → Domains → add `amhwellness.co.uk` and
   `www.amhwellness.co.uk`.
2. Vercel shows you exactly which DNS records to change.
3. Go to your DNS provider and make those changes. **Screenshot the old settings
   first** — that's your undo.
4. Wait. Usually 10–30 minutes with a low TTL.
5. Check `amhwellness.co.uk` in a browser. New site, padlock in the address bar.
6. Turn off the Vercel password protection.
7. Test the old links: `amhwellness.co.uk/about-us` should land on the new
   `/about`. `amhwellness.co.uk/faq` → `/faqs`. Those redirects are already built.

### Immediately after

```
Crawl the live site and check every internal link works, the sitemap is correct,
and no page is missing its title or description. Report anything broken.
```

Then: submit the sitemap in Google Search Console, and make one real booking
end to end as a patient would.

**Leave WordPress running for a month.** If something's badly wrong, you point
DNS back and you're live again in ten minutes.

---

## Part 10 — After launch

**Week one:** email the newsletter list from the Coming Soon page. Claim the
Google Business Profile. Check Search Console for crawl errors.

**Month one:** ask Akila for the questions patients actually ask her — that's
free keyword research with perfect intent. Turn the best one into an article.

**Ongoing:** one solid article a month into the aftercare cluster. That's the
compounding win, and it's the thing competitors aren't doing.

**Quarterly:** ask ChatGPT and Perplexity *"what support is there after coming
off Mounjaro in the UK?"* Log whether AMH Wellness comes up. That's the real
scoreboard for the strategy in `docs/03-seo-aeo-geo.md`.

---

## When things go wrong

**Everything you do is reversible.** Every change is stored in GitHub. Nothing is
permanently broken.

| Problem | Fix |
|---|---|
| Site won't start | `Something's broken, the site won't start. Diagnose and fix it.` |
| A change made it worse | `Undo your last change and explain what went wrong.` |
| Wall of red text | Paste it into Codex. Say "fix this." |
| Codex is going in circles | Close the conversation. Start fresh with a clearer brief. Genuinely works. |
| Live site broke after launch | Point DNS back at WordPress. Fix calmly. Re-launch. |
| You're stuck and don't know what to ask | `Explain what's happening in plain English, as if I don't code.` |

**Ask Codex to explain anything.** "What does that command actually do?" is a
perfectly good question and it'll answer properly.

---

## Glossary

**Terminal** — the black window where you type commands instead of clicking.
Codex mostly does this for you.

**Repository (repo)** — the project folder, plus its full history.

**Commit** — a saved checkpoint with a note about what changed.

**Push** — upload your commits to GitHub.

**Deploy** — publish the site so the public can reach it.

**DNS** — the address book of the internet. Changing DNS is how you point
`amhwellness.co.uk` at the new site.

**TTL** — how long the internet caches a DNS answer. Lower it before switching so
the change happens fast.

**301 / 308 redirect** — a permanent forward. Tells Google the page moved for
good and to transfer its ranking.

**localhost:3000** — the site running privately on your own machine.

**`npm run verify`** — checks the code compiles and the tests pass.

**`npm run copy-check`** — checks every page still has a purpose and the copy
hasn't drifted into hype.

---

## The shortest possible version

1. Sign up: ChatGPT Plus, GitHub, Vercel.
2. Install Node.js and the Codex app.
3. Open the project in Codex, ask it to start the dev server.
4. Paste `prompts/00-MASTER-KICKOFF.md`. Read its five answers carefully.
5. Run the seven agents in order, fresh conversation each, `npm run verify`
   between.
6. Push to GitHub, import to Vercel, send Akila the link.
7. Chase her for pricing — it's the real blocker.
8. Wire up Semble and Stripe, test a real booking.
9. Lower TTL, point DNS at Vercel, verify redirects.
10. Email the newsletter list. Then one article a month, forever.
