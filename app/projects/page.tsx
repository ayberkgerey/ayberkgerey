import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Cloud and infrastructure projects by Ayberk Gerey, documented with architecture diagrams, technical decisions, and testing notes.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <Container className="py-16 sm:py-20">
      <header className="max-w-2xl">
        <p className="font-mono text-xs text-accent">projects/</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Projects</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Each project is written up as engineering documentation: what it needed to achieve, how it is built,
          how it was tested, and what I would change next.
        </p>
      </header>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </Container>
  );
}
