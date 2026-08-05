import type { SeoRoute } from "./page-seo";

export interface InternalLink {
  href: SeoRoute;
  label: string;
}

/**
 * Search pathways that must survive later content and design edits.
 * The content agent may change anchor wording, but not these destinations.
 */
export const internalLinkPlan: Partial<Record<SeoRoute, readonly InternalLink[]>> &
  Record<
    | "/weight-loss-injections"
    | "/mounjaro"
    | "/wegovy"
    | "/blog"
    | "/blog/mounjaro-vs-wegovy"
    | "/blog/keeping-weight-off-after-stopping"
    | "/blog/managing-side-effects"
    | "/blog/protein-and-nutrition-on-injections",
    readonly InternalLink[]
  > = {
  "/weight-loss-injections": [
    {
      href: "/support-after-injections",
      label: "Read about support after weight loss injections",
    },
    { href: "/am-i-eligible", label: "Check whether you may be eligible" },
  ],
  "/mounjaro": [
    { href: "/support-after-injections", label: "Plan for coming off Mounjaro" },
    { href: "/am-i-eligible", label: "Check whether you may be eligible" },
  ],
  "/wegovy": [
    { href: "/support-after-injections", label: "Plan for support after Wegovy" },
    { href: "/am-i-eligible", label: "Check whether you may be eligible" },
  ],
  "/blog": [
    { href: "/blog/mounjaro-vs-wegovy", label: "Mounjaro vs Wegovy" },
    {
      href: "/blog/keeping-weight-off-after-stopping",
      label: "Keeping weight off after stopping",
    },
    { href: "/blog/managing-side-effects", label: "Managing side effects" },
    {
      href: "/blog/protein-and-nutrition-on-injections",
      label: "Protein and nutrition on injections",
    },
  ],
  "/blog/mounjaro-vs-wegovy": [
    { href: "/weight-loss-injections", label: "See how supported treatment works" },
  ],
  "/blog/keeping-weight-off-after-stopping": [
    { href: "/support-after-injections", label: "See AMH Wellness aftercare support" },
  ],
  "/blog/managing-side-effects": [
    { href: "/weight-loss-injections", label: "See how ongoing clinical support works" },
  ],
  "/blog/protein-and-nutrition-on-injections": [
    { href: "/support-after-injections", label: "Read about nutrition and aftercare support" },
  ],
};
