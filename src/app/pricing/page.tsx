import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { PricingTable } from "@/components/sections/PricingTable";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";
import type { PricingItem } from "@/types/content";

/**
 * STAGE     ready
 *
 * JOB
 * Be straight about money before she has to ask. Fixed prices, clearly
 * what's included.
 *
 * ANSWERS   cost
 * NEXT STEP /am-i-eligible
 * TARGETS   mounjaro cost uk, weight loss injection price uk, wegovy cost uk
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/pricing")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/pricing"]);

const pricingItems: readonly PricingItem[] = [
  {
    id: "consultation",
    name: "Consultation booking fee",
    pricingStatus: "unconfirmed",
    description:
      "The amount is awaiting Akila's confirmation. The fee secures a one-to-one video consultation rather than a form-only review.",
    includes: [
      "A video consultation with Akila",
      "A review of your health history and goals",
      "An honest decision about whether treatment is appropriate",
    ],
  },
  {
    id: "mounjaro",
    name: "Mounjaro treatment",
    pricingStatus: "unconfirmed",
    description:
      "The medicine and support price is awaiting confirmation, including whether dispensing and delivery sit inside the quoted amount.",
    includes: [
      "Reviews every four weeks",
      "Message access between appointments",
      "Nutrition guidance and maintenance planning",
    ],
  },
  {
    id: "wegovy",
    name: "Wegovy treatment",
    pricingStatus: "unconfirmed",
    description:
      "The medicine and support price is awaiting confirmation, including whether dispensing and delivery sit inside the quoted amount.",
    includes: [
      "Reviews every four weeks",
      "Message access between appointments",
      "Nutrition guidance and maintenance planning",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Pricing</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/pricing"]}>
        <p>
          AMH Wellness has not yet confirmed its consultation, booking-fee,
          Mounjaro or Wegovy prices. Until Akila approves the figures, each item is
          marked &ldquo;Price awaiting confirmation&rdquo;. The final page will show exactly
          what you pay, what each price includes and whether medicine, dispensing
          and delivery are included.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-h2">Why are the prices not shown yet?</h2>
          <p className="mt-5 text-ink-500">
            Akila has not yet confirmed the prices or what each one includes. Each
            item is marked as awaiting confirmation so you can see that the
            information is incomplete before deciding whether to continue.
          </p>
        </div>

        <PricingTable items={pricingItems} />

        <div className="mt-12 max-w-3xl">
          <h2 className="text-h2">What still needs to be confirmed?</h2>
          <p className="mt-5 text-ink-500">
            Akila needs to confirm the booking fee, consultation and treatment
            prices; whether medicine, dispensing and delivery are included; how
            aftercare is charged; and the cancellation, refund and subscription
            terms. These details remain unconfirmed and are listed here so you know
            what is still missing.
          </p>
          <Button href="/am-i-eligible" className="mt-7">
            Check if you may be eligible
          </Button>
          {/* TODO(human): Akila must confirm every price, inclusion, cancellation/refund term, subscription arrangement and aftercare charge before this page is approved for launch. */}
        </div>
      </Container>
    </>
  );
}
