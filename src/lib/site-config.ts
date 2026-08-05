/**
 * Everything the site knows about AMH Wellness.
 *
 * Every value here comes from Akila's discovery questionnaire or the Social
 * Script proposal. Nothing is invented. If you need a fact that isn't here,
 * it hasn't been supplied yet — leave a TODO(human:) and ask.
 */

export const siteConfig = {
  name: "AMH Wellness",
  legalName: "AMH Wellness Ltd",
  companyNumber: "16149594",
  url: "https://amhwellness.co.uk",
  locale: "en-GB",

  /** Akila's own words. She's open to alternatives but likes these. */
  tagline: "Empowering your weight loss journey",
  taglineAlt: "Weight loss has never been easier",

  /** Her one-sentence description, verbatim from the questionnaire. */
  description:
    "A holistic approach to weight loss, providing expertise and support for weight loss and nutrition.",

  /** How we describe the service when we need a fuller line. */
  positioning:
    "One-to-one weight loss support from an independent prescribing pharmacist — with the nutrition coaching and aftercare that other services leave out.",

  contact: {
    /** She's on a personal Gmail today. This domain address needs setting up. */
    email: "admin@amhwellness.co.uk",
    emailCurrent: "amhwellnessltd@gmail.com",
    /** Deliberately not public — patients get it once they're with the service. */
    phone: "07521565393",
    phoneIsPublic: false,
    /** Same number. She's unsure about the admin load, so this is a flag. */
    // TODO(human): Akila must make a deliberate launch decision before enabling this.
    whatsappEnabled: false,
    whatsappNumber: "447521565393",
    responseHours: [
      { days: "Monday to Friday", hours: "4pm – 8pm" },
      { days: "Saturday and Sunday", hours: "9am – 5pm" },
    ],
    /** "It's all me at the moment!" — set expectations honestly. */
    handledBy: "Akila",
  },

  /** Registered office only. The service is 100% remote — never show as a clinic. */
  registeredOffice: {
    streetAddress: "7 Abercorn Close",
    addressLocality: "South Croydon",
    postalCode: "CR2 8TG",
    addressCountry: "GB",
  },

  clinician: {
    name: "Akila Dungarwalla",
    /** Exactly as she wrote it. She is a pharmacist, not a doctor. */
    credentials: "MPharmS",
    jobTitle: "Independent Prescribing Pharmacist",
    gphcNumber: "2063173",
    gphcRegisterUrl: "https://www.pharmacyregulation.org/registers",
    accreditation: "SCOPE-accredited obesity training with the NMWLP",
    /** She prescribes personally — this is central to the proposition. */
    prescribesPersonally: true,
  },

  regulatory: {
    /** "I'm currently going through CQC inspection so we need add this to website" */
    cqcStatus: "Registration in progress",
    showCqcStatus: true,
    treatmentsAreMhraApproved: true,
  },

  social: {
    instagram: "https://www.instagram.com/amhwellnessltd",
    instagramHandle: "@amhwellnessltd",
  },

  /** Her stated eligibility criteria. */
  eligibility: {
    minAge: 18,
    bmiThreshold: 30,
    bmiThresholdWithCondition: 27,
    ukResidentOnly: true,
    relatedConditions: [
      "High blood pressure",
      "Pre-diabetes or type 2 diabetes",
      "Sleep apnoea",
      "Raised cholesterol",
      "Joint pain related to weight",
    ],
  },

  /** The five steps, exactly as Akila described her process. */
  journey: [
    {
      step: 1,
      title: "Book your consultation",
      detail:
        "Choose a time that suits you through our online booking system. You'll pay a booking fee to secure the appointment.",
    },
    {
      step: 2,
      title: "Complete your health questionnaire",
      detail:
        "You'll get a confirmation email with a link to join your video call and a short health questionnaire to fill in beforehand, so we can make the most of our time together.",
    },
    {
      step: 3,
      title: "Meet Akila on a video call",
      detail:
        "A proper one-to-one consultation. Your health history, your goals, what you've tried before, and an honest conversation about whether treatment is right for you.",
    },
    {
      step: 4,
      title: "Your treatment is dispensed and delivered",
      detail:
        "If treatment is appropriate, your prescription goes to a registered UK pharmacy. Order before 3pm and it's usually with you the next day.",
    },
    {
      step: 5,
      title: "We review every four weeks — and you can reach me between",
      detail:
        "Each pen lasts four weeks, so we speak every four weeks to review how you're getting on. In between, you can message me any time with a question or a worry.",
    },
  ],

  /** Dispensing facts from the questionnaire. */
  dispensing: {
    pharmacy: "A registered UK pharmacy",
    cutoffTime: "3pm",
    standardDelivery: "Usually next day if ordered before 3pm",
    coldChainDelivery: "7-day delivery available on most injections",
    penDuration: "4 weeks",
  },

  /** What's actually included. Everything after the medication is the differentiator. */
  includes: [
    "A one-to-one video consultation with Akila",
    "A personalised weight management plan",
    "Nutrition guidance and meal planning support",
    "Reviews every four weeks",
    "Message access between appointments for questions and concerns",
    "Supplement advice where appropriate",
    "A plan for maintaining your weight once you finish treatment",
  ],

  /** Coming, not live. Do not present as current. */
  roadmap: [
    "Working with a personal trainer on fitness and workout plans",
    "A downloadable nutrition guide",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
