import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";

/**
 * STAGE     ready
 *
 * JOB
 * Be straight about money before she has to ask. Fixed prices, clearly
 * what's included.
 *
 * ANSWERS   cost
 * NEXT STEP /am-i-eligible
 * TARGETS   mounjaro cost uk, weight loss injection price uk, wegovy cost uk
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/pricing")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/pricing"]);

export default function PricingPage() {
  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Pricing</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/pricing"]}>
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
