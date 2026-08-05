import Link from "next/link";
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
    body: "Akila prescribes personally and reviews you personally. You're not passed between clinicians you'll never speak to twice.",
    href: "/about",
    linkText: "About Akila",
  },
  {
    title: "Nutrition coaching, not just a prescription",
    body: "A plan for what you actually eat — protein, vitamins, meals that work around your life — included from the first consultation.",
    href: "/blog/protein-and-nutrition-on-injections",
    linkText: "Read our nutrition guidance",
  },
  {
    title: "A plan for when you stop",
    body: "The question nobody else answers. We start planning how you'll keep the weight off before you need to.",
    href: "/support-after-injections",
    linkText: "Support after injections",
  },
];

export default function HomePage() {
  const { clinician, eligibility, contact } = siteConfig;

  return (
    <>
      <Container className="py-section">
        <div className="relative overflow-hidden rounded-card border border-sand-200 bg-white p-6 shadow-card sm:p-10 lg:p-14">
          <span
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-72 rounded-pill bg-teal-50"
          />
          <div className="relative max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
            {clinician.jobTitle} · GPhC {clinician.gphcNumber}
          </p>
          <h1 className="mt-4 text-display">
            Weight loss injections, with someone who actually picks up
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
            Most services post you a pen and leave you to it. AMH Wellness gives you
            one-to-one video consultations with {clinician.name} {clinician.credentials},
            nutrition coaching, reviews every four weeks — and a plan for keeping the
            weight off once you finish.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/am-i-eligible">Check if you&apos;re eligible</Button>
            <Button href="/how-it-works" variant="ghost">
              See how it works
            </Button>
          </div>
          <p className="mt-4 text-sm text-ink-500">
            Takes about two minutes. No obligation to book.
          </p>
          </div>
        </div>
      </Container>

      <TrustBar />

      <AnswerFirst question={answerBlockQuestions["/"]}>
        AMH Wellness is a UK weight loss service led by {clinician.name}{" "}
        {clinician.credentials}, an independent prescribing pharmacist. Patients have a
        one-to-one video consultation, receive a personalised plan with nutrition
        guidance, and are reviewed every four weeks — with direct message access to
        Akila in between.
      </AnswerFirst>

      <Container className="py-section">
        <h2 className="text-h2">
          What you get that other services don&apos;t give you
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-card border border-sand-200 bg-white p-7 shadow-card"
            >
              <h3 className="text-h3">{p.title}</h3>
              <p className="mt-3 flex-1 text-ink-500">{p.body}</p>
              <Link
                href={p.href}
                className="mt-4 inline-flex min-h-touch items-center text-sm font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-700"
              >
                {p.linkText}
              </Link>
            </div>
          ))}
        </div>
      </Container>

      {/* The differentiator gets its own moment on the homepage.
          This is the reason the business exists — don't bury it in a nav item. */}
      <Container className="pb-section">
        <Cta
          eyebrow="What happens when you stop?"
          heading="Most people are never asked this until it's already happening"
          primary={{ href: "/support-after-injections", label: "How our aftercare works" }}
        >
          <p>
            Coming off treatment is where a lot of people lose their progress — not
            because they did anything wrong, but because nobody prepared them for it.
            We build your maintenance plan into the programme from day one, and the
            nutrition coaching carries on afterwards.
          </p>
        </Cta>
      </Container>

      <Container className="pb-section">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-h2">Could this be right for you?</h2>
            <p className="mt-5 text-ink-500">
              Treatment is suitable for adults in the UK with a BMI of{" "}
              {eligibility.bmiThreshold} or above — or{" "}
              {eligibility.bmiThresholdWithCondition} and above if you also have a
              weight-related condition such as high blood pressure, pre-diabetes or
              sleep apnoea.
            </p>
            <p className="mt-4 text-ink-500">
              The eligibility check takes about two minutes and tells you honestly
              either way. If it isn&apos;t right for you, we&apos;ll say so.
            </p>
            <Button href="/am-i-eligible" className="mt-7">
              Check your eligibility
            </Button>
          </div>

          <div className="rounded-card border border-sand-200 bg-white p-7 shadow-card">
            <h2 className="text-h3">Rather ask a question first?</h2>
            <p className="mt-3 text-ink-500">
              That&apos;s completely fine. Send a message and Akila will come back to
              you herself.
            </p>
            <dl className="mt-5 space-y-2 text-sm text-ink-500">
              {contact.responseHours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt>{h.days}</dt>
                  <dd className="font-medium text-ink-700">{h.hours}</dd>
                </div>
              ))}
            </dl>
            <Button href="/contact" variant="ghost" className="mt-6">
              Send a message
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
