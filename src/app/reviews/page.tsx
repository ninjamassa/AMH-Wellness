import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

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
  const { clinician } = siteConfig;

  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Patient reviews</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/reviews"]}>
        <p>
          AMH Wellness does not yet have any patient reviews approved for
          publication. Akila will only publish a review when the patient has given
          permission, using a first name only. Until then, this page will not fill
          the gap with invented testimonials; it explains what you can verify about
          the support instead.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <div className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-h2">Why are there no quotes here yet?</h2>
            <p className="mt-5 text-ink-500">
              No review has been supplied with confirmed publication consent. A
              real first-hand account matters because this page is meant to show
              whether the support feels personal and consistent. Writing a
              plausible quote would undermine that purpose.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What can I check in the meantime?</h2>
            <p className="mt-5 text-ink-500">
              You can verify {clinician.name}&apos;s GPhC registration under number{" "}
              {clinician.gphcNumber}. You can also see the service commitments before
              booking: consultations and four-weekly reviews with Akila herself,
              message access between appointments, nutrition guidance and a
              maintenance plan.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What will future reviews focus on?</h2>
            <p className="mt-5 text-ink-500">
              Reviews should describe the support experience rather than promise a
              particular weight result. They will use the patient&apos;s first name and
              appear only when permission to publish is on file.
            </p>
          </section>

          <Button href="/am-i-eligible">Check if you may be eligible</Button>
          {/* TODO(human): Akila must supply genuine support-focused reviews with first-name attribution and publication consent on file. */}
        </div>
      </Container>
    </>
  );
}
