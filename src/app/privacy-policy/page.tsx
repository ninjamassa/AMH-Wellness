import { AnswerFirst } from "@/components/sections/AnswerFirst";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { answerBlockQuestions } from "@/lib/answer-blocks";
import { pageSeo } from "@/lib/page-seo";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

/**
 * STAGE
 *
 * JOB

 *
 * ANSWERS   no single objection — supporting page
 * NEXT STEP
 * TARGETS   —
 *
 * Full spec: src/lib/patient-journey.ts → specForRoute("/privacy-policy")
 * STATUS: scaffold. Content agent to build out per docs/04-page-briefs.md.
 */

export const metadata = buildMetadata(pageSeo["/privacy-policy"]);

export default function PrivacyPolicyPage() {
  const { legalName, companyNumber, registeredOffice } = siteConfig;

  return (
    <>
      <Container className="py-section">
        <h1 className="text-h1">Privacy policy</h1>
      </Container>

      <AnswerFirst question={answerBlockQuestions["/privacy-policy"]}>
        <p>
          AMH Wellness limits website data to defined purposes: responding to
          contact requests and, only with consent, optional analytics. The eligibility
          check runs in your browser, so measurements and individual health answers
          are not sent to AMH Wellness. Booking and clinical records are handled in
          the secure clinical systems described below.
        </p>
      </AnswerFirst>

      <Container className="py-section">
        <div className="max-w-3xl space-y-12">
          {/* TODO(legal-review): This privacy notice is a factual draft, not approved legal text. A UK data-protection reviewer must approve every section before publication. */}
          <section>
            <h2 className="text-h2">Who is responsible for my information?</h2>
            <p className="mt-5 text-ink-500">
              {legalName}, company number {companyNumber}, is the proposed data
              controller for the website and AMH Wellness service. Its registered
              office is {registeredOffice.streetAddress},{" "}
              {registeredOffice.addressLocality}, {registeredOffice.postalCode}. This
              is a registered address, not a clinic.
            </p>
            <p className="mt-4 text-ink-500">
              The professional privacy contact address is not operationally
              confirmed and must be added before this notice is published.
            </p>
            {/* TODO(human): Confirm the data controller, privacy contact email, ICO registration details and whether a data protection officer is required. */}
          </section>

          <section>
            <h2 className="text-h2">What does this website collect?</h2>
            <div className="mt-5 space-y-4 text-ink-500">
              <p>
                The contact request form accepts only your name and email address.
                It does not accept a free-text message or health information. A
                configured email provider sends those two details to Akila so she
                can reply.
              </p>
              <p>
                The eligibility check uses age, UK residency, height, weight and
                broad health-context answers in your browser. AMH Wellness does not
                receive or store those answers or your calculated BMI.
              </p>
              <p>
                Optional analytics does not load unless you accept it. If enabled,
                it records page paths and allowlisted journey events. Recording the
                broad eligibility result remains subject to explicit privacy and
                legal approval before analytics is enabled.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-h2">What happens when I book?</h2>
            <p className="mt-5 text-ink-500">
              When the hosted Semble booking link is configured, an eligible visitor
              will be handed to it without health answers or measurements in the
              link. Semble is intended to be the clinical system of record. The
              health questionnaire, consultation record, prescribing information and
              any hosted-booking payment will sit outside this website.
            </p>
            {/* TODO(human): Confirm the final Semble, NMWLP questionnaire, pharmacy and payment-provider privacy terms, processor roles and data locations. */}
          </section>

          <section>
            <h2 className="text-h2">Why would AMH Wellness use my information?</h2>
            <p className="mt-5 text-ink-500">
              Proposed purposes include replying to a contact request, arranging and
              providing care, keeping clinical and financial records, meeting legal
              and regulatory duties, and measuring website use where you have chosen
              optional analytics. The lawful basis and additional condition required
              for health information must be confirmed by the legal reviewer.
            </p>
            {/* TODO(legal-review): Confirm and state each Article 6 lawful basis, Article 9 condition and applicable Data Protection Act 2018 condition by processing purpose. */}
          </section>

          <section>
            <h2 className="text-h2">Who may receive my information?</h2>
            <p className="mt-5 text-ink-500">
              Depending on what you choose to do, proposed recipients include
              Akila, Semble, the health-questionnaire provider, a registered UK
              pharmacy, the hosted payment provider, the contact-email provider and
              Google Analytics only after consent. The final processor list,
              contractual safeguards and any international transfers are not yet
              confirmed.
            </p>
          </section>

          <section>
            <h2 className="text-h2">How long is my information kept?</h2>
            <p className="mt-5 text-ink-500">
              Retention periods have not been supplied. The final notice must state
              how long contact requests, booking information, clinical records,
              financial records, complaints and analytics data are kept, or explain
              the criteria used to decide. No period is invented in this draft.
            </p>
            {/* TODO(human): Akila and the legal reviewer must approve a retention schedule for every data category and supplier. */}
          </section>

          <section>
            <h2 className="text-h2">What choices and rights do I have?</h2>
            <p className="mt-5 text-ink-500">
              Depending on the circumstances, UK data-protection law can give you
              rights to be informed, access your information, correct it, ask for
              deletion or restriction, object to processing, move information and
              withdraw consent. Some rights have exceptions, particularly for
              clinical records that must be retained.
            </p>
            <p className="mt-4 text-ink-500">
              You can change optional analytics through the analytics settings. If
              you are not satisfied with how your information is handled, you can
              first raise it with AMH Wellness and then {" "}
              <a
                href="https://ico.org.uk/make-a-complaint"
                className="font-medium text-teal-700 underline underline-offset-4"
              >
                complain to the Information Commissioner&apos;s Office
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h2">How is website data protected?</h2>
            <p className="mt-5 text-ink-500">
              The website reduces the information it handles: eligibility answers
              stay in your browser, the public contact form is limited to name and
              email, and provider credentials remain on the server. The final notice
              must also describe the approved organisational and supplier safeguards
              without promising that any system is risk-free.
            </p>
          </section>

          <Button href="/">Return to the homepage</Button>
          {/* TODO(legal-review): Confirm the notice date, update process, children's-data position, automated-decision explanation and all mandatory Article 13/14 information. */}
        </div>
      </Container>
    </>
  );
}
