import { siteConfig } from "./site-config";

/**
 * JSON-LD. This is how Google and AI assistants work out who is behind the
 * content — and a named, GPhC-registered pharmacist is the single strongest
 * trust signal this business has. Voy, SheMed and Juniper don't have one.
 * Make it machine-readable everywhere.
 */

type Json = Record<string, unknown>;

const ORG_ID = `${siteConfig.url}/#organization`;
const PERSON_ID = `${siteConfig.url}/#akila-dungarwalla`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

export const schemaIds = {
  organisation: ORG_ID,
  clinician: PERSON_ID,
  website: WEBSITE_ID,
} as const;

function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

function pageNodeId(path: string, fragment: string): string {
  return `${absoluteUrl(path)}#${fragment}`;
}

export function organisationSchema(): Json {
  return {
    "@type": "MedicalBusiness",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    logo: `${siteConfig.url}/amh-wellness.jpg`,
    image: `${siteConfig.url}/og-default.png`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    medicalSpecialty: "https://schema.org/Nutrition",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    availableLanguage: "en-GB",
    identifier: {
      "@type": "PropertyValue",
      name: "Companies House company number",
      value: siteConfig.companyNumber,
    },
    employee: { "@id": PERSON_ID },
    founder: { "@id": PERSON_ID },
    sameAs: [siteConfig.social.instagram],
  };
}

export function clinicianSchema(): Json {
  const { clinician } = siteConfig;
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: clinician.name,
    honorificSuffix: clinician.credentials,
    jobTitle: clinician.jobTitle,
    worksFor: { "@id": ORG_ID },
    knowsAbout: [
      "Weight management",
      "Obesity",
      "Nutrition",
      "Independent prescribing",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional registration",
        recognizedBy: {
          "@type": "Organization",
          name: "General Pharmaceutical Council",
          url: clinician.gphcRegisterUrl,
        },
        identifier: clinician.gphcNumber,
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Accreditation",
        name: clinician.accreditation,
      },
    ],
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "en-GB",
    publisher: { "@id": ORG_ID },
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    "@type": "MedicalTherapy",
    "@id": pageNodeId(input.path, "service"),
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": WEBSITE_ID },
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United Kingdom" },
  };
}

export function faqSchema(input: {
  path: string;
  faqs: ReadonlyArray<{ question: string; answer: string }>;
}): Json {
  return {
    "@type": "FAQPage",
    "@id": pageNodeId(input.path, "faq"),
    url: absoluteUrl(input.path),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: input.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function howToSchema(input: {
  name: string;
  description: string;
  path: string;
  steps: ReadonlyArray<{ title: string; detail: string }>;
}): Json {
  return {
    "@type": "HowTo",
    "@id": pageNodeId(input.path, "howto"),
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": WEBSITE_ID },
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.detail,
    })),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  lastReviewed: string;
}): Json {
  return {
    "@type": "MedicalWebPage",
    "@id": pageNodeId(input.path, "webpage"),
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    lastReviewed: input.lastReviewed,
    inLanguage: "en-GB",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": pageNodeId(input.path, "breadcrumb") },
    publisher: { "@id": ORG_ID },
    author: { "@id": PERSON_ID },
    reviewedBy: { "@id": PERSON_ID },
  };
}

export function breadcrumbSchema(input: {
  path: string;
  trail: ReadonlyArray<{ name: string; path: string }>;
}): Json {
  return {
    "@type": "BreadcrumbList",
    "@id": pageNodeId(input.path, "breadcrumb"),
    itemListElement: input.trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildGraph(...nodes: Json[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
