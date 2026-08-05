import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

/**
 * STAGE     considering
 *
 * JOB
 * A low-commitment way to ask Akila to reply when she isn't ready to book.
 *
 * ANSWERS   no single objection — supporting page
 * NEXT STEP Request a reply
 * TARGETS   —
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/contact")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/contact"]);

export default function ContactPage() {
  const { clinician, contact } = siteConfig;

  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Ask Akila to contact you</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/contact"]}>
        <p>
          To contact AMH Wellness, leave your name and email address in the
          contact request form. {clinician.name} {clinician.credentials} handles
          replies herself; her stated response hours are published below. The form
          does not accept a message or health information; those details belong in
          the external booking and health-questionnaire systems.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <EnquiryForm />
        <div className="mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
          <section>
            <h2 className="text-h3">When does Akila reply?</h2>
            <p className="mt-3 text-ink-500">
              Akila runs AMH Wellness single-handedly. These are her stated
              response hours, not a guaranteed turnaround time:
            </p>
            <dl className="mt-4 space-y-2 text-sm text-ink-500">
              {contact.responseHours.map((period) => (
                <div key={period.days} className="flex justify-between gap-5">
                  <dt>{period.days}</dt>
                  <dd className="font-medium text-ink-700">{period.hours}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section>
            <h2 className="text-h3">Is this form for medical advice?</h2>
            <p className="mt-3 text-ink-500">
              No. It asks only for your name and email so Akila can reply. Do not
              send clinical information by email. Use NHS 111 for urgent medical
              advice and call 999 in a life-threatening emergency.
            </p>
          </section>
        </div>
        {/* TODO(human): Confirm Resend, the professional email domain and the operational reply-time expectation before launch. */}
      </Container>
    </>
  );
}
