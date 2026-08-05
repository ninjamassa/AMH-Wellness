import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

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
  const { legalName, companyNumber, registeredOffice, clinician } = siteConfig;

  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Terms</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/terms"]}>
        <p>
          AMH Wellness has not yet confirmed the full terms for using its remote
          service. This draft explains that website information is general, treatment
          requires a consultation and prescribing is never automatic. Booking,
          payment, cancellation, refund and treatment terms still require Akila&apos;s
          and a legal reviewer&apos;s approval before publication.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <div className="max-w-3xl space-y-12">
          {/* TODO(legal-review): These terms are an incomplete factual draft. Consumer and healthcare counsel must approve them before anyone books or pays. */}
          <section>
            <h2 className="text-h2">Who provides the service?</h2>
            <p className="mt-5 text-ink-500">
              {legalName}, company number {companyNumber}, provides the AMH Wellness
              service. It is fully remote and consultations take place by video. The
              address at {registeredOffice.streetAddress},{" "}
              {registeredOffice.addressLocality}, {registeredOffice.postalCode} is a
              registered office, not a clinic.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What does using this website mean?</h2>
            <p className="mt-5 text-ink-500">
              Website information is general. Reading a page, completing the
              browser-only eligibility check or asking for a reply does not create a
              clinician-patient relationship and does not guarantee a consultation,
              prescription, medicine or particular result.
            </p>
          </section>

          <section>
            <h2 className="text-h2">How is clinical suitability decided?</h2>
            <p className="mt-5 text-ink-500">
              Suitability is decided after a one-to-one consultation with{" "}
              {clinician.name} {clinician.credentials}. She reviews your health
              history and current medicines and prescribes personally only if
              treatment is appropriate. An online eligibility result is a starting
              screen, not a prescribing decision.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What happens when I book?</h2>
            <p className="mt-5 text-ink-500">
              The stated process uses hosted online booking, a booking fee, a health
              questionnaire and a video consultation. The exact Semble product,
              payment sequence, rescheduling rules, missed-appointment terms and
              point at which a contract forms have not been confirmed.
            </p>
            {/* TODO(human): Confirm the booking platform, contract formation point, booking-fee treatment, rescheduling and missed-appointment rules. */}
          </section>

          <section>
            <h2 className="text-h2">What will I pay, and can I cancel?</h2>
            <p className="mt-5 text-ink-500">
              Prices, inclusions, payment timing, cancellation rights, refunds and
              any subscription or minimum-term arrangement are not confirmed. They
              must be stated clearly before payment is enabled. No fee or cancellation
              restriction should be treated as agreed until the final terms are
              published.
            </p>
            {/* TODO(legal-review): Confirm distance-contract information, cooling-off rights, service-start consent, fair cancellation charges, refunds and medicine-return restrictions. */}
          </section>

          <section>
            <h2 className="text-h2">What am I responsible for during care?</h2>
            <p className="mt-5 text-ink-500">
              Akila still needs to confirm the exact responsibilities that will form
              part of the service terms, including providing accurate information,
              following prescribing instructions, not sharing prescribed medicine,
              attending reviews and seeking urgent care when needed.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What if something goes wrong?</h2>
            <p className="mt-5 text-ink-500">
              The complaints page explains that no operational route is confirmed
              yet. Its handler, timescales and independent escalation route are still
              awaiting confirmation. Liability, governing law, dispute resolution
              and changes to these terms also require legal drafting.
            </p>
          </section>

          <Button href="/">Return to the homepage</Button>
          {/* TODO(human): Confirm prices, payment provider, cancellations, refunds, delivery responsibilities, medicine returns, complaint escalation and all other commercial terms. */}
          {/* TODO(legal-review): Add an effective date and approve the complete consumer, clinical, liability, governing-law and dispute terms before launch. */}
        </div>
      </Container>
    </>
  );
}
