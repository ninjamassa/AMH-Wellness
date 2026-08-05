/**
 * THE SPINE OF THIS WEBSITE.
 *
 * Every page exists to move one specific person one step closer to booking, by
 * answering one specific worry. This file encodes who she is, what she's afraid
 * of, and what each page is for.
 *
 * Before you build or write any page, read its entry here. If a page doesn't
 * have a stage, a job and one next step, it shouldn't exist.
 */

/* ── Who we're building for ──────────────────────────────────────────────── */

export const idealPatient = {
  ageRange: "25 to 75",
  skew: "Majority women, typically 35–60",
  summary:
    "She has probably already tried a weight loss injection service. She got a pen in the post, an app, and no one to actually talk to. She's back because that didn't work — not because she wants it faster or cheaper.",
  /** Akila's own words on what brings people to her. */
  inHerWords:
    "Lack of support with the weight loss injections provided by other companies. This is 1-2-1 support, tailored to them with first hand contact to clinician when needed.",
} as const;

/** Who Akila explicitly does NOT want to attract. This shapes the tone as much as the targeting. */
export const notForYou = {
  summary:
    "People looking for a quick fix, who aren't committed, and who have no plan for what happens when the treatment stops.",
  implication:
    "The site can afford to be calm, honest and slightly selective. It should filter as well as sell. Never use urgency, hype or 'transformation' language — it attracts exactly the wrong person.",
} as const;

/* ── The four things she's worried about ─────────────────────────────────── */

export type ObjectionId = "cost" | "side-effects" | "maintenance" | "ongoing-care";

export interface Objection {
  id: ObjectionId;
  worry: string;
  /** How this service genuinely answers it — not a marketing line. */
  answer: string;
  /** Pages that must address it head-on. */
  addressedOn: string[];
}

export const objections: Record<ObjectionId, Objection> = {
  cost: {
    id: "cost",
    worry: "Is this going to cost more than I can justify, and will I know what I'm paying for?",
    answer:
      "Fixed, published pricing. A booking fee that secures a real appointment with a real clinician, not a form review. No hidden add-ons, no subscription that's hard to leave.",
    addressedOn: ["/pricing", "/how-it-works", "/faqs"],
  },
  "side-effects": {
    id: "side-effects",
    worry: "I've read about the side effects. What happens if I feel awful and nobody answers?",
    answer:
      "You can message Akila directly between appointments. Not a chatbot, not a ticket queue — the same pharmacist who prescribed for you, who can adjust your plan.",
    addressedOn: ["/blog/managing-side-effects", "/support-after-injections", "/faqs", "/how-it-works"],
  },
  maintenance: {
    id: "maintenance",
    worry: "What happens when I stop? Am I just going to put it all back on?",
    answer:
      "This is the whole reason the service exists. Nutrition coaching and a maintenance plan are built in from the first consultation, not sold to you at the end.",
    addressedOn: [
      "/support-after-injections",
      "/blog/keeping-weight-off-after-stopping",
      "/",
      "/faqs",
    ],
  },
  "ongoing-care": {
    id: "ongoing-care",
    worry: "Will I actually be able to speak to someone, or am I on my own after the first order?",
    answer:
      "Every consultation and every four-weekly review is with Akila. Same person, every time. She prescribes personally.",
    addressedOn: ["/", "/about", "/how-it-works", "/support-after-injections"],
  },
};

/* ── The journey ─────────────────────────────────────────────────────────── */

export type JourneyStage =
  | "aware"       // Just realised there's an alternative to jab-in-the-post services
  | "considering" // Weighing it up, reading, comparing
  | "ready"       // Wants to know if she qualifies and what it costs
  | "booking"     // Converting
  | "supported";  // Already a patient — content that keeps her and earns referrals

export const stageLabels: Record<JourneyStage, string> = {
  aware: "Just discovering there's a better way to do this",
  considering: "Reading, comparing, working out if this is credible",
  ready: "Wants to know if she qualifies and what it costs",
  booking: "Ready to book",
  supported: "Already a patient",
};

/* ── What every page is for ──────────────────────────────────────────────── */

export interface PageSpec {
  route: string;
  /** Section in the proposal's sitemap. */
  group: "core" | "treatment" | "resources" | "trust";
  title: string;
  stage: JourneyStage;
  /** The single job. If you can't say it in one sentence, the page is confused. */
  job: string;
  /** Which worry this page exists to answer. */
  answers: ObjectionId | null;
  /** The one action we want. One — not a menu. */
  nextStep: string;
  /** Search demand this page targets. Volumes from the proposal's July 2026 research. */
  targets: string[];
  /** Marked ★ in the proposal — the strategic differentiator. */
  flagship?: boolean;
}

export const pages: PageSpec[] = [
  /* ── Core & conversion (7) ────────────────────────────────────────────── */
  {
    route: "/",
    group: "core",
    title: "Home",
    stage: "aware",
    job: "Make her feel, within one screen, that this is a real clinician who will actually know her name — and that someone has finally thought about what happens after.",
    answers: "ongoing-care",
    nextStep: "/am-i-eligible",
    targets: ["weight loss clinic uk", "1-2-1 weight loss support", "prescribing pharmacist weight loss"],
  },
  {
    route: "/how-it-works",
    group: "core",
    title: "How It Works",
    stage: "considering",
    job: "Remove every unknown from the process, so booking feels like a small step rather than a leap.",
    answers: "cost",
    nextStep: "/am-i-eligible",
    targets: ["how do weight loss injections work uk", "online weight loss consultation"],
  },
  {
    route: "/am-i-eligible",
    group: "core",
    title: "Am I Eligible?",
    stage: "ready",
    job: "THE primary lead capture. Tell her honestly in two minutes whether this is for her, and capture her details either way.",
    answers: null,
    nextStep: "Book via Semble",
    targets: ["am i eligible for weight loss injections", "bmi for mounjaro uk", "weight loss injection eligibility"],
  },
  {
    route: "/pricing",
    group: "core",
    title: "Pricing",
    stage: "ready",
    job: "Be straight about money before she has to ask. Fixed prices, clearly what's included.",
    answers: "cost",
    nextStep: "/am-i-eligible",
    targets: ["mounjaro cost uk", "weight loss injection price uk", "wegovy cost uk"],
  },
  {
    route: "/about",
    group: "core",
    title: "About Akila",
    stage: "considering",
    job: "The trust page. A named, registered, accountable person with real credentials — the thing no competitor leads with.",
    answers: "ongoing-care",
    nextStep: "/am-i-eligible",
    targets: ["akila dungarwalla", "independent prescribing pharmacist weight loss"],
  },
  {
    route: "/reviews",
    group: "core",
    title: "Reviews",
    stage: "considering",
    job: "Proof from people like her that the support is real, not a promise.",
    answers: "ongoing-care",
    nextStep: "/am-i-eligible",
    targets: ["amh wellness reviews"],
  },
  {
    route: "/contact",
    group: "core",
    title: "Contact",
    stage: "considering",
    job: "A low-commitment way to ask Akila to reply when she isn't ready to book.",
    answers: null,
    nextStep: "Request a reply",
    targets: [],
  },

  /* ── Treatment & service (4) ──────────────────────────────────────────── */
  {
    route: "/weight-loss-injections",
    group: "treatment",
    title: "Weight Loss Injections",
    stage: "considering",
    job: "The service overview — what treatment with AMH Wellness actually involves, and why the support around it is the point.",
    answers: "ongoing-care",
    nextStep: "/am-i-eligible",
    targets: ["weight loss injections", "weight loss injections uk"],
  },
  {
    route: "/mounjaro",
    group: "treatment",
    title: "Mounjaro",
    stage: "considering",
    job: "Capture the largest search term in the category and convert it into an enquiry about a supported service.",
    answers: "side-effects",
    nextStep: "/am-i-eligible",
    targets: ["mounjaro", "mounjaro uk", "mounjaro reviews uk"],
  },
  {
    route: "/wegovy",
    group: "treatment",
    title: "Wegovy",
    stage: "considering",
    job: "Same job for Wegovy, covering both the injection and the oral tablets Akila offers.",
    answers: "side-effects",
    nextStep: "/am-i-eligible",
    targets: ["wegovy", "wegovy uk", "wegovy tablets"],
  },
  {
    route: "/support-after-injections",
    group: "treatment",
    title: "Support After Injections",
    stage: "considering",
    job: "★ THE differentiator. Own the one question nobody else answers: what happens when you stop. This page is the whole business case.",
    answers: "maintenance",
    nextStep: "/am-i-eligible",
    targets: [
      "coming off mounjaro",
      "how to keep weight off after stopping mounjaro",
      "what happens when you stop mounjaro",
      "support after weight loss injections",
    ],
    flagship: true,
  },

  /* ── Resources (5) ────────────────────────────────────────────────────── */
  {
    route: "/blog",
    group: "resources",
    title: "Blog & Resources",
    stage: "aware",
    job: "The hub Akila wants, where patients and prospects find genuinely useful guidance.",
    answers: null,
    nextStep: "Read an article",
    targets: [],
  },
  {
    route: "/blog/mounjaro-vs-wegovy",
    group: "resources",
    title: "Mounjaro vs Wegovy",
    stage: "considering",
    job: "Capture comparison demand — high intent, low competition — and route it to a consultation.",
    answers: "side-effects",
    nextStep: "/am-i-eligible",
    targets: ["mounjaro vs wegovy", "wegovy or mounjaro which is better"],
  },
  {
    route: "/blog/keeping-weight-off-after-stopping",
    group: "resources",
    title: "Keeping Weight Off After Stopping",
    stage: "considering",
    job: "The flagship article. Feeds /support-after-injections and owns the aftercare cluster — ~3,900 searches a month, barely served.",
    answers: "maintenance",
    nextStep: "/support-after-injections",
    targets: [
      "coming off mounjaro",
      "how to keep weight off after stopping mounjaro",
      "what happens when you stop mounjaro",
    ],
    flagship: true,
  },
  {
    route: "/blog/managing-side-effects",
    group: "resources",
    title: "Managing Side Effects",
    stage: "considering",
    job: "Answer the single biggest fear, with real practical guidance. ~110k/mo informational demand.",
    answers: "side-effects",
    nextStep: "/am-i-eligible",
    targets: ["mounjaro side effects", "wegovy side effects", "how to manage mounjaro nausea"],
  },
  {
    route: "/blog/protein-and-nutrition-on-injections",
    group: "resources",
    title: "Protein & Nutrition on Injections",
    stage: "supported",
    job: "Showcase Akila's nutrition expertise — a topic she raised herself, and the thing that makes her more than a prescriber.",
    answers: "maintenance",
    nextStep: "/support-after-injections",
    targets: ["protein on mounjaro", "what to eat on weight loss injections", "vitamins on mounjaro"],
  },

  /* ── Trust & compliance (5) ───────────────────────────────────────────── */
  {
    route: "/faqs",
    group: "trust",
    title: "FAQs",
    stage: "considering",
    job: "Answer every remaining question in her head, in the words she'd use — and be the source AI assistants quote.",
    answers: null,
    nextStep: "/am-i-eligible",
    targets: ["weight loss injection questions uk"],
  },
  { route: "/privacy-policy", group: "trust", title: "Privacy Policy", stage: "considering", job: "Show her data is handled properly.", answers: null, nextStep: "/", targets: [] },
  { route: "/terms", group: "trust", title: "Terms", stage: "considering", job: "Set out the service terms plainly.", answers: null, nextStep: "/", targets: [] },
  { route: "/complaints", group: "trust", title: "Complaints Procedure", stage: "supported", job: "Show there's a proper route if something goes wrong. Required for CQC readiness.", answers: null, nextStep: "/contact", targets: [] },
  { route: "/medical-disclaimer", group: "trust", title: "Medical Disclaimer", stage: "considering", job: "Make the limits of website information clear.", answers: null, nextStep: "/", targets: [] },
];

export const ROUTES = pages.map((p) => p.route);

export function specForRoute(route: string): PageSpec | undefined {
  return pages.find((p) => p.route === route);
}

export function pagesInGroup(group: PageSpec["group"]): PageSpec[] {
  return pages.filter((p) => p.group === group);
}

export function pagesAnswering(objection: ObjectionId): PageSpec[] {
  return pages.filter((p) => p.answers === objection);
}
