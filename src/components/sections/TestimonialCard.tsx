import type { Testimonial } from "@/types/content";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (!testimonial.consentConfirmed) return null;

  return (
    <figure className="flex h-full flex-col rounded-card border border-sand-200 bg-white p-7 shadow-card">
      <span aria-hidden="true" className="text-h2 leading-none text-teal-500">
        “
      </span>
      <blockquote className="mt-2 flex-1 text-body-lg text-ink-700">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-6 border-t border-sand-200 pt-4 text-sm font-semibold text-indigo-600">
        {testimonial.attribution}
      </figcaption>
    </figure>
  );
}
