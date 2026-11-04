import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-semibold text-ink">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.role}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          <ul className="flex flex-col gap-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-ink">
                <GitHubIcon /> GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-ink">
                <LinkedInIcon /> LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-muted hover:text-ink">
                <MailIcon /> {profile.email}
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
