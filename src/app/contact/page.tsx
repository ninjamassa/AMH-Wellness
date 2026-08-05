import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";

/**
 * STAGE     considering
 *
 * JOB
 * A low-commitment way to ask a question when she isn't ready to book.
 *
 * ANSWERS   no single objection — supporting page
 * NEXT STEP Send an enquiry
 * TARGETS   —
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/contact")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/contact"]);

export default function ContactPage() {
  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Contact us</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/contact"]}>
        {/* TODO(content-agent): 40–60 words. Answer outright in the first
            sentence, name AMH Wellness, make it stand alone. */}
        <p>Content in progress.</p>
      </AnswerFirst>

      <Container className="py-section">
        <EnquiryForm />
        {/* TODO(content-agent): supporting page body per the brief above. */}
      </Container>
    </>
  );
}
