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
 * Same job for Wegovy, covering both the injection and the oral tablets
 * Akila offers.
 *
 * ANSWERS   side-effects
 * NEXT STEP /am-i-eligible
 * TARGETS   wegovy, wegovy uk, wegovy tablets
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/wegovy")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/wegovy"]);

const serviceGraph = buildGraph(
  serviceSchema({
    name: "Wegovy treatment",
    description: pageSeo["/wegovy"].description,
    path: "/wegovy",
  }),
);

export default function WegovyPage() {
  return (
    <>
      <JsonLd graph={serviceGraph} />
      <Container className="py-section">
        <h1 className="text-h1">Wegovy treatment with one-to-one support</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/wegovy"]}>
        <p>
          Wegovy treatment at AMH Wellness starts with a one-to-one video
          consultation with Akila Dungarwalla MPharmS, who decides whether
          semaglutide is suitable and prescribes personally. If appropriate, a
          registered UK pharmacy dispenses it; Akila then reviews you every four
          weeks and answers non-urgent questions between appointments.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <div className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-h2">What is Wegovy, and how does it work?</h2>
            <p className="mt-5 text-ink-500">
              Wegovy contains semaglutide. The injection is a prescription-only
              medicine taken once a week. Semaglutide acts on GLP-1 pathways
              involved in appetite, helping you feel fuller and less hungry. It is
              used alongside changes to food and activity, not instead of them.
            </p>
            <p className="mt-4 text-ink-500">
              Akila reviews your health history, current medicines and what you
              need from treatment before deciding whether Wegovy is suitable. A
              medicine being available does not mean it is right for everyone.
            </p>
            {/* TODO(human): Confirm that Akila's dispensing pharmacy can supply oral Wegovy before presenting tablets as an AMH Wellness treatment option. */}
          </section>

          <section>
            <h2 className="text-h2">What side effects might I notice?</h2>
            <p className="mt-5 text-ink-500">
              Common effects include nausea, diarrhoea, constipation, vomiting and
              stomach pain, although not everyone gets them. Vomiting and diarrhoea
              can lead to dehydration. Side effects should be discussed rather than
              treated as something you have to manage alone.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What if I feel unwell and need an answer?</h2>
            <p className="mt-5 text-ink-500">
              You can message Akila between appointments. It is the same pharmacist
              who prescribed for you and reviews you every four weeks, so your
              question does not go into a general queue without your history.
              Messages are answered during AMH Wellness&apos;s stated response hours.
            </p>
            <dl className="mt-5 max-w-md space-y-2 text-sm text-ink-500">
              {siteConfig.contact.responseHours.map((period) => (
                <div key={period.days} className="flex justify-between gap-5">
                  <dt>{period.days}</dt>
                  <dd className="font-medium text-ink-700">{period.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-ink-500">
              Do not wait for a message reply if symptoms are severe or sudden.
              Use NHS 111 for urgent advice and call 999 in a life-threatening
              emergency.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Will we plan for life after Wegovy?</h2>
            <p className="mt-5 text-ink-500">
              Yes. Your care includes nutrition guidance and a maintenance plan
              from the beginning. The purpose is to prepare for changes in appetite
              and routine before treatment ends, with Akila herself involved in the
              conversation.
            </p>
          </section>

          <p className="text-sm text-ink-500">
            Medicine information: {" "}
            <a
              href="https://www.nhs.uk/medicines/semaglutide/"
              className="font-medium text-teal-700 underline underline-offset-4"
            >
              NHS semaglutide guidance
            </a>{" "}
            and the {" "}
            <a
              href="https://www.medicines.org.uk/emc/product/13799/pil"
              className="font-medium text-teal-700 underline underline-offset-4"
            >
              Wegovy injection patient leaflet
            </a>
            .
          </p>
          {/* TODO(human): Akila must clinically review the side-effect and escalation wording before publication. */}
        </div>
      </Container>

      <RelatedLinks links={internalLinkPlan["/wegovy"]} />
    </>
  );
}
