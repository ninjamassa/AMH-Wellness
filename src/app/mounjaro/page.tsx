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
 * Capture the largest search term in the category and convert it into an
 * enquiry about a supported service.
 *
 * ANSWERS   side-effects
 * NEXT STEP /am-i-eligible
 * TARGETS   mounjaro, mounjaro uk, mounjaro reviews uk
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/mounjaro")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/mounjaro"]);

const serviceGraph = buildGraph(
  serviceSchema({
    name: "Mounjaro treatment",
    description: pageSeo["/mounjaro"].description,
    path: "/mounjaro",
  }),
);

export default function MounjaroPage() {
  return (
    <>
      <JsonLd graph={serviceGraph} />
      <Container className="py-section">
        <h1 className="text-h1">Mounjaro treatment with one-to-one support</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/mounjaro"]}>
        <p>
          Mounjaro treatment at AMH Wellness starts with a one-to-one video
          consultation with Akila Dungarwalla MPharmS, who decides whether
          tirzepatide is suitable and prescribes personally. If appropriate, a
          registered UK pharmacy dispenses it; Akila then reviews you every four
          weeks and answers non-urgent questions between appointments.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <div className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-h2">What is Mounjaro, and how does it work?</h2>
            <p className="mt-5 text-ink-500">
              Mounjaro contains tirzepatide. It is a prescription-only injection
              taken once a week. Tirzepatide acts on GIP and GLP-1 pathways involved
              in appetite, helping you feel fuller and less hungry. It is used
              alongside changes to food and activity, not instead of them.
            </p>
            <p className="mt-4 text-ink-500">
              Whether it is suitable depends on more than BMI. Akila reviews your
              health history, current medicines and what you need from treatment
              before any prescription is considered.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What side effects might I notice?</h2>
            <p className="mt-5 text-ink-500">
              Common effects include nausea, diarrhoea, constipation, vomiting and
              stomach pain, although not everyone gets them. Vomiting and diarrhoea
              can lead to dehydration. Side effects should not be dismissed as
              something you simply have to put up with.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What if I feel unwell and need an answer?</h2>
            <p className="mt-5 text-ink-500">
              You can message Akila between appointments. Because she prescribed
              for you and reviews you herself, your question goes back to someone
              who knows your history and can decide whether your plan needs to
              change. Messages are answered during AMH Wellness&apos;s stated response
              hours.
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
            <h2 className="text-h2">Will we talk about coming off Mounjaro?</h2>
            <p className="mt-5 text-ink-500">
              Yes. A maintenance plan and nutrition guidance are included from the
              start, because appetite and eating patterns can change again when
              treatment ends. Akila does not wait until your final prescription to
              ask how you will manage afterwards.
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
            and the {" "}
            <a
              href="https://www.medicines.org.uk/emc/product/15482/pil"
              className="font-medium text-teal-700 underline underline-offset-4"
            >
              Mounjaro patient leaflet
            </a>
            .
          </p>
          {/* TODO(human): Akila must clinically review the side-effect and escalation wording before publication. */}
        </div>
      </Container>

      <RelatedLinks links={internalLinkPlan["/mounjaro"]} />
    </>
  );
}
