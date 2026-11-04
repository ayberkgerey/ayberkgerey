import { getFeaturedProjects } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { CurrentFocus } from "@/components/home/CurrentFocus";
import { Hero } from "@/components/home/Hero";
import { JourneyPreview } from "@/components/home/JourneyPreview";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonArrow, ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />
      <CurrentFocus />

      {featured.length > 0 ? (
        <section aria-labelledby="projects-title" className="relative py-28 sm:py-36">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_top,rgb(197_163_106_/_0.05),transparent_70%)]" />
          <Container>
            <SectionHeading
              id="projects-title"
              eyebrow="Featured projects"
              title={
                <>
                  Selected <em className="font-normal italic text-gold">work.</em>
                </>
              }
              description="Hands-on builds, documented with their architecture, failure tests, and the decisions behind them."
              action={
                <ButtonLink href="/projects" variant="text">
                  All projects <ButtonArrow />
                </ButtonLink>
              }
            />
            <ul className="space-y-8">
              {featured.map((project, index) => (
                <li key={project.slug} className="reveal">
                  <ProjectCard project={project} index={index} variant="feature" />
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
