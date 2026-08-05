import Link from "next/link";
import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Cta } from "@/components/sections/Cta";
import { Button } from "@/components/ui/Button";
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
    title: "A maintenance plan built from day one",
    body: "We start talking about how you'll come off treatment at your first consultation — not in your last one. You'll know the plan long before you need it.",
  },
  {
    title: "Nutrition coaching that continues",
    body: "Protein targets, meal structure, vitamins and minerals. The habits that hold your progress in place when the appetite suppression stops.",
  },
  {
    title: "A gradual, clinically managed step down",
    body: "Where it's appropriate, we reduce treatment gradually rather than stopping abruptly, and review how you're getting on at each stage.",
  },
  {
    title: "You can still reach me afterwards",
    body: "Coming off treatment isn't the end of the relationship. Questions and worries don't stop just because the prescriptions do.",
  },
];

export default function SupportAfterInjectionsPage() {
  const { clinician } = siteConfig;

  return (
    <>
      <Container className="py-section">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
            The part most services skip
          </p>
          <h1 className="mt-4 text-display">
            Support after injections
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
            The hardest part of weight loss treatment isn&apos;t starting it. It&apos;s
            what happens when it stops — and almost nobody prepares you for that.
            This is the part of the service Akila built AMH Wellness around.
          </p>
          <Button href="/am-i-eligible" className="mt-9">
            Check if you&apos;re eligible
          </Button>
        </div>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/support-after-injections"]}>
        AMH Wellness includes aftercare as part of the programme, not as an extra.
        Your maintenance plan is built from your first consultation, nutrition
        coaching continues after treatment ends, and you keep direct access to{" "}
        {clinician.name}, the same prescribing pharmacist who has looked after you
        throughout.
      </AnswerFirst>

      <Container className="py-section">
        <div className="max-w-3xl">
          <h2 className="text-h2">
            Why weight often comes back — and why it isn&apos;t your fault
          </h2>
          <p className="mt-5 text-ink-500">
            {/* TODO(content-agent): 3–4 paragraphs. Be honest and clinical, not
                reassuring-vague. Cover: appetite returning as the medication
                clears; muscle lost alongside fat if protein intake was too low;
                habits that were never established because the medication was
                doing the work; and the fact that this is a well-documented
                pattern rather than a personal failure. Cite the BMJ coverage of
                patients needing support for a year after stopping. Akila to
                review the clinical content. */}
            TODO(content-agent): the honest explanation. This is the section that
            earns her trust — get it right and the rest of the page barely has to
            sell.
          </p>
        </div>
      </Container>

      <Container className="pb-section">
        <h2 className="text-h2">What our aftercare actually involves</h2>
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
          heading="Already on treatment somewhere else?"
          primary={{ href: "/am-i-eligible", label: "Check your eligibility" }}
          secondary={{ href: "/contact", label: "Or just ask a question first" }}
        >
          <p>
            You don&apos;t have to have started with us. If you&apos;re partway through
            treatment elsewhere and worried about what comes next, that&apos;s exactly
            the conversation Akila wants to have with you.
          </p>
        </Cta>
      </Container>

      <Container className="pb-section">
        <h2 className="text-h2">Read more</h2>
        <ul className="mt-4 space-y-1">
          <li>
            <Link
              href="/blog/keeping-weight-off-after-stopping"
              className="inline-flex min-h-touch items-center text-lg text-teal-700 underline underline-offset-4 hover:text-teal-700"
            >
              Keeping weight off after stopping
            </Link>
          </li>
          <li>
            <Link
              href="/blog/protein-and-nutrition-on-injections"
              className="inline-flex min-h-touch items-center text-lg text-teal-700 underline underline-offset-4 hover:text-teal-700"
            >
              Protein and nutrition on injections
            </Link>
          </li>
        </ul>
      </Container>
    </>
  );
}
