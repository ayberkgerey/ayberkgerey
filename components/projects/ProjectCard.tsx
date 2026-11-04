import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/content";
import { TagList } from "@/components/ui/Tag";
import { ArrowRightIcon, GitHubIcon } from "@/components/ui/Icons";

type ProjectCardProps = {
  project: Project;
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({ project, headingLevel: Heading = "h3" }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-line-strong">
      {project.coverImage ? (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-canvas">
          <Image
            src={project.coverImage.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 36rem, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs text-accent">{project.kind}</p>
        <Heading className="mt-2 text-lg font-semibold leading-snug tracking-tight text-ink">
          <Link href={href} className="after:absolute after:inset-0 after:rounded-lg after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent">
            {project.title}
          </Link>
        </Heading>
        <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>

        <div className="mt-5">
          <TagList tags={project.tags} label={`Technologies used in ${project.title}`} />
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span aria-hidden="true" className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:text-accent-strong">
            Read the write-up <ArrowRightIcon />
          </span>
          {project.repositoryUrl ? (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-muted transition-colors hover:text-ink"
            >
              <GitHubIcon />
              Repository
              <span className="sr-only">for {project.title} on GitHub (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
