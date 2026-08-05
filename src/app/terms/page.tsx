import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";

/**
 * STAGE
 *
 * JOB

 *
 * ANSWERS   no single objection — supporting page
 * NEXT STEP
 * TARGETS   —
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/terms")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/terms"]);

export default function TermsPage() {
  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Terms</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/terms"]}>
        {/* TODO(content-agent): 40–60 words. Answer outright in the first
            sentence, name AMH Wellness, make it stand alone. */}
        <p>Content in progress.</p>
      </AnswerFirst>

      <Container className="py-section">
        {/* TODO(content-agent): page body per the brief above. */}
      </Container>
    </>
  );
}
