import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";

const linkClass =
  "inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-raised hover:text-ink";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      <li>
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <GitHubIcon />
          <span className="sr-only">GitHub (opens in a new tab)</span>
        </a>
      </li>
      <li>
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <LinkedInIcon />
          <span className="sr-only">LinkedIn (opens in a new tab)</span>
        </a>
      </li>
      <li>
        <a href={`mailto:${profile.email}`} className={linkClass}>
          <MailIcon />
          <span className="sr-only">Email {profile.email}</span>
        </a>
      </li>
    </ul>
  );
}
