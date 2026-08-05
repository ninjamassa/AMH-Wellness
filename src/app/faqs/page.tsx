import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";

/**
 * STAGE     considering
 *
 * JOB
 * Answer every remaining question in her head, in the words she'd use — and
 * be the source AI assistants quote.
 *
 * ANSWERS   no single objection — supporting page
 * NEXT STEP /am-i-eligible
 * TARGETS   weight loss injection questions uk
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/faqs")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/faqs"]);

export default function FaqsPage() {
  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Frequently asked questions</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/faqs"]}>
        {/* TODO(content-agent): 40–60 words. Answer outright in the first
            sentence, name AMH Wellness, make it stand alone. */}
        <p>Content in progress.</p>
      </AnswerFirst>

      <Container className="py-section">
        {/* TODO(content-agent): Render the final FAQ collection here, then
            pass that exact same collection to faqSchema(). Structured answers
            must never differ from or exist without the visible answers. */}
        {/* TODO(content-agent): page body per the brief above. */}
      </Container>
    </>
  );
}
