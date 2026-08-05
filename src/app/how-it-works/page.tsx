import { JsonLd } from "@/components/schema/JsonLd";
import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { JourneySteps } from "@/components/sections/JourneySteps";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildGraph, howToSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

/**
 * STAGE     considering
 *
 * JOB
 * Remove every unknown from the process, so booking feels like a small step
 * rather than a leap.
 *
 * ANSWERS   cost
 * NEXT STEP /am-i-eligible
 * TARGETS   how do weight loss injections work uk, online weight loss consultation
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/how-it-works")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/how-it-works"]);

const howToGraph = buildGraph(
  howToSchema({
    name: "How treatment works at AMH Wellness",
    description: pageSeo["/how-it-works"].description,
    path: "/how-it-works",
    steps: siteConfig.journey,
  }),
);

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd graph={howToGraph} />
      <Container className="py-section">
        <h1 className="text-h1">How it works</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/how-it-works"]}>
        <p>
          Online weight loss treatment at AMH Wellness follows five steps:
          booking, a health questionnaire, a one-to-one video consultation with
          Akila, pharmacy dispensing and delivery if treatment is appropriate, then
          reviews every four weeks. You can message the same prescribing pharmacist
          between appointments instead of starting again with someone new.
        </p>
      </AnswerFirst>

      <JourneySteps />

      <Container className="pb-section">
        <div className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-h2">How much do I pay before we speak?</h2>
            <p className="mt-5 text-ink-500">
              The booking process includes a booking fee to secure your appointment,
              but its amount has not yet been confirmed by Akila. Treatment and
              medicine prices are also awaiting confirmation. Until Akila confirms
              the figures and what each one includes, the pricing page marks them as
              awaiting confirmation.
            </p>
            {/* TODO(human): Akila must confirm the booking fee, consultation price, treatment prices and exactly what each amount includes. */}
          </section>

          <section>
            <h2 className="text-h2">Who will I see at each appointment?</h2>
            <p className="mt-5 text-ink-500">
              You see Akila Dungarwalla MPharmS. She conducts the consultation,
              prescribes personally if treatment is suitable and carries out your
              reviews every four weeks. You are not passed between clinicians after
              the first appointment.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Where does the consultation happen?</h2>
            <p className="mt-5 text-ink-500">
              Consultations are video calls and the service is available to patients
              across the UK. The South Croydon address shown in the legal information
              is AMH Wellness&apos;s registered office, not a clinic or a place to attend
              for an appointment.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What if I have a concern between reviews?</h2>
            <p className="mt-5 text-ink-500">
              Patients can message Akila between appointments. She responds during
              the hours published by AMH Wellness. This is for non-urgent questions;
              use NHS 111 for urgent medical advice and call 999 in a life-threatening
              emergency.
            </p>
          </section>

          <Button href="/am-i-eligible">Check if you may be eligible</Button>
        </div>
      </Container>
    </>
  );
}
