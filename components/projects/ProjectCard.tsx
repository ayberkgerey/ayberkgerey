import Image from "next/image";
import Link from "next/link";
import type { ContentBlock, Project } from "@/types/content";
import { TagList } from "@/components/ui/Tag";
import { GitHubIcon } from "@/components/ui/Icons";

type ProjectCardProps = {
  project: Project;
  index: number;
  variant?: "feature" | "grid";
  headingLevel?: "h2" | "h3";
};

function firstCodeBlock(project: Project) {
  for (const blocks of Object.values(project.sections)) {
    const code = blocks?.find((block): block is Extract<ContentBlock, { type: "code" }> => block.type === "code");
    if (code) return code;
  }
  return undefined;
}

function Thumbnail({ project, sizes }: { project: Project; sizes: string }) {
  if (project.coverImage) {
    return (
      <Image
        src={project.coverImage.src}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
      />
    );
  }

  const code = firstCodeBlock(project);
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,#202124,#111214_70%)]">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
      {code ? (
        <pre
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden p-8 font-mono text-[0.75rem] leading-6 text-silver transition-transform duration-[1200ms] ease-[var(--ease-luxe)] group-hover:scale-[1.03]"
        >
          {code.code}
        </pre>
      ) : null}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,#111214_100%)]" />
      {code?.caption ? (
        <p aria-hidden="true" className="absolute bottom-5 left-8 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-gold">
          {code.caption.split(":")[0]}
        </p>
      ) : null}
    </div>
  );
}

function CardArrow() {
  return (
    <span
      aria-hidden="true"
      className="flex size-11 items-center justify-center border border-line-strong text-gold transition-all duration-500 ease-[var(--ease-luxe)] group-hover:border-gold group-hover:bg-gold group-hover:text-obsidian"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className="size-4 -rotate-45">
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </span>
  );
}

export function ProjectCard({ project, index, variant = "grid", headingLevel: Heading = "h3" }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;
  const number = String(index + 1).padStart(2, "0");
  const isFeature = variant === "feature";

  return (
    <article
      className={`group relative grid overflow-hidden border border-line bg-card transition-[border-color,box-shadow] duration-700 ease-[var(--ease-luxe)] hover:border-line-strong hover:shadow-[0_30px_80px_-40px_rgb(197_163_106_/_0.35)] ${
        isFeature ? "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]" : "h-full grid-rows-[auto_1fr]"
      }`}
    >
      <div
        className={`relative overflow-hidden border-line bg-charcoal ${
          isFeature ? "aspect-[16/10] border-b lg:aspect-auto lg:min-h-[26rem] lg:border-b-0 lg:border-r" : "aspect-[16/10] border-b"
        }`}
      >
        <Thumbnail
          project={project}
          sizes={isFeature ? "(min-width: 1024px) 42rem, 100vw" : "(min-width: 768px) 38rem, 100vw"}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_9_11_/_0)_60%,rgb(8_9_11_/_0.5))]" />
      </div>

      <div className={`flex flex-col ${isFeature ? "p-8 sm:p-10 lg:p-12" : "p-8"}`}>
        <div className="flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-[0.2em]">
          <span className="text-gold">{project.kind}</span>
          <span className="text-silver">{number}</span>
        </div>

        <Heading
          className={`mt-6 font-serif font-medium leading-[1.1] tracking-[-0.01em] text-ivory transition-colors duration-500 group-hover:text-[#f3eee5] ${
            isFeature ? "text-3xl sm:text-4xl" : "text-[1.75rem]"
          }`}
        >
          <Link
            href={href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-1 focus-visible:after:-outline-offset-4 focus-visible:after:outline-gold"
          >
            {project.title}
          </Link>
        </Heading>

        <p className="mt-5 text-[0.9375rem] leading-7 text-silver">{project.summary}</p>

        <div className="mt-7">
          <TagList tags={project.tags} label={`Technologies used in ${project.title}`} limit={isFeature ? 6 : 4} />
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-10">
          {project.repositoryUrl ? (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-silver transition-colors duration-300 hover:text-gold"
            >
              <GitHubIcon className="size-3.5" />
              Repository
              <span className="sr-only">for {project.title} on GitHub (opens in a new tab)</span>
            </a>
          ) : (
            <span />
          )}
          <CardArrow />
        </div>
      </div>
    </article>
  );
}
