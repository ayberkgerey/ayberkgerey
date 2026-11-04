import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Cloud and infrastructure projects by Ayberk Gerey, documented with architecture diagrams, technical decisions, and testing notes.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <PageHeader
        eyebrow={`Projects · ${String(projects.length).padStart(2, "0")}`}
        title={
          <>
            Engineering, <em className="font-normal italic text-gold">documented.</em>
          </>
        }
      >
        <p className="text-lg leading-8 text-silver">
          Each project is written up as engineering documentation: what it needed to achieve, how it is built, how it
          was tested, and what I would change next.
        </p>
      </PageHeader>

      <Container className="pt-20">
        <ul className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.slug} className="reveal">
              <ProjectCard project={project} index={index} headingLevel="h2" />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
