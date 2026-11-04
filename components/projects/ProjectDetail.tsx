import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project, ProjectSectionId } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TagList } from "@/components/ui/Tag";
import { ExternalIcon, GitHubIcon } from "@/components/ui/Icons";

type Section = { id: string; title: string; content: ReactNode };

const sectionTitles: Record<ProjectSectionId, string> = {
  overview: "Overview",
  problem: "Problem and Objectives",
  architecture: "Architecture",
  implementation: "Implementation",
  decisions: "Key Technical Decisions",
  testing: "Testing and Validation",
  security: "Security Considerations",
  lessons: "Challenges and Lessons Learned",
  future: "Future Improvements",
};

function textSection(project: Project, id: ProjectSectionId): Section | null {
  const blocks = project.sections[id];
  if (!blocks || blocks.length === 0) return null;
  return { id, title: sectionTitles[id], content: <ContentBlocks blocks={blocks} /> };
}

function buildSections(project: Project): Section[] {
  const sections: (Section | null)[] = [
    textSection(project, "overview"),
    textSection(project, "problem"),
    textSection(project, "architecture"),
    project.diagram
      ? {
          id: "diagram",
          title: "Architecture Diagram",
          content: (
            <figure>
              <a
                href={project.diagram.src.src}
                className="block overflow-hidden rounded-lg border border-line bg-canvas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={project.diagram.src}
                  alt={project.diagram.alt}
                  sizes="(min-width: 1024px) 48rem, 100vw"
                  className="h-auto w-full"
                />
                <span className="sr-only">Open the full-size diagram in a new tab</span>
              </a>
              {project.diagram.caption ? (
                <figcaption className="mt-3 text-sm leading-6 text-muted">{project.diagram.caption}</figcaption>
              ) : null}
            </figure>
          ),
        }
      : null,
    project.stack && project.stack.length > 0
      ? {
          id: "stack",
          title: "Technology Stack",
          content: (
            <dl className="divide-y divide-line overflow-hidden rounded-lg border border-line">
              {project.stack.map((item) => (
                <div key={item.name} className="grid gap-1 px-4 py-3 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="font-mono text-sm text-ink">{item.name}</dt>
                  <dd className="text-sm leading-6 text-muted">{item.purpose}</dd>
                </div>
              ))}
            </dl>
          ),
        }
      : null,
    textSection(project, "implementation"),
    textSection(project, "decisions"),
    textSection(project, "testing"),
    textSection(project, "security"),
    textSection(project, "lessons"),
    textSection(project, "future"),
    project.repositoryUrl
      ? {
          id: "repository",
          title: "GitHub Repository",
          content: (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-lg border border-line bg-surface px-4 py-4 transition-colors hover:border-accent"
            >
              <span className="flex min-w-0 items-center gap-3">
                <GitHubIcon className="size-5 shrink-0 text-ink" />
                <span className="truncate font-mono text-sm text-ink">
                  {project.repositoryUrl.replace("https://github.com/", "")}
                </span>
              </span>
              <ExternalIcon className="size-4 shrink-0 text-muted" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ),
        }
      : null,
    project.videoUrl
      ? {
          id: "video",
          title: "Related YouTube Video",
          content: (
            <ButtonLink href={project.videoUrl} variant="secondary" external>
              Watch on YouTube <ExternalIcon />
            </ButtonLink>
          ),
        }
      : null,
  ];

  return sections.filter((section): section is Section => section !== null);
}

export function ProjectDetail({ project }: { project: Project }) {
  const sections = buildSections(project);

  return (
    <article>
      <header className="border-b border-line">
        <Container className="py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/projects" className="hover:text-ink">
                  projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="truncate text-ink">
                {project.slug}
              </li>
            </ol>
          </nav>
          <p className="mt-8 font-mono text-xs text-accent">{project.kind}</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-ink text-balance sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{project.summary}</p>
          <div className="mt-6">
            <TagList tags={project.tags} label="Technologies" />
          </div>
          {project.repositoryUrl ? (
            <div className="mt-8">
              <ButtonLink href={project.repositoryUrl} variant="secondary" external>
                <GitHubIcon /> View repository
              </ButtonLink>
            </div>
          ) : null}
        </Container>
      </header>

      <Container className="grid gap-12 py-12 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
        {sections.length > 1 ? (
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="font-mono text-xs text-muted">On this page</p>
              <ol className="mt-3 space-y-2 border-l border-line text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="-ml-px block border-l border-transparent pl-3 text-muted hover:border-accent hover:text-ink">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        ) : null}

        <div className="min-w-0 max-w-3xl space-y-14 lg:col-start-2">
          {sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id} className="mb-5 text-xl font-semibold tracking-tight text-ink">
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
