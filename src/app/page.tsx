import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Cta } from "@/components/sections/Cta";
import { TrustBar } from "@/components/sections/TrustBar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

/**
 * STAGE     aware
 *
 * JOB
 * Make her feel, within one screen, that this is a real clinician who will
 * actually know her name — and that someone has finally thought about what
 * happens after.
 *
 * ANSWERS   ongoing-care
 * NEXT STEP /am-i-eligible
 *
 * She has probably already tried a jab-in-the-post service. She isn't here for
 * faster or cheaper. She's here because the last one left her on her own.
 * Lead with the person, not the product.
 */

export const metadata = buildMetadata(pageSeo["/"]);

const pillars = [
  {
    title: "The same person, every time",
    body: "Akila prescribes personally and reviews you every four weeks. Your questions go back to the pharmacist who already knows your history.",
  },
  {
    title: "Nutrition guidance, not just a prescription",
    body: "Meal-planning support, nutrition guidance and supplement advice where appropriate are included from the first consultation.",
  },
  {
    title: "A plan for when you stop",
    body: "Maintenance is discussed from the start, so you are not left to work out what happens after treatment on your own.",
  },
];

export default function HomePage() {
  const { clinician, eligibility } = siteConfig;

  return (
    <>
      <Container className="pt-section">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
          {clinician.jobTitle} · GPhC {clinician.gphcNumber}
        </p>
        <h1 className="mt-4 max-w-3xl text-display">
          Weight loss treatment with the same pharmacist at every review
        </h1>
      </Container>

      <div className="mt-8">
        <AnswerFirst question={answerBlockQuestions["/"]}>
          <p>
            AMH Wellness provides one-to-one weight loss support across the UK with{" "}
            {clinician.name} {clinician.credentials}, an independent prescribing
            pharmacist. Care is delivered by video and includes a personalised plan,
            nutrition guidance, reviews every four weeks and message access to Akila
            between appointments, with maintenance considered from the beginning.
          </p>
        </AnswerFirst>
      </div>

      <Container className="py-section">
        <div className="relative overflow-hidden rounded-card border border-sand-200 bg-white p-6 shadow-card sm:p-10 lg:p-14">
          <span
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-72 rounded-pill bg-teal-50"
          />
          <div className="relative max-w-3xl">
            <p className="max-w-2xl text-lg leading-relaxed text-ink-500">
              If a previous service sent a pen and an app but left you unsure who to
              contact, you will speak to {clinician.name} {clinician.credentials}{" "}
              herself at AMH Wellness. She conducts your consultation and four-weekly
              reviews, with nutrition guidance and maintenance planning included from
              the start.
            </p>
            <div className="mt-9">
              <Button href="/am-i-eligible">Check if you may be eligible</Button>
            </div>
            <p className="mt-4 text-sm text-ink-500">
              Takes about two minutes. Akila confirms suitability in consultation.
            </p>
          </div>
        </div>
      </Container>

      <TrustBar />

      <Container className="py-section">
        <h2 className="text-h2">What does AMH Wellness include around the prescription?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-card border border-sand-200 bg-white p-7 shadow-card"
            >
              <h3 className="text-h3">{p.title}</h3>
              <p className="mt-3 flex-1 text-ink-500">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* The differentiator gets its own moment on the homepage.
          This is the reason the business exists — don't bury it in a nav item. */}
      <Container className="pb-section">
        <Cta
          eyebrow="What happens when you stop?"
          heading="Your maintenance plan should not begin with the final prescription"
          primary={{ href: "/am-i-eligible", label: "Check if you may be eligible" }}
        >
          <p>
            Appetite can change again when treatment stops, and weight regain is a
            recognised concern rather than a personal failure. AMH Wellness starts
            the conversation early, with nutrition guidance and a plan for maintaining
            your weight once treatment finishes.
          </p>
        </Cta>
      </Container>

      <Container className="pb-section">
        <div className="max-w-3xl">
          <h2 className="text-h2">Could this be right for you?</h2>
          <p className="mt-5 text-ink-500">
            The AMH Wellness starting criteria are adults living in the UK with a BMI of{" "}
            {eligibility.bmiThreshold} or above — or{" "}
            {eligibility.bmiThresholdWithCondition} and above if you also have a
            weight-related condition, such as {eligibility.relatedConditions
              .slice(0, 3)
              .join(", ")
              .toLowerCase()}.
          </p>
          <p className="mt-4 text-ink-500">
            The eligibility check takes about two minutes and tells you honestly
            whether you meet those starting criteria. Akila makes the final
            suitability decision after speaking with you.
          </p>
          <Button href="/am-i-eligible" className="mt-7">
            Check if you may be eligible
          </Button>
        </div>
      </Container>
    </>
  );
}
