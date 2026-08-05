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
        <p>
          At AMH Wellness, keeping weight off after stopping Mounjaro starts before
          the final dose: expect appetite to change, agree a maintenance plan and
          keep food and activity routines visible. Weight regain is common in
          withdrawal studies, but experiences differ. It is a documented treatment
          challenge, not proof that you failed.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        {/* TODO(human): After Akila approves and clinically reviews the final
            article, confirm its published, modified and reviewed dates. Then
            add the visible review line and MedicalWebPage node. */}
        <article className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-h2">Why can weight return after Mounjaro stops?</h2>
            <p className="mt-5 text-ink-500">
              Mounjaro affects pathways involved in appetite while you take it. When
              treatment stops, that appetite-regulating effect does not continue.
              Hunger may become more noticeable and the portions that felt enough
              during treatment may feel different.
            </p>
            <p className="mt-4 text-ink-500">
              Randomised withdrawal trials have found weight regain on average after
              both tirzepatide and semaglutide were stopped. They do not show that
              every person regains the same amount, or that all progress disappears.
              They do show why a plan for stopping deserves as much attention as a
              plan for starting.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What should I decide before treatment ends?</h2>
            <p className="mt-5 text-ink-500">
              Do not change or stop a prescribed medicine without speaking to the
              prescriber responsible for your care. The conversation should cover
              why treatment may stop, what changes you might notice, what you will
              monitor, where food and activity support will come from and when the
              plan needs reviewing.
            </p>
            <p className="mt-4 text-ink-500">
              AMH Wellness starts maintenance planning during treatment with Akila
              herself. The exact duration and cadence of post-treatment support still
              need Akila&apos;s confirmation before the service makes a public promise.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What can I do about food when hunger changes?</h2>
            <p className="mt-5 text-ink-500">
              A repeatable meal pattern is more useful than a perfect short-term
              diet. Plan meals you can prepare on ordinary days, include a source of
              protein, and keep nourishing foods available before hunger is strong.
              Your health, preferences and any dietary restrictions should shape the
              plan.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Why do nutrition and strength still matter?</h2>
            <p className="mt-5 text-ink-500">
              Weight loss can include some lean tissue as well as fat. Body-composition
              studies do not prove that one nutrient caused that change, so this is
              not a case for a universal protein number. It is a reason to discuss
              balanced nutrition and suitable strength activity as part of your own
              plan.
            </p>
          </section>

          <section>
            <h2 className="text-h2">How will I know whether the plan needs changing?</h2>
            <p className="mt-5 text-ink-500">
              NICE recommends regular feedback and monitoring for at least a year
              after weight-management medicines or behavioural treatment end. That
              can help you notice changes early and decide what support is needed.
              It is a standard for good follow-up, not a statement that AMH Wellness
              has confirmed a one-year package.
            </p>
          </section>

          <section>
            <h2 className="text-h2">Does regain mean I have failed?</h2>
            <p className="mt-5 text-ink-500">
              No. Appetite changing after a medicine stops is not a moral verdict,
              and a change on the scales does not erase what you learnt. Treat it as
              information: something in the plan or the level of support may need to
              change.
            </p>
          </section>

          <div className="text-sm text-ink-500">
            <p>Sources:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9542252/"
                  className="font-medium text-teal-700 underline underline-offset-4"
                >
                  STEP 1 extension on semaglutide withdrawal
                </a>
              </li>
              <li>
                <a
                  href="https://jamanetwork.com/journals/jama/fullarticle/2812936"
                  className="font-medium text-teal-700 underline underline-offset-4"
                >
                  SURMOUNT-4 randomised tirzepatide withdrawal trial
                </a>
              </li>
              <li>
                <a
                  href="https://www.nice.org.uk/guidance/qs212/chapter/Quality-statement-7-Advice-and-support-after-stopping-medicines-for-weight-management-or-completing-behavioural-interventions"
                  className="font-medium text-teal-700 underline underline-offset-4"
                >
                  NICE advice and support after treatment
                </a>
              </li>
            </ul>
          </div>
          {/* TODO(human): Akila must clinically review the stopping, monitoring, nutrition and activity guidance before publication. */}
          {/* TODO(human): Akila must confirm the aftercare duration, cadence, access and price before AMH Wellness promises a post-treatment package. */}
        </article>
      </Container>

      <RelatedLinks links={internalLinkPlan[path]} />
    </>
  );
}
