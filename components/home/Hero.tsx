import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Portrait } from "@/components/ui/Portrait";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:py-28">
        <div>
          <p className="font-mono text-sm text-accent">{profile.name}</p>
          <h1
            id="hero-title"
            className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl"
          >
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{profile.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/projects">
              Explore Projects <ArrowRightIcon />
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              My Journey
            </ButtonLink>
          </div>
        </div>
        <Portrait />
      </Container>
    </section>
  );
}
