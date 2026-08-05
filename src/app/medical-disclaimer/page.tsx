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
 * Full spec: src/lib/patient-journey.ts → specForRoute("/medical-disclaimer")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/medical-disclaimer"]);

export default function MedicalDisclaimerPage() {
  return (
    <>
      <Container className="py-[--spacing-section]">
        <h1 className="text-[length:--text-h1]">Medical disclaimer</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/medical-disclaimer"]}>
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
