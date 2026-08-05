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
 * STAGE     considering
 *
 * JOB
 * Capture comparison demand — high intent, low competition — and route it to
 * a consultation.
 *
 * ANSWERS   side-effects
 * NEXT STEP /am-i-eligible
 * TARGETS   mounjaro vs wegovy, wegovy or mounjaro which is better
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/blog/mounjaro-vs-wegovy")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

const path = "/blog/mounjaro-vs-wegovy";

export const metadata = buildMetadata(pageSeo[path]);

const breadcrumbGraph = buildGraph(
  breadcrumbSchema({
    path,
    trail: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Mounjaro vs Wegovy", path },
    ],
  }),
);

export default function MounjaroVsWegovyPage() {
  return (
    <>
      <JsonLd graph={breadcrumbGraph} />
      <ArticleReadTracker slug="mounjaro-vs-wegovy" />
      <Container className="py-section">
        <h1 className="text-h1">Mounjaro vs Wegovy</h1>
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
