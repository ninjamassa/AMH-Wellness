import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Cta } from "@/components/sections/Cta";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

/**
 * ★ THE FLAGSHIP PAGE. Marked ★ in the Social Script proposal, and it is the
 * whole business case.
 *
 * STAGE     considering
 *
 * JOB
 * Own the one question nobody else answers: what happens when you stop.
 *
 * ANSWERS   maintenance — "What happens when I stop? Am I just going to put
 *           it all back on?"
 * NEXT STEP /am-i-eligible
 * TARGETS   coming off mounjaro (1,900/mo) · how to keep weight off after
 *           stopping mounjaro (1,300/mo) · what happens when you stop
 *           mounjaro (720/mo) · support after weight loss injections
 *
 * WHY THIS PAGE MATTERS
 * Akila's own words on what makes her different: "1-2-1 coaching with
 * nutrition guidance after coming off the weight loss injections." Voy has a
 * strong content engine and ignores aftercare entirely. SheMed ranks for
 * almost nothing beyond its own name. Juniper is brand demand with a thin
 * content footprint. ~9,000 searches a month sit in this cluster with nobody
 * serving them properly.
 *
 * TONE: this reader is frightened of failing again, and has probably already
 * failed once on someone else's watch. Do not sell to her. Tell her the truth
 * about why weight comes back, then show her the plan. The honesty is the
 * conversion mechanism.
 */

export const metadata = buildMetadata(pageSeo["/support-after-injections"]);

const whatItIncludes = [
  {
    title: "A plan before treatment ends",
    body: "Maintenance is discussed from your first consultation, rather than left until the final prescription. You and Akila can plan for the changes that may follow when treatment stops.",
  },
  {
    title: "Nutrition guidance you can keep using",
    body: "You receive help with meal planning, protein and everyday food choices. The aim is to build a way of eating that does not depend on the medicine reducing your appetite.",
  },
  {
    title: "A plan for changes in hunger and routine",
    body: "Hunger, portions and routines may feel different after treatment. Before prescriptions end, you and Akila can decide what to monitor and how the maintenance plan should respond.",
  },
  {
    title: "Support from the clinician who knows you",
    body: "Your maintenance planning is with Akila Dungarwalla MPharmS, the same prescribing pharmacist who has reviewed you during treatment. You do not have to explain everything again to a new person.",
  },
];

export default function SupportAfterInjectionsPage() {
  const { clinician } = siteConfig;

  return (
    <>
      <Container className="pt-section">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
            Maintenance starts before treatment ends
          </p>
          <h1 className="mt-4 text-display">
            Support after injections
          </h1>
        </div>
      </Container>

      <div className="mt-8">
        <AnswerFirst question={answerBlockQuestions["/support-after-injections"]}>
          At AMH Wellness, stopping Mounjaro means planning for how appetite may
          change again and recognising that weight regain can happen; it is a
          documented response after treatment, not proof that you have failed.
          Planning starts at your first consultation, with nutrition guidance and a
          maintenance plan developed one-to-one with {clinician.name}{" "}
          {clinician.credentials}.
        </AnswerFirst>
      </div>

      <Container className="py-section">
        <div className="max-w-3xl">
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-ink-500">
            If stopping Mounjaro or Wegovy feels like losing the structure you had
            during treatment, that concern is reasonable. AMH Wellness discusses
            maintenance as part of your care instead of waiting until the final
            prescription.
          </p>
          <h2 className="text-h2">
            Why can weight return when treatment stops?
          </h2>
          <div className="mt-5 max-w-reading space-y-5 text-ink-500">
            <p>
              Mounjaro and Wegovy affect appetite and how full you feel while you
              are taking them. When the medicine is stopped, that effect does not
              continue. Hunger can become more noticeable again, and portions that
              felt comfortable during treatment may no longer feel enough.
            </p>
            <p>
              Weight regain after stopping has been seen in clinical trials of
              both semaglutide and tirzepatide. It does not mean that everyone
              regains the same amount, or that your work was wasted. It means the
              change is common enough to plan for. NICE says people should receive
              advice and regular support for at least a year after weight-management
              treatment ends.
            </p>
            <p>
              Weight loss can include some loss of lean tissue as well as fat.
              Protecting your strength and nutrition therefore matters while your
              weight is changing. Food choices, protein and suitable activity should
              be considered as part of a plan made for you, rather than reduced to
              one target that everyone is expected to follow.
            </p>
            <p>
              There can also be a practical gap. When appetite changes again, meals
              and routines that worked during treatment may no longer fit in the same
              way. Planning for that change is part of support; needing to
              revise the plan is not a lack of willpower.
            </p>
            <p className="text-sm">
              Sources: {" "}
              <a
                href="https://www.nice.org.uk/guidance/qs212/chapter/Quality-statement-7-Advice-and-support-after-stopping-medicines-for-weight-management-or-completing-behavioural-interventions"
                className="font-medium text-teal-700 underline underline-offset-4"
              >
                NICE guidance on support after treatment
              </a>{" "}
              and {" "}
              <a
                href="https://www.bmj.com/content/390/bmj.r1646"
                className="font-medium text-teal-700 underline underline-offset-4"
              >
                BMJ coverage of the recommendation
              </a>
              .
            </p>
            {/* TODO(human): Akila must clinically review this explanation before publication. */}
            {/* TODO(human): Akila must confirm AMH Wellness's aftercare duration, review cadence, access after prescriptions end and whether it has a separate price. */}
          </div>
        </div>
      </Container>

      <Container className="pb-section">
        <h2 className="text-h2">What does maintenance planning involve?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {whatItIncludes.map((item) => (
            <div
              key={item.title}
              className="rounded-card border border-sand-200 bg-white p-7 shadow-card"
            >
              <h3 className="text-h3">{item.title}</h3>
              <p className="mt-3 text-ink-500">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="pb-section">
        <Cta
          heading="Would you like a plan for treatment and what comes after?"
          primary={{ href: "/am-i-eligible", label: "Check if you may be eligible" }}
        >
          <p>
            The eligibility check is a private first step. If treatment may be
            suitable, the next conversation is with Akila herself, including what
            you have tried before and what support you need for the longer term.
          </p>
        </Cta>
      </Container>
    </>
  );
}
