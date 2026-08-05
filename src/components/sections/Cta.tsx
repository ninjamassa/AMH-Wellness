import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

interface CtaLink {
  href: string;
  label: string;
}

export function Cta({
  eyebrow,
  heading,
  children,
  primary,
  secondary,
}: {
  eyebrow?: string;
  heading: string;
  children: ReactNode;
  primary: CtaLink;
  secondary?: CtaLink;
}) {
  return (
    <section className="relative overflow-hidden rounded-card bg-indigo-600 p-8 text-white shadow-raised sm:p-12">
      <span
        aria-hidden="true"
        className="absolute -right-16 -top-20 size-56 rounded-pill border-[2rem] border-indigo-500/40"
      />
      <div className="relative max-w-reading">
        {eyebrow ? (
          <p className="text-sm font-semibold tracking-wide text-teal-200">{eyebrow}</p>
        ) : null}
        <h2 className="mt-3 text-h2 text-white">{heading}</h2>
        <div className="mt-5 text-indigo-100">{children}</div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={primary.href} variant="secondary">
            {primary.label}
          </Button>
          {secondary ? (
            <Button href={secondary.href} variant="ghost">
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
