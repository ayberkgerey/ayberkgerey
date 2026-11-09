import type { Metadata } from "next";
import type { ReactNode } from "react";
import { about, certifications, experience, profile, skills } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { DotList, TagList } from "@/components/ui/Tag";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ayberk Gerey's background in mobile and web software engineering, the move toward cloud architecture, experience, and skills.",
};

function AboutSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="reveal grid gap-6 border-t border-hairline py-16 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-16 md:py-20"
    >
      <div>
        <p aria-hidden="true" className="font-mono text-[0.6875rem] tracking-[0.2em] text-gold">
          {String(index).padStart(2, "0")}
        </p>
        <h2 id={id} className="mt-3 font-serif text-3xl font-medium leading-tight text-ivory">
          {title}
        </h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-2xl space-y-5 text-[1.0625rem] leading-8 text-silver">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

const contactLinkClass =
  "group flex items-center gap-4 border border-line bg-card px-5 py-4 text-sm text-ivory transition-colors duration-500 hover:border-gold";

export default function AboutPage() {
  const [lead, ...restOfIntro] = about.introduction;

  return (
    <>
      <PageHeader eyebrow="About" title={profile.name}>
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold">{profile.label}</p>
      </PageHeader>

      <Container>
        <AboutSection id="introduction" index={1} title="Introduction">
          <p className="max-w-3xl font-serif text-[1.75rem] leading-[1.35] text-ivory sm:text-[2rem]">{lead}</p>
          {restOfIntro.length > 0 ? (
            <div className="mt-8">
              <Prose paragraphs={restOfIntro} />
            </div>
          ) : null}
        </AboutSection>

        <AboutSection id="background" index={2} title="Software Engineering Background">
          <Prose paragraphs={about.softwareBackground} />
        </AboutSection>

        <AboutSection id="transition" index={3} title="Transition Toward Cloud Architecture">
          <Prose paragraphs={about.transition} />
        </AboutSection>

        <AboutSection id="focus" index={4} title="Current Technical Focus">
          <DotList items={profile.focusAreas} label="Current focus areas" />
        </AboutSection>

        <AboutSection id="experience" index={5} title="Professional Experience">
          <ol className="border-l border-line">
            {experience.map((item) => (
              <li key={`${item.company}-${item.period}`} className="relative max-w-3xl pb-14 pl-8 last:pb-0 sm:pl-10">
                <span aria-hidden="true" className="absolute -left-[5px] top-2 size-2.5 rotate-45 border border-gold bg-obsidian" />
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">{item.period}</p>
                <h3 className="mt-3 font-serif text-2xl font-medium leading-snug text-ivory">
                  {item.role}
                  <span className="text-silver"> · {item.company}</span>
                </h3>
                <p className="mt-2 text-sm text-silver">
                  {item.employmentType} · {item.location}
                  {item.website ? (
                    <>
                      {" · "}
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-gold"
                      >
                        {item.website.replace(/^https?:\/\//, "")}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </>
                  ) : null}
                </p>
                {item.highlights && item.highlights.length > 0 ? (
                  <ul className="mt-5 space-y-2.5">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="grid grid-cols-[1.25rem_minmax(0,1fr)] text-[0.9375rem] leading-7 text-silver">
                        <span aria-hidden="true" className="mt-[0.7rem] h-px w-2.5 bg-gold/70" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {item.skills && item.skills.length > 0 ? (
                  <div className="mt-6">
                    <TagList tags={item.skills} label={`Skills used at ${item.company}`} />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </AboutSection>

        <AboutSection id="skills" index={6} title="Skills">
          <div className="divide-y divide-hairline border-y border-hairline">
            {skills.map((group) => (
              <div key={group.label} className="grid gap-4 py-7 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-8">
                <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gold">{group.label}</h3>
                <DotList items={group.items} label={group.label} />
              </div>
            ))}
          </div>
        </AboutSection>

        <AboutSection id="certifications" index={7} title="Certifications">
          {certifications.length > 0 ? (
            <ul className="space-y-6">
              {certifications.map((certification) => (
                <li key={certification.name}>
                  <p className="font-serif text-xl text-ivory">
                    {certification.credentialUrl ? (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline pb-0.5 hover:text-gold"
                      >
                        {certification.name}
                      </a>
                    ) : (
                      certification.name
                    )}
                  </p>
                  <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-silver">
                    {certification.issuer} · {certification.date}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[0.9375rem] text-silver">No certifications listed yet.</p>
          )}
        </AboutSection>

        <AboutSection id="contact" index={8} title="Contact">
          <ul className="grid max-w-3xl gap-4 sm:grid-cols-3">
            <li>
              <a href={`mailto:${profile.email}`} className={contactLinkClass}>
                <MailIcon className="size-5 text-gold" />
                <span className="min-w-0">
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-silver">Email</span>
                  <span className="mt-1 block truncate">{profile.email}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
                <LinkedInIcon className="size-5 text-gold" />
                <span>
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-silver">Network</span>
                  <span className="mt-1 block">LinkedIn</span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
                <GitHubIcon className="size-5 text-gold" />
                <span>
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-silver">Code</span>
                  <span className="mt-1 block">GitHub</span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </AboutSection>
      </Container>
    </>
  );
}
