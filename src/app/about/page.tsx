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
 * The trust page. A named, registered, accountable person with real
 * credentials — the thing no competitor leads with.
 *
 * ANSWERS   ongoing-care
 * NEXT STEP /am-i-eligible
 * TARGETS   akila dungarwalla, independent prescribing pharmacist weight loss
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/about")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/about"]);

export default function AboutPage() {
  const { clinician, regulatory } = siteConfig;

  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">About Akila</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/about"]}>
        <p>
          The prescribing pharmacist behind AMH Wellness is {clinician.name}{" "}
          {clinician.credentials}, an independent prescribing pharmacist registered
          with the GPhC under number {clinician.gphcNumber}. She has SCOPE-accredited
          obesity training with the NMWLP, conducts every video consultation and
          four-weekly review herself, and prescribes personally when treatment is
          appropriate.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <div className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-h2">Who would I actually be speaking to?</h2>
            <p className="mt-5 text-ink-500">
              You would speak to Akila herself. AMH Wellness is run single-handedly,
              so the pharmacist who listens to what happened with your previous
              treatment is the same person who makes prescribing decisions and
              reviews how you are getting on.
            </p>
          </section>

          <section>
            <h2 className="text-h2">How can I check Akila&apos;s credentials?</h2>
            <p className="mt-5 text-ink-500">
              Akila is an independent prescribing pharmacist and her General
              Pharmaceutical Council registration number is {clinician.gphcNumber}.
              You can check the public {" "}
              <a
                href={clinician.gphcRegisterUrl}
                className="font-medium text-teal-700 underline underline-offset-4"
              >
                GPhC register
              </a>
              . Her obesity training is {clinician.accreditation}.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Why did Akila build AMH Wellness?</h2>
            <p className="mt-5 text-ink-500">
              Patients were coming to her after receiving weight loss injections
              elsewhere without enough support. AMH Wellness was built around
              one-to-one contact, nutrition guidance and a plan for after treatment,
              because the relationship around the prescription is what was missing.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Is there an AMH Wellness clinic to visit?</h2>
            <p className="mt-5 text-ink-500">
              No. The service is fully remote and consultations take place by video
              for patients across the UK. The South Croydon address is the company&apos;s
              registered office, not a clinic.
            </p>
          </section>

          {regulatory.showCqcStatus ? (
            <section>
              <h2 className="text-h2">What is the CQC status?</h2>
              <p className="mt-5 text-ink-500">
                {regulatory.cqcStatusSentence}
              </p>
            </section>
          ) : null}

          <Button href="/am-i-eligible">Check if you may be eligible</Button>
          {/* TODO(human): Akila must supply and approve a professional portrait before photography is added to this page. */}
        </div>
      </Container>
    </>
  );
}
