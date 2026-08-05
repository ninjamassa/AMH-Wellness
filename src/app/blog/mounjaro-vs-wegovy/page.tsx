import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { ComparisonTable, type ComparisonRow } from "@/components/sections/ComparisonTable";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { JsonLd } from "@/components/schema/JsonLd";
import { Button } from "@/components/ui/Button";
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

const comparisonRows: readonly ComparisonRow[] = [
  {
    id: "ingredient",
    feature: "Active ingredient",
    first: "Tirzepatide",
    second: "Semaglutide",
  },
  {
    id: "pathways",
    feature: "Appetite pathways",
    first: "Acts on GIP and GLP-1 pathways",
    second: "Acts on the GLP-1 pathway",
  },
  {
    id: "form",
    feature: "Confirmed AMH Wellness option",
    first: "Prescription-only weekly injection",
    second: "Prescription-only weekly injection",
  },
  {
    id: "common-effects",
    feature: "Common side effects",
    first: "Can include nausea, vomiting, diarrhoea, constipation and stomach pain",
    second: "Can include nausea, vomiting, diarrhoea, constipation and stomach pain",
  },
  {
    id: "decision",
    feature: "How the choice is made",
    first: "After Akila reviews your health, medicines, preferences and possible side effects",
    second: "After Akila reviews your health, medicines, preferences and possible side effects",
  },
];

export default function MounjaroVsWegovyPage() {
  return (
    <>
      <JsonLd graph={breadcrumbGraph} />
      <ArticleReadTracker slug="mounjaro-vs-wegovy" />
      <Container className="py-section">
        <h1 className="text-h1">Mounjaro vs Wegovy</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions[path]}>
        <p>
          At AMH Wellness, neither Mounjaro nor Wegovy is automatically the right
          choice for everyone. Mounjaro contains tirzepatide and acts on GIP and
          GLP-1 pathways; Wegovy contains semaglutide and acts on GLP-1. Akila
          decides suitability with you after reviewing your health, medicines,
          preferences and possible side effects.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        {/* TODO(human): After Akila approves and clinically reviews the final
            article, confirm its published, modified and reviewed dates. Then
            add the visible review line and MedicalWebPage node. */}
        <div className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-h2">What is the main difference?</h2>
            <p className="mt-5 text-ink-500">
              Both medicines affect appetite and can help you feel fuller, but they
              contain different active ingredients and act on different pathways.
              They are prescription medicines used alongside changes to food and
              activity. The table describes the differences without claiming that
              one is best for every patient.
            </p>
            <div className="mt-8">
              <ComparisonTable
                caption="Mounjaro and Wegovy comparison"
                firstColumn="Mounjaro"
                secondColumn="Wegovy"
                rows={comparisonRows}
              />
            </div>
          </section>

          <section>
            <h2 className="text-h2">Which one works better?</h2>
            <p className="mt-5 text-ink-500">
              Trial averages cannot tell you which medicine is appropriate for your
              body, health or circumstances. The useful question is which option has
              an acceptable balance of suitability, possible benefit, side effects
              and practical fit for you. That decision belongs in a consultation,
              not in a headline comparison.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Do they have the same side effects?</h2>
            <p className="mt-5 text-ink-500">
              Their patient leaflets list many of the same common stomach-related
              effects, including nausea, vomiting, diarrhoea, constipation and
              stomach pain. This does not mean you will react to both medicines in
              the same way. Akila reviews your history and how you respond rather
              than treating a list as a prediction.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Who helps me decide?</h2>
            <p className="mt-5 text-ink-500">
              You speak to Akila Dungarwalla MPharmS, the independent prescribing
              pharmacist who would continue to review you every four weeks. She will
              tell you if neither option is suitable, and side-effect questions go
              back to her rather than a different clinician each time.
            </p>
          </section>

          <p className="text-sm text-ink-500">
            Sources: {" "}
            <a
              href="https://www.gov.uk/government/publications/glp-1-medicines-for-weight-loss-and-diabetes-what-you-need-to-know/glp-1-medicines-for-weight-loss-and-diabetes-what-you-need-to-know"
              className="font-medium text-teal-700 underline underline-offset-4"
            >
              MHRA patient guidance
            </a>
            , {" "}
            <a
              href="https://www.medicines.org.uk/emc/product/15482/pil"
              className="font-medium text-teal-700 underline underline-offset-4"
            >
              Mounjaro patient leaflet
            </a>{" "}
            and {" "}
            <a
              href="https://www.medicines.org.uk/emc/product/13799/pil"
              className="font-medium text-teal-700 underline underline-offset-4"
            >
              Wegovy injection patient leaflet
            </a>
            .
          </p>
          {/* TODO(human): Akila must clinically review this comparison and confirm oral Wegovy supply before any tablet option is added. */}
          <Button href="/am-i-eligible">Check if you may be eligible</Button>
        </div>
      </Container>

      <RelatedLinks links={internalLinkPlan[path]} />
    </>
  );
}
