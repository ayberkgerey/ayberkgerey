import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { profile } from "@/data/profile";
import { SiteNav } from "@/components/layout/SiteNav";
import { SocialLinks } from "@/components/layout/SocialLinks";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/80">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3 rounded-md">
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded border border-line-strong bg-surface font-mono text-xs font-semibold text-accent"
          >
            AG
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink group-hover:text-accent-strong">
            {profile.name}
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <SiteNav items={mainNav} mobileExtras={<SocialLinks />} />
          <SocialLinks className="hidden sm:flex" />
        </div>
      </div>
    </header>
  );
}
