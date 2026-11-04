import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function JourneyPreview() {
  return (
    <section aria-labelledby="journey-title" className="py-20">
      <Container>
        <SectionHeading id="journey-title" eyebrow="02 / journey" title="Professional journey" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="space-y-4 text-base leading-7 text-muted">
            {profile.journeySummary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="pt-2">
              <ButtonLink href="/about" variant="text">
                Read the full story <ArrowRightIcon />
              </ButtonLink>
            </div>
          </div>

          <ol className="relative space-y-6 border-l border-line-strong pl-6">
            {profile.journeyStages.map((stage) => (
              <li key={stage.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[1.85rem] top-1.5 size-2.5 rounded-full border border-accent bg-canvas"
                />
                <p className="font-mono text-xs text-accent">{stage.label}</p>
                <h3 className="mt-1 font-semibold text-ink">{stage.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{stage.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
