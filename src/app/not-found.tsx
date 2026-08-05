import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-section">
      <h1 className="text-h1">Page not found</h1>
      <p className="mt-4 max-w-xl text-ink-500">
        That page doesn&apos;t exist, or it may have moved. You can start from the
        homepage, or check whether our service is right for you.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/">Back to homepage</Button>
        <Button href="/am-i-eligible" variant="ghost">
          Check your eligibility
        </Button>
      </div>
    </Container>
  );
}
