import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { JsonLd } from "@/components/schema/JsonLd";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { internalLinkPlan } from "@/lib/internal-links";
import { pageSeo } from "@/lib/page-seo";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/**
 * STAGE     supported
 *
 * JOB
 * Showcase Akila's nutrition expertise — a topic she raised herself, and the
 * thing that makes her more than a prescriber.
 *
 * ANSWERS   maintenance
 * NEXT STEP /support-after-injections
 * TARGETS   protein on mounjaro, what to eat on weight loss injections, vitamins on mounjaro
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/blog/protein-and-nutrition-on-injections")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

const path = "/blog/protein-and-nutrition-on-injections";

export const metadata = buildMetadata(pageSeo[path]);

const breadcrumbGraph = buildGraph(
  breadcrumbSchema({
    path,
    trail: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Protein and nutrition on injections", path },
    ],
  }),
);

export default function NutritionPage() {
  return (
    <>
      <JsonLd graph={breadcrumbGraph} />
      <Container className="py-[--spacing-section]">
        <h1 className="text-[length:--text-h1]">Protein and nutrition on injections</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions[path]}>
        {/* TODO(content-agent): 40–60 words. Answer outright in the first
            sentence, name AMH Wellness, make it stand alone. */}
        <p>Content in progress.</p>
      </AnswerFirst>

      <Container className="py-[--spacing-section]">
        {/* TODO(human): After Akila approves and clinically reviews the final
            article, confirm its published, modified and reviewed dates. Then
            add the visible review line and MedicalWebPage node. */}
        {/* TODO(content-agent): page body per the brief above. */}
      </Container>

      <RelatedLinks links={internalLinkPlan[path]} />
    </>
  );
}
