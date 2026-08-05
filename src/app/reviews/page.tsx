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
          publication. No review will appear until the patient has given permission,
          and Akila still needs to confirm how attribution will work. Until then,
          this page explains the support commitments and credentials you can verify.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <div className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-h2">Why are there no quotes here yet?</h2>
            <p className="mt-5 text-ink-500">
              No review has been supplied with confirmed publication consent. This
              page is meant to show whether support feels personal and consistent,
              so it will remain empty until there is a real account that the patient
              has agreed can be published.
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
              Any future review should describe the support experience rather than
              promise a particular weight result. The attribution method has not yet
              been decided and must be agreed with the patient before publication.
            </p>
          </section>

          <Button href="/am-i-eligible">Check if you may be eligible</Button>
          {/* TODO(human): Akila must supply genuine support-focused reviews with an approved attribution method and publication consent on file. */}
        </div>
      </Container>
    </>
  );
}
