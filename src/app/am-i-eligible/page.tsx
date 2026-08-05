import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { EligibilityFlow } from "@/components/forms/EligibilityFlow";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { parseHostedBookingUrl } from "@/lib/integrations";

/**
 * STAGE     ready
 *
 * JOB
 * THE primary lead capture. Tell her honestly in two minutes whether this is
 * for her, and capture her details either way.
 *
 * ANSWERS   no single objection — supporting page
 * NEXT STEP Book via Semble
 * TARGETS   am i eligible for weight loss injections, bmi for mounjaro uk, weight loss injection eligibility
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/am-i-eligible")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/am-i-eligible"]);

export default function EligibilityPage() {
  // TODO(human): Akila must supply and test the exact hosted Semble booking URL.
  const bookingUrl = parseHostedBookingUrl(process.env.SEMBLE_BOOKING_URL);

  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Am I eligible?</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/am-i-eligible"]}>
        {/* TODO(content-agent): 40–60 words. Answer outright in the first
            sentence, name AMH Wellness, make it stand alone. */}
        <p>Content in progress.</p>
      </AnswerFirst>

      <Container className="py-section">
        <EligibilityFlow
          relatedConditions={siteConfig.eligibility.relatedConditions}
          bookingUrl={bookingUrl}
        />
        {/* TODO(content-agent): supporting page body per the brief above. */}
      </Container>
    </>
  );
}
