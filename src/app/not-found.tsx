import Button from "@/components/ui/button";
import Container from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <Container className="text-center">
        <h1 className="font-heading text-8xl text-accent">404</h1>
        <h2 className="mt-4 font-heading text-2xl text-foreground">
          Page Not Found
        </h2>
        <p className="mt-4 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
