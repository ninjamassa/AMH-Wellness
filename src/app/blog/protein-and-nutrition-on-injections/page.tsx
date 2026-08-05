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
 * STAGE     supported
 *
 * JOB
 * Showcase Akila's nutrition expertise — a topic she raised herself, and the
 * thing that makes her more than a prescriber.
 *
 * ANSWERS   maintenance
 * NEXT STEP /support-after-injections
 * TARGETS   protein on mounjaro, what to eat on weight loss injections, vitamins on mounjaro
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/blog/protein-and-nutrition-on-injections")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

const path = "/blog/protein-and-nutrition-on-injections";

export const metadata = buildMetadata(pageSeo[path]);

const breadcrumbGraph = buildGraph(
  breadcrumbSchema({
    path,
    trail: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Protein and nutrition on injections", path },
    ],
  }),
);

export default function NutritionPage() {
  return (
    <>
      <JsonLd graph={breadcrumbGraph} />
      <ArticleReadTracker slug="protein-and-nutrition-on-injections" />
      <Container className="py-section">
        <h1 className="text-h1">Protein and nutrition on injections</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions[path]}>
        <p>
          At AMH Wellness, there is no single protein target for everyone taking
          weight loss injections. Akila considers your health, age, activity, usual
          diet and any kidney problems before agreeing a personalised approach.
          Protein-rich foods, balanced meals and suitable strength activity can
          support nutrition and lean tissue while weight changes.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        {/* TODO(human): After Akila approves and clinically reviews the final
            article, confirm its published, modified and reviewed dates. Then
            add the visible review line and MedicalWebPage node. */}
        <article className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-h2">Why does protein matter during treatment?</h2>
            <p className="mt-5 text-ink-500">
              When appetite is lower, the total amount you eat may fall. That can
              make it harder to fit a balanced range of foods into the day. Protein
              is one part of that balance and contributes to maintaining body tissues,
              but it does not replace vegetables, fruit, fibre, carbohydrates, fats
              or enough fluid.
            </p>
          </section>

          <section>
            <h2 className="text-h2">How much protein should I eat?</h2>
            <p className="mt-5 text-ink-500">
              There is no responsible number this page can give to everyone. Your
              needs depend on factors including your health, age, body size, activity,
              usual diet and kidney function. Akila can help you agree an approach
              that fits your wider plan rather than chasing a generic target from
              social media.
            </p>
            {/* TODO(human): Akila must approve any future numeric protein target and the clinical criteria used to personalise it. */}
          </section>

          <section>
            <h2 className="text-h2">What can I eat when my appetite is low?</h2>
            <p className="mt-5 text-ink-500">
              Smaller meals may feel more manageable. Depending on what you eat,
              protein-rich options can include eggs, yoghurt, fish, meat, tofu,
              beans and lentils. Choose foods you tolerate and can repeat in ordinary
              life. If eating or drinking is persistently difficult, tell the
              prescribing clinician rather than trying to solve it with a food list.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Will protein stop me losing muscle?</h2>
            <p className="mt-5 text-ink-500">
              Weight loss can include some lean tissue as well as fat. Studies of
              semaglutide and tirzepatide found larger reductions in fat mass than
              lean mass, but they did not prove that protein alone prevents lean-tissue
              loss. Balanced nutrition and suitable strength activity both deserve
              attention in a personalised plan.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Do I need vitamins or supplements?</h2>
            <p className="mt-5 text-ink-500">
              Not automatically. Eating less can make nutritional adequacy harder for
              some people, but a universal supplement routine may be unnecessary or
              unsuitable. AMH Wellness includes supplement advice where appropriate,
              after considering your diet, health and current medicines.
            </p>
          </section>

          <section>
            <h2 className="text-h2">How does this help after injections stop?</h2>
            <p className="mt-5 text-ink-500">
              The aim is to build meals you can continue when appetite feels
              different, not to create a temporary injection diet. Akila discusses
              nutrition and maintenance during treatment so the plan for afterwards
              is not left until the final prescription.
            </p>
          </section>

          <div className="text-sm text-ink-500">
            <p>Sources:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <a
                  href="https://www.nice.org.uk/guidance/ng246/chapter/Physical-activity-and-diet"
                  className="font-medium text-teal-700 underline underline-offset-4"
                >
                  NICE individualised diet and activity guidance
                </a>
              </li>
              <li>
                <a
                  href="https://www.guysandstthomas.nhs.uk/health-information/dietary-advice-people-taking-weight-loss-medicines/food-and-nutrition"
                  className="font-medium text-teal-700 underline underline-offset-4"
                >
                  Guy&apos;s and St Thomas&apos; NHS nutrition guidance
                </a>
              </li>
              <li>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8089287/"
                  className="font-medium text-teal-700 underline underline-offset-4"
                >
                  STEP 1 semaglutide body-composition analysis
                </a>
              </li>
              <li>
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/39996356/"
                  className="font-medium text-teal-700 underline underline-offset-4"
                >
                  SURMOUNT-1 tirzepatide body-composition substudy
                </a>
              </li>
            </ul>
          </div>
          {/* TODO(human): Akila must clinically review the nutrition, kidney, supplement and activity wording before publication. */}
        </article>
      </Container>

      <RelatedLinks links={internalLinkPlan[path]} />
    </>
  );
}
