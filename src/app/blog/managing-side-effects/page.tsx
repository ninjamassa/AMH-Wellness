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
 * Answer the single biggest fear, with real practical guidance. ~110k/mo
 * informational demand.
 *
 * ANSWERS   side-effects
 * NEXT STEP /am-i-eligible
 * TARGETS   mounjaro side effects, wegovy side effects, how to manage mounjaro nausea
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/blog/managing-side-effects")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

const path = "/blog/managing-side-effects";

export const metadata = buildMetadata(pageSeo[path]);

const breadcrumbGraph = buildGraph(
  breadcrumbSchema({
    path,
    trail: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Managing side effects", path },
    ],
  }),
);

export default function SideEffectsPage() {
  return (
    <>
      <JsonLd graph={breadcrumbGraph} />
      <ArticleReadTracker slug="managing-side-effects" />
      <Container className="py-section">
        <h1 className="text-h1">Managing side effects</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions[path]}>
        <p>
          At AMH Wellness, non-urgent Mounjaro and Wegovy side effects are managed
          by telling Akila early, keeping food and fluids tolerable, and reviewing
          whether your plan needs to change. Severe persistent abdominal pain,
          breathing difficulty or sudden vision changes need urgent medical help,
          not a message reply.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        {/* TODO(human): After Akila approves and clinically reviews the final
            article, confirm its published, modified and reviewed dates. Then
            add the visible review line and MedicalWebPage node. */}
        <article className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-h2">Which side effects are common?</h2>
            <p className="mt-5 text-ink-500">
              The patient leaflets for tirzepatide and semaglutide list nausea,
              vomiting, diarrhoea, constipation and stomach pain among common
              effects. Not everyone gets them, and the fact that an effect is common
              does not mean it should be ignored if it is severe, persistent or
              getting worse.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What may help with non-urgent nausea?</h2>
            <p className="mt-5 text-ink-500">
              Smaller meals, eating slowly and choosing plain foods may be easier to
              tolerate. Fatty or strong-smelling food can make nausea worse for some
              people. Sip fluids rather than relying on one large drink. There is no
              single meal or fluid target that is safe and suitable for everyone.
            </p>
          </section>

          <section>
            <h2 className="text-h2">What if I am vomiting or have diarrhoea?</h2>
            <p className="mt-5 text-ink-500">
              Both can cause dehydration. Keep taking small, regular sips if you can
              tolerate them and contact the prescribing clinician if symptoms persist
              or worsen. Seek urgent advice through NHS 111 if you cannot keep fluids
              down, feel very unwell or are worried about dehydration.
            </p>
          </section>

          <section>
            <h2 className="text-h2">When should I get urgent medical help?</h2>
            <p className="mt-5 text-ink-500">
              Seek urgent medical help for severe, persistent abdominal pain that may
              spread to your back, with or without nausea or vomiting. This can be a
              sign of acute pancreatitis. Call 999 for swelling of the throat or
              tongue, difficulty breathing or another life-threatening reaction.
            </p>
            <p className="mt-4 text-ink-500">
              If you take semaglutide, sudden loss of vision or rapidly worsening
              eyesight also needs urgent medical attention. Do not wait for Akila&apos;s
              response window when a symptom is urgent.
            </p>
          </section>

          <section>
            <h2 className="text-h2">When should I message Akila?</h2>
            <p className="mt-5 text-ink-500">
              Tell Akila about a non-urgent side effect early, particularly if it is
              making it difficult to eat, drink or follow the agreed plan. She is the
              prescribing pharmacist who reviews you every four weeks, so you do not
              have to start from the beginning with someone who does not know your
              history.
            </p>
          </section>

          <div className="text-sm text-ink-500">
            <p>Sources:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <a
                  href="https://www.guysandstthomas.nhs.uk/health-information/dietary-advice-people-taking-weight-loss-medicines/managing-side-effects-diet"
                  className="font-medium text-teal-700 underline underline-offset-4"
                >
                  Guy&apos;s and St Thomas&apos; NHS side-effect guidance
                </a>
              </li>
              <li>
                <a
                  href="https://www.gov.uk/drug-safety-update/glp-1-receptor-agonists-and-dual-glp-1-slash-gip-receptor-agonists-strengthened-warnings-on-acute-pancreatitis-including-necrotising-and-fatal-cases"
                  className="font-medium text-teal-700 underline underline-offset-4"
                >
                  MHRA strengthened pancreatitis warning
                </a>
              </li>
              <li>
                <a
                  href="https://www.gov.uk/government/publications/glp-1-medicines-for-weight-loss-and-diabetes-what-you-need-to-know/glp-1-medicines-for-weight-loss-and-diabetes-what-you-need-to-know"
                  className="font-medium text-teal-700 underline underline-offset-4"
                >
                  MHRA patient guidance for GLP-1 medicines
                </a>
              </li>
            </ul>
          </div>
          {/* TODO(human): Akila must clinically review the side-effect self-care and urgent escalation wording before publication. */}
        </article>
      </Container>

      <RelatedLinks links={internalLinkPlan[path]} />
    </>
  );
}
