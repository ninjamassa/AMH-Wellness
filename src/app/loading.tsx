import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="py-[--spacing-section]">
      <p role="status">Loading…</p>
    </Container>
  );
}
