import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";
import { Monogram } from "@/components/ui/Monogram";

const linkClass = "link-underline inline-flex items-center gap-3 pb-0.5 text-sm text-silver hover:text-ivory";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 bg-charcoal">
      <div aria-hidden="true" className="gold-rule" />
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-4">
              <Monogram className="size-11" />
              <p className="font-serif text-3xl text-ivory">{profile.name}</p>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-silver">{profile.role}</p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">Index</p>
            <ul className="mt-5 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-gold">Contact</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${profile.email}`} className={linkClass}>
                  <MailIcon /> {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <LinkedInIcon /> LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <GitHubIcon /> GitHub
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-silver sm:flex-row sm:items-center sm:justify-between">
          <span>{profile.name}</span>
          <span>{profile.label}</span>
        </div>
      </Container>
    </footer>
  );
}
