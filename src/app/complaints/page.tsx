import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";

/**
 * STAGE
 *
 * JOB

 *
 * ANSWERS   no single objection — supporting page
 * NEXT STEP
 * TARGETS   —
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/complaints")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/complaints"]);

export default function ComplaintsPage() {
  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Complaints procedure</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/complaints"]}>
        <p>
          AMH Wellness has not yet published an operational complaints route. Do
          not send complaint or health details through the contact form, which
          accepts only a name and email address. Before launch, Akila and a legal
          reviewer must confirm the named handler, accessible route, response times
          and independent escalation process.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <div className="max-w-3xl space-y-12">
          {/* TODO(legal-review): This is an incomplete complaints-procedure draft. It must not be treated as launch-ready until the handler, stages, timescales and escalation route are approved. */}
          <section>
            <h2 className="text-h2">Can I submit a complaint through this website now?</h2>
            <p className="mt-5 text-ink-500">
              No. The contact request form has no message box or purpose selector,
              so it cannot identify a complaint and must not be used to send its
              details. Until an accessible operational route is confirmed, this page
              cannot tell you where to send a complaint.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Who will handle my complaint?</h2>
            <p className="mt-5 text-ink-500">
              AMH Wellness is run single-handedly by Akila Dungarwalla MPharmS, but
              the approved complaints handler and the alternative route for a
              complaint about Akila herself have not been supplied. Until both routes
              are confirmed, this page cannot tell you who will handle a complaint.
            </p>
            {/* TODO(human): Name the complaints lead and an independent alternative for complaints involving Akila. */}
          </section>

          <section>
            <h2 className="text-h2">When will I receive a response?</h2>
            <p className="mt-5 text-ink-500">
              Acknowledgement, investigation-update and final-response times are not
              confirmed. They must be published here once Akila and the regulatory
              or legal reviewer approve them. Until then, this page cannot tell you
              when a complaint would be acknowledged or concluded.
            </p>
            {/* TODO(human): Confirm acknowledgement, investigation update and final response times, including what happens when more time is needed. */}
          </section>

          <section>
            <h2 className="text-h2">What should the final procedure explain?</h2>
            <p className="mt-5 text-ink-500">
              It needs to explain how a complaint is recorded, who investigates it,
              how confidentiality and clinical records are handled, how you receive
              updates, what the written outcome contains, how learning is recorded
              and where you can go if you remain dissatisfied.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Can the CQC resolve my complaint?</h2>
            <p className="mt-5 text-ink-500">
              The Care Quality Commission says it cannot take forward individual
              complaints on a patient&apos;s behalf, although information about poor care
              can inform its work. The correct independent escalation route for this
              private service still needs confirmation before it is named here.
            </p>
            <p className="mt-4 text-sm text-ink-500">
              Source: {" "}
              <a
                href="https://www.cqc.org.uk/contact-us/how-complain/complain-about-service-or-provider"
                className="font-medium text-teal-700 underline underline-offset-4"
              >
                CQC guidance on complaining about a service or provider
              </a>
              .
            </p>
          </section>

          <Button href="/contact">Read the contact form guidance</Button>
          {/* TODO(legal-review): Approve accessibility, representation, consent, confidentiality, record-keeping, learning, candour and external escalation wording. */}
        </div>
      </Container>
    </>
  );
}
