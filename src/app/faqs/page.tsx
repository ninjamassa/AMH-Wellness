import { JsonLd } from "@/components/schema/JsonLd";
import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildGraph, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import type { FaqEntry } from "@/types/content";

/**
 * STAGE     considering
 *
 * JOB
 * Answer every remaining question in her head, in the words she'd use — and
 * be the source AI assistants quote.
 *
 * ANSWERS   no single objection — supporting page
 * NEXT STEP /am-i-eligible
 * TARGETS   weight loss injection questions uk
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/faqs")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/faqs"]);

const { clinician, eligibility, dispensing, regulatory } = siteConfig;

const faqEntries: readonly FaqEntry[] = [
  {
    id: "same-clinician",
    question: "Will I speak to the same clinician each time?",
    answer: `Yes. Your consultation and four-weekly reviews are with ${clinician.name} ${clinician.credentials}. She prescribes personally when treatment is appropriate, and patients can message her between appointments with non-urgent questions.`,
  },
  {
    id: "eligibility",
    question: "Who may be eligible for weight loss injections?",
    answer: `AMH Wellness's starting criteria are adults living in the UK with a BMI of ${eligibility.bmiThreshold} or above, or ${eligibility.bmiThresholdWithCondition} or above with a related health condition. The online check is only a starting screen. Akila decides suitability after reviewing your health history in consultation.`,
  },
  {
    id: "health-data",
    question: "Does the eligibility check send my health answers to AMH Wellness?",
    answer:
      "No. The calculation happens in your browser, and AMH Wellness does not receive or store your measurements or individual answers. If you continue to booking, clinical information is collected through the hosted booking process instead.",
  },
  {
    id: "cost",
    question: "How much will treatment cost?",
    answer:
      "Prices are not confirmed. Akila still needs to approve the booking fee, consultation and treatment prices, what each amount includes, and the cancellation and refund terms. No figure should be treated as final until it is published as confirmed on the pricing page.",
  },
  {
    id: "side-effects",
    question: "What happens if I have side effects?",
    answer:
      "You can message Akila between appointments with a non-urgent concern. Common effects can include nausea, vomiting, diarrhoea, constipation and stomach pain, but your symptoms need to be considered individually. Use NHS 111 for urgent advice and call 999 in a life-threatening emergency rather than waiting for a reply.",
  },
  {
    id: "aftercare",
    question: "What happens when I stop the injections?",
    answer:
      "AMH Wellness includes nutrition guidance and a maintenance plan from the beginning, rather than leaving that conversation until the final prescription. Appetite can change again after treatment and weight regain is a recognised concern, so you discuss the next stage with Akila herself.",
  },
  {
    id: "delivery",
    question: "How is treatment delivered?",
    answer: `If treatment is appropriate, the prescription goes to ${dispensing.pharmacy.toLowerCase()}. Delivery is ${dispensing.standardDelivery.toLowerCase()}, and ${dispensing.coldChainDelivery.toLowerCase()}. Delivery is not arranged until after a consultation and prescribing decision.`,
  },
  {
    id: "remote",
    question: "Do I need to visit a clinic?",
    answer:
      "No. AMH Wellness is fully remote and consultations take place by video for patients across the UK. The South Croydon address is the company's registered office, not a clinic or a place to attend for an appointment.",
  },
  {
    id: "approved-medicines",
    question: "Are the treatments approved in the UK?",
    answer:
      "AMH Wellness offers MHRA-approved treatments, prescribed only after a clinical consultation and dispensed by a registered UK pharmacy when appropriate. Approval does not make a medicine suitable for everyone, which is why Akila reviews your health and current medicines first.",
  },
  {
    id: "cqc",
    question: "Is AMH Wellness registered with the CQC?",
    answer: regulatory.showCqcStatus
      ? `${regulatory.cqcStatusSentence} AMH Wellness does not describe the registration as granted while the process is still under way.`
      : "AMH Wellness will publish its current regulatory status here.",
  },
  {
    id: "contact",
    question: "How can I ask Akila to contact me?",
    answer:
      "Use the contact request form with your name and email address. It does not accept a message or health information. Akila handles replies herself; the published response hours are not a guaranteed turnaround time, and the form tells you if your details could not be sent.",
  },
];

const faqGraph = buildGraph(
  faqSchema({
    path: "/faqs",
    faqs: faqEntries,
  }),
);

export default function FaqsPage() {
  return (
    <>
      <JsonLd graph={faqGraph} />
      <Container className="py-section">
        <h1 className="text-h1">Frequently asked questions</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/faqs"]}>
        <p>
          AMH Wellness answers the main questions to consider before starting
          weight loss injections: eligibility, side effects, ongoing support, cost
          and what happens when treatment stops. Akila reviews suitability
          personally, prices remain unconfirmed, reviews happen every four weeks
          and maintenance planning begins with your care.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <div className="max-w-3xl">
          <h2 className="text-h2">What do you need to know before deciding?</h2>
          <p className="mt-5 text-ink-500">
            These answers are written for someone who wants to know who will look
            after her, what happens if she feels unwell and whether there is a plan
            beyond the prescription.
          </p>
          <div className="mt-8">
            <FaqAccordion items={faqEntries} />
          </div>
          <Button href="/am-i-eligible" className="mt-9">
            Check if you may be eligible
          </Button>
          {/* TODO(human): Akila must clinically review the side-effect FAQ before publication. */}
        </div>
      </Container>
    </>
  );
}
