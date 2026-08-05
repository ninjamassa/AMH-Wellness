import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

/**
 * The five steps, straight from how Akila actually runs her service.
 * Showing the whole process up front is a conversion tool: the main reason
 * people don't book is that they don't know what they're agreeing to.
 */
export function JourneySteps({ heading = "What happens, step by step" }: { heading?: string }) {
  return (
    <Container className="py-[--spacing-section]">
      <h2 className="text-[length:--text-h2]">{heading}</h2>
      <ol className="mt-10 space-y-8">
        {siteConfig.journey.map((step) => (
          <li key={step.step} className="flex gap-5 sm:gap-7">
            <span
              aria-hidden
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-lg font-semibold text-white"
            >
              {step.step}
            </span>
            <div className="pt-1.5">
              <h3 className="text-[length:--text-h3]">{step.title}</h3>
              <p className="mt-2 max-w-2xl text-ink-500">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
