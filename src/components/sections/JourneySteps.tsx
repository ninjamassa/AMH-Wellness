import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

/**
 * The five steps, straight from how Akila actually runs her service.
 * Showing the whole process up front is a conversion tool: the main reason
 * people don't book is that they don't know what they're agreeing to.
 */
export function JourneySteps({ heading = "What happens, step by step" }: { heading?: string }) {
  return (
    <Container className="py-section">
      <h2 className="text-h2">{heading}</h2>
      <ol className="mt-10 grid gap-5 lg:grid-cols-5">
        {siteConfig.journey.map((step) => (
          <li
            key={step.step}
            className="relative rounded-card border border-sand-200 bg-white p-6 shadow-card"
          >
            <span
              aria-hidden
              className="flex size-touch shrink-0 items-center justify-center rounded-pill bg-indigo-600 text-lg font-semibold text-white"
            >
              {step.step}
            </span>
            <div className="mt-5">
              <h3 className="text-h3">{step.title}</h3>
              <p className="mt-3 text-ink-500">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
