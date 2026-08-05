import { pagesInGroup } from "./patient-journey";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/**
 * Navigation follows the patient's questions, not our org chart.
 *
 * "Treatments" sits before "Support" deliberately — she arrives searching for
 * the medication, and discovers the support once we have her attention. That
 * discovery is the conversion moment for this business.
 */
export const primaryNav: NavItem[] = [
  {
    label: "Treatments",
    href: "/weight-loss-injections",
    children: [
      { label: "Weight loss injections", href: "/weight-loss-injections" },
      { label: "Mounjaro", href: "/mounjaro" },
      { label: "Wegovy", href: "/wegovy" },
    ],
  },
  { label: "Support after injections", href: "/support-after-injections" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Akila", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Treatments",
    items: pagesInGroup("treatment").map((p) => ({ label: p.title, href: p.route })),
  },
  {
    heading: "The service",
    items: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Am I eligible?", href: "/am-i-eligible" },
      { label: "Pricing", href: "/pricing" },
      { label: "About Akila", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    items: [
      ...pagesInGroup("resources").map((p) => ({ label: p.title, href: p.route })),
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Complaints procedure", href: "/complaints" },
      { label: "Medical disclaimer", href: "/medical-disclaimer" },
    ],
  },
];

/**
 * The single conversion action for the whole site.
 * Akila: "Can we incorporate an online assessment? If so this will be key to
 * gain lead information."
 */
export const primaryCta = {
  label: "Check if you may be eligible",
  href: "/am-i-eligible",
  supporting: "Takes about two minutes",
} as const;
