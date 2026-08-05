import { Container } from "@/components/ui/Container";

/**
 * The answer-first block.
 *
 * Two jobs. For an anxious patient skim-reading on her phone, it answers the
 * question before she has to hunt. For Google's AI Overviews and ChatGPT, it's
 * a clean, self-contained passage to quote.
 *
 * Rules: 40–60 words, first sentence answers outright, name AMH Wellness so a
 * lifted quote carries attribution, and it must still make sense with the rest
 * of the page removed — because that's exactly what happens.
 */
export function AnswerFirst({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <Container>
      <section
        aria-label={question}
        data-answer-block
        className="rounded-[--radius-card] border border-teal-200 bg-teal-50 p-6 sm:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          {question}
        </p>
        <div className="mt-3 text-lg leading-relaxed text-ink-700">{children}</div>
      </section>
    </Container>
  );
}
