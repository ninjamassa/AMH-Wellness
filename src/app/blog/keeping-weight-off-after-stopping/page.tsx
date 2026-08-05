import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { JsonLd } from "@/components/schema/JsonLd";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { internalLinkPlan } from "@/lib/internal-links";
import { pageSeo } from "@/lib/page-seo";
import { breadcrumbSchema, buildGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { ArticleReadTracker } from "@/components/integrations/ArticleReadTracker";

/**
 * ★ FLAGSHIP PAGE — this one carries the business case.
 *
 * STAGE     considering
 *
 * JOB
 * The flagship article. Feeds /support-after-injections and owns the
 * aftercare cluster — ~3,900 searches a month, barely served.
 *
 * ANSWERS   maintenance
 * NEXT STEP /support-after-injections
 * TARGETS   coming off mounjaro, how to keep weight off after stopping mounjaro, what happens when you stop mounjaro
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/blog/keeping-weight-off-after-stopping")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

const path = "/blog/keeping-weight-off-after-stopping";

export const metadata = buildMetadata(pageSeo[path]);

const breadcrumbGraph = buildGraph(
  breadcrumbSchema({
    path,
    trail: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Keeping weight off after stopping", path },
    ],
  }),
);

export default function KeepingWeightOffPage() {
  return (
    <>
      <JsonLd graph={breadcrumbGraph} />
      <ArticleReadTracker slug="keeping-weight-off-after-stopping" />
      <Container className="py-section">
        <h1 className="text-h1">Keeping weight off after stopping</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions[path]}>
        {/* TODO(content-agent): 40–60 words. Answer outright in the first
            sentence, name AMH Wellness, make it stand alone. */}
        <p>Content in progress.</p>
      </AnswerFirst>

      <Container className="py-section">
        {/* TODO(human): After Akila approves and clinically reviews the final
            article, confirm its published, modified and reviewed dates. Then
            add the visible review line and MedicalWebPage node. */}
        {/* TODO(content-agent): page body per the brief above. */}
      </Container>

      <RelatedLinks links={internalLinkPlan[path]} />
    </>
  );
}
