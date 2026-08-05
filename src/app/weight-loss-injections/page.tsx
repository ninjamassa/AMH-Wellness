import { JsonLd } from "@/components/schema/JsonLd";
import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { internalLinkPlan } from "@/lib/internal-links";
import { pageSeo } from "@/lib/page-seo";
import { buildGraph, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

/**
 * STAGE     considering
 *
 * JOB
 * The service overview — what treatment with AMH Wellness actually involves,
 * and why the support around it is the point.
 *
 * ANSWERS   ongoing-care
 * NEXT STEP /am-i-eligible
 * TARGETS   weight loss injections, weight loss injections uk
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/weight-loss-injections")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/weight-loss-injections"]);

const serviceGraph = buildGraph(
  serviceSchema({
    name: "Weight loss injection treatment",
    description: pageSeo["/weight-loss-injections"].description,
    path: "/weight-loss-injections",
  }),
);

export default function WeightLossInjectionsPage() {
  return (
    <>
      <JsonLd graph={serviceGraph} />
      <Container className="py-section">
        <h1 className="text-h1">Weight loss injections</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/weight-loss-injections"]}>
        <p>
          Weight loss injections are prescription medicines used alongside
          changes to diet and activity to help manage weight. At AMH Wellness,
          treatment includes a video consultation with Akila Dungarwalla MPharmS,
          a plan made for you, reviews every four weeks and message access to the
          same prescribing pharmacist between appointments.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <div className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-h2">What would treatment actually involve?</h2>
            <p className="mt-5 text-ink-500">
              It starts with a one-to-one video consultation, not an automatic
              prescription. Akila asks about your health, medicines, goals and what
              you have tried before. If an injection is appropriate, she prescribes
              personally and a registered UK pharmacy dispenses and delivers it.
            </p>
            <p className="mt-4 text-ink-500">
              A pen is only one part of the service. Your care also includes a
              personalised weight-management plan, nutrition and meal-planning
              guidance, reviews every four weeks, message access between
              appointments and a plan for maintaining your weight after treatment.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Which injections does Akila offer?</h2>
            <p className="mt-5 text-ink-500">
              AMH Wellness offers Mounjaro, which contains tirzepatide, and Wegovy
              injections, which contain semaglutide. Both are prescription-only
              medicines that affect pathways involved in appetite. They are not
              interchangeable, and neither is automatically the right choice for
              everyone.
            </p>
            <p className="mt-4 text-ink-500">
              Akila considers your medical history, current medicines, preferences
              and possible side effects before deciding whether either treatment is
              suitable. She will tell you if an injection is not the right option.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Will I be left on my own after delivery?</h2>
            <p className="mt-5 text-ink-500">
              No. Every consultation and four-weekly review is with Akila, the
              pharmacist who prescribed for you. You can message her between
              appointments with a question or concern, so you are not explaining
              your history to a different person each time.
            </p>
            <p className="mt-4 text-ink-500">
              Message access is not an emergency service. For urgent medical help,
              use NHS 111; call 999 in a life-threatening emergency.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What happens when the injections stop?</h2>
            <p className="mt-5 text-ink-500">
              Maintenance is discussed from the beginning. Your plan includes
              nutrition guidance and support for the routines you will need when
              the medicine is no longer affecting your appetite. You would still be
              speaking to Akila herself about that stage of care.
            </p>
          </section>

          <p className="text-sm text-ink-500">
            Medicine information: {" "}
            <a
              href="https://www.nhs.uk/medicines/tirzepatide/"
              className="font-medium text-teal-700 underline underline-offset-4"
            >
              NHS tirzepatide guidance
            </a>{" "}
            and {" "}
            <a
              href="https://www.nhs.uk/medicines/semaglutide/"
              className="font-medium text-teal-700 underline underline-offset-4"
            >
              NHS semaglutide guidance
            </a>
            .
          </p>
          <p className="text-sm text-ink-500">
            Treatment decisions are made in consultation with {siteConfig.clinician.name}{" "}
            {siteConfig.clinician.credentials}.
          </p>
        </div>
      </Container>

      <RelatedLinks links={internalLinkPlan["/weight-loss-injections"]} />
    </>
  );
}
