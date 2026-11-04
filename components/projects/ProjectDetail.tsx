import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project, ProjectSectionId } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";
import { ExternalIcon, GitHubIcon } from "@/components/ui/Icons";

type Section = { id: string; title: string; content: ReactNode; wide?: boolean };

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
          wide: true,
          content: (
            <figure>
              <a
                href={project.diagram.src.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden border border-line bg-obsidian p-2 transition-colors duration-500 hover:border-line-strong sm:p-3"
              >
                <Image
                  src={project.diagram.src}
                  alt={project.diagram.alt}
                  sizes="(min-width: 1280px) 60rem, (min-width: 1024px) 70vw, 100vw"
                  className="h-auto w-full"
                />
                <span className="absolute right-4 top-4 inline-flex items-center gap-2 border border-line bg-obsidian/80 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-silver opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  Full size <ExternalIcon className="size-3" />
                </span>
                <span className="sr-only">Open the full-size diagram in a new tab</span>
              </a>
              {project.diagram.caption ? (
                <figcaption className="mt-4 flex gap-3 text-sm leading-6 text-silver">
                  <span aria-hidden="true" className="mt-3 h-px w-6 shrink-0 bg-gold/60" />
                  {project.diagram.caption}
                </figcaption>
              ) : null}
            </figure>
          ),
        }
      : null,
    project.stack && project.stack.length > 0
      ? {
          id: "stack",
          title: "Technology Stack",
          wide: true,
          content: (
            <dl className="grid border-l border-t border-hairline sm:grid-cols-2">
              {project.stack.map((item) => (
                <div key={item.name} className="border-b border-r border-hairline p-6 transition-colors duration-500 hover:bg-card">
                  <dt className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-gold">{item.name}</dt>
                  <dd className="mt-2 text-sm leading-6 text-silver">{item.purpose}</dd>
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
              className="group flex items-center justify-between gap-4 border border-line bg-card px-6 py-5 transition-colors duration-500 hover:border-gold"
            >
              <span className="flex min-w-0 items-center gap-4">
                <GitHubIcon className="size-5 shrink-0 text-ivory" />
                <span className="truncate font-mono text-sm text-ivory">
                  {project.repositoryUrl.replace("https://github.com/", "")}
                </span>
              </span>
              <ExternalIcon className="size-4 shrink-0 text-gold transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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

function MetaItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-line pt-4">
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-silver">{label}</dt>
      <dd className="mt-2 text-sm text-ivory">{children}</dd>
    </div>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const sections = buildSections(project);
  const docSections = sections.filter((section) => section.id !== "repository" && section.id !== "video");

  return (
    <article>
      <header className="relative isolate overflow-hidden border-b border-hairline">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-blueprint absolute inset-0 opacity-50" />
          <div className="absolute -right-40 -top-40 size-[44rem] bg-[radial-gradient(closest-side,rgb(197_163_106_/_0.09),transparent)]" />
          <div className="bg-vignette absolute inset-0" />
        </div>

        <Container className="pb-16 pt-14 sm:pb-20 sm:pt-20">
          <nav aria-label="Breadcrumb" className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-silver">
            <ol className="flex items-center gap-3">
              <li>
                <Link href="/projects" className="link-underline pb-0.5 hover:text-gold">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true" className="text-gold/60">
                /
              </li>
              <li aria-current="page" className="truncate text-ivory">
                {project.slug}
              </li>
            </ol>
          </nav>

          <Eyebrow className="mt-14 animate-rise">{project.kind}</Eyebrow>
          <h1 className="mt-6 max-w-5xl animate-rise font-serif text-[2.75rem] font-medium leading-[1.02] tracking-[-0.02em] text-ivory [animation-delay:100ms] text-balance sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-8 max-w-3xl animate-rise text-lg leading-8 text-silver [animation-delay:200ms]">
            {project.summary}
          </p>

          <dl className="mt-14 grid animate-rise gap-6 [animation-delay:300ms] sm:grid-cols-2 lg:grid-cols-4">
            <MetaItem label="Type">{project.kind}</MetaItem>
            <MetaItem label="Primary stack">{project.tags.slice(0, 3).join(" · ")}</MetaItem>
            <MetaItem label="Documentation">{docSections.length} sections</MetaItem>
            <MetaItem label="Repository">
              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2 pb-0.5 text-gold"
                >
                  <GitHubIcon className="size-3.5" /> View on GitHub
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                "Not published"
              )}
            </MetaItem>
          </dl>

          <div className="mt-10 animate-rise [animation-delay:360ms]">
            <TagList tags={project.tags} label="Technologies" />
          </div>
        </Container>
      </header>

      <Container className="grid gap-14 py-20 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-20">
        {sections.length > 1 ? (
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-gold">Contents</p>
              <ol className="mt-5 space-y-1 border-l border-hairline">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-[0.8125rem] leading-5 text-silver transition-colors duration-300 hover:border-gold hover:text-ivory"
                    >
                      <span aria-hidden="true" className="font-mono text-[0.625rem] leading-5 text-gold/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        ) : null}

        <div className="min-w-0 space-y-24 lg:col-start-2">
          {sections.map((section, index) => (
            <section key={section.id} aria-labelledby={section.id} className={`reveal ${section.wide ? "" : "max-w-3xl"}`}>
              <div className="mb-8">
                <p aria-hidden="true" className="font-mono text-[0.6875rem] tracking-[0.2em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 id={section.id} className="mt-3 font-serif text-[2.25rem] font-medium leading-tight tracking-[-0.01em] text-ivory">
                  {section.title}
                </h2>
                <div aria-hidden="true" className="reveal-line mt-5 h-px w-16 bg-gold/60" />
              </div>
              {section.content}
            </section>
          ))}

          <div className="border-t border-hairline pt-10">
            <ButtonLink href="/projects" variant="text">
              ← Back to all projects
            </ButtonLink>
          </div>
        </div>
      </Container>
    </article>
  );
}
