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
 * Capture the largest search term in the category and convert it into an
 * enquiry about a supported service.
 *
 * ANSWERS   side-effects
 * NEXT STEP /am-i-eligible
 * TARGETS   mounjaro, mounjaro uk, mounjaro reviews uk
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/mounjaro")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/mounjaro"]);

const serviceGraph = buildGraph(
  serviceSchema({
    name: "Mounjaro treatment",
    description: pageSeo["/mounjaro"].description,
    path: "/mounjaro",
  }),
);

export default function MounjaroPage() {
  return (
    <>
      <JsonLd graph={serviceGraph} />
      <Container className="py-[--spacing-section]">
        <h1 className="text-[length:--text-h1]">Mounjaro</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/mounjaro"]}>
        {/* TODO(content-agent): 40–60 words. Answer outright in the first
            sentence, name AMH Wellness, make it stand alone. */}
        <p>Content in progress.</p>
      </AnswerFirst>

      <Container className="py-[--spacing-section]">
        {/* TODO(content-agent): page body per the brief above. */}
      </Container>

      <RelatedLinks links={internalLinkPlan["/mounjaro"]} />
    </>
  );
}
