import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <Container width="narrow" className="py-24">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-4 leading-7 text-muted">This page does not exist or has moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/projects" variant="secondary">
          Browse projects
        </ButtonLink>
      </div>
    </Container>
  );
}
