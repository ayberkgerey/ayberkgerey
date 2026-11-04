import type { Metadata } from "next";
import type { ReactNode } from "react";
import { about, certifications, experience, profile, skills } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { TagList } from "@/components/ui/Tag";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ayberk Gerey's background in mobile and web software engineering, the move toward cloud architecture, experience, and skills.",
};

function AboutSection({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-4 border-t border-line py-12 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12">
      <div>
        <p className="font-mono text-xs text-accent">{label}</p>
        <h2 id={id} className="mt-2 text-xl font-semibold tracking-tight text-ink">
          {title}
        </h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-2xl space-y-4 leading-7 text-muted">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

const contactLinkClass =
  "flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink transition-colors hover:border-accent";

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <header className="max-w-3xl pb-12">
        <p className="font-mono text-xs text-accent">about/</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{profile.name}</h1>
        <p className="mt-3 text-lg text-muted">{profile.role}</p>
      </header>

      <AboutSection id="introduction" label="01" title="Introduction">
        <Prose paragraphs={about.introduction} />
      </AboutSection>

      <AboutSection id="background" label="02" title="Software Engineering Background">
        <Prose paragraphs={about.softwareBackground} />
      </AboutSection>

      <AboutSection id="transition" label="03" title="Transition Toward Cloud Architecture">
        <Prose paragraphs={about.transition} />
      </AboutSection>

      <AboutSection id="focus" label="04" title="Current Technical Focus">
        <TagList tags={profile.focusAreas} label="Current focus areas" />
      </AboutSection>

      <AboutSection id="experience" label="05" title="Professional Experience">
        <ol className="space-y-10">
          {experience.map((item) => (
            <li key={`${item.company}-${item.period}`} className="max-w-2xl">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="font-semibold text-ink">
                  {item.role} <span className="font-normal text-muted">· {item.company}</span>
                </h3>
                <p className="shrink-0 font-mono text-xs text-muted">{item.period}</p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {item.employmentType} · {item.location}
              </p>
              {item.highlights && item.highlights.length > 0 ? (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted marker:text-accent">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
              {item.skills && item.skills.length > 0 ? (
                <div className="mt-4">
                  <TagList tags={item.skills} label={`Skills used at ${item.company}`} />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </AboutSection>

      <AboutSection id="skills" label="06" title="Skills">
        <div className="space-y-6">
          {skills.map((group) => (
            <div key={group.label}>
              <h3 className="mb-3 text-sm font-medium text-ink">{group.label}</h3>
              <TagList tags={group.items} label={group.label} />
            </div>
          ))}
        </div>
      </AboutSection>

      <AboutSection id="certifications" label="07" title="Certifications">
        {certifications.length > 0 ? (
          <ul className="space-y-4">
            {certifications.map((certification) => (
              <li key={certification.name} className="text-sm">
                <p className="font-medium text-ink">
                  {certification.credentialUrl ? (
                    <a href={certification.credentialUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-strong">
                      {certification.name}
                    </a>
                  ) : (
                    certification.name
                  )}
                </p>
                <p className="mt-1 text-muted">
                  {certification.issuer} · {certification.date}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">No certifications listed yet.</p>
        )}
      </AboutSection>

      <AboutSection id="contact" label="08" title="Contact">
        <ul className="grid max-w-2xl gap-3 sm:grid-cols-2">
          <li>
            <a href={`mailto:${profile.email}`} className={contactLinkClass}>
              <MailIcon className="size-5 text-accent" />
              <span className="truncate">{profile.email}</span>
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
              <LinkedInIcon className="size-5 text-accent" />
              LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
              <GitHubIcon className="size-5 text-accent" />
              GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </AboutSection>
    </Container>
  );
}
