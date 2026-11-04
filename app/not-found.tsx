import { Container } from "@/components/layout/Container";
import { ButtonArrow, ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/SectionHeading";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-blueprint absolute inset-0 opacity-50" />
        <div className="bg-vignette absolute inset-0" />
      </div>
      <Container className="py-32 sm:py-40">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-8 font-serif text-6xl font-medium leading-none text-ivory sm:text-8xl">
          Page <em className="font-normal italic text-gold">not found.</em>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-8 text-silver">This page does not exist or has moved.</p>
        <div className="mt-12 flex flex-wrap gap-4">
          <ButtonLink href="/">
            Back to home <ButtonArrow />
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            Browse projects
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
