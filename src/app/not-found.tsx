import Button from "@/components/ui/button";
import Container from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <Container className="text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">404</p>
        <h1 className="mt-4 font-heading text-6xl text-foreground sm:text-7xl">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          The page you are looking for does not exist or has been moved.
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
