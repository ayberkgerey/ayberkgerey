import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { ButtonArrow, ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/SectionHeading";

function ArchitectureLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 520"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full text-gold opacity-[0.12]"
    >
      <g stroke="currentColor" strokeWidth="1">
        <rect x="340" y="40" width="120" height="56" />
        <path d="M400 96v70M180 166h440M180 166v60M400 166v60M620 166v60" />
        <rect x="120" y="226" width="120" height="56" />
        <rect x="340" y="226" width="120" height="56" />
        <rect x="560" y="226" width="120" height="56" />
        <path d="M180 282v90M620 282v90M180 372h440M400 282v150" />
        <rect x="300" y="432" width="200" height="56" strokeDasharray="4 6" />
      </g>
      <g fill="currentColor">
        <circle cx="400" cy="166" r="3" />
        <circle cx="180" cy="372" r="3" />
        <circle cx="620" cy="372" r="3" />
        <circle cx="400" cy="372" r="3" />
      </g>
    </svg>
  );
}

export function JourneyPreview() {
  return (
    <section aria-labelledby="journey-title" className="relative isolate overflow-hidden border-y border-hairline bg-charcoal">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]">
          <ArchitectureLines />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#111214_35%,rgb(17_18_20_/_0.6)_70%,rgb(17_18_20_/_0.3))]" />
        <div className="absolute -left-40 top-1/3 size-[36rem] bg-[radial-gradient(closest-side,rgb(197_163_106_/_0.07),transparent)]" />
      </div>

      <Container className="py-28 sm:py-36">
        <div className="reveal max-w-3xl">
          <Eyebrow>Professional journey</Eyebrow>
          <h2 id="journey-title" className="mt-6 font-serif text-5xl font-medium leading-[1] tracking-[-0.02em] text-ivory sm:text-7xl">
            {profile.journeyTitle.split(" ").slice(0, -1).join(" ")}{" "}
            <em className="font-normal italic text-gold">{profile.journeyTitle.split(" ").at(-1)}</em>
          </h2>
          <div className="mt-10 max-w-2xl space-y-5 text-lg leading-8 text-silver">
            {profile.journeySummary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ol className="relative mt-20 grid gap-10 md:grid-cols-3 md:gap-8">
          <span aria-hidden="true" className="reveal-line absolute left-0 right-0 top-[0.3rem] hidden h-px bg-gold/50 md:block" />
          {profile.journeyStages.map((stage, index) => (
            <li key={stage.title} className="reveal relative md:pt-10">
              <span aria-hidden="true" className="absolute left-0 top-0 hidden size-2.5 rotate-45 border border-gold bg-charcoal md:block" />
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-gold">
                <span className="text-silver">0{index + 1} · </span>
                {stage.label}
              </p>
              <h3 className="mt-3 font-serif text-2xl text-ivory">{stage.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-silver">{stage.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16">
          <ButtonLink href="/about" variant="text">
            Read the full story <ButtonArrow />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
