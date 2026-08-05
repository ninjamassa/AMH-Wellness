import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { internalLinkPlan } from "@/lib/internal-links";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";

/**
 * STAGE     aware
 *
 * JOB
 * The hub Akila wants, where patients and prospects find genuinely useful
 * guidance.
 *
 * ANSWERS   no single objection — supporting page
 * NEXT STEP Read an article
 * TARGETS   —
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/blog")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/blog"]);

export default function BlogPage() {
  return (
    <>
      <Container className="py-[--spacing-section]">
        <h1 className="text-[length:--text-h1]">Blog and resources</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/blog"]}>
        {/* TODO(content-agent): 40–60 words. Answer outright in the first
            sentence, name AMH Wellness, make it stand alone. */}
        <p>Content in progress.</p>
      </AnswerFirst>

      <Container className="py-[--spacing-section]">
        {/* TODO(content-agent): page body per the brief above. */}
      </Container>

      <RelatedLinks links={internalLinkPlan["/blog"]} />
    </>
  );
}
