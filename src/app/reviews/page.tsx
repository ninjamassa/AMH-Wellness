import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";

/**
 * STAGE     considering
 *
 * JOB
 * Proof from people like her that the support is real, not a promise.
 *
 * ANSWERS   ongoing-care
 * NEXT STEP /am-i-eligible
 * TARGETS   amh wellness reviews
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/reviews")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/reviews"]);

export default function ReviewsPage() {
  return (
    <>
      <Container className="py-[--spacing-section]">
        <h1 className="text-[length:--text-h1]">Patient reviews</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/reviews"]}>
        {/* TODO(content-agent): 40–60 words. Answer outright in the first
            sentence, name AMH Wellness, make it stand alone. */}
        <p>Content in progress.</p>
      </AnswerFirst>

      <Container className="py-[--spacing-section]">
        {/* TODO(content-agent): page body per the brief above. */}
      </Container>
    </>
  );
}
