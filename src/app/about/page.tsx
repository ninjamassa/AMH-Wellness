import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";

/**
 * STAGE     considering
 *
 * JOB
 * The trust page. A named, registered, accountable person with real
 * credentials — the thing no competitor leads with.
 *
 * ANSWERS   ongoing-care
 * NEXT STEP /am-i-eligible
 * TARGETS   akila dungarwalla, independent prescribing pharmacist weight loss
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/about")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/about"]);

export default function AboutPage() {
  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">About Akila</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/about"]}>
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
