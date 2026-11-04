import { getFeaturedProjects } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { CurrentFocus } from "@/components/home/CurrentFocus";
import { Hero } from "@/components/home/Hero";
import { JourneyPreview } from "@/components/home/JourneyPreview";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />
      <CurrentFocus />

      {featured.length > 0 ? (
        <section aria-labelledby="projects-title" className="border-b border-line py-20">
          <Container>
            <SectionHeading
              id="projects-title"
              eyebrow="01 / projects"
              title="Selected projects"
              description="Hands-on builds, documented with their architecture, failure tests, and the decisions behind them."
              action={
                <ButtonLink href="/projects" variant="text">
                  All projects <ArrowRightIcon />
                </ButtonLink>
              }
            />
            <ul className="grid gap-6 md:grid-cols-2">
              {featured.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <JourneyPreview />
    </>
  );
}
