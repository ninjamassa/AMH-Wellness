import { JsonLd } from "@/components/schema/JsonLd";
import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { JourneySteps } from "@/components/sections/JourneySteps";
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
      <Container className="py-[--spacing-section]">
        <h1 className="text-[length:--text-h1]">How it works</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/how-it-works"]}>
        {/* TODO(content-agent): 40–60 words. Answer outright in the first
            sentence, name AMH Wellness, make it stand alone. */}
        <p>Content in progress.</p>
      </AnswerFirst>

      <JourneySteps />

      <Container className="pb-[--spacing-section]">
        {/* TODO(content-agent): supporting page body per the brief above. */}
      </Container>
    </>
  );
}
