import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

/**
 * The credentials, stated plainly and early.
 *
 * This is the thing no competitor leads with — Voy, SheMed and Juniper are
 * brands; Akila is a person on a public register. Say so above the fold.
 */
export function TrustBar() {
  const { clinician, regulatory } = siteConfig;

  const signals = [
    { label: "GPhC registered", detail: `Registration ${clinician.gphcNumber}` },
    { label: "Independent prescriber", detail: "Akila prescribes personally" },
    { label: "SCOPE accredited", detail: "Obesity training with the NMWLP" },
    { label: "MHRA-approved treatments", detail: "Dispensed by a registered UK pharmacy" },
  ];

  return (
    <Container>
      <div className="rounded-card border border-sand-200 bg-white px-6 py-7 shadow-card sm:px-8">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((s) => (
            <li key={s.label} className="border-l-2 border-teal-300 pl-4">
              <p className="text-sm font-semibold text-indigo-600">{s.label}</p>
              <p className="mt-1 text-sm text-ink-500">{s.detail}</p>
            </li>
          ))}
        </ul>
        {regulatory.showCqcStatus ? (
          <p className="mt-6 border-t border-sand-200 pt-5 text-sm text-ink-500">
            {regulatory.cqcStatusSentence}
          </p>
        ) : null}
      </div>
    </Container>
  );
}
