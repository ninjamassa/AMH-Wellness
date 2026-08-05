import { JsonLd } from "@/components/schema/JsonLd";
import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { internalLinkPlan } from "@/lib/internal-links";
import { pageSeo } from "@/lib/page-seo";
import { buildGraph, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/**
 * STAGE     considering
 *
 * JOB
 * Same job for Wegovy, covering both the injection and the oral tablets
 * Akila offers.
 *
 * ANSWERS   side-effects
 * NEXT STEP /am-i-eligible
 * TARGETS   wegovy, wegovy uk, wegovy tablets
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/wegovy")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/wegovy"]);

const serviceGraph = buildGraph(
  serviceSchema({
    name: "Wegovy treatment",
    description: pageSeo["/wegovy"].description,
    path: "/wegovy",
  }),
);

export default function WegovyPage() {
  return (
    <>
      <JsonLd graph={serviceGraph} />
      <Container className="py-section">
        <h1 className="text-h1">Wegovy</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/wegovy"]}>
        {/* TODO(content-agent): 40–60 words. Answer outright in the first
            sentence, name AMH Wellness, make it stand alone. */}
        <p>Content in progress.</p>
      </AnswerFirst>

      <Container className="py-section">
        {/* TODO(content-agent): page body per the brief above. */}
      </Container>

      <RelatedLinks links={internalLinkPlan["/wegovy"]} />
    </>
  );
}
