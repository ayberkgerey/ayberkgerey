import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { SiteNav } from "@/components/layout/SiteNav";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Monogram } from "@/components/ui/Monogram";

function ContactLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={`mailto:${profile.email}`}
      className={`inline-flex items-center border border-line-strong px-4 py-2 text-[0.75rem] uppercase tracking-[0.14em] text-ivory transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-obsidian ${className}`}
    >
      Contact
    </a>
  );
}

export function SiteHeader() {
  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-50 border-b border-hairline bg-obsidian/75 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[78rem] items-center justify-between gap-6 px-6 sm:px-10 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="group flex items-center gap-3 justify-self-start">
          <Monogram />
          <span className="font-serif text-xl font-medium tracking-[0.01em] text-ivory transition-colors duration-300 group-hover:text-gold">
            {profile.name}
          </span>
        </Link>

        <SiteNav
          items={mainNav}
          mobileExtras={
            <div className="flex items-center justify-between gap-4 border-t border-line pt-6">
              <SocialLinks />
              <ContactLink />
            </div>
          }
        />

        <div className="hidden items-center gap-5 justify-self-end md:flex">
          <SocialLinks />
          <span aria-hidden="true" className="h-5 w-px bg-line-strong" />
          <ContactLink />
        </div>
      </div>
    </header>
  );
}
