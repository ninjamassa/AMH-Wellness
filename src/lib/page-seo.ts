import type { PageSeoInput } from "./seo";

/**
 * Unique search metadata for every declared route.
 *
 * Titles are sized with the root ` | AMH Wellness` template included. Keep
 * descriptions useful to a patient first; the route targets are context, not
 * a checklist to repeat.
 */
export const pageSeo = {
  "/": {
    title: "UK weight loss support with a pharmacist",
    description:
      "Get one-to-one UK weight loss support from Akila Dungarwalla MPharmS, with video consultations, nutrition guidance, four-weekly reviews and aftercare.",
    path: "/",
  },
  "/how-it-works": {
    title: "How weight loss treatment works online",
    description:
      "See how online weight loss treatment works at AMH Wellness, from booking and a video consultation with Akila to pharmacy delivery and four-weekly reviews.",
    path: "/how-it-works",
  },
  "/am-i-eligible": {
    title: "Weight loss injection eligibility checker",
    description:
      "Use the two-minute UK eligibility checker for weight loss injections. It covers age, residency, BMI and related conditions before a clinical consultation.",
    path: "/am-i-eligible",
  },
  "/pricing": {
    title: "Weight loss injection pricing in the UK",
    description:
      "AMH Wellness pricing is awaiting Akila’s confirmation. This page will set out Mounjaro and Wegovy costs and what consultations, reviews and support include.",
    path: "/pricing",
  },
  "/about": {
    title: "Akila Dungarwalla, prescribing pharmacist",
    description:
      "Meet Akila Dungarwalla MPharmS, the independent prescribing pharmacist behind AMH Wellness, with GPhC registration and SCOPE-accredited obesity training.",
    path: "/about",
  },
  "/reviews": {
    title: "AMH Wellness patient reviews",
    description:
      "AMH Wellness patient reviews will appear here only after permission is confirmed. Learn what to expect from one-to-one care with Akila in the meantime.",
    path: "/reviews",
  },
  "/contact": {
    title: "Contact Akila at AMH Wellness",
    description:
      "Ask Akila Dungarwalla MPharmS to reply by email through the AMH Wellness contact request form, with no message or health information collected on the page.",
    path: "/contact",
  },
  "/weight-loss-injections": {
    title: "Weight loss injections with ongoing support",
    description:
      "Explore UK weight loss injection treatment with AMH Wellness: a video consultation with Akila, nutrition guidance, four-weekly reviews and planned aftercare.",
    path: "/weight-loss-injections",
  },
  "/mounjaro": {
    title: "Mounjaro UK with one-to-one support",
    description:
      "Learn how Mounjaro treatment works at AMH Wellness, with one-to-one video consultations, four-weekly reviews and direct message access to pharmacist Akila.",
    path: "/mounjaro",
  },
  "/wegovy": {
    title: "Wegovy UK with one-to-one support",
    description:
      "Learn how Wegovy treatment works at AMH Wellness, with one-to-one video consultations, four-weekly reviews and direct message access to pharmacist Akila.",
    path: "/wegovy",
  },
  "/support-after-injections": {
    title: "Support after weight loss injections",
    description:
      "Learn what can happen after stopping Mounjaro or Wegovy, why weight may return, and how AMH Wellness plans nutrition and maintenance with pharmacist Akila.",
    path: "/support-after-injections",
  },
  "/blog": {
    title: "Weight loss guidance and resources",
    description:
      "Read practical AMH Wellness guidance on weight loss injections, nutrition, side effects and aftercare, focused on questions patients ask Akila during treatment.",
    path: "/blog",
  },
  "/blog/mounjaro-vs-wegovy": {
    title: "Mounjaro vs Wegovy: an honest comparison",
    description:
      "Compare Mounjaro vs Wegovy, including how they work, how they are taken and their side effects, with treatment suitability decided in consultation with Akila.",
    path: "/blog/mounjaro-vs-wegovy",
  },
  "/blog/keeping-weight-off-after-stopping": {
    title: "Keeping weight off after stopping Mounjaro",
    description:
      "Learn what to plan for when coming off Mounjaro, why weight can return after stopping injections, and how nutrition guidance and ongoing support may help.",
    path: "/blog/keeping-weight-off-after-stopping",
  },
  "/blog/managing-side-effects": {
    title: "Managing Mounjaro and Wegovy side effects",
    description:
      "Find practical guidance on Mounjaro and Wegovy side effects, when to seek help, and how direct access means your questions reach prescribing pharmacist Akila.",
    path: "/blog/managing-side-effects",
  },
  "/blog/protein-and-nutrition-on-injections": {
    title: "Protein on weight loss injections",
    description:
      "Learn why protein and nutrition matter during weight loss injection treatment, with guidance on food, vitamins and maintaining weight after treatment ends.",
    path: "/blog/protein-and-nutrition-on-injections",
  },
  "/faqs": {
    title: "Weight loss injection questions answered",
    description:
      "Get clear answers to common UK weight loss injection questions, including eligibility, costs, side effects, delivery, reviews, aftercare and contacting Akila.",
    path: "/faqs",
  },
  "/privacy-policy": {
    title: "Privacy policy",
    description:
      "Read the AMH Wellness privacy policy for information about how the website and remote service handle personal data, your rights and how to contact Akila.",
    path: "/privacy-policy",
  },
  "/terms": {
    title: "Terms of service",
    description:
      "Read the terms that apply when you use the AMH Wellness website and remote weight loss service, including booking, clinical suitability and responsibilities.",
    path: "/terms",
  },
  "/complaints": {
    title: "Complaints procedure",
    description:
      "Find out how to raise a concern or complaint with AMH Wellness, who will respond, what happens next and how to ask questions about the complaints process.",
    path: "/complaints",
  },
  "/medical-disclaimer": {
    title: "Medical disclaimer",
    description:
      "Understand why AMH Wellness website information is general guidance, when you need clinical advice and how treatment decisions are made in consultation.",
    path: "/medical-disclaimer",
  },
} as const satisfies Record<string, PageSeoInput>;

export type SeoRoute = keyof typeof pageSeo;
