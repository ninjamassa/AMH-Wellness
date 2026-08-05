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
 * Full spec: src/lib/patient-journey.ts → specForRoute("/medical-disclaimer")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/medical-disclaimer"]);

export default function MedicalDisclaimerPage() {
  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Medical disclaimer</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/medical-disclaimer"]}>
        <p>
          AMH Wellness website information does not replace personal medical
          advice. It is general guidance and cannot decide whether a weight loss
          medicine is safe or suitable for you; that requires a consultation with
          Akila. Use NHS 111 for urgent advice and call 999 in a life-threatening
          emergency.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <div className="max-w-3xl space-y-12">
          {/* TODO(legal-review): A healthcare legal reviewer and Akila must approve this disclaimer before publication. */}
          <section>
            <h2 className="text-h2">What is this website information for?</h2>
            <p className="mt-5 text-ink-500">
              It helps you understand the AMH Wellness service, the questions to ask
              about weight-management medicines and the kind of support that should
              sit around treatment. It is not a diagnosis, prescription, personalised
              treatment plan or substitute for speaking to an appropriate healthcare
              professional.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Who decides whether treatment is suitable?</h2>
            <p className="mt-5 text-ink-500">
              Akila Dungarwalla MPharmS decides whether she can prescribe after a
              one-to-one consultation and review of your health history and current
              medicines. The online eligibility check compares your answers with
              starting criteria only. It is not a clinical decision.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Can I rely on an article for my own symptoms?</h2>
            <p className="mt-5 text-ink-500">
              No article can account for your complete history, medicines or current
              symptoms. Sources are linked so you can check them, but information
              can change and individual advice may differ. The clinical launch
              articles still require Akila&apos;s review before publication.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What should I do in an emergency?</h2>
            <p className="mt-5 text-ink-500">
              Do not use this website, the contact request form or Akila&apos;s normal
              response hours for an emergency. Use NHS 111 when you need urgent
              medical advice and call 999 when someone is seriously ill or injured
              and their life may be at risk.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Does treatment guarantee a result?</h2>
            <p className="mt-5 text-ink-500">
              No. Suitability, response and side effects differ between people. AMH
              Wellness does not guarantee a prescription, a particular amount or
              speed of weight loss, freedom from side effects or that weight will not
              return after treatment stops.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What about links to other websites?</h2>
            <p className="mt-5 text-ink-500">
              Links to NHS, NICE, MHRA, medicine leaflets and research are provided
              for context. AMH Wellness does not control those websites or promise
              that an external page will remain available or unchanged.
            </p>
          </section>

          <Button href="/">Return to the homepage</Button>
          {/* TODO(legal-review): Confirm the effective date, scope, external-link wording, liability interaction and emergency wording. */}
        </div>
      </Container>
    </>
  );
}
