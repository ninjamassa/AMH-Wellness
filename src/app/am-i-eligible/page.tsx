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
        <p>
          AMH Wellness uses a short private check to show whether you meet its
          starting criteria for weight loss injections: you must be 18 or over,
          live in the UK, and usually have a BMI of 30 or above, or 27 or above
          with a related health condition. Akila confirms suitability in consultation.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <EligibilityFlow
          relatedConditions={siteConfig.eligibility.relatedConditions}
          bookingUrl={bookingUrl}
        />
        <div className="mx-auto mt-12 grid max-w-2xl gap-8 md:grid-cols-2">
          <section>
            <h2 className="text-h3">What does this check tell me?</h2>
            <p className="mt-3 text-ink-500">
              It compares your answers with AMH Wellness&apos;s stated starting
              criteria. It cannot diagnose a condition or decide that a medicine
              is safe for you. That decision is made after Akila has reviewed
              your health history with you.
            </p>
          </section>
          <section>
            <h2 className="text-h3">Who sees my answers?</h2>
            <p className="mt-3 text-ink-500">
              The calculation happens in your browser. Your measurements and
              health answers are not saved or sent to AMH Wellness. If you move
              on to booking, clinical information is collected through the secure
              booking process instead.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
