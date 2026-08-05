import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-section">
      <h1 className="text-h1">Page not found</h1>
      <p className="mt-4 max-w-xl text-ink-500">
        That page does not exist, or it may have moved. Start from the homepage
        to find the information you were looking for.
      </p>
      <div className="mt-8">
        <Button href="/">Back to homepage</Button>
      </div>
    </Container>
  );
}
