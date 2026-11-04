import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { ButtonArrow, ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Portrait } from "@/components/ui/Portrait";

function Headline() {
  const { headline, headlineHighlight } = profile;
  const index = headline.indexOf(headlineHighlight);
  if (index === -1) return <>{headline}</>;

  return (
    <>
      {headline.slice(0, index)}
      <em className="font-normal italic text-gold">{headlineHighlight}</em>
      {headline.slice(index + headlineHighlight.length)}
    </>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b0c0f_0%,#08090b_70%)]" />
        <div className="animate-drift absolute -right-[15%] -top-[25%] h-[85%] w-[70%] bg-[radial-gradient(closest-side,rgb(197_163_106_/_0.11),transparent)]" />
        <div className="bg-blueprint absolute inset-0 opacity-60" />
        <div className="bg-vignette absolute inset-0" />
      </div>

      <Container className="grid min-h-[calc(100svh-4.5rem)] items-center gap-16 py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20 lg:py-24">
        <div>
          <Eyebrow className="animate-rise">{profile.label}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-8 animate-rise font-serif text-[3.25rem] font-medium leading-[0.98] tracking-[-0.02em] text-ivory [animation-delay:120ms] text-balance sm:text-7xl lg:text-[5.5rem]"
          >
            <Headline />
          </h1>
          <p className="mt-10 max-w-xl animate-rise text-lg leading-8 text-silver [animation-delay:240ms]">
            {profile.intro}
          </p>
          <div className="mt-12 flex animate-rise flex-wrap items-center gap-4 [animation-delay:360ms]">
            <ButtonLink href="/projects">
              Explore Projects <ButtonArrow />
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              My Journey
            </ButtonLink>
          </div>
        </div>

        <div className="animate-rise [animation-delay:200ms]">
          <Portrait />
        </div>
      </Container>
    </section>
  );
}
