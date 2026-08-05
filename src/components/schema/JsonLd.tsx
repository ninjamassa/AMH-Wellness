interface JsonLdProps {
  /** Pre-serialised JSON-LD from lib/schema.ts buildGraph(). */
  graph: string;
}

/**
 * Renders JSON-LD. Uses a script tag rather than next/script so the markup is
 * present in the initial HTML — AI crawlers frequently do not execute JS.
 */
export function JsonLd({ graph }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Content is generated server-side from typed builders, never user input.
      dangerouslySetInnerHTML={{ __html: graph }}
    />
  );
}
