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
 * The service overview — what treatment with AMH Wellness actually involves,
 * and why the support around it is the point.
 *
 * ANSWERS   ongoing-care
 * NEXT STEP /am-i-eligible
 * TARGETS   weight loss injections, weight loss injections uk
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/weight-loss-injections")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/weight-loss-injections"]);

const serviceGraph = buildGraph(
  serviceSchema({
    name: "Weight loss injection treatment",
    description: pageSeo["/weight-loss-injections"].description,
    path: "/weight-loss-injections",
  }),
);

export default function WeightLossInjectionsPage() {
  return (
    <>
      <JsonLd graph={serviceGraph} />
      <Container className="py-[--spacing-section]">
        <h1 className="text-[length:--text-h1]">Weight loss injections</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/weight-loss-injections"]}>
        {/* TODO(content-agent): 40–60 words. Answer outright in the first
            sentence, name AMH Wellness, make it stand alone. */}
        <p>Content in progress.</p>
      </AnswerFirst>

      <Container className="py-[--spacing-section]">
        {/* TODO(content-agent): page body per the brief above. */}
      </Container>

      <RelatedLinks links={internalLinkPlan["/weight-loss-injections"]} />
    </>
  );
}
